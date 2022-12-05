---
title: Enable process-level information in flow logs
description: Get visibility into process-level network activity in flow logs.
canonical_url: /visibility/elastic/flow/processpath
---

### Big picture

Configure {{site.prodname}} to collect process executable path and arguments and add them to flow logs.

### Value

Get visibility into the network activity at the process level using {{site.prodname}} flow logs.

### Concepts

#### eBPF kprobe programs

eBPF is a Linux kernel technology that allows safe mini-programs to be attached to various hooks inside the kernel. To collect the path and arguments of short-lived processes, this feature uses an eBPF kprobe program.

#### Host's PID namespace

For long-lived processes, path and arguments are read from `/proc/pid/cmdline`.  This requires access to the host's PID namespace.  If the access is not available then the process path and arguments will only be captured (by the eBPF kprobes) for newly-created processes.

### Before you begin

Ensure that your kernel contains support for eBPF kprobes that {{site.prodname}} uses. The minimum supported
kernel for this is feature is: `v4.4.0`.

### Privileges

For full functionality, this feature requires the `{{site.noderunning}}` `DaemonSet` to have access to the host's PID namespace. The Tigera Operator will automatically grant this extra privilege to the daemonset if the feature is enabled in the operator's LogCollector resource, as described below.

## How to

#### Enable process path and argument collection

{{site.prodname}} can be configured to enable process path and argument collection on supported Linux kernels
using the command:

```
 kubectl patch logcollector.operator.tigera.io tigera-secure --type merge -p '{"spec":{"collectProcessPath":"Enabled"}}'
```

Enabling/Disabling collectProcessPath causes a rolling update of the `{{site.noderunning}} DaemonSet`.

#### View process path and arguments in flow logs using Kibana

Navigate to the Kibana Flow logs dashboard to view process path and arguments associated with a flow log entry.

The executable path will appear in the `process_name` field and `process_args` will have the executable arguments. Executable path
and arguments cannot be collected under certain circumstances, in that `process_name` will have the task name and `process_args`
will be empty. Information about these fields are described in the [Flow log datatype document](datatypes)

