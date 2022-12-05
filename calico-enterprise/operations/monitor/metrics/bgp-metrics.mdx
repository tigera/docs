---
title: BGP metrics
description: Monitor BGP peering and route exchange in your cluster and get alerts by defining rules and thresholds.
canonical_url: /maintenance/monitor/metrics/bgp-metrics
---

### Big picture

Use Prometheus configured for {{site.prodname}} `{{site.noderunning}}` to monitor the health of BGP peers within your cluster.

### Value

Using the open-source Prometheus monitoring and alerting toolkit, you can view time-series metrics from {{site.prodname}} components in the Prometheus or Grafana interfaces.  

{{site.prodname}} adds the ability to monitor high-level operations between BGP peers in your cluster. By defining a set of simple rules and thresholds, you can monitor peer-to-peer connection health between your nodes as well as the number of routes being exchanged and receive alerts when it exceeds configured thresholds.

### Features

This how-to guide uses the following {{site.prodname}} features:

`{{site.noderunning}}` with BGP metrics reporting for consumption by Prometheus.

### Concepts

```
 +-------------------+
 | Host              |
 | +-------------------+                +------------+     +------------+
 | | Host              |------------->--|            |     |            |--->--
 | | +-------------------+   policy     | Prometheus |     | Prometheus |        alert
 +-| | Host              |----------->--|   Server   |-->--|   Alert-   |--->--
   | |  +-------------+  |   metrics    |            |     |  manager   |      mechanisms
   +-|  | BGP Metrics |-------------->--|            |     |            |--->--
     |  |   Server    |  |              |            |     |            |
     |  +-------------+  |              +------------+     +------------+
     +-------------------+                    ^                   ^
                                              |                   |
                               Collect and store metrics.     Web UI for accessing alert
                               WebUI for accessing and        states.
                               querying metrics.              Configure fan out
                               Configure alerting rules.      notifications to different
                                                              alert receivers.
```
{: .no-select-button}

BGP metric reporting is accomplished using three key pieces:

- BGP Metrics Server
- Prometheus Server
- Prometheus Alertmanager

#### About Prometheus

The Prometheus scrapes various instrumented jobs (endpoints) to collect time series data for a given set of metrics. Time series data can then be queried and rules can be setup to monitor specific thresholds to trigger alerts. The data can also be visualized (such as using Grafana).

Prometheus Server deployed as part of the {{site.prodname}} scrapes every configured `{{site.noderunning}}` target. Alerting rules querying BGP metrics can be configured in Prometheus and when triggered, fire alerts to the Prometheus Alertmanager.

Prometheus Alertmanager (or simply Alertmanager), deployed as part of the {{site.prodname}}, receives alerts from Prometheus and forwards alerts to various alerting mechanisms such as _Pager Duty_, or _OpsGenie_.

#### About {{site.prodname}} `{{site.noderunning}}`

`{{site.noderunning}}` bundles together the components required for networking containers with {{site.prodname}}. The key components are:

- Felix
- BIRD
- confd

Its critical function means that it runs on every machine that provides endpoints. A binary running inside `{{site.noderunning}}` monitors the BIRD daemon for peering and routing activity and reports these statics to Prometheus.

### How to

BGP metrics are generated within `{{site.noderunning}}` every 5 seconds using statistics pulled from the BIRD daemon.

The metrics generated are:

- `bgp_peers` - Total number of peers with a specific BGP connection status.
- `bgp_routes_imported` - Current number of routes successfully imported into the routing table.
- `bgp_route_updates_received` - Total number of route updates received over time (since startup).

{{site.prodname}} will run BGP metrics for Prometheus by default. Metrics are directly available on each compute node at `http://<node-IP>:9900/metrics`.

Refer to [Configuring Prometheus]({{site.baseurl}}/maintenance/monitor/prometheus) for information on how to create a new Alerting rule or updating the scraping interval for how often Prometheus collects the metrics.

#### BGP peers metric
 
The metric `bgp_peers` has the relevant labels `instance`, `status` and `ip_verison`. Using this metric, you can identify how many peers have a specific BGP connection status with a given node instance and IP version. This metric will be available as a combination of `{instance, status, ip_verison}`.

Example queries:
- Total number of peers currently with a BGP connection to the node instance “calico-node-1”, with status “Established”, for IP version “IPv4”.
```
bgp_peers{instance="calico-node-1", status="Established", ip_version="IPv4"}
```
- Total number of peers currently with a BGP connection to the node instance “calico-node-1”, with status “Down”, for IP version “IPv6”.
```
bgp_peers{instance="calico-node-1", status="Down", ip_version="IPv6"}
```
- Total number of peers currently with a BGP connection to any node instance, with a status that is not “Established”, for IP version “IPv4”.
```
bgp_peers{status!="Established", ip_version="IPv4"}
```

Valid BGP connection statuses are: "Idle", "Connect", "Active", "OpenSent", "OpenConfirm", "Established", "Close", "Down" and "Passive".

#### BGP routes imported metric

The metric `bgp_routes_imported` has the relevant labels `instance` and `ip_verison`. Using this metric, you can identify how many routes are being successfully imported into a given node instance's routing table at a specific point in time. This number can increase or decrease depending on how BGP rules process incoming routes. This metric will be available as a combination of `{instance, ip_verison}`.

Example queries:
- Computes the per-second rate for the number of routes imported by a specific node instance “calico-node-1” looking up to 120 seconds back (using the two most recent data points).
```
irate(bgp_routes_imported{instance="calico-node-1",ip_version="IPv4"}[120s])
```
- Computes the per-second rate for the number of routes imported across all node instances looking up to 120 seconds back (using the two most recent data points).
```
irate(bgp_routes_imported{ip_version="IPv4"}[120s])
```

#### BGP route updates received metric

The metric `bgp_route_updates_received` has the relevant labels `instance` and `ip_verison`. Using this metric, you can identify the total number of BGP routes received by a given node over time. This number includes all routes that have been accepted & imported into the routing table, as well as any routes that were rejected as invalid, rejected by filters or rejected as already in the route table. This total number should only increase over time. This metric will be available as a combination of `{instance, ip_verison}`.

Example queries:
- Computes the per-second rate for the number of routes received by a specific node instance “calico-node-1” looking up to 5 minutes back (using the two most recent data points).
```
irate(bgp_route_updates_received{instance="calico-node-1",ip_version="IPv4"}[5m])
```
- Computes the per-second rate for the number of routes received across all node instances looking up to 5 minutes back (using the two most recent data points).
```
irate(bgp_route_updates_received{ip_version="IPv4"}[5m])
```

### Above and beyond

- [Secure {{site.prodname}} Prometheus endpoints]({{site.baseurl}}/security/comms/secure-metrics)
- [Configuring Prometheus]({{site.baseurl}}/maintenance/monitor/prometheus)
