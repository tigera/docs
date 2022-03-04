#### Install EKS with Amazon VPC networking

{% if include.clusterType == "standalone" %}
The geeky details of what you get:
{% include geek-details.html details='Policy:Calico,IPAM:AWS,CNI:AWS,Overlay:No,Routing:VPC Native,Datastore:Kubernetes' %}
{% endif %}

##### Create an EKS cluster

Make sure you have an EKS cluster **without {{site.prodname}} installed** and:

- {% include open-new-window.html text='A supported EKS Kubernetes version' url='https://docs.aws.amazon.com/eks/latest/userguide/platform-versions.html' %}
- [A supported {{site.prodname}} managed Kubernetes version]({{site.baseurl}}/getting-started/kubernetes/requirements#supported-managed-kubernetes-versions).

##### Install {{site.prodname}}

1. [Configure a storage class for {{site.prodname}}.]({{site.baseurl}}/getting-started/create-storage)

1. Install the Tigera operator and custom resource definitions.

   ```
   kubectl create -f {{ "/manifests/tigera-operator.yaml" | absolute_url }}
   ```

1. Install the Prometheus operator and related custom resource definitions. The Prometheus operator will be used to deploy Prometheus server and Alertmanager to monitor {{site.prodname}} metrics.

   > **Note**: If you have an existing Prometheus operator in your cluster that you want to use, skip this step. To work with {{site.prodname}}, your Prometheus operator must be v0.40.0 or higher.
   {: .alert .alert-info}

   ```
   kubectl create -f {{ "/manifests/tigera-prometheus-operator.yaml" | absolute_url }}
   ```

1. Install your pull secret.

   If pulling images directly from `quay.io/tigera`, you will likely want to use the credentials provided to you by your Tigera support representative. If using a private registry, use your private registry credentials instead.

   ```
   kubectl create secret generic tigera-pull-secret \
       --type=kubernetes.io/dockerconfigjson -n tigera-operator \
       --from-file=.dockerconfigjson=<path/to/pull/secret>
   ```

   For the Prometheus operator, create the pull secret in the `tigera-prometheus` namespace and then patch the deployment.

   ```
   kubectl create secret generic tigera-pull-secret \
       --type=kubernetes.io/dockerconfigjson -n tigera-prometheus \
       --from-file=.dockerconfigjson=<path/to/pull/secret>
   kubectl patch deployment -n tigera-prometheus calico-prometheus-operator \
       -p '{"spec":{"template":{"spec":{"imagePullSecrets":[{"name": "tigera-pull-secret"}]}}}}'
   ```

1. Install any extra [{{site.prodname}} resources]({{site.baseurl}}/reference/resources) needed at cluster start using [calicoctl]({{site.baseurl}}/reference/calicoctl/overview).

{% if include.clusterType != "managed" %}

1. Install the Tigera custom resources. For more information on configuration options available in this manifest, see [the installation reference]({{site.baseurl}}/reference/installation/api).

   ```
   kubectl create -f {{ "/manifests/eks/custom-resources.yaml" | absolute_url }}
   ```

   You can now monitor progress with the following command:

   ```
   watch kubectl get tigerastatus
   ```
{% else %}
1. Download the Tigera custom resources. For more information on configuration options available in this manifest, see [the installation reference]({{site.baseurl}}/reference/installation/api).

   ```bash
   curl -O -L {{ "/manifests/eks/custom-resources.yaml" | absolute_url }}
   ```

   Remove the `Manager` custom resource from the manifest file.

   ```yaml
   apiVersion: operator.tigera.io/v1
   kind: Manager
   metadata:
     name: tigera-secure
   spec:
     # Authentication configuration for accessing the Tigera manager.
     # Default is to use token-based authentication.
     auth:
       type: Token
   ```

   Remove the `LogStorage` custom resource from the manifest file.

   ```yaml
   apiVersion: operator.tigera.io/v1
   kind: LogStorage
   metadata:
     name: tigera-secure
   spec:
     nodes:
       count: 1
   ```
   Now apply the modified manifest.

   ```bash
   kubectl create -f ./custom-resources.yaml
   ```
1. Monitor progress with the following command:
   ```bash
   watch kubectl get tigerastatus
   ```
{% endif %}
{% if include.clusterType != "managed" %}
Wait until the `apiserver` shows a status of `Available`, then proceed to [install the {{site.prodname}} license](#install-the-calico-enterprise-license).
{% else %}
Wait until the `apiserver` shows a status of `Available`, then proceed to the next section.
{% endif %}

#### Install EKS with Calico networking

{% if include.clusterType == "standalone" %}
The geeky details of what you get:
{% include geek-details.html details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:VXLAN,Routing:Calico,Datastore:Kubernetes' %}
{% endif %}

> **Note**: {{site.prodname}} networking cannot currently be installed on the EKS control plane nodes. As a result the control plane nodes
> will not be able to initiate network connections to {{site.prodname}} pods. (This is a general limitation of EKS's custom networking support,
> not specific to {{site.prodname}}.) As a workaround, trusted pods that require control plane nodes to connect to them, such as those implementing
> admission controller webhooks, can include `hostNetwork:true` in their pod spec. See the Kuberentes API
> {% include open-new-window.html text='pod spec' url='https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#podspec-v1-core' %}
> definition for more information on this setting.
{: .alert .alert-info }

##### Create an EKS cluster

For these instructions, we will use `eksctl` to provision the cluster. However, you can use any of the methods in {% include open-new-window.html text='Getting Started with Amazon EKS' url='https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html' %}

Before you get started, make sure you have downloaded and configured the {% include open-new-window.html text='necessary prerequisites' url='https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html#eksctl-prereqs' %}

1. First, create an Amazon EKS cluster without any nodes.

   ```bash
   eksctl create cluster --name my-calico-cluster --without-nodegroup
   ```

1. Since this cluster will use {{site.prodname}} for networking, you must delete the `aws-node` daemon set to disable AWS VPC networking for pods.

   ```bash
   kubectl delete daemonset -n kube-system aws-node
   ```

##### Install {{site.prodname}}

1. [Configure a storage class for {{site.prodname}}.]({{site.baseurl}}/getting-started/create-storage)

1. Install the Tigera operator and custom resource definitions.

   ```
   kubectl create -f {{ "/manifests/tigera-operator.yaml" | absolute_url }}
   ```

1. Install the Prometheus operator and related custom resource definitions. The Prometheus operator will be used to deploy Prometheus server and Alertmanager to monitor {{site.prodname}} metrics.

   > **Note**: If you have an existing Prometheus operator in your cluster that you want to use, skip this step. To work with {{site.prodname}}, your Prometheus operator must be v0.40.0 or higher.
   {: .alert .alert-info}

   ```
   kubectl create -f {{ "/manifests/tigera-prometheus-operator.yaml" | absolute_url }}
   ```

1. Install your pull secret.

   If pulling images directly from `quay.io/tigera`, you will likely want to use the credentials provided to you by your Tigera support representative. If using a private registry, use your private registry credentials instead.

   ```
   kubectl create secret generic tigera-pull-secret \
       --type=kubernetes.io/dockerconfigjson -n tigera-operator \
       --from-file=.dockerconfigjson=<path/to/pull/secret>
   ```

   For the Prometheus operator, create the pull secret in the `tigera-prometheus` namespace and then patch the deployment.

   ```
   kubectl create secret generic tigera-pull-secret \
       --type=kubernetes.io/dockerconfigjson -n tigera-prometheus \
       --from-file=.dockerconfigjson=<path/to/pull/secret>
   kubectl patch deployment -n tigera-prometheus calico-prometheus-operator \
       -p '{"spec":{"template":{"spec":{"imagePullSecrets":[{"name": "tigera-pull-secret"}]}}}}'
   ```

1. Install any extra [{{site.prodname}} resources]({{site.baseurl}}/reference/resources) needed at cluster start using [calicoctl]({{site.baseurl}}/reference/calicoctl/overview).

1. To configure {{site.prodname}} for use with the Calico CNI plugin, we must create an `Installation` resource that has `spec.cni.type: Calico`. Install the `custom-resources-calico-cni.yaml` manifest,
   which includes this configuration. For more information on configuration options available in this manifest, see [the installation reference]({{site.baseurl}}/reference/installation/api).

{% if include.clusterType == "managed" %}
1. Download the Tigera custom resources. For more information on configuration options available in this manifest, see [the installation reference]({{site.baseurl}}/reference/installation/api).

   ```bash
   curl -O -L {{ "/manifests/eks/custom-resources-calico-cni.yaml" | absolute_url }}
   ```

   Remove the `Manager` custom resource from the manifest file.

   ```yaml
   apiVersion: operator.tigera.io/v1
   kind: Manager
   metadata:
     name: tigera-secure
   spec:
     # Authentication configuration for accessing the Tigera manager.
     # Default is to use token-based authentication.
     auth:
       type: Token
   ```

   Remove the `LogStorage` custom resource from the manifest file.

   ```yaml
   apiVersion: operator.tigera.io/v1
   kind: LogStorage
   metadata:
     name: tigera-secure
   spec:
     nodes:
       count: 1
   ```
   Now apply the modified manifest.

   ```bash
   kubectl create -f ./custom-resources-calico-cni.yaml
   ```
1. Monitor progress with the following command:
   ```bash
   watch kubectl get tigerastatus
   ```
{% else %}

   ```
   kubectl create -f {{ "/manifests/eks/custom-resources-calico-cni.yaml" | absolute_url }}
   ```

{% endif %}

1. Finally, add nodes to the cluster.

   ```bash
   eksctl create nodegroup --cluster my-calico-cluster --node-type t3.xlarge --node-ami auto --max-pods-per-node 100
   ```

   > **Tip**: Without the `--max-pods-per-node` option above, EKS will limit the {% include open-new-window.html text='number of pods based on node-type' url='https://github.com/awslabs/amazon-eks-ami/blob/master/files/eni-max-pods.txt' %}. See `eksctl create nodegroup --help` for the full set of node group options.

1. Monitor progress with the following command:

   ```
   watch kubectl get tigerastatus
   ```
   
   Wait until the `apiserver` shows a status of `Available`, then proceed to the next section.
   
{% if include.clusterType == "standalone" or include.clusterType == "management" %}

#### Install the {{site.prodname}} license

In order to use {{site.prodname}}, you must install the license provided to you by Tigera.

```
kubectl create -f </path/to/license.yaml>
```

You can now monitor progress with the following command:

```
watch kubectl get tigerastatus
```

When all components show a status of `Available`, proceed to the next section.

{% endif %}
   
{% if include.clusterType != "managed" %}

#### Secure {{site.prodname}} with network policy

To secure {{site.prodname}} component communications, install the following set of network policies.

```
kubectl create -f {{ "/manifests/tigera-policies.yaml" | absolute_url }}
```
{% endif %}

{% if include.clusterType == "management" %}
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
1. Get the login token for your new admin user, and log in to {{site.prodname}} Manager.

   ```bash
   {% raw %}kubectl get secret $(kubectl get serviceaccount mcm-user -o jsonpath='{range .secrets[*]}{.name}{"\n"}{end}' | grep token) -o go-template='{{.data.token | base64decode}}' && echo{% endraw %}
   ```
   In the top right banner, your management cluster is displayed as the first entry in the cluster selection drop-down menu with the fixed name, `management cluster`.

   ![Cluster Created]({{site.baseurl}}/images/mcm/mcm-management-cluster.png)

You have successfully installed a management cluster.

{% endif %}

{% if include.clusterType == "managed" %}
{% include content/configure-managed-cluster.md %}

#### Provide permissions to view the managed cluster

To access resources belonging to a managed cluster from the {{site.prodname}} Manager UI, the service or user account used to log in must have appropriate permissions defined in the managed cluster.

Let's define admin-level permissions for the service account (`mcm-user`) we created to log in to the Manager UI. Run the following command against your managed cluster.

```bash
kubectl create clusterrolebinding mcm-user-admin --serviceaccount=default:mcm-user --clusterrole=tigera-network-admin
```

{% endif %}
