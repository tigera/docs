---
title: Configure federated services
description: Configure a federated service for cross-cluster service discovery for local clusters.
canonical_url: /multicluster/federation/services-controller
---

### Big picture

Configure local clusters to discover services across multiple clusters.

### Value

Use federate services discovery along with federated endpoint identity to extend and automate endpoints sharing. (Optional if you have your own service discovery mechanism.)

### Features

This how to guide uses the following {{site.prodname}} features:

- **Tigera Federated Service Controller**
- **federation.tigera.io/serviceSelector**

### Concepts

#### Federated services

A federated service (also called a backing service), is a set of services with consolidated endpoints. {{site.prodname}} discovers services across all clusters (both local cluster and remote clusters) and creates a "federated service" on the local cluster that encompasses all of the individual services.

Federated services are managed by the Tigera Federated Service Controller, which monitors and maintains endpoints for each locally-federated service. The controller does not change configuration on remote clusters.

A federated service looks similar to a regular Kubernetes service, but instead of using a pod selector, it uses an annotation. For example:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-federated
  namespace: default
  annotations:
    federation.tigera.io/serviceSelector: run == "my-app"
spec:
  ports:
  - name: my-app-ui
    port: 8080
    protocol: TCP
  type: ClusterIP
```

| Annotation | Description |
| --- | --- |
| `federation.tigera.io/serviceSelector` | Required field that specifies the services used in the federated service.  Format is a standard {{site.prodname}} selector (i.e. the same as {{site.prodname}} policy resources) and selects services based on their labels.  The selector annotation selects services, not pods.<br /><br />Only services in the same namespace as the federated service are included. This implies namespace names across clusters are linked (this is a basic premise of federated endpoint identity).<br /><br />If the value is incorrectly specified, the service is not federated and endpoint data is removed from the service. View the warning logs in the controller for any issues processing this value. |

**Syntax and rules**

- Services that you specify in the federated service must be in the same namespace or they are ignored. A basic assumption of federated endpoint identity is that namespace names are linked across clusters.
- If you specify a `spec.Selector` in a federated service, the service is not federated.
- You cannot federate another federated service. If a service has a federated services annotation, it is not included as a backing service of another federated service.
- The target port number in the federated service ports is not used.

**Match services using a label**

You can also match services using a label. The label is implicitly added to each service, but it does not appear in `kubectl` when viewing the service.


| Label | Description |
| --- | --- |
| `federation.tigera.io/remoteClusterName` | Label added to all remote services that correspond to the Remote Cluster Configuration name for the remote cluster. Use this label to restrict the clusters selected by the services. **Note**: The label is not added for services in the local cluster. |

**About endpoints**

- Do not manually create or manage endpoints resources; let the Tigera controller do all of the work. User updates to endpoint resources are ignored.
- Endpoints are selected only when the service port name and protocol in the federated service matches the port name and protocol in the backing service.
- Endpoint data configured in the federated service is slightly modified from the original data of the backing service. For backing services on remote clusters, the `targetRef.name` field in the federated service adds the `<original name>`. For example, `<Remote Cluster Configuration name>/<original name>`.

### Before you begin

**Required**

- [Configure federated endpoint identity]({{site.baseurl}}/multicluster/federation/kubeconfig)

### How to

- [Create service resources](#create-service-resources)
- [Create a federated service](#create-a-federated-service)
- [Access a federated service](#access-a-federated-service)

#### Create service resources

On each cluster that is providing a particular service, create your service resources as you normal would with the following requirements:

- Services must all be in the same namespace.
- Configure each service with a common label key and value to identify the common set of services across your clusters (for example, `run=my-app`).

Kubernetes manages the service by populating the service endpoints from the pods that match the selector configured in the service spec.

#### Configure a federated service

1. On a cluster that needs to access the federated set of pods that are running an application, create a
service on that cluster leaving the `spec selector` blank.
1. Set the `federation.tigera.io/serviceSelector` annotation to be a {{site.prodname}} selector that selects the previously-configured services using the matching label match (for example, `run == "my-app"`).

The Federated Services Controller manages this service, populating the service endpoints from all of the services that match the service selector configured in the annotation.

#### Access a federated service

Any application can access the federated service using the local DNS name for that service. The simplest way to access a federated service is through its corresponding DNS name.

By default, Kubernetes adds DNS entries to access a service locally. For a service called `my-svc` in the namespace
`my-namespace`, the following DNS entry would be added to access the service within the local cluster:

```
my-svc.my-namespace.svc.cluster.local
```

DNS lookup for this name returns the fixed ClusterIP address assigned for the federated service. The ClusterIP is translated in iptables to one of the federated service endpoint IPs, and is load balanced across all of the endpoints.

### Tutorial

#### Create a service

In the following example, the remote cluster defines the following service.

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    run: my-app
  name: my-app
  namespace: default
spec:
  selector:
    run: my-app
  ports:
  - name: my-app-ui
    port: 80
    protocol: TCP
    targetPort: 9000
  - name: my-app-console
    port: 81
    protocol: TCP
    targetPort: 9001
  type: ClusterIP
```

This service definition exposes two ports for the application `my-app`. One port for accessing a UI, and the other for accessing a management console. The service specifies a Kubernetes selector, which means the endpoints for this service are automatically populated by Kubernetes from matching pods within the services own cluster.

#### Create a federated service

To create a federated service on your local cluster that federates the web access port for both the local and remote service, you would create a service resource on your local cluster as follows:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-federated
  namespace: default
  annotations:
    federation.tigera.io/serviceSelector: run == "my-app"
spec:
  ports:
  - name: my-app-ui
    port: 8080
    protocol: TCP
  type: ClusterIP
```

The `spec.selector` is not specified so it will not be managed by Kubernetes. Instead, we use a `federation.tigera.io/selector` annotation, indicating that this is a federated service managed by the Federated Services Controller.

The controller matches the `my-app` services (matching the run label) on both the local and remote clusters, consolidates endpoints from the `my-app-ui` TCP port for both of those services. Because the federated service does not specify the `my-app-console` port, the controller does not include these endpoints in the federated service.

The endpoints data for the federated service is similar to the following. Note that the name of the remote cluster is included in `targetRef.name`.

```yaml
apiVersion: v1
kind: Endpoints
metadata:
  creationTimestamp: 2018-07-03T19:41:38Z
  annotations:
    federation.tigera.io/serviceSelector: run == "my-app"
  name: my-app-federated
  namespace: default
  resourceVersion: "701812"
  selfLink: /api/v1/namespaces/default/endpoints/my-app-federated
  uid: 1a0427e8-7ef9-11e8-a24c-0259d75c6290
subsets:
- addresses:
  - ip: 192.168.93.12
    nodeName: node1.localcluster.tigera.io
    targetRef:
      kind: Pod
      name: my-app-59cf48cdc7-frf2t
      namespace: default
      resourceVersion: "701655"
      uid: 19f5e914-7ef9-11e8-a24c-0259d75c6290
  ports:
  - name: my-app-ui
    port: 80
    protocol: TCP
- addresses:
  - ip: 192.168.0.28
    nodeName: node1.remotecluster.tigera.io
    targetRef:
      kind: Pod
      name: remotecluster/my-app-7b6f758bd5-ctgbh
      namespace: default
      resourceVersion: "701648"
      uid: 19e2c841-7ef9-11e8-a24c-0259d75c6290
  ports:
  - name: my-app-ui
    port: 80
    protocol: TCP
```

### Above and beyond

- [Federated identity and services example for AWS]({{site.baseurl}}/multicluster/federation/aws)
- [Federated service controller]({{site.baseurl}}/reference/kube-controllers/configuration)
