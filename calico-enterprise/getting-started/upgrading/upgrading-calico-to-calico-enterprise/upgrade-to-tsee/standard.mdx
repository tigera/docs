---
title: Upgrade from Calico to Calico Enterprise
description: Steps to upgrade from open source Calico to Calico Enterprise.
canonical_url: /maintenance/upgrade-to-tsee/standard
ignore_installation_cr: true
cr_directory: manifests_cr
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

{{site.prodname}} only supports clusters with a Kubernetes datastore.
Please contact Tigera Support for assistance upgrading a cluster with an `etcdv3` datastore.

If your cluster already has {{site.prodname}} installed, follow the [Upgrading {{site.prodname}} from an earlier release guide]({{site.baseurl}}/maintenance/kubernetes-upgrade-tsee) instead.

For hybrid Linux and Windows clusters, ensure that your Windows nodes have at least 4 cores, 8GB RAM.

## Upgrade Calico to {{site.prodname}}

> **Note**: GKE upgrades from open source Calico are not currently supported.
{: .alert .alert-info}

### Before you begin

**Required**

- [Configure a storage class for {{site.prodname}}.]({{site.baseurl}}/getting-started/create-storage)

### Install {{site.prodname}}

{% tabs %}

<label:Kubernetes,active:true>
<%

{% include content/upgrade-operator-simple.md upgradeFrom="OpenSource" %}

%>

<label: EKS>
<%

{% include content/upgrade-operator-simple.md upgradeFrom="OpenSource" provider="EKS" %}

%>

<label: AKS>
<%
**Note**: For AKS clusters with a self-managed Calico installation, including AKS clusters with Calico CNI, follow the upgrade steps under the **Kubernetes** tab.
{: .alert .alert-info}

These upgrade instructions will upgrade your AKS clusters with Azure CNI and an AKS-managed Calico installation.

{% include content/upgrade-operator-simple.md upgradeFrom="OpenSource" provider="AKS" %}

%>
{% endtabs %}

Wait until the `apiserver` shows a status of `Available`, then proceed to the next section.

**Note**: If there are any problems you can use `kubectl get tigerastatus -o yaml` to get more details.
{: .alert .alert-info}

### Install the {{site.prodname}} license

In order to use {{site.prodname}}, you must install the license provided to you by Tigera.

```
kubectl create -f </path/to/license.yaml>
```

You can now monitor progress with the following command:

```
watch kubectl get tigerastatus
```


### Next steps

- [Configure access to {{site.prodname}} Manager UI]({{site.baseurl}}/getting-started/cnx/access-the-manager)
- [Authentication quickstart]({{site.baseurl}}/getting-started/cnx/authentication-quickstart)
