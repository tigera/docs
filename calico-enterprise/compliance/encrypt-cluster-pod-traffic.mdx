---
title: Encrypt data in transit
description: Enable WireGuard for state-of-the-art cryptographic security between pods for Calico Enterprise clusters.
canonical_url: '/compliance/encrypt-cluster-pod-traffic'
---

### Big picture

Enable WireGuard to secure on the wire in-cluster pod traffic in a {{site.prodname}} cluster.

### Value

When this feature is enabled, {{site.prodname}} automatically creates and manages WireGuard tunnels between nodes providing transport-level security for on-the-wire, in-cluster pod traffic. WireGuard provides {% include open-new-window.html text='formally verified' url='https://www.wireguard.com/formal-verification/' %} secure and {% include open-new-window.html text='performant tunnels' url='https://www.wireguard.com/performance/' %} without any specialized hardware. For a deep dive in to WireGuard implementation, see this {% include open-new-window.html text='whitepaper' url='https://www.wireguard.com/papers/wireguard.pdf' %}.

### Concepts
#### About WireGuard

{{ site.prodname }} supports both host-to-host encryption for pod traffic, and direct node-to-node communication. Because {{site.prodname}} is not implemented using a sidecar, traffic is not encrypted for the full journey from one pod to another; traffic is only encrypted on the host-to-host portion of the journey.

{{site.prodname}} supports WireGuard encryption for both IPv4 and IPv6 traffic. You can enable traffic independently using parameters in the FelixConfiguration resource:
  - `wireguardEnabled` -  enables encrypting IPv4 traffic over an IPv4 underlay network
  - `wireguardEnabledV6`  - enables encrypting IPv6 traffic over an IPv6 underlay network

### Features

This how-to guide uses the following {{site.prodname}} features:

- **Felix configuration resource** with WireGuard configuration parameters

### Before you begin

**Unsupported**

- GKE
- Using your own custom keys to encrypt traffic

**Limitations**

- IPv4 only
- EKS, only with AWS CNI
- AKS, only with Azure CNI

**Supported encryption**

- Pod-to-pod traffic
- Encryption for direct node-to-node communication is only supported on managed clusters deployed on EKS (AWS CNI) and AKS (Azure CNI)

**Required**

- On all nodes in the cluster that you want to participate in {{site.prodname}} encryption, verify that the operating system(s) on the nodes are {% include open-new-window.html text='installed with WireGuard' url='https://www.wireguard.com/install/' %}.

  > **Note**: Some node operating systems do not support WireGuard, or do not have it installed by default. Enabling {{site.prodname}} WireGuard encryption does not require all nodes to be installed with WireGuard. However, traffic to or from a node that does not have WireGuard installed, will not be encrypted.
  {: .alert .alert-info}

- IP addresses for every node in the cluster. This is required to establish secure tunnels between the nodes. {{site.prodname}} can automatically do this using [IP autodetection methods]({{site.baseurl}}/networking/ip-autodetection).

### How to

- [Install WireGuard](#install-wireguard)
- [Enable WireGuard for a cluster](#enable-wireguard-for-a-cluster)
- [Verify encryption is enabled](#verify-encryption-is-enabled)
- [Enable WireGuard statistics](#enable-wireguard-statistics)
- [View WireGuard statistics](#view-wireguard-statistics) 
- [Disable WireGuard for an individual node](#disable-wireguard-for-an-individual-node)
- [Disable WireGuard for a cluster](#disable-wireguard-for-a-cluster)

#### Install WireGuard

WireGuard is included in Linux 5.6+ kernels, and has been backported to earlier Linux kernels in some Linux distributions.

Install WireGuard on cluster nodes using {% include open-new-window.html text='instructions for your operating system' url='https://www.wireguard.com/install/' %}. Note that you may need to reboot your nodes after installing WireGuard to make the kernel modules available on your system.

Use the following instructions for these platforms that are not listed on the WireGuard installation page, before proceeding to [enabling WireGuard](#enable-wireguard-for-a-cluster).

{% tabs %}
<label:EKS,active:true>
<%
To install WireGuard on the default Amazon Machine Image (AMI):

```bash
sudo yum install kernel-devel-`uname -r` -y
sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm -y
sudo curl -o /etc/yum.repos.d/jdoss-wireguard-epel-7.repo https://copr.fedorainfracloud.org/coprs/jdoss/wireguard/repo/epel-7/jdoss-wireguard-epel-7.repo
sudo yum install wireguard-dkms wireguard-tools -y
```

%>
<label:AKS>
<%
AKS cluster nodes run Ubuntu with a kernel that has WireGuard installed already, so there is no manual installation required.

%>
<label:OpenShift>
<%
To install WireGuard for OpenShift v4.8:


   1. Install requirements:
      - {% include open-new-window.html text='CoreOS Butane' url='https://coreos.github.io/butane/getting-started/' %}
      - {% include open-new-window.html text='Openshift CLI' url='https://docs.openshift.com/container-platform/4.2/cli_reference/openshift_cli/getting-started-cli.html' %}

   1. Download and configure the tools needed for kmods.
   ```bash
   FAKEROOT=$(mktemp -d)
   git clone https://github.com/tigera/kmods-via-containers
   cd kmods-via-containers
   make install FAKEROOT=${FAKEROOT}
   cd ..
   git clone https://github.com/tigera/kvc-wireguard-kmod
   cd kvc-wireguard-kmod
   make install FAKEROOT=${FAKEROOT}
   cd ..
   ```

   1. Configure/edit `${FAKEROOT}/root/etc/kvc/wireguard-kmod.conf`. 
   
       a. You must then set the URLs for the `KERNEL_CORE_RPM`, `KERNEL_DEVEL_RPM` and `KERNEL_MODULES_RPM` packages in the conf file `$FAKEROOT/etc/kvc/wireguard-kmod.conf`. Obtain copies for `kernel-core`, `kernel-devel`, and `kernel-modules` rpms from {% include open-new-window.html text='RedHat Access' url='https://access.redhat.com/downloads/content/package-browser' %} and host it in an http file server that is reachable by your OCP workers.

       b. For help configuring `kvc-wireguard-kmod/wireguard-kmod.conf` and WireGuard version to kernel version compatibility, see the {% include open-new-window.html text='kvc-wireguard-kmod README file' url='https://github.com/tigera/kvc-wireguard-kmod#quick-config-variables-guide' %}.


   1. Get RHEL Entitlement data from your own RHEL8 system from a host in your cluster.
      ```bash
      tar -czf subs.tar.gz /etc/pki/entitlement/ /etc/rhsm/ /etc/yum.repos.d/redhat.repo
      ```
      Please refer to Openshift {% include open-new-window.html text='documentation' url='https://access.redhat.com/documentation/en-us/red_hat_subscription_management/1/html-single/rhsm/index#reg-cli' %} for more information about these entitlement files.

   1. Copy the `subs.tar.gz` file to your workspace and then extract the contents using the following command.
      ```bash
      tar -x -C ${FAKEROOT}/root -f subs.tar.gz
      ```

   1. Transpile your machine config using {% include open-new-window.html text='CoreOS Butane' url='https://coreos.github.io/butane/getting-started/' %}.
      ```bash
      cd kvc-wireguard-kmod
      make ignition FAKEROOT=${FAKEROOT} > mc-wg.yaml
      ```

   1. With the KUBECONFIG set for your cluster, run the following command to apply the MachineConfig which will install WireGuard across your cluster.
      ```bash
      oc create -f mc-wg.yaml
      ```
%>
{% endtabs %}

#### Enable WireGuard for a cluster

Enable IPv4 WireGuard encryption across all the nodes using the following command.

```bash
kubectl patch felixconfiguration default --type='merge' -p '{"spec":{"wireguardEnabled":true}}'
```

Enable IPv6 WireGuard encryption across all the nodes using the following command.

```bash
kubectl patch felixconfiguration default --type='merge' -p '{"spec":{"wireguardEnabledV6":true}}'
```

To enable both IPv4 and IPv6 WireGuard encryption across all the nodes, use the following command.

```bash
kubectl patch felixconfiguration default --type='merge' -p '{"spec":{"wireguardEnabled":true,"wireguardEnabledV6":true}}'
```
For OpenShift, add the Felix configuration with WireGuard enabled [under custom resources]({{site.baseurl}}/getting-started/openshift/installation#provide-additional-configuration).

   > **Note**: The above command can be used to change other WireGuard attributes. For a list of other WireGuard parameters and configuration evaluation, see the [Felix configuration]({{site.baseurl}}/reference/resources/felixconfig#felix-configuration-definition).
   {: .alert .alert-info}

We recommend that you review and modify the MTU used by {{site.prodname}} networking when WireGuard is enabled to increase network performance. Follow the instructions in the [Configure MTU to maximize network performance]({{site.baseurl}}/networking/mtu) guide to set the MTU to a value appropriate for your network.

#### Verify encryption is enabled

To verify that the nodes are configured for WireGuard encryption, check the node status set by Felix using `kubectl`. For example:

```bash
kubectl get node <NODE-NAME> -o yaml
...
kind: Node
metadata:
  annotations:
    projectcalico.org/WireguardPublicKey: jlkVyQYooZYzI2wFfNhSZez5eWh44yfq1wKVjLvSXgY=
...
```

#### Enable WireGuard statistics

Since v3.11.1, WireGuard statistics are now automatically enabled with the enable wireguard setting(s) mentioned above.

#### View WireGuard statistics

To view WireGuard statistics in Manager UI, you must enable them. From the left navbar, click **Dashboard**, and the Layout Settings icon. 

![Wireguard Dashboard Toggle]({{site.baseurl}}/images/wireguard/stats-toggle.png)

##### WireGuard Dashboard toggle

When viewing WireGuard statistics, you might wonder why the charts in the Manager UI Dashboard show more ingress traffic than egress if all the traffic goes within the cluster. The chart might show a 1% difference between traffic for the following reasons:
- Sampling time. The statistics are generated a few microseconds apart.
- Packet loss. If a node resends a lost packet, then the node counts the packet twice where the receiver counts it only once.
- Averaging/smoothing. The statistics are smoothed out over a few seconds.

#### Disable WireGuard for an individual node

To disable WireGuard on a specific node with WireGuard installed, modify the node-specific Felix configuration. e.g., to turn off encryption for pod traffic on node `my-node`, use the following command. This command disables WireGuard for both IPv4 and IPv6, modify it accordingly if disabling only either IP version:

```bash
cat <<EOF | kubectl apply -f -
apiVersion: projectcalico.org/v3
kind: FelixConfiguration
metadata:
  name: node.my-node
spec:
  logSeverityScreen: Info
  reportingInterval: 0s
  wireguardEnabled: false
  wireguardEnabledV6: false
EOF
```

With the above command, Calico will not encrypt any of the pod traffic to or from node `my-node`.

To enable encryption for IPv4 and IPv6 pod traffic on node `my-node` again, patch this node's FelixConfiguration (modify accordingly if only dealing with IPv4 or IPv6):

```bash
kubectl patch felixconfiguration node.my-node --type='merge' -p '{"spec":{"wireguardEnabled":true,"wireguardEnabledV6":true}}'
```

#### Disable WireGuard for a cluster

To disable WireGuard on all nodes modify the default Felix configuration. For example:

```bash
kubectl patch felixconfiguration default --type='merge' -p '{"spec":{"wireguardEnabled":false,"wireguardEnabledV6":false}}'
```

### Above and beyond

- [Secure {{site.prodname}} component communications]({{site.baseurl}}/security/comms)
- [Configure MTU to maximize network performance]({{site.baseurl}}/networking/mtu)
