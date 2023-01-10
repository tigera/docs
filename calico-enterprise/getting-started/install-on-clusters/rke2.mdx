---
title: RKE2 - Rancher's Next Generation Kubernetes Distribution
description: Install Calico Enterprise on an RKE2 cluster.
canonical_url: '/getting-started/kubernetes/rke2'
---

### Big picture

Install {{site.prodname}} on Rancher's Next-generation Kubernetes Distribution (RKE2) clusters.

### Before you begin

**CNI support**

Calico CNI for networking with {{site.prodname}} network policy:

The geeky details of what you get:
{% include geek-details.html details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:VXLAN,Routing:BGP,Datastore:Kubernetes' %}

**Required**

- A [compatible RKE2 cluster]({{site.baseurl}}/getting-started/compatibility#rke2)
  
  For help, see {% include open-new-window.html text='Rancher Kubernetes Engine cluster' url='https://rancher.com/docs/rke/latest/en/' %}.

- {% include open-new-window.html text='Configure cluster with no CNI plugin' url='https://docs.rke2.io/install/configuration' %} using any of these methods:
  - RKE2 CLI: `--cni none`
  - Install script: `RKE2_CNI=none`
  - {% include open-new-window.html text='Configuration file' url='https://docs.rke2.io/install/configuration#configuration-file' %}: `cni: none`  

- Cluster meets [system requirements]({{site.baseurl}}/getting-started/kubernetes/requirements)

- A [Tigera license key and credentials]({{site.baseurl}}/getting-started/calico-enterprise).

- A `kubectl` environment with access to your cluster
  - Ensure you have the {% include open-new-window.html text='Kubeconfig file that was generated when you created the cluster' url='https://docs.rke2.io/cluster_access' %}.

- If using a Kubeconfig file locally, {% include open-new-window.html text='install and set up the Kubectl CLI tool' url='https://kubernetes.io/docs/tasks/tools/install-kubectl/' %}.

### How to

- [Install {{site.prodname}}](#install-calico-enterprise)
- [Install the {{site.prodname}} license](#install-the-calico-enterprise-license)

#### Install {{site.prodname}}

1. [Configure a storage class for {{site.prodname}}.]({{site.baseurl}}/getting-started/create-storage).

1. For RKE2 [CIS hardened clusters](https://docs.rke2.io/security/hardening_guide) with v1.24 or earlier, if the Tigera operator PSP is not installed, add it now.

   ```bash
   kubectl create -f {{ "/manifests/psp-tigera-operator.yaml" | absolute_url }}
   ```

1. Install the Tigera operator and custom resource definitions.

   ```bash
   kubectl create -f {{ "/manifests/tigera-operator.yaml" | absolute_url }}
   ```

1. Install the Prometheus operator and related custom resource definitions. The Prometheus operator will be used to deploy Prometheus server and Alertmanager to monitor {{site.prodname}} metrics.

   > **Note**: If you have an existing Prometheus operator in your cluster that you want to use, skip this step. To work with {{site.prodname}}, your Prometheus operator must be v0.40.0 or higher.
   {: .alert .alert-info}

   ```bash
   kubectl create -f {{ "/manifests/tigera-prometheus-operator.yaml" | absolute_url }}
   ```

1. Install your pull secret.

   If pulling images directly from `quay.io/tigera`, you can use the credentials provided to you by your Tigera support representative. If using a private registry, use your private registry credentials instead.

   ```bash
   kubectl create secret generic tigera-pull-secret \
       --type=kubernetes.io/dockerconfigjson -n tigera-operator \
       --from-file=.dockerconfigjson=<path/to/pull/secret>
   ```

   For the Prometheus operator, create the pull secret in the `tigera-prometheus` namespace and then patch the deployment.

   ```bash
   kubectl create secret generic tigera-pull-secret \
       --type=kubernetes.io/dockerconfigjson -n tigera-prometheus \
       --from-file=.dockerconfigjson=<path/to/pull/secret>
   kubectl patch deployment -n tigera-prometheus calico-prometheus-operator \
       -p '{"spec":{"template":{"spec":{"imagePullSecrets":[{"name": "tigera-pull-secret"}]}}}}'
   ```

1. Install any extra [Calico resources]({{site.baseurl}}/reference/resources) needed at cluster start using [calicoctl]({{site.baseurl}}/reference/calicoctl/overview).

1. Install the Tigera custom resources. For more information on configuration options available, see [the installation reference]({{site.baseurl}}/reference/installation/api).

   ```bash
   kubectl create -f {{ "/manifests/rancher/custom-resources-rke2.yaml" | absolute_url }}
   ```

   Monitor progress with the following command:

   ```bash
   watch kubectl get tigerastatus
   ```

   Wait until the `apiserver` shows a status of `Available`, then proceed to the next section.

#### Install the {{site.prodname}} license

```bash
kubectl create -f </path/to/license.yaml>
```

Monitor progress with the following command:

```bash
watch kubectl get tigerastatus
```

### Next steps

**Recommended**

- [Configure access to {{site.prodname}} Manager UI]({{site.baseurl}}/getting-started/cnx/access-the-manager)
- [Authentication quickstart]({{site.baseurl}}/getting-started/cnx/authentication-quickstart)
- [Configure your own identity provider]({{site.baseurl}}/getting-started/cnx/configure-identity-provider)

**Recommended - Networking**

- The default networking uses VXLAN encapsulation with BPG routing. For all networking options, see [Determine best networking option]({{site.baseurl}}/networking/determine-best-networking).

**Recommended - Security**

- [Get started with {{site.prodname}} tiered network policy]({{site.baseurl}}/security/tiered-policy)
