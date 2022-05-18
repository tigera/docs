---
title: DNS policy
description: Use domain names to allow traffic to destinations outside of a cluster by their DNS names instead of by their IP addresses.
canonical_url: '/security/domain-based-policy'
---

### Big picture

Use domain names to allow traffic to destinations outside of a cluster.

### Value

Using domain names in policies to identify services outside of the cluster is often operationally simpler and more robust than using IP addresses. In particular, they are useful when an external service does not map to a well known set of static IP addresses.

Domain names can include a wildcard (`*`), making it easier to manage large numbers of domains/subdomains.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **GlobalNetworkPolicy** with exact or wildcard domain names
- **NetworkPolicy** with exact or wildcard domain names
- **GlobalNetworkSet** with exact or wildcard domain names, where the network set is referenced in a GlobalNetworkPolicy
- **NetworkSet** with exact or wildcard domain names, where the network set is referenced in a NetworkPolicy

### Concepts

#### Allowed egress domains

Using domain names in policy rules is limited to only egress allow rules. {{site.prodname}} allows connections only to IP addresses returned from DNS lookups to trusted DNS servers. The supported DNS types are: A, AAAA, and CNAME records. The domain name must be an exact match; for example, **google.com** is treated as distinct from **www.google.com**.

> **Note:** Kubernetes labels provide a similar convenience for
> services within the cluster. Calico Enterprise does not support using
> domain names for services within the cluster. Use Kubernetes labels
> for services within the cluster.
{: .alert .alert-info}

#### Domain name matching

{% include content/domain-names.md %}

#### Workload and host endpoints

Policy with domain names can be enforced on workload or host endpoints.  When a policy with domain names applies to a workload endpoint, it
allows that workload to connect out to the specified domains.  When policy with domain names applies to a host endpoint, it allows clients
directly on the relevant host (including any host-networked workloads) to connect out to the specified domains.

#### Trusted DNS servers

{{site.prodname}} trusts DNS information only from its list of DNS trusted servers. Using trusted DNS servers to back domain names in
policy, prevents a malicious workload from using IPs returned by a fake DNS server to hijack domain names in policy rules.

By default, {{site.prodname}} trusts the Kubernetes cluster’s DNS service (kube-dns or CoreDNS). For workload endpoints, these
out-of-the-box defaults work with standard Kubernetes installs, so normally you won’t change them. For host endpoints you will need to add
the IP addresses that the cluster nodes use for DNS resolution.

### Before you begin

**Not supported**

{{site.prodname}} DNS policy does not support Kubernetes {% include open-new-window.html text='Using NodeLocal DNSCache in Kubernetes clusters' url='https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/' %} because it interferes with the ability to capture DNS traffic everywhere. 

### How to

You can specify allowed domain names directly in a **global network policy** or **namespaced network policy**, or specify domain names in a **global network set** (and then
reference the global network set in a global network policy).

- [Use domain names in a global network policy](#use-domain-names-in-a-global-network-policy)
- [Use domain names in a namespaced network policy](#use-domain-names-in-a-namespaced-network-policy)
- [Use domain names in a global network set, reference the set in a global network policy](#use-domain-names-in-a-global-network-set)

#### Best practice

Use a **global network set** when the same set of domains needs to be referenced in multiple policies, or when you want the allowed
destinations to be a mix of domains and IPs from global network sets, or IPs from workload endpoints and host endpoints. By using a single
destination selector in a global network set, you can potentially match all of these resources.

#### Use domain names in a global network policy

In this method, you create a **GlobalNetworkPolicy** with egress rules with `action: Allow` and a `destination.domains` field specifying the
domain names to which egress traffic is allowed.

In the following example, the first rule allows DNS traffic, and the second rule allows connections outside the cluster to domains
**api.alice.com** and ***.example.com** (which means `<anything>.example.com`, such as **bob.example.com**).

```
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: allow-egress-to-domains
spec:
  order: 1
  selector: my-pod-label == 'my-value'
  types:
  - Egress
  egress:
  - action: Allow
    protocol: UDP
    destination:
      ports:
      - 53
      - dns
  - action: Allow
    destination:
      domains:
      - api.alice.com
      - "*.example.com"
```
#### Use domain names in a namespaced network policy

In this method, you create a **NetworkPolicy** with egress rules with `action: Allow` and a `destination.domains` field specifying the
domain names to which egress traffic is allowed.

In the following example, the first rule allows DNS traffic, and the second rule allows connections outside the cluster to domains
**api.alice.com** and ***.example.com** (which means `<anything>.example.com`, such as **bob.example.com**).

```
apiVersion: projectcalico.org/v3
kind: NetworkPolicy
metadata:
  name: allow-egress-to-domains
  namespace: rollout-test
spec:
  order: 1
  selector: my-pod-label == 'my-value'
  types:
  - Egress
  egress:
  - action: Allow
    protocol: UDP
    destination:
      ports:
      - 53
      - dns
  - action: Allow
    destination:
      domains:
      - api.alice.com
      - "*.example.com"
```

The difference between this and the **GlobalNetworkPolicy** example is that this namespaced NetworkPolicy can only grant egress access, to the specified domains, to workload endpoints in the `rollout-test` namespace.

#### Use domain names in a global network set

In this method, you create a **GlobalNetworkSet** with the allowed destination domain names in the `allowedEgressDomains` field. Then,
you create a **GlobalNetworkPolicy** with a `destination.selector` that matches that GlobalNetworkSet.

In the following example, the allowed egress domains (`api.alice.com` and `*.example.com`) are specified in the GlobalNetworkSet.

```
apiVersion: projectcalico.org/v3
kind: GlobalNetworkSet
metadata:
  name: allowed-domains-1
  labels:
    color: red
spec:
  allowedEgressDomains:
  - api.alice.com
  - "*.example.com"
```

Then, you reference the global network set in a **GlobalNetworkPolicy** using a destination label selector.

```
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: allow-egress-to-domain
spec:
  order: 1
  selector: my-pod-label == 'my-value'
  types:
  - Egress
  egress:
  - action: Allow
    destination:
      selector: color == 'red'
```

#### Use domain names in a network set

In this method, you create a **NetworkSet** with the allowed destination domain names in the `allowedEgressDomains` field. Then,
you create a **NetworkPolicy** with a `destination.selector` that matches that NetworkSet.

In the following example, the allowed egress domains (`api.alice.com` and `*.example.com`) are specified in the NetworkSet.

```
apiVersion: projectcalico.org/v3
kind: NetworkSet
metadata:
  name: allowed-domains-1
  namespace: rollout-test
  labels:
    color: red
spec:
  allowedEgressDomains:
  - api.alice.com
  - "*.example.com"
```

Then, you reference the network set in a **NetworkPolicy** using a destination label selector.

```
apiVersion: projectcalico.org/v3
kind: NetworkPolicy
metadata:
  name: allow-egress-to-domain
  namespace: rollout-test
spec:
  order: 1
  selector: my-pod-label == 'my-value'
  types:
  - Egress
  egress:
  - action: Allow
    destination:
      selector: color == 'red'
```

### Above and beyond

To change the default DNS trusted servers, use the [DNSTrustedServers parameter]({{site.baseurl}}/reference/felix/configuration).

For more detail about the relevant resources, see
[GlobalNetworkSet]({{site.baseurl}}/reference/resources/globalnetworkset),
[GlobalNetworkPolicy]({{site.baseurl}}/reference/resources/globalnetworkpolicy),
[NetworkPolicy]({{site.baseurl}}/reference/resources/networkpolicy)
and
[NetworkSet]({{site.baseurl}}/reference/resources/networkset).
