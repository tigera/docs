---
title: Global Alert
description: API for this Calico Enterprise resource. 
---

A global alert resource represents a query that is periodically run
against data sets collected by {{site.prodname}} whose findings are
added to the "Alerts" page in {{site.prodname}} Manager. Alerts may
search for the existence of rows in a query, or when aggregated metrics
satisfy a condition.

{{site.prodname}} supports alerts on the following data sets:

 * [Audit logs]({{site.baseurl}}/visibility/elastic/audit-overview)
 * [DNS logs]({{site.baseurl}}/visibility/elastic/dns)
 * [Flow logs]({{site.baseurl}}/visibility/elastic/flow)
 * [L7 logs]({{site.baseurl}}/visibility/elastic/l7)

For `kubectl` [commands](https://kubernetes.io/docs/reference/kubectl/overview/){:target="_blank"}, the following case-insensitive aliases
can be used to specify the resource type on the CLI:
`globalalert.projectcalico.org`, `globalalerts.projectcalico.org` and abbreviations such as
`globalalert.p` and `globalalerts.p`.

### Sample YAML

```yaml
apiVersion: projectcalico.org/v3
kind: GlobalAlert
metadata:
  name: sample
spec:
  summary: "Sample"
  description: "Sample ${client_namespace}/${client_name_aggr}"
  severity: 100
  dataSet: flows
  query: action=allow
  aggregateBy: [client_namespace, client_name_aggr]
  field: num_flows
  metric: sum
  condition: gt
  threshold: 0
```

### GlobalAlert definition

#### Metadata

| Field | Description | Accepted Values | Schema |
|---|---|---|---|
| name | The name of this alert. | Lower-case alphanumeric with optional `-`  | string |

#### Spec

| Field | Description | Type | Required | Acceptable Values | Default |
|---|---|---|---|---|---|
| type | Type will dictate how the fields of the GlobalAlert will be utilized. Each `type` will have different usages and/or defaults for the other GlobalAlert fields as described in the table. | string | no | RuleBased, AnomalyDetection | RuleBased |
| description | Human-readable description of the template. | string | yes |
| summary | Template for the description field in generated events. See the summary section below for more details. `description` is used if this is omitted. | string | no |
| severity | Severity of the alert for display in Manager. | int | yes | 1 - 100 |
| dataSet | Which data set to execute the alert against. | string | if `type` is `RuleBased` | audit, dns, flows, l7 |
| period |  Fow often the query defined will run, if `type` is `RuleBased`.  How often the `detector` defined will run, if `type` is `AnomalyDetection`. | duration | no | 1h 2m 3s | 5m, 15m if `type` is `RuleBased` |
| lookback | How much data to gather at once. Must exceed audit log flush interval, `dnsLogsFlushInterval`, or `flowLogsFlushInterval` as appropriate. Ignored if `type` is `AnomalyDetection`. | duration | no | 1h 2m 3s | 10m |
| query | Which data to include from the source data set. Written in a domain-specific query language. Ignored if `type` is `AnomalyDetection`. See the query section below. | string | no |
| aggregateBy | An optional list of fields to aggregate results. Ignored if `type` is `AnomalyDetection`. | string array | no |
| field | Which field to aggregate results by if using a metric other than count. Ignored if `type` is `AnomalyDetection`. | string | if metric is one of avg, max, min, or sum |
| metric | A metric to apply to aggregated results. `count` is the number of log entries matching the aggregation pattern. Others are applied only to numeric fields in the logs. Ignored if `type` is `AnomalyDetection`. | string | no | avg, max, min, sum, count |
| condition | Compare the value of the metric to the threshold using this condition. Ignored if `type` is `AnomalyDetection`. | string | if metric defined | eq, not_eq, lt, lte, gt, gte |
| threshold | A numeric value to compare the value of the metric against. Ignored if `type` is `AnomalyDetection`. | float | if metric defined |
| substitutions | An optional list of values to replace variable names in query. Ignored if `type` is `AnomalyDetection`. | List of [GlobalAlertSubstitution](#globalalertsubstitution) | no |
| detector | Detector specifies the parametes to run `AnomalyDetection` for a detector. See the detector section below for more details. | [Detector](#detector) |  if `type` is `AnomalyDetection` |

#### GlobalAlertSubstitution

| Field | Description | Type | Required |
|---|---|---|---|
| name | The name of the global alert substitution. It will be referenced by the variable names in query. Duplicate names are not allowed in the substitutions list. | string | yes |
| values | A list of values for this substitution. Wildcard operators asterisk (`*`) and question mark (`?`) are supported. | string array | yes |

### Detector

| Field | Description | Type | Required |
|---|---|---|---|
| name | Name specifies the AnomalyDetection Detector to run. The name has to match a detector ID which can be found in the [Anomaly detection reference page]({{site.baseurl}}/reference/anomaly-detection/all-detectors). | string | yes |

#### Status

| Field | Description |
|---|---|
| lastUpdate | When the alert was last modified on the backend. |
| active | Whether the alert is active on the backend. |
| healthy | Whether the alert is in an error state or not. |
| lastExecuted | When the query for the alert last ran. |
| lastEvent | When the condition of the alert was last satisfied and an alert was successfully generated. |
| errorConditions | List of errors preventing operation of the updates or search. |

### Query

Alerts use a domain-specific query language to select which records
from the data set should be used in the alert. This could be used to
identify flows with specific features, or to select (or omit) certain
namespaces from consideration.

The query language is composed of any number of selectors, combined
with boolean expressions (`AND`, `OR`, and `NOT`), set expressions
(`IN` and `NOTIN`) and bracketed subexpressions. These are translated
by {{site.prodname}} to Elastic DSL queries that are executed on the backend.

Set expressions support wildcard operators asterisk (`*`) and question mark (`?`). 
The asterisk sign matches zero or more characters and the question mark matches a single character.
Set values can be embedded into the query string or reference the values
in the global alert substitution list.

A selector consists of a key, comparator, and value. Keys and values
may be identifiers consisting of alphanumerics and underscores (`_`)
with the first character being alphabetic or an underscore, or may be
quoted strings. Values may also be integer or floating point numbers.
Comparators may be `=` (equal), `!=` (not equal), `<` (less than),
`<=` (less than or equal), `>` (greater than), or `>=` (greater than
or equal).

Keys must be indexed fields in their corresponding data set. See the
appendix for a list of valid keys in each data set.

Examples:

 * `query: "count > 0"`
 * `query: "\"servers.ip\" = \"127.0.0.1\""`

Selectors may be combined using `AND`, `OR`, and `NOT` boolean expressions,
`IN` and `NOTIN` set expressions, and bracketed subexpressions.

Examples:

 * `query: "count > 100 AND client_name=mypod"`
 * `query: "client_namespace = ns1 OR client_namespace = ns2"`
 * `query: "count > 100 AND NOT (client_namespace = ns1 OR client_namespace = ns2)"`
 * `query: "(qtype = A OR qtype = AAAA) AND rcode != NoError"`
 * `query: "process_name IN {\"proc1?\", \"*proc2\"} AND source_namespace = ns1`
 * `query: "qname NOTIN ${domains}"`

### Aggregation

Results from the query can be aggregated by any number of data fields.
Only these data fields will be included in the generated alerts, and
each unique combination of aggregations will generate a unique alert.
Careful consideration of fields for aggregation will yield the best
results.

Some good choices for aggregations on the `flows` data set are
`[source_namespace, source_name_aggr, source_name]`, `[source_ip]`,
`[dest_namespace, dest_name_aggr, dest_name]`, and `[dest_ip]`
depending on your use case. For the `dns` data set,
`[client_namespace, client_name_aggr, client_name]` is a good choice
for an aggregation pattern.

### Metrics and conditions

Results from the query can be further aggregated using a metric that
is applied to a numeric field, or counts the number of rows in an
aggregation. Search hits satisfying the condition are output as
alerts.

| Metric | Description | Applied to Field |
|---|---|---|
| count | Counts the number of rows | No |
| min | The minimal value of the field | Yes |
| max | The maximal value of the field | Yes |
| sum | The sum of all values of the field | Yes |
| avg | The average value of the field | Yes |

| Condition | Description |
|---|---|
| eq | Equals |
| not_eq | Not equals |
| lt | Less than |
| lte | Less than or equal |
| gt | Greater than |
| gte | Greater than or equal |

Example:

```yaml
apiVersion: projectcalico.org/v3
kind: GlobalAlert
metadata:
  name: frequent-dns-responses
spec:
  description: "Monitor for NXDomain"
  summary: "Observed ${sum} NXDomain responses for ${qname}"
  severity: 100
  dataSet: dns
  query: rcode = NXDomain AND (rtype = A or rtype = AAAA)
  aggregateBy: qname
  field: count
  metric: sum
  condition: gte
  threshold: 100
```

This alert identifies non-existing DNS responses for Internet addresses
that were observed more than 100 times in the past 10 minutes.

#### Unconditional alerts

If the `field`, `metric`, `condition`, and `threshold` fields of an
alert are left blank then the alert will trigger whenever its query
returns any data. Each hit (or aggregation pattern, if `aggregateBy`
is non-empty) returned will cause an event to be created. This should
be used **only** when the query is highly specific to avoid filling
the Alerts page and index with a large number of events. The use of
`aggregateBy` is strongly recommended to reduce the number of entries
added to the Alerts page.

The following example would alert on incoming connections to postgres
pods from the Internet that were not denied by policy. It runs hourly
to reduce the noise. Noise could be further reduced by removing
`source_ip` from the `aggregateBy` clause at the cost of removing
`source_ip` from the generated events.

```yaml
period: 1h
lookback: 75m
query: "dest_labels=\"application=postgres\" AND source_type=net AND action=allow AND proto=tcp AND dest_port=5432"
aggregateBy: [dest_namespace, dest_name, source_ip]
```

### Summary template

Alerts may include a summary template to provide context for the
alerts in the {{site.prodname}} Manager Alert user interface. Any field
in the `aggregateBy` section, or the value of the `metric` may be
substituted in the summary using a bracketed variable syntax.

Example:

```yaml
summary: "Observed ${sum} NXDomain responses for ${qname}"
```

The `description` field is validated in the same manner. If not
provided, the `description` field is used in place of the `summary`
field.

### Period and lookback

The interval between alerts, and the amount of data considered by the
alert may be controlled using the `period` and `lookback` parameters
respectively. These fields are formatted as [duration](https://golang.org/pkg/time/#ParseDuration) strings.

 > A duration string is a possibly signed sequence of decimal numbers,
 > each with optional fraction and a unit suffix, such as "300ms",
 > "-1.5h" or "2h45m". Valid time units are "ns", "us" (or "µs"),
 > "ms", "s", "m", "h".

The minimum duration of a period is 1 minute with a default of 5 minutes and 
the default for lookback is 10 minutes. For a 
GlobalAlert with `type` as `AnomalyDetection`, the default period is 
set at 15 minutes and lookback is ignored. The lookback should always be 
greater than the sum of the period and the configured  
`FlowLogsFlushInterval` or `DNSLogsFlushInterval` as appropriate to avoid 
gaps in coverage.

### Alert records

With only aggregations and no metrics, the alert will generate one event
per aggregation pattern returned by the query. The record field will
contain only the aggregated fields. As before, this should be used
with specific queries.

The addition of a metric will include the value of that metric in the
record, along with any aggregations. This, combined with queries as
necessary, will yield the best results in most cases.

With no aggregations the alert will generate one event per record
returned by the query. The record will be included in its entirety
in the record field of the event. This should only be used with very
narrow and specific queries.

### Templates

{{site.prodname}} supports the `GlobalAlertTemplate` resource type.
These are used in the {{site.prodname}} Manager to create alerts
with prepopulated fields that can be modified to suit your needs.
The `GlobalAlertTemplate` resource is configured identically to the
`GlobalAlert` resource. {{site.prodname}} includes some sample Alert
templates; add your own templates as needed.

#### Sample YAML

**RuleBased GlobalAlert**
```yaml
apiVersion: projectcalico.org/v3
kind: GlobalAlertTemplate
metadata:
  name: http.connections
spec:
  description: "HTTP connections to a target namespace"
  summary: "HTTP connections from ${source_namespace}/${source_name_aggr} to <desired_namespace>/${dest_name_aggr}"
  severity: 50
  dataSet: flows 
  query: dest_namespace="<desired namespace>" AND dest_port=80
  aggregateBy: [source_namespace, dest_name_aggr, source_name_aggr]
  field: count
  metric: sum
  condition: gte
  threshold: 1
```

**AnomalyDetection GlobalAlert**
```yaml
 apiVersion: projectcalico.org/v3
  kind: GlobalAlert
  metadata:
    name: port-scan-detection
  spec:
    description: "Port scan detection"
    type: AnomalyDetection
    detector: 
      name: port-scan
    severity: 100
```

### Appendix: Valid fields for queries

#### Audit logs

See [audit.k8s.io group v1](https://github.com/kubernetes/kubernetes/blob/master/staging/src/k8s.io/apiserver/pkg/apis/audit/v1/types.go) for descriptions of fields.

#### DNS logs

See [DNS logs]({{site.baseurl}}/visibility/elastic/dns/dns-logs) for description of fields.

#### Flow logs

See [Flow logs]({{site.baseurl}}/visibility/elastic/flow/datatypes) for description of fields.

#### L7 logs

See [L7 logs]({{site.baseurl}}/visibility/elastic/l7/datatypes) for description of fields.
