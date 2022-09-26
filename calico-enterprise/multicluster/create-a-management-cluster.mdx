---
title: Create a Calico Enterprise management cluster
description: Create a Calico Enterprise management cluster to manage multiple clusters from a single management plane.
canonical_url: '/multicluster/mcm/create-a-management-cluster'
---

### Big picture

Create a {{site.prodname}} management cluster to manage multiple clusters from a single management plane.

### Value

Managing standalone clusters and multiple instances of Elasticsearch is not onerous when you first install {{site.prodname}}. But as you move to production with 300+ clusters, it is not scalable; you need centralized cluster management and log storage. With {{site.prodname}} multi-cluster management, you can securely connect multiple clusters from different cloud providers in a single management plane, and control user access using RBAC. This architecture also supports federation of network policy resources across clusters, and lays the foundation for a “single pane of glass.” 

### Features

This how-to guide uses the following {{site.prodname}} features:

- **Installation API** with `ManagementCluster` resource
- {{site.prodname}} Manager user interface

### Before you begin...

**Required**

- A Calico Enterprise cluster, see [here]({{site.baseurl}}/getting-started/install-on-clusters) for help
- A reachable, public IP address for the management cluster 

### How to

#### Create a management cluster
To control managed clusters from your central management plane, you must ensure it is reachable for connections. The simplest way to get started (but not for production scenarios), is to configure a `NodePort` service to expose the management cluster. Note that the service must live within the `tigera-manager` namespace.

1.  Create a service to expose the management cluster.
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

1. Export the service port number, and the public IP or host of the management cluster. (Ex. "example.com:1234" or "10.0.0.10:1234".)
   ```bash
   export MANAGEMENT_CLUSTER_ADDR=<your-management-cluster-addr>
   ```
1. Apply the [ManagementCluster]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.ManagementCluster) CR.

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

#### Create an admin user and verify management cluster connection

To access resources in a managed cluster from the {{site.prodname}} Manager within the management cluster, the logged-in user must have appropriate permissions defined in that managed cluster (clusterrole bindings).

1. Create an admin user called, `mcm-user` in the default namespace with full permissions, by applying the following commands.

   ```bash
   kubectl create sa mcm-user
   kubectl create clusterrolebinding mcm-user-admin --serviceaccount=default:mcm-user --clusterrole=tigera-network-admin
   ```

1. Create a secret for the service account

   >**Note**: This step is needed if your Kubernetes cluster is version v1.24 or above. Prior to Kubernetes v1.24, this secret is created automatically.
   {: .alert .alert-info}

   ```bash
   kubectl apply -f - <<EOF
   apiVersion: v1
   kind: Secret
   type: kubernetes.io/service-account-token
   metadata:
     name: mcm-user
     annotations:
       kubernetes.io/service-account.name: "mcm-user"
   EOF
   ```

1. For Kubernetes v1.24+, use the following command to obtain the token for the secret associated with your host

    ```bash
    kubectl describe secret mcm-user
    ```

    For Kubernetes clusters prior to version v1.24, use the following command to retrieve your token:

   ```bash
   {% raw %}kubectl get secret $(kubectl get serviceaccount mcm-user -o jsonpath='{range .secrets[*]}{.name}{"\n"}{end}' | grep token) -o go-template='{{.data.token | base64decode}}' && echo{% endraw %}
   ```
   In the top right banner, your management cluster is displayed as the first entry in the cluster selection drop-down menu with the fixed name, `management cluster`.

   ![Cluster Created]({{site.baseurl}}/images/mcm/mcm-management-cluster.png)

You have successfully installed a management cluster.

### Next steps

- To create and add a managed cluster to your management cluster, see [Create and configure a managed cluster]({{site.baseurl}}/multicluster/mcm/create-a-managed-cluster)
- When you are ready to fine-tune your multi-cluster management deployment for production, see [Fine-tune multi-cluster management]({{site.baseurl}}/multicluster/mcm/fine-tune-deployment)
- To change an existing {{site.prodname}} standalone cluster to a management or managed cluster, see [Change cluster types]({{site.baseurl}}/multicluster/mcm/change-cluster-type)
