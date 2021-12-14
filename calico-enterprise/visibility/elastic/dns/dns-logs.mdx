---
title: Configure DNS logs
description: Key/value pairs of DNS activity logs and how to construct queries.
canonical_url: /visibility/elastic/dns/dns-logs
---

{{site.prodname}} pushes DNS activity logs to Elasticsearch, for DNS information that is obtained from [trusted DNS servers]({{site.baseurl}}/security/domain-based-policy#trusted-dns-servers). The following table
details the key/value pairs in the JSON blob, including their
[Elasticsearch datatype](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html){:target="_blank"}.
This information should assist you in constructing queries.

| Name                  | Datatype          | Description |
| --------------------- | ----------------- | ----------- |
| `start_time`          | date              | When the collection of the log began in UNIX timestamp format. |
| `end_time`            | date              | When the collection of the log concluded in UNIX timestamp format. |
| `type`                | keyword           | This field contains one of the following values:<br>&#x25cf;&nbsp;<code>LOG</code>: Indicates that this is a normal DNS activity log.<br>&#x25cf;&nbsp;<code>UNLOGGED</code>: Indicates that this log is reporting DNS activity that could not be logged in detail because of [DNSLogsFilePerNodeLimit]({{site.baseurl}}/reference/resources/felixconfig#spec). |
| `count`               | long              | When `type` is:<br>&#x25cf;&nbsp;<code>LOG</code>: How many DNS lookups there were, during the log collection interval, with details matching this log.<br>&#x25cf;&nbsp;<code>UNLOGGED</code>: The number of DNS responses that could not be logged in detail because of [DNSLogsFilePerNodeLimit]({{site.baseurl}}/reference/resources/felixconfig#spec).  In this case none of the following fields are provided. |
| `client_ip`           | ip                | The IP address of the client pod. A null value indicates aggregation. |
| `client_name`         | keyword           | {::nomarkdown}<p>This field contains one of the following values:<br>&#x25cf;&nbsp;The name of the client pod.<br>&#x25cf;&nbsp;<code>-</code>: the name of the pod was aggregated. Check <code>client_name_aggr</code> for the pod name prefix.</p>{:/} |
| `client_name_aggr`    | keyword           | The aggregated name of the client pod. |
| `client_namespace`    | keyword           | Namespace of the client pod. |
| `client_labels`       | array of keywords | Labels applied to the client pod. With aggregation, the label name/value pairs that are common to all aggregated clients. |
| `qname`               | keyword           | The domain name that was looked up. |
| `qtype`               | keyword           | The type of the DNS query (e.g. A, AAAA). |
| `qclass`              | keyword           | The class of the DNS query (e.g. IN). |
| `rcode`               | keyword           | The result code of the DNS query response (e.g. NoError, NXDomain). |
| `rrsets`              | nested            | Detailed DNS query response data - see below. |
| `servers`             | nested            | Details of the DNS servers that provided this response. |
| `latency_count`       | long              | The number of lookups for which latency was measured.  (The same as `count` above, unless some DNS requests were missed, or latency reporting is disabled - see `dnsLogsLatency` in the [FelixConfiguration resource]({{site.baseurl}}/reference/resources/felixconfig).) |
| `latency_mean`        | long              | Mean latency, in nanoseconds. |
| `latency_max`         | long              | Max latency, in nanoseconds. |

Each nested `rrsets` object contains response data for a particular name and a particular type and
class of response information.  Its key/value pairs are as follows.

| Name                  | Datatype          | Description |
| --------------------- | ----------------- | ----------- |
| `name`                | keyword           | The domain name that this information is for. |
| `type`                | keyword           | The type of the information (e.g. A, AAAA). |
| `class`               | keyword           | The class of the information (e.g. IN). |
| `rdata`               | array of keywords | Array of data, for the name, of that type and class.  For example, when `type` is A, this is an array of IPs for `name`. |

Each nested `servers` object provides details of a DNS server that provided the information in the
containing log.  Its key/value pairs are as follows.

| Name             | Datatype          | Description |
| ---------------- | ----------------- | ----------- |
| `ip`             | ip                | The IP address of the DNS server. |
| `name`           | keyword           | {::nomarkdown}<p>This field contains one of the following values:<br>&#x25cf;&nbsp;The name of the DNS server pod.<br>&#x25cf;&nbsp;<code>-</code>: the DNS server is not a pod.</p>{:/} |
| `name_aggr`      | keyword           | {::nomarkdown}<p>This field contains one of the following values:<br>&#x25cf;&nbsp;The aggregated name of the DNS server pod.<br>&#x25cf;&nbsp;<code>pvt</code>: the DNS server is not a pod. Its IP address belongs to a private subnet.<br>&#x25cf;&nbsp;<code>pub</code>: the DNS server is not a pod. Its IP address does not belong to a private subnet. It is probably on the public internet.</p>{:/} |
| `namespace`      | keyword           | Namespace of the DNS server pod, or `-` if the DNS server is not a pod. |
| `labels`         | array of keywords | Labels applied to the DNS server pod or host endpoint; empty if there are no labels or the DNS server is not a pod or host endpoint. |

The `latency_*` fields provide information about the latency of the DNS lookups that contributed to
this log.  For each successful DNS lookup {{site.prodname}} measures the time between when the DNS
request was sent and when the corresponding DNS response was received.

## Querying on various DNS log fields

Once a set of DNS logs has accumulated in Elasticsearch, you can perform many interesting queries.  For example:

-  with a query on the `qname` field, you could find all of the DNS response information that was
   provided to clients trying to resolve a particular domain name

-  with a query on the `rrsets.rdata` field, you could find all of the DNS lookups that included a
   particular IP address in their response data.

Different techniques are needed, depending on the field that you want to query on.

### Querying on a top-level field

A top-level field is any of those in the first table above.  Querying on a top-level field is
supported in the Kibana web UI and can also be done with the Elasticsearch API, for example:

```shell
curl 'http://10.111.1.235:9200/tigera_secure_ee_dns.cluster.20190711/_search?q=qname:example.com&pretty=true'
```

Please note that, to try this and the following examples in your own cluster:

-  You should replace the IP address (here `10.111.1.235`) with the cluster IP of the Elasticsearch
   API service in your cluster (which you can see with `kubectl get svc --all-namespaces -o wide`).

-  You should replace the `cluster` and date parts of the full index name (here
   `tigera_secure_ee_dns.cluster.20190711`) with the configured cluster name in your cluster and
   the date of the data that you want to search
   through. The cluster name can be retrieved from the `clusterName` field in the ConfigMap
   retrieved with `kubectl get configmap -n tigera-operator tigera-secure-elasticsearch -o yaml`.

-  You will need to run curl from a host or pod that is allowed by {{site.prodname}} policy to
   connect to the Elasticsearch API service.  In our non-production demo setup
   (`monitor-calico.yaml`), the fluentd pods have such access, so you can use `kubectl get po -n
   tigera-fluentd` to find the name of a fluentd pod and then `kubectl exec <fluentd pod name> -n
   tigera-fluentd -- curl ...` to perform the query.

Note that that query can also be written with a JSON body, like this:

```shell
curl 'http://10.111.1.235:9200/tigera_secure_ee_dns.cluster.20190711/_search?pretty=true' \
    -d '{"query": {"match": {"qname": "example.com"}}}' \
    -H "Content-Type: application/json"
```

### Querying on a nested object field

A nested object field is one of those in the second and third tables above, i.e. within the `rrsets`
and `servers` objects.  Querying on a nested object field is not supported by Kibana, but can be
done with the Elasticsearch API, for example:

```shell
curl 'http://10.111.1.235:9200/tigera_secure_ee_dns.cluster.20190711/_search?pretty=true' \
    -d '{"size": 2, "query": {"nested": {"path": "rrsets", "query": {"match": {"rrsets.rdata": "18.103.110.45"}}}}}' \
    -H "Content-Type: application/json"
```
