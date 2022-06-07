---
title: Limitations and known issues
description: Review limitations before starting installation.
canonical_url: '/getting-started/windows-calico/limitations'
---

### Feature support and limitations

| Feature                        |                                                              |
| ------------------------------ | ------------------------------------------------------------ |
| Distributions                  | **Supported:**<br />- EKS<br />- AWS<br />- GCE<br />- Azure<br />- AKS (via [upgrade from Calico]({{site.baseurl}}/maintenance/upgrade-to-tsee))<br />- Kubernetes on-premises<br />- OpenShift<br />- Rancher Kubernetes Engine (RKE) |
| Install and upgrade            | **Supported**: Manifest with manual upgrade<br /><br />**Not supported**: <br />- Operator install<br />- Non-cluster hosts<br />- Typha component for scaling (Linux-based feature) |
| Networking                     | **Supported**:<br />- Calico Enterprise VXLAN, no cross-subnet or VXLAN MTU settings with [limitations](#vxlan-networking-limitations)<br />- Calico Enterprise non-overlay mode with BGP peering with [limitations](#bgp-networking-limitations)<br />- IPv4 |
|                                | **Not supported**: <br />- Overlay mode with BGP peering<br />- IP in IP overlay with BPG routing<br />- Cross-subnet support and MTU setting for VXLAN<br />- IPv6 and dual stack<br />- Dual-ToR<br />- Service advertisement<br />- Multiple networks to pods |
| Policy                         | **Supported**: <br />- Tiered policy with [limitations](#network-policy-with-tiers)<br />- DNS policy with [limitations](#dns-policy-limitations)<br />- Policy recommendations<br />- Policy impact preview |
|                                | **Not supported**: <br />- Staged network-policy<br />- Firewall integrations<br />- Policy for hosts (host endpoints, including automatic host endpoints) |
| Visibility and troubleshooting | **Supported**:<br />- Flow logs for traffic to/from windows pods with [limitations](#flow-log-limitations)           <br />- Audit logs<br />- Alerts |
|                                | **Not supported**: <br />- Packet capture<br />- DNS logs<br />- iptable logs<br />- L7 metrics |
| Threat defense                 | **Supported**: Block traffic to/from src/dst based on a threat feed |
|                                | **Not supported**: <br />- Honeypods<br />- Anomaly detection |
| Multi-cluster management       | **Not supported**, including federated identity endpoints and services |
| Compliance and security        | **Supported**: <br />- Compliance reports: network-access, inventory, policy-audit only |
|                                | **Not supported**: <br />- CIS benchmark and other reports<br />- Encryption with Wireguard |
| Metrics                        | **Not supported**: Prometheus monitoring                     |
| eBPF                           | **Not supported**: (Linux-based feature)                     |

### BGP networking limitations 

If you are using {{site.prodname}} with BGP, note these current limitations with Windows.

| Feature                  | Limitation                                                   |
| ------------------------ | ------------------------------------------------------------ |
| IP mobility/ borrowing   | {{site.prodname}} IPAM allocates IPs to host in blocks for aggregation purposes.<br/>If the IP pool is full, nodes can also "borrow" IPs from another node's block. In BGP terms, the borrower then advertises a more specific "/32" route for the borrowed IP and traffic for that IP is only routed to the borrowing host. <br /><br />Windows nodes do not support this borrowing mechanism; they will not borrow IPs even if the IP pool is full and they mark their blocks so that Linux nodes will not borrow from them. |
| IPs reserved for Windows | {{site.prodname}} IPAM allocates IPs in CIDR blocks. Due to networking requirements on Windows, four IPs per Windows node-owned block must be reserved for internal purposes.<br /><br/>For example, with the default block size of /26, each block contains 64 IP addresses, 4 are reserved for Windows, leaving 60 for pod networking.<br /><br />To reduce the impact of these reservations, a larger block size can be configured at the IP pool scope (before any pods are created). |
| Single IP block per host | {{site.prodname}} IPAM is designed to allocate blocks of IPs (default size /26) to hosts on demand. While the {{site.prodname}} CNI plugin was written to do the same, kube-proxy for Windows currently only supports a single IP block per host. <br/><br />To work around the default limit of one /26 per host there some options:<br/><br/>- Use {{site.prodname}} BGP networking with the kubernetes datastore. In that mode, {{site.prodname}} IPAM is not used and the CNI host-local IPAM plugin is used with the node's Pod CIDR.<br/><br />To allow multiple IPAM blocks per host (at the expense of kube-proxy compatibility), set the `windows_use_single_network` flag to `false` in the `cni.conf.template` before installing {{site.prodname}}. Changing that setting after pods are networked is not recommended because it may leak HNS endpoints. |
| IP-in-IP overlay         | {{site.prodname}}'s IPIP overlay mode cannot be used in clusters that contain Windows nodes because Windows does not support IP-in-IP. |
| NAT-outgoing             | {{site.prodname}} IP pools support a "NAT outgoing" setting with the following behaviour: <br /><br />- Traffic between {{site.prodname}} workloads (in any IP pools) is not NATted. <br />- Traffic leaving the configured IP pools is NATted if the workload has an IP within an IP pool that has NAT outgoing enabled. {{site.prodnameWindows}} honors the above setting but it is only applied at pod creation time. If the IP pool configuration is updated after a pod is created, the pod's traffic will continue to be NATted (or not) as before. NAT policy for newly-networked pods will honor the new configuration. {{site.prodnameWindows}} automatically adds the host itself and its subnet to the NAT exclusion list. This behaviour can be disabled by setting flag `windows_disable_host_subnet_nat_exclusion` to `true` in `cni.conf.template` before running the install script. |
| Service IP advertisement | This {{site.prodname}} feature is not supported on Windows.  |

#### Check your network configuration 

If you are using a networking type that requires layer 2 reachability (such as {{site.prodname}} with a BGP mesh and no peering to your fabric), you can check that your network has layer 2 reachability as follows: 

On each of your nodes, check the IP network of the network adapter that you plan to use for pod networking. For example, on Linux, assuming your network adapter is eth0, you can run: 

```
$ ip addr show eth0 
     2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000 

    link/ether 00:0c:29:cb:c8:19 brd ff:ff:ff:ff:ff:ff 
    inet 192.168.171.136/24 brd 192.168.171.255 scope 

    global eth0 
      valid_lft forever preferred_lft forever 
      inet6 fe80::20c:29ff:fecb:c819/64 scope 
      link 

      valid_lft forever preferred_lft 
      forever 
```    
In this case, the IPv4 is 192.168.171.136/24; which, after applying the /24 mask gives 192.168.171.0/24 for the IP network. 

Similarly, on Windows, you can run 

```
PS C:\> ipconfig 

Windows IP Configuration 

Ethernet adapter vEthernet (Ethernet 2): 

  Connection-specific DNS Suffix . : 
  us-west-2.compute.internal Link-local IPv6 Address . . . . 
  . : fe80::6d10:ccdd:bfbe:bce2%15 IPv4 Address. . . . . . . 
  . . . . : 172.20.41.103 Subnet Mask . . . . . . . . . . . 
  : 255.255.224.0 Default Gateway . . . . . . . . . : 
  172.20.32.1

``` 
In this case, the IPv4 address is 172.20.41.103 and the mask is represented as bytes 255.255.224.0 rather than CIDR notation. Applying the mask, we get a network address 172.20.32.0/19. 

Because the Linux node has network 192.168.171.136/24 and the Windows node has a different network, 172.20.32.0/19, they are unlikely to be on the same layer 2 network. 

### VXLAN networking limitations 

Because of differences between the Linux and Windows dataplane feature sets, the following {{site.prodname}} features are not supported on Windows.

| Feature                  | Limitation                                                   |
| ------------------------ | ------------------------------------------------------------ |
| IPs reserved for Windows | {{site.prodname}} IPAM allocates IPs in CIDR blocks. Due to networking requirements on Windows, four IPs per Windows node-owned block must be reserved for internal purposes.<br /><br/>For example, with the default block size of /26, each block contains 64 IP addresses, 4 are reserved for Windows, leaving 60 for pod networking.<br /><br />To reduce the impact of these reservations, a larger block size can be configured at the IP pool scope (before any pods are created). |
| Single IP block per host | {{site.prodname}} IPAM is designed to allocate blocks of IPs (default size /26) to hosts on demand. While the {{site.prodname}} CNI plugin was written to do the same, kube-proxy currently only supports a single IP block per host. <br />To allow multiple IPAM blocks per host (at the expense of kube-proxy compatibility), set the `windows_use_single_network` flag to `false` in the `cni.conf.template` before installing {{site.prodname}}. Changing that setting after pods are networked is not recommended because it may leak HNS endpoints. |

### Routes are lost in cloud providers

If you create a Windows host with a cloud provider (AWS for example), the creation of the vSwitch at {{site.prodname}} install time can remove the cloud provider's metadata route. If your application relies on the metadata service, you may need to examine the routing table before and after installing {{site.prodname}} in order to reinstate any lost routes.

### VXLAN limitations

**VXLAN support**

- Windows 1903 build 18317 and above
- Windows 1809 build 17763 and above

**Configuration updates**

Certain configuration changes will not be honored after the first pod is networked. This is because Windows does not currently support updating the VXLAN subnet parameters after the network is created so updating those parameters requires the node to be drained:

One example is the VXLAN VNI setting. To change such parameters:
- Drain the node of all pods
- Delete the {{site.prodname}} HNS network:

   ```powershell
   Import-Module -DisableNameChecking {{site.rootDirWindows}}\libs\hns\hns.psm1
   Get-HNSNetwork | ? Name -EQ "{{site.prodname}}" | Remove-HNSNetwork
   ```
- Update the configuration in `config.ps1`, run `uninstall-calico.ps1` and then `install-calico.ps1` to regenerate the CNI configuration.

### Pod-to-pod connections are dropped with TCP reset packets

Restarting Felix or changes to policy (including changes to endpoints referred to in policy) can cause pod-to-pod connections to be dropped with TCP reset packets when one of the following occurs:

- The policy that applies to a pod is updated
- Some ingress or egress policy that applies to a pod contains selectors and the set of endpoints that those selectors match changes

Felix must reprogram the HNS ACL policy attached to the pod. This reprogramming can cause TCP resets. Microsoft has confirmed this is a HNS issue, and they are investigating.

### Service ClusterIPs incompatible with selectors on pod IPs in network policy

**Windows 1809 prior to build 17763.1432**

On Windows nodes, kube-proxy unconditionally applies source NAT to traffic from local pods to service ClusterIPs. This means that, at the destination pod, where policy is applied, the traffic appears to come from the source host rather than the source pod. In turn, this means that a network policy with a source selector matching the source pod will not match the expected traffic.

### Network policy and using selectors

Under certain conditions, relatively simple {{site.prodname}} policies can require significant Windows dataplane resources, that can cause significant CPU and memory usage, and large policy programming latency.

We recommend avoiding policies that contain rules with both a source and destination selector. The following is an example of a policy that would be inefficient. The policy applies to all workloads, and it only allows traffic from workloads labeled as clients to workloads labeled as servers:

```
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: calico-dest-selector
spec:
  selector: all()
  order: 500
  ingress:
  - action: Allow
    destination:
      selector: role == "webserver"
    source:
      selector: role == "client"
```

Because the policy applies to all workloads, it will be rendered once per workload (even if the workload is not labeled as a server), and then the selectors will be expanded into many individual dataplane rules to capture the allowed connectivity. 

Here is a much more efficient policy that still allows the same traffic:

```
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: calico-dest-selector
spec:
  selector: role == "webserver"
  order: 500
  ingress:
  - action: Allow
    source:
      selector: role == "client"
```

The destination selector is moved into the policy selector, so this policy is only rendered for workloads that have the `role: webserver` label. In addition, the rule is simplified so that it only matches on the source of the traffic. Depending on the number of webserver pods, this change can reduce the dataplane resource usage by several orders of magnitude.

### Network policy with tiers

Because of the way the Windows dataplane handles rules, the following limitations are required to avoid performance issues:

- Tiers: maximum of 5
- `pass` rules: maximum of 10 per tier
- If each tier contains a large number of rules, and has pass rules, you may need to reduce the number of tiers further.

### Flow log limitations

{{site.prodname}} supports flow logs with these limitations:

- No packet/bytes stats for denied traffics
- Inaccurate `num_flows_started` and `num_flows_completed` stats with VXLAN networking 
- No DNS stats
- No Http stats
- No RuleTrace for tiers
- No BGP logs

### DNS Policy limitations

>**Note**: DNS Policy is a tech preview feature. Tech preview features may be subject to significant changes before they become GA.
{: .alert .alert-info}

{{site.prodname}} supports DNS policy on Windows with these limitations:

- It could take up to 5 seconds for the first TCP SYN packet to go through, for a connection to a DNS domain name. This is because DNS policies are dynamically programmed. The first TCP packet could be dropped since there is no policy to allow it until {{site.prodnameWindows}} detects domain IPs from DNS response and programs DNS policy rules. The Windows TCPIP stack will send SYN again after TCP Retransmission timeout (RTO) if previous SYN has been dropped.
- Some runtime libraries do not honour DNS TTL. Instead, they manage their own DNS cache which has a different TTL value for DNS entries. On .NET Framework, the value to control DNS TTL is ServicePointManager.DnsRefreshTimeout which has default value of 120 seconds  - [DNS refresh timeout](https://docs.microsoft.com/en-us/dotnet/api/system.net.servicepointmanager.dnsrefreshtimeout). It is important that {{site.prodnameWindows}} uses a longer TTL value than the one used by the application, so that DNS policy will be in place when the application is making outbound connections. The configuration item “WindowsDNSExtraTTL” should have a value bigger than the maximum value of DNS TTL used by the runtime libraries for your applications.
- Due to the limitations of Windows container networking, a policy update could have an impact on performance. Programming DNS policy may result in more policy updates. Setting “WindowsDNSExtraTTL” to a bigger number will reduce the performance impact.

### Next steps

- [Quickstart]({{site.baseurl}}/getting-started/windows-calico/quickstart)
- [Standard install]({{site.baseurl}}/getting-started/windows-calico/kubernetes/standard)
