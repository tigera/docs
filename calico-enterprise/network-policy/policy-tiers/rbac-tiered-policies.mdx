---
title: Configure RBAC for tiered policies
description: Configure RBAC to control access to policies and tiers. 
canonical_url: /security/rbac-tiered-policies
feature_name: feature_generic_all
---

### Big picture

Configure fine-grained user access controls for tiered policies.

### Value

Self-service is an important part of CI/CD processes for containerization and microservices. {{site.prodname}} provides fine-grained access control (RBAC) for:

- {{site.prodname}} policy and tiers 
- Kubernetes network policy

### Features

This how-to guide uses the following {{site.prodname}} features:

- **{{site.prodname}} API server**

### Concepts

#### Standard Kubernetes RBAC

{{site.prodname}} implements the standard **Kubernetes RBAC Authorization APIs** with `Role` and `ClusterRole` types. The {{site.prodname}} API server integrates with Kubernetes RBAC Authorization APIs as an extension API server. 

#### RBAC for policies and tiers

In {{site.prodname}}, global network policy and network policy resources are associated with a specific tier. Admins can configure access control for these {{site.prodname}} policies using standard Kubernetes `Role` and `ClusterRole` resource types. This makes it easy to manage RBAC for both Kubernetes network policies and {{site.prodname}} tiered network policies. RBAC permissions include managing resources using {{site.prodname}} Manager, and `kubectl`.

#### Fine-grained RBAC for policies and tiers

RBAC permissions can be split by resources ({{site.prodname}} and Kubernetes), and by actions (CRUD). Tiers should be created by administrators. Full CRUD operations on tiers is synonymous with full management of network policy. Full management to network policy and global network policy also requires `GET` permissions to 1) any tier a user can view/manage, and 2) the required access to the tiered policy resources. 

Here are a few examples of how you can fine-tune RBAC for tiers and policies.  

| **User**  | **Permissions**                                              |
| --------- | ------------------------------------------------------------ |
| Admin     | The default **tigera-network-admin** role lets you create, update, delete, get, watch, and list all {{site.prodname}} resources (full control). Examples of limiting Admin access: {::nomarkdown}<ul><li>List tiers only</li><li>List only specific tiers</li></ul>{:/}|
| Non-Admin | The default **tigera-ui-user** role allows users to only list {{site.prodname}} policy and tier resources. Examples of limiting user access: {::nomarkdown}<ul><li>Read-only access to all policy resources across all tiers, but only write access for NetworkPolicies with a specific tier and namespace.</li> <li>Perform any operations on NetworkPolicies and GlobalNetworkPolicies. </li><li>List tiers only.</li> <li>List or modify any policies in any tier. Fully manage only Kubernetes network policies in the **default** tier, in the **default** namespace, with read-only access for all other tiers.</li></ul>{:/} |

#### RBAC definitions for Calico Enterprise network policy

To specify per-tier RBAC for the {{site.prodname}} network policy and {{site.prodname}} global network policy, use pseudo resource kinds and names in the `Role` and `ClusterRole` definitions. For example,

```
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: tier-default-reader
rules:
- apiGroups: ["projectcalico.org"]
  resources: ["tiers"]
  resourceNames: ["default"]
  verbs: ["get"]
- apiGroups: ["projectcalico.org"]
  resources: ["tier.networkpolicies"]
  resourceNames: ["default.*"]
  verbs: ["get", "list"]
```
Where:
- **resources**: `tier.globalnetworkpolicies` and `tier.networkpolicies`
- **resourceNames**:
  - Blank - any policy of the specified kind across all tiers.
  - `<tiername>.*` - any policy of the specified kind within the named tier.
  - `<tiername.policyname>` - the specific policy of the specified kind. Because the policy name is prefixed with the tier name, this also specifies the tier.

### Before you begin...

**Required**

A **cluster-admin** role with full permissions to create and modify resources.

**Recommended**

A rough idea of your tiered policy workflow, and who should access what. See [Configure tiered policies]({{site.baseurl}}/security/tiered-policy).

### How to

- [Create Admin users, full permissions](#create-admin-users-full-permissions)
- [Create minimum permissions for all non-Admin users](#create-minimum-permissions-for-all-non-admin-users)

> **Note**: ` kubectl auth can-i` cannot be used the check RBAC for tiered policy. 
{: .alert .alert-info}

#### Create Admin users, full permissions

Create an Admin user with full access to the {{site.prodname}} Manager (as well as everything else in the cluster) using the following command. See the Kubernetes documentation to identify users based on your chosen [authentication method](https://kubernetes.io/docs/admin/authentication/){:target="_blank"}, and how to use the [RBAC resources](https://kubernetes.io/docs/reference/access-authn-authz/rbac/){:target="_blank"}.

```
kubectl create clusterrolebinding permissive-binding \
    --clusterrole=cluster-admin \
    --user=<USER>
```
#### Create minimum permissions for all non-Admin users

All users using {{site.prodname}} Manager should be able to create authorizationreviews and authorizationrequests as well as access
license information through the services/proxy https:tigera-api:8080.   

1. Download the [min-ui-user-rbac.yaml manifest]({{ "/getting-started/kubernetes/installation/hosted/cnx/demo-manifests/min-ui-user-rbac.yaml" | absolute_url }}).
   The roles and bindings in this file provide a minimum starting point for setting up RBAC for your users according to your specific security requirements.
   This manifest provides basic RBAC to view some statistical data in the UI but does not provide permissions to 
   view or modify any network policy related configuration.

1. Run the following command to replace <USER> with the name or email of the user you are providing permissions to:

   ```
   sed -i -e 's/<USER>/<name or email>/g' min-ui-user-rbac.yaml
   ```
1. Use the following command to install the bindings:

   ```
   kubectl apply -f min-ui-user-rbac.yaml
   ```

### Tutorial

This tutorial shows how to use RBAC to control access to resources and CRUD actions for a non-Admin user, John, with the username **john**.


The RBAC examples shown will include:

- [User cannot read policies in any tier](#user-cannot-read-policies-in-any-tier)
- [User can view all policies, and modify policies in the default namespace and tier](#user-can-view-all-policies-and-modify-policies-in-the-default-namespace-and-tier)
- [User can read policies only in both the default tier and namespace](#user-can-read-policies-only-in-both-the-default-tier-and-namespace)
- [User can read policies only in both a specific tier and in the default namespace](#user-can-read-policies-only-in-both-a-specific-tier-and-in-the-default-namespace)
- [User can only view a specific tier](#user-can-only-view-a-specific-tier)
- [User can read all policies across all tiers and namespaces](#user-can-read-all-policies-across-all-tiers-and-namespaces)
- [User has full control over policies only in both a specific tier and in the default namespace](#user-has-full-control-over-policies-only-in-both-a-specific-tier-and-in-the-default-namespace)

#### User cannot read policies in any tier

User 'john' is forbidden from reading policies in any tier (**default** tier, and **net-sec** tier).

When John issues the following command:

```
kubectl get networkpolicies.p
```

It returns:

```
Error from server (Forbidden): networkpolicies.projectcalico.org is forbidden: User "john" cannot list networkpolicies.projectcalico.org in tier "default" and namespace "default" (user cannot get tier)
```
{: .no-select-button}

Similarly, when John issues this command:

```
kubectl get networkpolicies.p -l projectcalico.org/tier==net-sec
```

It returns:

```
Error from server (Forbidden): networkpolicies.projectcalico.org is forbidden: User "john" cannot list networkpolicies.projectcalico.org in tier "net-sec" and namespace "default" (user cannot get tier)
```
{: .no-select-button}

> **Note**: The .p' extension (`networkpolicies.p`) is short 
  for "networkpolicies.projectcalico.org" and used to
  differentiate it from the Kubernetes NetworkPolicy resource and
  the underlying CRDs (if using the Kubernetes Datastore Driver).
{: .alert .alert-info}

> **Note**: The label for selecting a tier is `projectcalico.org/tier`.
  When a label selector is not specified, the server defaults the selection to the
  `default` tier. Alternatively, a field selector (`spec.tier`) may be used to select
  a tier.
  ```
  kubectl get networkpolicies.p --field-selector spec.tier=net-sec
  ```
{: .alert .alert-info}

#### User can view all policies, and modify policies in the default namespace and tier

1. Download the [`read-all-crud-default-rbac.yaml` manifest]({{ "/getting-started/kubernetes/installation/hosted/cnx/demo-manifests/read-all-crud-default-rbac.yaml" | absolute_url }}).

1. Run the following command to replace `<USER>` with the `name or email` of
   the user you are providing permissions to:

   ```
   sed -i -e 's/<USER>/<name or email>/g' read-all-crud-default-rbac.yaml
   ```

1. Use the following command to install the bindings:

   ```
   kubectl apply -f read-all-crud-default-rbac.yaml
   ```

The roles and bindings in this file provide the permissions to read all policies across all tiers and to fully manage
policies in the **default** tier and **default** namespace. This file includes the minimum required `ClusterRole` and `ClusterRoleBinding` definitions for all UI users (see `min-ui-user-rbac.yaml` above).

#### User can read policies only in both the default tier and namespace

In this example, we give user 'john' permission to read policies only in both the **default** tier and namespace.

```yaml
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: tigera-example-get-default-tier
rules:
# To access Calico policy in a tier, the user requires "get" access to that tier.
- apiGroups: ["projectcalico.org"]
  resources: ["tiers"]
  resourceNames: ["default"]
  verbs: ["get"]

---

kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: tigera-example-read-policies-in-default-tier
rules:
# This allows "get" and "list" of the Calico NetworkPolicy resources in the default tier.
- apiGroups: ["projectcalico.org"]
  resources: ["tier.networkpolicies"]
  resourceNames: ["default.*"]
  verbs: ["get", "list"]

---

# tigera-example-get-default-tier is applied globally
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: john-can-get-default-tier
subjects:
- kind: User
  name: john
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: tigera-example-get-default-tier
  apiGroup: rbac.authorization.k8s.io

---

# tigera-example-read-policies-in-default-tier is applied per-namespace
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: john-can-read-policies-in-default-tier-and-namespace
subjects:
- kind: User
  name: john
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: tigera-example-read-policies-in-default-tier
  apiGroup: rbac.authorization.k8s.io
```

With the above, user john is able to list all NetworkPolicy resources in the **default** tier:

```bash
kubectl get networkpolicies.p --all-namespaces
```

With some example policies on the cluster, returns:

```
NAMESPACE   NAME                                        CREATED AT
blue        default.calico-np-blue-ns-default-tier      2021-07-26T09:05:11Z
default     default.calico-np-default-ns-default-tier   2021-07-26T09:05:11Z
green       default.calico-np-green-ns-default-tier     2021-07-26T09:05:13Z
red         default.calico-np-red-ns-default-tier       2021-07-26T09:05:12Z
yellow      default.calico-np-yellow-ns-default-tier    2021-07-26T09:05:13Z
```
As intended, user john can only examine those in the **default** namespace:

```bash
kubectl get networkpolicies.p default.calico-np-green-ns-default-tier -o yaml -n=green
```

Correctly returns:

```
Error from server (Forbidden): networkpolicies.projectcalico.org "default.calico-np-green-ns-default-tier" is forbidden: User "john" cannot get networkpolicies.projectcalico.org in tier "default" and namespace "green"
```
{: .no-select-button}

John also still cannot access tier **net-sec**, as intended:

```bash
kubectl get networkpolicies.p -l projectcalico.org/tier==net-sec
```

This returns:

```
Error from server (Forbidden): networkpolicies.projectcalico.org is forbidden: User "john" cannot list networkpolicies.projectcalico.org in tier "net-sec" and namespace "default" (user cannot get tier)
```
{: .no-select-button}

#### User can read policies only in both a specific tier and in the default namespace

Let's assume that the kubernetes-admin gives user 'john' the permission to list the policies in tier **net-sec**, but only examine the detail of the policies that are also in the **default** namespace.
To provide these permissions to user 'john', use the following `ClusterRoles`,`ClusterRoleBinding` and `RoleBinding`.

```yaml
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: tigera-example-get-net-sec-tier
rules:
# To access Calico policy in a tier, the user requires "get" access to that tier.
- apiGroups: ["projectcalico.org"]
  resources: ["tiers"]
  resourceNames: ["net-sec"]
  verbs: ["get"]

---

kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: tigera-example-read-policies-in-net-sec-tier
rules:
# This allows "get" and "list" of the Calico NetworkPolicy resources in the net-sec tier.
- apiGroups: ["projectcalico.org"]
  resources: ["tier.networkpolicies"]
  resourceNames: ["net-sec.*"]
  verbs: ["get", "list"]

---

# tigera-example-get-net-sec-tier is applied globally
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: john-can-get-net-sec-tier
subjects:
- kind: User
  name: john
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: tigera-example-get-net-sec-tier
  apiGroup: rbac.authorization.k8s.io

---

# tigera-example-read-policies-in-net-sec-tier is applied per-namespace
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: john-can-read-policies-in-net-sec-tier-and-namespace
subjects:
- kind: User
  name: john
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: tigera-example-read-policies-in-net-sec-tier
  apiGroup: rbac.authorization.k8s.io
```

#### User can only view a specific tier

In this example, the following `ClusterRole` and `ClusterRoleBinding` can be used to provide 'get' access to the **net-sec**
tier. This has the effect of making the **net-sec** tier visible in the {{site.prodname}} Manager (including listing the names of the policies it contains).

However, to modify or view the details of policies within the **net-sec** tier, additional RBAC permissions would be required.

```yaml
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: tigera-example-make-net-sec-tier-visible
rules:
# To access Calico policy in a tier, the user requires "get" access to that tier.
- apiGroups: ["projectcalico.org"]
  resources: ["tiers"]
  resourceNames: ["net-sec"]
  verbs: ["get"]

---

# tigera-example-make-net-sec-tier-visible is applied globally
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: john-can-view-the-net-sec-tier
subjects:
- kind: User
  name: john
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: tigera-example-make-net-sec-tier-visible
  apiGroup: rbac.authorization.k8s.io
```

#### User can read all policies across all tiers and namespaces

In this example, a single `ClusterRole` is used to provide read access to all policy resource types across all tiers. In this case, there is no need to use both `ClusterRoleBindings` and `RoleBindings` to map these abilities to the target user, because the intention is to for the policy to apply to all current and future namespaces on the cluster, so a `ClusterRoleBinding` provides the desired granularity.

```yaml
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: tigera-example-all-tiers-and-namespaces-policy-reader
rules:
# To access Calico policy in a tier, the user requires "get" access to that tier.
# Not specifying any specific "resourceNames" provides access to all tiers.
- apiGroups: ["projectcalico.org"]
  resources: ["tiers"]
  verbs: ["get"]
# This allows read access to the Kubernetes NetworkPolicy resources (these are always in the default tier).
- apiGroups: ["networking.k8s.io", "extensions"]
  resources: ["networkpolicies"]
  verbs: ["get","watch","list"]
# This allows read access to the Calico NetworkPolicy and GlobalNetworkPolicies.
# Not specifying any specific "resourceNames" provides access to them in all tiers.
- apiGroups: ["projectcalico.org"]
  resources: ["tier.networkpolicies","tier.globalnetworkpolicies"]
  verbs: ["get","watch","list"]

---

# tigera-example-all-tiers-and-namespaces-policy-reader is applied globally, with a single ClusterRoleBinding,
# since all the rules it contains apply to all current and future namespaces on the cluster.
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: read-all-tier
subjects:
- kind: User
  name: john
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: tigera-example-all-tiers-and-namespaces-policy-reader
  apiGroup: rbac.authorization.k8s.io
```

#### User has full control over policies only in both a specific tier and in the default namespace

In this example, two `ClusterRole` objects are used to provide full access control of Calico NetworkPolicy
resource types in the **net-sec** tier:
-  The `tiers` resource is bound to a user using a `ClusterRoleBinding`, because it is a global resource.
   This results in the user having the ability to read the contents of the tier across all namespaces.
-  The `networkpolicies` resources are bound to a user using a `RoleBinding`, because the aim in this
   case was to make them CRUD-able only in the default namespace.
   You only need this one `ClusterRole` to be defined, but it can be applied to different namespaces
   using additional `RoleBinding` objects. If the intention was to apply it to all current and future namespaces,
   a `ClusterRoleBinding` could be used.

```yaml
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: tigera-example-get-net-sec-tier
rules:
# To access Calico policy in a tier, the user requires "get" access to that tier.
- apiGroups: ["projectcalico.org"]
  resources: ["tiers"]
  resourceNames: ["net-sec"]
  verbs: ["get"]

---

kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: tigera-example-crud-policies-in-net-sec-tier
rules:
# This allows full CRUD access to the Calico NetworkPolicy resources in the net-sec tier.
- apiGroups: ["projectcalico.org"]
  resources: ["tier.networkpolicies"]
  resourceNames: ["net-sec.*"]
  verbs: ["*"]

---

# tigera-example-get-net-sec-tier is applied globally
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: john-can-get-net-sec-tier
subjects:
- kind: User
  name: john
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: tigera-example-get-net-sec-tier
  apiGroup: rbac.authorization.k8s.io

---

# tigera-example-crud-policies-in-net-sec-tier is applied per-namespace
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: john-can-crud-policies-in-net-sec-tier-and-namespace
subjects:
- kind: User
  name: john
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: tigera-example-crud-policies-in-net-sec-tier
  apiGroup: rbac.authorization.k8s.io
```
