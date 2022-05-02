---
title: Configure egress gateways, AWS
description: Configure specific application traffic to exit the cluster through an egress gateway with a native AWS IP address.
canonical_url: '/networking/egress/egress-gateway-aws'
feature_name: 'egress_gateway_aws'
---

### Big picture

Control the source IP address seen by external services/appliances by routing the traffic from certain pods 
through egress gateways.  Use native VPC subnet IP addresses for the egress gateways so that the IPs are valid in the AWS fabric.

### Value

Controlling the source IP seen when traffic leaves the cluster allows groups of pods to be identified 
by external firewalls, appliances and services (even as the groups are scaled up/down or pods restarted).
{{site.prodname}} controls the source IP by directing traffic through one or more "egress gateway" pods, which
change the source IP of the traffic to their own IP. The egress gateways used can be chosen at the pod or namespace 
scope allowing for flexibility in how the cluster is seen from outside.

In AWS, egress gateway source IP addresses are chosen from an IP pool backed by a [VPC subnet](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html)
using {{site.prodname}} IPAM.   {{site.prodname}} IPAM allows the IP addresses to be precisely controlled, this allows
for static configuration of external appliances. Using an IP pool backed by a VPC subnet allows {{site.prodname}} to 
configure the AWS fabric to route traffic to and from the egress gateway using its own IP address.

### Features

This how-to guide uses the following features:

- AWS features:

  - VPC networking
  - VPC subnets
  - VPC Routing tables
  - VPC CIDR blocks
  - VPC Peerings and/or VPN Peerings
  - Secondary ENIs
  - Availability zones
  - IAM roles

- {{site.prodname}} CNI and IPAM.  The ability to control the egress gateway's IP is a feature of 
  {{site.prodname}} CNI and IPAM.  AWS VPC CNI does not support that feature, so it is incompatible with 
  egress gateways.

  - `IPPool` resources.  In particular, AWS-backed IP pools.
  - `IPReservation` resources.

- Egress gateway pods and their associated Kubernetes **Namespace** and **Pod** annotations:

  - `egress.projectcalico.org/namespaceSelector`
  - `egress.projectcalico.org/selector`

- Node selectors.

- Felix, {{site.prodname}}'s per-host agent.

### Concepts

#### CIDR notation

This article assumes that you are familiar with network masks and CIDR notation.

* CIDR notation is defined in [RFC4632](https://datatracker.ietf.org/doc/html/rfc4632). 
* The [Wikipedia article on CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation)
  provides a good reference.

#### AWS-backed IP pools

{{site.prodname}} supports IP pools that are backed by the AWS fabric.  Workloads that use an IP address from an
AWS-backed pool can communicate on the AWS network using their own IP address and AWS will route their traffic
to/from their host without changing the IP address.  

Pods that use an IP address from an AWS-backed pool may also be [assigned an AWS
Elastic IP via a pod annotation](#add-aws-elastic-ips-to-the-egress-gateway-deployment).  Elastic IPs used in this 
way have the normal AWS semantics: when accessing resources inside the AWS network, the workload's private IP 
(from the IP pool) is used.  When accessing resources outside the AWS network, AWS translates the workload's IP to 
the Elastic IP.  Elastic IPs also allow for incoming requests from outside the AWS fabric, direct to the workload.

In overview, the AWS-backed feature works as follows:

* An IP pool is created with its `awsSubnetID` field set to the ID of a VPC subnet.  This "AWS-backed" IP pool's 
  CIDR must be contained within the VPC subnet's CIDR.

  > **Important**: You must ensure that the CIDR(s) used for AWS-backed IP pool(s) are reserved in the AWS fabric.  
  > For example, by creating a dedicated VPC subnet for {{site.prodname}}.  If the CIDR is not reserved; both 
  > {{site.prodname}} and AWS may try to assign the same IP address, resulting in a conflict.
  {: .alert .alert-danger}

* Since they are a limited resource, {{site.prodname}} IPAM does not use AWS-backed pools by default.  To request an  
  AWS-backed IP address, a pod must have a resource request:

  ```yaml
  spec:
    containers:
    - ...
      resources:
        requests:
          projectcalico.org/aws-secondary-ipv4: 1
        limits:
          projectcalico.org/aws-secondary-ipv4: 1
  ```

  {{site.prodname}} manages the  `projectcalico.org/aws-secondary-ipv4` capacity on the Kubernetes Node resource, 
  ensuring that Kubernetes will not try to schedule too many AWS-backed workloads to the same node.  Only AWS-backed 
  pods are limited in this way; there is no limit on the number of non-AWS-backed pods.

* When the CNI plugin spots such a resource request, it will choose an IP address from an AWS-backed pool.  Only
  pools with VPC subnets in the availability zone of the host are considered.

* When Felix, {{site.prodname}}'s per-host agent spots a local workload with an AWS-backed address it tries to ensure
  that the IP address of the workload is assigned to the host in the AWS fabric.  If need be, it will create a 
  new [secondary ENI](#secondary-elastic-network-interfaces-enis) device and attach it to the host to house the IP address.
  Felix supports two modes for assigning secondary ENIs: **ENI-per-workload** mode (added in v3.13) and 
  **Secondary-IP-per-workload** mode.  These modes are described [below](#secondary-elastic-network-interfaces-enis).

* If the pod has one or more AWS Elastic IPs listed in the `cni.projectcalico.org/awsElasticIPs` pod annotation, 
  Felix will try to ensure that _one_ of the Elastic IPs is assigned to the pod's private IP address in the AWS fabric.
  (Specifying multiple Elastic IPs is useful for multi-pod deployments; ensuring that each pod in the deployment
  gets one of the IPs.)

#### Egress gateway

An egress gateway acts as a transit pod for the outbound application traffic that is configured to
use it.  As traffic leaving the cluster passes through the egress gateway, its source IP is changed
to that of the egress gateway pod, and the traffic is then forwarded on.

#### Source IP

When an outbound application flow leaves the cluster, its IP packets will have a source IP.
This begins as the pod IP of the pod that originated the flow, then:

- _If no egress gateway is configured_ and the pod IP came from an [IP pool]({{site.baseurl}}/reference/resources/ippool) 
  with `natOutgoing: true`, the node hosting the pod will change the source IP to its own as the 
  traffic leaves the host.  This allows the pod to communicate with external service even though the 
  external network is unaware of the pod's IP.

- _If the pod is configured with an egress gateway_, the traffic is first forwarded to the egress gateway, which
  changes the source IP to its own and then sends the traffic on.  To function correctly, egress gateways
  should have IPs from an IP pool with `natOutgoing: false`, meaning their host forwards the packet onto
  the network without changing the source IP again.  Since the egress gateway's IP is visible to
  the underlying network fabric, the fabric must be configured to know about the egress gateway's
  IP and to send response traffic back to the same host.

#### AWS VPCs and subnets

An AWS VPC is a virtual network that is, by default, logically isolated from other VPCs.  Each VPC has one or more
(often large) CIDR blocks associated with it (for example `10.0.0.0/16`).  In general, VPC CIDRs may overlap, but only
if the VPCs remain isolated. AWS allows VPCs to be peered with each other through VPC Peerings. VPCs can only be
peered if *none* of their associated CIDRs overlap.

Each VPC has one or more VPC subnets associated with it, each subnet owns a non-overlapping part of one of the
VPC's CIDR blocks.  Each subnet is associated with a particular availability zone.  Instances in one availability
zone can only use IP addresses from subnets in that zone.  Unfortunately, this adds some complexity to managing 
egress gateways IP addresses: much of the configuration must be repeated per-AZ.

#### AWS VPC and DirectConnect peerings

AWS [VPC Peerings](https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html) allow multiple VPCs to be 
connected together.  Similarly, [DirectConnect](https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html) 
allows external datacenters to be connected to an AWS VPC.  Peered VPCs and datacenters communicate using private IPs 
as if they were all on one large private network.

By using AWS-backed IP pools, egress gateways can be assigned private IPs allowing them to communicate without NAT 
within the same VPC, with peered VPCs, and, with peered datacenters.

#### Secondary Elastic Network Interfaces (ENIs)

Elastic network interfaces are network interfaces that can be added and removed from an instance dynamically. Each
ENI has a primary IP address from the VPC subnet that it belongs to, and it may also have one or more secondary IP
addresses, chosen for the same subnet.  While the primary IP address is fixed and cannot be changed, the secondary
IP addresses can be added and removed at runtime.

To arrange for AWS to route traffic to and from egress gateways, {{site.prodname}} adds _secondary_ Elastic 
Network Interfaces (ENIs) to the host.  {{site.prodname}} supports two modes for provisioning the
secondary ENIs.  The table below describes the trade-offs between **ENI-per-workload** and **Secondary-IP-per-workload**
modes:

| **ENI-per-workload** (since v3.13)                                                    | **Secondary-IP-per-workload**                                                       |
|---------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| One secondary ENI is attached for each AWS-backed workload.                           | Secondary ENIs are shared, multiple workloads per ENI.                              |
| Supports one AWS-backed workload per secondary ENI.                                   | Supports 2-49 AWS-backed workloads per secondary ENI (depending on instance type).  |
| ENI Primary IP is set to Workload's IP.                                               | ENI Primary IP chosen from dedicated "host secondary" IP pools.                     |
| Makes best use of AWS IP space, no need to reserve IPs for hosts.                     | Requires "host secondary" IPs to be reserved.  These cannot be used for workloads.  |
| ENI deleted when workload deleted.                                                    | ENI retained (ready for next workload to be scheduled).                             |
| Slower to handle churn/workload mobility. (Creating ENI is slower than assigning IP.) | Faster at handling churn/workload mobility.                                         |

The number of ENIs that an instance can support and the number of secondary IPs that each ENI can support depends on 
the instance type according to [this table](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#AvailableIpPerENI).
Note: the table lists the total number of network interfaces and IP addresses but the first interface on the host (the 
primary interface) and, in Secondary-IP-per-workload mode, the first IP of each interface (its primary IP) cannot be 
used for egress gateways.

The primary interface cannot be used for egress gateways because it belongs to the VPC subnet that is
in use for Kubernetes hosts; this means that a planned egress gateway IP could get used by AWS as the primary IP of
an instance (for example when scaling up the cluster).

### Before you begin

**Supported**

- Kubernetes in AWS only; for on-prem, see [this guide]({{site.baseurl}}/networking/egress/egress-gateway-on-prem)

### How to

- [Configure IP autodetection](#configure-ip-autodetection)
- [Ensure Kubernetes VPC has free CIDR range](#ensure-kubernetes-vpc-has-free-cidr-range)
- [Create dedicated VPC subnets](#create-dedicated-vpc-subnets)
- [Configure AWS IAM roles](#configure-aws-iam-roles)
- [Configure IP reservations for each VPC subnet](#configure-ip-reservations-for-each-vpc-subnet)
- [Enable egress gateway support](#enable-egress-gateway-support)
- [Enable policy sync API](#enable-policy-sync-api)
- [Enable AWS-backed IP pools](#enable-aws-backed-ip-pools)
- [Configure IP pools backed by VPC subnets](#configure-ip-pools-backed-by-vpc-subnets)
- [Copy pull secret into egress gateway namespace](#copy-pull-secret-into-egress-gateway-namespace)
- [Deploy a group of egress gateways](#deploy-a-group-of-egress-gateways)
- [Configure a Namespace or Pod to use egress gateways](#configure-a-namespace-or-pod-to-use-egress-gateways)
- [Optionally enable ECMP load balancing](#optionally-enable-ecmp-load-balancing)
- [Verify the feature operation](#verify-the-feature-operation)
- [Controlling the use of egress gateways](#controlling-the-use-of-egress-gateways)
- [Policy enforcement for flows via an egress gateway](#policy-enforcement-for-flows-via-an-egress-gateway)

#### Configure IP autodetection

Since this feature adds additional network interfaces to nodes, it is important to configure {{site.prodname}} to
autodetect the correct primary interface to use for normal pod-to-pod traffic.  Otherwise, {{site.prodname}} may
autodetect a newly-added secondary ENI as the main interface, causing an outage.

For EKS clusters, the default IP autodetection method is `can-reach=8.8.8.8`, which will choose the interface 
with a route to `8.8.8.8`; this is typically the interface with a default route, which will be the correct (primary) ENI.
({{site.prodname}} ensures that the secondary ENIs do not have default routes in the main routing table.)

For other AWS clusters, {{site.prodname}} may default to `firstFound`, which is **not** suitable.

To examine the autodetection method, check the operator's installation resource:
```yaml
$ kubectl get installations.operator.tigera.io -o yaml default
apiVersion: operator.tigera.io/v1
kind: Installation
metadata:
  ...
  name: default
  ...
spec:
  calicoNetwork:
    ...
    nodeAddressAutodetectionV4:
      firstFound: true
...
```
If `nodeAddressAutodetectionV4` is set to `firstFound: true` or is not specified, then you must change it to another method by editing the
resource. The NodeAddressAutodetection options, `canReach` and `cidrs` are suitable. See [Installation reference]({{site.baseurl}}/reference/installation/api).  If using the `cidrs` option, set the CIDRs list to include only the
CIDRs from which your primary ENI IPs are chosen (do not include the dedicated VPC subnets chosen below).

#### Ensure Kubernetes VPC has free CIDR range

For egress gateways to be useful in AWS, we want to assign them IP addresses from a VPC subnet that is in the same AZ
as their host.

To avoid clashes between AWS IP allocations and {{site.prodname}} IP allocations, it is important that the range of 
IP addresses assigned to {{site.prodname}} IP pools is not used by AWS for automatic allocations.  In this guide we 
assume that you have created a dedicated VPC subnet per Availability Zone (AZ) that is reserved for {{site.prodname}}
and configured not to be used as the default subnet for the AZ.

If you are creating your cluster and VPC from scratch, plan to subdivide the VPC CIDR into (at least) two VPC subnets 
per AZ.  One VPC subnet for the Kubernetes (and any other) hosts and one VPC subnet for egress gateways. (The next 
section explains the sizing requirements for the egress gateway subnets.)

If you are adding this feature to an existing cluster, you may find that the existing VPC subnets already cover the
entire VPC CIDR, making it impossible to create a new subnet.  If that is the case, you can make more room by 
adding a second CIDR to the VPC that is large enough for the new subnets.  For information on adding a secondary 
CIDR range to a VPC, see [this guide](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html#vpc-resize).

#### Create dedicated VPC subnets

{{site.prodname}} requires a dedicated VPC subnet in each AWS availability zone that you wish to deploy egress 
gateways.  The subnet must be dedicated to {{site.prodname}} so that AWS will not
use IP addresses from the subnet for other purposes (as this could clash with an egress gateway's IP).  When creating the
subnet you should configure it not to be used for instances.

Some IP addresses from the dedicated subnet are reserved for AWS and {{side.prodname}} internal use:

* The first four IP addresses in the subnet cannot be used.  These are [reserved by AWS for internal use](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html#vpc-sizing-ipv4).
* Similarly, the last IP in the subnet (the broadcast address) cannot be used.
* _In **Secondary-IP-per-workload** mode_, {{site.prodname}} requires one IP address from the subnet per secondary ENI  
  that it provisions (for use as the primary IP address of the ENI).  In **ENI-per-workload** mode, this is not required.

{% tabs tab-group:grp1 %}
<label:ENI-per-workload,active:true>
<%
Example for **ENI-per-workload** mode:

* You anticipate having up to 30 instances running in each availability zone (AZ).
* You intend to use `t3.large` instances, [these are limited to](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#AvailableIpPerENI) 3 ENIs per host.
* So, each host can accept 2 secondary ENIs, each of which can handle one egress gateway.
* With 2 ENIs per node and 30 nodes, the part of the cluster in this AZ could handle up to `30 * 2 = 60` egress
  gateways.
* AWS reserves 5 IPs from the AWS subnet for internal use, no "host secondary IPs" need to be reserved in this mode.
* Since VPC subnets are allocated by CIDR, a `/25` subnet containing 128 IP addresses would comfortably fit the 5
  reserved IPs as well as the 60 possible gateways (with headroom for more nodes to be added later).

%>
<label:Secondary-IP-per-workload>
<%

Example for **Secondary-IP-per-workload** mode:

* You anticipate having up to 30 instances running in each availability zone (AZ).
* You intend to use `t3.large` instances, [these are limited to](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#AvailableIpPerENI)
  3 ENIs per host (one of which is the primary) and each ENI can handle 12 IP addresses, (one of which is the primary).
* So, each host can accept 2 secondary ENIs and each secondary ENI could handle 11 egress gateway pods.
* Each in-use secondary ENI requires one IP from the VPC subnet (up to 60 in this case) and AWS requires 5 IPs to be
  reserved so that's up to 65 IPs reserved in total.
* With 2 ENIs and 11 IPs per ENI, the part of the cluster in this AZ could handle up to `30 * 2 * 11 = 660` egress
  gateways.
* Since VPC subnets are allocated by CIDR, a `/22` subnet containing 1024 IP addresses would comfortably fit the 65
  reserved IPs as well as the 660 possible gateways.

{{site.prodname}} allocates ENIs on-demand so each instance will only claim one of those reserved IP addresses when the
first egress gateway is assigned to that node.  It will only claim its second IP when that ENI becomes full and then an
extra egress gateway is provisioned.
%>
{% endtabs %}


#### Configure AWS IAM roles

In order to provision the required AWS resources, each {{ site.noderunning }} pod in your cluster requires the 
following IAM permissions to be granted.  The permissions can be granted to the node IAM Role itself, or by using 
the AWS {% include open-new-window.html text='IAM roles for service accounts' url='https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html' %} feature to grant the permissions to the 
`calico-node` service account.

* DescribeInstances
* DescribeInstanceTypes
* DescribeNetworkInterfaces
* DescribeSubnets
* DescribeTags
* CreateTags
* AssignPrivateIpAddresses
* UnassignPrivateIpAddresses
* AttachNetworkInterface
* CreateNetworkInterface
* DeleteNetworkInterface
* DetachNetworkInterface
* ModifyNetworkInterfaceAttribute

The above permissions are similar to those used by the AWS VPC CNI (since both CNIs need to provision the same kinds
of resources).  In addition, to support elastic IPs, each {{ site.noderunning }} also requires the following permissions:

* DescribeAddresses
* AssociateAddress
* DisassociateAddress

#### Configure IP reservations for each VPC subnet

Since the first four IP addresses and the last IP address in a VPC subnet cannot be used, it is important to 
prevent {{site.prodname}} from _trying_ to use them.  For each VPC subnet that you plan to use, 
ensure that you have an entry in an [IP reservation]({{site.baseurl}}/reference/resources/ipreservation) for its first
four IP addresses and its final IP address.

For example, if your chosen VPC subnets are `100.64.0.0/22` and `100.64.4.0/22`, you could create the following
`IPReservation` resource, which covers both VPC subnets (if you're not familiar with CIDR notation, replacing the 
`/22` of the original subnet with `/30` is a shorthand for "the first four IP addresses"):

```yaml
apiVersion: projectcalico.org/v3
kind: IPReservation
metadata:
  name: aws-ip-reservations
spec:
  reservedCIDRs:
  - 100.64.0.0/30
  - 100.64.3.255
  - 100.64.4.0/30
  - 100.64.7.255
```

#### Enable egress gateway support

In the default **FelixConfiguration**, set the `egressIPSupport` field to `EnabledPerNamespace` or
`EnabledPerNamespaceOrPerPod`, according to the level of support that you need in your cluster.  For
support on a per-namespace basis only:

```bash
kubectl patch felixconfiguration.p default --type='merge' -p \
    '{"spec":{"egressIPSupport":"EnabledPerNamespace"}}'
```

Or for support both per-namespace and per-pod:

```bash
kubectl patch felixconfiguration default --type='merge' -p \
    '{"spec":{"egressIPSupport":"EnabledPerNamespaceOrPerPod"}}'
```

#### Enable policy sync API

The egress gateway container image requires the policy sync API to be enabled. To do this cluster-wide, modify
the `default` FelixConfiguration to set the field `policySyncPathPrefix` to `/var/run/nodeagent`:

```bash
kubectl patch felixconfiguration.p default --type='merge' -p \
    '{"spec":{"policySyncPathPrefix":"/var/run/nodeagent"}}'
```

> **Note**:
>
> -  `egressIPSupport` and `policySyncPathPrefix` must be the same on all cluster nodes, so you should only set them in the
>    `default` FelixConfiguration resource.
{: .alert .alert-info}

#### Enable AWS-backed IP pools

{% tabs tab-group:grp1 %}
<label:ENI-per-workload,active:true>
<%

To enable **ENI-per-workload** mode, in the default **FelixConfiguration**, set the `awsSecondaryIPSupport` field to 
`EnabledENIPerWorkload`:

```bash
kubectl patch felixconfiguration default --type='merge' -p \
    '{"spec":{"awsSecondaryIPSupport":"EnabledENIPerWorkload"}}'
```

%>
<label:Secondary-IP-per-workload>
<%

To enable **Secondary-IP-per-workload** mode, set the field to `Enabled` (the name `Enabled` predates 
the addition of the **ENI-per-workload** mode):

```bash
kubectl patch felixconfiguration default --type='merge' -p \
    '{"spec":{"awsSecondaryIPSupport":"Enabled"}}'
```

%>
{% endtabs %}

You can verify that the setting took effect by examining the Kubernetes Node resources:

```bash
kubectl describe node <nodename>
```

Should show the new `projectcalico.org/aws-secondary-ipv4` capacity (in the Allocated Resources section).

##### Changing modes

You can change between the two modes by:

* Ensuring that the number of egress gateways on every node is within the limits of the particular mode.  i.e.
  when switching to **ENI-per-workload** mode, the number of egress gateways must be less than or equal to the number
  of secondary ENIs that your instances can handle.
* Editing the setting (using the patch commands above, for example).

Changing the mode will cause disruption as ENIs must be removed and re-added.

#### Configure IP pools backed by VPC subnets

{% tabs tab-group:grp1 %}
<label:ENI-per-workload,active:true>
<%
In **ENI-per-workload** mode, IP pools are (only) used to subdivide the VPC subnets into small pools used for 
particular groups of egress gateways.  These IP Pools must have:

  * `awsSubnetID` set to the ID of the relevant VPC subnet.  This activates the AWS-backed IP feature for these pools.
  * `allowedUse` set to `["Workload"]` to tell {{site.prodname}} IPAM to use those pools for the egress gateway workloads.
  * `vxlanMode` and `ipipMode` set to `Never` in order to disable encapsulation for the egress gateway pods.  (`Never` is the default if these fields are not specified.)
  * `blockSize` set to 32.  This aligns {{site.prodname}} IPAM with the behaviour of the AWS fabric.
  * `disableBGPExport` set to `true`.  This prevents routing conflicts if your cluster is using IPIP or BGP networking.

It's also recommended to:

  * Set `nodeSelector` to `"!all()"`.  This prevents {{site.prodname}} IPAM from using the pool automatically. It will
    only be used for workloads that explicitly name it in the `cni.projectcalico.org/ipv4pools` annotation.
  
Continuing the example above, with VPC subnets

* `100.64.0.0/22` in, say, availability zone west-1 and id `subnet-000000000000000001`
* `100.64.4.0/22` in, say, availability zone west-2 and id `subnet-000000000000000002`

And, assuming that there are two clusters of egress gateways "red" and "blue" (which in turn serve namespaces "red"
and "blue"), one way to structure the IP pools is to have one IP pool for each group of egress gateways in each 
subnet.  Then, if a particular egress gateway from the egress gateway cluster is scheduled to one AZ or the other, 
it will take an IP from the appropriate pool.

For the "west-1" availability zone:

* IP pool "egress-red-west-1", CIDR `100.64.0.4/31` (the first non-reserved /31 CIDR in the VPC subnet). These 
  addresses will be used for "red" egress gateways in the "west-1" AZ.

* IP pool "egress-blue-west-1", CIDR `100.64.0.6/31` (the next 2 IPs from the "west-1" subnet). These addresses 
  will be used for "blue" egress gateways in the "west-1" AZ.

For the "west-2" availability zone:

* IP pool "egress-red-west-2", CIDR `100.64.4.4/31` (the first non-reserved /31 CIDR in the VPC subnet). These 
  addresses will be used for "red" egress gateways in the "west-1" AZ.

* IP pool "egress-blue-west-2", CIDR `100.64.4.6/31` (the next 2 IPs from the "west-2" subnet). These addresses 
  will be used for "blue" egress gateways in the "west-1" AZ.

Converting this to `IPPool` resources:

```yaml
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: egress-red-west-1
spec:
  cidr: 100.64.0.4/31
  allowedUses: ["Workload"]
  awsSubnetID: subnet-000000000000000001
  blockSize: 32
  nodeSelector: "!all()"
  disableBGPExport: true
---
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: egress-blue-west-1
spec:
  cidr: 100.64.0.6/31
  allowedUses: ["Workload"]
  awsSubnetID: subnet-000000000000000001
  blockSize: 32
  nodeSelector: "!all()"
  disableBGPExport: true
---
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: egress-red-west-2
spec:
  cidr: 100.64.4.4/31
  allowedUses: ["Workload"]
  awsSubnetID: subnet-000000000000000002
  blockSize: 32
  nodeSelector: "!all()"
  disableBGPExport: true
---
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: egress-blue-west-2
spec:
  cidr: 100.64.4.6/31
  allowedUses: ["Workload"]
  awsSubnetID: subnet-000000000000000002
  blockSize: 32
  nodeSelector: "!all()"
  disableBGPExport: true
```
%>
<label:Secondary-IP-per-workload>
<%
In **Secondary-IP-per-workload** mode, IP pools are used to subdivide the VPC subnets as follows:

* One medium-sized IP pool per-Subnet reserved for {{site.prodname}} to use for the _primary_ IP addresses of its _secondary_ ENIs.
  These pools must have:

  * `awsSubnetID` set to the ID of the relevant VPC subnet.  This activates the AWS-backed IP feature for these pools.
  * `allowedUse` set to `["HostSecondary"]` to reserve them for this purpose.
  * `blockSize` set to 32.  This aligns {{site.prodname}} IPAM with the behaviour of the AWS fabric.
  * `vxlanMode` and `ipipMode` set to `Never`.  (`Never` is the default if these fields are not specified.)
  * `disableBGPExport` set to `true`.  This prevents routing conflicts if your cluster is using IPIP or BGP networking.

* Small pools used for particular groups of egress gateways.  These must have:

  * `awsSubnetID` set to the ID of the relevant VPC subnet.  This activates the AWS-backed IP feature for these pools.
  * `allowedUse` set to `["Workload"]` to tell {{site.prodname}} IPAM to use those pools for the egress gateway workloads.
  * `vxlanMode` and `ipipMode` set to `Never` in order to disable encapsulation for the egress gateway pods.  (`Never` is the default if these fields are not specified.)
  * `blockSize` set to 32.  This aligns {{site.prodname}} IPAM with the behaviour of the AWS fabric.
  * `disableBGPExport` set to `true`.  This prevents routing conflicts if your cluster is using IPIP or BGP networking.

  It's also recommended to:

  * Set `nodeSelector` to `"!all()"`.  This prevents {{site.prodname}} IPAM from using the pool automatically. It will
    only be used for workloads that explicitly name it in the `cni.projectcalico.org/ipv4pools` annotation.

Continuing the example above, with VPC subnets

* `100.64.0.0/22` in, say, availability zone west-1 and id `subnet-000000000000000001`
* `100.64.4.0/22` in, say, availability zone west-2 and id `subnet-000000000000000002`

And, assuming that there are two clusters of egress gateways "red" and "blue" (which in turn serve namespaces "red"
and "blue"), one way to structure the IP pools is to have a "hosts" IP pool in each VPC subnet and one IP pool for each
group of egress gateways in each subnet.  Then, if a particular egress gateway from the egress gateway cluster is
scheduled to one AZ or the other, it will take an IP from the appropriate pool.

For the "west-1" availability zone:

* IP pool "hosts-west-1", CIDR `100.64.0.0/25` (the first 128 addresses in the "west-1" VPC subnet).

  * We'll reserve these addresses for hosts to use.
  * `100.64.0.0/25` covers the addresses from `100.64.0.0` to `100.64.1.255` (but addresses `100.64.0.0` to `100.64.0.3`
    were reserved above).

* IP pool "egress-red-west-1", CIDR `100.64.0.128/31` (the next 2 IPs from the "west-1" subnet).

  * These addresses will be used for "red" egress gateways in the "west-1" AZ.

* IP pool "egress-blue-west-1", CIDR `100.64.0.130/31` (the next 2 IPs from the "west-1" subnet).

  * These addresses will be used for "blue" egress gateways in the "west-1" AZ.

For the "west-2" availability zone:

* IP pool "hosts-west-2", CIDR `100.64.4.0/25` (the first 128 addresses in the "west-2" VPC subnet).

  * `100.64.4.0/25` covers the addresses from `100.64.4.0` to `100.64.5.255` (but addresses `100.64.4.0` to `100.64.4.3`
    were reserved above).

* IP pool "egress-red-west-2", CIDR `100.64.4.128/31` (the next 2 IPs from the "west-2" subnet).

  * These addresses will be used for "red" egress gateways in the "west-1" AZ.

* IP pool "egress-blue-west-2", CIDR `100.64.4.130/31` (the next 2 IPs from the "west-2" subnet).

  * These addresses will be used for "blue" egress gateways in the "west-1" AZ.

Converting this to `IPPool` resources:

```yaml
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: hosts-west-1
spec:
  cidr: 100.64.0.0/25
  allowedUses: ["HostSecondaryInterface"]
  awsSubnetID: subnet-000000000000000001
  blockSize: 32
  disableBGPExport: true
---
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: egress-red-west-1
spec:
  cidr: 100.64.0.128/31
  allowedUses: ["Workload"]
  awsSubnetID: subnet-000000000000000001
  blockSize: 32
  nodeSelector: "!all()"
  disableBGPExport: true
---
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: egress-blue-west-1
spec:
  cidr: 100.64.0.130/31
  allowedUses: ["Workload"]
  awsSubnetID: subnet-000000000000000001
  blockSize: 32
  nodeSelector: "!all()"
  disableBGPExport: true
---
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: hosts-west-2
spec:
  cidr: 100.64.4.0/25
  allowedUses: ["HostSecondaryInterface"]
  awsSubnetID: subnet-000000000000000002
  blockSize: 32
  disableBGPExport: true
---
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: egress-red-west-2
spec:
  cidr: 100.64.4.128/31
  allowedUses: ["Workload"]
  awsSubnetID: subnet-000000000000000002
  blockSize: 32
  nodeSelector: "!all()"
  disableBGPExport: true
---
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: egress-blue-west-2
spec:
  cidr: 100.64.4.130/31
  allowedUses: ["Workload"]
  awsSubnetID: subnet-000000000000000002
  blockSize: 32
  nodeSelector: "!all()"
  disableBGPExport: true
```
%>
{% endtabs %}

#### Copy pull secret into egress gateway namespace

Identify the pull secret that is needed for pulling {{site.prodname}} images, and copy this into the
namespace where you plan to create your egress gateways.  It is typically named
`tigera-pull-secret`, in the `calico-system` namespace, so the command to copy that to the `default`
namespace would be:

```bash
kubectl get secret tigera-pull-secret --namespace=calico-system -o yaml | \
   grep -v '^[[:space:]]*namespace:[[:space:]]*calico-system' | \
   kubectl apply --namespace=default -f -
```

#### Deploy a group of egress gateways

Use a Kubernetes Deployment to deploy a group of egress gateways.  

Using the example of the "red" egress gateway cluster, we use several features of Kubernetes and {{site.prodname}} 
in tandem to get a cluster of egress gateways that spans both availability zones and uses AWS-backed IP addresses:

```bash
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: egress-gateway
  namespace: default
  labels:
    egress-code: red
spec:
  replicas: 2
  selector:
    matchLabels:
      egress-code: red
  template:
    metadata:
      annotations:
        cni.projectcalico.org/ipv4pools: '["egress-red-west-1","egress-red-west-2"]'
      labels:
        egress-code: red
    spec:
      topologySpreadConstraints:
      - maxSkew: 1
        topologyKey: topology.kubernetes.io/zone
        whenUnsatisfiable: DoNotSchedule
        labelSelector: 
          matchLabels:
            egress-code: red
      imagePullSecrets:
      - name: tigera-pull-secret
      nodeSelector:
        kubernetes.io/os: linux
      containers:
      - name: egress-gateway
        image: {{page.registry}}{% include component_image component="egress-gateway" %}
        env:
        - name: EGRESS_POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        securityContext:
          privileged: true
        volumeMounts:
        - mountPath: /var/run
          name: policysync
        resources:
          requests:
            projectcalico.org/aws-secondary-ipv4: 1
          limits:
            projectcalico.org/aws-secondary-ipv4: 1
      terminationGracePeriodSeconds: 0
      volumes:
      - flexVolume:
          driver: nodeagent/uds
        name: policysync
EOF
```

* `replicas: 2` tells Kubernetes to schedule two egress gateways in the "red" cluster.

* This annotation tells {{site.prodname}} IPAM to use one of the "red" IP pools:

  ```yaml
  annotations:
    cni.projectcalico.org/ipv4pools: "[\"egress-red-west-1\",\"egress-red-west-2\"]"
  ```
  
  Depending on which AZ the pod is scheduled in, {{site.prodname}} IPAM will automatically ignore IP pools that 
  are backed by AWS subnets that are not in the local AZ.

  External services and appliances can recognise "red" traffic because it will all come from the CIDRs of the "red"
  IP pools.

* The following resource request tells Kubernetes to only schedule the gateway to a node with available AWS IP capacity;
  it also tells {{site.prodname}} to use an AWS-backed IP pool for allocating the IP address:

  ```yaml
  resources:
    requests:
      projectcalico.org/aws-secondary-ipv4: 1
    limits:
      projectcalico.org/aws-secondary-ipv4: 1
  ```

* The following [topology spread constraint](https://kubernetes.io/docs/concepts/workloads/pods/pod-topology-spread-constraints/) 
  ensures that Kubernetes spreads the Egress gateways evenly between AZs (assuming that your nodes are labeled with 
  the expected [well-known label](https://kubernetes.io/docs/reference/labels-annotations-taints/#topologykubernetesiozone)
  `topology.kubernetes.io/zone`):

  ```yaml
  topologySpreadConstraints:
  - maxSkew: 1
    topologyKey: topology.kubernetes.io/zone
    whenUnsatisfiable: DoNotSchedule
    labelSelector: 
      matchLabels:
        egress-code: red
  ```

> **Note**:
>
> -  It is advisable to have more than one egress gateway per group, so that the egress IP function
>    continues if one of the gateways crashes or needs to be restarted.  When there are multiple
>    gateways in a group, outbound traffic from the applications using that group is load-balanced
>    across the available gateways.  The number of `replicas` specified must be less than or equal
>    to the number of free IP addresses in the IP Pool.
>
> -  In the `cni.projectcalico.org/ipv4pools` annotation, the IP Pool can be specified either
>    by its name (e.g. `egress-ippool-1`) or by its CIDR (e.g. `10.10.10.0/31`).
>
> -  The labels are arbitrary.  You can choose whatever names and values are convenient for
>    your cluster's Namespaces and Pods to refer to in their egress selectors.
>
> -  The image name and `EGRESS_POD_IP` configuration are required.  `tigera/egress-gateway` is the
>    image that provides the egress gateway function, and `EGRESS_POD_IP` tells the runtime
>    container what its pod IP is.
>
> -  The `securityContext` is required, so that the egress gateway can manipulate its own network
>    namespace.
>
> -  The `policysync` volume mount is required. This exposes the policy sync API to the pod,
>    allowing it to program its own routing based off information from Felix.
{: .alert .alert-info}


#### Configure a Namespace or Pod to use egress gateways

In a {{site.prodname}} deployment, the Kubernetes Namespace and Pod resources honor annotations that
tell that namespace or pod to use particular egress gateways.  These annotations are selectors, and
their meaning is "the set of pods, anywhere in the cluster, that match those selectors".

So, to configure all the pods in a namespace to use the egress gateways that are
labelled with `egress-code: red`, you would annotate that namespace like this:

```bash
kubectl annotate ns <namespace> egress.projectcalico.org/selector='egress-code == "red"'
```

By default, that selector can only match egress gateways in the same namespace.  To select gateways
in a different namespace, specify a `namespaceSelector` annotation as well, like this:

```bash
kubectl annotate ns <namespace> egress.projectcalico.org/namespaceSelector='projectcalico.org/name == "default"'
```

Egress gateway annotations have the same [syntax and range of
expressions]({{site.baseurl}}/reference/resources/networkpolicy#selector) as the selector fields in
{{site.prodname}} [network policy]({{site.baseurl}}/reference/resources/networkpolicy#entityrule).

To configure a specific Kubernetes Pod to use egress gateways, specify the same annotations when
creating the pod.  For example:

```bash
kubectl apply -f - <<'EOF'
apiVersion: v1
kind: Pod
metadata:
  annotations:
    egress.projectcalico.org/selector: egress-code == 'red'
    egress.projectcalico.org/namespaceSelector: projectcalico.org/name == 'default'
  name: my-client,
  namespace: my-namespace,
spec:
  ...
EOF
```

#### Add AWS Elastic IPs to the egress gateway deployment

To add AWS Elastic IPs to the egress gateway pods, follow these steps:

* Ensure that your VPC has an {% include open-new-window.html text='Internet Gateway' url='https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html' %} 
  and a (default) route to the Internet Gateway from the AWS subnets used for egress gateways.  (This is a 
  standard requirement for Elastic IPs in AWS.)

* Create one or more Elastic IPs for the deployment.  This can be done through the AWS Console or using the AWS
  command line interface.

* Add the `cni.projectcalico.org/awsElasticIPs` annotation to the pod template, within the egress gateway deployment.
  The format of the annotation is a string containing a JSON-formatted list of Elastic IP addresses:
  
  ```yaml
  ...
  template:
    metadata:
      annotations:
        cni.projectcalico.org/ipv4pools: '["egress-red-west-1","egress-red-west-2"]'
        cni.projectcalico.org/awsElasticIPs: '["37.1.2.3", "43.2.5.6"]'
  ...
  ```
  
Once the update has rolled out, {{site.prodname}} will try to add one of the requested Elastic IPs to each pod in 
the deployment.

#### Optionally enable ECMP load balancing

If you are provisioning multiple egress gateways for a given client pod, and you want
traffic from that client to load balance across the available gateways, set the
`fib_multipath_hash_policy`
[sysctl](https://sysctl-explorer.net/net/ipv4/fib_multipath_hash_policy/) to allow that:

```bash
sudo sysctl -w net.ipv4.fib_multipath_hash_policy=1
```

You will need this on each node with clients that you want to load balance across multiple
egress gateways.

#### Verify the feature operation

To verify the feature operation, cause the application pod to initiate a connection to a server
outside the cluster, and observe -- for example using tcpdump -- the source IP of the connection 
packet as it reaches the server.

> **Note**: In order for such a connection to complete, the server must know how to route back to
> the egress gateway's IP.
{: .alert .alert-info}

By way of a concrete example, you could use netcat to run a test server outside the cluster (outside
AWS if you're using Elastic IPs); for example:

```bash
docker run --net=host --privileged subfuzion/netcat -v -l -k -p 8089
```

Then provision an egress IP Pool, and egress gateways, as above.

Then deploy a pod, with egress annotations as above, and with any image that includes netcat, for
example `laurenceman/alpine`.

Now you can use `kubectl exec` to initiate an outbound connection from that pod:

```bash
kubectl exec <pod name> -n <pod namespace> -- nc <server IP> 8089 </dev/null
```

where `<server IP>` should be the IP address of the netcat server.

Then, if you check the logs or output of the netcat server, you should see:

```
Connection from <source IP> <source port> received
```

with `<source IP>` being one of the IPs of the egress IP pool that you provisioned.

#### Controlling the use of egress gateways

If a cluster ascribes special meaning to traffic flowing through egress gateways, it will be
important to control when cluster users can configure their pods and namespaces to use them, so that
non-special pods cannot impersonate the special meaning.

If namespaces in a cluster can only be provisioned by cluster admins, one option is to enable egress
gateway function only on a per-namespace basis.  Then only cluster admins will be able to configure
any egress gateway usage.

Otherwise -- if namespace provisioning is open to users in general, or if it's desirable for egress
gateway function to be enabled both per-namespace and per-pod -- a [Kubernetes admission
controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/){:target="_blank"} will be
needed.  This is a task for each deployment to implement for itself, but possible approaches include
the following.

1.  Decide whether a given Namespace or Pod is permitted to use egress annotations at all, based on
    other details of the Namespace or Pod definition.

1.  Evaluate egress annotation selectors to determine the egress gateways that they map to, and
    decide whether that usage is acceptable.

1.  Impose the cluster's own bespoke scheme for a Namespace or Pod to identify the egress gateways
    that it wants to use, less general than {{site.prodname}}'s egress annotations.  Then the
    admission controller would police those bespoke annotations (that that cluster's users could
    place on Namespace or Pod resources) and either reject the operation in hand, or allow it
    through after adding the corresponding {{site.prodname}} egress annotations.

#### Policy enforcement for flows via an egress gateway

For an outbound connection from a client pod, via an egress gateway, to a destination outside the
cluster, any applicable {{site.prodname}} policy will in principle be enforced:

1.  on egress from the client pod
2.  on ingress to the egress gateway pod
3.  on egress from the egress gateway pod.

Since an egress gateway will never *originate* any traffic itself, a possible approach is not to
configure any policy for the egress gateway.  Then the enforcement at points (2) and (3) is a no-op,
and enforcement at point (1) is the same as for flows that are not via an egress gateway.

On the other hand,

-  if you apply a default-deny ingress policy to your egress gateways, you will need to configure
   allow policies for the clients that you want to be able to use those gateways;

-  if you apply a default-deny egress policy to your egress gateways, you will need to configure
   allow policies for the destinations that those gateways should be able to forward to.

Unfortunately it will not work to [specify external destinations by
name]({{site.baseurl}}/security/domain-based-policy) here, because the gateway's node will not see
the DNS protocol that maps a destination name to the underlying IP addresses (unless the gateway
happens to be on the same node as the client).

### Above and beyond

Please see also:

- The `egressIP...` and `aws...` fields of the [FelixConfiguration resource]({{site.baseurl}}/reference/resources/felixconfig#spec).
- [Troubleshooting egress gateways]({{site.baseurl}}/networking/egress/troubleshoot).
- [Additional configuration for egress gateway maintenance]({{site.baseurl}}/networking/egress/egress-gateway-maintenance)