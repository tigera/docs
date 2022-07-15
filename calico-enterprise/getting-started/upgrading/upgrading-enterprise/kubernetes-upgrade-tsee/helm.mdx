---
title: Upgrade Calico Enterprise installed with Helm
description: Upgrade to a newer version of Calico Enterprise installed with Helm.
canonical_url: /maintenance/kubernetes-upgrade-tsee/helm
feature_name: upgrade_all_but_ocp
---

>**Note**: All upgrades in {{site.prodname}} are free with a valid license.
{: .alert .alert-info}

### Upgrades paths

Upgrading to {{site.prodname}} v3.14 from previous {{site.prodname}} versions other than v3.13 is currently unsupported.

>**Note**: Always check the [Release Notes]({{site.baseurl}}/release-notes/) for exceptions; limitations can override the above pattern.  
{: .alert .alert-info}

### Prerequisites

- Verify that your Kubernetes cluster is using Helm

   ```bash
   kubectl get tigerastatus
   ```
If the result is successful, then your installation is using Helm.

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

### Upgrade from 3.13 or later

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

1. Install the {{site.prodname}} custom resource definitions.

   ```bash
   kubectl apply -f {{ "/manifests/operator-crds.yaml" | absolute_url }}
   kubectl apply -f {{ "/manifests/prometheus-operator-crds.yaml" | absolute_url }}
   kubectl apply -f {{ "/manifests/eck-operator-crds.yaml" | absolute_url }}
   ```

1. Run the Helm upgrade command for `tigera-operator`
{%- if page.version == "master" -%}.

   ```bash
   helm upgrade calico-enterprise tigera-operator-v0.0.tgz \
   --set-file imagePullSecrets.tigera-pull-secret=<path/to/pull/secret>,tigera-prometheus-operator.imagePullSecrets.tigera-pull-secret=<path/to/pull/secret> \
   --namespace tigera-operator
   ```
{% else %}
   ```bash
   helm upgrade calico-enterprise tigera-operator-{% include chart_version_name %}.tgz \
   --set-file imagePullSecrets.tigera-pull-secret=<path/to/pull/secret>,tigera-prometheus-operator.imagePullSecrets.tigera-pull-secret=<path/to/pull/secret> \
   --namespace tigera-operator
   ```
{% endif %}

1. You can monitor progress with the following command:

   ```bash
   watch kubectl get tigerastatus
   ```

    **Note**: If there are any problems you can use `kubectl get tigerastatus -o yaml` to get more details.
    {: .alert .alert-info}
