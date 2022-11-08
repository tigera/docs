---
title: Trace and block suspicious IPs
description: Add threat intelligence feeds to trace network flows of suspicious IP addresses, and optionally block traffic to them.
canonical_url: /threat/suspicious-ips
---

### Big picture

Add threat intelligence feeds to {{site.prodname}} to trace network flows of suspicious IP addresses, and optionally block traffic to suspicious IPs.

### Value

{{site.prodname}} integrates with threat intelligence feeds so you can detect when your Kubernetes clusters communicate with suspicious IPs. When communications are detected, an anomaly detection dashboard in the UI shows the full context, including which pod(s) were involved so you can analyze and remediate. You can also use a threat intelligence feed to power a dynamic deny-list, either to or from a specific group of sensitive pods, or your entire cluster.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **GlobalThreatFeed** resource to add threat intelligence feeds for tracking and analysis in the UI
- **GlobalNetworkPolicy** to block suspicious IPs

### Concepts

#### Pull or push threat feeds?

{{site.prodname}} supports both push and pull methods for updating threat feeds. Use the **pull method** for fully automated threat feed updates without user intervention. Use the **push method** to schedule your own updates or if your threat feed is not available over HTTP(S).

#### Suspicious IPs: test before you block

There are many different types of threat intelligence feeds (community-curated, company-paid, and internally-developed) that you can choose to monitor in {{site.prodname}}. We recommend that you assess the threat feed contents for false positives before blocking based on the feed. If you decide to block, test a subset of your workloads before rolling to production to ensure legitimate application traffic is not blocked.

### Before you begin...

#### Required

Privileges to manage GlobalThreatFeed and GlobalNetworkPolicy.

#### Recommended

We recommend that you turn down the aggregation of flow logs sent to Elasticsearch for configuring threat feeds. If you do not adjust flow logs, Calico Enterprise aggregates over the external IPs for allowed traffic, and threat feed searches will not provide useful results (unless the traffic is denied by policy). Go to: [FelixConfiguration]({{site.baseurl}}/reference/resources/felixconfig) and set the field, **flowLogsFileAggregationKindForAllowed** to **1**.

You can adjust the flow logs by running the following command:

```bash
kubectl patch felixconfiguration default --type='merge' -p '{"spec":{"flowLogsFileAggregationKindForAllowed":1}}'
```

### How to

This section describes how to pull or push threat feeds to {{site.prodname}}, and block traffic to a cluster for a suspicious IP.

- [Pull threat feed updates](#pull-threat-feed-updates)
- [Push threat feed updates](#push-threat-feed-updates)
- [Block traffic to a cluster](#block-traffic-to-a-cluster)

#### Pull threat feed updates

To add threat feeds to {{site.prodname}} for automatic updates (default is once a day), the threat feed(s) must be available using HTTP(S), and return a newline-separated list of IP addresses or prefixes in CIDR notation.

1. Create the GlobalThreatFeed YAML and save it to file.
   The simplest example of this looks like the following. Replace the **name** and the **URL** with your feed.

   ```yaml
   apiVersion: projectcalico.org/v3
   kind: GlobalThreatFeed
   metadata:
     name: my-threat-feed
   spec:
     content: IPSet
     mode: Enabled
     description: "This is my threat feed"
     feedType: Custom
     pull:
       http:
         url: https://my.threatfeed.com/deny-list
   ```

2. Add the global threat feed to the cluster.

   ```bash
   kubectl apply -f <your_threatfeed_filename>
   ```

3. In {{site.prodname}} Manager, go to the “Alerts” page to view events that are generated when an IP is displayed on the threat feed list.

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
     content: IPSet
     mode: Enabled
     description: "This is my threat feed"
     feedType: Custom
   ```

2. Add the global threat feed to the cluster.

   ```bash
   kubectl apply -f <your_threatfeed_filename>
   ```

3. Configure or program your threat feed to write updates to Elasticsearch. This Elasticsearch document is in the index **.tigera.ipset.\<cluster_name\>** and must have the ID set to the name of the global threat feed object. The doc should have a single field called **ips**, containing a list of IP prefixes. For example:

   ```
   PUT .tigera.ipset.cluster/_doc/my-threat-feed
   {
       "ips" : ["99.99.99.99/32", "100.100.100.0/24"]
   }
   ```

   See the Elasticsearch document APIs for how to create and update documents in Elasticsearch.

4. In {{site.prodname}} Manager, go the “Alerts" page to view events that are generated when an IP is displayed on the threat feed list.

#### Block traffic to a cluster

Create a new/edit existing threat feed to include the globalNetworkSet stanza, setting the labels you want to use to represent the deny-listed IPs. This stanza instructs {{site.prodname}} to search for flows to and from the listed IP addresses, and maintain a GlobalNetworkSet containing the IP addresses.

```yaml
apiVersion: projectcalico.org/v3
kind: GlobalThreatFeed
metadata:
  name: sample-global-threat-feed
spec:
  content: IPSet
  mode: Enabled
  description: "This is the sample global threat feed"
  feedType: Custom
  pull:
    http:
      url: https://an.example.threat.feed/deny-list
  globalNetworkSet:
    labels:
      security-action: block
```

1. Add the global threat feed to the cluster.

   ```bash
   kubectl apply -f <your_threatfeed_filename>
   ```

2. Create a GlobalNetworkPolicy that blocks traffic based on the threat feed, by selecting sources or destinations using the labels you assigned in step 1. For example, the following GlobalNetworkPolicy blocks all traffic coming into the cluster if it came from any of the suspicious IPs.

   ```yaml
   apiVersion: projectcalico.org/v3
   kind: GlobalNetworkPolicy
   metadata:
     name: default.blockthreats
   spec:
     tier: default
     selector: all()
     types:
     - Ingress
     ingress:
     - action: Deny
       source:
         selector: security-action == 'block'
  ```

3. Add the global network policy to the cluster.

   ```bash
   kubectl apply -f <your_policy_filename>
   ```

### Tutorial

In this tutorial, we’ll walk through setting up a threat feed to search for connections to suspicious IPs. Then, we’ll use the same threat feed to block traffic to those IPs.

We will use the free [FEODO botnet tracker](https://feodotracker.abuse.ch/){:target="_blank"} from abuse.ch that lists IP addresses associated with command and control servers. But the steps are the same for your commercial or internal threat feeds.

If you haven’t already adjusted your [aggregation flows](#before-you-begin), we recommend it before you start.

#### Configure the threat feed

1. Create a file called feodo-tracker.yaml with the following contents:

   ```yaml
   apiVersion: projectcalico.org/v3
   kind: GlobalThreatFeed
   metadata:
     name: feodo-tracker
   spec:
     content: IPSet
     mode: Enabled
     description: "This is the feodo-tracker threat feed"
     feedType: Custom
     pull:
       http:
         url: https://feodotracker.abuse.ch/downloads/ipblocklist.txt
   ```

   This pulls updates using the default period of once per day. See the [Global Resource Threat Feed API]({{site.baseurl}}/reference/resources/globalthreatfeed) for all configuration options.

2. Add the feed to your cluster.

   ```bash
   kubectl apply -f feodo-tracker.yaml
   ```

#### Check search results

Open {{site.prodname}} Manager, and navigate to the “Alerts” page. If any of your pods have been communicating with the IP addresses in the FEODO tracker feed, you will see the results listed on this page. It is normal to not see any events listed on this page.

#### Block pods from contacting IPs

If you have high confidence in the IP addresses listed as malicious in a threat feed, you can take stronger action than just searching for connections after the fact. For example, the FEODO tracker lists IP addresses used by command and control servers for botnets. We can configure {{site.prodname}} to block all egress traffic to addresses on this list.

It is strongly recommended that you assess the contents of a threat feed for false positives before using it as a deny-list, and that you apply it to a test subset of your workloads before rolling out application or cluster-wide. Failure to do so could cause legitimate application traffic to be blocked and could lead to an outage in your application.

In this demo, we will apply the policy only to a test workload (so we do not impact other traffic).

1. Create a file called **tf-ubuntu.yaml** with the following contents:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     labels:
       docs.tigera.io-tutorial: threat-feed
     name: tf-ubuntu
   spec:
     nodeSelector:
       kubernetes.io/os: linux
     containers:
     - command:
       - sleep
       - "3600"
       image: ubuntu
       name: test
   ```

2. Apply the pod configuration.

   ```bash
   kubectl apply -f tf-ubuntu.yaml
   ```

3. Edit the feodo-tracker.yaml to include a globalNetworkSet stanza:

   ```yaml
   apiVersion: projectcalico.org/v3
   kind: GlobalThreatFeed
   metadata:
     name: feodo-tracker
   spec:
     content: IPSet
     mode: Enabled
     description: "This is the feodo-tracker threat feed"
     feedType: Custom
     pull:
       http:
         url: https://feodotracker.abuse.ch/downloads/ipblocklist.txt
     globalNetworkSet:
       labels:
         docs.tigera.io-threat-feed: feodo
   ```

4. Reapply the new YAML.

   ```bash
   kubectl apply -f feodo-tracker.yaml
   ```

5. Verify that the GlobalNetworkSet is created.

   ```bash
   kubectl get globalnetworksets threatfeed.feodo-tracker -o yaml
   ```

#### Apply global network policy

We will now apply a GlobalNetworkPolicy that blocks the test workload from connecting to any IPs in the threat feed.

1. Create a file called block-feodo.yaml with the following contents:

   ```yaml
   apiVersion: projectcalico.org/v3
   kind: GlobalNetworkPolicy
   metadata:
     name: default.block-feodo
   spec:
     tier: default
     selector: docs.tigera.io-tutorial == 'threat-feed'
     types:
     - Egress
     egress:
     - action: Deny
       destination:
         selector: docs.tigera.io-threat-feed == 'feodo'
     - action: Allow
   ```

2. Apply this policy to the cluster

   ```bash
   kubectl apply -f block-feodo.yaml
   ```

#### Verify policy on test workload

We will verify the policy from the test workload that we created earlier.

1. Get a shell in the pod by running the following command:

   ```bash
   kubectl exec -ti tf-ubuntu bash
   ```

   You should get a prompt inside the pod.

2. Install the ping command.

   ```bash
   apt update && apt install iputils-ping
   ```

3. Ping a known safe IP (like 8.8.8.8, Google’s public DNS server).

   ```bash
   ping 8.8.8.8
   ```

4. Open the [FEODO tracker list](https://feodotracker.abuse.ch/downloads/ipblocklist.txt){:target="_blank"} and choose an IP on the list to ping.
   You should not get connectivity, and the pings will show up as denied traffic in the flow logs.

### Above and beyond

See [GlobalThreatFeed]({{site.baseurl}}/reference/resources/globalthreatfeed) resource definition for all configuration options.
