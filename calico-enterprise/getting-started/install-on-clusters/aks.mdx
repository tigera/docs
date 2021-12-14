---
title: Microsoft Azure Kubernetes Service (AKS)
description: Enable Calico network policy in AKS.
canonical_url: '/getting-started/kubernetes/aks'
---

### Big picture

Install {{site.prodname}} on an AKS managed Kubernetes cluster.

### Concepts

{{site.prodname}} supports Azure CNI networking with {{site.prodname}} network policy. 

The geeky details of what you get:
{% include geek-details.html details='Policy:Calico,IPAM:Azure,CNI:Azure,Overlay:No,Routing:VPC Native,Datastore:Kubernetes' %}

### Before you begin

#### Supported
- {% include /content/aks.md %}

#### Required

**Verify cluster is not using a Kubernetes reconciler**

If your cluster has an existing version of {{site.prodname}} installed, verify that the cluster is not managed by any kind of Kubernetes reconciler. For example, if addon-manager exists, there will be an annotation called, `addonmanager.kubernetes.io/mode` on either of the following resources (if the resources exist):
  - `tigera-operator` deployment in the `tigera-operator` namespace
  - `calico-node` daemonset in the `kube-system` namespace

**Verify CNI**

- Verify that AKS is configured with the {% include open-new-window.html text='Azure CNI' url='https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest' %} in {% include open-new-window.html text='transparent mode' url='https://docs.microsoft.com/en-us/azure/aks/faq#what-is-azure-cni-transparent-mode-vs-bridge-mode' %}.

  - **If cluster was created using Azure CLI**

    AKS clusters created using the {% include open-new-window.html text='Azure CLI' url='https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest' %} are created with transparent mode by default. Ensure cluster is started with the option `--network-plugin azure`

  - **If cluster was created using Azure Resource Manager (ARM) template**

    > **Note**: {% include open-new-window.html text='ARM templates' url='https://azure.microsoft.com/en-us/resources/templates/?resourceType=Microsoft.Containerservice&term=AKS' %} must create resources using {% include open-new-window.html text='Microsoft.ContainerService apiVersion 2020-02-01' url='https://docs.microsoft.com/en-us/azure/templates/microsoft.containerservice/2020-02-01/managedclusters' %} or newer
    {: .alert .alert-info}

    1. Enable network mode using the `aks-preview` extension.

       ```sh
       az extension add --name aks-preview
       az feature register -n AKSNetworkModePreview --namespace Microsoft.ContainerService
        az provider register -n Microsoft.ContainerService
      ```

    2. Create cluster using `az deployment group create` with the values:
   
       ```json
       "networkProfile": {
        "networkPlugin": "azure",
        "networkMode": "transparent"
       }
       ```

**Verify IAM permissions**

Verify your user account has IAM permissions to create Kubernetes ClusterRoles, ClusterRoleBindings, Deployments, Service Accounts, and Custom Resource Definitions. The easiest way to grant permissions is to assign the "Kubernetes Service Cluster Admin Role” to your user account. For help, see {% include open-new-window.html text='AKS access control' url='https://docs.microsoft.com/en-us/azure/aks/control-kubeconfig-access'%}

**Review {{site.prodname}} requirements**

- [Network requirements]({{site.baseurl}}/getting-started/kubernetes/requirements#network-requirements) to ensure network access is properly configured for {{site.prodname}} components.

- If using a private registry, familiarize yourself with this guide on [using a private registry]({{site.baseurl}}/getting-started/private-registry)

- Ensure that you have the [credentials for the Tigera private registry and a license key]({{site.baseurl}}/getting-started/calico-enterprise)

### How to

1. [Install {{site.prodname}}](#install-calico-enterprise)
1. [Install the {{site.prodname}} license](#install-the-calico-enterprise-license)
1. [Secure {{site.prodname}} with network policy](#secure-calico-enterprise-with-network-policy)

{% include content/install-aks.md clusterType="standalone" %}

### Next steps

- [Configure access to {{site.prodname}} Enterprise Manager]({{site.baseurl}}/getting-started/cnx/access-the-manager)
- {% include open-new-window.html text='Video: Everything you need to know about Kubernetes networking on Azure' url='https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-networking-on-azure/' %}
- [Get started with Kubernetes network policy]({{ site.baseurl }}/security/kubernetes-network-policy)
- [Get started with {{site.prodname}} network policy]({{ site.baseurl }}/security/calico-network-policy)
- [Enable default deny for Kubernetes pods]({{ site.baseurl }}/security/kubernetes-default-deny)
