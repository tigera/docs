---
title: Anomaly detection 
description: Anomaly detectors and descriptions.
canonical_url: /reference/anomaly-detection/all-detectors
---

This topic lists {{site.prodname}} anomaly detectors and their descriptions.

> **Note:** If you have detectors currently running that are not listed on this page, they will not be managed on {{site.prodname}} and will not show up on Manager UI. Delete them manually through `kubectl` by running the command: `kubectl delete globalalert tigera.io.detector.<detector-name>`, replacing `_` in the `<detector-name>` with `-`.
{: .alert .alert-info}

### Security anomaly detectors 

The following detectors are primarily searching for [security anomalies]({{site.baseurl}}/threat/anomaly-detection/security-anomalies) related to malicious activities. 

#### Domain Generation Algorithms (DGA)

ID: `dga`. Looks for the domain names that could be created by the {% include open-new-window.html text='Domain Generation Algorithms (DGA)' url='https://en.wikipedia.org/wiki/Domain_generation_algorithm' %}, frequently used by malware. Generated domain names (URLs) are used to communicate between the malware code and the malware servers. Presence of the DGA may indicate presence of the malware code.

#### HTTP connection spike

ID:` http_connection_spike`. Looks for the services that get too many HTTP inbound connections. May indicate a denial of service attack.

#### HTTP response code

ID: `http_response_codes`. Looks for services that respond with unusual numbers of `4xx` and `5xx` HTTP response codes. 
These codes indicate an error on the server. May mean there is an underlying problem in the server that could 
interfere with day-to-day operations. May indicate an attempt to exploit or enumerate web service behaviour.

#### Rare HTTP request verbs

ID: `http_verbs`. Looks for the services that sent HTTP requests with rare verbs, like `HEAD`, `CONNECT`, `OPTIONS`. 
May indicate an attempt to exploit or enumerate web service behaviour.

#### Port scan

ID: `port_scan`. Looks for pods in your cluster that are sending packets to multiple ports. 
May indicate an attacker has gained control of a pod and is gathering reconnaissance on what else they can reach.

### Performance anomaly detectors 

The following detectors are searching for performance anomalies. These detectors search primarily for performance anomalies like the slowness of processes or excessive resource consumption. Performance anomalies may be the result of malicious activity, but usually just the result of increased activity of legitimate applications.

#### Excessive value anomaly in DNS log

ID: `generic_dns`. Looks for excessive values in several fields in the `DNS` log. May indicate performance 
issues like the excessive resource consumption.

#### Excessive value anomaly in flows log

ID: `generic_flows`. Looks for excessive values in several fields in the `flows` log. May indicate performance 
issues like the excessive resource consumption.

#### Multivariable flow

ID: `multivariable_flow`. Looks for excessive values in combination of all numeric fields in the flow log. May indicate performance issues like the excessive resource consumption.

#### Excessive value anomaly in L7 log

ID: `generic_l7`. Looks for excessive values in several fields in the `L7` log. May indicate performance 
issues like the excessive resource consumption.

### Detectors common to security and performance

The following detectors are searching for anomalies that can be both 
performance and security anomalies. For example, the performance anomalies like the slowness of processes or excessive resource consumption can be effect of the
malicious activity.

#### DNS latency

ID: `dns_latency`. Looks for the clients that have too high latency of the DNS requests. May indicate a denial of service attack. 
This anomaly could also indicate performance issues, like the slowness of processes or the excessive resource consumption.

#### DNS tunnel

ID: `dns_tunnel`. 
Looks for DNS query names in the DNS log with subdomains that can contain encoded information. DNS Tunneling is a method of communicating between a client and server via encoding data into DNS Requests requests and responses. Long and non-human readable strings in DNS query names can indicate the use of DNS Tunneling for malicious communications or data exfiltration.

#### L7 bytes   

ID: `l7_bytes`. Looks for pods that send or receive an excessive number of bytes in the L7 requests. 
May indicate a denial of service attack or other attacks. This anomaly could also indicate performance issues, like the excessive resource consumption.  

#### L7 latency

ID: `l7_latency`. Looks for the pods that have too high latency of the L7 requests. All HTTP requests measured here. 
May indicate a denial of service attack or other attacks. This anomaly could also indicate performance issues, 
like the slowness of processes or the excessive resource consumption.

#### Inbound Service bytes anomaly

ID: `bytes_in`. Looks for services that receive a high amount of data. This could indicate a denial of service attack, data exfiltrating, or other attacks. The detector looks for services with unusual replica sets, and unusual replica sets related to the cluster.

#### Outbound Service bytes anomaly

ID: `bytes_out`. Looks for pods that send a high amount of data. This could indicate a denial of service attack, data exfiltrating, or other attacks. The detector looks for pods with unusual replica sets, and unusual replica sets related to the cluster.

#### Process bytes
ID: `process_bytes`. Looks for the processes with an excessive number of bytes sent or received. May indicate problems with the processes, including excessive resource consumption due to attacks, or performance issues like process slowness or excessive resource consumption.

#### Process restarts

ID: `process_restarts`. Looks for pods with excessive number of the process restarts. May indicate problems with 
the processes, including excessive resource consumption due to attacks, or performance issues like process slowness 
or excessive resource consumption.

