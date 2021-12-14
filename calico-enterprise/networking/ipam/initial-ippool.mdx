---
title: Configure default IP pools
description: Configure the default IP address ranges for operator installation. 
canonical_url: ""
---

### Big picture

Configure the default IP pool values to use during Tigera Operator installation.

### Value

During Tigera Operator installation, you must configure the CIDR range to use for pods that reflects your environment. 

### Features

This how-to guide uses the following features: 

- **Tigera Operator installation**
- **IPPools**

### Concepts

#### Kubernetes pod CIDR

The **Kubernetes pod CIDR** is the expected IP address range for pod IPs.  It is defined for the entire cluster, and is used by various Kubernetes components to determine if an IP belongs to a pod. For example, kube-proxy treats traffic differently if an IP is from a pod than if it is not. All pod IPs must be in the CIDR range for Kubernetes to function correctly.

#### Tigera Operator and IP pools

[Calico IP pools]({{site.baseurl}}/reference/resources/ippool) are ranges of IP addresses that Calico uses to assign to pods; the ranges must within the Kubernetes pod CIDR. 

The Tigera Operator reads the [Installation]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.Installation)
resource and configures the default Calico IP pool. Note the following:

- Default fields for any that are omitted:
  - CIDR: 192.168.0.0/16
  - Encapsulation: IPIP
  - NodeSelector: all()
  - NATOutgoing: Enabled
- IP pools are only used when Calico is used for pod networking, IP pools are not utilized when using other pod networking solutions. 
- To make changes to the IP pools after Tigera Operator install, you may use [calicoctl]({{site.baseurl}}/reference/calicoctl/) or kubectl. If you make the changes to the IP Pool in the Installation resource (Operator IPPool) after installation, the the changes are not applied.

### Before you begin...

- Verify that your IP pool is within the Kubernetes pod CIDR
- If you are using encapsulation (IP in IP or VXLAN), ensure that the traffic is allowed on your network
- You are making these changes for a cluster that has not yet had {{site.prodname}} deployed.

### How to

1. Download the custom-resource.yaml file. 
1. Edit the [Installation resource]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.Installation).  
   **Required values**: `cidr:`   
   **Empty values**: Defaulted 

    ```bash
    apiVersion: operator.tigera.io/v1
    kind: Installation
    metadata:
      name: default
    spec:
      calicoNetwork:
       ipPools:
          - cidr: "192.168.0.0/16"
            encapsulation: "IPIP"
            nodeSelector: "label == 'value'"
            natOutgoing: "Enabled"
     ```

1. Apply the manifest and continue with your installation as normal.

### Above and beyond

- [IP pool resource]({{site.baseurl}}/reference/resources/ippool)
- Use [calicoctl]({{site.baseurl}}/reference/calicoctl/) or `kubectl` to edit the IPPool resource.
