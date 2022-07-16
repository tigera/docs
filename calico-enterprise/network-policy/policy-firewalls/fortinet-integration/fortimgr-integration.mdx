---
title: Extend FortiManager firewall policies to Kubernetes
description: Extend FortiManager firewall policies to Kubernetes with {{site.prodname}}
canonical_url: '/security/fortinet-integration/fortimgr-integration'
feature_name: feature_generic_all
---

### Big picture

Use FortiManager firewall policies to secure workloads in your Kubernetes cluster.

### Value

The {{site.prodname}}/Fortinet integration lets you control Kubernetes clusters directly and apply policy 
using the FortiManager UI as the primary interface. This allows firewall administrators to leverage existing
tools and workflows as they learn and adopt Kubernetes orchestration at their own pace. 

### Features

This how-to guide uses the following {{site.prodname}} features:

- {{site.prodname}} **GlobalNetworkPolicy**
- {{site.prodname}} **Tiers**

### Concepts

#### Integration at a glance

This {{site.prodname}}/Fortinet solution lets you directly control Kubernetes policies using FortiManager.

The basic workflow is:

1. Determine the Kubernetes pods that you want to securely communicate with each other. 
1. Label these pods using a key-value pair where key is the `tigera.io/address-group`, and value is the pod matching a label name.
1. In the FortiManager, select the cluster’s ADOM, and create an address group using the key-value pair associated with the pods. 
1. Create firewall policies using the address groups for IPv4 Source address and IPv4 Destination Address, and select services and actions as you normally would to allow or deny the traffic. Under the covers, the {{site.prodname}} integration controller periodically reads the FortiManager firewall policies for your Kubernetes cluster, converts them to {{site.prodname}} global network policies, and applies them to clusters.
1. Use the {{site.prodname}} Manager UI to verify the integration, and then FortiManager UI to make all updates to policy rules.

>**Note**: The default value for reading FortiManager firewall policies is three seconds. To change the value, modify environment variable FW_FORTIMGR_EW_POLL_INTERVAL in FortiManager integration manifest; units are in seconds.
{: .alert .alert-info}

### Before you begin

**Supported version**
- FortiManager v6.4

**Required**
-  Pull secret that you used during [{{site.prodname}} installation]({{site.baseurl}}/getting-started/install-on-clusters/)
-  IPv4 CIDR’s or IP addresses of all Kubernetes nodes; this is required for FortiManager to treat Kubernetes nodes as trusted hosts.
-  Login access to [{{site.prodname}} Manager UI]({{site.baseurl}}/getting-started/cnx/access-the-manager)

**Recommended**
- Experience with [{{site.baseurl}} tiered policy]({{site.baseurl}}/security/tiered-policy) and [{{site.baseurl}} global network policy]({{site.baseurl}}/reference/resources/globalnetworkpolicy)
- Experience creating and administering FortiGate/FortiManager firewall policies

### How to

- [Create a tier](#create-a-tier)
- [Configure FortiManager to communicate with firewall controller](#configure-fortimanager-to-communicate-with-firewall-controller)
- [Create a FortiManager config map](#create-a-fortimanager-config-map)
- [Install FortiManager password as secrets](#install-fortimanager-password-as-secrets)
- [Deploy the firewall controller in the Kubernetes cluster](#deploy-the-firewall-controller-in-the-kubernetes-cluster)
- [Verify the integration](#verify-the-integration)

#### Create a tier

Create a [{{site.prodname}} tier]({{site.baseurl}}/security/tiered-policy) in the {{site.prodname}} Manager UI for each Kubernetes cluster you want to secure. We recommend that you create a new tier (rather than reusing an existing tier) for all global network policies created by the {{site.prodname}} integration controller.

### Configure FortiManager to communicate with firewall controller

1. Determine and note the CIDR’s or IP addresses of all Kubernetes nodes that can run the `tigera-firewall-controller`.   
   This is required to explicitly allow the `tigera-firewall-controller` to access the FortiManager API.
1. From system settings, create an Admin profile with Read-Write access for `Policy & Objects`.   
   For example: `tigera_api_user_profile`
1. Create a JSON API administrator and associate this user with the `tigera_api_user_profile` profile and add CIDR or IP address of your Kubernetes cluster nodes as `trusted hosts`.  
1. Note the username and password.

### Create a FortiManager config map

1. Create a namespace for the tigera-firewall-controller.

    ```bash
     kubectl create namespace tigera-firewall-controller
    ```

1. In this [FortiManager ConfigMap manifest]({{site.baseurl}}/manifests/fortimanager-device-configmap.yaml ), add your FortiManager device information in the data section: `tigera.firewall.fortimanager-policies`. For example:

   ```yaml
     tigera.firewall.fortimanager-policies: |
     - name: prod-east1
       ip: 3.2.1.4
       username: api_user
       adom: root
       tier: <tier-name>
       packagename: sacramento
       password:
         secretKeyRef:
           name: fortimgr-east1
           key: pwd-fortimgr-east1
     ```
    Where:
   
    | Field                      | Description                                                  |
    | -------------------------- | ------------------------------------------------------------ |
    | name                       | FortiManager device name.                                    |
    | ip                         | FortiManager Management IP address.                          |
    | adom                       | FortiManager ADOM name that manages Kubernetes cluster.      |
    | packagename                | FortiManager Firewall package. All firewall rules targeted for Kubernetes cluster are packed under this package. |
    | username                   | JSON api access account name to Read/Write FortiManager address objects. |
    | password                   | Secret in tigera-firewall-controller namespace, to store FortiManager password |
    | tier                       | Tier name you created in Calico Enterprise Manager UI        |
    | password.secretKeyRef.name | Name of the secret to store password.                        |
    | password.secretKeyRef.key  | Key name in the secret, which stores password.               |
   
1. Apply the manifest.

   ```bash
   kubectl apply -f {{ "/manifests/fortimanager-device-configmap.yaml" | absolute_url }}
   ```

### Install FortiManager password as secrets

Store each FortiManager password as a secret in the `tigera-firewall-controller` namespace.

For example, in the ConfigMap for FortiMgr `prod-east1`, store its password as a secret name as `fortimgr-east1`, with key as `pwd-fortimgr-east1`.

```bash
kubectl create secret generic fortimgr-east1 \
-n tigera-firewall-controller \
--from-literal=pwd-fortimgr-east1=<fortimgr-password>
```

#### Deploy the firewall controller in the Kubernetes cluster

1. Install your pull secret.
  
   ```bash
   kubectl create secret generic tigera-pull-secret \
   --from-file=.dockerconfigjson=<path/to/pull/secret> \
   --type=kubernetes.io/dockerconfigjson -n tigera-firewall-controller
   ```
1. Apply the manifest.

   ```bash
   kubectl apply -f {{ "/manifests/fortimanager.yaml" | absolute_url }}
   ```

### Verify the integration

1. Log in to FortiManager with the correct ADOM.
2. Select **Policy & Objects**, **Object Configuration**, and create new **Address Groups**.
3. Click **Policy packages** and select the Package assigned to your Kubernetes cluster.
4. Create a test firewall policy with the following fields: Name, IPv4 Source Address, IPv4 Destination Address, Service and Action.
5. Log in to the {{site.prodname}} Manager UI, and under the tier that you specified in the ConfigMap, verify that the GlobalNetworkPolicies are created.
