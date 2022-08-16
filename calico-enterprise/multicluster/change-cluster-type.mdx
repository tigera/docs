---
title: Change a cluster type
description: Change an existing Calico Enterprise cluster type to a management cluster, a managed cluster, or standalone. 
canonical_url: '/multicluster/mcm/change-cluster-type'
---

### Big picture

Change the configuration type for an existing {{site.prodname}} cluster to management, managed, or standalone. 

### Value

As you build out a multi-cluster management deployment, it is critical to have flexibility to repurpose existing cluster types to meet your needs. 

### Features

This how-to guide uses the following {{site.prodname}} features:

- The custom resource `ManagementCluster`
- The custom resource `ManagementClusterConnection`

### Before you begin…

To verify the type of an existing cluster, run the following command:
```bash
kubectl get managementcluster,managementclusterconnection
```
Your cluster is a management cluster if a `ManagementCluster` is returned, a managed cluster if a `ManagementClusterConnection` is returned. 
We refer to `Standalone` clusters, as clusters who have neither.

We do not support having both `ManagementCluster` and `ManagementClusterConnection` in one cluster. 

### How to
- [Change a standalone cluster to a management cluster](#change-a-standalone-cluster-to-a-management-cluster)
- [Change a standalone cluster to a managed cluster](#change-a-standalone-cluster-to-a-managed-cluster)
- [Change a management cluster to a standalone cluster](#change-a-management-cluster-to-a-standalone-cluster)
- [Change a managed cluster to a standalone cluster](#change-a-managed-cluster-to-a-standalone-cluster)

#### Change a standalone cluster to a management cluster

1. Create a service to expose the management cluster. 
   The following example of a NodePort service may not be suitable for production and high availability. For options, see [Fine-tune multi-cluster management for production]({{site.baseurl}}/multicluster/mcm/fine-tune-deployment).
   Apply the following service manifest.

   ```bash
   kubectl create -f - <<EOF
   apiVersion: v1
   kind: Service
   metadata:
     name: tigera-manager-mcm
     namespace: tigera-manager
   spec:
     ports:
     - nodePort: 30449
       port: 9449
       protocol: TCP
       targetPort: 9449
     selector:
       k8s-app: tigera-manager
     type: NodePort
   EOF
   ```

1. Find out the address where you can reach the above service and set it as a variable. (Ex. "example.com:1234" or "10.0.0.10:1234".)
   ```bash
   export MANAGEMENT_CLUSTER_ADDR=<your-management-cluster-addr>
   ```

1. Apply the [ManagementCluster]({{site.baseurl}}/reference/installation/api) CR.

   ```bash
   kubectl apply -f - <<EOF
   apiVersion: operator.tigera.io/v1
   kind: ManagementCluster
   metadata:
     name: tigera-secure
   spec:
     address: $MANAGEMENT_CLUSTER_ADDR
   EOF
   ```

   
#### Change a standalone cluster to a managed cluster

The steps in this section assume that a management cluster is up and running.

>**Note**: If you wish to retain LogStorage data for your managed cluster, verify that the reclaim policy within your storage class is configured to {% include open-new-window.html text='Retain data' url='https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reclaiming' %}.
{: .alert .alert-info}

1. Choose a name for your managed cluster.
   ```bash
   export MANAGED_CLUSTER=my-managed-cluster
   ```

1. Get the namespace in which the Tigera operator is running in your managed cluster (in most cases this will be `tigera-operator`):
   ```bash
   export MANAGED_CLUSTER_OPERATOR_NS=tigera-operator
   ```

1. Add the managed cluster to your **management cluster**. The following command will
   create a manifest with the name of your managed cluster in your current directory.
   ```bash
   kubectl -o jsonpath="{.spec.installationManifest}" > $MANAGED_CLUSTER.yaml create -f - <<EOF
   apiVersion: projectcalico.org/v3
   kind: ManagedCluster
   metadata:
     name: $MANAGED_CLUSTER
   spec:
     operatorNamespace: $MANAGED_CLUSTER_OPERATOR_NS
   EOF
   ```
1. Verify that the `managementClusterAddr` in the manifest is correct. Apply the manifest to your **managed cluster**.
   ```bash
   kubectl apply -f $MANAGED_CLUSTER.yaml
   ```
1. Remove unnecessary resources in the managed clusters.
   ```bash
   kubectl delete manager tigera-secure
   kubectl delete logstorage tigera-secure
   ```
1. Monitor progress until everything has the status, `Available`.
   ```bash
   watch kubectl get tigerastatus
   ```

#### Change a management cluster to a standalone cluster

1. Change your installation type to `Standalone`.
   ```bash
   kubectl delete managementcluster tigera-secure
   ```
1. Delete the service that you created to expose the management cluster.
   ```bash
   kubectl delete service <your-service-name> -n tigera-manager
   ```
1. Delete all managed cluster resources in your cluster.
   ```bash
   kubectl delete managedcluster --all
   ```
   >**Note**: Although installation automatically cleans up credentials for managed clusters, the management cluster Elasticsearch still retains managed cluster data based on the retention value that you specify in your [LogStorage]({{site.baseurl}}/reference/installation/api).
   {: .alert .alert-info}

#### Change a managed cluster to a standalone cluster

1. Ensure a persistent volume is provisioned to store log data for the standalone cluster. 
  See [Configure storage for logs and reports]({{site.baseurl}}/getting-started/create-storage).

1. Remove the `ManagementClusterConnection` from your cluster and delete the managed cluster connection secret.
   ```bash
   kubectl delete managementclusterconnection tigera-secure
   kubectl delete secret tigera-managed-cluster-connection -n tigera-operator
   ```
   >**Note**: If the operator in your managed cluster is running in a different namespace, use that namespace in the `kubectl delete secret...` command.
   {: .alert .alert-info}

1. Install the Tigera custom resources. 
   For more information, see [the installation reference]({{site.baseurl}}/reference/installation/api).
   ```bash
   kubectl apply -f {{ "/manifests/custom-resources.yaml" | absolute_url }}
   ```
1. Monitor the progress with the following command:
   ```bash
   watch kubectl get tigerastatus
   ```
   When all components show a status of `Available`, go to the next step.
1. Remove your managed cluster from the **management cluster**.
   ```bash
   kubectl delete managedcluster <your-managed-cluster-name>
   ```
