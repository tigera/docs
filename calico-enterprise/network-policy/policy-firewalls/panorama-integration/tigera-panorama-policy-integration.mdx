---
title: Panorama policy integration
description: Leverage existing Panorama policy, and take advantage of Calico Enterprise network policy to secure workloads.
canonical_url: '/security/panorama-integration/tigera-panorama-policy-integration'
---

### Big picture

Use the {{site.prodname}} Panorama policy integration to leverage {{site.prodname}} network policy and observability/troubleshooting tools for Kubernetes workloads.

### Value

The {{site.prodname}} integration for Panorama:
- Dynamically translates Panorama policy into {{site.prodname}} global network policy and hierarchical policy tiers. This lets you extend Kubernetes to existing Panorama workflows with security zones to secure both East-West and North-South traffic.
- Maps Panorama Address Groups to {{site.prodname}} global network sets (equivalent to Panorama “group IP addresses”), to centrally manage endpoints external to Kubernetes in Panorama. Security and platform operators can use the Manager UI Service Graph tool to troubleshoot clusters/workloads, and see how applications and microservices are being consumed.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **tigera-policy-integration-controller**
- **GlobalNetworkPolicy**
- **Tier**
- **tigera-address-groups-controller**
- **GlobalNetworkSet**


### Concepts

#### About the Panorama policy integration

{{site.prodname}} global network policies are a key resource for securing ingress and egress traffic. The policy integration also includes a Panorama-specific firewall tier. {{site.prodname}} policy tiers are a key microsegmentation feature that let you group policies and enforce higher precedence policies that cannot be circumvented by other teams.

The following example shows Panorama policy rules mapped into a {{site.prodname}} GlobalNetworkPolicy.

```yaml
---
kind: GlobalNetworkPolicy
metadata:
  name: mypolicytier.pan-zone-zone1
  annotations:
    firewall.tigera.io/type: Panorama
    firewall.tigera.io/latest_cache_update: "01-01-2022 09:01:01"
  labels:
    projectcalico.org/tier: mypolicytier
spec:
  egress:
  - action: Deny
    destination:
      ports:
      - 80
      selector: firewall.tigera.io/zone == 'zone2'
    metadata:
      annotations:
        firewall.tigera.io/rule: rule1
        firewall.tigera.io/source: zone.zone1
        firewall.tigera.io/destination: zone.zone2
        firewall.tigera.io/rank: "0"
    protocol: TCP
    source:
      ports:
      - 8080:8088
  - action: Allow
    destination:
      ports:
      - 1:5
      selector: firewall.tigera.io/address-group == 'my.address.group'
    metadata:
      annotations:
        firewall.tigera.io/rule: rule3
        firewall.tigera.io/source: zone.zone1
        firewall.tigera.io/destination: address-group.my.address.group
        firewall.tigera.io/rank: "2"
    protocol: UDP
    source:
      ports:
      - 8080:8088
  ingress:
  - action: Allow
    destination:
      ports:
      - 33
    metadata:
      annotations:
        firewall.tigera.io/rule: rule1
        firewall.tigera.io/source: zone.zone1
        firewall.tigera.io/destination: address.addr1
        firewall.tigera.io/rank: "0"
    protocol: TCP
    source:
      ports:
      - 4040
      - 4045
      nets:
      - 192.168.80.0/24
  order: 101
  selector: firewall.tigera.io/zone == 'zone1'
  tier: tier1
  types:
  - Ingress
  - Egress
```

Where:

- You create a ConfigMap where you specify the Panorama hostname, rule filter, and a device group for checking Panorama policy updates.
- Each zone within a Panorama rule maps to a global network policy in Kubernetes. Each source to destination mapping of a Panorama rule maps to a policy rule in Kubernetes, and where the supported mappings are `zone` to `zone/address/address-group` and `zone/address/address-group` to `zone`.
- Every policy is tagged with the associated zone name in Panorama, `firewall.tigera.io/<ZONE_NAME>`.
- A Calico egress/ingress rule referencing a zone defines a selector of the form: `firewall.tigera.io/zone == <ZONE_NAME>`.
- A Calico egress/ingress rule referencing an address group defines a selector of the form: `firewall.tigera.io/address-group == <ADDRESS_GROUP_NAME>`.

>**Note**: GlobalNetworkPolicy.metadata.name will be prefixed with `<TIER_NAME>.pan-zone` and either be: 1) `<ZONE_NAME>`, if it is a Kubernetes (RFC1123) compliant name, or 2) a mapping to a Kubernetes (RFC1123) compliant name, suffixed with a unique hash value.

>**Note**: An object (eg. service, address, etc.) member of a Panorama rule must be defined in same device group as the rule or the `shared` device group for it to be used in Calico policy.

#### About the Panorama address groups integration

{{site.prodname}} global network sets are a key resource for defining DNS policy along with global network policy for securing egress traffic. Network sets are visible in Manager UI from the left nav, or using `kubectl`.

Deployed concurrently to policy integration, the Calico Enterprise address-groups controller integrates Panorama Address Groups, and {{site.prodname}} automatically maps the values to a {{site.prodname}} global network set.

The following example shows Address Groups mapped into a Calico Enterprise GlobalNetworkSet. After you verify that you have a GlobalNetworkSet, that's all you need. You can start using {{site.prodname}}'s robust network policy!

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
    firewall.tigera.io/address-group: 'my.address.group'
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

- You define the address group filter as a comma delimited list of Panorama tags, used to filter in all tagged Address Group updates.
- Each address group maps to a global network set in Kubernetes.
- The GlobalNetworkSet is labeled with a `firewall.tigera.io/address-group` key, and value equal to `<ADDRESS_GROUP_NAME>`.  

>**Note**: GlobalNetworkSet.metadata.name will be prefixed with `pan.` and either be: 1) `<ADDRESS_GROUP_NAME>`, if it is a Kubernetes (RFC1123) compliant name, or 2) a mapping to a Kubernetes (RFC1123) compliant name, suffixed with a unique hash value.


### Before you begin

**Supported {{site.prodname}} plaforms**
- Kubernetes/kubeadm, OpenShift, AWS using kOps, RKE, EKS, AKS, GKE, Tanzu Kubernetes Grid

**Manager UI tools**
- The scope of the Panorama integration is network policy only. The scope of the Panorama integration is mapping Panorama policy and address groups to Calico network policy and network sets only. Users with privileged access to Manager UI (via RBAC) can view tier, policies, and network sets managed by the integration add/create/delete network sets, and observe their usage in Service Graph tool. Policy lifecycle tools such as policy preview and staged network policy will not work for Panorama-transformed policies; these tools are only for {{site.prodname}} native policies.

**Supported version**
- Panorama v10

**Unsupported**
- Panorama IP ranges, IP wildcards
- Panorama rules defined in the `shared` device group
- Panorama user, device mappings

>**Note**: All actions that are not allow or deny map to deny.

**Recommended**
- Experience creating and administering Panorama rules as well as address, address group, and service objects

### How to

- [Create a Panorama API user](#create-a-panorama-api-user)
- [Create a Panorama policy config map](#create-a-panorama-policy-config-map)
- [Install Panorama username and password as secrets](#install-panorama-username-and-password-as-secrets)
- [Deploy the firewall policy integration controller in the Kubernetes cluster](#deploy-the-firewall-policy-integration-controller-in-the-kubernetes-cluster)
- [Verify the integration](#verify-the-integration)
- [Troubleshooting](#troubleshooting)

### Create a Panorama API user

The user must have read REST API access to rules, addresses, address groups and services in the appropriate device group and have read access to device groups.

### Create a Panorama policy config map

1. Create a namespace for the tigera-firewall-controller.

    ```bash
kubectl create namespace tigera-firewall-integration
    ```

2. Create a ConfigMap and add your Panorama device information in the data section. For example:

    ```bash
kubectl create configmap tigera-policy-integration-controller-config -n tigera-firewall-integration \
  --from-literal=panorama.host=__IPADDRESS_OF_PANORAMA__ \
  --from-literal=panorama.rules.filter="(tag1 OR tag2) AND tag3" \
  --from-literal=panorama.device-group="devicegroup1" \
  --from-literal=tigera.policy.integration.tier="mypolicytier" \
  --from-literal=tigera.policy.integration.tier.order=101 \
  --from-literal=firewall.policy.integration.log-level="info" \
  --from-literal=panorama.address-groups.filter="tag1, tag2, tag3"
    ```
    Where:
   
    | Field                      | Description                                                  |
    | -------------------------- | ------------------------------------------------------------ |
    | host                       | Panorama host address.      |
    | device-group               | Device group in which the Panorama rules reside in.      |
    | filter                     | The logical statement of Panorama tags used to filter the Panorama rules (eg. "tag1 AND tag2"). |
    | tier                       | The tier the Panorama policy belongs to. (default:"firewallpolicy")      |
    | tier-order                 | The Panorama policy tier order. (default: 101)     |
    | tags                       | The comma delimited set of Panorama tags used to filter in the address groups. |

    **Note**: Tag names with characters that do not follow the RFC1123 standard must be  encapsulated within single quotes. Invalid input will produce an error similar to: 
    ```
[ERROR] "failed to parse tags"
    ```
  
    **Note**: The `tags` field is used to filter in address groups is a comma delimited (eg. `"tag1, tag2, tag3`) list of Panorama tags. All address groups tagged with at least one corresponding tag will be mapped to a corresponding global network set in Kubernetes.

### Install Panorama username and password as secrets

Store each Panorama username and password as a secret in the `tigera-firewall-integration` namespace.

For example, in the Secret for Panorama, store its username as a secret, with key `panorama.username` and password as a secret, with key as `panorama.password`.

```bash
kubectl create secret generic panorama-access -n tigera-firewall-integration \
  --from-literal=panorama.username=__USERNAME_OF_PANORAMA__ \
  --from-literal=panorama.password=__PASSWORD_OF_PANORAMA__
```

#### Deploy the firewall policy integration controller in the Kubernetes cluster

{%- if page.version != "master" -%}
Add `tigera-pull-secret` into the namespace `tigera-firewall-integration`:
```bash
kubectl create secret generic tigera-pull-secret -n tigera-firewall-integration \
  --from-file=.dockerconfigjson=<pull-secrets.json> \
  --type=kubernetes.io/dockerconfigjson
```

{% endif %}
Create the manifest:

```bash
kubectl create -f {{ "/manifests/tigera-policy-integration.yaml" | absolute_url }}
```

### Verify the integration

1. Log into Panorama.
2. Select **Objects**, and create **Addresses**, **Address Groups** or **Services** used to define Panorama rules.
3. Select **Policies**, and create a new security **Pre** or **Post** **Rule**. 
3. In the Manager UI, click Network Policies in the left navbar and verify that the GlobalNetworkPolicies are created

    **Note**: A new **Zone** can be defined by clicking on **Add** and typing in the new name within the **Source** or **Destination** definition, while creating a Panorama rule.
    
    **Note**: For any Panorama rule to be reflected as a GlobalNetworkPolicy in Kubernets, at least one source or destination **Zone** must be defined.

#### Troubleshooting

Errors are logged or posted as events, which can be explored in the policy integration controller namespace:
```bash
kubectl get events --namespace=tigera-firewall-integration
```

**Panorama Policy controller was not configured**
    
The cause is either a connection failure between {{site.prodname}} and Panorama. Look in the debug logs for a `Client.Timeout` error similar to the following:
    
```
[DEBUG][1] util.go 62: Initialize client with hostname: 10.10.10.10
10.10.10.10: Retrieving API key
[ERROR][1] dynamic_address_groups_controller.go 137: Failed to instantiate a Panorama client error=Post "https://10.10.10.10/api": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
[FATAL][1] main.go 114: Failed to configure Panorama address groups controller
```

**Panorama device group is invalid**

A failure to query the specified device group in Panorama. The error will be logged; posted as an event similar to the following:
```
tigera-policy-integration-error   pod   tigera-policy-integration-controller-78b6c69db-6vm9w   Device group: "device_group1" does not exist
```

**Panorama rule filter is invalid**

The cause is attempting to use an invalid filter. The error will be logged and posted as an event similar to the following:
```
tigera-policy-integration-error   pod   tigera-policy-integration-controller-78b6c69db-6vm9w   failed to convert filter to selector: tag1 ADN tag2
```

**Tigera policy integration tier is invalid**

The cause is an invalid tier name. The controller will fail to start. Look in the debug logs for a `Invalid tier name` error similar to the following:
    
```
[DEBUG][1] config.go 86: Invalid tier name: fw$#454_4..3
```

**If a rule is deleted in Panorama policy that is used in a global network policy, what happens to the global network policy?**

The corresponding ingress/egress rules are permanently removed from all global network policies that mapped to the deleted Panorama rule. Removal happens after the polling interval times out (default: 10s).

**If an Address Group is deleted in Panorama, and is used in a global network set for a policy, what happens to the policy?**

The policy will work only until the next polling request to Panorama. The poll_interval may be defined in the tigera-panorama-controller-config ConfigMap (default: 10s). Once synchronized, the global network set will be deleted from the calico datastore; the policy will remain, but will not be enforced.

**If a Panorama object is disassociated with a rule in Panorama, and is reflected in a policy, what happens to the policy?**

The policy will be enforced only until the next polling request to Panorama. The poll_interval may be defined in the tigera-panorama-controller-config ConfigMap (default: 10s). Once synchronized, the global network policy will updated to exclude any Calico policy ingress/egress rule associated with the disassociated object in Panorama.

**Panorama IP is not supported in an Address Group**
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

**Invalid license**

If an invalid license is used refer to the logs for `License does not support creating resources` similar to the following:

```
[DEBUG][1] firewall_policy_integration_controller.go 341: failure to create tier: mypoltier error=Tier.projectcalico.org "projectcalico.org/tiers/mypoltier" is forbidden: License does not support creating resources for this API. Contact Tigera support or email licensing@tigera.io for further questions about changing/upgrading your license
```

### Above and beyond

- [Global network policy]({{site.baseurl}}/reference/resources/globalnetworkpolicy)
- [Global network set]({{site.baseurl}}/reference/resources/globalnetworkset)
- [Tiers]({{site.baseurl}}/security/tiered-policy)
- [DNS policy]({{site.baseurl}}/security/domain-based-policy)
