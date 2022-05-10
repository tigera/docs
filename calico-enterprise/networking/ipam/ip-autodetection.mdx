---
title: Configure IP autodetection
description: Calico IP autodetection ensures the correct IP address is used for routing. Learn how to customize it. 
---

### Big picture

Configure IP autodetection for {{site.prodname}} nodes to ensure the correct IP address is used for routing.

### Value

When you install {{site.prodname}} on a node, an IP address and subnet is automatically detected. {{site.prodname}} provides several ways to configure IP/subnet autodetection, and supports configuring specific IPs for:

- Hosts with multiple external interfaces
- Host interfaces with multiple IP addresses
- [Changes to cross subnet packet encapsulation]({{ site.baseurl }}/networking/vxlan-ipip)
- Changes to host IP address

### Features

This how-to guide uses the following {{site.prodname}} features:

- **Node** resource

### Concepts

#### Autodetecting node IP address and subnet

For internode routing, each {{site.prodname}} node must be configured with an IPv4 address and/or an IPv6 address. When you install {{site.prodname}} on a node, a node resource is automatically created using routing information that is detected from the host. For some deployments, you may want to update autodetection to ensure nodes get the correct IP address.

**Sample default node resource after installation**

```
apiVersion: projectcalico.org/v3
kind: Node
metadata:
  name: node-hostname
spec:
  bgp:
    asNumber: 64512
    ipv4Address: 10.244.0.1/24
    ipv6Address: 2000:db8:85a3::8a2e:370:7335/120
    ipv4IPIPTunnelAddr: 192.168.0.1
```

#### Autodetection methods

By default, {{site.prodname}} uses the **firstFound** method; the first valid IP address on the first interface (excluding local interfaces such as the docker bridge). However, you can change the default method to any of the following:

- Address used by the node to reach a particular IP or domain (**canReach**)
- Address assigned to Kubernetes node (**kubernetes: InternalIP**)
- Regex to include matching interfaces (**interface**)
- Regex to exclude matching interfaces (**skipInterface**)
- A list of IP ranges in CIDR format to determine valid IP addresses on the node to choose from (**cidrs**)

For help on autodetection methods, see
[NodeAddressAutodetection]({{ site.baseurl }}/reference/installation/api#operator.tigera.io/v1.NodeAddressAutodetection) in the operator Installation reference
and for more details see the [node configuration]({{ site.baseurl }}/reference/node/configuration#ip-autodetection-methods) reference.

#### Manually configure IP address and subnet

To manually configure an IP address and subnet, disable autodetection and update the node resources with the IP address.

### How to

- [Change the autodetection method](#change-the-autodetection-method)
- [Manually configure IP address and subnet for a node](#manually-configure-ip-address-and-subnet-for-a-node)

#### Change the autodetection method

As noted previously, the default autodetection method is **first valid interface found** (firstFound). To use a different autodetection method,
configure the NodeAddressAutodetection field(s) in the Installation resource. You can update the Installation resource before applying it
during installation or edit it later with `kubectl edit installation default`.

> **Note**: To configure the default autodetection method for IPv6 for any of the below methods, use the field `nodeAddressAutodetectionV6`.
{: .alert .alert-info}

- **Kubernetes Node IP**

  {{site.prodname}} will select the first internal IP address listed in the Kubernetes node's `Status.Addresses` field.

  ```
  kind: Installation
  apiVersion: operator.tigera.io/v1
  metadata:
    name: default
  spec:
    calicoNetwork:
      nodeAddressAutodetectionV4:
        kubernetes: NodeInternalIP
  ```
 
- **Source address used to reach an IP or domain name**

  {{site.prodname}} will choose the IP address that is used to reach the given "can reach" IP address or domain. For example:

  ```
  kind: Installation
  apiVersion: operator.tigera.io/v1
  metadata:
    name: default
  spec:
    calicoNetwork:
      nodeAddressAutodetectionV4:
        canReach: 8.8.8.8
  ```

- **Including matching interfaces**

  {{site.prodname}} will choose an address on each node from an interface that matches the given [regex](https://pkg.go.dev/regexp){:target="_blank"}.
  For example:

  ```
  kind: Installation
  apiVersion: operator.tigera.io/v1
  metadata:
    name: default
  spec:
    calicoNetwork:
      nodeAddressAutodetectionV4:
        interface: eth.*
  ```

- **Excluding matching interfaces**

  {{site.prodname}} will choose an address on each node from an interface that does not match the given [regex](https://pkg.go.dev/regexp){:target="_blank"}.
  For example:

  ```
  kind: Installation
  apiVersion: operator.tigera.io/v1
  metadata:
    name: default
  spec:
    calicoNetwork:
      nodeAddressAutodetectionV4:
        skipInterface: eth.*
  ```

- **Including CIDRs**

  {{site.prodname}} will select any IP address from the node that falls within the given CIDRs. For example:

  ```
  kind: Installation
  apiVersion: operator.tigera.io/v1
  metadata:
    name: default
  spec:
    calicoNetwork:
      nodeAddressAutodetectionV4:
        cidrs:
          - "192.168.200.0/24"
  ```

- **IPv4**

  ```yaml
  apiVersion: operator.tigera.io/v1
  kind: Installation
  metadata:
    name: default
  spec:
    variant: TigeraSecureEnterprise
    ...
    calicoNetwork:
      nodeAddressAutodetectionV4:
        <autodetection-method>: <value>
  ```

- **IPv6**

  ```yaml
  apiVersion: operator.tigera.io/v1
  kind: Installation
  metadata:
    name: default
  spec:
    variant: TigeraSecureEnterprise
    ...
    calicoNetwork:
      nodeAddressAutodetectionV6:
        <autodetection-method>: <value>
  ```

> **Note**: You can use both `nodeAddressAutodetectionV4` and `nodeAddressAutodetectionV6` to specify IPv4 and IPv6 methods.
{: .alert .alert-info}

#### Manually configure IP address and subnet for a node

In the following scenarios, you may want to configure a specific IP and subnet:

- Hosts with multiple external interfaces
- Host interfaces with multiple IP addresses
- Changes to cross subnet packet encapsulation
- Changes to host IP address

You can configure specific IP address and subnet for a node by disabling IP autodetection and then updating the [Node resource]({{ site.baseurl }}/reference/resources/node).

##### Disable autodetection

To disable autodetection method, update the proper `NodeAddressAutodetection` field in the Installation resource:

```yaml
apiVersion: operator.tigera.io/v1
kind: Installation
metadata:
  name: default
spec:
  variant: TigeraSecureEnterprise
  ...
  calicoNetwork:
    nodeAddressAutodetectionV4: {}
    nodeAddressAutodetectionV4: {}
```

##### Configure IP and subnet using node resource

You can also configure the IP address and subnet on a Node resource.

>**Tip**: When configuring the IP address on a Node resource, you may want to disable IP address options or environment variables on the node. IP options on the container take precedence, and will overwrite the values you configure on the node resource.
{: .alert .alert-info}

Use `calicoctl patch` to update the current node configuration. For example:

```
calicoctl patch node kind-control-plane \
  --patch='{"spec":{"bgp": {"ipv4Address": "10.0.2.10/24", "ipv6Address": "fd80:24e2:f998:72d6::/120"}}}'
```

### Above and beyond

- For details on autodetection methods, see the [node configuration]({{ site.baseurl }}/reference/node/configuration) reference.
- For calicoctl environment variables, see [Configuring {{site.nodecontainer}}]({{ site.baseurl }}/reference/node/configuration)
- [Node resource]({{ site.baseurl }}/reference/resources/node)
- [Reference documentation for calicoctl patch]({{ site.baseurl }}/reference/calicoctl/patch)
