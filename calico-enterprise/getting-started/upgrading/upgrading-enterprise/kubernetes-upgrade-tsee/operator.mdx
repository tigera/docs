---
title: Upgrade Calico Enterprise installed with the operator
description: Upgrading from an earlier release of Calico Enterprise with the operator.
canonical_url: /maintenance/kubernetes-upgrade-tsee
show_toc: false
---

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

If your cluster is using the Egress Gateway feature, and you are upgrading from a pre-v3.11.0 release to release v3.11.0 or later, you will need to follow the instructions [here]({{site.baseurl}}/networking/egress/egress-gateway-on-prem) after upgrading.

### Prepare your cluster for the upgrade

During the upgrade the controller that manages Elasticsearch is updated. Because of this, the {{site.prodname}} LogStorage 
CR is temporarily removed during upgrade. Features that depend on LogStorage are temporarily unavailable, among which
are the dashboards in the Manager UI. Data ingestion is temporarily paused and will continue when the LogStorage is
up and running again.

To retain data from your current installation (optional), ensure that the currently mounted persistent volumes 
have their reclaim policy set to [retain data](https://kubernetes.io/docs/tasks/administer-cluster/change-pv-reclaim-policy/){:target="_blank"}.
Retaining data is only recommended for users that use a valid Elastic license. Trial licenses can get invalidated during 
the upgrade.

If your cluster has Windows nodes and uses custom TLS certificates for log storage, prior to upgrade, prepare and apply new certificates for [log storage]({{site.baseurl}}/security/comms/log-storage-tls) that include the required service DNS names.

For {{site.prodname}} v3.5 and v3.7, upgrading multi-cluster management setups must include updating all managed and management clusters.

**Note**: These steps differ based on your cluster type. If you are unsure of your cluster type, look at the field `clusterManagementType` when you run `kubectl get installation -o yaml` before you proceed.
{: .alert .alert-info}

{% include content/upgrade-operator-simple.md upgradeFrom="Enterprise" %}
