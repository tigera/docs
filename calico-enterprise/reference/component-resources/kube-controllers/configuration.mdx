---
title: Configuring the Calico Enterprise Kubernetes controllers
description: Calico Enterprise Kubernetes controllers monitor the Kubernetes API and perform actions based on cluster state.
---

The {{site.prodname}} Kubernetes controllers are deployed in a Kubernetes cluster. The different controllers monitor the Kubernetes API
and perform actions based on cluster state.

{% tabs %}
  <label:Operator,active:true>
<%

If you have installed Calico using the operator, see the [KubeControllersConfiguration](../resources/kubecontrollersconfig) resource instead.

%>

  <label:Manifest>
<%

The controllers are primarily configured through environment variables. When running
the controllers as a Kubernetes pod, this is accomplished through the pod manifest `env`
section.

## The {{site.imageNames["kubeControllers"]}} container

The `{{site.imageNames["kubeControllers"]}}` container includes the following controllers:

1. node controller: watches for the removal of Kubernetes nodes and removes corresponding data from {{site.prodname}}, and optionally watches for node updates to create and sync host endpoints for each node.
1. federation controller: watches Kubernetes services and endpoints locally and across all remote clusters, and programs
   Kubernetes endpoints for any locally configured service that specifies a service federation selector annotation.

### Configuring datastore access

The datastore type can be configured via the `DATASTORE_TYPE` environment variable. Only supported value is `kubernetes`.

#### kubernetes

When running the controllers as a Kubernetes pod, Kubernetes API access is [configured automatically][in-cluster-config] and
no additional configuration is required. However, the controllers can also be configured to use an explicit [kubeconfig][kubeconfig] file override to
configure API access if needed.

| Environment     | Description                                                        | Schema |
|-----------------|--------------------------------------------------------------------|--------|
| `KUBECONFIG`    | Path to a Kubernetes kubeconfig file mounted within the container. | path   |

### Other configuration

> **Note:** Whenever possible, prefer configuring the kube-controllers component using the [KubeControllersConfiguration]({{site.baseurl}}/reference/resources/kubecontrollersconfig) API resource,
> Some configuration options may not be available through environment variables.
{: .alert .alert-info}

The following environment variables can be used to configure the {{site.prodname}} Kubernetes controllers.

| Environment   | Description | Schema | Default |
| ------------- | ----------- | ------ | -------
| `DATASTORE_TYPE`      | Which datastore type to use | etcdv3, kubernetes | kubernetes
| `ENABLED_CONTROLLERS` | Which controllers to run    | namespace, node, policy, serviceaccount, workloadendpoint | policy,namespace,serviceaccount,workloadendpoint,node
| `LOG_LEVEL`           | Minimum log level to be displayed. | debug, info, warning, error | info
| `KUBECONFIG`          | Path to a kubeconfig file for Kubernetes API access | path |
| `SYNC_NODE_LABELS`    | When enabled, Kubernetes node labels will be copied to Calico node objects. | boolean | true
| `AUTO_HOST_ENDPOINTS` | When set to enabled, automatically create a host endpoint for each node. | enabled, disabled | disabled

## About each controller

### Node controller

The node controller has several functions.

- Garbage collects IP addresses.
- Automatically provisions host endpoints for Kubernetes nodes.

### Federation controller

The federation controller syncs Kubernetes federated endpoint changes to the {{site.prodname}} datastore.
The controller must have read access to the Kubernetes API to monitor `Service` and `Endpoints` events, and must
also have write access to update `Endpoints`.

The federation controller is disabled by default if `ENABLED_CONTROLLERS` is not explicitly specified.

This controller is valid for all {{site.prodname}} datastore types. For more details refer to the
[Configuring federated services]({{site.baseurl}}/multicluster/federation/services-controller) usage guide.

%>
{% endtabs %}

[in-cluster-config]: https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster/#accessing-the-api-from-a-pod
[kubeconfig]: https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/

