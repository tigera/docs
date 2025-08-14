#!/usr/bin/env bash
set -eu

: ${VERSION:?"Product version not specified, set using 'VERSION' e.g. VERSION=3.15.4"}
: ${PRODUCT:?"Product not specified, set using 'PRODUCT'"}
: ${GITHUB_TOKEN:?"GitHub API token not specified, set using 'GITHUB_TOKEN'"}
: ${IS_LATEST:=false}:?"Set \"true\" if this is the latest version for the product"

declare -A products=(
  "calico-enterprise"
)

declare -A product_repo_dict=(
  ["calico-enterprise"]="tigera/calico-private"
)
declare -A product_branch_prefix_dict=(
  ["calico-enterprise"]="release-calient"
)

is_valid_product() {
  local search=$1
  for product in "${!products[@]}"; do
    if [ $product == $search ]; then
      return 0
    fi
  done
  return 1
}

get_product_branch_ref() {
  local version=$1
  if [ $version != "master" ]; then
    : ${GIT_VERSION_REF:=$(echo "$version" | cut -d. -f1,2)}
    : ${GIT_VERSION_SUFFIX:=$(echo "${version}" | cut -d- -f2 | cut -d. -f1)}
    if [[ "${GIT_VERSION_SUFFIX}" == "1" ]]; then
      GIT_VERSION_REF="${GIT_VERSION_REF}-${GIT_VERSION_SUFFIX}"
    fi
    echo "?ref=${product_branch_prefix_dict[$PRODUCT]}-v${GIT_VERSION_REF#v}"
  fi
}

get_product_version_info() {
  local version=$1
  product_branch_ref=$(get_product_branch_ref $version)
  api_url="https://api.github.com/repos/${product_repo_dict[$PRODUCT]}/contents/calico/_data/versions.yml${product_branch_ref}"
  versions_yml=$(curl -fsSL -H 'Accept: application/vnd.github.v3.raw' -H "Authorization: token ${GITHUB_TOKEN}" "${api_url}")
  yq "
  ... comments=\"\" | .[] |
  select(.title == \"v${VERSION}\" or .title == \"${VERSION}\") 
  " <(echo "$versions_yml") | scripts/versions/format-versions
}

get_docs_folder_path() {
  local version=$1
  if [ $version == "master" ]; then
    echo $PRODUCT
  else
    local version_stream=$(echo "${version}" | cut -d. -f1,2)
    : ${DOCS_VERSION_STREAM:=${version_stream}}
    echo ${PRODUCT}_versioned_docs/version-${DOCS_VERSION_STREAM#v}
  fi
}

update_calico_enterprise_version() {
  new_version=$(yq -o=json '. |= pick(["title", "tigera-operator", "calico", "components"]) | del(.components.[].fips-image)' <(echo "$product_version_info"))
  # add new version as first item in array
  releases_json=$(cat $releases_json_file | jq --argjson newVersion "$(echo $new_version)" '. = [$newVersion] + .')
  jq '.' <(echo $releases_json) >$releases_json_file
  # update variables.js
  local helm_version=$(yq ".helmRelease" <(echo "$product_version_info") || echo "")
  if [ -z "$helm_version" -a "$helm_version" != " " ]; then
    helm_version=""
  else
    helm_version="-${helm_version}"
  fi
  local release_title=v${VERSION}
  local release_stream=$(echo ${VERSION} | cut -d. -f1,2)
  local release_stream_minor=${release_stream#3.}
  local docs_base_url="/calico-enterprise/${release_stream}"

  latest_count=$(grep -F "/calico-enterprise/latest" calico-enterprise_versioned_docs/version-*/variables.js | wc -l)

  # None of the current versions are set as latest, so we should make sure the user sets one
  if [ ${latest_count} -eq 0 ] && [ "${IS_LATEST}" != "true" ]; then
    echo >&2 "No versions are set as latest; please run one of the version/autogen targets with IS_LATEST=true"
    exit 1
  fi

  # There's more than one 'latest', this is one of them, and we've *not* specified
  # this one should be latest, so we're fixing the problem.
  if [ ${latest_count} -gt 1 ] && \
    grep -F -q "/calico-enterprise/latest" "${docs_folder_path}/variables.js" && \
    [ "${IS_LATEST}" != "true" ]; then
    echo >&2 "[warn] More than one version is set as latest, including this one, but we're unsetting this one"

  # Otherwise, bail out and force the user to fix the invalid one(s) first.
  elif [ ${latest_count} -gt 1 ]; then
    echo >&2 "Currently ${latest_count} versions are set as latest. Please regenerate any which are incorrect first:"
    grep -F --files-with-matches "/calico-enterprise/latest" calico-enterprise_versioned_docs/version-*/variables.js | sed 's/^/    /'
    exit 1
  fi

  if [ ${latest_count} -eq 1 ] && grep -F -q "/calico-enterprise/latest" "${docs_folder_path}/variables.js"; then
    echo "[info] Release ${release_stream} is set as latest in docs, keeping it as latest for now"
    IS_LATEST=true
  fi

  if [ "${IS_LATEST}" == "true" ]; then
    docs_base_url="/calico-enterprise/latest"
  fi

  if [ ${release_stream_minor} -ge 20 ]; then
    rpmsUrl="rpmsUrl: 'https://downloads.tigera.io/ee/rpms/v${release_stream}',"
  else
    rpmsUrl="// No rpmsUrl for this release"
  fi

  cat <<EOF >${docs_folder_path}/variables.js
const releases = require('./releases.json');
const componentImage = require('../../src/components/utils/componentImage');

const variables = {
  releaseTitle: '${release_title}',
  prodname: 'Calico Enterprise',
  prodnamedash: 'calico-enterprise',
  version: 'v${release_stream}',
  openSourceVersion: releases[0].calico.minor_version.slice(1),
  baseUrl: '${docs_base_url}',
  filesUrl: 'https://downloads.tigera.io/ee/${release_title}',
  ${rpmsUrl}
  tutorialFilesURL: 'https://docs.tigera.io/files',
  tmpScriptsURL: 'https://docs.tigera.io/calico-enterprise/${release_stream}',
  windowsScriptsURL: 'https://raw.githubusercontent.com/kubernetes-sigs/sig-windows-tools/master/hostprocess',
  prodnameWindows: 'Calico Enterprise for Windows',
  downloadsurl: 'https://downloads.tigera.io',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\\\TigeraCalico',
  registry: 'quay.io/',
  chart_version_name: 'v${VERSION}${helm_version}',
  tigeraOperator: releases[0]['tigera-operator'],
  dikastesVersion: releases[0].components.dikastes.version,
  releases,
  imageNames: {
    node: 'tigera/cnx-node',
    kubeControllers: 'tigera/kube-controllers',
  },
  componentImage: {
    cnxNode: componentImage('cnx-node', releases[0]),
    calicoctl: componentImage('calicoctl', releases[0]),
    calicoq: componentImage('calicoq', releases[0]),
  },
};

module.exports = variables;
EOF
}

if ! is_valid_product "$PRODUCT"; then
  echo "error: Invalid product specified: \"$PRODUCT\""
  exit 1
fi

# sanitize product version
VERSION=${VERSION#v}
# determine path to folder for update
docs_folder_path=$(get_docs_folder_path $VERSION)
# set version file
releases_json_file=${docs_folder_path}/releases.json
# Check if version exists in docs
found_version=$(jq ".[] | select(.title| test(\"$VERSION\"))" $releases_json_file)
if [ -n "$found_version" ]; then
  # if version already exists, delete existing and replace
  yq -o=json -i "del(.[]| select(.title | test(\"$VERSION\")))" $releases_json_file
fi

product_version_info=$(get_product_version_info $VERSION)

if [ -z "$product_version_info" -a "$product_version_info" != " " ]; then
  echo "error: No component list found for $PRODUCT $VERSION"
  exit 1
else
  case $PRODUCT in
  calico-enterprise)
    update_calico_enterprise_version
    ;;
  *)
    echo "error: Invalid product specified: \"$PRODUCT\""
    exit 1
    ;;
  esac
fi
