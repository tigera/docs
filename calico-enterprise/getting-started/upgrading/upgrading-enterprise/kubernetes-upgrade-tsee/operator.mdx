---
title: Upgrade Calico Enterprise installed with the operator
description: Upgrading from an earlier release of Calico Enterprise with the operator.
canonical_url: /maintenance/kubernetes-upgrade-tsee/operator
show_toc: false
---

>**Note**: All upgrades in {{site.prodname}} are free with a valid license.
{: .alert .alert-info}

### Upgrades paths

You can upgrade your cluster to a maximum of **two releases** from your existing version. For example, if you are on version 3.6, you can upgrade to 3.7, or you can upgrade directly to 3.8. However, you cannot upgrade beyond **two releases**; upgrading from 3.6 to 3.9 (three releases) is not supported. 

If you are several versions behind where you want to be, you must go through each group of two releases to get there. For example, if you are on version 3.6, and you want to get to 3.10, you can upgrade to 3.8, then upgrade from 3.8 directly to 3.10. 

>**Note**: Always check the [Release Notes]({{site.baseurl}}/release-notes/) for exceptions; limitations can override the above pattern.  
{: .alert .alert-info}

### Prerequisites

Verify that your Kubernetes cluster is using a version of {{site.prodname}} installed with the operator, by running 
`kubectl get tigerastatus`. If the result is successful, then your installation is using the operator.

If your cluster is on a version earlier than 2.6 or does not use the operator, contact Tigera support to upgrade.

If your cluster has a Calico installation, contact Tigera support to upgrade.

### Prepare your cluster for the upgrade

During the upgrade the controller that manages Elasticsearch is updated. Because of this, the {{site.prodname}} LogStorage 
CR is temporarily removed during upgrade. Features that depend on LogStorage are temporarily unavailable, among which
are the dashboards in the Manager UI. Data ingestion is temporarily paused and will continue when the LogStorage is
up and running again.

To retain data from your current installation (optional), ensure that the currently mounted persistent volumes 
have their reclaim policy set to [retain data](https://kubernetes.io/docs/tasks/administer-cluster/change-pv-reclaim-policy/){:target="_blank"}.
Retaining data is only recommended for users that use a valid Elastic license. Trial licenses can get invalidated during 
the upgrade.

#### Windows

If your cluster has Windows nodes and uses custom TLS certificates for log storage, prior to upgrade, prepare and apply new certificates for [log storage]({{site.baseurl}}/security/comms/log-storage-tls) that include the required service DNS names.

For AKS only, upgrades beginning from {{site.prodname}} v3.11.2 to a newer version will automatically upgrade {{site.prodnameWindows}}. During the upgrade, Windows nodes will be tainted so new pods will not be scheduled until the upgrade of the node has finished. The {{site.prodnameWindows}} upgrade status can be monitored with: `kubectl get tigerastatus calico -oyaml`

For all other platforms or versions older than v3.11.2, upgrading {{site.prodnameWindows}} can be performed out-of-band with the {{site.prodname}} upgrade of the cluster. For each Windows node, [uninstall]({{site.baseurl}}/getting-started/windows-calico/maintain#uninstall-calico-enterprise-for-windows-from-windows-nodes) the {{site.prodnameWindows}} services, copy over the latest {{site.prodnameWindows}} installation archive, then proceed with the [installation]({{site.baseurl}}/getting-started/windows-calico/quickstart#install-calico-enterprise-for-windows).

#### Multi-cluster management

For {{site.prodname}} v3.5 and v3.7, upgrading multi-cluster management setups must include updating all managed and management clusters.

**Note**: These steps differ based on your cluster type. If you are unsure of your cluster type, look at the field `clusterManagementType` when you run `kubectl get installation -o yaml` before you proceed.
{: .alert .alert-info}

### Upgrade Calico Enterprise

{% tabs %}

<label:Kubernetes,active:true>
<%

{% include content/upgrade-operator-simple.md upgradeFrom="Enterprise" %}

%>

<label: AKS>
<%

> **Note**: If {{site.prodname}} was installed directly onto the AKS cluster, follow the upgrade instructions in the **Kubernetes** tab.
>
{: .alert .alert-info}

These AKS upgrade instructions apply only to AKS clusters which were upgraded to
{{site.prodname}} from Calico. Check whether the cluster was upgraded from Calico by
checking the namespace for the active operator:
```bash
kubectl get configmap -n calico-system active-operator -oyaml | grep active-namespace
```
If the `active-namespace` is `tigera-operator-enterprise`, then the cluster was
upgraded from Calico.

{% include content/upgrade-operator-simple.md upgradeFrom="Enterprise" provider="AKS" %}

%>

{% endtabs %}

