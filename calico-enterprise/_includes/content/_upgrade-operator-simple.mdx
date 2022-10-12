{%- if include.provider == "AKS" and include.upgradeFrom == "OpenSource" %}
1. Switch the active operator to the one that will be installed to the new namespace.
   First, download the helper script:
   ```bash
   curl -L -O {{ "/scripts/switch-active-operator.sh" | absolute_url }}
   ```

   Then switch the active operator. This will deactivate the currently running operator.
   ```bash
   chmod a+x ./switch-active-operator.sh
   ./switch-active-operator.sh tigera-operator-enterprise
   ```
{%- endif %}

1. Download the new manifests for Tigera operator.
   ```bash
{%- if include.provider == "AKS" %}
   curl -L -o tigera-operator.yaml {{ "/manifests/aks/tigera-operator-upgrade.yaml" | absolute_url }}
{%- else %}
   curl -L -O {{ "/manifests/tigera-operator.yaml" | absolute_url }}
{%- endif %}
   ```

1. Download the new manifests for Prometheus operator.

   **Note**: If you have an existing Prometheus operator in your cluster that you want to use, skip this step. To work with Calico Enterprise, your Prometheus operator must be v0.40.0 or higher.
   {: .alert .alert-info}

   ```bash
   curl -L -O {{ "/manifests/tigera-prometheus-operator.yaml" | absolute_url }}
   ```

1. If you previously [installed using a private registry]({{site.baseurl}}/getting-started/private-registry), you will need to
   [push the new images]({{site.baseurl}}/getting-started/private-registry/private-registry-regular#push-calico-enterprise-images-to-your-private-registry)
   and then [update the manifest]({{site.baseurl}}/getting-started/private-registry/private-registry-regular#run-the-operator-using-images-from-your-private-registry)
   downloaded in the previous step.

1. {% if include.upgradeFrom == "OpenSource" %}Apply{% else %}Replace{% endif %} the manifest for Tigera operator.
   ```bash
   kubectl {% if include.upgradeFrom == "OpenSource" %}apply --server-side --force-conflicts{% else %}replace{% endif %} -f tigera-operator.yaml
   ```

{%- if include.upgradeFrom != "OpenSource" %}
   **Note**: If you intend to update any `operator.tigera.io` or `projectcalico.org` resources to utilize new fields available in the update you must make sure you make those changes after applying the `tigera-operator.yaml`.
   {: .alert .alert-info}
{%- endif %}


1. If you downloaded the manifests for Prometheus operator from the earlier step, then {% if include.upgradeFrom == "OpenSource" %}create{% else %}replace{% endif %} them now.
   ```bash
   kubectl {% if include.upgradeFrom == "OpenSource" %}create{% else %}replace{% endif %} -f tigera-prometheus-operator.yaml
   ```

{%- if include.upgradeFrom == "OpenSource" %}
{%- if include.provider == "AKS" %}
  {% assign ns = "tigera-operator-enterprise" %}
{% else %}
  {% assign ns = "tigera-operator" %}
{%- endif %}

1. Install your pull secret.

   If pulling images directly from `quay.io/tigera`, you will likely want to use the credentials provided to you by your Tigera support representative. If using a private registry, use your private registry credentials instead.

   ```
   kubectl create secret generic tigera-pull-secret \
       --type=kubernetes.io/dockerconfigjson -n {{ ns }} \
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

{%- endif %}

{%- if include.upgradeFrom == "OpenSource" %}

1. Install the Tigera custom resources. For more information on configuration options available in this manifest, see [the installation reference]({{site.baseurl}}/reference/installation/api).
   ```bash
   {%- if include.provider == "EKS" %}
   kubectl apply -f {{ "/manifests/eks/custom-resources-upgrade-from-calico.yaml" | absolute_url }}
   {%- elsif include.provider == "AKS" %}
   kubectl apply -f {{ "/manifests/aks/custom-resources-upgrade-from-calico.yaml" | absolute_url }}
   {%- else %}
   kubectl apply -f {{ "/manifests/custom-resources-upgrade-from-calico.yaml" | absolute_url }}
   {%- endif %}
   ```

   Remove the opensource Calico apiserver resource if it exists.
   Check if multiple apiserver resources exist:
   ```bash
   kubectl get apiserver
   ```

   If a default apiserver resource exists, you will see output similar to this:
   ```
   $ kubectl get apiserver
   NAME            AGE
   default         18h
   tigera-secure   19h
   ```

   Remove the `default` apiserver:
   ```bash
   kubectl delete apiserver default
   ```

{%- endif %}
{%- if include.upgradeFrom != "OpenSource" %}

1. If your cluster has OIDC login configured, follow these steps:

   a.  Save a copy of your Manager for reference.
   ```bash
   kubectl get manager tigera-secure -o yaml > manager.yaml
   ```

   b.  Remove the deprecated fields from your Manager resource.
   ```bash
   kubectl patch manager tigera-secure --type merge -p '{"spec": null}'
   ```

   c.  If you are currently using v3.2 and are using OIDC with Kibana verify that you have the following resources in your cluster:
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

1. You can monitor progress with the following command:
   ```bash
   watch kubectl get tigerastatus
   ```

    **Note**: If there are any problems you can use `kubectl get tigerastatus -o yaml` to get more details.
    {: .alert .alert-info}

{% endif %}
