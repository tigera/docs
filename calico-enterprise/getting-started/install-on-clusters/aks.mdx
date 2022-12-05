---
title: Microsoft Azure Kubernetes Service (AKS)
description: Install Calico Enterprise for an AKS cluster.
canonical_url: '/getting-started/kubernetes/aks'
---

### Big picture

Install {{site.prodname}} on an AKS managed Kubernetes cluster.

### Before you begin

**CNI support**

- Calico CNI for networking with {{site.prodname}} network policy

   The geeky details of what you get: 
   {% include geek-details.html details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:IPIP,Routing:BGP,Datastore:Kubernetes' %}

- Azure CNI networking with {{site.prodname}} network policy

   The geeky details of what you get: 
   {% include geek-details.html details='Policy:Calico,IPAM:Azure,CNI:Azure,Overlay:No,Routing:VPC Native,Datastore:Kubernetes' %}

**Required**

- A [compatible AKS cluster]({{site.baseurl}}/getting-started/compatibility#aks) 

  - To use the Calico CNI, you must configure the AKS cluster with {% include open-new-window.html text='Bring your own CNI' url='https://docs.microsoft.com/en-us/azure/aks/use-byo-cni?tabs=azure-cli' %}
  - To use the Azure CNI, see {% include open-new-window.html text='Azure CNI networking' url='https://docs.microsoft.com/en-us/azure/aks/configure-azure-cni' %}

- Cluster is not using a Kubernetes reconciler

   If your cluster has an existing version of {{site.prodname}} installed, verify that the cluster is not managed by any kind of Kubernetes reconciler. For example, if addon-manager exists, there will be an annotation called, `addonmanager.kubernetes.io/mode` on either of the following resources (if the resources exist):
    - `tigera-operator` deployment in the `tigera-operator` namespace
    - `calico-node` daemonset in the `kube-system` namespace

- User account has IAM permissions

   Verify your user account has IAM permissions to create Kubernetes ClusterRoles, ClusterRoleBindings, Deployments, Service Accounts, and Custom Resource Definitions. The easiest way to grant permissions is to assign the "Kubernetes Service Cluster Admin Role” to your user account. For help, see {% include open-new-window.html text='AKS access control' url='https://docs.microsoft.com/en-us/azure/aks/control-kubeconfig-access'%}.

- Cluster meets [system requirements]({{site.baseurl}}/getting-started/kubernetes/requirements)

- A [Tigera license key and credentials]({{site.baseurl}}/getting-started/calico-enterprise)

- {% include open-new-window.html text='Install kubectl' url='https://kubernetes.io/docs/tasks/tools/install-kubectl/' %}

1. [Option A: Install with Azure CNI networking](#install-with-azure-cni-networking)
1. [Option B: Install with Calico networking](#install-with-{{site.prodnamedash}}-networking)
1. [Install the {{site.prodname}} license](#install-the-calico-enterprise-license)

{% include content/install-aks.md clusterType="standalone" %}

### Next steps

- [Configure access to {{site.prodname}} Manager UI]({{site.baseurl}}/getting-started/cnx/access-the-manager)
- {% include open-new-window.html text='Video: Everything you need to know about Kubernetes networking on Azure' url='https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-networking-on-azure/' %}
- [Get started with Kubernetes network policy]({{site.baseurl}}/security/kubernetes-network-policy)
- [Get started with {{site.prodname}} network policy]({{site.baseurl}}/security/calico-network-policy)
- [Enable default deny for Kubernetes pods]({{site.baseurl}}/security/kubernetes-default-deny)
