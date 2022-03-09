---
title: Upgrade Calico Enterprise installed with Helm
description: Upgrade to a newer version of Calico Enterprise installed with Helm.
canonical_url: /maintenance/kubernetes-upgrade-tsee
show_toc: false
---

### Upgrades paths

- Upgrading to {{site.prodname}} v3.13 from previous {{site.prodname}} versions is currently unsupported.
- Contact Tigera Support to upgrade if your cluster is installed with Calico.

{% comment %} # TODO(dimitrin): Add back document for 3.14. {% endcomment %}
{% comment %}
### Upgrades paths

You can upgrade your cluster to a maximum of **two releases** from your existing version. For example, if you are on version 3.6, you can upgrade to 3.7, or you can upgrade directly to 3.8. However, you cannot upgrade beyond **two releases**; upgrading from 3.6 to 3.9 (three releases) is not supported. 

If you are several versions behind where you want to be, you must go through each group of two releases to get there. For example, if you are on version 3.6, and you want to get to 3.10, you can upgrade to 3.8, then upgrade from 3.8 directly to 3.10.

>**Note**: Always check the [Release Notes]({{site.baseurl}}/release-notes/) for exceptions; limitations can override the above pattern.  
{: .alert .alert-info}

### Prerequisites

- Verify that your Kubernetes cluster is using Helm
   ```bash
   kubectl get tigerastatus
   ```
If the result is successful, then your installation is using Helm.

- Contact Tigera Support to upgrade if your cluster:
   - Version is earlier than 3.0
   - Version is between v3.1 and v3.13
   - Is installed with Calico

### Prepare your cluster for the upgrade

During the upgrade the controller that manages Elasticsearch is updated. Because of this, the {{site.prodname}} LogStorage
CR is temporarily removed during upgrade. Features that depend on LogStorage are temporarily unavailable, among which
are the dashboards in the Manager UI. Data ingestion is temporarily paused and will continue when the LogStorage is
up and running again.

To retain data from your current installation (optional), ensure that the currently mounted persistent volumes
have their reclaim policy set to [retain data](https://kubernetes.io/docs/tasks/administer-cluster/change-pv-reclaim-policy/){:target="_blank"}.
Retaining data is only recommended for users that use a valid Elastic license. Trial licenses can get invalidated during
the upgrade.

If your cluster has Windows nodes and uses custom TLS certificates for log storage then, prior to upgrade, prepare and apply new certificates for [log storage]({{site.baseurl}}/security/comms/log-storage-tls) that include the required service DNS names.

### Upgrade from 3.0 or later

**Note**: These steps differ based on your cluster type. If you are unsure of your cluster type, look at the field `clusterManagementType` when you run `kubectl get installation -o yaml` before you proceed.
{: .alert .alert-info}

1. Get the Helm chart
{%- if page.version == "master" -%}.
   ```bash
   gsutil cp gs://tigera-helm-charts/tigera-operator-v0.0.tgz
   ```
{% else %}
   ```bash
   curl -O -L {{site.downloadsurl}}/ee/charts/tigera-operator-{% include chart_version_name %}.tgz
   ```
{% endif %}

1. Install the operator custom resource definitions.

   ```bash
   kubectl apply -f {{ "/manifests/operator-crds.yaml" | absolute_url }}
   ```

1. Run the Helm upgrade command for `tigera-operator`
{%- if page.version == "master" -%}.
   ```bash
   helm upgrade calico-enterprise tigera-operator-v0.0.tgz
   ```
{% else %}
   ```bash
   helm upgrade calico-enterprise tigera-operator-{% include chart_version_name %}.tgz
   ```
{% endif %}


1. If your cluster has OIDC login configured, follow these steps:

   a.  Save a copy of your Manager for reference.
   ```bash
   kubectl get manager tigera-secure -o yaml > manager.yaml
   ```

   b.  Remove the deprecated fields from your Manager resource.
   ```bash
   kubectl patch manager tigera-secure --type merge -p '{"spec": null}'
   ```

   c.  If you are currently using v3.2 and are using OIDC with Kibana, verify that you have the following resources in your cluster:
   ```bash
   kubectl get authentication tigera-secure
   kubectl get secret tigera-oidc-credentials -n tigera-operator
   ```
   If both of these resources are present, you can continue with the next step. Otherwise, use the instructions to [configure an identity provider]({{site.baseurl}}/getting-started/cnx/configure-identity-provider) to configure OIDC.

   d) Follow [configure an identity provider]({{site.baseurl}}/getting-started/cnx/configure-identity-provider).

1. If your cluster is a management cluster using v3.1 or older, apply a [ManagementCluster]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.ManagementCluster)
   CR to your cluster.
   ```bash
   kubectl apply -f - <<EOF
   apiVersion: operator.tigera.io/v1
   kind: ManagementCluster
   metadata:
     name: tigera-secure
   EOF
   ```

1. If your cluster is v3.7 or older, apply a new [Monitor]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.Monitor)
   CR to your cluster.

   ```bash
   kubectl apply -f - <<EOF
   apiVersion: operator.tigera.io/v1
   kind: Monitor
   metadata:
     name: tigera-secure
   EOF
   ```

1. Wait until the `apiserver` shows a status of `Available`, then proceed to the next section. You can monitor progress with the following command:

   ```bash
   watch kubectl get tigerastatus/apiserver
   ```

1. If your cluster is management or standalone cluster using v3.8 or older, follow these steps:
   
   a. Install the network policies to secure {{site.prodname}} component communications with ElasticSearch

   ```bash
   kubectl apply -f {{ "/manifests/tigera-policies-es-access.yaml" | absolute_url }}
   ```

   b. Wait until all components of tigerastatus shows a status of `Available`, then proceed to the next section. You can monitor progress with the following 

   ```bash
   watch kubectl get tigerastatus
   ```

1. You can monitor progress with the following command:
   ```bash
   watch kubectl get tigerastatus
   ```

    **Note**: If there are any problems you can use `kubectl get tigerastatus -o yaml` to get more details.
    {: .alert .alert-info}

1. Remove unused policies in your cluster.

   If your cluster is a **managed** cluster, run this command:

   ```bash
   kubectl delete -f {{ "/manifests/default-tier-policies-managed.yaml" | absolute_url }}
   ```

   For other clusters, run this command:

   ```bash
   kubectl delete -f {{ "/manifests/default-tier-policies.yaml" | absolute_url }}
   ```
{% endcomment %}
