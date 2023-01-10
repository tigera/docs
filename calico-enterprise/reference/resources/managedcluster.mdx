---
title: Managed Cluster
description: API for this Calico Enterprise resource. 
canonical_url: '/reference/resources/managedcluster'
---

A Managed Cluster resource (`ManagedCluster`) represents a cluster managed by a centralized management plane with a shared Elasticsearch.
The management plane provides central control of the managed cluster and stores its logs.

{{site.prodname}} supports connecting multiple {{site.prodname}} clusters as describe in the [Multi-cluster management] installation guide.

For `kubectl` commands, the following case-insensitive aliases may be used to specify the resource type on the CLI: 
`managedcluster`,`managedclusters`, `managedcluster.projectcalico.org`, `managedclusters.projectcalico.org` as well as
abbreviations such as `managedcluster.p` and `managedclusters.p`.

### Sample YAML

```yaml
apiVersion: projectcalico.org/v3
kind: ManagedCluster
metadata:
  name: managed-cluster
spec:
  operatorNamespace: tigera-operator
```

### Managed cluster definition

#### Metadata

| Field       | Description                 | Accepted Values   | Schema |
|-------------|-----------------------------|-------------------|--------|
| name     | Unique name to describe this resource instance. Required. | Alphanumeric string with optional `.`, `_`, or `-`. | string |

- `cluster` is a reserved name for the management plane and is considered an invalid value

#### Spec

| Field                | Description                                                                                                       | Accepted Values | Schema | Default |
|----------------------|-------------------------------------------------------------------------------------------------------------------|-----------------|--------|---------|
| installationManifest | Installation Manifest to be applied on a managed cluster infrastructure                                           | None            | string | `Empty` |
| operatorNamespace    | The namespace of the managed cluster's operator. This value is used in the generation of the InstallationManifest | None            | string | `Empty` |

- `installationManifest` field can be retrieved only once at creation time. Updates are not supported for this field.

In order to extract the installation manifest at creation time `-o jsonpath="{.spec.installationManifest}"` parameters 
can be used with a `kubectl` command. 

#### Status

Status represents the latest observed status of Managed cluster. The `status` is read-only for users and updated by the 
{{site.prodname}} components.
 
| Field       | Description                 | Schema | 
|-------------|-----------------------------|--------|
| conditions |  List of condition that describe the current status of the Managed cluster. | List of ManagedClusterStatusConditions |

**ManagedClusterStatusConditions**

Conditions represent the latest observed set of conditions for a Managed cluster. The connection between a management 
plane and managed plane will be reported as following:

- `Unkown` when no initial connection has been established
- `True` when both planes have an established connection
- `False` when neither planes have an established connection

| Field       | Description                 | Accepted Values   | Schema | Default    |
|-------------|-----------------------------|-------------------|--------|------------|
| type | Type of status that is being reported | - | string | `ManagedClusterConnected` |
| status | Status of the connection between a Managed cluster and management cluster | `Unkown`, `True`, `False` | string | `Unknown` |

[Multi-cluster management]({{site.baseurl}}/multicluster/mcm/create-a-management-cluster)
