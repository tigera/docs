---
title: Google Kubernetes Engine (GKE)
description: Enable Calico network policy in GKE.
canonical_url: '/getting-started/kubernetes/gke'
---

### Big picture

Install {{site.prodname}} on a GKE managed Kubernetes cluster.

### Concepts

{{site.prodname}} supports the Calico CNI with {{site.prodname}} network policy:

The geeky details of what you get:
{% include geek-details.html details='Policy:Calico,IPAM:Host Local,CNI:Calico,Overlay:No,Routing:VPC Native,Datastore:Kubernetes' %}

### Before you begin

#### Supported
- {% include /content/gke.md %}

#### Required

**Verify cluster settings**

Verify the cluster has these Networking settings:
- Intranode visability is enabled
- Network policy is disabled
- Dataplane V2 is disabled
- GKE master access to TCP ports 5443, 8080 and 9090
   The GKE master must be able to access the {{site.prodname}} API server which runs with pod networking on TCP ports 5443 and 8080, and the {{site.prodname}} Prometheus server which runs with pod networking on TCP port 9090.  For multi-zone clusters and clusters with the "master IP range" configured, you will need to add a GCP firewall rule to allow access to those ports from the master nodes.   

**Verify IAM permissions**  

Verify your user account has IAM permissions to create Kubernetes ClusterRoles, ClusterRoleBindings, Deployments, Service Accounts, and Custom Resource Definitions. The easiest way to grant permissions is to assign the "Kubernetes Service Cluster Admin Role” to your user account. For help, see {% include open-new-window.html text='GKE access control' url='https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control' %}. 

> **Tip**: By default, GCP users often have permissions to create basic Kubernetes resources (such as Pods and Services) but lack the permissions to create ClusterRoles and other admin resources.  Even if you can create basic resources, it's worth verifying that you can create admin resources before continuing.

**Review {{site.prodname}} requirements**

- [Network requirements]({{site.baseurl}}/getting-started/kubernetes/requirements#network-requirements) to ensure network access is properly configured for {{site.prodname}} components

- If using a private registry, familiarize yourself with this guide on [using a private registry]({{site.baseurl}}/getting-started/private-registry)

- Ensure that you have the [credentials for the Tigera private registry and a license key]({{site.baseurl}}/getting-started/calico-enterprise#get-private-registry-credentials-and-license-key).

### How to

1. [Install {{site.prodname}}](#install-calico-enterprise)
1. [Install the {{site.prodname}} license](#install-the-calico-enterprise-license)
1. [Secure {{site.prodname}} with network policy](#secure-calico-enterprise-with-network-policy)

{% include content/install-gke.md clusterType="standalone" %}

### Next steps

- [Configure access to {{site.prodname}} Manager]({{site.baseurl}}/getting-started/cnx/access-the-manager)
- {% include open-new-window.html text='Video: Everything you need to know about Kubernetes networking on Google cloud' url='https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-networking-on-google-cloud/' %}
- [Get started with Kubernetes network policy]({{ site.baseurl }}/security/kubernetes-network-policy)
- [Get started with {{site.prodname}} network policy]({{ site.baseurl }}/security/calico-enterprise-policy)
- [Enable default deny for Kubernetes pods]({{ site.baseurl }}/security/kubernetes-default-deny)
