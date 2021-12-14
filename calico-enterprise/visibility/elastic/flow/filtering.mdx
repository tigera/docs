---
title: Filter flow logs
description: Filter Calico Enterprise flow logs. 
canonical_url: /visibility/elastic/flow/filtering
---

### Big picture

Filter {{site.prodname}} flow logs. 

### Value

Filter {{site.prodname}} flow logs to suppress logs of low significance, and troubleshoot threats.  

### Features

This how-to guide uses the following {{site.prodname}} features:

- ConfigMap in the `tigera-operator` namespace

### Concepts

#### Container monitoring tools versus flow logs

Container monitoring tools are good for monitoring Kubernetes and orchestrated workloads for CPU usage, network usage, and log aggregation. For example, a data monitoring tool can tell if a pod has turned into a bitcoin miner based on it using more than normal CPU.  

{{site.prodname}} flow logs provide continuous records of every single packet sent/received by all pods in your Kubernetes cluster. Note that flow logs do not contain all packet data; only the number of packets/bytes that were sent between specific IP/ports, and when. In the previous monitoring tool example, {{site.prodname}} flow logs could see the packets running to/from the bitcoin mining network.

{{site.prodname}} flow logs tell you when a pod is compromised, specifically:
- Where a pod is sending data to
- If the pod is talking to a known command-and-control server
- Other pods that the compromised pod has been talking to (so you can see if they're compromised too)

#### Flow log format

A flow log contains these space-delimited fields (unless filtered out).

```
startTime endTime srcType srcNamespace srcName srcLabels dstType dstNamespace dstName 
dstLabels srcIP dstIP proto srcPort dstPort numFlows numFlowsStarted numFlowsCompleted 
reporter packetsIn packetsOut bytesIn bytesOut action
```
**Example**

```
1528842551 1528842851 wep dev rails-81531* - wep dev memcached-38456* - - - 6 - 3000 7 3 4 out 154 61 70111 49404 allow
```
- Fields that are not enabled or are aggregated, are noted by `-` 
- Aggregated names (such as “pod prefix”), are noted by `*` at the end of the name
- If `srcName` or `dstName` fields contain only a `*`, aggregation was performed using other means (such as specific labels), and no unique prefix was present.

### How to

- [Create flow log filters](#create-flow-log-filters)
- [Add filters to ConfigMap file](#add-filters-to-configmap-file)

#### Create flow log filters

Create your {% include open-new-window.html text='fluentd filters' url='https://docs.fluentd.org/filter/grep' %}. 

**Example: filter out a specific namespace**
  
This example filters out all flow logs whose source or destination namespace is "dev". Additional namespaces could be filtered by adjusting the regular expression "pattern"s, or by adding additional `exclude` blocks.

  ```
  <filter flows>
    @type grep
    <exclude>
      key source_namespace
      pattern dev
    </exclude>
    <exclude>
      key dest_namespace
      pattern dev
    </exclude>
  </filter>
  ```
**Example: filter out internet traffic to a specific deployment**
  
This example filters inbound internet traffic to the deployment with pods named, `nginx-internet-*`. Note the use of the `and` directive to filter out traffic that is both to the deployment, and from the internet (source `pub`).

  ```
  <filter flows>
    @type grep
    <and>
      <exclude>
          key dest_name_aggr
          pattern ^nginx-internet
      </exclude>
      <exclude>
          key source_name_aggr
          pattern pub
      </exclude>
    </and>
  </filter>
  ```
#### Add filters to ConfigMap file

1. Create a `filters` directory with a file called `flow` with your desired filters. If you are also adding [dns filters]({{site.baseurl}}/visibility/elastic/dns/filtering-dns), add the `dns` file to the directory.

1. Create the `fluentd-filters` ConfigMap in the `tigera-operator` namespace with the following command.

   ```bash
   kubectl create configmap fluentd-filters -n tigera-operator --from-file=filters
   ```

### Above and beyond

- [Flow log aggregation]({{site.baseurl}}/visibility/elastic/flow/aggregation)
- [Archive logs to storage]({{site.baseurl}}/visibility/elastic/archive-storage)
- [Configure RBAC for Elasticsearch logs]({{site.baseurl}}/visibility/elastic/rbac-elasticsearch)
