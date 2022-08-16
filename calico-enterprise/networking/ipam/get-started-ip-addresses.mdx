---
title: Get started with IP address management
description: Configure Calico Enterprise to use Calico Enterprise IPAM or host-local IPAM, and when to use one or the other.
---

### Big picture

Understand how IP address management (IPAM) functions in a Kubernetes cluster using {{site.prodname}}.

### Value

Different IPAM techniques provide different feature sets. {{site.prodname}}’s IPAM provides additional IP allocation efficiency and flexibility compared to other address management approaches.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **{{site.prodname}} IPAM**
- **Integration with host-local IPAM**
- **IPPool resource**

### Concepts

#### IPAM in Kubernetes

Kubernetes uses IPAM plugins to allocate and manage IP addresses assigned to pods. Different IPAM plugins provide different feature sets. {{site.prodname}} provides its own IPAM plugin called **calico-ipam** which is designed to work well with {{site.prodname}} and includes a number of features.

#### {{site.prodname}} IPAM

The **calico-ipam** plugin uses {{site.prodname}}’s IP pool resource to control how IP addresses are allocated to pods within the cluster. This is the default plugin used by most {{site.prodname}} installations.

By default, {{site.prodname}} uses a single IP pool for the entire Kubernetes pod CIDR, but you can divide the pod CIDR into several pools. You can assign separate IP pools to particular selections of **nodes**, or to teams, users, or applications within a cluster using **namespaces**.

You can control which pools {{site.prodname}} uses for each pod using

- node selectors
- an annotation on the pod’s namespace, or
- an annotation on the pod

{{site.prodname}} also supports the **host-local** IPAM plugin. However, when using the host-local IPAM plugin some {{site.prodname}} features are not available.

#### {{site.prodname}} IPAM blocks

In {{site.prodname}} IPAM, IP pools are subdivided into blocks -- smaller chunks that are associated with a particular node in the cluster. Each node in the cluster can have one or more blocks associated with it. {{site.prodname}} will automatically create and destroy blocks as needed as the number of nodes and pods in the cluster grows or shrinks.

Blocks allow {{site.prodname}} to efficiently aggregate addresses assigned to pods on the same node, reducing the size of the routing table. By default {{site.prodname}} will try to allocate IP addresses from within an associated block, creating a new block if necessary. {{site.prodname}} can also assign addresses to pods on a node that are not within a block associated with that node. This allows for IP allocations independent of the node on which a pod is launched.

By default, {{site.prodname}} creates blocks with room for 64 addresses (a /26), but you can control block sizes for each IP pool.

#### Host-local IPAM

The host-local plugin is a simple IP address management plugin. It uses predetermined CIDRs statically allocated to each node in order to choose addresses for pods. Once set, the CIDR for a node cannot be modified. Pods can be assigned addresses only from within the CIDR allocated to the node.

{{site.prodname}} can use the host-local IPAM plugin, using the **Node.Spec.PodCIDR** field in the Kubernetes API to determine the CIDR to use for each node. However, per-node, per-pod, and per-namespace IP allocation features are not available using the host-local plugin.

The host-local IPAM plugin is primarily used by other methods of routing pod traffic from one host to another. For example, it is used when installing {{site.prodname}} for policy enforcement with flannel networking, as well as when using {{site.prodname}} in Google Kubernetes Engine (GKE).

### Before you begin

**Limitations**

- Works for platforms that use the Calico CNI

### How to

#### Install {{site.prodname}} with calico-ipam

Follow one of the [getting started guides]({{ site.baseurl }}/getting-started/) to install {{site.prodname}}.

#### Install {{site.prodname}} with host-local IPAM

Follow one of the [getting started guides]({{ site.baseurl }}/getting-started/) to install {{site.prodname}} with flannel networking, or on GKE.

Or, see the [reference documentation on host-local IPAM]({{ site.baseurl }}/reference/cni-plugin/configuration#using-host-local-ipam).

### Tutorial

For a blog/tutorial on IP pools, see {% include open-new-window.html text='Calico Enterpise IPAM: Explained and Enhanced' url='https://www.tigera.io/blog/calico-ipam-explained-and-enhanced/' %}.

### Above and beyond

- [IP Pool]({{ site.baseurl }}/reference/resources/ippool)

There are several other ways to leverage {{site.prodname}} IPAM including:

- [Assign addresses based on topology]({{ site.baseurl }}/networking/assign-ip-addresses-topology)
- [Use a specific address for a pod]({{ site.baseurl }}/networking/use-specific-ip)
- [Migrate from one IP pool to another]({{ site.baseurl }}/networking/migrate-pools)
- [Restrict a pod to use an IP address in a specific range]({{ site.baseurl }}/networking/legacy-firewalls)
- [View IP address utilization]({{ site.baseurl }}/reference/calicoctl/ipam/show)
- [Change IP address block size]({{ site.baseurl }}/reference/resources/ippool)
