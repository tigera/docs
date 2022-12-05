---
title: Quickstart for Calico Enterprise on Kubernetes
description: Install Calico Enterprise on a single-host Kubernetes cluster for testing or development.
canonical_url: '/getting-started/kubernetes/quickstart'
---

### Big picture

Install {{site.prodname}} on a single-host Kubernetes cluster in approximately 15 minutes.

To deploy a cluster suitable for production, see [{{site.prodname}} on Kubernetes]({{site.baseurl}}/getting-started/kubernetes/).

### Before you begin

**CNI support**

Calico CNI for networking with {{site.prodname}} network policy:

The geeky details of what you get:
{% include geek-details.html details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:IPIP,Routing:BGP,Datastore:Kubernetes' %}

**Required**

A Linux host that meets the following requirements.

- x86-64
- 2CPU
- 12GB RAM
- 50GB free disk space
- Ubuntu Server 18.04
- Internet access
- {% include open-new-window.html text='Sufficient virtual memory' url='https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html' %}

### How to

- [Install Kubernetes](#install-kubernetes)
- [Install {{site.prodname}}](#install-calico-enterprise)
- [Install the {{site.prodname}} license](#install-the-calico-enterprise-license)
- [Log in to {{site.prodname}} Manager](#log-in-to-calico-enterprise-manager)

#### Install Kubernetes

1. {% include open-new-window.html text='Follow the Kubernetes instructions to install kubeadm' url='https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/' %}. For a compatible version for this release, see [Support and compatibility]({{site.baseurl}}/getting-started/compatibility#kubernetes-kubeadm).

   >**Note**: After installing kubeadm, do not power down or restart
   the host. Instead, continue directly to the next step.
   {: .alert .alert-info}

1. As a regular user with sudo privileges, open a terminal on the host that you installed kubeadm on.

1. Initialize the master using the following command.

   ```bash
   sudo kubeadm init --pod-network-cidr=192.168.0.0/16 \
   --apiserver-cert-extra-sans=127.0.0.1
   ```

   > **Note**: If 192.168.0.0/16 is already in use within your network you must select a different pod network
   > CIDR, replacing 192.168.0.0/16 in the above command.
   {: .alert .alert-info}

1. Execute the following commands to configure kubectl (also returned by `kubeadm init`).

   ```bash
   mkdir -p $HOME/.kube
   sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
   sudo chown $(id -u):$(id -g) $HOME/.kube/config
   ```

1. Remove master taint in order to allow kubernetes to schedule pods on the master node.

   ```bash
   kubectl taint nodes --all node-role.kubernetes.io/master-
   ```

#### Install {{site.prodname}}

1. [Configure a storage class for {{site.prodname}}.]({{site.baseurl}}/getting-started/create-storage)

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

When all components show a status of `Available`, proceed to the next section.

#### Log in to {{site.prodname}} Manager

1. Create network admin user "Jane".

   ```bash
   kubectl create sa jane -n default
   kubectl create clusterrolebinding jane-access --clusterrole tigera-network-admin --serviceaccount default:jane
   ```

1. Create a login token for use with the {{site.prodname}} UI.

   ```
   kubectl create token jane --duration=24h
   ```

   Copy the `token` from the above command to your clipboard for use in the next step.

   > **Note**: The token created above will expire after 24 hours.
   {: .alert .alert-info}

1. Set up a channel from your local computer to the {{site.prodname}} UI.

   ```bash
   kubectl port-forward -n tigera-manager svc/tigera-manager 9443
   ```

   Visit https://localhost:9443/ to log in to the {{site.prodname}} UI. Use the `token` from the previous step to authenticate.

Congratulations! You now have a single-host Kubernetes cluster with {{site.prodname}}.

### Next steps

- By default, your cluster networking uses IP in IP encapsulation with BGP routing. To review other networking options,
 see [Determine best networking option]({{site.baseurl}}/networking/determine-best-networking).
- [Get started with {{site.prodname}} tiered network policy]({{site.baseurl}}/security/tiered-policy)
