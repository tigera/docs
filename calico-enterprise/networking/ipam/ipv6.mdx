---
title: Configure dual stack 
description: Configure dual stack for workloads.
canonical_url: '/networking/ipv6'
feature_name: dual_stack
---

### Big picture

Configure {{site.prodname}} IP address allocation to use dual stack for workload communications.

### Value

In addition to IPv4, IPv6 is increasingly desirable for Workload communication. {{site.prodname}} supports:

- **IPv4 only** (default)

  Each workload gets an IPv4 address, and can communicate over IPv4.

- **Dual stack**

  Each workload gets an IPv4 and an IPv6 address, and can communicate over IPv4 or IPv6.


### Features

This how-to guide uses the following {{site.prodname}} features:

- **CNI plugin configuration** with `assign_ipv6` and `assign_ipv4` flags
- **IPPool**

### Before you begin

**{{site.prodname}} requirements**

- {{site.prodname}} IPAM
- OpenShift 
  - Requires 4.8 for IPv6/IPv4 dual-stack and IPv6 single stack support
  - Requires 3.11 and later using {{site.prodname}} 3.4 and later for IPv6 support

**Kubernetes version requirements**
  - For dual stack, 1.20 and later
  - For one IP stack at a time (IPv4 or IPv6), any Kubernetes version

**Kubernetes IPv6 host requirements**
  - An IPv6 address that is reachable from the other hosts
  - The sysctl setting, `net.ipv6.conf.all.forwarding`, is set to `1`.
    This ensures both Kubernetes service traffic and {{site.prodname}} traffic is forwarded appropriately.
  - A default IPv6 route

**Kubernetes IPv4 host requirements**
  - An IPv4 address that is reachable from the other hosts
  - The sysctl setting, `net.ipv4.conf.all.forwarding`, is set to `1`.
    This ensures both Kubernetes service traffic and {{site.prodname}} traffic is forwarded appropriately.
  - A default IPv4 route

### How to

>**Note**: The following task is only for new clusters.
{: .alert .alert-info}

#### Enable dual stack

1. Set up a new cluster following the Kubernetes {% include open-new-window.html text='prerequisites' url='https://kubernetes.io/docs/concepts/services-networking/dual-stack/#prerequisites' %} and {% include open-new-window.html text='enablement steps' url='https://kubernetes.io/docs/concepts/services-networking/dual-stack/#enable-ipv4-ipv6-dual-stack' %}.

To configure dual-stack cluster using the operator, edit your default Installation at install time to include both an IPv4 and IPv6 pool. For example:

```yaml
apiVersion: operator.tigera.io/v1
kind: Installation
metadata:
  name: default
spec:
  # Configures Calico networking.
  calicoNetwork:
    # Note: The ipPools section cannot be modified post-install.
  ipPools:
  - blockSize: 26
    cidr: 10.48.0.0/21
    encapsulation: IPIP
    natOutgoing: Enabled
    nodeSelector: all()
  - blockSize: 122
    cidr: 2001::00/64
    encapsulation: None
    natOutgoing: Enabled
    nodeSelector: all()
```

### Above and beyond

- [Configure Kubernetes control plane to operate over IPv6]({{site.baseurl}}/networking/ipv6-control-plane)
