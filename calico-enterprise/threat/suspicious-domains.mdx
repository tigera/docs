---
title: Trace and block suspicious domains
description: Add threat intelligence feeds to trace DNS queries that involve suspicious domains. 
canonical_url: /threat/suspicious-domains
---

### Big picture

Add threat intelligence feeds to {{site.prodname}} to trace DNS queries involving suspicious domains.

### Value

{{site.prodname}} integrates with threat intelligence feeds so you can detect when endpoints in your Kubernetes clusters query DNS for suspicious domains, or receive answers with suspicious domains. When events are detected, an anomaly detection dashboard in the UI shows the full context, including which pod(s) were involved so you can analyze and remediate.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **GlobalThreatFeed** resource to add threat intelligence feeds for tracking and analysis in the UI

### Concepts

#### Pull or push threat feeds?

{{site.prodname}} supports both push and pull methods for updating threat feeds. Use the **pull method** for fully automated threat feed updates without user intervention. Use the **push method** to schedule your own updates or if your threat feed is not available over HTTP(S).

#### Domain name threat feeds

A best practice is to develop an allow-list of "known-good" domains that particular applications or services must access, and then [enforce this allow-list with network policy]({{site.baseurl}}/security/domain-based-policy).

In addition to allow-lists, you can use threat feeds to monitor your cluster for DNS queries to known malicious or suspicious domain names. {{site.prodname}} monitors DNS queries and generates alerts for any that are listed in your threat feed.

Threat feeds for domain names associated with malicious **egress** activity (e.g. command and control (C2) servers or data exfiltration), provide the most security value.  Threat feeds that associate domain names with malicious **ingress** activity (e.g. port scans or IP sweeps) are less useful since these activities do not cause endpoints in your cluster to query DNS.  It is better to consider [IP-based threat feeds](./suspicious-ips) for ingress activity.

### Before you begin...

#### Required

Privileges to manage GlobalThreatFeed.

#### Recommended

We recommend that you turn down the aggregation of DNS logs sent to Elasticsearch for configuring threat feeds. If you do not adjust DNS log aggregation settings, {{site.prodname}} aggregates DNS queries from workloads in the same replica set. This means if a suspicious DNS query is detected, you will only know which replica set made the query and not which specific pod. Go to: [FelixConfiguration]({{site.baseurl}}/reference/resources/felixconfig) and set the field, **dnsLogsFileAggregationKind** to **0** to log individual pods separately.

### How to

This section describes how to pull or push threat feeds to {{site.prodname}}.

- [Pull threat feed updates](#pull-threat-feed-updates)
- [Push threat feed updates](#push-threat-feed-updates)

#### Pull threat feed updates

To add threat feeds to {{site.prodname}} for automatic updates (default is once a day), the threat feed(s) must be available using HTTP(S), and return a newline-separated list of domain names.

1. Create the GlobalThreatFeed YAML and save it to file.
   The simplest example of this looks like the following. Replace the **name** and the **URL** with your feed.

   ```yaml
   apiVersion: projectcalico.org/v3
   kind: GlobalThreatFeed
   metadata:
     name: my-threat-feed
   spec:
     content: DomainNameSet
     pull:
       http:
         url: https://my.threatfeed.com/deny-list
   ```

2. Add the global threat feed to the cluster.

   ```shell
   kubectl apply -f <your_threatfeed_filename>
   ```

3. In {{site.prodname}} Manager, go to the “Alerts” page to view events that are generated when an endpoint in the cluster queries a name on the list.

#### Push threat feed updates

Use the push method if your threat feeds that are not in newline-delimited format, not available over HTTP, or if you prefer to push updates as they become available.

1. Create the GlobalThreatFeed YAML and save it to file.
   Replace the **name** field with your own name. The name is important in the later steps so make note of it.

   ```yaml
   apiVersion: projectcalico.org/v3
   kind: GlobalThreatFeed
   metadata:
     name: my-threat-feed
   spec:
     content: DomainNameSet
   ```

2. Add the global threat feed to the cluster.

   ```shell
   kubectl apply -f <your_threatfeed_filename>
   ```

3. Configure or program your threat feed to write updates to Elasticsearch. This Elasticsearch document is in the index **.tigera.domainnameset.\<cluster_name\>** and must have the ID set to the name of the global threat feed object. The doc should have a single field called **domains**, containing a list of domain names. For example:

   ```
   PUT .tigera.domainnameset.cluster/_doc/my-threat-feed
   {
       "domains" : ["malicious.badstuff", "hacks.r.us"]
   }
   ```

   Note that in order to push data to ES, you'll need to configure a policy that allows that information to reach the ES cluster.
   See the Elasticsearch document APIs for how to create and update documents in Elasticsearch.

4. In {{site.prodname}} Manager, go the “Alerts” page to view events that are generated when an endpoint in the cluster queries a name on the list.

### Above and beyond

See [GlobalThreatFeed]({{site.baseurl}}/reference/resources/globalthreatfeed) resource definition for all configuration options.
