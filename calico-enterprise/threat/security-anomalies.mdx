---
title: Detect and alert on anomalies
description: Enable machine learning to automatically alert you when clusters have security and performance issues. 
canonical_url: /threat/security-anomalies
---

>**Note**: This feature is tech preview. Tech preview features may be subject to significant changes before they become GA.
{: .alert .alert-info}

### Big picture

Detect suspicious security and performance activities within a cluster and generate alerts. 

### Value

The {{site.prodname}} anomaly detection engine analyzes patterns and alerts on potential 
threats and issues such as:

- **Security issues** - threats like DGA, recommaissance threats like IP sweep, but also issues with servers that can affect daily operations. 

- **Performance issues** - spikes in data transmission, and anomalous degradation in network communication that may impact application workloads.

All you need to do is install the anomaly detection within your cluster. If there are any security or performance anomalies, you will automatically get alerts in Manager UI.

### Features

This how-to guide uses the following {{site.prodname}} features:
- **Anomaly detection**

### Concepts 

#### About anomalies

{{site.prodname}} anomaly detection allows you to proactively determine if there is an issue (or not), and potentially resolve problems before service levels are compromised. Anomaly detection uses {{site.prodname}} Elasticsearch logs ([flow]({{site.baseurl}}/visibility/elastic/flow) logs, [L7]({{site.baseurl}}/visibility/elastic/l7) logs, and [DNS]({{site.baseurl}}/visibility/elastic/dns) logs) to learn the behavior of cluster nodes, pods, services, and other entities that send log records (applications, load balancers, databases, etc.).

Root causes of anomalies include:
  
- **Security**
  - Malicious behaviors like DoS and crypto-mining attacks

- **Security and performance**

  - Applications and microservices
  - Bugs in applications and microservices
  - Underprovisioned applications (replicas)
  - Network and infrastructure process or CPU overload due to traffic surges 

#### About anomaly detection modeling

Anomaly detection uses a neural network and probabilistic time series modeling to automatically 
identify anomalies associated with workloads in your cluster. It can also work as a daemon that 
periodically retrains the model and performs anomaly detection. Anomaly detection perform these 
high-level tasks:

- Learns the normal behavior and patterns of cluster nodes, pods, services, and other entities that send log records 
(applications, load balancers, databases, etc.).
- Collects data from different cluster log fields (individual or aggregated) such as connections, 
bytes sent, latencies, and counters.
- Learns the time patterns (hourly, daily, or other) in field values. For example, there can be a peak 
in the connections to an authorization service in the morning, then a big data transmission when 
the database starts a backup operation.

For a list of anomalies that are enabled by default, see [Anomaly detection reference]({{site.baseurl}}/reference/anomaly-detection/all-detectors).

### FAQ

**Do I need to configure anomaly values?**

>Anomalies are preconfigured with reasonable defaults that are optimized for frequency and severity. You should not need to change the values unless you are getting too many alerts.  

**Will alerts be unusually high until the engine learns to distinguish normal from anomalous behavior?**

>Yes. If you have data for a cluster running for several hours, that could result in an unusually high alert rate.

**If the engine detects more than one anomaly (ex. one in `flow` logs, and `DNS` logs), will I get separate alerts?**

>You can see several `suspicious_records` from different logs in the same alert if those records are presented in 
> the same time interval. Suspicious records in an alert are grouped by log names.

**Where does anomaly detection run on multi-cluster management (mcm) deployments?**
>Anomaly detection runs on the management cluster, but users on managed clusters can enable/disable alerts.

### Before you begin

**Supported**

- All platforms in this release except OpenShift

**Required**

- To use L7/HTTP anomaly detectors, you must enable [L7 logs]({{site.baseurl}}/visibility/elastic/l7/configure) on the cluster 

### How To

- [Enable and disable anomaly detectors](#enable-and-disable-anomaly-detectors)
- [Monitor anomaly alerts in Manager UI](#monitor-anomaly-alerts-in-manager-ui)

#### Enable and disable anomaly detectors

{% include /content/anomaly-detection/enable-disable-common.md %}

#### Monitor anomaly alerts in Manager UI

{% include /content/anomaly-detection/monitor.md %}


### Above and beyond

- [Anomaly detection reference]({{site.baseurl}}/reference/anomaly-detection/all-detectors)
- [Global Alert reference]({{site.baseurl}}/reference/resources/globalalert)

