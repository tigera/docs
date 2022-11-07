Apply the {{site.prodname}} manifests for the Prometheus operator. 

   > **Note**: Complete this step only if you are using the {{site.prodname}} Prometheus operator (including adding your own Prometheus operator). Skip this step if you are using [BYO Prometheus]({{site.baseurl}}/maintenance/monitor/support) that you manage yourself. 
   {: .alert .alert-info}

   {%- if include.operation == "install" %}
   ```bash
   oc create -f {{ "/manifests/ocp/tigera-prometheus-operator.yaml" | absolute_url }}
   ```
   {%- else %}
   ```bash
   oc apply -f {{ "/manifests/ocp/tigera-prometheus-operator.yaml" | absolute_url }}
   ```
   {%- endif %}

   Create the pull secret in the `tigera-prometheus` namespace and then patch the Prometheus operator deployment. Use the image pull secret provided to you by Tigera support representative.

   ```bash
   {% if include.upgradeFrom != "OpenSource"  -%}
   oc create secret generic tigera-pull-secret \
       --type=kubernetes.io/dockerconfigjson -n tigera-prometheus \
       --from-file=.dockerconfigjson=<path/to/pull/secret>
  {% endif %}
   oc patch deployment -n tigera-prometheus calico-prometheus-operator \
       -p '{"spec":{"template":{"spec":{"imagePullSecrets":[{"name": "tigera-pull-secret"}]}}}}'
   ```

