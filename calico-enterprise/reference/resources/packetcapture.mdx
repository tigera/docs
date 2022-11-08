---
title: Packet capture
description: API for this Calico Enterprise resource. 
canonical_url: '/reference/resources/packetcapture'
---

A Packet Capture resource (`PacketCapture`) represents captured live traffic for debugging microservices and application
interaction inside a Kubernetes cluster.

{{site.prodname}} supports selecting one or multiple [WorkloadEndpoints resources]({{site.baseurl}}/reference/resources/workloadendpoint)
as described in the [Packet Capture] guide.

For `kubectl` [commands](https://kubernetes.io/docs/reference/kubectl/overview/), the following case-insensitive aliases may be used to specify the resource type on the CLI: 
`packetcapture`,`packetcaptures`, `packetcapture.projectcalico.org`, `packetcaptures.projectcalico.org` as well as
abbreviations such as `packetcapture.p` and `packetcaptures.p`.

### Sample YAML

```yaml
apiVersion: projectcalico.org/v3
kind: PacketCapture
metadata:
  name: sample-capture
  namespace: sample-namespace
spec:
  selector: k8s-app == "sample-app"
  filters:
    - protocol: TCP
      ports:
        - 80
```

```yaml
apiVersion: projectcalico.org/v3
kind: PacketCapture
metadata:
  name: sample-capture
  namespace: sample-namespace
spec:
  selector: all()
  startTime: "2021-08-26T12:00:00Z"
  endTime: "2021-08-26T12:30:00Z"
```

### Packet capture definition

#### Metadata

| Field     | Description                                                        | Accepted Values                                     | Schema | Default   |
|-----------|--------------------------------------------------------------------|-----------------------------------------------------|--------|-----------|
| name      | The name of the packet capture. Required.                          | Alphanumeric string with optional `.`, `_`, or `-`. | string |           |
| namespace | Namespace provides an additional qualification to a resource name. |                                                     | string | "default" |


#### Spec

| Field      | Description                                                                                         | Accepted Values           | Schema                 | Default |
|------------|-----------------------------------------------------------------------------------------------------|---------------------------|------------------------|---------|
| selector   | Selects the endpoints to which this packet capture applies.                                         |                           | [selector](#selector)  |         |
| filters    | The ordered set of filters applied to traffic captured from an interface.                           |                           | [filters](#filters)    |         |
| startTime  | Defines the start time from which this PacketCapture will start capturing packets.                  |  Date in RFC 3339 format  | [startTime](#starttime)|         |
| endTime    | Defines the end time at which this PacketCapture will stop capturing packets.                       |  Date in RFC 3339 format  | [endTime](#endtime)    |         |

#### Selector

{% include content/selectors.md %}

#### Filters

| Field    | Description                              | Accepted Values                                             | Schema              | Default |
|----------|------------------------------------------|-------------------------------------------------------------|---------------------|---------|
| protocol | Positive protocol match.                 | `TCP`, `UDP`, `ICMP`, `ICMPv6`, `SCTP`, `UDPLite`, `1`-`255`| string \| integer   |         |
| ports    | Positive match on the specified ports    |                                                             | list of ports       |         |

{{site.prodname}} supports the following syntax for expressing ports.

| Syntax     | Example    | Description |
|------------|------------|-------------|
| int        | 80         | The exact (numeric) port specified
| start:end  | 6040:6050  | All (numeric) ports within the range start <= x <= end

An individual numeric port may be specified as a YAML/JSON integer. A port range must be represented as a string. Named ports are not supported by `PacketCapture`.
Multiple ports can be defined to filter traffic. All specified ports or port ranges concatenated using the logical operator "OR".

For example, this would be a valid list of ports:
```yaml
ports: [8080, "1234:5678"]
```

Multiple filter rules can be defined to filter traffic. All rules are concatenated using the logical operator "OR".
For example, filtering both TCP or UDP traffic will be defined as:

```yaml
  filters:
    - protocol: TCP
    - protocol: UDP
```

Within a single filter rule, protocol and list of valid ports will be concatenated using the logical operator "AND".

For example, filtering TCP traffic and traffic for port 80 will be defined as:

```yaml
  filters:
    - protocol: TCP
      ports: [80]
```

#### StartTime

Defines the start time from which this PacketCapture will start capturing packets in RFC 3339 format.
If omitted or the value is in the past, the capture will start immediately.
If the value is changed to a future time, capture will stop immediately and restart at that time.

```yaml
    startTime: "2021-08-26T12:00:00Z"
```

#### EndTime

Defines the end time from which this PacketCapture will stop capturing packets in RFC 3339 format.
If omitted the capture will continue indefinitely.
If the value is changed to the past, capture will stop immediately.

```yaml
    endTime: "2021-08-26T12:30:00Z"
```

#### Status

`PacketCaptureStatus` lists the current state of a `PacketCapture` and its generated capture files.

| Field | Description |
|-------|---|
| files | It describes the location of the packet capture files that is identified via a node, its directory and the file names generated. |

#### Files

| Field     | Description |
|-----------|---|
| directory | The path inside the calico-node container for the the generated files. |
| fileNames | The name of the generated file for a `PacketCapture` ordered alphanumerically. </br> The active packet capture file will be identified using the following schema: "{workload endpoint name}_{host network interface}.pcap". </br> Rotated capture files name will contain an index matching the rotation timestamp. |
| node      | The hostname of the Kubernetes node the files are located on. |
| state     | Determines whether a PacketCapture is capturing traffic from any interface attached to the current node. Possible values include: Capturing, Scheduled, Finished, Error, WaitingForTraffic |

[Packet Capture]: /visibility/packetcapture

