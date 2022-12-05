---
title: Configure persistent storage for anomaly detection
description: Configure persistent storage for training models created by anomaly detection cycles.
canonical_url: /threat/anomaly-detection/storage
feature_name: feature_generic_all
---

>**Note**: This feature is tech preview. Tech preview features may be subject to significant changes before they become GA.
{: .alert .alert-info}

### Big picture

Configure persistent storage for training models created by anomaly detection. By default, training model storage is ephemeral.

### Concepts

Before configuring a storage class for anomaly detection, the following terms will help you understand storage interactions.

{% include /content/persistent-storage-terms.md %}

### Before you begin

**Storage size requirements**

Anomaly detection requires 10Gi for storage. Note that training models are relatively small (~2MB), so you should not need more than this.

**Determine storage support**

Determine the storage types that are available on your cluster. If you are using dynamic provisioning, verify it is supported.
If you are using local disks, you may find the {% include open-new-window.html text='sig-storage local static provisioner' url='https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner' %} useful. It creates and manages PersistentVolumes by watching for disks mounted in a configured directory.

  > **Warning**: Do not use the host path storage provisioner. This provisioner is not suitable for production and results in scalability issues, instability, and data loss.
{: .alert .alert-warning}

### How to

#### Create a storage class

Create a storage class named, `tigera-anomaly-detection`. 

**Examples**

##### Pre-provisioned local disks

In the following example, we create a **StorageClass** to use when explicitly adding **PersistentVolumes** for local disks. This can be performed manually, or using the {% include open-new-window.html text='sig-storage local static provisioner' url='https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner' %}.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: tigera-anomaly-detection
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Retain
```

##### AWS EBS disks

In the following example for an AWS cloud provider integration, the **StorageClass** tells {{site.prodname}} to use EBS disks for log storage.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: tigera-anomaly-detection
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
  fsType: ext4
reclaimPolicy: Retain
volumeBindingMode: WaitForFirstConsumer
```

##### AKS Azure Files storage

In the following example for an AKS cloud provider integration, the **StorageClass** tells {{site.prodname}} to use LRS disks for log storage.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: tigera-anomaly-detection
provisioner: kubernetes.io/azure-disk
parameters:
  cachingmode: ReadOnly
  kind: Managed
  storageaccounttype: StandardSSD_LRS
reclaimPolicy: Retain
volumeBindingMode: WaitForFirstConsumer
```

##### GCP Persistent Disks

In the following example for a GKE cloud provider integration, the **StorageClass** tells {{site.prodname}} to use the GCE Persistent Disks for log storage. 

> **Note**: There are currently two types available: `pd-standard` and `pd-ssd`. For production deployments, we recommend using the `pd-ssd` storage type.
{: .alert .alert-info}

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: tigera-anomaly-detection
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
  replication-type: none
reclaimPolicy: Retain
volumeBindingMode: WaitForFirstConsumer
```

#### Configure anomaly detection to use the persistent storage

For anomaly detection components to recognize the persistent storage you created, set the `StorageClassName` field in the [Intrusion Detection installation resource]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.IntrusionDetection) to the name of the `StorageClass` you have provisioned. 
If you have configured persistent storage and would like to revert these changes, simply set the `StorageClassName` field in the [Intrusion Detection installation resource]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.IntrusionDetection) to an empty string.
> **Note**: The examples used throughout this doc assume that the value for `StorageClassName` is `tigera-anomaly-detection`. 
{: .alert .alert-info}

#### Troubleshooting

##### Intrusion Detection is degraded

The Tigerastatus IntrusionDetection component will be set to degraded if it fails to query for the provided StorageClass.

**Solution/workaround**: If the field `StorageClassName` is provided, `tigera-operator` will query for the `StorageClass` with the same name as the field value. Most often the unavailability of the `StorageClass` is due to the absence of a PersistentVolume that matches the PersistentVolumeClaim. Also, check that there is a Kubernetes node with enough CPU and memory.
