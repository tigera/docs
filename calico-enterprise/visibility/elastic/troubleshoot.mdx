---
title: Troubleshoot logs
description: Learn how to troubleshoot common issues with Elasticsearch.
canonical_url: '/visibility/troubleshoot'
---

### Elasticsearch resources and settings

The following user-configured resources are related to Elasticsearch:

- [LogStorage]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.LogStorage). It has settings for:
  - Elasticsearch (for example, nodeCount and replicas)
  - Kubernetes (for example, resourceRequirements, storage and nodeSelectors)
  - Tigera (for example, data retention)

- [StorageClasses]({{site.baseurl}}/getting-started/create-storage)
  - A StorageClass provides a way for administrators to describe different types of storage.
  - Persistent volumes for pod storage can be configured through storage classes or dynamic provisioners from cloud providers

### Diagnostic checklist

1. Rule out network problems, DNS problems, and network policy problems.
1. Check the following logs:

   | Logs                                | Sample command                                               |
   | ----------------------------------- | ------------------------------------------------------------ |
   | Elasticsearch pod                   | `kubectl logs -n tigera-elasticsearch -l common.k8s.elastic.co/type=elasticsearch` |
   | Kibana pod                          | `kubectl logs -n tigera-kibana -l common.k8s.elastic.co/type=kibana` |
   | Tigera operator                     | `kubectl logs -n tigera-operator -l k8s-app=tigera-operator` |
   | Elasticsearch (ECK) operator        | `kubectl logs -n tigera-eck-operator -l k8s-app=elastic-operator` |
   | Kube controllers (often overlooked) | `kubectl logs -n calico-system -l k8s-app=calico-kube-controllers` |
   | Kubernetes API server               | `kubectl logs -n kube-system -l component=kube-apiserver`<br />**Note**: See you platform documentation for specific command if above doesn't work. |
1. Check if there are multiple replicas or statefulsets of Kibana or Elasticsearch.  
   `kubectl get all -n tigera-kibana` and/or `kubectl get all -n tigera-elasticsearch`
1. Check if any of the pods in the `tigera-elasticsearch` namespace are pending.  
   `kubectl get pod -n tigera-elasticsearch`
1. Check the TigeraStatus for problems.  
   `kubectl get tigerastatus -o yaml`

### How to handle expired license
Starting from {{site.prodname}} v3.7, all {{site.prodname}} features work with Elasticsearch basic license.

If Elasticsearch platinum or enterprise license expires, ECK operator will switch it to basic license, if this doesn't happen automatically and if you notice license expiration error, switch to basic license by calling [the Elasticsearch API.](https://www.elastic.co/guide/en/elasticsearch/reference/current/start-basic.html)

### How to create a new cluster
> **Important**: Be aware that removing LogStorage temporarily removes Elasticsearch from your cluster. Features that depend on LogStorage are temporarily unavailable, including the dashboards in the Manager UI. Data ingestion is also temporarily paused, but will resume when the LogStorage is up and running again.
{: .alert .alert-danger}
   
Follow these steps to create a new Elasticsearch cluster.
1. (Optional) To delete all current data follow this step. For each PersistentVolume in StorageClass `tigera-elasticsearch` that is currently mounted, set the ReclaimPolicy to `Recycle` or `Delete`.
1. Export your current LogStorage resource to a file.
   ```bash
   kubectl get logstorage tigera-secure -o yaml > log-storage.yaml
   ```

1. Delete logstorage.
   ```bash
   kubectl delete -f log-storage.yaml
   ```

1. Delete the trial license. You can skip this step if the secret is not present in your cluster.
   ```bash
   kubectl delete secret -n tigera-eck-operator trial-status
   ```

1. (Optional) If you made changes to the ReclaimPolicy in step 1, revert them so that it matches the value in StorageClass `tigera-elasticsearch` again.

1. Apply the LogStorage again.
   ```bash
   kubectl apply -f log-storage.yaml
   ```

1. Wait until your cluster is back up and running.
   ```bash
   watch kubectl get tigerastatus
   ```

### Common problems

#### Elasticsearch is pending

**Solution/workaround**: Most often, the reason is due to the absence of a PersistentVolume that matches the PersistentVolumeClaim. Check that there is a Kubernetes node with enough CPU and memory. If the field `dataNodeSelector` in  the LogStorage resource is used, make sure there are pods that match all the requirements.

#### Pod cannot reach Elasticsearch

**Solution/workaround**: Are there any policy changes that may affect the installation? In many cases, removing and reapplying log storage solves the problem.

#### kube-apiserver logs showing many certificate errors

**Solution/workaround**: Sometimes a cluster ends up with multiple replicasets or statefulsets of Kibana or Elasticsearch if you modify the LogStorage resource. To see if this is the problem, run `kubectl get all -n tigera-(elasticsearch/kibana)`. If it is, you can ignore it; the issues will resolve over time.

If you are using a version prior to v2.8, the issue may be caused by the ValidatingWebhookConfiguration. Although we do not support modifying this admission webhook, consider deleting it as follows:

```bash
kubectl delete validatingwebhookconfigurations validating-webhook-configuration
kubectl delete service -n tigera-eck-operator elastic-webhook-service
```

As a last resort, create a new [Elasticsearch cluster](#how-to-create-a-new-cluster).

#### Elasticsearch is slow 

**Solution/workaround**: Start with diagnostics using the Kibana monitoring dashboard. Then, check the QoS of your LogStorage custom resource to see if it is causing throttling (or via the Kubernetes node itself). If the shard count is high, close old shards. Also, another option is to increase the Elasticsearch [CPU and memory]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.LogStorageSpec).

#### Elasticsearch crashes during booting

**Solution/workaround**: Disk provisioners can have issues where the disk does not allow write requests by the Elasticsearch user. Check the logs of the init containers.

#### Kibana dashboard is missing

**Solution/workaround**: Verify that the intrusion detection job is running, or try removing and reapplying: 

```
$ kubectl get intrusiondetections -o yaml > intrusiondetection.yaml

$ kubectl delete -f intrusiondetection.yaml 
intrusiondetection.operator.tigera.io "tigera-secure" deleted  
         
$ kubectl apply -f intrusiondetection.yaml 
intrusiondetection.operator.tigera.io/tigera-secure created
```

#### Elastic Operator OOM killed

**Solution/workaround**: Increase the memory requests/limits for the Elastic Operator in the LogStorage Custom Resource.

```
$ kubectl edit logstorage tigera-secure
```

Find the `ECKOperator` Component Resource in the `spec` section. Increase the limits and requests memory amounts as needed. Verify that the pod has restarted with the new settings:

```
$ kubectl describe pod elastic-operator -n tigera-eck-operator   
```

Check the `Container.Limits` and `Container.Requests` fields to confirm the values have propagated correctly.
