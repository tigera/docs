---
description: Install Calico networking and network policy for on-premises deployments.
title: Installing on on-premises deployments
---

# Install Calico networking and network policy for on-premises deployments

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Big picture

Install $[prodname] to provide both networking and network policy for self-managed on-premises deployments.

## Value

**$[prodname] networking** and **network policy** are a powerful choice for a CaaS implementation. If you have the networking infrastructure and resources to manage Kubernetes on-premises, installing the full $[prodname] product provides the most customization and control.

## Concepts

### Recommended: Tigera operator

$[prodname] is installed by an operator which manages the installation, upgrade, and general lifecycle of a $[prodname] cluster. The operator is
installed directly on the cluster as a Deployment, and is configured through one or more custom Kubernetes API resources.

### $[prodname] manifests

$[prodname] can also be installed using raw manifests as an alternative to the operator. The manifests contain the necessary resources for installing $[prodname] on each node in your Kubernetes cluster. Using manifests is not recommended as they cannot automatically manage the lifecycle of the $[prodname] as the operator does. However, manifests may be useful for clusters that require highly specific modifications to the underlying Kubernetes resources.

## Before you begin...

- Ensure that your Kubernetes cluster meets [requirements](../requirements.mdx).
  If you do not have a cluster, see [Installing kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/).

## How to

- [Install Calico](#install-calico)

### Install Calico

<Tabs>
<TabItem label="Operator" value="Operator-0">

1. Install the operator on your cluster.

   ```
   kubectl create -f $[manifestsUrl]/manifests/tigera-operator.yaml
   ```

1. Download the custom resources necessary to configure $[prodname].

   ```
   curl $[manifestsUrl]/manifests/custom-resources.yaml -O
   ```

   If you wish to customize the $[prodname] install, customize the downloaded custom-resources.yaml manifest locally.

1. Create the manifest to install $[prodname].

   ```
   kubectl create -f custom-resources.yaml
   ```

1. Verify $[prodname] installation in your cluster.

   ```
   watch kubectl get pods -n calico-system
   ```

   You should see a result similar to the below.

   ```
   NAMESPACE     NAME                READY   STATUS                  RESTARTS         AGE
   kube-system   calico-node-txngh   1/1     Running                   0              54s
   ```

<GeekDetails
  prodname='$[prodname]'
  details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:IPIP,Routing:BGP,Datastore:Kubernetes'
/>

</TabItem>
<TabItem label="Manifest" value="Manifest-1">

Based on your datastore and number of nodes, select a link below to install $[prodname].

:::note

The option, **Kubernetes API datastore, more than 50 nodes** provides scaling using [Typha daemon](../../../reference/typha/index.mdx). Typha is not included for etcd because etcd already handles many clients so using Typha is redundant and not recommended.

:::

- [Install Calico with Kubernetes API datastore, 50 nodes or less](#install-calico-with-kubernetes-api-datastore-50-nodes-or-less)
- [Install Calico with Kubernetes API datastore, more than 50 nodes](#install-calico-with-kubernetes-api-datastore-more-than-50-nodes)
- [Install Calico with etcd datastore](#install-calico-with-etcd-datastore)

#### Install Calico with Kubernetes API datastore, 50 nodes or less

:::note

This option is maintained for upgrade compatibility, but we recommend that new clusters use the operator, which
will automatically configure $[prodname] correctly for your cluster size (including deploying the Typha scale-out
proxy and securing it when necessary).

:::

1. Download the $[prodname] networking manifest for the Kubernetes API datastore.

   ```bash
   curl $[manifestsUrl]/manifests/calico.yaml -O
   ```

1. If you are using pod CIDR `192.168.0.0/16`, skip to the next step.
   If you are using a different pod CIDR with kubeadm, no changes are required &#8212; Calico will automatically detect the CIDR based on the running configuration.
   For other platforms, make sure you uncomment the CALICO_IPV4POOL_CIDR variable in the manifest and set it to the same value as your chosen pod CIDR.
1. Customize the manifest as necessary.
1. Apply the manifest using the following command.

   ```bash
   kubectl apply -f calico.yaml
   ```

The geeky details of what you get:

<GeekDetails
  prodname='$[prodname]'
  details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:IPIP,Routing:BGP,Datastore:Kubernetes'
/>

#### Install Calico with Kubernetes API datastore, more than 50 nodes

:::note

This option is maintained for upgrade compatibility but we recommend that new clusters use the operator to deploy
Typha (the extra scale-out component included in this manifest) instead of using this method.  The operator deploys
Typha, autoscales it, and auto-configures mTLS between the per-host agent and Typha for maximum security.  This
manifest option leaves scaling up to you and, by default, it does not secure Typha's port.

:::

1. Download the $[prodname] networking manifest for the Kubernetes API datastore.

   ```bash
   curl $[manifestsUrl]/manifests/calico-typha.yaml -o calico.yaml
   ```

1. If you are using pod CIDR `192.168.0.0/16`, skip to the next step.
   If you are using a different pod CIDR with kubeadm, no changes are required &#8212; Calico will automatically detect the CIDR based on the running configuration.
   For other platforms, make sure you uncomment the CALICO_IPV4POOL_CIDR variable in the manifest and set it to the same value as your chosen pod CIDR.
1. Modify the replica count to the desired number in the `Deployment` named, `calico-typha`.

   ```yaml noValidation
   apiVersion: apps/v1beta1
   kind: Deployment
   metadata:
     name: calico-typha
     ...
   spec:
     ...
     replicas: <number of replicas>
   ```

   We recommend at least one replica for every 200 nodes, and no more than
   20 replicas. In production, we recommend a minimum of three replicas to reduce
   the impact of rolling upgrades and failures. The number of replicas should
   always be less than the number of nodes, otherwise rolling upgrades will stall.
   In addition, Typha only helps with scale if there are fewer Typha instances than
   there are nodes.

   :::note

   If you set `typha_service_name` and set the Typha deployment replica
   count to 0, Felix will not start.

   :::

1. Customize the manifest if desired.
1. Apply the manifest.

   ```bash
   kubectl apply -f calico.yaml
   ```

The geeky details of what you get:

<GeekDetails
  prodname='$[prodname]'
  details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:IPIP,Routing:BGP,Datastore:Kubernetes'
/>

#### Install Calico with etcd datastore

:::note

The etcd datastore is not recommended for new Kubernetes installs:

* etcd is another component to manage and maintain.
* Some newer Kubernetes-targeted features (such as service matches in policy) are not supported with the etcd datastore.
* eBPF data plane mode is not supported with the etcd datastore.  It relies on watching services to implement some features,
  which is not supported with the etcd datastore.
* The Cloud/Enterprise versions of $[prodname] do not support etcd mode at all so using this manifest prevents
  you from upgrading.

However, it is the only option that supports running both OpenStack and Kubernetes nodes in the same cluster.

:::

1. Download the $[prodname] networking manifest for etcd.

   ```bash
   curl $[manifestsUrl]/manifests/calico-etcd.yaml -o calico.yaml
   ```

1. If you are using pod CIDR `192.168.0.0/16`, skip to the next step.
   If you are using a different pod CIDR with kubeadm, no changes are required &#8212; Calico will automatically detect the CIDR based on the running configuration.
   For other platforms, make sure you uncomment the CALICO_IPV4POOL_CIDR variable in the manifest and set it to the same value as your chosen pod CIDR.
1. In the `ConfigMap` named, `calico-config`, set the value of `etcd_endpoints` to the IP address and port of your etcd server.
   :::note

   You can specify more than one `etcd_endpoint` using commas as delimiters.

   :::

1. Customize the manifest if desired.
1. Apply the manifest using the following command.

   ```bash
   kubectl apply -f calico.yaml
   ```

The geeky details of what you get:

<GeekDetails
  prodname='$[prodname]'
  details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:IPIP,Routing:BGP,Datastore:etcd'
/>

</TabItem>
</Tabs>

## Next steps

**Required**

- [Install and configure calicoctl](../../../operations/calicoctl/install.mdx)

**Recommended - Networking**

- If you are using the default BGP networking with full-mesh node-to-node peering with no encapsulation, go to [Configure BGP peering](../../../networking/configuring/bgp.mdx) to get traffic flowing between pods.
- If you are unsure about networking options, or want to implement encapsulation (overlay networking), see [Determine best networking option](../../../networking/determine-best-networking.mdx).

**Recommended - Security**

- [Secure Calico component communications](../../../network-policy/comms/crypto-auth.mdx)
- [Secure hosts by installing Calico on hosts](../../bare-metal/about.mdx)
- [Secure pods with Calico network policy](../../../network-policy/get-started/calico-policy/calico-network-policy.mdx)
- If you are using $[prodname] with Istio service mesh, get started here: [Enable application layer policy](../../../network-policy/istio/app-layer-policy.mdx)
