---
title: Enabling TCP socket stats in flow logs
description: Enabling TCP socket stats information in flow logs
canonical_url: /visibility/elastic/flow/tcpstats
feature_name: feature_generic_all
---


### Big picture

Configure {{site.prodname}} to collect additional TCP socket statistics. While this feature is available in both iptables and eBPF dataplane modes, it uses eBPF to collect the statistics. Therefore it requires a recent Linux kernel (at least v5.3.0/v4.18.0-193 for RHEL).

### Value

Get visibility into the network activity at the socket level using {{site.prodname}} flow logs.

### Concepts

#### eBPF TC programs

eBPF is a Linux kernel technology that allows safe mini-programs to be attached to various hooks inside the kernel. This feature leverages eBPF to look up the TCP socket associated with packets flowing through an interface and sends them to userspace for addition to flow logs.


### Before you begin

Ensure that your kernel contains support for eBPF that {{site.prodname}} uses. The minimum supported
kernel for tcp socket stats is: `v5.3.0`. For distros based on RHEL, the minimum kernel version is `v4.18.0-193`.

## How to

#### Enable tcp stats collection

{{site.prodname}} can be configured to enable tcp socket stats collection on supported Linux kernels
using the command:

```
 kubectl patch felixconfiguration default -p '{"spec":{"flowLogsCollectTcpStats":true}}'
```
#### View tcp stats in flow logs using Kibana.

Navigate to the Kibana Flow logs dashboard to view tcp stats associated with a flow log entry.

The additional fields collected are `tcp_mean_send_congestion_window`, `tcp_min_send_congestion_window`, `tcp_mean_smooth_rtt`, `tcp_max_smooth_rtt`, 
`tcp_mean_min_rtt`, `tcp_max_min_rtt`, `tcp_mean_mss`, `tcp_min_mss`, `tcp_total_retransmissions`, `tcp_lost_packets`, `tcp_unrecovered_to`.
Information about these fields are described in the [Flow log datatype document](datatypes)

