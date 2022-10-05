---
title: Mirantis Kubernetes Engine (MKE)
description: Install Calico Enterprise on an MKE cluster.
canonical_url: /getting-started/kubernetes/docker-enterprise
---

### Big picture

Install {{site.prodname}} on a Mirantis Kubernetes Engine (MKE) cluster (formerly Docker Enterprise).

### Before you begin

**CNI support**

Calico CNI for networking with {{site.prodname}} network policy:

The geeky details of what you get:
{% include geek-details.html details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:IPIP,Routing:BGP,Datastore:Kubernetes' %}

**Required**

- A [compatible MKE cluster]({{site.baseurl}}/getting-started/compatibility#mke) with:
   - A minimum of three nodes for non-production deployments
   - CNI flag set to unmanaged, `--unmanaged-cni` so UCP does not install the default {{site.prodname}} networking plugin

   For help, see {% include open-new-window.html text='Docker Enterprise' url='https://docs.docker.com/ee/' %}, and {% include open-new-window.html text='Docker EE Best Practices and Design Considerations' url='https://docs.mirantis.com/docker-enterprise/v3.0/dockeree-ref-arch/deploy-manage/best-practices-design.html' %}

- Install UCP control plane to access the cluster using {% include open-new-window.html text='Docker Universal Control Plane CLI-Based Access' url='https://docs.docker.com/ee/ucp/user-access/cli/' %}. After installing the control plane, enable the option "Allow all authenticated users, including service accounts, to schedule on all nodes, including UCP managers and DTR nodes."

- Cluster meets [system requirements]({{site.baseurl}}/getting-started/kubernetes/requirements)

- A [Tigera license key and credentials]({{site.baseurl}}/getting-started/calico-enterprise)

- Install {% include open-new-window.html text='Install kubectl' url='https://kubernetes.io/docs/tasks/tools/install-kubectl/' %}

### How to

- [Install {{site.prodname}}](#install-calico-enterprise)
- [Install the {{site.prodname}} license](#install-the-calico-enterprise-license)

#### Install {{site.prodname}}

1. [Configure a storage class for {{site.prodname}}]({{site.baseurl}}/getting-started/create-storage).

1. Configure Tigera operator role bindings for Docker EE.
   
   ```bash
   kubectl create clusterrolebinding tigera-operator-cluster-admin -n tigera-operator \
    --clusterrole cluster-admin --serviceaccount tigera-operator:tigera-operator
   ```

1. Install the Tigera operator and custom resource definitions.

   ```bash
   kubectl create -f {{ "/manifests/tigera-operator.yaml" | absolute_url }}
   ```

1. Install the Prometheus operator and related custom resource definitions. The Prometheus operator will be used to deploy Prometheus server and Alertmanager to monitor {{site.prodname}} metrics.

   >**Note**: If you have an existing Prometheus operator in your cluster that you want to use, skip this step. To work with {{site.prodname}}, your Prometheus operator must be v0.40.0 or higher.
   {: .alert .alert-info}

   ```bash
   kubectl create -f {{ "/manifests/tigera-prometheus-operator.yaml" | absolute_url }}
   ```

1. Install your pull secret.

   If pulling images directly from `quay.io/tigera`, you will likely want to use the credentials provided to you by your Tigera support representative. If using a private registry, use your private registry credentials instead.

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

1. Install any extra [{{site.prodname}} resources]({{site.baseurl}}/reference/resources) needed at cluster start using [calicoctl]({{site.baseurl}}/reference/calicoctl/overview).

1. Install the Tigera custom resources. For more information on configuration options available in this manifest, see [the installation reference]({{site.baseurl}}/reference/installation/api).

   ```bash
   kubectl create -f {{ "/manifests/custom-resources.yaml" | absolute_url }}
   ```

   Monitor progress with the following command:

   ```bash
   watch kubectl get tigerastatus
   ```

   Wait until the `apiserver` shows a status of `Available`, then proceed to the next section.

#### Install the {{site.prodname}} license

In order to use {{site.prodname}}, you must install the license provided to you by Tigera.

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
- [Configure an external identity provider]({{site.baseurl}}/getting-started/cnx/configure-identity-provider)

**Recommended - Networking**

- The default networking uses IP-in-IP with BPG routing. For all networking options, see [Determine best networking option]({{site.baseurl}}/networking/determine-best-networking).

**Recommended - Security**

- [Get started with {{site.prodname}} tiered network policy]({{site.baseurl}}/security/tiered-policy)
