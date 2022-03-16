---
title: Helm
description: Install Calico Enterprise using Helm application package manager.
canonical_url: '/getting-started/kubernetes/helm'
---
### Big picture

Install {{ site.prodname }} on a deployed Kubernetes cluster using Helm.

### Before you begin

**Required**
- Helm Version 3 is required.
- [Credentials for the Tigera private registry and a license key]({{site.baseurl}}/getting-started/calico-enterprise)

### How to

The geeky details of what you get:
{% include geek-details.html details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:IPIP,Routing:BGP,Datastore:Kubernetes' %}

1. [Configure a storage class for {{site.prodname}}.]({{site.baseurl}}/getting-started/create-storage)

1. Get the Helm chart.
{%- if page.version == "master" -%}
   ```
   curl -O -L {{site.url}}/download/charts/master/tigera-operator-v0.0.tgz
   ```
{% else %}
   ```
   curl -O -L {{site.downloadsurl}}/ee/charts/tigera-operator-{% include chart_version_name %}.tgz
   ```
{% endif %}

1. Create the `tigera-operator` namespace.

   ```
   kubectl create namespace tigera-operator
   ```

1. Install the chart, passing in your image pull secrets.
   ```
   helm install calico-enterprise ./tigera-operator-{% include chart_version_name %}.tgz \
     --set-file imagePullSecrets.tigera-pull-secret=<path/to/pull/secret> \
     --namespace tigera-operator
   ```

2. Monitor progress, wait until `apiserver` shows a status of `Available`, then proceed to the next step.
   ```
   watch kubectl get tigerastatus
   ``` 

3. Install your {{ site.prodname }} license.
   ```
   kubectl apply -f </path/to/license.yaml>
   ```

4. Monitor progress, wait until all components show a status of `Available`, then proceed to the next step.
   ```
   watch kubectl get tigerastatus
   ```

5. Apply the following manifest to secure {{site.prodname}} with network policy:
   ```
   kubectl apply -f {{ "/manifests/tigera-policies.yaml" | absolute_url }}
   ```

### Next steps

**Recommended**

- [Configure access to {{site.prodname}} Manager UI]({{site.baseurl}}/getting-started/cnx/access-the-manager)
- [Authentication quickstart]({{site.baseurl}}/getting-started/cnx/authentication-quickstart)
- [Configure your own identity provider]({{site.baseurl}}/getting-started/cnx/configure-identity-provider)


**Recommended - Networking**

- The default networking is IP in IP encapsulation using BPG routing. For all networking options, see [Determine best networking option]({{site.baseurl}}/networking/determine-best-networking).

**Recommended - Security**

- [Get started with {{site.prodname}} tiered network policy]({{site.baseurl}}/security/tiered-policy)
