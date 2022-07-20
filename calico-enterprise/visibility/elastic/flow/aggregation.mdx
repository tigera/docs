---
title: Configure flow log aggregation
description: Configure flow log aggregation to reduce log volume and costs.
canonical_url: /visibility/elastic/flow/aggregation
feature_name: feature_generic_all
---

### Big picture

Configure flow log aggregation level to reduce log volume and costs.

### Value

Beyond using filtering to suppress flow logs, {{site.prodname}} provides controls to aggregate flow logs. Although aggressive aggregation levels reduce flow volume and costs, it can also reduce visibility into specific metadata of allowed and denied traffic. Review this article to see which level of aggregation is suitable for your implementation.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **FelixConfiguration**

### Concepts

#### Aggregation: volume and cost versus visibility

{{site.prodname}} enables flow log aggregation for pod/workload endpoints by default, and uses an aggressive aggregation level to reduce log volume. The level assumes that most users do not need to see pod IP information (due to the ephemeral nature of pod IP address allocation). However, it all depends on your deployment; we recommend reviewing aggregation levels to understand what information gets grouped (and thus suppressed from view).

#### Aggregation flow log example

The following is a sample flow log entry using aggregation by pod prefix for allowed traffic. For flow log fields and filter parameters, see [Filter flow logs]({{site.baseurl}}/visibility/elastic/flow/filtering).

```
  {
    "start_time": 1597086849,
    "end_time": 1597087167,
    "source_ip": null,
    "source_name": "-",
    "source_name_aggr": "access-6b687c8dcb-*",
    "source_namespace": "policy-demo",
    "source_port": null,
    "source_type": "wep",
    "source_labels": {
      "labels": [
        "app=access",
        "pod-template-hash=6b687c8dcb"
      ]
    },
    "dest_ip": null,
    "dest_name": "-",
    "dest_name_aggr": "nginx-86c57db685-*",
    "dest_namespace": "policy-demo",
    "dest_port": 80,
    "dest_type": "wep",
    "dest_labels": {
      "labels": [
        "app=nginx",
        "pod-template-hash=86c57db685"
      ]
    },
    "proto": "tcp",
    "action": "allow",
    "reporter": "dst",
    "policies": {
      "all_policies": [
        "0|default|policy-demo/default.access-nginx|allow"
      ]
    },
    "bytes_in": 18236,
    "bytes_out": 52519,
    "num_flows": 47,
    "num_flows_started": 47,
    "num_flows_completed": 40,
    "packets_in": 282,
    "packets_out": 239,
    "http_requests_allowed_in": 0,
    "http_requests_denied_in": 0,
    "original_source_ips": null,
    "num_original_source_ips": 0,
    "host": "bz-n8kf-kadm-node-1",
    "@timestamp": 1597087167000
  }
```

- `1597086849` to `1597087167` is the 5 minute aggregation interval.
- Workload endpoints with a similar prefix `access-6b687c8dcb-*` in the `policy-demo` namespace connected to a workload-endpoints/pods with prefix `nginx-86c57db685-*` exposing a service on port `80`.
- The aggregated source workloade endpoints had the labels `app: nginx` and `pod-template-hash: 6b687c8dcb` and the aggregated destination workload endpoint had the labels `app: nginx` and `pod-template-hash: 86c57db685`.
- It was an incoming connection reported by the "Destination" node, and a policy "Allowed" the connection.
- There were 282 incoming packets and 239 outgoing packets.
- Within the aggregation time interval, there were 7 flows aggregated, with 47 new flows started, and 40 flows completed.

When viewing traffic flows, note that **null values** for `source_ip` and `dest_ip` means **pod prefix aggregation is enabled**.

```
...
"source_ip": null,
...
},
"dest_ip": null,

```
#### Aggregation types and levels

The following table summarizes the aggregation levels by flow log traffic.

| Flow log aggregration by... | Available for...                                | Aggregates all flows that share...                           |
| --------------------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| Pod prefix                  | Allowed and denied traffic (default is allowed) | `FlowLogsFileAggregationKindForAllowed`<br />**0**, No aggregation <br />**1**, A source port on each node.<br />**2, (default)** Source ports, or are from the same ReplicaSet. <br />**3**, Destination and source ports, and are from the same ReplicateSet. |
| Source port                 | Allowed and denied traffic                      | `FlowLogsFileAggregationKindForAllowed`<br>`FlowLogsFileAggregationKindForDenied`<br />**0**, No aggregation<br />**1, (default)** Source port on each node.<br />**2**, Source ports, or are from the same ReplicaSet.<br />**3**, Destination and source ports, and are from the same ReplicateSet. |

### How to

- [Verify existing aggregation level](#verify-existing-aggregation-level)
- [Change default aggregation level](#change-default-aggregation-level)
- [Troubleshoot logs with aggregation levels](#troubleshoot-logs-with-aggregation-levels)

#### Verify existing aggregation level

Use the following command:

```bash
kubectl get felixconfiguration.p -o yaml
```
#### Change default aggregation level

Before [changing the default aggregation level]({{site.baseurl}}/reference/resources/felixconfig#aggregationkind), note the following:

- Although any change in aggregation level affects flow log volume, lowering the aggregation number (especially to `0` for no aggregation) will cause significant impacts to log storage. If you allow more flow logs, ensure that you provision more log storage.
- Verify that the parameters that you want to see in your aggregation level, are not already [filtered]({{site.baseurl}}/visibility/elastic/flow/filtering)

#### Troubleshoot logs with aggregation levels

When you use flow log aggregation, sometimes you may see two Alerts, 

![two-alerts]({{site.baseurl}}/images/two-alerts.png)

along with two flow log entries. Note that the entries are identical except for the slight  timestamp difference.

![two-logs]({{site.baseurl}}/images/two-logs.png)

The reason you may see two entries is because of the interaction between the aggregation interval, and the time interval to export logs (`flowLogsFlushInterval`).

In each aggregation interval, connections/connection attempts can be started or completed. However, flow logs do not start/stop when a connection starts/stops. Let’s assume the default export logs “flush” time of 10 seconds. If a connection is started in one flush interval, but terminates in the next, it is recorded across two entries. To get visibility into flow logs to differentiate the entries, go to Service Graph, flow logs tab, and look at these fields: `num_flows`, `num_flows_started`,  and `num_flows_completed`.

The underlying reason for this overlap is a dependency on Linux conntrack, which provides the lifetime of stats that {{site.prodname}} tracks across different protocols (TCP, ICMP, UDP). For example, for UDP and ICMP, {{site.prodname}} waits for a conntrack entry to timeout before it considers a “connection” closed, and this is usually greater than 10 seconds.

### Tutorial

Here are examples of pod-to-pod flows for each aggregation type.

#### Aggregation by source port

Source port aggregation is straightforward. When viewing `source IP`, `destination IP`, `protocol`, `source port`, `destination port`, the `source port` is usually ephemeral and does not convey useful information. By suppressing `source port`, this aggregation type minimizes the flows logs generated for traffic between the same source-destination endpoint, and same destination port.

**Node 1**
```
  {
    "start_time": 1597164816,
    "end_time": 1597165131,
    "source_ip": "192.168.47.9",
    "source_name": "access-6b687c8dcb-zn5s2",
    "source_name_aggr": "access-6b687c8dcb-*",
    "source_namespace": "policy-demo",
    "source_port": null,
    "source_type": "wep",
    "source_labels": {
      "labels": [
        "pod-template-hash=6b687c8dcb",
        "app=access"
      ]
    },
    "dest_ip": "192.168.213.223",
    "dest_name": "nginx-86c57db685-rkhnf",
    "dest_name_aggr": "nginx-86c57db685-*",
    "dest_namespace": "policy-demo",
    "dest_port": 80,
    "dest_type": "wep",
    "dest_labels": {
      "labels": [
        "app=nginx",
        "pod-template-hash=86c57db685"
      ]
    },
    "proto": "tcp",
    "action": "allow",
    "reporter": "src",
    "policies": {
      "all_policies": [
        "0|__PROFILE__|__PROFILE__.kns.policy-demo|allow"
      ]
    },
    "bytes_in": 0,
    "bytes_out": 3120,
    "num_flows": 50,
    "num_flows_started": 50,
    "num_flows_completed": 50,
    "packets_in": 0,
    "packets_out": 52,
    "http_requests_allowed_in": 0,
    "http_requests_denied_in": 0,
    "original_source_ips": null,
    "num_original_source_ips": 0,
    "host": "bz-n8kf-kadm-node-1",
    "@timestamp": 1597165131000
  }
```

**Node 2**
```
  {
    "start_time": 1597164816,
    "end_time": 1597165125,
    "source_ip": "192.168.47.9",
    "source_name": "access-6b687c8dcb-zn5s2",
    "source_name_aggr": "access-6b687c8dcb-*",
    "source_namespace": "policy-demo",
    "source_port": null,
    "source_type": "wep",
    "source_labels": {
      "labels": [
        "pod-template-hash=6b687c8dcb",
        "app=access"
      ]
    },
    "dest_ip": "192.168.213.223",
    "dest_name": "nginx-86c57db685-rkhnf",
    "dest_name_aggr": "nginx-86c57db685-*",
    "dest_namespace": "policy-demo",
    "dest_port": 80,
    "dest_type": "wep",
    "dest_labels": {
      "labels": [
        "pod-template-hash=86c57db685",
        "app=nginx"
      ]
    },
    "proto": "tcp",
    "action": "deny",
    "reporter": "dst",
    "policies": {
      "all_policies": [
        "0|default|policy-demo/default.deny-access-nginx|deny"
      ]
    },
    "bytes_in": 3120,
    "bytes_out": 0,
    "num_flows": 50,
    "num_flows_started": 50,
    "num_flows_completed": 50,
    "packets_in": 52,
    "packets_out": 0,
    "http_requests_allowed_in": 0,
    "http_requests_denied_in": 0,
    "original_source_ips": null,
    "num_original_source_ips": 0,
    "host": "bz-n8kf-kadm-node-2",
    "@timestamp": 1597165125000
  }
```

#### Aggregation by pod prefix

In Kubernetes, pods that are part of ReplicaSets and StatefulSets, etc. can automatically create names for pods. For example, the pods `nginx-65899c769f-tdmw7` and `nginx-65899c769f-xyz123` are created by the ReplicaSet `nginx-65899c769f`. The ReplicaSet name is considered a **pod-prefix** and is used to aggregate flow log entries (shown with an asterisk `*` at the end of the name). For a destination pod to be aggregated, it must have the same "pod-prefix" and expose the same destination port.

**Node 1**
```
  {
    "start_time": 1597166567,
    "end_time": 1597166893,
    "source_ip": "192.168.47.9",
    "source_name": "access-6b687c8dcb-zn5s2",
    "source_name_aggr": "access-6b687c8dcb-*",
    "source_namespace": "policy-demo",
    "source_port": null,
    "source_type": "wep",
    "source_labels": {
      "labels": [
        "pod-template-hash=6b687c8dcb",
        "app=access"
      ]
    },
    "dest_ip": "192.168.213.223",
    "dest_name": "nginx-86c57db685-rkhnf",
    "dest_name_aggr": "nginx-86c57db685-*",
    "dest_namespace": "policy-demo",
    "dest_port": 80,
    "dest_type": "wep",
    "dest_labels": {
      "labels": [
        "app=nginx",
        "pod-template-hash=86c57db685"
      ]
    },
    "proto": "tcp",
    "action": "allow",
    "reporter": "src",
    "policies": {
      "all_policies": [
        "0|__PROFILE__|__PROFILE__.kns.policy-demo|allow"
      ]
    },
    "bytes_in": 52311,
    "bytes_out": 18236,
    "num_flows": 47,
    "num_flows_started": 47,
    "num_flows_completed": 47,
    "packets_in": 235,
    "packets_out": 282,
    "http_requests_allowed_in": 0,
    "http_requests_denied_in": 0,
    "original_source_ips": null,
    "num_original_source_ips": 0,
    "host": "bz-n8kf-kadm-node-1",
    "@timestamp": 1597166893000
  }
```

**Node 2**
```
  {
    "start_time": 1597166567,
    "end_time": 1597166879,
    "source_ip": "192.168.47.9",
    "source_name": "access-6b687c8dcb-zn5s2",
    "source_name_aggr": "access-6b687c8dcb-*",
    "source_namespace": "policy-demo",
    "source_port": null,
    "source_type": "wep",
    "source_labels": {
      "labels": [
        "pod-template-hash=6b687c8dcb",
        "app=access"
      ]
    },
    "dest_ip": "192.168.213.223",
    "dest_name": "nginx-86c57db685-rkhnf",
    "dest_name_aggr": "nginx-86c57db685-*",
    "dest_namespace": "policy-demo",
    "dest_port": 80,
    "dest_type": "wep",
    "dest_labels": {
      "labels": [
        "app=nginx",
        "pod-template-hash=86c57db685"
      ]
    },
    "proto": "tcp",
    "action": "allow",
    "reporter": "dst",
    "policies": {
      "all_policies": [
        "0|default|policy-demo/default.access-nginx|allow"
      ]
    },
    "bytes_in": 18236,
    "bytes_out": 52311,
    "num_flows": 47,
    "num_flows_started": 47,
    "num_flows_completed": 47,
    "packets_in": 282,
    "packets_out": 235,
    "http_requests_allowed_in": 0,
    "http_requests_denied_in": 0,
    "original_source_ips": null,
    "num_original_source_ips": 0,
    "host": "bz-n8kf-kadm-node-2",
    "@timestamp": 1597166879000
  }
```
#### No aggregation

If you turn off aggregation, your log storage may be overwhelmed. Be sure to provision more storage if you do.

**Node 1**
```
  {
    "start_time": 1597166083,
    "end_time": 1597166383,
    "source_ip": "192.168.47.9",
    "source_name": "access-6b687c8dcb-zn5s2",
    "source_name_aggr": "access-6b687c8dcb-*",
    "source_namespace": "policy-demo",
    "source_port": 42106,
    "source_type": "wep",
    "source_labels": {
      "labels": [
        "pod-template-hash=6b687c8dcb",
        "app=access"
      ]
    },
    "dest_ip": "192.168.138.79",
    "dest_name": "nginx-86c57db685-h6792",
    "dest_name_aggr": "nginx-86c57db685-*",
    "dest_namespace": "policy-demo",
    "dest_port": 80,
    "dest_type": "wep",
    "dest_labels": {
      "labels": [
        "pod-template-hash=86c57db685",
        "app=nginx"
      ]
    },
    "proto": "tcp",
    "action": "allow",
    "reporter": "dst",
    "policies": {
      "all_policies": [
        "0|default|policy-demo/default.access-nginx|allow"
      ]
    },
    "bytes_in": 388,
    "bytes_out": 1113,
    "num_flows": 1,
    "num_flows_started": 1,
    "num_flows_completed": 1,
    "packets_in": 6,
    "packets_out": 5,
    "http_requests_allowed_in": 0,
    "http_requests_denied_in": 0,
    "original_source_ips": null,
    "num_original_source_ips": 0,
    "host": "bz-n8kf-kadm-node-1",
    "@timestamp": 1597166383000
  }
```
**Node 2**
```
  {
    "start_time": 1597166083,
    "end_time": 1597166383,
    "source_ip": "192.168.47.9",
    "source_name": "access-6b687c8dcb-zn5s2",
    "source_name_aggr": "access-6b687c8dcb-*",
    "source_namespace": "policy-demo",
    "source_port": 43092,
    "source_type": "wep",
    "source_labels": {
      "labels": [
        "app=access",
        "pod-template-hash=6b687c8dcb"
      ]
    },
    "dest_ip": "192.168.138.79",
    "dest_name": "nginx-86c57db685-h6792",
    "dest_name_aggr": "nginx-86c57db685-*",
    "dest_namespace": "policy-demo",
    "dest_port": 80,
    "dest_type": "wep",
    "dest_labels": {
      "labels": [
        "app=nginx",
        "pod-template-hash=86c57db685"
      ]
    },
    "proto": "tcp",
    "action": "allow",
    "reporter": "dst",
    "policies": {
      "all_policies": [
        "0|default|policy-demo/default.access-nginx|allow"
      ]
    },
    "bytes_in": 388,
    "bytes_out": 1113,
    "num_flows": 1,
    "num_flows_started": 1,
    "num_flows_completed": 1,
    "packets_in": 6,
    "packets_out": 5,
    "http_requests_allowed_in": 0,
    "http_requests_denied_in": 0,
    "original_source_ips": null,
    "num_original_source_ips": 0,
    "host": "bz-n8kf-kadm-node-2",
    "@timestamp": 1597166383000
  }
```

### Above and beyond

- [Archive logs to storage]({{site.baseurl}}/visibility/elastic/archive-storage)
- [Configure RBAC for Elasticsearch logs]({{site.baseurl}}/visibility/elastic/rbac-elasticsearch)
- [Configure data retention]({{site.baseurl}}/visibility/elastic/retention)
