---
title: Configure dual stack or IPv6 only
description: Configure dual stack or IPv6 only for workloads.
canonical_url: '/networking/ipv6'
---

### Big picture

Configure {{site.prodname}} IP address allocation to use dual stack or IPv6 only for workload communications.

### Value

Workload communication over IPv6 is increasingly desirable, as well as or instead of IPv4. {{site.prodname}} supports:

- **IPv4 only** (default)

  Each workload gets an IPv4 address, and can communicate over IPv4.

- **Dual stack**

  Each workload gets an IPv4 and an IPv6 address, and can communicate over IPv4 or IPv6.

- **IPv6 only**

  Each workload gets an IPv6 address, and can communicate over IPv6.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **CNI plugin configuration** with `assign_ipv6` and `assign_ipv4` flags
- **IPPool**

### Before you begin

**{{site.prodname}} requirements**

- {{site.prodname}} IPAM

**Kubernetes version requirements**
  - For dual stack, 1.16 and later
  - For one IP stack at a time (IPv4 or IPv6), any Kubernetes version

**Kubernetes IPv6 host requirements**
  - An IPv6 address that is reachable from the other hosts
  - The sysctl setting, `net.ipv6.conf.all.forwarding`, is set to `1`.
    This ensures both Kubernetes service traffic and {{site.prodname}} traffic is forwarded appropriately.
  - A default IPv6 route

**Kubernetes IPv4 host requirements**
  - An IPv4 address that is reachable from the other hosts
  - The sysctl setting, `net.ipv4.conf.all.forwarding`, is set to `1`.
    This ensures both Kubernetes service traffic and {{site.prodname}} traffic is forwarded appropriately.
  - A default IPv4 route

### How to

>**Note**: The following tasks are only for new clusters.
{: .alert .alert-info}

- [Enable IPv6 only](#enable-ipv6-only)
- [Enable dual stack](#enable-dual-stack)

#### Enable IPv6 only

<!--
{% tabs %}
   <label:Operator,active:true>
   <%
1. TBD.
1. TBD.

%>
<label:Manifest>
<%
-->

1. Set up a new Kubernetes cluster with an IPv6 pod CIDR and service IP range.

1. Follow our [installation docs]({{ site.baseurl }}/getting-started/kubernetes) to install using
    the Tigera operator on your cluster.

1. When about to apply `custom-resources.yaml`, edit it first to define an IPv6 pod CIDR
    pool in the `Installation` resource.  For example, like this:

    ```yaml
    apiVersion: operator.tigera.io/v1
    kind: Installation
    metadata:
      name: default
    spec:
      # Install Calico Enterprise
      variant: TigeraSecureEnterprise
      ...
      calicoNetwork:
        ipPools:
        - cidr: fd5f:1801::/112
      ...
    ```

1. Apply the edited manifest with `kubectl apply -f`.

   New pods will get IPv6 addresses, and can communicate with each other and the outside world over IPv6.

<!--
%>
{% endtabs %}
-->

**(Optional) Update host to not look for IPv4 addresses**

If you want your workloads to have IPv6 addresses only, because you do not have IPv4 addresses or connectivity
between your nodes, complete these additional steps to tell {{site.prodname}} not to look for any IPv4 addresses.

1. Disable [IP autodetection of IPv4]({{site.baseurl}}/networking/ip-autodetection) by setting `IP` to `none`.
1. Calculate the {{site.prodname}} BGP router ID for IPv6 using either of the following methods.
   - Set the environment variable `CALICO_ROUTER_ID=hash` on {{site.nodecontainer}}.
     This configures {{site.prodname}} to calculate the router ID based on the hostname.
   - Pass a unique value for `CALICO_ROUTER_ID` to each node individually.

#### Enable dual stack

<!--
{% tabs id:installation-method-bbb %}
<id:opbbb,name:Operator,active:true>
<%
1. TBD.
1. TBD.

%>
<id:manbbb,name:Manifest>
<%
-->

1. Set up a new cluster following the Kubernetes {% include open-new-window.html text='prerequisites' url='https://kubernetes.io/docs/concepts/services-networking/dual-stack/#prerequisites' %} and {% include open-new-window.html text='enablement steps' url='https://kubernetes.io/docs/concepts/services-networking/dual-stack/#enable-ipv4-ipv6-dual-stack' %}.

1. Follow our [installation docs]({{ site.baseurl }}/getting-started/kubernetes) to install using
    the Tigera operator on your cluster.

1. When about to apply `custom-resources.yaml`, edit it first to define an IPv4 and IPv6 pod CIDR
    pool in the `Installation` resource.  For example, like this:

    ```yaml
    apiVersion: operator.tigera.io/v1
    kind: Installation
    metadata:
      name: default
    spec:
      # Install Calico Enterprise
      variant: TigeraSecureEnterprise
      ...
      calicoNetwork:
        ipPools:
        - cidr: 192.168.0.0/16
        - cidr: fd5f:1801::/112
      ...
    ```

1. Apply the edited manifest with `kubectl apply -f`.

   New pods will get both IPv4 and IPv6 addresses, and can communicate with each other and the outside world over IPv4 or IPv6.

<!--
%>
{% endtabs %}
-->

### Above and beyond

- [Configure Kubernetes control plane to operate over IPv6]({{site.baseurl}}/networking/ipv6-control-plane)
