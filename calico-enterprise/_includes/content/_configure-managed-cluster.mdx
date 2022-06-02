{% if kubectlCmd == nil %} {% assign kubectlCmd = "kubectl" %} {% endif %}

#### Create the connection manifest for your managed cluster
To connect the managed cluster to your management cluster, you need to create and apply a connection manifest. You
can create a connection manifest from the Manager UI in the management cluster or manually using {{kubectlCmd}}.

##### Connect cluster - Manager UI

1. In the Manager UI left navbar, click **Managed Clusters**.

1. On the Managed Clusters page, click the button, **Add Cluster**.

1. Name your cluster that is easily recognized in a list of managed clusters, and click Create Cluster.

1. Download the manifest.

##### Connect cluster - kubectl

Choose a name for your managed cluster and then add it to your **management cluster**. The following commands will
create a manifest with the name of your managed cluster in your current directory.

1. First, decide on the name for your managed cluster. Because you will eventually have several managed clusters, choose a name that can be easily recognized in a list of managed clusters. The name is also used in steps that follow.
   ```bash
   export MANAGED_CLUSTER=my-managed-cluster
   ```

1. Get the namespace in which the Tigera operator is running in your managed cluster (in most cases this will be `tigera-operator`):
   ```bash
   export MANAGED_CLUSTER_OPERATOR_NS=tigera-operator
   ```

1. Add a managed cluster and save the manifest containing a [ManagementClusterConnection]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.ManagementClusterConnection) and a Secret.
   ```bash
   {{kubectlCmd}} -o jsonpath="{.spec.installationManifest}" > $MANAGED_CLUSTER.yaml create -f - <<EOF
   apiVersion: projectcalico.org/v3
   kind: ManagedCluster
   metadata:
     name: $MANAGED_CLUSTER
   spec:
     operatorNamespace: $MANAGED_CLUSTER_OPERATOR_NS
   EOF
   ```

1. Verify that the `managementClusterAddr` in the manifest is correct.

#### Apply the connection manifest to your managed cluster
1. Apply the manifest that you modified in the step, **Add a managed cluster to the management cluster**.
   ```bash
   {{kubectlCmd}} apply -f $MANAGED_CLUSTER.yaml
   ```
1. Monitor progress with the following command:
   ```bash
   watch {{kubectlCmd}} get tigerastatus
   ```
   Wait until the `management-cluster-connection` and `tigera-compliance` show a status of `Available`.

1. Secure {{site.prodname}} on the managed cluster with network policy.
   
   ```bash
   {{kubectlCmd}} create -f {{ "/manifests/tigera-policies-managed.yaml" | absolute_url }}
   ```

You have now successfully installed a managed cluster!
