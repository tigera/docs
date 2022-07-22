---
title: Upgrade from Calico to Calico Enterprise on OpenShift
description: Steps to upgrade from open source Calico to Calico Enterprise on OpenShift.
canonical_url: /maintenance/upgrade-to-tsee-openshift
openshift_manifests_ignore_installation_cr: true
---

{% assign calico_minor_version = site.data.versions.first["calico"].minor_version %}
{% assign archive_path = site.data.versions.first["calico"].archive_path %}

{% if archive_path and archive_path != "" %}
{% capture calico_minor_version_with_path %}{{ archive_path }}/{{ calico_minor_version }}{% endcapture %}
{% else %}
{% assign calico_minor_version_with_path = calico_minor_version %}
{% endif %}

## Prerequisites

Ensure that your Kubernetes cluster is running with open source Calico on the latest {{ calico_minor_version | append: '.x' }} release.
If not, follow the [Calico upgrade documentation](https://docs.projectcalico.org/{{calico_minor_version_with_path}}/maintenance/kubernetes-upgrade){:target="_blank"} before continuing.

Ensure your Kubernetes cluster is using the Kubernetes datastore. If you are using an `etcdv3` datastore, or the cluster doesn't have a datastore, contact Tigera Support to upgrade the datastore.

Your Kubernetes cluster must not be running in production. Operator-based upgrades from open source Calico are not recommended for production clusters due to limited testing. Also, upgrades are not tested with open source Calico prior to v3.15.

If your cluster already has {{site.prodname}} installed, follow the [Upgrading {{site.prodname}} from an earlier release guide]({{site.baseurl}}/maintenance/openshift-upgrade) instead.


## Upgrade Calico to {{site.prodname}}

### Before you begin

**Required**

- [Configure a storage class for {{site.prodname}}.]({{site.baseurl}}/getting-started/create-storage)

### Install {{site.prodname}}

__Download the new manifests__

Make the manifests directory.

```bash
mkdir manifests
```

{% include content/openshift-manifests.md %}

__Add an image pull secret__

{% include content/openshift-pull-secret.md %}

> (Optional) If your cluster architecture requires any custom [{{site.prodname}} resources]({{site.baseurl}}/reference/resources) to function at startup, install them now using [calicoctl]({{site.baseurl}}/reference/calicoctl/overview).

__Install {{site.prodname}}__

1. Apply the Tigera operators and custom resource definitions.

   ```bash
   oc apply -f manifests/
   ```

2. (Optional) If your cluster architecture requires any custom [Calico resources]({{site.baseurl}}/reference/resources) to function at startup, install them now using [calicoctl]({{site.baseurl}}/reference/calicoctl/overview).

3. Apply the custom resources for enterprise features, see [the installation reference]({{site.baseurl}}/reference/installation/api).

   ```bash
   oc apply -f {{ "/manifests/ocp/tigera-enterprise-resources-upgrade.yaml" | absolute_url }} 
   ```

4. Patch installation.

   ```bash
   oc patch installations.operator.tigera.io default --type merge -p '{"spec":{"variant":"TigeraSecureEnterprise","imagePullSecrets":[{"name":"tigera-pull-secret"}]}}'
   ```

5. You can now monitor the upgrade progress with the following command:

   ```bash
   watch oc get tigerastatus
   ```

Wait until the `apiserver` shows a status of `Available`, then proceed to the next section.

**Note**: To troubleshoot problems, use `oc get tigerastatus -o yaml`.
{: .alert .alert-info}

### Install the {{site.prodname}} license

Install the {{site.prodname}} license provided to you by Tigera.

```
oc create -f </path/to/license.yaml>
```

{% include content/openshift-prometheus-operator.md %}

You can now monitor progress with the following command:

```
watch oc get tigerastatus
```

