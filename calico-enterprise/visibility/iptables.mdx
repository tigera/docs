---
title: iptables logs
description: Learn how policy audit mode rules can affect the number of iptable logs.
canonical_url: /visibility/iptables
---

## About iptables logs

iptables logs are produced by [policy audit mode](#policy-audit-mode) or by using the `Log` action in either
[Network Policy]({{site.baseurl}}/reference/resources/networkpolicy) or [Global Network Policy]({{site.baseurl}}/reference/resources/globalnetworkpolicy).
These logs are written to syslog (specifically the `/dev/log` socket) on the nodes where the events are generated.
Collection, rotation and other management of these logs is provided by your syslog agent, for example, journald or rsyslogd.

## Policy audit mode

{{site.prodname}} adds a Felix option `DropActionOverride` that configures how the
`deny` `action` in a [Rule]({{site.baseurl}}/reference/resources/networkpolicy#rule) is interpreted.
It can add logs for denied packets, or even allow the traffic through.

See the
[Felix configuration reference]({{site.baseurl}}/reference/felix/configuration#{{site.prodnamedash}}-specific-configuration) for
information on how to configure this option.

`DropActionOverride` controls what happens to each packet that is denied by
the current {{site.prodname}} policy, i.e., by the ordered combination of all the
configured policies and profiles that apply to that packet.  It may be
set to one of the following values:

- `Drop`
- `Accept`
- `LogAndDrop`
- `LogAndAccept`

Normally the `Drop` or `LogAndDrop` value should be used, as dropping a
packet is the obvious implication of that packet being denied.  However when
experimenting, or debugging a scenario that is not behaving as you expect, the
"Accept" and "LogAndAccept" values can be useful: then the packet will be
still be allowed through.

When one of the `LogAnd*` values is set, each denied packet is logged in
syslog, with an entry like this:

```
May 18 18:42:44 ubuntu kernel: [ 1156.246182] calico-drop: IN=tunl0 OUT=cali76be879f658 MAC= SRC=192.168.128.30 DST=192.168.157.26 LEN=60 TOS=0x00 PREC=0x00 TTL=62 ID=56743 DF PROTO=TCP SPT=56248 DPT=80 WINDOW=29200 RES=0x00 SYN URGP=0 MARK=0xa000000
```
{: .no-select-button}

Note that [Denied Packet Metrics]({{site.baseurl}}/maintenance/monitor/metrics) are independent of the `DropActionOverride`
setting.  Specifically, if packets that would normally be denied are being
allowed through by a setting of `Accept` or `LogAndAccept`, those packets
still contribute to the denied packet metrics as normal.

For example, to set a `DropActionOverride` for `myhost` to log then drop denied packets:

Edit the FelixConfiguration object for the `myhost` Node.

```bash
kubectl patch felixconfiguration.p node.myhost --type='merge' -p \
    '{"spec":{"dropActionOverride":"LogAndDrop"}}'
```

For a global setting, modify the `default` FelixConfiguration resource.
