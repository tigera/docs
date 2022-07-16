---
title: Extend Kubernetes to Fortinet firewall devices
description: Enable FortiGate firewalls to control traffic from Kubernetes workloads.
canonical_url: '/security/fortinet-integration/firewall-integration'
feature_name: feature_generic_all
---

### Big picture

Use {{site.prodname}} network policy to control traffic from Kubernetes clusters in your FortiGate firewalls.

### Value

As platform and security engineers, you want your apps to securely communicate with the external world. But you also want to secure the network traffic from the Kubernetes clusters using your Fortigate firewalls. Using the Fortinet/{{site.prodname}} integration, security teams can retain firewall responsibility, secure traffic using {{site.prodname}} network policy, which frees up time for ITOps.

### Features

This how-to guide uses the following {{site.prodname}} features:

- {{site.prodname}} **GlobalNetworkPolicy**
- {{site.prodname}} **Tiers**

### Concepts

### Integration at a glance

This {{site.prodname}}/Fortinet integration workflow lets you control egress traffic leaving the Kubernetes cluster. You create perimeter firewall policies in FortiManager and FortiGate that reference Kuberetes workloads. {{site.prodname}} acts as a conduit, using the `tigera-firewall-controller` and global network policies to pass Kubernetes workload information to FortiManager and Fortigate devices where policies are applied and enforced.

The basic workflow is:

1. Determine the Kubernetes pods that are allowed access outside the perimeter firewall.
1. Create {{site.prodname}} global network policies with selectors that match those pods. Each global network policy maps to an address group in the FortiGate firewall.
1. Deploy the `tigera firewall controller` in the Kubernetes cluster.
1. Create a ConfigMap with Fortinet firewall information.   
   The `tigera firewall controller` reads the ConfigMap, gets the FortiGate firewall IP address, API token, and source IP address selection with `node` or `pod`. In your Kubernetes cluster, the controller populates pod IPs or Kubernetes node IPs of selector matching pods in Fortigate address group objects.

### Before you begin

**Supported versions**

- FortiGate v6.2
- FortiManager v6.4

**Required**

-  Pull secret that you used during [{{site.prodname}} installation]({{site.baseurl}}/getting-started/install-on-clusters/)
-  IPv4 CIDR’s or IP addresses of all Kubernetes nodes; this is required for FortiManager to treat Kubernetes nodes as trusted hosts.

**Recommended**

- Experience creating and administering FortiGate/FortiManager firewall policies
- Experience using [{{site.prodname}} tiers]({{site.baseurl}}/reference/resources/tier) and [Global network policy]({{site.baseurl}}/reference/resources/globalnetworkpolicy)

### How to

- [Create tier and global network policy](#create-tier-and-global-network-policy)
- [Configure FortiGate firewall to communicate with firewall controller](#configure-fortigate-firewall-to-communicate-with-firewall-controller)
- [Configure FortiManager to communicate with firewall controller](#configure-fortimanager-to-communicate-with-firewall-controller)
- [Create a config map for address selection in firewall controller](#create-a-config-map-for-address-selection-in-firewall-controller)
- [Create a config map with FortiGate and FortiManager information](#create-a-config-map-with-fortigate-and-fortimanager-information)
- [Install FortiGate ApiKey and FortiManager password as secrets](#install-fortigate-apikey-and-fortimanager-password-as-secrets)
- [Deploy firewall controller in the Kubernetes cluster](#deploy-firewall-controller-in-the-kubernetes-cluster)

#### Create tier and global network policy

1. Create a tier for organizing global network policies.

    Create a new [Tier]({{site.baseurl}}/security/tiered-policy) to organize all Fortigate firewall global network policies in a single location. 
    
1. Note the tier name to use in a later step for the FortiGate firewall information config map.

1. Create a GlobalNetworkPolicy for address group mappings.

    For example, a GlobalNetworkPolicy can select a set of pods that require egress access to external workloads. In the following GlobalNetworkPolicy, the firewall controller creates an address group named, `default.production-microservice1` in the Fortigate firewall. The members of `default.production-microservice1` address group include IP addresses of nodes. Each node can host one or more pods whose label selector match with `env == 'prod' && role == 'microservice1'`. Each GlobalNetworkPolicy maps to an address group in FortiGate firewall.

    ```
    apiVersion: projectcalico.org/v3
    kind: GlobalNetworkPolicy
    metadata:
      name: default.production-microservice1
    spec:
      selector: "env == 'prod' && role == 'microservice1'"
      types:
      - Egress
      egress:
      - action: Allow
    ```
#### Configure FortiGate firewall to communicate with firewall controller

1. Determine and note the CIDR's or IP addresses of all Kubernetes nodes that can run the `tigera-firewall-controller`. 
    Required to explicitly allow the `tigera-firewall-controller` to access the FortiGate API.
1. Create an Admin profile with read-write access to Address and Address Group Objects. 
    For example: `tigera_api_user_profile`
1. Create a REST API Administrator, associate this user with the `tigera_api_user_profile` profile, and add the CIDR or IP address of your Kubernetes cluster nodes as trusted hosts. 
    For example:  `calico_enterprise_api_user`
1. Note the API key.

#### Configure FortiManager to communicate with firewall controller

1. Determine and note the CIDR's or IP addresses of all Kubernetes nodes that can run the `tigera-firewall-controller`. 
    Required to explicitly allow the tigera-firewall-controller to access the FortiManager API.
1. From system settings, create an Admin profile with Read-Write access for `Policy & Objects`. 
    For example: `tigera_api_user_profile`
1. Create a JSON API administrator, associate this user with the `tigera_api_user_profile` profile, and addthe  CIDR or IP address of your Kubernetes cluster nodes as `Trusted Hosts`.
1. Note the username and password.

#### Create a config map for address selection in firewall controller

1. Create a namespace for tigera-firewall-controller.

    ```bash
     kubectl create namespace tigera-firewall-controller
    ```

1. Create a config map with FortiGate firewall information.

    For example:

   ```bash
   kubectl -n tigera-firewall-controller create configmap  tigera-firewall-controller \
   --from-literal=tigera.firewall.policy.selector="projectcalico.org/tier == 'default'" \
   --from-literal=tigera.firewall.addressSelection="node"
   ```

    **ConfigMap values**

    | Field                            | Enter values...                                                                                                                                                                                                                                                                     |
    |----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | tigera.firewall.policy.selector  | The tier name with the global network policies with the Fortigate address group mappings.<br>For example, this selects the global network policies in the `default` tier:<br>`tigera.firewall.policy.selector: "projectcalico.org/tier == 'default'"                                |
    | tigera.firewall.addressSelection | The addressSelection for outbound traffic leaving the cluster.<br>For example, if outgoingNat is enabled in cluster and compute Node IP address is used "tigera.firewall.addressSelection == `node` or <br> If pod IP address used then "tigera.firewall.addressSelection == `pod`" |

#### Create a config map with FortiGate and FortiManager information

1. In the [Fortigate ConfigMap manifest]({{site.baseurl}}/manifests/fortinet-device-configmap.yaml), add your FortiGate firewall information in the data section, `tigera.firewall.fortigate`.

    Where:

    | Field                    | Description                                                                 |
    |--------------------------|-----------------------------------------------------------------------------|
    | name                     | FortiGate device name                                                       |
    | ip                       | FortiGate Management Ip address                                             |
    | apikey                   | Secret in tigera-firewall-controller namespace, to store FortiGate's APIKey |
    | apikey.secretKeyRef.name | Name of the secret to store APIKey.                                         |
    | apikey.secretKeyRef.key  | Key name in the secret, which stores APIKey                                 |


    For example:

    ```
    - name: prod-eastcoast-1
      ip: 1.2.3.1
      apikey:
        secretKeyRef:
          name: fortigate-east1
          key: apikey-fortigate-east1
    - name: prod-eastcoast-2
      ip: 1.2.3.2
      apikey:
        secretKeyRef:
          name: fortigate-east2
          key: apikey-fortigate-east2
    ```

1. In the [FortiManager ConfigMap manifest]({{site.baseurl}}/manifests/fortinet-device-configmap.yaml), add your FortiManager information in the data section, `tigera.firewall.fortimgr`.

    Where:
    
    | Field                      | Description                                                                    |
    |----------------------------|--------------------------------------------------------------------------------|
    | name                       | FortiManager device name                                                       |
    | ip                         | FortiManager Management Ip address                                             |
    | adom                       | FortiManager ADOM name to manage kubernetes cluster.                           |
    | username                   | JSON api access account name to Read/Write FortiManager address objects.       |
    | password                   | Secret in tigera-firewall-controller namespace, to store FortiManager password |
    | password.secretKeyRef.name | Name of the secret to store password.                                          |
    | password.secretKeyRef.key  | Key name in the secret, which stores password.                                 |

    For example:

    ```
    - name: prod-east1
      ip: 1.2.4.1
      username: api_user
      adom: root
      password:
        secretKeyRef:
          name: fortimgr-east1
          key: pwd-fortimgr-east1
    ```

**Note** If you are not using FortiManager in the integration, include only the following field in the ConfigMap data section. `tigera.firewall.fortimgr: |`
{: .alert .alert-info}

1. Apply the manifest.

   ```
   kubectl apply -f {{ "/manifests/fortinet-device-configmap.yaml" | absolute_url }}
   ```

#### Install FortiGate ApiKey and FortiManager password as secrets

1. Store each FortiGate API key as a secret in the `tigera-firewall-controller` namespace.
    For example, the FortiGate device, `prod-east1`, store its ApiKey as a secret name as `fortigate-east1`, with key as `apikey-fortigate-east1`. 

    ```
    kubectl create secret generic fortigate-east1 \
    -n tigera-firewall-controller \
    --from-literal=apikey-fortigate-east1=<fortigate-api-secret>
    ```

1. Store each FortiManager password as secret in the `tigera-firewall-controller` namespace.
    For example, for FortiMgr `prod-east1`, store its password as a secret name as `fortimgr-east1`, with key as `pwd-fortimgr-east1`. 

    ```
    kubectl create secret generic fortimgr-east1 \
    -n tigera-firewall-controller \
    --from-literal=pwd-fortimgr-east1=<fortimgr-password>
    ```

#### Deploy firewall controller in the Kubernetes cluster

1. Install your pull secret.

    ```
    kubectl create secret generic tigera-pull-secret \
    --from-file=.dockerconfigjson=<path/to/pull/secret> \
    --type=kubernetes.io/dockerconfigjson -n tigera-firewall-controller
    ```

1. Apply the manifest.

   ```
   kubectl apply -f {{ "/manifests/fortinet.yaml" | absolute_url }}
   ```

### Verify the integration

1. Log in to the FortiGate firewall user interface.
1. Under **Policy & Objects**, click **Addresses**.
1. Verify that your Kubernetes-related address objects and address group objects are created with the following comments "Managed by Tigera {{site.prodname}}".
 
Fof all FortiManagers that are configured to work with firewall-controller, log in to each FortiManager UI with the correct ADOM.
1. Click **Policy & Objects**, **Object Configuration**, **Addresses.
1. Verify that your Kubernetes-related address objects and address group objects are created with the following comments "Managed by Tigera {{site.prodname}}".

### Above and beyond

- [Extend FortiManager firewall policies to Kubernetes]({{site.baseurl}}/security/fortinet-integration/fortimgr-integration)
