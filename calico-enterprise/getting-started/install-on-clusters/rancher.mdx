---
title: Rancher Kubernetes Engine (RKE)
description: Install Calico Enterprise on an RKE cluster.
canonical_url: '/getting-started/kubernetes/rancher'
---


### Big picture

Install {{site.prodname}} as the required CNI for networking and/or network policy on Rancher-deployed clusters.

### Concepts

{{site.prodname}} supports the Calico CNI with {{site.prodname}} network policy:

The geeky details of what you get:
{% include geek-details.html details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:IPIP,Routing:BGP,Datastore:Kubernetes' %}

### Before you begin

**Required**

- A compatible {% include open-new-window.html text='Rancher Kubernetes Engine cluster' url='https://rancher.com/docs/rke/latest/en/' %} with version 1.3.3 and later. Note that RKE2 is a different Kubernetes distribution and [documented separately]({{site.baseurl}}/getting-started/kubernetes/rke2).
  - Configure your cluster with a {% include open-new-window.html text='Cluster Config File' url='https://rancher.com/docs/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/#cluster-config-file' %} and specify {% include open-new-window.html text='no network plugin' url='https://rancher.com/docs/rke/latest/en/config-options/add-ons/network-plugins/' %} by setting `plugin: none` under `network` in your configuration file.

- RKE cluster meets the [{{side.prodname}} requirements]({{site.baseurl}}/getting-started/kubernetes/requirements)

- [Credentials for the Tigera private registry and a license key]({{site.baseurl}}/getting-started/calico-enterprise).

- A `kubectl` environment with access to your cluster
  - Use {% include open-new-window.html text='Rancher kubectl Shell' url='https://rancher.com/docs/rancher/v2.x/en/cluster-admin/cluster-access/kubectl/' %} for access
  - Ensure you have the {% include open-new-window.html text='Kubeconfig file that was generated when you created the cluster' url='https://rancher.com/docs/rke/latest/en/installation/#save-your-files' %}.

- If using a Kubeconfig file locally, {% include open-new-window.html text='install and set up the Kubectl CLI tool' url='https://kubernetes.io/docs/tasks/tools/install-kubectl/' %}.

### How to

- [Install {{site.prodname}}](#install-calico-enterprise)
- [Install the {{site.prodname}} license](#install-the-calico-enterprise-license)


#### Install {{site.prodname}}

1. [Configure a storage class for {{site.prodname}}.]({{site.baseurl}}/getting-started/create-storage).

1. Install the Tigera operator and custom resource definitions.

   ```
   kubectl create -f {{ "/manifests/tigera-operator.yaml" | absolute_url }}
   ```

1. Install the Prometheus operator and related custom resource definitions. The Prometheus operator will be used to deploy Prometheus server and Alertmanager to monitor {{site.prodname}} metrics.

   > **Note**: If you have an existing Prometheus operator in your cluster that you want to use, skip this step. To work with {{site.prodname}}, your Prometheus operator must be v0.40.0 or higher.
   {: .alert .alert-info}

   ```
   kubectl create -f {{ "/manifests/tigera-prometheus-operator.yaml" | absolute_url }}
   ```

1. Install your pull secret.

   If pulling images directly from `quay.io/tigera`, you will likely want to use the credentials provided to you by your Tigera support representative. If using a private registry, use your private registry credentials instead.

   ```
   kubectl create secret generic tigera-pull-secret \
       --type=kubernetes.io/dockerconfigjson -n tigera-operator \
       --from-file=.dockerconfigjson=<path/to/pull/secret>
   ```

   For the Prometheus operator, create the pull secret in the `tigera-prometheus` namespace and then patch the deployment.

   ```
   kubectl create secret generic tigera-pull-secret \
       --type=kubernetes.io/dockerconfigjson -n tigera-prometheus \
       --from-file=.dockerconfigjson=<path/to/pull/secret>
   kubectl patch deployment -n tigera-prometheus calico-prometheus-operator \
       -p '{"spec":{"template":{"spec":{"imagePullSecrets":[{"name": "tigera-pull-secret"}]}}}}'
   ```

1. Install any extra [Calico resources]({{site.baseurl}}/reference/resources) needed at cluster start using [calicoctl]({{site.baseurl}}/reference/calicoctl/overview).

1. Install the Tigera custom resources. For more information on configuration options available in this manifest, see [the installation reference]({{site.baseurl}}/reference/installation/api).

   ```
   kubectl create -f {{ "/manifests/custom-resources.yaml" | absolute_url }}
   ```

   You can now monitor progress with the following command:

   ```
   watch kubectl get tigerastatus
   ```

   Wait until the `apiserver` shows a status of `Available`, then proceed to the next section.

#### Install the {{site.prodname}} license

In order to use {{site.prodname}}, you must install the license provided to you by Tigera.

```
kubectl create -f </path/to/license.yaml>
```

You can now monitor progress with the following command:

```
watch kubectl get tigerastatus
```


### Next steps

**Recommended**

- [Configure access to {{site.prodname}} Manager UI]({{site.baseurl}}/getting-started/cnx/access-the-manager)
- [Authentication quickstart]({{site.baseurl}}/getting-started/cnx/authentication-quickstart)
- [Configure your own identity provider]({{site.baseurl}}/getting-started/cnx/configure-identity-provider)

**Recommended - Networking**

- The default networking uses IP in IP encapsulation with BPG routing. For all networking options, see [Determine best networking option]({{site.baseurl}}/networking/determine-best-networking).

**Recommended - Security**

- [Get started with {{site.prodname}} tiered network policy]({{site.baseurl}}/security/tiered-policy)
