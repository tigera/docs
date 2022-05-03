---
title: Configure egress gateways, on-premises
description: Configure specific application traffic to exit the cluster through an egress gateway.
canonical_url: '/networking/egress/egress-gateway-on-prem'
feature_name: egress_gateway
---

### Big picture

Configure specific application traffic to exit the cluster through an egress gateway.

### Value

When traffic from particular applications leaves the cluster to access an external destination, it
can be useful to control the source IP of that traffic.  For example, there may be an additional
firewall around the cluster, whose purpose includes policing external accesses from the cluster, and
specifically that particular external destinations can only be accessed from authorised workloads
within the cluster.

{{site.prodname}}'s own policy (including [DNS policy]({{site.baseurl}}/security/domain-based-policy)) and
per-node firewalls can ensure this, but deployments may like to deepen their defense by adding an
external firewall as well.  If the external firewall is configured to allow outbound connections
only from particular source IPs, and the intended cluster workloads can be configured so that their
outbound traffic will have one of those source IPs, then the defense in depth objective is achieved.

{{site.prodname}} allows specifying an [IP pool]({{site.baseurl}}/reference/resources/ippool) for each pod or namespace, and
even a [specific IP]({{site.baseurl}}/networking/use-specific-ip) for a new pod, but this requires predicting how many pods
there will be representing a particular application, so that the IP pool can be correctly sized.
When IPs are a precious resource, over-sizing the pool is wasteful; but under-sizing is also
problematic, as then IPs will not be available within the desired range as the application is
scaled.

Egress gateways provide an alternative approach.  Application pods and namespaces are provisioned
with IPs from the default (and presumably plentiful) pool, but also configured so that their
outbound traffic is directed through an egress gateway.  (Or, for resilience, through one of a small
number of egress gateways.)  The egress gateways are set up to use a [specific IP
pool]({{site.baseurl}}/networking/legacy-firewalls) and to perform an SNAT on the traffic passing through them.  Hence any
number of application pods can have their outbound connections multiplexed through a fixed small
number of egress gateways, and all of those outbound connections acquire a source IP from the egress
gateway IP pool.

> **Note**: The source port of an outbound flow through an egress gateway can generally *not* be
> preserved.  Changing the source port is how Linux maps flows from many upstream IPs onto a single
> downstream IP.
{: .alert .alert-info}

Egress gateways are also useful if there is a reason for wanting all outbound traffic from a
particular application to leave the cluster through a particular node or nodes.  For this case, the
gateways just need to be scheduled to the desired nodes, and the application pods/namespaces
configured to use those gateways.

### Features

This how-to guide uses the following features:

Kubernetes **Namespace** and **Pod** resources with these {{site.prodname}} annotations:
- egress.projectcalico.org/namespaceSelector
- egress.projectcalico.org/selector

### Concepts

#### Egress gateway

An egress gateway acts as a transit pod for the outbound application traffic that is configured to
use it.  As traffic leaving the cluster passes through the egress gateway, its source IP is changed
to that of the egress gateway pod, and the traffic is then forwarded on.

#### Source IP

When an outbound application flow leaves the cluster, its IP packets will have a source IP.
Normally this is the pod IP of the pod that originated the flow, or the node IP of the node hosting
that pod.  It will be the **node IP** if the pod IP came from an [IP pool]({{site.baseurl}}/reference/resources/ippool) with `natOutgoing: true`, and the **pod IP** if
not.  (Assuming no other CNI plugin has been configured to NAT outgoing traffic.)

With an egress gateway involved that is all still true, except that now it's the egress gateway that
counts, instead of the original application pod.  So the flow will have the egress gateway's **node
IP**, if the egress gateway's pod IP came from an [IP
pool]({{site.baseurl}}/reference/resources/ippool) with `natOutgoing: true`, and the egress
gateway's **pod IP** otherwise.

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

### Before you begin

**Supported**

- Kubernetes on-premises only; for AWS, see [this guide]({{site.baseurl}}/networking/egress/egress-gateway-aws).

### How to

-  [Enable egress gateway support](#enable-egress-gateway-support)
-  [Enable policy sync API](#enable-policy-sync-api)
-  [Provision an egress IP pool](#provision-an-egress-ip-pool)
-  [Copy pull secret into egress gateway namespace](#copy-pull-secret-into-egress-gateway-namespace)
-  [Deploy a group of egress gateways](#deploy-a-group-of-egress-gateways)
-  [Configure a Namespace or Pod to use egress gateways](#configure-a-namespace-or-pod-to-use-egress-gateways)
-  [Optionally enable ECMP load balancing](#optionally-enable-ecmp-load-balancing)
-  [Verify the feature operation](#verify-the-feature-operation)

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
kubectl patch felixconfiguration.p default --type='merge' -p \
    '{"spec":{"egressIPSupport":"EnabledPerNamespaceOrPerPod"}}'
```

#### Enable policy sync API

Egress gateways require the policy sync API to be enabled on Felix. To do this cluster-wide, modify
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
#### Provision an egress IP pool

Provision a small IP Pool with the range of source IPs that you want to use for a particular
application when it connects outside of the cluster.  For example:

```bash
kubectl apply -f - <<EOF
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: egress-ippool-1
spec:
  cidr: 10.10.10.0/31
  blockSize: 31
  nodeSelector: "!all()"
EOF
```

> **Note**:
>
> -  `blockSize` must be specified when the prefix length of the whole `cidr` is more than
>    the default `blockSize` of 26.
>
> -  `nodeSelector: "!all()"` is recommended so that this egress IP pool is not accidentally
>    used for cluster pods in general.  Specifying this `nodeSelector` means that the IP pool
>    is only used for pods that explicitly identify it in their `cni.projectcalico.org/ipv4pools`
>    annotation.
>
> -  Set `ipipMode` or `vxlanMode` to `Always` if the pod network has [IPIP or VXLAN]({{site.baseurl}}/networking/vxlan-ipip) enabled.
{: .alert .alert-info}

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

Use a Kubernetes Deployment to deploy a group of egress gateways, using the egress IP Pool.

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
  replicas: 1
  selector:
    matchLabels:
      egress-code: red
  template:
    metadata:
      annotations:
        cni.projectcalico.org/ipv4pools: "[\"10.10.10.0/31\"]"
      labels:
        egress-code: red
    spec:
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
      terminationGracePeriodSeconds: 0
      volumes:
      - flexVolume:
          driver: nodeagent/uds
        name: policysync
EOF
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

So, to configure that all of the pods in a namespace should use the egress gateways that are
labelled with `egress-code: red`, you would annotate that namespace like this:

```bash
kubectl annotate ns <namespace> egress.projectcalico.org/selector='egress-code == "red"'
```

By default that selector can only match egress gateways in the same namespace.  To select gateways
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

By way of a concrete example, you could use netcat to run a test server outside the cluster; for
example:

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

### Upgrading from a pre-v3.11.0 release

Calico Enterprise v3.11.0 introduced some new configuration. If you are using the Egress Gateways feature, and are 
upgrading from a pre-v3.11.0 release to v3.11.0 or later, you will need to perform the following two steps:

- Enable policy sync API as described [here](#enable-policy-sync-api).
- Update your Egress Gateway Deployments to match as described [here](#deploy-a-group-of-egress-gateways).
The new elements required as of v3.11.0 are the volumeMounts and volumes sections.

### Above and beyond

Please see also:

- The `egressIP...` fields of the [FelixConfiguration resource]({{site.baseurl}}/reference/resources/felixconfig#spec).
- [Additional configuration for egress gateway maintenance]({{site.baseurl}}/networking/egress/egress-gateway-maintenance)