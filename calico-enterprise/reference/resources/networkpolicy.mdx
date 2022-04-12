---
title: Network policy
description: API for this Calico Enterprise resource.
canonical_url: '/reference/resources/networkpolicy'
---

A network policy resource (`NetworkPolicy`) represents an ordered set of rules which are applied
to a collection of endpoints that match a [label selector](#selector).

`NetworkPolicy` is a namespaced resource. `NetworkPolicy` in a specific namespace
only applies to [workload endpoint resources]({{site.baseurl}}/reference/resources/workloadendpoint)
in that namespace. Two resources are in the same namespace if the `namespace`
value is set the same on both.
See [global network policy resource]({{site.baseurl}}/reference/resources/globalnetworkpolicy) for non-namespaced network policy.

`NetworkPolicy` resources can be used to define network connectivity rules between groups of {{site.prodname}} endpoints and host endpoints, and
take precedence over [profile resources]({{site.baseurl}}/reference/resources/profile) if any are defined.

NetworkPolicies are organized into [tiers]({{site.baseurl}}/reference/resources/tier), which provide an additional layer of ordering—in particular, note that the `Pass` action skips to the
next [tier]({{site.baseurl}}/reference/resources/tier), to enable hierarchical security policy.

For `kubectl` [commands](https://kubernetes.io/docs/reference/kubectl/overview/){:target="_blank"}, the following case-insensitive aliases
may be used to specify the resource type on the CLI:
`networkpolicy.projectcalico.org`, `networkpolicies.projectcalico.org` and abbreviations such as
`networkpolicy.p` and `networkpolicies.p`.

### Sample YAML

This sample policy allows TCP traffic from `frontend` endpoints to port 6379 on
`database` endpoints.

```yaml
apiVersion: projectcalico.org/v3
kind: NetworkPolicy
metadata:
  name: internal-access.allow-tcp-6379
  namespace: production
spec:
  tier: internal-access
  selector: role == 'database'
  types:
  - Ingress
  - Egress
  ingress:
  - action: Allow
    metadata:
      annotations:
        from: frontend
        to: database
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

| Field     | Description                                                        | Accepted Values                                     | Schema | Default   |
|-----------|--------------------------------------------------------------------|-----------------------------------------------------|--------|-----------|
| name      | The name of the network policy. Required.                          | Alphanumeric string with optional `.`, `_`, or `-`. | string |           |
| namespace | Namespace provides an additional qualification to a resource name. |                                                     | string | "default" |


#### Spec

| Field    | Description                                                                                         | Accepted Values | Schema                | Default |
|----------|-----------------------------------------------------------------------------------------------------|-----------------|-----------------------|---------|
| order    | Controls the order of precedence. {{site.prodname}} applies the policy with the lowest value first. |                 | float                 |         |
| tier     | Name of the [tier]({{site.baseurl}}/reference/resources/tier) this policy belongs to.                                                   |                 | string                 |  `default` |
| selector | Selects the endpoints to which this policy applies.                                                 |                 | [selector](#selector) | all()   |
| types    | Applies the policy based on the direction of the traffic. To apply the policy to inbound traffic, set to `Ingress`. To apply the policy to outbound traffic, set to `Egress`. To apply the policy to both, set to `Ingress, Egress`. | `Ingress`, `Egress` | List of strings | Depends on presence of ingress/egress rules\* |
| ingress  | Ordered list of ingress rules applied by policy.                                                    |                 | List of [Rule](#rule) |         |
| egress   | Ordered list of egress rules applied by this policy.                                                |                 | List of [Rule](#rule) |         |
| serviceAccountSelector | Selects the service account(s) to which this policy applies. Select a specific service account by name using the `projectcalico.org/name` label.  |                 | [selector](#selector) | all()   |

\* If `types` has no value, {{site.prodname}} defaults as follows.

>| Ingress Rules Present | Egress Rules Present | `Types` value       |
 |-----------------------|----------------------|---------------------|
 | No                    | No                   | `Ingress`           |
 | Yes                   | No                   | `Ingress`           |
 | No                    | Yes                  | `Egress`            |
 | Yes                   | Yes                  | `Ingress, Egress`   |


#### Rule

{% include content/rule.md %}

#### ICMP

{% include content/icmp.md %}

#### EntityRule

{% include content/entityrule.md global="false" %}

#### Selector

{% include content/selectors.md %}
{% include content/selector-scopes.md %}

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
