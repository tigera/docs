---
title: Configure dual stack or IPv6 only
description: Configure dual stack or IPv6 only for workloads.
canonical_url: '/networking/ipv6'
---

### Big picture

Configure {{site.prodname}} IP address allocation to use dual stack or IPv6 only for workload communications.

### Value

Workload communication over IPv6 is increasingly desirable, as well as or instead of IPv4. {{site.prodname}} supports:

- **IPv4 only** (default)

  Each workload gets an IPv4 address, and can communicate over IPv4.

- **Dual stack**

  Each workload gets an IPv4 and an IPv6 address, and can communicate over IPv4 or IPv6.

- **IPv6 only**

  Each workload gets an IPv6 address, and can communicate over IPv6.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **CNI plugin configuration** with `assign_ipv6` and `assign_ipv4` flags
- **IPPool**

### Before you begin

**{{site.prodname}} requirements**

- {{site.prodname}} IPAM

**Kubernetes version requirements**
  - For dual stack, 1.16 and later
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

>**Note**: The following tasks are only for new clusters.
{: .alert .alert-info}

- [Enable IPv6 only](#enable-ipv6-only)
- [Enable dual stack](#enable-dual-stack)

#### Enable IPv6 only

To configure an IPv6-only cluster using the operator, edit your default Installation at install time to include a single IPv6 pool, and no IPv4 pools. For example:

```yaml
apiVersion: operator.tigera.io/v1
kind: Installation
metadata:
  name: default
spec:
  calicoNetwork:
    # Note: The ipPools section cannot be modified post-install.
   ipPools:
   - blockSize: 122
     cidr: 2001::00/64
     encapsulation: None
     natOutgoing: Enabled
     nodeSelector: all()
```

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
