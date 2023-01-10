---
title: Anonymization attacks
description: Detect and analyze malicious anonymization activity using Tor-VPN feeds.
canonical_url: /threat/tor-vpn-feed-and-dashboard
---

### Big picture

Detect and analyze malicious anonymization activity using Tor-VPN feeds.

### Value

**Tor and VPN infrastructure** are used in enabling anonymous communication, where an attacker can leverage anonymity to scan, attack or compromise the target. It’s hard for network security teams to track malicious actors using such anonymization tools. Hence **Tor and VPN feeds** come into play where the feeds track all the Tor bulk exit nodes as well as most of the anonymising VPN infrastructure on the internet. **The Tor-VPN Dashboard** helps network security teams to monitor and respond to any detected activity where they have a clusterwide view and granular control over logs which is critical in stopping the possible attack in early stages.

### Features

This how-to guide uses the following {{site.prodname}} features:
- **Tor-VPN Feeds**
- **Tor-VPN Dashboard**

### Concepts

#### About Tor and VPN threats

**Tor** is a popular anonymization network on the internet. It is also popular among the malicious actors, hacktivist groups, criminal enterprises as the infrastructure hides the real identity of an attacker carrying out malicious activities. To track down such attackers, Tor historically was subject to investigation by various state level intelligence agencies from US and UK for criminal activities such as Silk Road marketplace, Mirai Botnet C&C. Though it’s not possible to completely de-anonymize the attacker. Hence **Tor bulk exit feed** came into existence to track all the Tor exit IPs over the internet to know attackers using the Tor infrastructure. 
Over the years, many Tor flaws became public and attackers evolved to leverage Tor network with additional VPN layers. There are many individual VPN providers which have the anonymizing infrastructure. Attackers can use these new breed of VPN providers with existing options like Tor to make sure of anonymity. To help security teams, the **X4B vpn feed** detects all the major VPN providers on the internet.

#### Tor-VPN feed types

**Tor Bulk Exit feed**
The Tor Bulk Exit feed lists available Tor exit nodes on the internet which are used by Tor network. The list continuously updated and maintained by the Tor project. An attacker using Tor network, is likely to use one of the bulk exit nodes to connect to your infrastructure. The network security teams can detect such activity with Tor bulk exit feed and investigate as required.

**X4B VPN feed**
In recent times it became a trend to use multiple anonymization networks to hide real attacker identity.list of common VPN providers. There are lots of lists of open proxies and tor nodes on the web, but surprisingly few usable ones dedicated to VPN providers and datacenters. This list combines known VPN netblocks and ASNs owned by datacenters and VPN providers. This list doesn't list all VPNs, but should list the vast majority of common ones.
#### The {{site.prodname}} Tor-VPN dashboard

The Tor-VPN dashboard helps network security teams to monitor and respond to any detected activity by Tor and VPN feeds. It provides a cluster context to the detection and shows multiple artifacts e.g. flow logs, filtering controls, a tag cloud and line graph to analyze the activity and respond faster.
The Tor-VPN dashboard may be accessed as below: 
* Log in to {{site.prodname}} Manager, and go to **kibana**, select **dashboard**, and select **Tor-VPN Dashboard**.

### Before you begin...

#### Required

Privileges to manage GlobalThreatFeed i.e. clusterrole `intrusion-detection-controller`

#### Recommended

We recommend that you turn down the aggregation of flow logs sent to Elasticsearch for configuring threat feeds. If you do not adjust flow logs, Calico Enterprise aggregates over the external IP addresses for allowed traffic, and threat feed searches will not provide useful results (unless the traffic is denied by policy). Go to: [FelixConfiguration]({{site.baseurl}}/reference/resources/felixconfig) and set the field, **flowLogsFileAggregationKindForAllowed** to **1**.

### How to

In this section we will look at how to add Tor and VPN feeds to {{site.prodname}}. Installation process is straightforward as below.

1. Add threat feed to the cluster.
   For VPN Feed,
   ```shell
   kubectl apply -f {{ "/manifests/threatdef/vpn-feed.yaml" | absolute_url }}
   ```
   For Tor Bulk Exit Feed,
   ```shell
   kubectl apply -f {{ "/manifests/threatdef/tor-exit-feed.yaml" | absolute_url }}
   ```
2. Now, you can monitor the Dashboard for any malicious activity. The dashboard can be found at {{site.prodname}} Manager, go to "kibana" and then go to "Dashboard". Select "Tor-VPN Dashboard".
3. Additionally, feeds can be checked using following command:
   ```shell
   kubectl get globalthreatfeeds 
   ```

### Above and beyond

* See [GlobalThreatFeed]({{site.baseurl}}/reference/resources/globalthreatfeed) resource definition for all configuration options.
* Check example to Trace and block Suspicious IPs [Here]({{site.baseurl}}/threat/suspicious-ips)
