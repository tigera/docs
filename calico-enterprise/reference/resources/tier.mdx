---
title: Tier
description: API for this Calico Enterprise resource. 
canonical_url: /reference/resources/tier
no_canonical: true
---

A tier resource (`Tier`) represents an ordered collection of [NetworkPolicies]({{site.baseurl}}/reference/resources/networkpolicy)
and/or [GlobalNetworkPolicies]({{site.baseurl}}/reference/resources/globalnetworkpolicy).
Tiers are used to divide these policies into groups of different priorities.  These policies
are ordered within a Tier: the additional hierarchy of Tiers provides more flexibility
because the `Pass` `action` in a Rule jumps to the next Tier.  Some example use cases for this are.
- Allowing privileged users to define security policy that takes precedence over other users.
- Translating hierarchies of physical firewalls directly into {{site.prodname}} policy.

For `kubectl` [commands](https://kubernetes.io/docs/reference/kubectl/overview/){:target="_blank"}, the following case-insensitive aliases
may be used to specify the resource type on the CLI:
`tier.projectcalico.org`, `tiers.projectcalico.org` and abbreviations such as
`tier.p` and `tiers.p`.

### How Policy Is Evaluated

When a new connection is processed by {{site.prodname}}, each tier that contains a policy that applies to the endpoint processes the packet.
Tiers are sorted by their `order` - smallest number first.

Policies in each Tier are then processed in order.
- If a [NetworkPolicy]({{site.baseurl}}/reference/resources/networkpolicy) or [GlobalNetworkPolicy]({{site.baseurl}}/reference/resources/globalnetworkpolicy) in the Tier `Allow`s or `Deny`s the packet, then evaluation is done: the packet is handled accordingly.
- If a [NetworkPolicy]({{site.baseurl}}/reference/resources/networkpolicy) or [GlobalNetworkPolicy]({{site.baseurl}}/reference/resources/globalnetworkpolicy) in the Tier `Pass`es the packet, the next Tier containing a Policy that applies to the endpoint processes the packet.

If the Tier applies to the endpoint, but takes no action on the packet the packet is dropped.

If the last Tier applying to the endpoint `Pass`es the packet, that endpoint's [Profiles]({{site.baseurl}}/reference/resources/profile) are evaluated.

### Sample YAML

```yaml
apiVersion: projectcalico.org/v3
kind: Tier
metadata:
  name: internal-access
spec:
  order: 100

```

### Definition

#### Metadata

| Field | Description  | Accepted Values   | Schema |
|-------|--------------|-------------------|--------|
| name | The name of the tier.   |         | string |

#### Spec

| Field      | Description                                                                                                                                                         | Accepted Values | Schema                | Default               |
|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|-----------------------|-----------------------|
| order      | (Optional) Indicates priority of this Tier, with lower order taking precedence.  No value indicates highest order (lowest precedence)                             |                 | float                 | `nil` (highest order) |

All Policies created by {{site.prodname}} orchestrator integrations are created in the default (last) Tier.
