---
title: Global network set
description: API for this Calico Enterprise resource.
canonical_url: '/reference/resources/globalnetworkset'
---

A global network set resource (GlobalNetworkSet) represents an arbitrary set of IP subnetworks/CIDRs,
allowing it to be matched by {{site.prodname}} policy.  Network sets are useful for applying policy to traffic
coming from (or going to) external, non-{{site.prodname}}, networks.

GlobalNetworkSets can also include domain names, whose effect is to allow egress traffic to those
domain names, when the GlobalNetworkSet is matched by the destination selector of an egress rule
with action Allow.  Domain names have no effect in ingress rules, or in a rule whose action is not
Allow.

> **Note**: {{site.prodname}} implements policy for domain names by learning the
> corresponding IPs from DNS, then programming rules to allow those IPs.  This means that
> if multiple domain names A, B and C all map to the same IP, and there is domain-based
> policy to allow A, traffic to B and C will be allowed as well.
{: .alert .alert-info}

The metadata for each network set includes a set of labels.  When {{site.prodname}} is calculating the set of
IPs that should match a source/destination selector within a
[global network policy]({{ site.baseurl }}/reference/resources/globalnetworkpolicy) rule, or within a
[network policy]({{ site.baseurl }}/reference/resources/networkpolicy) rule whose `namespaceSelector` includes `global()`, it includes
the CIDRs from any network sets that match the selector.

> **Important**: Since {{site.prodname}} matches packets based on their source/destination IP addresses,
> {{site.prodname}} rules may not behave as expected if there is NAT between the {{site.prodname}}-enabled node and the
> networks listed in a network set.  For example, in Kubernetes, incoming traffic via a service IP is
> typically SNATed by the kube-proxy before reaching the destination host so {{site.prodname}}'s workload
> policy will see the kube-proxy's host's IP as the source instead of the real source.
{: .alert .alert-danger}

For `kubectl` [commands](https://kubernetes.io/docs/reference/kubectl/overview/){:target="_blank"}, the following case-insensitive aliases
may be used to specify the resource type on the CLI:
`globalnetworkset.projectcalico.org`, `globalnetworksets.projectcalico.org` and abbreviations such as
`globalnetworkset.p` and `globalnetworksets.p`.

### Sample YAML

```yaml
apiVersion: projectcalico.org/v3
kind: GlobalNetworkSet
metadata:
  name: a-name-for-the-set
  labels:
    role: external-database
spec:
  nets:
  - 198.51.100.0/28
  - 203.0.113.0/24
  allowedEgressDomains:
  - db.com
  - "*.db.com"
```

### Global network set definition

#### Metadata

| Field       | Description                                | Accepted Values                                     | Schema  |
|-------------|--------------------------------------------|-----------------------------------------------------|---------|
| name        | The name of this network set.              | Lower-case alphanumeric with optional `-` or `-`.   | string  |
| labels      | A set of labels to apply to this endpoint. |                                                     | map     |

#### Spec

| Field       | Description                                  | Accepted Values                                         | Schema | Default    |
|-------------|----------------------------------------------|---------------------------------------------------------|--------|------------|
| nets        | The IP networks/CIDRs to include in the set. | Valid IPv4 or IPv6 CIDRs, for example "192.0.2.128/25"  | list   |            |
| allowedEgressDomains | The list of domain names that belong to this set and are honored in egress allow rules only.  Domain names specified here only work to allow egress traffic from the cluster to external destinations.  They don't work to _deny_ traffic to destinations specified by domain name, or to allow ingress traffic from _sources_ specified by domain name. | List of [exact or wildcard domain names](#exact-and-wildcard-domain-names) | list   |            |

#### Exact and wildcard domain names

{% include content/domain-names.md %}
