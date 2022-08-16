---
title: Configure multiple Calico Enterprise networks on a pod
description: Configure a cluster with multiple Calico Enterprise networks on each pod, and enforce security using Calico Enterprise tiered network policy.
---

### Big picture

Configure a Kubernetes cluster with multiple {{site.prodname}} networks on each pod, and enforce security using {{site.prodname}} tiered network policy.

### Value

By default, you can configure only one CNI (network and pod interface) in a cluster. But many deployments require multiple networks (for example, one that is faster or more secure) for sending different types of data. {{site.prodname}} supports configuring additional {{site.prodname}} networks and interfaces in your pods using the Multus-CNI plugin. You can then use {{site.prodname}} tiered policy and other features to enforce security on all of your workload traffic.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **Installation** resource with `MultiInterfaceMode` field

### Concepts

#### About the Multus-CNI plugin

{{site.prodname}} uses the [Multus-CNI plugin](https://github.com/intel/multus-cni/){:target="_blank"} to create multiple {{site.prodname}} networks and multiple pod interfaces to access these networks. This extends the default network and pod interface that comes with the Calico CNI.

You install Multus on a cluster, then simply enable Multus in the {{site.prodname}} Installation resource. Using the Multus **NetworkAttachmentDefinition**, you define the new networks and reference them as an annotation in the pod resource.

#### Labels, workload endpoints, and policy

When you set the `MultiInterfaceMode` field to `Multus` in the Installation resource, the following network and network interface labels are automatically added to new workload endpoints.

- `projectcalico.org/network`
- `projectcalico.org/network-namespace`
- `projectcalico.org/network-interface`

You can then create {{site.prodname}} policies using these label selectors to target specific networks or network interfaces.

#### Limitations

**Maximum additional networks per pod**

You can define a maximum of nine additional {{site.prodname}} networks on a pod. If you add a network that exceeds the limit for the pod, networking is not configured and the pod fails to start with an associated error.

**{{site.prodname}} features**

Although the following {{site.prodname}} features are supported for your default {{site.prodname}} network, they are not supported at this time for additional networks/network interfaces using Multus:

- Floating IPs
- Specific IPs
- Specifying IP pools on a per-namespace or per-pod basis
- Egress gateways

### Before you begin...

**Required**

- Calico CNI 
- Calico CNI plugin

  >**Note**: Verify that you are using the Calico Enterprise CNI. The CNI plugin used by Kubernetes for AKS, EKS, and GKE may be different, which means this feature will not work.
    {: .alert .alert-info}
- [Install Multus 3.0+ on your Kubernetes cluster](https://github.com/intel/multus-cni/){:target="_blank"}
  >**Note**: Multus is installed on OpenShift 4.0+ clusters.
  {: .alert .alert-info}
- [Install and configure calicoctl]({{site.baseurl}}/maintenance/clis/calicoctl/) or configure access to [Calico Enterprise Manager UI]({{site.baseurl}}/getting-started/cnx//access-the-manager)

### How to

1. [Configure cluster for multiple networks](#configure-cluster-for-multiple-networks)
1. [Create a new network](#create-a-new-network)
1. [Create a pod interface for the new network](#create-a-pod-interface-for-the-new-network)
1. [Configure the IP pool for the network](#configure-the-ip-pool-for-the-network)
1. [Enforce policy on the new network and pod interface](#enforce-policy-on-the-new-network-and-pod-interface)
1. [View workload endpoints](#view-workload-endpoints)

#### Configure cluster for multiple networks

In the [Installation custom resource]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.CalicoNetworkSpec), set the `MultiInterfaceMode` to **Multus**.

#### Create a new network

Create a new network using the Multus **NetworkAttachmentDefinition**, and set the following required field to `"type":"calico"`.

```
apiVersion: "k8s.cni.cncf.io/v1"
kind: NetworkAttachmentDefinition
metadata:
  name: additional-calico-network
spec:
  config: '{
      "cniVersion": "0.3.0",
      "type": "calico",
      "log_level": "info",
      "datastore_type": "kubernetes",
      "mtu": 1410,
      "nodename_file_optional": false,
      "ipam": {
        "type": "calico-ipam",
        "assign_ipv4" : "true",
        "assign_ipv6" : "false"
      },
      "policy": {
          "type": "k8s"
      },
      "kubernetes": {
          "kubeconfig": "/etc/cni/net.d/calico-kubeconfig"
      }
    }'
```

#### Create a pod interface for the new network

Create a pod interface that specifies the new network using an annotation.

In the following example, we create a pod with an additional pod interface named, `cali1`. The pod interface is attached to the network named, `additional-calico-network`, using the `k8s.v1.cni.cncf.io/networks` annotation.
Note that all networks in `k8s.v1.cni.cncf.io/networks` are assumed to be {{site.prodname}} networks.

```
apiVersion: v1
kind: Pod
metadata:
 name: multus-test-pod-1
 namespace: default
 annotations:
   k8s.v1.cni.cncf.io/networks: additional-calico-network@cali1
spec:
 nodeSelector:
   kubernetes.io/os: linux
 containers:
   - name: multus-test
     command: ["/bin/sh", "-c", "trap : TERM INT; sleep infinity & wait"]
     image: alpine
```

#### Configure the IP pool for the network

Although not required, you may want to assign IPs from specific pools to specific network interfaces. If you are using the [Calico Enterprise IPAM plugin]({{site.baseurl}}/reference/cni-plugin/configuration#specifying-ip-pools-on-a-per-namespace-or-per-pod-basis), specify the IP pools in the **NetworkAttachmentDefinition** custom resource. For example:

```
 "ipam": {
     "type": "calico-ipam",
     "assign_ipv4" : "true",
     "assign_ipv6" : "false"
     "ipv4_pools": ["10.0.0.0/24", "20.0.0.0/16", "default-ipv4-ippool"],
},
```
#### Enforce policy on the new network and pod interface

When MultiInterfaceMode is set to Multus, WorkloadEndpoints are created with these labels:

- `projectcalico.org/network`
- `projectcalico.org/network-namespace`
- `projectcalico.org/network-interface`

You can use these labels to enforce policies on specific interfaces and networks using policy label selectors.

>**Note**: Prior to {{site.prodname}} 3.0, if you were using Kubernetes datastore (kdd mode), the workload endpoint field and name suffix were always **eth0**. In 3.0, the value for workload labels may not be what you expect. Before creating policies targeting WorkloadEndpoints using the new labels, you should verify label values using the commands in [View workload endpoints](#view-workload-endpoints).
{: .alert .alert-info}

In this policy example, we use the selector field to target all WorkloadEndpoints with the network interface of, `cali1`.

```
apiVersion: projectcalico.org/v3
kind: NetworkPolicy
metadata:
  name: internal-access.allow-tcp-6379
  namespace: production
spec:
  tier: internal-access
  selector: projectcalico.org/network-interface == cali1
  types:
  - Ingress
  - Egress
  ingress:
  - action: Allow
    metadata:
      annotations:
        from: frontend
        to: database
    protocol: TCP
    source:
      selector: role == 'frontend'
    destination:
      ports:
      - 6379
  egress:
  - action: Allow
```
#### View workload endpoints

**In the {{site.prodname}} Manager UI**, go to the **WorkloadEndpoint** page to see all of the WorkloadEndpoints, including the network labels are for targeting WorkloadEndpoints with policy.

**Using the CLI...**

To view all WorkloadEndpoints for pods (default and new), use the following command.

```
MULTI_INTERFACE_MODE=multus calicoctl get workloadendpoints -o wide
```
```
NAME                                                                 WORKLOAD            NODE                         NETWORKS            INTERFACE         PROFILES                          NATS
test--bo--72vg--kadm--infra--0-k8s-multus--test--pod--1-eth0        multus-test-pod-1   bryan-bo-72vg-kadm-infra-0   192.168.53.129/32   calif887e436e8b   kns.default,ksa.default.default
test--bo--72vg--kadm--infra--0-k8s-multus--test--pod--1-net1        multus-test-pod-1   bryan-bo-72vg-kadm-infra-0   192.168.53.140/32   calim17CD6INXIX   kns.default,ksa.default.default
test--bo--72vg--kadm--infra--0-k8s-multus--test--pod--1-testiface   multus-test-pod-1   bryan-bo-72vg-kadm-infra-0   192.168.53.142/32   calim27CD6INXIX   kns.default,ksa.default.default
test--bo--72vg--kadm--infra--0-k8s-multus--test--pod--1-net3        multus-test-pod-1   bryan-bo-72vg-kadm-infra-0   192.168.52.143/32   calim37CD6INXIX   kns.default,ksa.default.default
```

To view specific WorkloadEndpoints, use the following command.

```
MULTI_INTERFACE_MODE=multus calicoctl get workloadendpoint test--bz--72vg--kadm--infra--0-k8s-multus--test--pod--1-net1 -o yaml
```

```
apiVersion: projectcalico.org/v3
kind: WorkloadEndpoint
metadata:
  creationTimestamp: "2020-05-04T22:23:05T"
  labels:
    projectcalico.org/namespace: default
    projectcalico.org/network: calico
    projectcalico.org/network-interface: net1
    projectcalico.org/network-namespace: default
    projectcalico.org/orchestrator: k8s
    projectcalico.org/serviceaccount: default
  name: test--bz--72vg--kadm--infra--0-k8s-multus--test--pod--1-net1
  namespace: default
  resourceVersion: "73572"
  uid: b9bb7482-cdb8-48d4-9ae5-58322d48391a
spec:
  endpoint: net1
  interfaceName: calim16CD6INXIX
  ipNetworks:
  - 192.168.52.141/32
  node: bryan-bo-72vg-kadm-infra-0
  orchestrator: k8s
  pod: multus-test-pod-1
  profiles:
  - kns.default
  - ksa.default.default
```
