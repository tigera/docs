Apply the {{site.prodname}} manifests for the Prometheus operator.

{%- if include.operation == "install" %}
```bash
oc create -f {{ "/manifests/ocp/tigera-prometheus-operator.yaml" | absolute_url }}
```
{%- else %}
```bash
oc apply -f {{ "/manifests/ocp/tigera-prometheus-operator.yaml" | absolute_url }}
```
{%- endif %}

Create the pull secret in the `tigera-prometheus` namespace and then patch the Prometheus operator deployment.
Use the image pull secret provided to you by Tigera support representative.

```bash
oc create secret generic tigera-pull-secret \
    --type=kubernetes.io/dockerconfigjson -n tigera-prometheus \
    --from-file=.dockerconfigjson=<path/to/pull/secret>
oc patch deployment -n tigera-prometheus calico-prometheus-operator \
    -p '{"spec":{"template":{"spec":{"imagePullSecrets":[{"name": "tigera-pull-secret"}]}}}}'
```

> **Note**: If you have a different Prometheus operator separate from {{site.prodname}} in your cluster that you want to use, skip this section. To work with {{site.prodname}}, your Prometheus operator must be v0.40.0 or higher.
{: .alert .alert-info}

