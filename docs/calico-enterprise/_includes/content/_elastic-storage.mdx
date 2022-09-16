{% if include.orch != "openshift" %}
  {% assign cli = "kubectl" %}
{% else %}
  {% assign cli = "oc" %}
{% endif %}

1. The bundled ElasticSearch operator is configured to use a `StorageClass` called `tigera-elasticsearch`.
   Create a StorageClass with that name providing persistent storage that meets the requirements.

   Example 1: Local storage.  You must also provision a persistent volume in this StorageClass for each ElasticSearch node.
   The [sig-storage local static provisioner](https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner)
   may be useful for this.

   ```
   apiVersion: storage.k8s.io/v1
   kind: StorageClass
   metadata:
     name: tigera-elasticsearch
   provisioner: kubernetes.io/no-provisioner
   volumeBindingMode: WaitForFirstConsumer
   ```

   Example 2: AWS EBS storage.  Your cluster must be configured with the AWS cloud provider integration.

   ```
   apiVersion: storage.k8s.io/v1
   kind: StorageClass
   metadata:
     name: tigera-elasticsearch
   provisioner: kubernetes.io/aws-ebs
   parameters:
     type: gp2
   volumeBindingMode: WaitForFirstConsumer
   ```

   Alternatively, you can edit the `ElasticSearch` resource in `operator.yaml` to use an existing StorageClass.