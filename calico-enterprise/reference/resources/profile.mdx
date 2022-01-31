---
title: Profile
description: API for this Calico Enterprise resource.
canonical_url: '/reference/resources/profile'
---

A profile resource (`Profile`) represents a set of rules which are applied
to the individual endpoints to which this profile has been assigned.

Each {{site.prodname}} endpoint or host endpoint can be assigned to zero or more profiles.

This resource is not supported in `kubectl`.

### Sample YAML

The following sample profile allows all traffic from endpoints that
have the label `stage: development` (i.e. endpoints that reference this profile),
except that *all* traffic from 10.0.20.0/24 is denied.

```yaml
apiVersion: projectcalico.org/v3
kind: Profile
metadata:
  name: dev-apps
spec:
  ingress:
  - action: Deny
    source:
      nets:
      - 10.0.20.0/24
  - action: Allow
    source:
      selector: stage == 'development'
  egress:
  - action: Allow
  labelsToApply:
    stage: development
```

### Definition

#### Metadata

| Field       | Description                 | Accepted Values   | Schema | Default    |
|-------------|-----------------------------|-------------------|--------|------------|
| name   | The name of the profile. Required. | Alphanumeric string with optional `.`, `_`, or `-`. | string |
| labels | A set of labels for this profile. |  | map of string key to string values |

#### Spec

| Field       | Description                 | Accepted Values   | Schema | Default    |
|-------------|-----------------------------|-------------------|--------|------------|
| ingress (deprecated) | The ingress rules belonging to this profile. | | List of [Rule](#rule) |
| egress  (deprecated) | The egress rules belonging to this profile. | | List of [Rule](#rule)  |
| labelsToApply | An optional set of labels to apply to each endpoint in this profile (in addition to the endpoint's own labels) |  | map |

#### Rule

{% include content/rule.md %}

#### ICMP

{% include content/icmp.md %}

#### EntityRule

{% include content/entityrule.md %}

#### Selector

{% include content/selectors.md %}
{% include content/selector-scopes.md %}

#### Ports

{% include content/ports.md %}

#### ServiceAccountMatch

{% include content/serviceaccountmatch.md %}

#### ServiceMatch

{% include content/servicematch.md %}

### Application layer policy

Application layer policy is an optional feature of {{site.prodname}} and
[must be enabled]({{site.baseurl}}/security/app-layer-policy)
in order to use the following match criteria.

> **NOTE**: Application layer policy match criteria are supported with the following restrictions.
>  * Only ingress policy is supported. Egress policy must not contain any application layer policy match clauses.
>  * Rules must have the action `Allow` if they contain application layer policy match clauses.
{: .alert .alert-info}

#### HTTPMatch

{% include content/httpmatch.md %}

### Supported operations

| Datastore type        | Create/Delete | Update | Get/List | Notes
|-----------------------|---------------|--------|----------|------
| Kubernetes API server | No            | No     | Yes      | {{site.prodname}} profiles are pre-assigned for each Namespace and Service Account.
