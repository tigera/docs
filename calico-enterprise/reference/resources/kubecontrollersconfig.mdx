---
title: Kubernetes controllers configuration
description: API for KubeControllersConfiguration resource.
canonical_url: '/reference/resources/kubecontrollersconfig'
---

A {{site.prodname}} [Kubernetes controllers]({{ site.baseurl }}/reference/kube-controllers/configuration) configuration resource (`KubeControllersConfiguration`) represents configuration options for the {{site.prodname}} Kubernetes controllers.

### Sample YAML

```yaml
apiVersion: projectcalico.org/v3
kind: KubeControllersConfiguration
metadata:
  name: default
spec:
  logSeverityScreen: Info
  healthChecks: Enabled
  prometheusMetricsPort: 9094
  controllers:
    node:
      reconcilerPeriod: 5m
      leakGracePeriod: 15m
      syncLabels: Enabled
      hostEndpoint:
        autoCreate: Disabled
```

### Kubernetes controllers configuration definition

#### Metadata

| Field | Description                                               | Accepted Values   | Schema |
|-------|-----------------------------------------------------------|-------------------|--------|
| name  | Unique name to describe this resource instance. Required. | Must be `default` | string |

- {{site.prodname}} automatically creates a resource named `default` containing the configuration settings, only the name `default` is used and only one object of this type is allowed. You can use [calicoctl]({{ site.baseurl }}/reference/calicoctl/overview) to view and edit these settings

#### Spec

| Field                  | Description                                               | Accepted Values                    | Schema | Default    |
|------------------------|-----------------------------------------------------------|------------------------------------|--------|------------|
| logSeverityScreen      | The log severity above which logs are sent to the stdout. | Debug, Info, Warning, Error, Fatal | string | Info       |
| healthChecks           | Enable support for health checks                          | Enabled, Disabled                  | string | Enabled    |
| prometheusMetricsPort  | Port on which to serve prometheus metrics.                | Set to 0 to disable, > 0 to enable. | TCP port | 9094 |
| controllers            | Enabled controllers and their settings                    |                                    | [Controllers](#controllers) | |

#### Controllers

| Field            | Description                                           |  Schema                                        |
|------------------|-------------------------------------------------------|------------------------------------------------|
| node             | Enable and configure the node controller              | omit to disable, or [NodeController](#nodecontroller) |
| federatedservices | Enable and configure the federated services controller | omit to disable, or [FederatedServicesController](#federatedservicescontroller)        |

#### NodeController

The node controller automatically cleans up configuration for nodes that no longer exist. Optionally, it can create host endpoints for all Kubernetes nodes.

| Field                              | Description                 | Accepted Values   | Schema | Default    |
|------------------------------------|-----------------------------|-------------------|--------|------------|
| reconcilerPeriod | Period to perform reconciliation with the {{site.prodname}} datastore | | [Duration string][parse-duration] | 5m |
| syncLabels | When enabled, Kubernetes node labels will be copied to {{site.prodname}} node objects. | Enabled, Disabled | string | Enabled |
| hostEndpoint | Controls allocation of host endpoints | | [HostEndpoint](#hostendpoint) | |
| leakGracePeriod | Grace period to use when garbage collecting suspected leaked IP addresses. | | [Duration string][parse-duration] | 15m |

#### HostEndpoint

| Field      | Description                                                      | Accepted Values   | Schema | Default    |
|------------|------------------------------------------------------------------|-------------------|--------|------------|
| autoCreate | When enabled, automatically create a host endpoint for each node | Enabled, Disabled | string | Disabled   |

#### FederatedServicesController

The federated services controller syncs Kubernetes services from remote clusters defined through [RemoteClusterConfigurations]({{ site.baseurl }}/reference/resources/remoteclusterconfiguration).

| Field            | Description                                                           | Schema                            | Default |
|------------------|-----------------------------------------------------------------------|-----------------------------------|---------|
| reconcilerPeriod | Period to perform reconciliation with the {{site.prodname}} datastore | [Duration string][parse-duration] | 5m      |

### Supported operations

| Datastore type        | Create  | Delete (Global `default`)  |  Update  | Get/List | Notes
|-----------------------|---------|----------------------------|----------|----------|------
| Kubernetes API server | Yes     | Yes                        | Yes      | Yes      |

[parse-duration]: https://golang.org/pkg/time/#ParseDuration
