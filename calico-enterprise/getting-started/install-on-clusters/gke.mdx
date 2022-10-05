---
title: Google Kubernetes Engine (GKE)
description: Enable Calico network policy in GKE.
canonical_url: '/getting-started/kubernetes/gke'
---

### Big picture

Install {{site.prodname}} on a GKE managed Kubernetes cluster.

{% comment %} CE supports only GKE CNI, even though OS/Calico supports Calico CNI. Verified with Shaun, Casey, and Sujeet in 3.15. So docs will continue to be misaligned so be careful during merges. Note that OS support of Calico CNI is only in v1 of the dataplane; in v2, Cillium is the supported CNI. Another misalignment is that CE install docs list all platforms supported; OS/Calico lists of supported CNIs based on an opinionated view. {% endcomment %}

### Before you begin

**CNI support**

GKE CNI with {{site.prodname}} network policy:

The geeky details of what you get:
{% include geek-details.html details='Policy:Calico,IPAM:Host Local,CNI:GKE,Overlay:No,Routing:VPC Native,Datastore:Kubernetes' %}

**Required**

- A [compatible GKE cluster]({{site.baseurl}}/getting-started/compatibility#gke)

- Cluster has these Networking settings:
    - Intranode visability is enabled
    - Network policy is disabled
    - Dataplane V2 is disabled
    - GKE master access to TCP ports 5443, 8080 and 9090
      The GKE master must be able to access the {{site.prodname}} API server which runs with pod networking on TCP ports 5443 and 8080, and the {{site.prodname}} Prometheus server which runs with pod networking on TCP port 9090.  For multi-zone clusters and clusters with the "master IP range" configured, you will need to add a GCP firewall rule to allow access to those ports from the master nodes.   

- User account has IAM permissions

   Verify your user account has IAM permissions to create Kubernetes ClusterRoles, ClusterRoleBindings, Deployments, Service Accounts, and Custom Resource Definitions. The easiest way to grant permissions is to assign the "Kubernetes Service Cluster Admin Role” to your user account. For help, see {% include open-new-window.html text='GKE access control' url='https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control' %}. 

   > **Tip**: By default, GCP users often have permissions to create basic Kubernetes resources (such as Pods and Services) but lack the permissions to create ClusterRoles and other admin resources. Even if you can create basic resources, it's worth verifying that you can create admin resources before continuing.
   {: .alert .alert-info}

- Cluster meets [system requirements]({{site.baseurl}}/getting-started/kubernetes/requirements#network-requirements)

- A [Tigera license key and credentials]({{site.baseurl}}/getting-started/calico-enterprise#get-private-registry-credentials-and-license-key)

- {% include open-new-window.html text='Install kubectl' url='https://kubernetes.io/docs/tasks/tools/install-kubectl/' %}

### How to

1. [Install {{site.prodname}}](#install-calico-enterprise)
1. [Install the {{site.prodname}} license](#install-the-calico-enterprise-license)

{% include content/install-gke.md clusterType="standalone" %}

### Next steps

- [Configure access to {{site.prodname}} Manager UI]({{site.baseurl}}/getting-started/cnx/access-the-manager)
- {% include open-new-window.html text='Video: Everything you need to know about Kubernetes networking on Google cloud' url='https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-networking-on-google-cloud/' %}
- [Get started with Kubernetes network policy]({{ site.baseurl }}/security/kubernetes-network-policy)
- [Get started with {{site.prodname}} network policy]({{ site.baseurl }}/security/calico-network-policy)
- [Enable default deny for Kubernetes pods]({{ site.baseurl }}/security/kubernetes-default-deny)
