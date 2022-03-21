---
title: Helm
description: Install Calico Enterprise using Helm application package manager.
canonical_url: '/getting-started/kubernetes/helm'
---
### Big picture

Install {{ site.prodname }} on a Kubernetes cluster using Helm 3.

### Value

Helm charts are a way to package up an application for Kubernetes (similar to `apt` or `yum` for operating systems). Helm is also used by tools like ArgoCD to manage applications in a cluster, taking care of install, upgrade (and rollback if needed), etc.

### Before you begin

**Required**
- Install Helm 3
- `kubeconfig` is configured to work with your cluster (check by running `kubectl get nodes`)
- [Credentials for the Tigera private registry and a license key]({{site.baseurl}}/getting-started/calico-enterprise)

**Supported**

- Standalone 
{% comment %}
TODO(dimitrin) Add supported cluster type after verification

management and managed clusters
{% endcomment %}

### Concepts

#### Operator based installation

In this guide, you install the Tigera Calico operator and custom resource definitions using the Helm 3 chart. The Tigera operator provides lifecycle management for {{ site.prodname }} exposed via the Kubernetes API defined as a custom resource definition.

### How to

The geeky details of what you get:
{% include geek-details.html details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:IPIP,Routing:BGP,Datastore:Kubernetes' %}

{%- if page.version == "master" -%}
#### Download the Helm chart

1. Install the Google cloud storage helm repo plugin:
```bash
helm plugin install https://github.com/viglesiasce/helm-gcs.git
   ```

1. Add the Calico helm repo
:
   ```bash
helm repo add tigera gs://tigera-helm-charts
   ```
{% else %}
#### Download the Helm chart

1. Get the Helm chart:
   ```bash
curl -O -L https://downloads.tigera.io/ee/charts/tigera-operator-{% include chart_version_name %}.tgz
   ```
{% endif %}

#### Customize the Helm chart

If you are installing on a cluster installed by EKS, GKE, AKS or Mirantis Kubernetes Engine (MKE), or you need to customize TLS certificates, you **must** customize this Helm chart by creating a `values.yaml` file. Otherwise, you can skip this step.

1. If you are installing on a cluster installed by EKS, GKE, AKS or Mirantis Kubernetes Engine (MKE), set the `kubernetesProvider` as described in the [Installation reference]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.Provider). For example:
   ```bash
echo '{ installation: {kubernetesProvider: EKS }}' > values.yaml
   ```

1. Add any other customizations you require to `values.yaml`. You might like to refer to the [helm docs ](https://helm.sh/docs/) 
{%- if page.version == "master" -%} 
   or run:
   ```bash
   helm show values tigera/tigera-operator --version v0.0
   ```
{% else %}.
   ```bash
   helm show values ./tigera-operator-{% include chart_version_name %}.tgz
   ```
{% endif %}
   to see the values that can be customized in the chart.

#### Install {{ site.prodname }}

1. [Configure a storage class for {{site.prodname}}]({{site.baseurl}}/getting-started/create-storage)

1. Create the `tigera-operator` namespace:
   ```bash
kubectl create namespace tigera-operator
   ```

1. Install the Tigera {{ site.prodname }} operator and custom resource definitions using the Helm chart, and passing in your image pull secrets

{%- if page.version == "master" -%}:
   ```bash
helm install calico-enterprise tigera/tigera-operator --version v0.0 \
--set-file imagePullSecrets.tigera-pull-secret=<path/to/pull/secret>,tigera-prometheus-operator.imagePullSecrets.tigera-pull-secret=.local/config/docker_cfg.json \
--namespace tigera-operator
   ```
or if you created a `values.yaml` above:
   ```bash
helm install calico projectcalico/tigera-operator --version v0.0 -f values.yaml \
--set-file imagePullSecrets.tigera-pull-secret=<path/to/pull/secret>,tigera-prometheus-operator.imagePullSecrets.tigera-pull-secret=.local/config/docker_cfg.json \
--namespace tigera-operator
   ```
{% else %}:
   ```bash
helm install calico-enterprise tigera-operator-{% include chart_version_name %}.tgz \
--set-file imagePullSecrets.tigera-pull-secret=<path/to/pull/secret>,tigera-prometheus-operator.imagePullSecrets.tigera-pull-secret=.local/config/docker_cfg.json \
--namespace tigera-operator
   ```
or if you created a `values.yaml` above:
   ```bash
helm install calico tigera-operator-{% include chart_version_name %}.tgz -f values.yaml \
--set-file imagePullSecrets.tigera-pull-secret=<path/to/pull/secret>,tigera-prometheus-operator.imagePullSecrets.tigera-pull-secret=.local/config/docker_cfg.json \
--namespace tigera-operator
   ```
{% endif %}

1. Monitor progress, wait until `apiserver` shows a status of `Available`, then proceed to the next step.
   ```bash
   watch kubectl get tigerastatus/apiserver
   ``` 
1. Install your {{ site.prodname }} license:
   ```bash
   kubectl apply -f </path/to/license.yaml>
   ```

1. Monitor progress, wait until all components show a status of `Available`, then proceed to the next step.
   ```bash
   watch kubectl get tigerastatus
   ```
   
1. Apply the following manifest to secure {{site.prodname}} with network policy:
   ```bash
   kubectl apply -f {{ "/manifests/tigera-policies.yaml" | absolute_url }}
   ```

Congratulations! You have now installed {{site.prodname}} using the Helm 3 chart.

### Next steps

**Multicluster Management** 

- [Create a {{site.prodname}} management cluster]({{site.baseurl}}/multicluster/mcm/create-a-management-cluster) 
- [Create a {{site.prodname}} managed cluster]({{site.baseurl}}/multicluster/mcm/create-a-managed-cluster)

**Recommended**

- [Configure access to {{site.prodname}} Manager UI]({{site.baseurl}}/getting-started/cnx/access-the-manager)
- [Authentication quickstart]({{site.baseurl}}/getting-started/cnx/authentication-quickstart)
- [Configure your own identity provider]({{site.baseurl}}/getting-started/cnx/configure-identity-provider)


**Recommended - Networking**

- The default networking is IP in IP encapsulation using BPG routing. For all networking options, see [Determine best networking option]({{site.baseurl}}/networking/determine-best-networking).

**Recommended - Security**

- [Get started with {{site.prodname}} tiered network policy]({{site.baseurl}}/security/tiered-policy)
