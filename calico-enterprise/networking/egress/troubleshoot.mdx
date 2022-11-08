---
title: Troubleshoot egress gateways
description: Use checklist to troubleshoot common problems.
canonical_url: '/networking/egress/troubleshoot'
---

- [Checklist of common problems](#checklist-of-common-problems)
- [Connection to an egress gateway cannot be established](#connection-to-an-egress-gateway-cannot-be-established)
- [Connection to an egress gateway is established, but destination is not getting correct IP](#connection-to-an-egress-gateway-is-established-but-destination-is-not-getting-correct-ip)

### Checklist of common problems

Use the following checklist to troubleshoot, or to collect details before opening a Support ticket. 

#### Is the egress gateway feature enabled?

Egress gateway is disabled by default.  Have you enabled it in [Felix configuration]({{site.baseurl}}/reference/resources/felixconfig) by setting `egressIPSupport` to `EnabledPerNamespace` or `EnabledPerNamespaceOrPerPod`?

#### Does your egress gateway routing go through a router? (On-prem only.)

As shown in the following diagram, from the gateway to the destination, the source IP is the egress IP.  On the return path, from the destination back to the gateway, the destination IP is the egress IP. If there are any routers between the gateway and the destination, they must all know how to route the egress IP back to the gateway. If they don’t, the attempted connection cannot be established.

![egress-basic-routing]({{site.baseurl}}/images/egress-basic-routing.svg)

Options to make routers aware of egress IP:

- Program routes statically on routers
- Peer routers with the cluster, directly or indirectly using BGP or some other protocol, or other method so routers learn about the egress IP

#### Does your egress gateway have required metadata?

Review important egress gateway metadata (for example, namespace and labels); they are required for a client to identify the gateway(s) that it should use.

#### Is natOutgoing on your IPPool set up correctly?

For most egress gateway scenarios you should have: `natOutgoing: false` on the egress IPPool. If you have `natOutgoing: true`, the egress gateway will SNAT to its own IP, which is the intended egress gateway IP. But then the egress gateway’s node will also SNAT to its own IP (i.e. the node IP), which immediately overrides the egress gateway IP.

#### Do clients and nodes have required selectors?

Review the following annotations that are required for the client to identify its egress gateways:

- egress.projectcalico.org/selector
- egress.projectcalico.org/namespaceSelector

on

- Client pod
- Client pod’s namespace

#### Does Calico have enough route tables?
On Linux, Calico claims a number of routing tables for various purposes. The exact number of tables allocated is determined by the [FelixConfiguration](/reference/resources/felixconfig) option `routeTableRanges`. Failing to allocate enough route tables will result in Calico failing to program the networking needed for Egress Gateways to function.

Under these conditions, `calico-node` pods will log error messages and report [unhealthy](#check-calico-node-health).

[See more about routeTableRanges](/reference/resources/felixconfig#routetableranges)

#### Check egress gateway health

As of v3.15.0, the egress gateway `Deployment` includes a Kubernetes `readinessProbe`.  The egress gateway will
only report ready if it is able to connect to the local `calico-node` pod and if any configured HTTP/ICMP probes
are succeeding.

If the egress gateway reports not-Ready then more information can be found in its logs.  The egress gateway logs to 
`stdout` so its logs are available via `kubectl logs -n <namespace> <egress gateway pod name>`.

#### Check health of calico-node to egress gateway probes

As of v3.15.0, each `calico-node` pod probes the health of the remote egress gateways that its local pods are using.
If probes fail, the failures are logged in `calico-node`'s log (search for `egress_gw_tracker`) and reported via Prometheus metrics:

```
felix_egress_gateway_remote_polls{status="probe-failed"} 0
felix_egress_gateway_remote_polls{status="total"} 2
felix_egress_gateway_remote_polls{status="up"} 2
```

Where, the `total` metric reports the total number of remote egress gateways that are being polled and the `up` and `probe-failed`
metrics report the number of egress gateways in each of those states.

#### Check calico-node health

Check that your calico-node pods are consistently running and ready, especially on the nodes hosting the client and 
gateway pods. Confirming healthy pods will rule out possible issues.  If you find that `calico-node` is not ready,
describing the pod should show which health check is failing:
```bash
kubectl describe pod ...
```
In AWS, issues such as permissions problems will report a problem with the `"aws-eni-addresses-in-sync"` health check.
For more information on the problem, review the `calico-node` log.  For example, a permissions issue will result in a 
log such as the following:
```
2021-11-16 13:11:59.292 [ERROR][26606] felix/aws_iface_provisioner.go 343: Failed to resync with AWS. Will retry after backoff. error=failed to create ENI: operation error EC2: CreateNetworkInterface, https response error StatusCode: 403, RequestID: 13dead98-7da0-4695-9be8-80cab4d5528e, api error UnauthorizedOperation: You are not authorized to perform this operation. Encoded authorization failure message: j4x3cFwZdJ...<snip>...ShGkw
```
If you see such a log, check the AWS IAM permissions assigned to the nodes in your cluster to ensure that the nodes
have the [required permissions](./egress-gateway-aws#configure-aws-iam-roles).  It is also possible 
to decode the "encoded authorization failure message" in the log by following {% include open-new-window.html text='this guide' url='https://aws.amazon.com/premiumsupport/knowledge-center/aws-backup-encoded-authorization-failure/' %}; this gives more detail on the error.

#### Check IP rule and routing setup on the client node

**Run `ip rule`**

On the client node, run:

```
ip rule
```

**Sample output** 

You will see a line for each pod on the node that is configured to use an egress gateway. 

```
from 192.168.24.35 fwmark 0x80000/0x80000 lookup 250
```

Where:

- `192.168.24.35` is the relevant client's pod IP
- `250` is the routing table number
- `fwmark 0x80000/0x80000` is the bit/mask

If you don’t see this, it means one of the following:

- egressIPSupport is not enabled
- egressIPSupport is enabled, but you have not configured egress annotations on the client pod or on its namespace
- egressIPSupport is EnabledPerNamespace and you have configured egress annotations on the client pod, but not on its namespace


**Run `ip route show table`**

On the client node, run the following command using the routing table number from the `ip rule` command. For example: `250`.

```
ip route show table <routing-table-number>
``` 

**Sample output: clients using a single egress gateway**

```
default via 11.11.11.1 dev egress.calico onlink
```

**Sample: clients using multiple gateways**

```
default onlink

      nexthop via  11.11.11.1 dev egress.calico weight 1 onlink
      nexthop via  11.11.11.2 dev egress.calico weight 1 onlink
```

If you see nothing at all, or the following:

```
unreachable default scope link
```

- Verify that you have provisioned the gateways
- Review the selectors, and gateway namespace and labels to determine why they aren’t matching each other

#### Do you have egress IPs in BGPConfiguration svcExternalIPs?

You should not have any egress IPs or pod IP ranges in BGPConfiguration `serviceExternalIPs` or `serviceClusterIPs` fields; it causes problems if you do.

By default, {{site.prodname}} BGP exports all pod IPs, which includes egress gateway IPs because they are pod IPs. But you can also use [BGPConfiguration resource parameters]({{site.baseurl}}/reference/resources/bgpconfig) like `BGPConfiguration`, `serviceClusterIPs`, `serviceExternalIPs` and `serviceLoadBalancerIPs` to export additional IP ranges, in particular Kubernetes Service IPs. Because {{site.prodname}} exports additional IP ranges in a different way from pod IPs, things can go wrong if you include pod IPs in the additional ranges.

### Connection to an egress gateway cannot be established

If the outbound connection cannot be established, the policy may be denying the flow. As shown in the following diagram, policy is enforced at more points in an egress gateway flow.

![egress-basic-routing]({{site.baseurl}}/images/egress-basic-routing.svg)

**Policy enforcement**:

- From the client pod, egress 
- To the gateway pod, ingress 
- From the gateway pod, egress 
- Any relevant HostEndpoints that are configured in your cluster

In [Manager UI]({{site.baseurl}}/visibility/get-started-cem), check for dropped packets because of policy on the outbound connection path. If you are using the iptables dataplane, you can also run the following command on the client and gateway nodes to look at a lower level.

```
watch iptables-save -c | grep DROP | grep -v 0:0
```

### Connection to an egress gateway is established, but destination is not getting correct IP

If you see that the outbound connection established, but the source IP is incorrect at the destination, this can indicate that other SNAT or MASQUERADE is taking effect after the packet leaves the egress gateway pod and is overriding the egress gateway IP. If you intentionally have a MASQUERADE/SNAT for another general purpose, you must filter it so it does not apply to traffic whose source IP comes from the egress gateway pool.

To check the egress gateway’s node, use iptables:

```
iptables-save -c | grep -i MASQUERADE
iptables-save -c | grep -i SNAT
```

### Finding leaked AWS ENIs

In normal usage of the AWS-backed IP pools feature, the {{site.noderunning}} Pod on each node will manage the
secondary ENIs used for networking AWS-backed IP pools.  It also marks its secondary ENIs for deletion on 
instance termination to avoid leaking any ENIs when an instance is terminated.

However, in certain highly unusual situations, such as the following sequence of events:

* {{site.noderunning}} adds an ENI.
* The AWS API call to mark the ENI for "delete on termination" fails.
* The entire instance is deleted before the automatic retry of the above operation succeeds.

Then, it would be possible for an ENI to be leaked.  {{site.prodname}} marks all the ENIs that it creates with tags
to identify them as {{site.prodname}} secondary ENIs and the ID of the instance they _should_ belong to.
To find potentially leaked ENIs, you can use the AWS command line tool as follows:

```bash
aws ec2 describe-network-interfaces --filters Name=status,Values=available Name=tag-key,Values=calico:use
```

Then, examine the "Tag set" of the returned network interface values to see if any of them belong to nodes that have
been deleted:

```
"TagSet": [
    {
        "Key": "calico:use",
        "Value": "secondary"
    },
    {
        "Key": "calico:instance",
        "Value": "i-00122bf604c6ab776"
    }
],
```

If the instance ID recorded in the "calico:instance" tag is for an instance that no longer exists then the ENI
has been leaked; it is safe to delete the ENI.  If the instance ID belongs to an active instance then there
is no need to delete the ENI, it should be cleaned up (or put into use) by the {{site.noderunning}} Pod running
on that instance.
