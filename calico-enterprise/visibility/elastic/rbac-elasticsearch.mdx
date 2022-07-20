---
title: Configure RBAC for Elasticsearch logs and events
description: Configure RBAC to control access to Elasticsearch logs and events.
canonical_url: /visibility/elastic/rbac-elasticsearch
feature_name: feature_generic_all
---

### Big picture

Configure fine-grained user access controls for flow logs, audit logs, DNS logs, and intrusion detection events.

### Value

Security teams and auditors require Elasticsearch logs and associated reports. Teams responsible for threat defense (suspicious IPs and domains), may have different roles. When sharing a user interface, it is critical to provide fine-grained RBAC. {{site.prodname}} lets you manage user access at the cluster, feature, and feature subset levels. For example, users without permissions to specific Elasticsearch resources (for example, DNS logs), will not see data displayed on pages that use the Elasticsearch resource.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **{{site.prodname}} Manager** with built-in Elasticsearch and Kibana instances

### Concepts

#### RBAC for logs and events

Elasticsearch resources are associated with the **Kubernetes API group**, `lma.tigera.io`. You can grant access to resources per cluster. The default cluster name for {{site.prodname}} is, `cluster`. As shown in the following table, each Elasticsearch resource is mapped to a specific RBAC resource name within the `lma.tigera.io` API group. In {{site.prodname}} Manager, Elasticsearch resources are called, **indexes or indices**.

| Elasticsearch access        | Kubernetes RBAC resource name | Description                                                  |
| --------------------------- | ----------------------------- | ------------------------------------------------------------ |
| tigera_secure_ee_flows      | flows                         | Access to indices with data for Flow logs.                             |
| tigera_secure_ee_audit*     | audit*                        | Access to indices with data for both {{site.prodname}} and Kubernetes audit logs. The UI currently uses this query for searching both Kubernetes and {{site.prodname}} audit logs. |
| tigera_secure_ee_audit_ee   | audit_ee                      | Access to indices with data for {{site.prodname}} audit logs.                                |
| tigera_secure_ee_audit_kube | audit_kube                    | Access to indices with data for Kubernetes audit logs                                        |
| tigera_secure_ee_events     | events                        | Access to indices with data for {{site.prodname}} intrusion detection events.                |
| kibana_login                | kibana_login                  | Allows an OIDC user to log in to Kibana and have read permissions for discover, visualize and dashboard.            |
| superuser                   | elasticsearch_superuser       | Grants superuser access for all Elastic related actions, which include Kibana user and license management.         |
| tigera_secure_ee_l7         | l7                            | Access to indices with data for L7 logs

> **Note**: Because the `lma.tigera.io` API group is used only for RBAC, and is not backed by an actual API, it does not provide access to any other Kubernetes resources. 
{: .alert .alert-info}

### Before you begin

**Required**

- A `tigera-network-admin` role with full permissions to create and modify resources. For help, see [Log in to {{site.prodname}} Manager]({{site.baseurl}}/getting-started/cnx/authentication-quickstart).

- To view Elasticsearch resources in {{site.prodname}} Manager, users must have [minimum permissions]({{site.baseurl}}/security/rbac-tiered-policies).

### How to

- [Create access to a specific Elasticsearch resource](#create-access-to-a-specific-elasticsearch-resource)
- [Allow user access to a specific Elasticsearch resource](#allow-user-access-to-a-specific-elasticsearch-resource)
- [Verify user access to a specific Elasticsearch resource](#verify-user-access-to-a-specific-elasticsearch-resource)
- [Create access to all Elasticsearch resources](#create-access-to-all-elasticsearch-resources)
- [Allow user access to all Elasticsearch resources](#allow-user-access-to-all-elasticsearch-resources)
- [Verify user access to all Elasticsearch resources](#verify-user-access-to-all-elasticsearch-resources)

#### Create access to a specific Elasticsearch resource

Create a `ClusterRole` with permissions to the resource using the table in the **Concepts** section. In this example, the ClusterRole named, `audit-ee-only` provides access to {{site.prodname}} audit logs using the `resourceNames: ["audit_ee"]`. The `apiGroups: ["lma.tigera.io"]` is required.

```
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: audit-ee-only
rules:
- apiGroups: ["lma.tigera.io"]
  resources: ["cluster"]
  resourceNames: ["audit_ee"]
  verbs: ["get"]
```

#### Allow user access to a specific Elasticsearch resource

To allow a user access to a specific Elasticsearch resource, create a `ClusterRoleBinding`. In the following example, the `ClusterRoleBinding` allows user **bob** access only to the resource, {{site.prodname}} audit logs (`audit-ee-only`).

```
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: bob-es-access
subjects:
- kind: User
  name: bob
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: audit-ee-only
  apiGroup: rbac.authorization.k8s.io
```

#### Verify user access to a specific Elasticsearch resource

Create a `SubjectAccessReview` spec to verify user access to a specific Elasticsearch resource. In the SubjectAccessReview spec, set the following:

- group: `lma.tigera.io`
- resource: `cluster`
- verb: `get`
- resource: a Kubernetes RBAC resource name
- user: username you are verifying 

>**Note**: When verifying the **`audit*` RBAC resource name** (which accesses both {{site.prodname}} and Kubernetes audit logs), create a `SubjectAccessReview` **only on `audit*`**; this provides the correct verification results. Do not create a `SubjectAccessReview` to query the individual `audit_ee` or `audit_kube` resources; results ("allowed: false") do not accurately reflect user access.   
{: .alert .alert-info}

```
kubectl create -o yaml -f - <<EOF
apiVersion: authorization.k8s.io/v1
kind: SubjectAccessReview
spec:
  resourceAttributes:
    group: lma.tigera.io
    resource: cluster
    name: audit_ee
    verb: get
  user: bob
EOF
```

View the `status` and `allowed` fields to verify that the `ClusterRoleBinding` is doing what you expect. In this example, **bob** is allowed access (`allowed: true`) using the `ClusterRoleBinding`, `"bob-es-access"` for the `audit-ee-only` resource.

```
apiVersion: authorization.k8s.io/v1
kind: SubjectAccessReview
metadata:
  creationTimestamp: null
spec:
  resourceAttributes:
    group: lma.tigera.io
    name: audit_ee
    resource: cluster
    verb: get
  user: bob
status:
  allowed: true
  reason: 'RBAC: allowed by ClusterRoleBinding "bob-es-access" of ClusterRole "audit-ee-only"
    to User "bob"'
```

#### Create access to all Elasticsearch resources

In a `ClusterRole` resource, set the field, `resourceNames: []` to allow access to all Elasticsearch resources. 

```
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: allow-all-es
rules:
- apiGroups: ["lma.tigera.io"]
  resources: ["cluster"]
  resourceNames: []
  verbs: ["get"]
```

#### Allow user access to all Elasticsearch resources

In this example, we create a binding that allows the user `jane` access to all Elasticsearch resources.

```
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: jane-allow-all-es
subjects:
- kind: User
  name: jane
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: allow-all-es
  apiGroup: rbac.authorization.k8s.io
```
#### Verify user access to all Elasticsearch resources

To verify if a user has access to all Elasticsearch resources, create a `SubjectAccessReview` and set the `name:` field with an empty string, `""` ("all"). 

```
kubectl create -o yaml -f - <<EOF
apiVersion: authorization.k8s.io/v1
kind: SubjectAccessReview
spec:
  resourceAttributes:
    group: lma.tigera.io
    resource: cluster
    name: ""
    verb: get
  user: bob
EOF
```

View the `status` and `allowed` fields to verify that bob cannot access any Elasticsearch resources (`allowed: false`).

```
apiVersion: authorization.k8s.io/v1
kind: SubjectAccessReview
metadata:
  creationTimestamp: null
spec:
  resourceAttributes:
    group: lma.tigera.io
    resource: cluster
    verb: get
  user: bob
status:
  allowed: false
  reason: no RBAC policy matched
```

### Above and beyond

- Configure [RBAC for tiered policies]({{site.baseurl}}/security/rbac-tiered-policies).
- Learn more about the [ManagementCluster]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.ManagementCluster) resource.
