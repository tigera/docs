---
title: Alert exception
description: API for this Calico Enterprise resource. 
canonical_url: '/reference/resources/alertexception'
---

An alert exception resource represents a filter to silent certain alerts over a specific time window
or indefinitely. Alert exceptions affect search results in the "Alerts" page in {{site.prodname}}
Manager UI.

For `kubectl` [commands](https://kubernetes.io/docs/reference/kubectl/overview/){:target="_blank"},
the following case-insensitive aliases can be used to specify the resource type on the CLI:
`alertexception.projectcalico.org`, `alertexceptions.projectcalico.org` and abbreviations such as
`alertexception.p` and `alertexceptions.p`.

### Sample YAML

```yaml
apiVersion: projectcalico.org/v3
kind: AlertException 
metadata:
  name: sample
spec:
  description: "Sample alert exception"
  selector: origin = "<desired alert origin>" and source_namespace = "<desired source namespace>"
  startTime: "2022-01-02T00:00:00Z"
  endTime: "2022-01-03T00:00:00Z"
```

### Alert exception definition

| Field | Description | Accepted Values | Schema |
|---|---|---|---|
| name | The name of this alert exception. | Alphanumeric string with optional `.`, `_`, or `-`. | string |

#### Spec

| Field | Description | Type | Required | Acceptable Values |
|---|---|---|---|---|---|
| description | Human-readable description of the alert exception. | string | yes |
| selector | Selects alerts to filter from {{site.prodname}} Manager UI queries. | string | yes | [selector](#selector)
| startTime | Defines the start time from which this alert exception will start filtering alerts. | Date in RFC 3339 format | yes | [startTime](#starttime) |
| endTime | Defines the end time at which this alert exception will stop filtering alerts. | Date in RFC 3339 format | | [endTime](#endtime) |

#### Selector

A selector is an expression which matches alerts based on their fields.
For each alert, `origin` and `type` fields are always set but other fields can be empty.

| Field | Description |
|---|---|
| origin | User specified or generated names from {{site.prodname}} threat defense components. |
| type | Indicates which {{site.prodname}} threat defense components an alert is generated from. |
| host | Name of the node that triggers this alert. |
| dest_ip | IP address of the destination pod. |
| dest_name | Name of the destination pod. |
| dest_name_aggr | Aggregated name of the destination pod. |
| dest_namespace | Namespace of the destination endpoint. A `-` means the endpoint is not namespaced. |
| source_ip | IP address of the source pod. |
| source_name | Name of the source pod. |
| source_name_aggr | Aggregated name of the source pod. |
| source_namespace | Namespace of the source endpoint. A `-` means the endpoint is not namespaced. |

The selector also supports logical operators, which can be combined into larger expressions.

| Expression | Meaning |
|---|---|
| `<expression 1> AND <expression 2>` | Matches if and only if both `<expression 1>`, and, `<expression 2>` matches
| `<expression 1> OR <expression 2>` | Matches if and only if either `<expression 1>`, or, `<expression 2>` matches.

#### StartTime

Defines the start time from which this alert exception will start filtering alerts in RFC 3339 format. This value is required.

#### EndTime

Defines the end time from which this alert exception will stop filtering alerts in RFC 3339 format.
If omitted, alerts will be filtered indefinitely.
If the value is changed to the past, this alert exception will be disabled immediately.
