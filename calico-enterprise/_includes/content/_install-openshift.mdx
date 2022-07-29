#### Create a configuration file for the OpenShift installer

First, create a staging directory for the installation. This directory will contain the configuration file, along with cluster state files, that OpenShift installer will create:

```
mkdir openshift-tigera-install && cd openshift-tigera-install
```

Now run OpenShift installer to create a default configuration file:

```
openshift-install create install-config
```

> **Note**: See the {% include open-new-window.html text='OpenShift installer documentation' url='https://cloud.redhat.com/openshift/install' %} for more information
> about the installer and any configuration changes required for your platform.
{: .alert .alert-info}

After the installer finishes, your staging directory will contain the configuration file `install-config.yaml`.

#### Update the configuration file to use {{site.prodname}}

Override the OpenShift networking to use {{site.prodname}} and update the AWS instance types to meet the [system requirements]({{site.baseurl}}/getting-started/openshift/requirements):

```bash
sed -i 's/OpenShiftSDN/Calico/' install-config.yaml
sed -i 's/platform: {}/platform:\n    aws:\n      type: m4.xlarge/g' install-config.yaml
```

#### Generate the install manifests

Now generate the Kubernetes manifests using your configuration file:

```bash
openshift-install create manifests
```

{% include content/openshift-manifests.md %}

{% comment %} For IPI hybrid clusters (Linux + Windows) we need to enable VXLAN and disable BGP{% endcomment %}
{% if include.clusterOS == "hybrid" %}
Edit the Installation custom resource manifest `manifests/01-cr-installation.yaml` so that it enables VXLAN and disables BGP. This is required for {{site.prodnameWindows}}:

```
apiVersion: operator.tigera.io/v1
kind: Installation
metadata:
  name: default
spec:
  variant: Calico
  calicoNetwork:
    bgp: Disabled
    ipPools:
    - blockSize: 26
      cidr: 10.128.0.0/14
      encapsulation: VXLAN
      natOutgoing: Enabled
      nodeSelector: all()
```
{% endif %}

#### Add an image pull secret

{% include content/openshift-pull-secret.md %}

#### Provide additional configuration

To provide additional configuration during installation (for example, BGP configuration or peers), use a Kubernetes ConfigMap with your desired {{site.prodname}} resources. If you do not need to provide additional configuration, skip this section.

To include [{{site.prodname}} resources]({{site.baseurl}}/reference/resources) during installation, edit `manifests/02-configmap-calico-resources.yaml` in order to add your own configuration.

> **Notes**: If you have a directory with the {{site.prodname}} resources, you can create the file with the command:
> ```
> kubectl create configmap -n tigera-operator calico-resources \
>   --from-file=<resource-directory> --dry-run -o yaml \
>   > manifests/02-configmap-calico-resources.yaml
> ```
> With recent versions of `kubectl` it is necessary to have a kubeconfig configured or add `--server='127.0.0.1:443'`
> even though it is not used.

> If you have provided a `calico-resources` configmap and the tigera-operator pod fails to come up with `Init:CrashLoopBackOff`,
> check the output of the init-container with `kubectl logs -n tigera-operator -l k8s-app=tigera-operator -c create-initial-resources`.
{: .alert .alert-info}

#### Create the cluster

Start the cluster creation with the following command and wait for it to complete.

```bash
openshift-install create cluster
```

#### Create a storage class

{{site.prodname}} requires storage for logs and reports. Before finishing the installation, you must [create a StorageClass for {{site.prodname}}]({{site.baseurl}}/getting-started/create-storage).

{% if include.clusterType == "standalone" or include.clusterType == "management" %}

#### Install the {{site.prodname}} license

In order to use {{site.prodname}}, you must install the license provided to you by Tigera support representative.
Before applying the license, wait until the Tigera API server is ready with the following command:

```
watch oc get tigerastatus
```

Wait until the `apiserver` shows a status of `Available`.

Once the Tigera API server is ready, apply the license:

```
oc create -f </path/to/license.yaml>
```

{% endif %}

#### Install {{site.prodname}} resources

[comment]: # (OCP_ENTERPRISE_RESOURCES variable in Makefile needs to be updated for any addition or deletion of enterprise resources)

{% if include.clusterType == "managed" %}
Download the Tigera custom resources. For more information on configuration options available in this manifest, see [the installation reference]({{site.baseurl}}/reference/installation/api).

```bash
curl -O -L {{ "/manifests/tigera-enterprise-resources.yaml" | absolute_url }}
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
oc create -f ./tigera-enterprise-resources.yaml
```
{% else %}
Apply the custom resources for enterprise features.

```bash
oc create -f {{ "/manifests/tigera-enterprise-resources.yaml" | absolute_url }}
```
{% endif %}

{% include content/openshift-prometheus-operator.md operation="install" %}

You can now monitor progress with the following command:

```
watch oc get tigerastatus
```

When it shows all components with status `Available`, proceed to the next section.

{% if include.clusterType == "managed" %}
#### Secure {{site.prodname}} components with network policy

To secure the components that make up {{site.prodname}}, install the following set of network policies.

```
oc create -f {{ "/manifests/ocp/tigera-policies-managed.yaml" | absolute_url }}
```
{% else %}
#### Secure {{site.prodname}} components with network policy

To secure the components that make up {{site.prodname}}, install the following set of network policies.

```
oc create -f {{ "/manifests/ocp/tigera-policies.yaml" | absolute_url }}
```
{% endif %}

{% if include.clusterType == "management" %}
#### Create a management cluster
To control managed clusters from your central management plane, you must ensure it is reachable for connections. The simplest way to get started (but not for production scenarios), is to configure a `NodePort` service to expose the management cluster. Note that the service must live within the `tigera-manager` namespace.

1.  Create a service to expose the management cluster.
    The following example of a NodePort service may not be suitable for production and high availability. For options, see [Fine-tune multi-cluster management for production]({{site.baseurl}}/multicluster/mcm/fine-tune-deployment).
    Apply the following service manifest.

    ```bash
    oc create -f - <<EOF
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
   oc apply -f - <<EOF
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
   oc create sa mcm-user
   oc create clusterrolebinding mcm-user-admin --serviceaccount=default:mcm-user --clusterrole=tigera-network-admin
   ```
1. Get the login token for your new admin user, and log in to {{site.prodname}} Manager.

   ```bash
   {% raw %}oc get secret $(oc get serviceaccount mcm-user -o jsonpath='{range .secrets[*]}{.name}{"\n"}{end}' | grep token) -o go-template='{{.data.token | base64decode}}' && echo{% endraw %}
   ```
   In the top right banner, your management cluster is displayed as the first entry in the cluster selection drop-down menu with the fixed name, `management cluster`.

   ![Cluster Created]({{site.baseurl}}/images/mcm/mcm-management-cluster.png)

You have successfully installed a management cluster.

{% endif %}

{% if include.clusterType == "managed" %}
{% assign kubectlCmd = "oc" %}
{% include content/configure-managed-cluster.md%}

#### Provide permissions to view the managed cluster

To access resources belonging to a managed cluster from the {{site.prodname}} Manager UI, the service or user account used to log in must have appropriate permissions defined in the managed cluster.

Let's define admin-level permissions for the service account (`mcm-user`) we created to log in to the Manager UI. Run the following command against your managed cluster.

```bash
oc create clusterrolebinding mcm-user-admin --serviceaccount=default:mcm-user --clusterrole=tigera-network-admin
```

{% endif %}
{% if include.clusterOS == "hybrid" %}
{% include content/install-openshift-windows.md %}
{% endif %}
