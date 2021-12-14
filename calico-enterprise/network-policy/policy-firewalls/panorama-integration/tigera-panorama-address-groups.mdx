---
title: Panorama address groups integration
description: Leverage existing Panorama address groups, and take advantage of Calico Enterprise network policy to secure workloads.
canonical_url: '/security/panorama-integration/tigera-panorama-address-groups'
---

### Big picture

Transform Address Groups (AGs) in Panorama into {{site.prodname}} global network sets for use in network policy.

### Value

Securing egress traffic outside a cluster is an important use case for traditional firewall teams who want to use Kubernetes. But security and platform operators have significant investment in using Address Groups for grouping endpoints.

To leverage Address Groups, {{site.prodname}} provides an integration that dynamically translates Address Groups that you specify into {{site.prodname}} global network sets (the equivalent mechanism to group IP addresses). This makes it easier to adopt the robust security of {{site.prodname}} network policy to secure workloads, centrally manage endpoints external to Kubernetes in Panorama, and take advantage of the Service Graph tool in Manager UI for superior observing and troubleshooting. Visibility is key for security and platform operators to troubleshoot clusters/workloads, and for developers to understand how their applications and microservices are being consumed.


### Features

This how-to guide uses the following {{site.prodname}} features:

- {{site.prodname}} **tigera-panorama-controller**
- {{site.prodname}} **GlobalNetworkSets**

### Concepts

#### About the Panorama integration

{{site.prodname}} global network sets are a key resource for defining DNS policy along with global network policy for securing egress traffic. Network sets are visible in Manager UI from the left nav, or using `kubectl`.

To integrate your existing Address Groups, you just create a ConfigMap with Panorama parameters, install the address-group-controller in your Kubernetes cluster, and {{site.prodname}} automatically maps the values to a {{site.prodname}} global network set.

The following example is what a {{site.prodname}} GlobalNetworkSet looks like after mapping Address Group inputs. After you verify that you have a GlobalNetworkSet, that's all you need. You can start using {{site.prodname}}'s robust network policy!

```yaml
---
kind: GlobalNetworkSet
metadata:
  name: pan.my.address.group
  annotations:
    firewall.tigera.io/device-groups: shared
    firewall.tigera.io/name: my.address.group
    firewall.tigera.io/object-type: AddressGroup
    firewall.tigera.io/type: Panorama
  labels:
    firewall.tigera.io/tag1: ''
    firewall.tigera.io/tag2: ''
spec:
  allowedEgressDomains:
  - www.tigera.io
  - docs.projectcalico.org
  - kubernetes.io
  nets:
  - 10.10.10.10/32
  - 192.168.222.111/31
```

Where:

- You create a ConfigMap where you specify the Panorama hostname, address group tags, and a device group for checking Address Group updates.
- Each address group maps to a global network set in Kubernetes.

>**Note**: GlobalNetworkSet.metadata.name will be prefixed with `pan.` and either be: 1) `<ADDRESS_GROUP_NAME>`, if it is a Kubernetes (RFC1123) compliant name, or 2) a mapping to a Kubernetes (RFC1123) compliant name, suffixed with a unique hash value.

### Before you begin

**Supported {{site.prodname}} plaforms**
- Kubernetes/kubeadm, OpenShift, AWS using kOps, RKE, EKS, AKS, GKE, Tanzu Kubernetes Grid

**Supported version**
- Panorama v10

**Unsupported**
- Panorama IP ranges, IP wildcards, and address groups that reference other address groups

**Recommended**
- Experience creating and administering Panorama address group objects

### How to

- [Create a Panorama API user](#create-a-panorama-api-user)
- [Create a Panorama address groups config map](#create-a-panorama-address-groups-config-map)
- [Install Panorama username and password as secrets](#install-panorama-username-and-password-as-secrets)
- [Deploy the address groups controller in the Kubernetes cluster](#deploy-the-address-groups-controller-in-the-kubernetes-cluster)
- [Verify the integration](#verify-the-integration)
- [Troubleshooting](#troubleshooting)

### Create a Panorama API user

The user must have read REST API access to addresses and address groups in the appropriate device group (or "shared" if not specified) and have read access to device groups.

### Create a Panorama address groups config map

1. Create a namespace for the tigera-firewall-controller.

    ```bash
kubectl create namespace tigera-firewall-integration
    ```

2. Create a ConfigMap and add your Panorama device information in the data section. For example:

    ```bash
kubectl create configmap tigera-panorama-controller-config -n tigera-firewall-integration --from-literal=tigera.firewall.host=__IPADDRESS_OF_PANORAMA__ --from-literal=tigera.firewall.panorama.tags="tag1, tag2, tag3" --from-literal=tigera.firewall.panorama.device-group="shared"
    ```
    Where:
   
    | Field                      | Description                                                  |
    | -------------------------- | ------------------------------------------------------------ |
    | host                       | Panorama host address.      |
    | tags                       | The comma delimited set of Panorama tags used to filter the address groups. |

    **Note**: Tag names with characters that do not follow the RFC1123 standard must be encapsulated within single quotes. Invalid input will produce an error similar to: 
    ```
[ERROR] "failed to parse tags"
    ```

### Install Panorama username and password as secrets

Store each Panorama username and password as a secret in the `tigera-firewall-integration` namespace.

For example, in the Secret for Panorama, store its username as a secret, with key `panorama.username` and password as a secret, with key as `panorama.password`.

```bash
kubectl create secret generic panorama-access -n tigera-firewall-integration --from-literal=panorama.username=__USERNAME_OF_PANORAMA__ --from-literal=panorama.password=__PASSWORD_OF_PANORAMA__
```

#### Deploy the address groups controller in the Kubernetes cluster

1. Install your pull secret.

    ```bash
kubectl create secret generic tigera-pull-secret --from-file=.dockerconfigjson=<path/to/pull/secret> --type=kubernetes.io/dockerconfigjson -n tigera-firewall-integration
    ```

2. Create the manifest.

    ```bash
kubectl create -f {{ "/manifests/tigera-panorama-address-groups.yaml" | absolute_url }}
    ```

### Verify the integration

1. Log in to Panorama.
2. Select **Objects**, and create new **Address Groups**.
3. In the Manager UI, click Network Sets in the left navbar and verify that the GlobalNetworkSets are created.

#### Troubleshooting

**Panorama IP is not supported**
 - The following annotation appears in the GlobalNetworkSet when an unsupported IP (IP Range or IP wildcard) is mapped to the address group:

    ```yaml
    "firewall.tigera.io/errors": "unsupported-ip-ranges", "unsupported-ip-wildcards"
    ```
    The logs will display something similar to the following:
    
    ```
    [DEBUG][1] dynamic_address_groups_controller.go 439: "firewall.tigera.io/unsupported-ip-ranges": "10.10.10.1-10.10.10.4, 192.0.0.1-192.0.0.20"
    [DEBUG][1] dynamic_address_groups_controller.go 452: "firewall.tigera.io/unsupported-ip-wildcards": "10.20.1.0/0.0.248.255"
    ```
 - Other logs are present via pod logs.

**Panorama Address Group was not configured**
    
The cause is likely a connection failure between {{site.prodname}} and Panorama. Look in the debug logs for a `Client.Timeout` error similar to the following:
    
```
[DEBUG][1] util.go 62: Initialize client with hostname: 10.10.10.10
10.10.10.10: Retrieving API key
[ERROR][1] dynamic_address_groups_controller.go 137: Failed to instantiate a Panorama client error=Post "https://10.10.10.10/api": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
[FATAL][1] main.go 114: Failed to configure Panorama address groups controller
```

**Address Group expression is invalid**
    
The {{site.prodname}} controller relies on {% include open-new-window.html text='v0.6.0 API' url='https://github.com/PaloAltoNetworks/pango' %} - v0.6.0 API to GET Panorama object structures. If for some reason, an unsupported address group type is returned by Panorama, the controller logs the following error:

```
[ERROR][1] dynamic_address_groups_controller.go 378: "Failed to retrieve address groups from Panorama"
```

**If an Address Group is deleted in Panorama, and is used in a global network set for a policy, what happens to the policy?**

The policy will work only until the next polling request to Panorama. The poll_interval may be defined in the tigera-panorama-controller-config ConfigMap (default: 10s). Once synchronized, the global network set will be deleted from the calico datastore; the policy will remain, but will not be enforced.

### Above and beyond

 - [Global network set]({{site.baseurl}}/reference/resources/globalnetworkset)
 - [DNS policy]({{site.baseurl}}/security/domain-based-policy)
