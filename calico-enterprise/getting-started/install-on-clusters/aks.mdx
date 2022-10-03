---
title: Microsoft Azure Kubernetes Service (AKS)
description: Install Calico Enterprise for an AKS cluster.
canonical_url: '/getting-started/kubernetes/aks'
---

### Big picture

Install {{site.prodname}} on an AKS managed Kubernetes cluster.

### Concepts

{{site.prodname}} supports:

- Azure CNI networking with {{site.prodname}} network policy 

   The geeky details of what you get:
   {% include geek-details.html details='Policy:Calico,IPAM:Azure,CNI:Azure,Overlay:No,Routing:VPC Native,Datastore:Kubernetes' %}

- Calico CNI with {{site.prodname}} network policy 

   The geeky details of what you get:
   {% include geek-details.html details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:IPIP,Routing:BGP,Datastore:kubernetes' %}   

### Before you begin

#### Supported
{% include /content/aks.md %}

- Verify cluster is not using a Kubernetes reconciler

  If your cluster has an existing version of {{site.prodname}} installed, verify that the cluster is not managed by any kind of Kubernetes reconciler. For example, if addon-manager exists, there will be an annotation called, `addonmanager.kubernetes.io/mode` on either of the following resources (if the resources exist):
    - `tigera-operator` deployment in the `tigera-operator` namespace
    - `calico-node` daemonset in the `kube-system` namespace

- Verify IAM permissions

  Verify your user account has IAM permissions to create Kubernetes ClusterRoles, ClusterRoleBindings, Deployments, Service Accounts, and Custom Resource Definitions. The easiest way to grant permissions is to assign the "Kubernetes Service Cluster Admin Role” to your user account. For help, see {% include open-new-window.html text='AKS access control' url='https://docs.microsoft.com/en-us/azure/aks/control-kubeconfig-access'%}

- Review {{site.prodname}} requirements

  - [Network requirements]({{site.baseurl}}/getting-started/kubernetes/requirements#network-requirements) to ensure network access is properly configured for {{site.prodname}} components.

  - If using a private registry, familiarize yourself with this guide on [using a private registry]({{site.baseurl}}/getting-started/private-registry)

  - Ensure that you have the [credentials for the Tigera private registry and a license key]({{site.baseurl}}/getting-started/calico-enterprise)

### How to

1. [Option A: Install with Azure CNI networking](#install-aks-with-azure-cni-networking)
1. [Option B: Install with Calico networking](#install-aks-with-{{site.prodnamedash}}-networking)
1. [Install the {{site.prodname}} license](#install-the-calico-enterprise-license)

{% include content/install-aks.md clusterType="standalone" %}

### Next steps

- [Configure access to {{site.prodname}} Enterprise Manager]({{site.baseurl}}/getting-started/cnx/access-the-manager)
- {% include open-new-window.html text='Video: Everything you need to know about Kubernetes networking on Azure' url='https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-networking-on-azure/' %}
- [Get started with Kubernetes network policy]({{site.baseurl}}/security/kubernetes-network-policy)
- [Get started with {{site.prodname}} network policy]({{site.baseurl}}/security/calico-network-policy)
- [Enable default deny for Kubernetes pods]({{site.baseurl}}/security/kubernetes-default-deny)
