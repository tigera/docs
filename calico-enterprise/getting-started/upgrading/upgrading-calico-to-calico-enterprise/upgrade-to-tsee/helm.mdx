---
title: Upgrade Calico to Calico Enterprise installed with Helm
description: Upgrade to Calico Enterprise from Calico installed with Helm.
canonical_url: /maintenance/upgrade-to-tsee/helm
show_toc: false
---

>**Note**: All upgrades in {{site.prodname}} are free with a valid license.
{: .alert .alert-info}

### Upgrades paths

Upgrading to {{site.prodname}} v3.13 and above, from Calico 3.22 and below is currently unsupported.

### Upgrade from Calico to {{site.prodname}}

**Note**: The following steps assume the Calico deployment is installed on `tigera-operator` namespace. Replace with valid namespace otherwise.
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
   helm upgrade calico tigera-operator-v0.0.tgz \
   --set-file imagePullSecrets.tigera-pull-secret=<path/to/pull/secret>,tigera-prometheus-operator.imagePullSecrets.tigera-pull-secret=<path/to/pull/secret> \
   ```
{% else %}
   ```bash
   helm upgrade calico tigera-operator-{% include chart_version_name %}.tgz \
   --set-file imagePullSecrets.tigera-pull-secret=<path/to/pull/secret>,tigera-prometheus-operator.imagePullSecrets.tigera-pull-secret=<path/to/pull/secret> \
   ```
{% endif %}

1. Wait until the `apiserver` shows a status of `Available`, then proceed to the next section. You can monitor progress with the following command:

   ```bash
   watch kubectl get tigerastatus/apiserver
   ```

1. Install your {{ site.prodname }} license.

   ```bash
   kubectl apply -f </path/to/license.yaml>
   ```

1. Monitor progress, wait until all components show a status of `Available`, then proceed to the next step.

   ```bash
   watch kubectl get tigerastatus
   ```

    **Note**: If there are any problems you can use `kubectl get tigerastatus -o yaml` to get more details.
    {: .alert .alert-info}

1. Apply the following manifest to secure {{site.prodname}} with network policy:

   ```bash
   kubectl apply -f {{ "/manifests/tigera-policies.yaml" | absolute_url }}
   ```
