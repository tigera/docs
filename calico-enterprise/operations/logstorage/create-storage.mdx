---
title: Configure storage for logs and reports
description: Configure persistent storage for flow logs, DNS logs, audit logs, and compliance reports. 
---

### Big picture

Before installing {{site.prodname}}, you must configure persistent storage for flow logs, DNS logs, audit logs, and compliance reports.

### Concepts

Before configuring a storage class for {{site.prodname}}, the following terms will help you understand storage interactions.

{% include /content/persistent-storage-terms.md %}

### Before you begin...

**Review log storage recommendations**

Review [Log storage recommendations]({{site.baseurl}}/maintenance/logstorage/log-storage-recommendations) for guidance on the number of nodes and resources to configure for your environment.

**Determine storage support**

Determine the storage types that are available on your cluster. If you are using dynamic provisioning, verify it is supported.
If you are using local disks, you may find the {% include open-new-window.html text='sig-storage local static provisioner' url='https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner' %} useful. It creates and manages PersistentVolumes by watching for disks mounted in a configured directory.

  > **Warning**: Do not use the host path storage provisioner. This provisioner is not suitable for production and results in scalability issues, instability, and data loss.
{: .alert .alert-warning}

  > **Warning**: Do not use shared network file systems, such as AWS' EFS or Azure's azure-file. These file systems may result in decreases of performance and data loss.
{: .alert .alert-warning}

### How to

#### Create a storage class

Before installing {{site.prodname}}, create a storage class named, `tigera-elasticsearch`.

**Examples**

##### Pre-provisioned local disks

In the following example, we create a **StorageClass** to use when explicitly adding **PersistentVolumes** for local disks. This can be performed manually, or using the {% include open-new-window.html text='sig-storage local static provisioner' url='https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner' %}.

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: tigera-elasticsearch
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Retain
```

##### AWS EBS disks

In the following example for an AWS cloud provider integration, the **StorageClass** is based on [how your EBS disks are provisioned](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html):
{% tabs %}
  <label:Amazon EBS CSI,active:true>
<%
Make sure the CSI plugin is enabled in your cluster and apply the following manifest.
```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: tigera-elasticsearch
provisioner: ebs.csi.aws.com
reclaimPolicy: Retain
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
```

%>
  <label:Legacy Kubernetes EBS driver>
<%

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: tigera-elasticsearch
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
  fsType: ext4
reclaimPolicy: Retain
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
```

%>
{% endtabs %}

##### AKS Azure Files storage

In the following example for an AKS cloud provider integration, the **StorageClass** tells {{site.prodname}} to use LRS disks for log storage.
   > **Note**: Premium Storage is recommended for databases greater than 100GiB and for production installations.
{: .alert .alert-info}

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: tigera-elasticsearch
provisioner: kubernetes.io/azure-disk
parameters:
  cachingmode: ReadOnly
  kind: Managed
  storageaccounttype: StandardSSD_LRS
reclaimPolicy: Retain
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
```

##### GCP Persistent Disks

In the following example for a GKE cloud provider integration, the **StorageClass** tells {{site.prodname}} to use the GCE Persistent Disks for log storage. 


  > **Note**: There are currently two types available `pd-standard` and `pd-ssd`. For production deployments, we recommend using the `pd-ssd` storage type. 

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: tigera-elasticsearch
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
  replication-type: none
reclaimPolicy: Retain
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
```

### Above and beyond

- [Adjust size of Elasticsearch cluster]({{site.baseurl}}/maintenance/logstorage/adjust-log-storage-size)
