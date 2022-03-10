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

The following sample profile applies the label `stage: development` to any endpoint that includes `dev-apps` in its list of profiles.

```yaml
apiVersion: projectcalico.org/v3
kind: Profile
metadata:
  name: dev-apps
spec:
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
| ingress (deprecated) | The ingress rules belonging to this profile. | | List of [Rule](networkpolicy#rule) |
| egress  (deprecated) | The egress rules belonging to this profile. | | List of [Rule](networkpolicy#rule)  |
| labelsToApply | An optional set of labels to apply to each endpoint in this profile (in addition to the endpoint's own labels) |  | map |

For `Rule` details please see the [NetworkPolicy]({{ site.baseurl }}/reference/resources/networkpolicy) or
[GlobalNetworkPolicy]({{ site.baseurl }}/reference/resources/globalnetworkpolicy) resource.

### Supported operations

| Datastore type        | Create/Delete | Update | Get/List | Notes
|-----------------------|---------------|--------|----------|------
| Kubernetes API server | No            | No     | Yes      | {{site.prodname}} profiles are pre-assigned for each Namespace and Service Account.
