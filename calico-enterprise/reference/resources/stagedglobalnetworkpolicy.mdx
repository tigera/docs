---
title: Staged Global Network Policy
description: API for this resource.
---

A staged global network policy resource (`StagedGlobalNetworkPolicy`) represents an ordered set of rules which are applied
to a collection of endpoints that match a [label selector](#selector). These rules are used to preview network behavior and do
not to enforce network traffic. For enforcing network traffic, see [global network policy resource]({{site.baseurl}}/reference/resources/globalnetworkpolicy).

`StagedGlobalNetworkPolicy` is not a namespaced resource. `StagedGlobalNetworkPolicy` applies to [workload endpoint resources]({{site.baseurl}}/reference/resources/workloadendpoint) in all namespaces, and to [host endpoint resources]({{site.baseurl}}/reference/resources/hostendpoint).
Select a namespace in a `StagedGlobalNetworkPolicy` in the standard selector by using
`projectcalico.org/namespace` as the label name and a `namespace` name as the
value to compare against, e.g., `projectcalico.org/namespace == "default"`.
See [staged network policy resource]({{site.baseurl}}/reference/resources/stagednetworkpolicy) for staged namespaced network policy.

`StagedGlobalNetworkPolicy` resources can be used to define network connectivity rules between groups of {{site.prodname}} endpoints and host endpoints, and
take precedence over [Profile resources]({{site.baseurl}}/reference/resources/profile) if any are defined.

StagedGlobalNetworkPolicies are organized into [tiers]({{site.baseurl}}/reference/resources/tier), which provide an additional layer of ordering—in particular, note that the `Pass` action skips to the
next [tier]({{site.baseurl}}/reference/resources/tier), to enable hierarchical security policy.

For `kubectl` [commands](https://kubernetes.io/docs/reference/kubectl/overview/){:target="_blank"}, the following case-insensitive aliases
may be used to specify the resource type on the CLI:
`stagedglobalnetworkpolicy.projectcalico.org`, `stagedglobalnetworkpolicies.projectcalico.org` and abbreviations such as
`stagedglobalnetworkpolicy.p` and `stagedglobalnetworkpolicies.p`.

### Sample YAML

This sample policy allows TCP traffic from `frontend` endpoints to port 6379 on
`database` endpoints.

```yaml
apiVersion: projectcalico.org/v3
kind: StagedGlobalNetworkPolicy
metadata:
  name: internal-access.allow-tcp-6379
spec:
  tier: internal-access
  selector: role == 'database'
  types:
  - Ingress
  - Egress
  ingress:
  - action: Allow
    protocol: TCP
    source:
      selector: role == 'frontend'
    destination:
      ports:
      - 6379
  egress:
  - action: Allow
```

### Definition

#### Metadata

| Field | Description                               | Accepted Values                                     | Schema | Default |
|-------|-------------------------------------------|-----------------------------------------------------|--------|---------|
| name  | The name of the network policy. Required. | Alphanumeric string with optional `.`, `_`, or `-`. | string |         |

#### Spec

| Field              | Description                                                                                                                                           | Accepted Values | Schema                | Default |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|-----------------------|---------|
| order              | Controls the order of precedence. {{site.prodname}} applies the policy with the lowest value first.                                                   |                 | float                 |         |
| tier               | Name of the [tier]({{site.baseurl}}/reference/resources/tier) this policy belongs to.                                                   |                 | string                 |  `default` |
| selector           | Selects the endpoints to which this policy applies.                                                                                                   |                 | [selector](#selector) | all()   |
| types              | Applies the policy based on the direction of the traffic. To apply the policy to inbound traffic, set to `Ingress`. To apply the policy to outbound traffic, set to `Egress`. To apply the policy to both, set to `Ingress, Egress`. | `Ingress`, `Egress`  | List of strings | Depends on presence of ingress/egress rules\* |
| ingress            | Ordered list of ingress rules applied by policy.                                                                                                      |                 | List of [Rule](#rule) |         |
| egress             | Ordered list of egress rules applied by this policy.                                                                                                  |                 | List of [Rule](#rule) |         |
| doNotTrack\*\*     | Indicates to apply the rules in this policy before any data plane connection tracking, and that packets allowed by these rules should not be tracked. | true, false     | boolean               | false   |
| preDNAT\*\*        | Indicates to apply the rules in this policy before any DNAT.                                                                                          | true, false     | boolean               | false   |
| applyOnForward\*\* | Indicates to apply the rules in this policy on forwarded traffic as well as to locally terminated traffic.                                            | true, false     | boolean               | false   |
| serviceAccountSelector | Selects the service account(s) to which this policy applies.                                                                                        |                 | [selector](#selector)  | all()   |
| namespaceSelector | Selects the namespace(s) to which this policy applies.                                                                                        |                 | [selector](#selector)  | all()   |

\* If `types` has no value, {{site.prodname}} defaults as follows.

>| Ingress Rules Present | Egress Rules Present | `Types` value       |
 |-----------------------|----------------------|---------------------|
 | No                    | No                   | `Ingress`           |
 | Yes                   | No                   | `Ingress`           |
 | No                    | Yes                  | `Egress`            |
 | Yes                   | Yes                  | `Ingress, Egress`   |

\*\* The `doNotTrack` and `preDNAT` and `applyOnForward` fields are meaningful
only when applying policy to a [host endpoint]({{site.baseurl}}/reference/resources/hostendpoint).

Only one of `doNotTrack` and `preDNAT` may be set to `true` (in a given policy). If they are both `false`, or when applying the policy to a
[workload endpoint]({{site.baseurl}}/reference/resources/workloadendpoint),
the policy is enforced after connection tracking and any DNAT.

`applyOnForward` must be set to `true` if either `doNotTrack` or `preDNAT` is
`true` because for a given policy, any untracked rules or rules before DNAT will
 in practice apply to forwarded traffic.

See [Using {{site.prodname}} to Secure Host Interfaces]({{site.baseurl}}/reference/host-endpoints/)
for how `doNotTrack` and `preDNAT` and `applyOnForward` can be useful for host endpoints.

#### Rule

{% include content/rule.md %}

#### ICMP

{% include content/icmp.md %}

#### EntityRule

{% include content/entityrule.md global="true" %}

#### Selector

{% include content/selectors.md %}

#### Ports

{% include content/ports.md %}

#### ServiceAccountMatch

{% include content/serviceaccountmatch.md %}

#### ServiceMatch

{% include content/servicematch.md %}

### Supported operations

| Datastore type           | Create/Delete | Update | Get/List | Notes
|--------------------------|---------------|--------|----------|------
| Kubernetes API datastore | Yes           | Yes    | Yes      |
