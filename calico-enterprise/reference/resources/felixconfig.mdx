---
title: Felix configuration
description: API for this Calico Enterprise resource.
canonical_url: '/reference/resources/felixconfig'
---

A [Felix]({{ site.baseurl }}/reference/architecture/overview#felix) configuration resource (`FelixConfiguration`) represents Felix configuration options for the cluster.

For `kubectl` commands, the following case-insensitive aliases may be used to specify the resource type on the CLI: `felixconfiguration.projectcalico.org`, `felixconfigurations.projectcalico.org` as well as abbreviations such as `felixconfiguration.p` and `felixconfigurations.p`.

See [Configuring Felix]({{ site.baseurl }}/reference/felix/configuration) for more details.

### Sample YAML

```yaml
apiVersion: projectcalico.org/v3
kind: FelixConfiguration
metadata:
  name: default
spec:
  ipv6Support: false
  ipipMTU: 1400
  chainInsertMode: Append
```

### Felix configuration definition

#### Metadata

| Field       | Description                 | Accepted Values   | Schema |
|-------------|-----------------------------|-------------------|--------|
| name     | Unique name to describe this resource instance. Required. | Alphanumeric string with optional `.`, `_`, or `-`. | string |

- {{site.prodname}} automatically creates a resource named `default` containing the global default configuration settings for Felix. You can use [calicoctl]({{ site.baseurl }}/reference/calicoctl/overview) to view and edit these settings
- The resources with the name `node.<nodename>` contain the node-specific overrides, and will be applied to the node `<nodename>`. When deleting a node the FelixConfiguration resource associated with the node will also be deleted.

#### Spec

| Field                              | Description                 | Accepted Values   | Schema | Default    |
|------------------------------------|-----------------------------|-------------------|--------|------------|
| awsSrcDstCheck                     | Controls automatically setting {% include open-new-window.html text='source-destination-check' url='https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html#EIP_Disable_SrcDestCheck' %} on an AWS EC2 instance running Felix. Setting the value to `Enable` will set the check value in the instance description to `true`. For `Disable`, the check value will be `false`. Setting must be `Disable` if you want the EC2 instance to process traffic not matching the host interface IP address. For example, EKS cluster using Calico CNI with `VXLANMode=CrossSubnet`. Check [IAM role and profile configuration](#aws-iam-rolepolicy-for-source-destination-check-configuration) for setting the necessary permission for this setting to work.| DoNothing, Enable, Disable | string | `DoNothing` |
| awsSecondaryIPSupport              | Controls whether Felix will create secondary AWS ENIs for AWS-backed IP pools.  This feature is documented in the [egress gateways on AWS guide](../../networking/egress/egress-gateway-aws).  Should only be enabled on AWS. | `Enabled`, `EnabledENIPerWorkload`, `Disabled` | string | `Disabled` |
| awsSecondaryIPRoutingRulePriority  | Controls the priority of the policy-based routing rules used to implement AWS-backed IP addresses. Should only be changed to avoid conflicts if your nodes have additional policy based routing rules. | 0-4294967295 | int | 101 |
| awsRequestTimeout | Timeout used for communicating with the AWS API. | `5s`, `10s`, `1m` etc. | duration | `30s` |
| dropActionOverride | Controls what happens to each packet that is denied by the current {{site.prodname}} policy. Normally the `Drop` or `LogAndDrop` value should be used. However when experimenting or debugging a scenario that is not behaving as you expect, the `Accept` and `LogAndAccept` values can be useful: then the packet will be still be allowed through. When one of the `LogAnd...` values is set, each denied packet is logged in syslog.\* | `Drop`, `Accept`, `LogAndDrop`, `LogAndAccept` | string | `Drop` |
| chainInsertMode                    | Controls whether Felix hooks the kernel's top-level iptables chains by inserting a rule at the top of the chain or by appending a rule at the bottom. `Insert` is the safe default since it prevents {{site.prodname}}'s rules from being bypassed.  If you switch to `Append` mode, be sure that the other rules in the chains signal acceptance by falling through to the {{site.prodname}} rules, otherwise the {{site.prodname}} policy will be bypassed. | `Insert`, `Append` | string | `Insert` |
| dataplaneWatchdogTimeout | Timeout before the main dataplane goroutine is determined to have hung and Felix will report non-live and non-ready.  Can be increased if the liveness check incorrectly fails (for example if Felix is running slowly on a heavily loaded system). | `90s`, `120s`, `10m` etc. | duration | `90s` |
| defaultEndpointToHostAction        | This parameter controls what happens to traffic that goes from a workload endpoint to the host itself (after the traffic hits the endpoint egress policy).  By default {{site.prodname}} blocks traffic from workload endpoints to the host itself with an iptables "DROP" action. If you want to allow some or all traffic from endpoint to host, set this parameter to `Return` or `Accept`.  Use `Return` if you have your own rules in the iptables "INPUT" chain; {{site.prodname}} will insert its rules at the top of that chain, then `Return` packets to the "INPUT" chain once it has completed processing workload endpoint egress policy.  Use `Accept` to unconditionally accept packets from workloads after processing workload endpoint egress policy. | Drop, Return, Accept | string | `Drop` |
| deviceRouteSourceAddress           | IPv4 address to set as the source hint for routes programmed by Felix. When not set the source address for local traffic from host to workload will be determined by the kernel. | IPv4 | string | `""` |
| deviceRouteSourceAddressIPv6       | IPv6 address to set as the source hint for routes programmed by Felix. When not set the source address for local traffic from host to workload will be determined by the kernel. | IPv6 | string | `""` |
| deviceRouteProtocol                | This defines the route protocol added to programmed device routes. | Protocol | int | RTPROT_BOOT |
| failsafeInboundHostPorts           | UDP/TCP/SCTP protocol/cidr/port groupings that Felix will allow incoming traffic to host endpoints on irrespective of the security policy. This is useful to avoid accidentally cutting off a host with incorrect configuration.  The default value allows SSH access, etcd, BGP, DHCP and the Kubernetes API. |  | List of [ProtoPort](#protoport) | {::nomarkdown}<p><code>- protocol: tcp<br>&nbsp;&nbsp;port: 22<br>- protocol: udp<br>&nbsp;&nbsp;port: 68<br>- protocol: tcp<br>&nbsp;&nbsp;port: 179<br>- protocol: tcp<br>&nbsp;&nbsp;port: 2379<br>- protocol: tcp<br>&nbsp;&nbsp;port: 2380<br>- protocol: tcp<br>&nbsp;&nbsp;port: 5473<br>- protocol: tcp<br>&nbsp;&nbsp;port: 6443<br>- protocol: tcp<br>&nbsp;&nbsp;port: 6666<br>- protocol: tcp<br>&nbsp;&nbsp;port: 6667</code></p>{:/} |
| failsafeOutboundHostPorts          | UDP/TCP/SCTP protocol/port groupings that Felix will allow outgoing traffic from host endpoints to irrespective of the security policy. This is useful to avoid accidentally cutting off a host with incorrect configuration.  The default value opens etcd's standard ports to ensure that Felix does not get cut off from etcd as well as allowing DHCP, DNS, BGP and the Kubernetes API. | | List of [ProtoPort](#protoport) | {::nomarkdown}<p><code>- protocol: udp<br>&nbsp;&nbsp;port: 53<br>- protocol: udp<br>&nbsp;&nbsp;port: 67<br>- protocol: tcp<br>&nbsp;&nbsp;port: 179<br>- protocol: tcp<br>&nbsp;&nbsp;port: 2379<br>- protocol: tcp<br>&nbsp;&nbsp;port: 2380<br>- protocol: tcp<br>&nbsp;&nbsp;port: 5473<br>- protocol: tcp<br>&nbsp;&nbsp;port: 6443<br>- protocol: tcp<br>&nbsp;&nbsp;port: 6666<br>- protocol: tcp<br>&nbsp;&nbsp;port: 6667</code></p>{:/} |
| featureDetectOverride              | Is used to override the feature detection. Values are specified in a comma separated list with no spaces, example; "SNATFullyRandom=true,MASQFullyRandom=false,RestoreSupportsLock=". "true" or "false" will force the feature, empty or omitted values are auto-detected. | string | string | `""` |
| genericXDPEnabled                  | When enabled, Felix can fallback to the non-optimized `generic` XDP mode. This should only be used for testing since it doesn't improve performance over the non-XDP mode. | true,false | boolean | `false` |
| interfaceExclude                   | A comma-separated list of interface names that should be excluded when Felix is resolving host endpoints.  The default value ensures that Felix ignores Kubernetes' internal `kube-ipvs0` device. If you want to exclude multiple interface names using a single value, the list supports regular expressions. For regular expressions you must wrap the value with `/`. For example having values `/^kube/,veth1` will exclude all interfaces that begin with `kube` and also the interface `veth1`. | string | string | `kube-ipvs0` |
| interfacePrefix                    | The interface name prefix that identifies workload endpoints and so distinguishes them from host endpoint interfaces.  Note: in environments other than bare metal, the orchestrators configure this appropriately.  For example our Kubernetes and Docker integrations set the 'cali' value, and our OpenStack integration sets the 'tap' value. | string | string | `cali` |
| ipipEnabled                        | Optional, you shouldn't need to change this setting as Felix calculates if IPIP should be enabled based on the existing IP Pools. When set, this overrides whether Felix should configure an IPinIP interface on the host. When explicitly disabled in FelixConfiguration, Felix will not clean up addresses from the `tunl0` interface (use this if you need to add addresses to that interface and don't want to have them removed). | `true`, `false`, unset | optional boolean | unset |
| ipipMTU                            | The MTU to set on the tunnel device. Zero value means auto-detect. See [Configuring MTU]({{ site.baseurl }}/networking/mtu) | int | int | `0` |
| ipsetsRefreshInterval              | Period at which Felix re-checks the IP sets in the dataplane to ensure that no other process has accidentally broken {{site.prodname}}'s rules. Set to 0 to disable IP sets refresh. | `5s`, `10s`, `1m` etc. | duration | `10s` |
| iptablesFilterAllowAction          | This parameter controls what happens to traffic that is accepted by a Felix policy chain in the iptables filter table (i.e. a normal policy chain). The default will immediately `Accept` the traffic. Use `Return` to send the traffic back up to the system chains for further processing.| Accept, Return |  string | `Accept` |
| iptablesBackend                    | This parameter controls which variant of iptables binary Felix uses.  If using Felix on a system that uses the netfilter-backed iptables binaries, set this to `NFT`. | Legacy, NFT | string | automatic detection |
| iptablesLockFilePath               | Location of the iptables lock file.  You may need to change this if the lock file is not in its standard location (for example if you have mapped it into Felix's container at a different path). | string | string | `/run/xtables.lock` |
| iptablesLockProbeInterval          | Time that Felix will wait between attempts to acquire the iptables lock if it is not available.  Lower values make Felix more responsive when the lock is contended, but use more CPU. | `5s`, `10s`, `1m` etc. | duration | `50ms` |
| iptablesLockTimeout                | Time that Felix will wait for the iptables lock, or 0, to disable.  To use this feature, Felix must share the iptables lock file with all other processes that also take the lock.  When running Felix inside a container, this requires the /run directory of the host to be mounted into the {{site.nodecontainer}} or calico/felix container. | `5s`, `10s`, `1m` etc. | duration | `0` (Disabled) |
| iptablesMangleAllowAction          | This parameter controls what happens to traffic that is accepted by a Felix policy chain in the iptables mangle table (i.e. a pre-DNAT policy chain). The default will immediately `Accept` the traffic. Use `Return` to send the traffic back up to the system chains for further processing. | `Accept`, `Return` |  string | `Accept` |
| iptablesMarkMask                   | Mask that Felix selects its IPTables Mark bits from. Should be a 32 bit hexadecimal number with at least 8 bits set, none of which clash with any other mark bits in use on the system. | netmask | netmask | `0xffff0000` |
| iptablesNATOutgoingInterfaceFilter | This parameter can be used to limit the host interfaces on which Calico will apply SNAT to traffic leaving a Calico IPAM pool with "NAT outgoing" enabled.  This can be useful if you have a main data interface, where traffic should be SNATted and a secondary device (such as the docker bridge) which is local to the host and doesn't require SNAT.  This parameter uses the iptables interface matching syntax, which allows `+` as a wildcard.  Most users will not need to set this.  Example: if your data interfaces are eth0 and eth1 and you want to exclude the docker bridge, you could set this to `eth+` | string | string | `""` |
| iptablesPostWriteCheckInterval     | Period after Felix has done a write to the dataplane that it schedules an extra read back in order to check the write was not clobbered by another process.  This should only occur if another application on the system doesn't respect the iptables lock. | `5s`, `10s`, `1m` etc. | duration | `1s` |
| iptablesRefreshInterval            | Period at which Felix re-checks all iptables state to ensure that no other process has accidentally broken {{site.prodname}}'s rules. Set to 0 to disable iptables refresh. | `5s`, `10s`, `1m` etc. | duration | `90s` |
| ipv6Support                        | IPv6 support for Felix | `true`, `false` | boolean | `true` |
| logFilePath                        | The full path to the Felix log. Set to `none` to disable file logging. | string | string | `/var/log/calico/felix.log` |
| logPrefix                          | The log prefix that Felix uses when rendering LOG rules. | string | string | `calico-packet` |
| logSeverityFile                    | The log severity above which logs are sent to the log file. | Same as logSeveritySys | string | `Info` |
| logSeverityScreen                  | The log severity above which logs are sent to the stdout. | Same as logSeveritySys | string | `Info` |
| logSeveritySys                     | The log severity above which logs are sent to the syslog. Set to `none` for no logging to syslog. | Debug, Info, Warning, Error, Fatal | string | `Info` |
| logDebugFilenameRegex              | controls which source code files have their Debug log output included in the logs.  Only logs from files with names that match the given regular expression are included.  The filter only applies to Debug level logs. | regex | string | `""` |
| maxIpsetSize                       | Maximum size for the ipsets used by Felix. Should be set to a number that is greater than the maximum number of IP addresses that are ever expected in a selector. | int | int | `1048576` |
| metadataAddr                       | The IP address or domain name of the server that can answer VM queries for cloud-init metadata. In OpenStack, this corresponds to the machine running nova-api (or in Ubuntu, nova-api-metadata). A value of `none` (case insensitive) means that Felix should not set up any NAT rule for the metadata path.  | IPv4, hostname, none | string | `127.0.0.1` |
| metadataPort                       | The port of the metadata server. This, combined with global.MetadataAddr (if not 'None'), is used to set up a NAT rule, from 169.254.169.254:80 to MetadataAddr:MetadataPort. In most cases this should not need to be changed. | int | int | `8775` |
| natOutgoingAddress                 | The source address to use for outgoing NAT. By default an iptables MASQUERADE rule determines the source address which will use the address on the host interface the traffic leaves on. | IPV4 | string | `""` |
| policySyncPathPrefix               | File system path where Felix notifies services of policy changes over Unix domain sockets. This is required only if you're configuring [L7 logs]({{site.baseurl}}/visibility/elastic/l7/configure), or [egress gateways]({{site.baseurl}}/networking/egress/). Set to `""` to disable. | string | string | `""` |
| prometheusGoMetricsEnabled         | Set to `false` to disable Go runtime metrics collection, which the Prometheus client does by default. This reduces the number of metrics reported, reducing Prometheus load. | boolean | boolean | `true` |
| prometheusMetricsEnabled           | Set to `true` to enable the experimental Prometheus metrics server in Felix. | boolean | boolean | `false` |
| prometheusMetricsHost              | TCP network address that the Prometheus metrics server should bind to. | IPv4, IPv6, Hostname | string | `""` |
| prometheusMetricsPort              | TCP port that the Prometheus metrics server should bind to. | int | int | `9091` |
| prometheusProcessMetricsEnabled    | Set to `false` to disable process metrics collection, which the Prometheus client does by default. This reduces the number of metrics reported, reducing Prometheus load. | boolean | boolean | `true` |
| prometheusReporterEnabled | Set to `true` to enable configure Felix to keep count of recently denied packets and publish these as Prometheus metrics. Note that denied packet metrics are independent of the `dropActionOverride` setting.  Specifically, if packets that would normally be denied are being allowed through by a setting of `Accept` or `LogAndAccept`, those packets still get counted as denied packets. | `true`, `false` | boolean | `false` |
| prometheusReporterPort | The TCP port on which to report denied packet metrics, if `prometheusReporterEnabled` is set to `true`. |  |  | `9092` |
| removeExternalRoutes               | Whether or not to remove device routes that have not been programmed by Felix. Disabling this will allow external applications to also add device routes. | bool | boolean | `true` |
| reportingInterval                  | Interval at which Felix reports its status into the datastore, or 0 to disable.  Must be non-zero in OpenStack deployments. | `5s`, `10s`, `1m` etc. | duration | `30s` |
| reportingTTL                       | Time-to-live setting for process-wide status reports. | `5s`, `10s`, `1m` etc. | duration | `90s` |
| routeRefreshInterval               | Period at which Felix re-checks the routes in the dataplane to ensure that no other process has accidentally broken {{site.prodname}}'s rules. Set to 0 to disable route refresh. | `5s`, `10s`, `1m` etc. | duration | `90s` |
| ipsecMode                  | Controls which mode IPsec is operating on. The only supported value is `PSK`. An empty value means IPsec is not enabled. | PSK | string | `""` |
| ipsecAllowUnsecuredTraffic | When set to `false`, only IPsec-protected traffic will be allowed on the packet paths where IPsec is supported.  When set to `true`, IPsec will be used but non-IPsec traffic will be accepted.  In general, setting this to `true` is less safe since it allows an attacker to inject packets.  However, it is useful when transitioning from non-IPsec to IPsec since it allows traffic to flow while the cluster negotiates the IPsec mesh.  | `true`, `false` | boolean | `false` |
| ipsecIKEAlgorithm          | IPsec IKE algorithm. Default is NIST suite B recommendation.| string  | string | `aes128gcm16-prfsha256-ecp256` |
| ipsecESPAlgorithm          | IPsec ESP algorithm. Default is NIST suite B recommendation.| string  | string | `aes128gcm16-ecp256`
| ipsecLogLevel              | Controls log level for IPsec components. Set to `None` for no logging. | `None`, `Notice`, `Info`, `Debug`, `Verbose` | string | `Info` |
| ipsecPSKFile               | The path to the pre shared key file for IPsec. | string | string | `""` |
| flowLogsFileEnabled   | Set to `true`, enables flow logs. If set to `false` no flow logging will occur. Flow logs are written to a file `flows.log` and sent to Elasticsearch. The location of this file can be configured using the `flowLogsFileDirectory` field. File rotation settings for this `flows.log` file can be configured using the fields `flowLogsFileMaxFiles` and `flowLogsFileMaxFileSizeMB`. Note that flow log exports to Elasticsearch are dependent on flow logs getting written to this file. Setting this parameter to `false` will disable flow logs. | `true`, `false` | boolean | `false` |
| flowLogsFileDirectory | Set the directory where flow logs files are stored on Linux nodes. This parameter only takes effect when `flowLogsFileEnabled` is set to `true`. | string | string | `/var/log/calico/flowlogs` |
| flowLogsPositionFilePath | Specify the position of the external pipeline that reads flow logs on Linux nodes. This parameter only takes effect when `FlowLogsDynamicAggregationEnabled` is set to `true`. | string | string | `/var/log/calico/flows.log.pos` |
| flowLogsFileMaxFiles  | Set the number of log files to keep. This parameter only takes effect when `flowLogsFileEnabled` is set to `true`. | int | int | `5` |
| flowLogsFileMaxFileSizeMB | Set the max size in MB of flow logs files before rotation. This parameter only takes effect when `flowLogsFileEnabled` is set to `true`. | int | int | `100` |
| flowLogsFlushInterval | The period, in seconds, at which Felix exports the flow logs. | int | int | `300s` |
| flowLogsFileAggregationKindForAllowed | How much to aggregate the flow logs sent to Elasticsearch for allowed traffic.  Bear in mind that changing this value may have a dramatic impact on the volume of flow logs sent to Elasticsearch. | 0-2 | [AggregationKind](#aggregationkind) | 2 |
| flowLogsFileAggregationKindForDenied | How much to aggregate the flow logs sent to Elasticsearch for denied traffic.  Bear in mind that changing this value may have a dramatic impact on the volume of flow logs sent to Elasticsearch. | 0-2 | [AggregationKind](#aggregationkind) | 1 |
| flowLogsFileIncludeService | When set to `true`, include destination service information in the aggregated flow log. Note that service information will only be included when the flow can be explicitly determined to be bound to a service (e.g. pre-DNAT destination matches a service ClusterIP). | `true`, `false` | boolean | `false` |
| flowLogsFileIncludeLabels | When set to `true`, include source and destination endpoint labels in the aggregated flow log. Note that only Kubernetes endpoints or network sets are included; arbitrary networks do not contain labels. | `true`, `false` | boolean | `false` |
| flowLogsFileIncludePolicies | When set to `true`, include all policies in the aggregated flow logs that acted upon and matches the flow log traffic. | `true`, `false` | boolean | `false` |
| flowLogsEnableNetworkSets | When set to `true`, include an arbitrary network set in the aggregated flow log that matches the IP address of the flow log endpoint. | `true`, `false` | boolean | `false` |
| flowLogsCollectProcessInfo | When set to `true`, Felix will load the kprobe BPF programs to collect process info. | `true`, `false` | boolean | `false` |
| flowLogsCollectTcpStats | When set to `true`, Felix will collect the TCP socket stats. | `true`, `false` | boolean | `true` |
| flowLogsCollectProcessPath | When set to `true`, along with flowLogsCollectProcessInfo, each flow log will include the full path of the executable and the arguments with which the executable was invoked. | `true`, `false` | boolean | `false` |
| flowLogsFilePerFlowProcessLimit | Specify the maximum number of flow log entries with distinct process information beyond which process information will be aggregated | int | int | `2` |
| flowLogsFileNatOutgoingPortLimit | Specify the maximum number of distinct post SNAT ports that will appear in the flowLogs | int | int | `3` |
| flowLogsFilePerFlowProcessArgsLimit | Specify the maximum number of unique arguments in the flowlogs beyond which process arguments will be aggregated | int | int | `5` |
| flowLogsFileDomainsLimit | Specify the maximum number of top-level domains to include in a flow log. This only applies to source reported flows to destinations external to the cluster. | int | int | `5` |
| statsDumpFilePath | Specify the position of the file used for dumping flow log statistics on Linux nodes. Note this is an internal setting that users shouldn't need to modify.| string | string | `/var/log/calico/stats/dump` |
| routeTableRange                    | *deprecated in favor of `RouteTableRanges`* Calico programs additional Linux route tables for various purposes. `RouteTableRange` specifies the indices of the route tables that Calico should use. |  | [RouteTableRanges](#routetablerange) | `""` |
| routeTableRanges                    | Calico programs additional Linux route tables for various purposes. `RouteTableRanges` specifies a set of table index ranges that Calico should use. Deprecates `RouteTableRange`, overrides `RouteTableRange` |  | [RouteTableRanges](#routetableranges) | `[{"min": 1, "max": 250}]` |
| routeSyncDisabled                  | Set to `true` to disable Calico programming routes to local workloads. | boolean | boolean | `false` |
| serviceLoopPrevention              | When [service IP advertisement is enabled]({{ site.baseurl }}/networking/advertise-service-ips), prevent routing loops to service IPs that are not in use, by dropping or rejecting packets that do not get DNAT'd by kube-proxy.  Unless set to "Disabled", in which case such routing loops continue to be allowed. | `Drop`, `Reject`, `Disabled` | string | `Drop` |
| workloadSourceSpoofing             | Controls whether pods can enable source IP address spoofing with the `cni.projectcalico.org/allowedSourcePrefixes` annotation. When set to `Any`, pods can use this annotation to send packets from any IP address. | `Any`, `Disabled` | string | `Disabled`
| vxlanEnabled                       | Optional, you shouldn't need to change this setting as Felix calculates if VXLAN should be enabled based on the existing IP Pools. When set, this overrides whether Felix should create the VXLAN tunnel device for VXLAN networking. | `true`, `false`, unset | optional boolean | unset |
| vxlanMTU                           | MTU to use for the IPv4 VXLAN tunnel device. Zero value means auto-detect. Also controls NodePort MTU when eBPF enabled.                                                                                                              | int                    | int              | `0`   |
| vxlanMTUV6                         | MTU to use for the IPv6 VXLAN tunnel device. Zero value means auto-detect. Also controls NodePort MTU when eBPF enabled.                                                                                                              | int                    | int              | `0`   |
| vxlanPort                          | Port to use for VXLAN traffic. A value of `0` means "use the kernel default". | int | int | `4789` |
| vxlanVNI                           | Virtual network ID to use for VXLAN traffic. A value of `0` means "use the kernel default". | int | int | `4096` |
| allowVXLANPacketsFromWorkloads     | Set to `true` to allow VXLAN encapsulated traffic from workloads. | boolean | boolean | `false` |
| allowIPIPPacketsFromWorkloads      | Set to `true` to allow IPIP encapsulated traffic from workloads. | boolean | boolean | `false` |
| windowsFlowLogsFileDirectory | Set the directory where flow logs files are stored on Windows nodes. This parameter only takes effect when `flowLogsFileEnabled` is set to `true`. | string | string | `c:\\TigeraCalico\\flowlogs` |
| windowsFlowLogsPositionFilePath | Specify the position of the external pipeline that reads flow logs on Windows nodes. This parameter only takes effect when `FlowLogsDynamicAggregationEnabled` is set to `true`. | string | string | `c:\\TigeraCalico\\flowlogs\\flows.log.pos` |
| windowsStatsDumpFilePath | Specify the position of the file used for dumping flow log statistics on Windows nodes. Note this is an internal setting that users shouldn't need to modify.| string | string | `c:\\TigeraCalico\\stats\\dump` |
| windowsDNSCacheFile                | Specify the name of the file that Calico uses to preserve learnt DNS information when restarting. | string | string | `c:\\TigeraCalico\\felix-dns-cache.txt` |
| windowsDNSExtraTTL                 | Specify extra time in seconds to keep IPs and alias names that are learnt from DNS, in addition to each name or IP's advertised TTL. | int | int | `120` |
| wireguardEnabled                   | Enable encryption on WireGuard supported nodes in cluster. When enabled, pod to pod traffic will be sent over encrypted tunnels between the nodes. | `true`, `false` | boolean | `false` |
| wireguardEnabledV6                 | Enable encryption for IPv6 on WireGuard supported nodes in cluster. When enabled, pod to pod traffic will be sent over encrypted tunnels between the nodes. | `true`, `false` | boolean | `false` |
| wireguardInterfaceName             | Name of the WireGuard interface created by Felix. If you change the name, and want to clean up the previously-configured interface names on each node, this is a manual process. | string | string | wireguard.cali |
| wireguardInterfaceNameV6           | Name of the IPv6 WireGuard interface created by Felix. If you change the name, and want to clean up the previously-configured interface names on each node, this is a manual process. | string | string | wg-v6.cali |
| wireguardListeningPort             | Port used by WireGuard tunnels. Felix sets up WireGuard tunnel on each node specified by this port. Available for configuration only in the global FelixConfiguration resource; setting it per host, config-file or environment variable will not work. | 1-65535 | int | 51820 |
| wireguardListeningPortV6           | Port used by IPv6 WireGuard tunnels. Felix sets up an IPv6 WireGuard tunnel on each node specified by this port. Available for configuration only in the global FelixConfiguration resource; setting it per host, config-file or environment variable will not work. | 1-65535 | int | 51821 |
| wireguardMTU                       | MTU set on the WireGuard interface created by Felix. Zero value means auto-detect. See [Configuring MTU]({{ site.baseurl }}/networking/mtu). | int | int | 0 |
| wireguardMTUV6                     | MTU set on the IPv6 WireGuard interface created by Felix. Zero value means auto-detect. See [Configuring MTU]({{ site.baseurl }}/networking/mtu). | int | int | 0 |
| wireguardRoutingRulePriority       | WireGuard routing rule priority value set up by Felix. If you change the default value, set it to a value most appropriate to routing rules for your nodes. | 1-32765 | int | 99 |
| wireguardHostEncryptionEnabled     | **Experimental**: Adds host-namespace workload IP's to WireGuard's list of peers. Should **not** be enabled when WireGuard is enabled on a cluster's control-plane node, as networking deadlock can occur. | true, false | boolean | false |
| wireguardKeepAlive                 | WireguardKeepAlive controls Wireguard PersistentKeepalive option. Set 0 to disable. [Default: 0] | `5s`, `10s`, `1m` etc. | duration | `0` |
| xdpRefreshInterval                 | Period at which Felix re-checks the XDP state in the dataplane to ensure that no other process has accidentally broken {{site.prodname}}'s rules. Set to 0 to disable XDP refresh. | `5s`, `10s`, `1m` etc. | duration | `90s` |
| xdpEnabled                         | When `bpfEnabled` is `false`: enable XDP acceleration for host endpoint policies.  When `bpfEnabled` is `true`, XDP is automatically used for Calico policy where that makes sense, regardless of this setting.  [Default: `true`] | true,false | boolean | `true` |
| dnsCacheFile                       | The name of the file that Felix uses to preserve learnt DNS information when restarting. | file name | string | `/var/run/calico/felix-dns-cache.txt` |
| dnsCacheSaveInterval               | The period, in seconds, at which Felix saves learnt DNS information to the cache file. | `5s`, `10s`, `1m` etc. | duration | `60s` |
| dnsCacheEpoch                      | An arbitrary number that can be changed, at runtime, to tell Felix to discard all its learnt DNS information. | int | int | `0` |
| dnsExtraTTL                        | Extra time to keep IPs and alias names that are learnt from DNS, in addition to each name or IP's advertised TTL. | `5s`, `10s`, `1m` etc. | duration | `0s` |
| dnsTrustedServers                  | The DNS servers that Felix should trust. Each entry here must be `<ip>[:<port>]` - indicating an explicit DNS server IP - or `k8s-service:[<namespace>/]<name>[:port]` - indicating a Kubernetes DNS service. `<port>` defaults to the first service port, or 53 for an IP, and `<namespace>` to `kube-system`. An IPv6 address with a port must use the square brackets convention, for example `[fd00:83a6::12]:5353`. Note that Felix (calico-node) will need RBAC permission to read the details of each service specified by a `k8s-service:...` form. | IPs or service names | comma-separated strings | `k8s-service:kube-dns` |
| dnsLogsFileEnabled                 | Set to `true`, enables DNS logs. If set to `false` no DNS logging will occur. DNS logs are written to a file `dns.log` and sent to Elasticsearch. The location of this file can be configured using the `DNSLogsFileDirectory` field. File rotation settings for this `dns.log` file can be configured using the fields `DNSLogsFileMaxFiles` and `DNSLogsFileMaxFileSizeMB`. Note that DNS log exports to Elasticsearch are dependent on DNS logs getting written to this file. Setting this parameter to `false` will disable DNS logs. | `true`, `false` | boolean | `false` |
| dnsLogsFileDirectory               | The directory where DNS logs files are stored. This parameter only takes effect when `DNSLogsFileEnabled` is `true`. | directory | string | `/var/log/calico/dnslogs` |
| dnsLogsFileMaxFiles                | The number of files to keep when rotating DNS log files. This parameter only takes effect when `DNSLogsFileEnabled` is `true`. | int | int | `5` |
| dnsLogsFileMaxFileSizeMB           | The max size in MB of DNS log files before rotation. This parameter only takes effect when `DNSLogsFileEnabled` is `true`. | int | int | `100` |
| dnsLogsFlushInterval               | The period, in seconds, at which Felix exports DNS logs. | int | int | `300s` |
| dnsLogsFileAggregationKind         | How much to aggregate DNS logs.  Bear in mind that changing this value may have a dramatic impact on the volume of flow logs sent to Elasticsearch.  `0` means no aggregation, `1` means aggregate similar DNS logs from workloads in the same ReplicaSet. | `0`,`1` | int | `1` |
| dnsLogsFileIncludeLabels           | Whether to include client and server workload labels in DNS logs. | `true`, `false` | boolean | `true` |
| dnsLogsFilePerNodeLimit            | Limit on the number of DNS logs that can be emitted within each flush interval.  When this limit has been reached, Felix counts the number of unloggable DNS responses within the flush interval, and emits a WARNING log with that count at the same time as it flushes the buffered DNS logs. | int | int | `0` (no limit) |
| dnsLogsLatency                     | Indicates to include measurements of DNS request/response latency in each DNS log. | `true`, `false` | boolean | `true` |
| dnsPolicyMode                      | DNSPolicyMode specifies how DNS policy programming will be handled. | `NoDelay`, `DelayDNSResponse`, `DelayDeniedPacket` | [DNSPolicyMode](#dnspolicymode) | `DelayDeniedPacket` |   
| dnsPolicyNfqueueID                 | DNSPolicyNfqueueID is the NFQUEUE ID to use for DNS Policy re-evaluation when the domains IP hasn't been programmed to ipsets yet. This value can be changed to avoid conflicts with other users of NFQUEUEs. Used when `DNSPolicyMode` is `DelayDeniedPacket`. | 0-65535 | int | `100` |
| dnsPolicyNfqueueSize               | DNSPolicyNfqueueID is the size of the NFQUEUE for DNS policy re-evaluation. This is the maximum number of denied packets that may be queued up pending re-evaluation. Used when `DNSPolicyMode` is `DelayDeniedPacket`. | 0-65535 | int | `100` |
| dnsPacketsNfqueueID                | DNSPacketsNfqueueID is the NFQUEUE ID to use for capturing DNS packets to ensure programming IPSets occurs before the response is released. Used when `DNSPolicyMode` is `DelayDNSResponse`. | 0-65535 | int | `101` |
| dnsPacketsNfqueueSize              | DNSPacketsNfqueueSize is the size of the NFQUEUE for captured DNS packets. This is the maximum number of DNS packets that may be queued awaiting programming in the dataplane. Used when `DNSPolicyMode` is `DelayDNSResponse`. | 0-65535 | int | `100` |
| dnsPacketsNfqueueMaxHoldDuration   | DNSPacketsNfqueueMaxHoldDuration is the max length of time to hold on to a DNS response while waiting for the the dataplane to be programmed. Used when `DNSPolicyMode` is `DelayDNSResponse`. | `5s`, `10s`, `1m` etc. | duration | `3s` |
| bpfEnabled                         | Enable eBPF dataplane mode.  eBPF mode has some limitations, see the [HOWTO guide]({{ site.baseurl }}/maintenance/ebpf/enabling-ebpf) for more details. | true, false | boolean | false |
| bpfDisableUnprivileged             | If true, Felix sets the kernel.unprivileged_bpf_disabled sysctl to disable unprivileged use of BPF.  This ensures that unprivileged users cannot access Calico's BPF maps and cannot insert their own BPF programs to interfere with the ones that {{site.prodname}} installs. | true, false | boolean | true |
| bpfLogLevel                        | In eBPF dataplane mode, the log level used by the BPF programs.  The logs are emitted to the BPF trace pipe, accessible with the command `tc exec bpf debug`.  This is a tech preview feature and subject to change in future releases. | Off,Info,Debug | string | Off |
| bpfDataIfacePattern                | In eBPF dataplane mode, controls which interfaces Felix should attach BPF programs to in order to catch traffic to/from the external network.  This needs to match the interfaces that Calico workload traffic flows over as well as any interfaces that handle incoming traffic to NodePorts and services from outside the cluster.  It should not match the workload interfaces (usually named cali...)..  This is a tech preview feature and subject to change in future releases. | regular expression | string | `^(en.*|eth.*|tunl0$)` |
| bpfConnectTimeLoadBalancingEnabled | In eBPF dataplane mode, controls whether Felix installs the connect-time load balancer.  In the current release, the connect-time load balancer is required for the host to reach kubernetes services.  This is a tech preview feature and subject to change in future releases. | true,false | boolean | true |
| bpfExternalServiceMode             | In eBPF dataplane mode, controls how traffic from outside the cluster to NodePorts and ClusterIPs is handled.  In Tunnel mode, packet is tunneled from the ingress host to the host with the backing pod and back again.  In DSR mode, traffic is tunneled to the host with the backing pod and then returned directly; this requires a network that allows direct return. | Tunnel,DSR | string | Tunnel |
| bpfKubeProxyIptablesCleanupEnabled | In eBPF dataplane mode, controls whether Felix will clean up the iptables rules created by the Kubernetes `kube-proxy`; should only be enabled if `kube-proxy` is not running. This is a tech preview feature and subject to change in future releases. | true,false| boolean | true |
| bpfKubeProxyMinSyncPeriod          | In eBPF dataplane mode, controls the minimum time between dataplane updates for Felix's embedded `kube-proxy` implementation. | `5s`, `10s`, `1m` etc. | duration | `1s` |
| BPFKubeProxyEndpointSlicesEnabled  | In eBPF dataplane mode, controls whether Felix's embedded kube-proxy derives its services from Kubernetes' EndpointSlices resources. Using EndpointSlices is more efficient but it requires EndpointSlices support to be enabled at the Kubernetes API server. | true,false | boolean | false |
| bpfMapSizeConntrack | In eBPF dataplane mode, controls the size of the conntrack map. | int | int | 512000 |
| bpfMapSizeIPSets | In eBPF dataplane mode, controls the size of the ipsets map. | int | int | 1048576 |
| bpfMapSizeNATAffinity | In eBPF dataplane mode, controls the size of the NAT affinity map. | int | int | 65536 |
| bpfMapSizeNATFrontend | In eBPF dataplane mode, controls the size of the NAT front end map. | int | int | 65536 |
| bpfMapSizeNATBackend | In eBPF dataplane mode, controls the size of the NAT back end map. | int | int | 262144 |
| bpfMapSizeRoute | In eBPF dataplane mode, controls the size of the route map. | int | int | 262144 |
| bpfPolicyDebugEnabled              | In eBPF dataplane mode, controls whether felix will collect policy dump for each interface. | true, false | boolean | true |
| routeSource                        | Where Felix gets is routing information from for VXLAN and the BPF dataplane. The CalicoIPAM setting is more efficient because it supports route aggregation, but it only works when Calico's IPAM or host-local IPAM is in use. Use the WorkloadIPs setting if you are using Calico's VXLAN or BPF dataplane and not using Calico IPAM or host-local IPAM. | CalicoIPAM,WorkloadIPs | string | `CalicoIPAM` |
| mtuIfacePattern                    | Pattern used to discover the host's interface for MTU auto-detection. | regex | string | `^((en|wl|ww|sl|ib)[opsx].*|(eth|wlan|wwan).*)` |
| egressIPSupport                    | Defines three different support modes for egress gateway function. `Disabled` means egress gateways are not supported. `EnabledPerNamespace` means egress gateway function is enabled and can be configured on a per-namespace basis (but per-pod egress annotations are ignored). `EnabledPerNamespaceOrPerPod` means egress gateway function is enabled and can be configured per-namespace or per-pod (with per-pod egress annotations overriding namespace annotations). | Disabled,<br/>EnabledPerNamespace,<br/>EnabledPerNamespaceOrPerPod | string | `Disabled` |
| egressIPVXLANPort                  | Port to use for egress gateway VXLAN traffic. A value of `0` means "use the kernel default". | int | int | `4790` |
| egressIPVXLANVNI                   | Virtual network ID to use for egress gateway VXLAN traffic. A value of `0` means "use the kernel default". | int | int | `4097` |
| egressIPRoutingRulePriority        | Controls the priority value to use for the egress gateway routing rule. | int | int | `100` |
| captureDir                         | Controls the directory where packet capture files are stored. | string | string | `/var/log/calico/pcap` |
| captureMaxSizeBytes                | Controls the maximum size in bytes for a packet capture file before rotation. | int | int | `10000000` |
| captureRotationSeconds             | Controls the rotation period in seconds for a packet capture file. | int | int | `3600` |
| captureMaxFiles                    | Controls the maximum number rotated packet capture files. | int | int | `2` |

\* When `dropActionOverride` is set to `LogAndDrop` or `LogAndAccept`, the `syslog` entries look something like the following.
   ```
   May 18 18:42:44 ubuntu kernel: [ 1156.246182] calico-drop: IN=tunl0 OUT=cali76be879f658 MAC= SRC=192.168.128.30 DST=192.168.157.26 LEN=60 TOS=0x00 PREC=0x00 TTL=62 ID=56743 DF PROTO=TCP SPT=56248 DPT=80 WINDOW=29200 RES=0x00 SYN URGP=0 MARK=0xa000000
   ```
   {: .no-select-button}

\*\* Duration is denoted by the numerical amount followed by the unit of time. Valid units of time include nanoseconds (ns), microseconds (µs), milliseconds (ms), seconds (s), minutes (m), and hours (h). Units of time can also be used together e.g. `3m30s` to represent 3 minutes and 30 seconds. Any amounts of time that can be converted into larger units of time will be converted e.g. `90s` will become `1m30s`.

<br>

`genericXDPEnabled` and `xdpRefreshInterval` are only relevant when `bpfEnabled` is `false` and
`xdpEnabled` is `true`; in other words when XDP is being used to accelerate denial-of-service
prevention policies in the iptables dataplane.

When `bpfEnabled` is `true` the "xdp" settings all have no effect; in BPF mode the implementation of
policy is always accelerated, using the best available BPF technology.

#### ProtoPort

| Field    | Description          | Accepted Values                      | Schema |
|----------|----------------------|--------------------------------------|--------|
| port     | The exact port match | 0-65535                              | int    |
| protocol | The protocol match   | tcp, udp, sctp                       | string |
| net      | The CIDR match       | any valid CIDR (e.g. 192.168.0.0/16) | string |

#### AggregationKind

| Value | Description |
|-------|-------------|
| 0     | No aggregation |
| 1     | Aggregate all flows that share a source port on each node |
| 2     | Aggregate all flows that share source ports or are from the same ReplicaSet on each node |

#### DNSPolicyMode

| Value                  | Description              |
|------------------------|--------------------------|
| DelayDeniedPacket      | Felix delays any denied packet that traversed a policy that included egress domain matches, but did not match. The packet is released after a fixed time, or after the destination IP address was programmed. |
| DelayDNSResponse       | Felix delays any DNS response until related IPSets are programmed. This introduces some latency to all DNS packets (even when no IPSet programming is required), but it ensures policy hit statistics are accurate. This is the recommended setting when you are making use of staged policies or policy rule hit statistics. |
| NoDelay                | Felix does not introduce any delay to the packets. DNS rules may not have been programmed by the time the first packet traverses the policy rules. Client applications need to handle reconnection attempts if initial connection attempts fail. This may be problematic for some applications or for very low DNS TTLs. |

On Windows, or when using the eBPF dataplane, this setting is ignored and `NoDelay` is always used.

A linux kernel version of 3.13 or greater is required to use `DelayDNSResponse`. For earlier kernel versions, this value is modified to `DelayDeniedPacket`.

#### RouteTableRange
The `RouteTableRange` option is now deprecated in favor of [RouteTableRanges](#routetableranges).

| Field    | Description          | Accepted Values   | Schema |
|----------|----------------------|-------------------|--------|
| min      | Minimum index to use | 1-250             | int    |
| max      | Maximum index to use | 1-250             | int    |

#### RouteTableRanges
`RouteTableRanges` is a list of `RouteTableRange` objects:

| Field    | Description          | Accepted Values | Schema |
|----------|----------------------|-----------------|--------|
| min      | Minimum index to use | 1 - 4294967295  | int    |
| max      | Maximum index to use | 1 - 4294967295  | int    |

Each item in the `RouteTableRanges` list designates a range of routing tables available to Calico. By default, Calico will use a single range of `1-250`.  If a range spans Linux's reserved table range (`253-255`) then those tables are automatically excluded from the list. It's possible that other table ranges may also be reserved by third-party systems unknown to Calico. In that case, multiple ranges can be defined to target tables below and above the sensitive ranges:
```sh
# target tables 65-99, and 256-1000, skipping 100-255
calicoctl patch felixconfig default --type=merge -p '{"spec":{"routeTableRanges": [{"min": 65, "max": 99}, {"min": 256, "max": 1000}] }}
```

*Note*, for performance reasons, the maximum total number of routing tables that Felix will accept is 65535 (or 2*16).

Specifying both the `RouteTableRange` and `RouteTableRanges` arguments is not supported and will result in an error from the api.

#### AWS IAM Role/Policy for source-destination-check configuration

Setting `awsSrcDstCheck` to `Disable` will automatically disable source-destination-check on EC2 instances in a cluster, provided necessary IAM roles and policies are set. One of the policies assigned to IAM role of cluster nodes must contain a statement similar to the following:

```
{
    "Effect": "Allow",
        "Action": [
            "ec2:DescribeInstances",
            "ec2:ModifyNetworkInterfaceAttribute"
        ],
    "Resource": "*"
}
```

If there are no policies attached to node roles containing the above statement, attach a new policy. For example, if a node role is `test-cluster-nodeinstance-role`, click on the IAM role in AWS console. In the `Permission policies` list, add a new inline policy with the above statement to the new policy JSON definition. For detailed information, see {% include open-new-window.html text='AWS documentation' url='https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html?icmpid=docs_iam_console' %}.

For an EKS cluster, the necessary IAM role and policy is available by default. No further actions are needed.

### Supported operations

| Datastore type        | Create | Delete | Delete (Global `default`) | Update | Get/List | Notes |
|-----------------------|--------|--------|---------------------------|--------|----------|-------|
| Kubernetes API server | Yes    | Yes    | No                        | Yes    | Yes      |       |
