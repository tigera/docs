#!/bin/bash
#
# This script switches the current operator installation to use the operator
# running in the NEW_NAME namespace.
#
# Before this script is run, the new operator and its associated resources
# should have been deployed to the NEW_NAME namespace.
set -e

NEW_NAME=$1

if [ -z "${NEW_NAME}" ]; then
  echo "Provide a NEW_NAME for the new namespace to switch the current operator to."
  exit 1
fi

# kubectl_retry retries <args>
kubectl_retry() {
  RETRIES=$1
  OUTPUT_TMP=$(mktemp)
  shift 1

  for attempt in $(seq 1 ${RETRIES}); do
    exit_code=0
    kubectl $@ 1> ${OUTPUT_TMP}
    exit_code=$?
    if [[ "${exit_code}" == "0" || "${exit_code}" == "" ]]; then
      cat ${OUTPUT_TMP}
      break
    elif [[ "${attempt}" == "${RETRIES}" ]]; then
      echo [ERROR] Failed to kubectl $@
      return ${exit_code}
    else
      echo [INFO] Failed kubectl command - will sleep and retry
      sleep 5
    fi
  done
}

copy_resource_to_ns (){
  TYPE=$1
  NAME=$2
  NS=$3

  DATA=$(kubectl get $TYPE -n tigera-operator ${NAME} -o jsonpath="{.data}")
  OWNER_REF=$(kubectl get $TYPE -n tigera-operator ${NAME} -o jsonpath="{.metadata.ownerReferences}")
  kubectl_retry 10 apply -f - <<EOF
{"apiVersion":"v1","kind":"$TYPE",
"data":${DATA},
"metadata":{"name":"${NAME}","namespace":"${NS}",
"ownerReferences": ${OWNER_REF} }}
EOF
}

if kubectl get ns ${NEW_NAME} 2>&1 > /dev/null ; then
  echo "The namespace ${NEW_NAME} already exists. Cannot continue switching the active operator."
  exit 1
fi

kubectl_retry 10 create ns ${NEW_NAME}

# Copy over the secrets in the tigera-operator namespace to the new namespace to ensure
# switching the active operator is non-disruptive.
for x in node-certs typha-certs; do
  copy_resource_to_ns Secret $x ${NEW_NAME}
done

# Switch the active operator
PATCH_FILE=$(mktemp)
cat <<EOF > ${PATCH_FILE}
{"data":{"active-namespace": "${NEW_NAME}"}}
EOF
kubectl_retry 10 patch configmap -n calico-system active-operator --type=merge --patch-file "${PATCH_FILE}"
