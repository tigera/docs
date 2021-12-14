---
title: Install network policy on non-cluster hosts
description: Install Calico network policy so you can secure hosts not in a cluster.
canonical_url: '/getting-started/bare-metal/about'
---

### Big picture

Secure non-cluster hosts by installing {{site.prodname}} network policy.

### Value

Not all hosts in your environment run pods/workloads. You may have physical machines or legacy applications that you cannot move into a Kubernetes cluster, but still need to securely communicate with pods in your cluster. {{site.prodname}} lets you enforce policy on these **non-cluster hosts** using the same robust {{site.prodname}} network policy that you use for pods. This solution can also be used to protect bare metal/physical servers that run Kubernetes clusters instead of VMs.

### Concepts

#### Non-cluster hosts and host endpoints

A non-cluster host is a computer that is running an application that is *not part of a Kubernetes cluster*. But you can protect hosts using the same {{site.prodname}} network policy that you use for your Kubernetes cluster. In the following diagram, the Kubernetes cluster is running full {{site.prodname}} with networking (for pod-to-pod communications) and network policy; the non-cluster host uses {{site.prodname}} network policy only for host protection. 

![non-cluster-host]({{site.baseurl}}/images/non-cluster-host.png)

For non-cluster hosts, you can secure host interfaces using **host endpoints**. Host endpoints can have labels, and work the same as labels on pods/workload endpoints. The advantage is that you can write network policy rules to apply to both workload endpoints and host endpoints using label selectors; where each selector can refer to the either type (or be a mix of the two). For example, you can write a cluster-wide policy for non-cluster hosts that is immediately applied to every host. 

To learn how to restrict traffic to/from hosts using {{site.prodname}} network policy see, [Protect hosts]({{site.baseurl}}/security/protect-hosts). 

### Before you begin

**Supported**

All platforms supported in this release except Windows

**Required**

- Kubernetes API datastore is up and running and is accessible from the host
  
  If {{site.prodname}} is installed on a cluster, you already have a datastore.

- Non-cluster host meets {{site.prodname}} [system requirements]({{site.baseurl}}/getting-started/bare-metal/about) 
  - Ensure that your node OS includes the `ipset` and `conntrack` kernel dependencies
  - Install Docker if you are are using container install option (rather than binary install)  

### How to

- [Configure hosts to communicate with your Kubernetes cluster](#configure-hosts-to-communicate-with-your-kubernetes-cluster)

{% tabs %}
  <label: Binary install,active:true>
  <%

{% include content/non-cluster-binary-install.md %}

%>
  <label: Container install>
  <%

**Additional Requirements**
1. Verify that Docker is installed.
1. Configure container to start at boot time.
    The `{{site.nodecontainer}}` container should be started at boot time by your init system and the init system must be configured to restart it if stopped. {{site.prodname}} relies on that behavior for certain configuration changes.

{% include content/docker-container-service.md %}

%>
  {% endtabs %}

#### Configure hosts to communicate with your Kubernetes cluster

Using {{site.prodname}} network policy-only mode, you must ensure that the non-cluster host can directly communicate with your Kubernetes cluster. Here are some vendor tips:

**AWS**

- For hosts to communicate with your Kubernetes cluster, the node must be in the same VPC as nodes in your Kubernetes cluster, and must use the AWS VPC CNI plugin (used by default in EKS). 
- The Kubernetes cluster security group needs to allow traffic from your host endpoint. Make sure that an inbound rule is set so that traffic from your host endpoint node is allowed.
- For a non-cluster host to communicate with an EKS cluster, the correct IAM roles must be configured.
- You also need to provide authentication to your Kubernetes cluster using {% include open-new-window.html text='aws-iam-authenticator' url='https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html' %} and the {% include open-new-window.html text='aws cli' url='https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html' %} 

**GKE**

For hosts to communicate with your Kubernetes cluster directly, you must make the host directly reachable/routable; this is not set up by default with the VPC native network routing.

### Above and beyond 

- [Protect hosts]({{site.baseurl}}/security/protect-hosts)
