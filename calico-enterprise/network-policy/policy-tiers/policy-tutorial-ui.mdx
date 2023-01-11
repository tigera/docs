---
title: Network policy tutorial
description: Covers the basics of Calico Cloud network policy.
canonical_url: /security/policy-tutorial-ui
---

### What you will learn:

- How to create a policy in Manager UI
- How labels and selectors work 
- Basics of policy ordering and tiers

### Scenario

Let's start with a sample Kubernetes cluster. 

![policy-tutorial-overview]({{site.baseurl}}/images/policy-tutorial-overview.png)

| Item               | Description                                         |
| ------------------ | ------------------------------------------------------------ |
| Kubernetes cluster | A Kubernetes cluster with four namespaces and three nodes that run the pods in the cluster. |
| Namespace          | Four namespaces named blue, red, green, and purple represent different applications running in the cluster. |
| Pod                | Pods with meaningful labels for our applications:<br />- FE (frontend pods) <br />- BE (backend pods) |
| NetworkSet         | An arbitrary set of IP subnetworks/CIDRs or domains that can be matched by standard label selectors in Kubernetes or {{site.prodname}} network policy. Network sets are a  {{site.prodname}} namespaced resource. |
| GlobalNetwork Set  | An arbitrary set of IP subnetworks/CIDRs or domains that can be matched by standard label selectors in Kubernetes or {{site.prodname}} network policy. Global network sets are a  {{site.prodname}} global resource. |
| ServiceAccount     | Provides an identity for processes that run in a pod. Service accounts are a Kubernetes namespaced resource. |
| HostEndpoint (HEP) | Physical or virtual interfaces attached to a host that runs {{site.prodname}}. HEPs enforce {{site.prodname}} policy on the traffic that enters or leaves the host’s default network namespace through the interfaces. HEPs are a {{site.prodname}} global resource. |
| External component | A machine (physical or virtual) that runs outside of the Kubernetes cluster. |

### Create a network policy

To follow along in Manager UI, click **Policies**.

There are three main parts to every {{site.prodname}} policy:

- **Scope** - namespace or global
- **Applies to** - objects within the above scope to which policy rules will be applied using labels and selectors
- **Type** - whether this policy affects ingress, egress, or both
  - Ingress - policy rules to apply to connections inbound to the selected objects
  - Egress - policy rules to apply to connections outbound from the selected objects

![policy-parts]({{site.baseurl}}/images/policy-parts.png)

Let's look at each part.

### Scope

Scope defines the reach of your policy. Use this dropdown to determine whether your policy applies globally or to a specific namespace. Think of scope as the "top-level scope" that can be further specified using the "Applies to" selection that follows.

- **Global**

   If you select global, but do not add entries in the **Applies to** field to further limit scope, *every pod and host endpoint (HEP) in our cluster would be in scope*. The following example uses the global option to limit the scope to all pods and HEPs (noted by check marks). 

   ![policy-tutorial-global-scope]({{site.baseurl}}/images/policy-tutorial-global-scope.png)
   
- **Namespace**

   If you select namespace, but do not add entries in the **Applies to** field to further limit scope, *every pod in this policy's namespace would be in scope*. The following example uses the namespace option to limit the scope to pods in the RED namespace.
   
   ![policy-tutorial-namespace-scope]({{site.baseurl}}/images/policy-tutorial-namespace-scope.png)

#### Applies to

As discussed above, selecting **Applies to** lets you further limit pods in a policy. You can think of it as the "top-level endpoint selector". You define labels on your endpoints, namespaces, and service accounts, then use label selectors to limit connections by matching the following object types:

- **Endpoints**

   Specify one or more label selectors to match specific endpoints, or select all endpoints 

- **Namespaces** (available only when the Scope is global)

   Specify one or more label selectors to match specific namespaces, or select all namespaces

- **Service Accounts**

   Specify or more label selectors to match specific service accounts, or select all service accounts

For example, if we select the BLUE namespace and apply it to only pods with the label, `app/tier == FE`,

![blue-namespace]({{site.baseurl}}/images/blue-namespace.png)

the resulting scope in our diagram would be only the pods labeled, `FE`:

![blue-namespace-pods]({{site.baseurl}}/images/blue-namespace-pods.png)

#### Type

In the Type section, you specify whether the policy impacts ingress, egress, or both. 

Note that ingress and egress are defined from the point of view of the *scoped endpoints* (pods or host endpoints). In the previous diagram, the scoped endpoints are the three pods labeled, `app/tier:FE`.

- Ingress rules filter traffic *coming to* the scoped endpoints
- Egress rules filter traffic *leaving* the scoped endpoints

Select the **Ingress** rule, and click **+ Add ingress rule** to access the **Create New Policy rules** page.

#### Endpoint selector

The endpoint selector lets you select the endpoint traffic that is matched within the scope you've defined in the policy.

In our example, the policy is scoped to endpoints that have the `app/tier == FE` label in the BLUE namespace. In the context of an egress rule, when we add the `app/tier == BE` endpoint selector, all TCP traffic from endpoints that have the`app/tier == BE` label will be allowed to the `app/tier == FE` endpoints.

![policy-tutorial-endpoint-selector]({{site.baseurl}}/images/policy-tutorial-endpoint-selector.png)

Note that endpoints that have the `app/tier == BE` label in other namespaces are not matched because the policy is namespace scoped. 
   
#### Namespace selector

This is where things can get interesting. In the previous example, we did not select anything in the namespace selector. Let's change the namespace selector to have both the BLUE and GREEN namespaces. 

![endpoint-selector-blue-green]({{site.baseurl}}/images/endpoint-selector-blue-green.png)

Although the overall policy is scoped to the BLUE namespace, we can match endpoints in other namespaces on a per-rule basis. Note that the top-level scope that you select remains unchanged, meaning that the policy is still applied only to endpoints in the BLUE namespace. 

![namespace-selector]({{site.baseurl}}/images/namespace-selector.png)

#### Network selector

Using the Nets selector, we can add CIDR addresses to be matched by the policy rule.

![network-selector]({{site.baseurl}}/images/network-selector.png)

#### Service account selector

Network policies can be also applied to the endpoint’s service account.

Using the service account selector, we can apply rules to traffic from any endpoint whose service account matches the name or label selector.

![service-account-selector]({{site.baseurl}}/images/service-account-selector.png)

#### Use Match All for wider matches in policy rules

The **Match All** policy rule (`all()` in YAML) matches traffic for:

- All endpoints in a namespace (if the policy scope is namespace)
- All endpoints (if the policy scope is global)

Let's look at an example of using **Match All** traffic in a namespaced policy:

- Scope is namespaced (BLUE) 
- Applies to `app/tier == FE`

Suppose we want to match traffic to the pod labeled `BE`, and the {{site.prodname}} `networkset-1`. 

![match-all-namespace]({{site.baseurl}}/images/match-all-namespace.png)

To do this, we can use the policy rule endpoint selector, **Match All**.

![match-all-endpoints]({{site.baseurl}}/images/match-all-endpoints.png)

Not only is the pod labeled `BE` included, but also the {{site.prodname}} `networkset-1`. 

![match-all-endpoints-example]({{site.baseurl}}/images/match-all-endpoints-example.png)

Note that we could have created individual selectors to match pods labeled, `BE` and for the `network-set-1`. 

**Match All traffic with namespace selectors**

In the following example, if we select **Match All** endpoints, but in the **Namespace selector**, we select both the BLUE and GREEN namespaces, the results for matching are: all pods and network sets in the BLUE and GREEN namespaces. 

![namespace-match-all]({{site.baseurl}}/images/namespace-match-all.png) 

**Global selector**

Let's see what happens when we select the **Global** selector.

![namespace-selector-global]({{site.baseurl}}/images/namespace-selector-global.png) 

In our example, the Global selector selects HEPs and global network sets are selected. You might think that Global (`global()` in YAML) would select all endpoints, but it doesn't. Global means "do not select any namespaced resources" (which includes namespaced network set resources). Another way to express it is, do not select any workload endpoints.

![heps-networksets]({{site.baseurl}}/images/heps-networksets.png) 

**Endpoint selector, unspecified**

Next, let's see what happens when the policy rule does not specify any selection criteria. In this example, the rule selects all workloads, network sets, endpoints, and host endpoints within scope of the policy, including external components (the VM database). 

![unspecified]({{site.baseurl}}/images/unspecified.png) 

Now that you know the basic elements of a network policy, let's move on to policy ordering and tiers.

### Policy ordering

{{site.prodname}} policies can have order values that control the order of precedence. For both network policies and global network policies, {{site.prodname}} applies the policy with the lowest value first. 

![policy-ordering]({{site.baseurl}}/images/policy-ordering.png)

#### Mixing Kubernetes and {{site.prodname}} policies

Kubernetes and {{site.prodname}} policies work side by side without a problem. However, Kubernetes network policies cannot assign an order value, so {{site.prodname}} will set an implicit order value of 1000 to any Kubernetes network policies.

#### {{site.prodname}} policies with no order value

{{site.prodname}} policies with order values take precedence. Policies without order values take lesser precedence and are processed alphabetically.

### Tiers

Tiers are a hierarchical construct used to group policies and enforce higher precedence policies that cannot be circumvented by other teams. Access to tiers is controlled using user role permissions. For example, a security team can implement high-level policy (for example, blocking access to/from IP ranges in particular countries), while developers in a later tier can control specific rules for the microservices of an app running in the cluster. 

#### Policy processing overview

When a new connection is processed by {{site.prodname}}, each tier that contains a policy that selects the endpoint processes the connection. Tiers are sorted by their order - the smallest number first. Policies in each tier are then processed in order from the smallest to largest.

- If a network policy or global network policy in the tier allows or denies the connection, then evaluation is done: the connection is handled accordingly.

- If a network policy or global network policy in the tier passes the connection, the next tier containing a policy that selects the endpoint processes the connection

After a Pass action, if no subsequent tier contains any policies that apply to the pod, the connection is allowed.
 
If the tier contains policies that apply to the endpoint, but the policies take no action on the connection, the connection is dropped by an implicit deny.

If no tiers contain policies that apply to the endpoint, the connection is allowed by an implicit allow.

#### Policies with no order value

You can create policies without an order value. When a policy with no order value is placed in a tier with other policies that do have an order value, the policies are processed as follows:

- Policies are evaluated from smallest to largest order value within the tier
- Policies with no order value are processed last in the tier, but before the implicit deny
- When multiple policies without an order value are present in a tier, they are processed in alphabetical order. However, we do not recommended relying on alphabetical ordering because it hard to operationalize. 

#### How policy action rules affect traffic processing

It is also important to understand that {{site.prodname}} policy action rules affect how traffic and connections are processed. Let's go back to the drop-down menu on the Create New Policy Rule page.

Action defines what should happen when a connection matches this rule. 

![policy-tutorial-action]({{site.baseurl}}/images/policy-tutorial-action.png)

- **Allow or Deny** - traffic is allowed or denied and the connection is handled accordingly. No further rules are processed.
- **Pass** - skips to the next tier that contains a policy that applies to the endpoint, and processes the connection. If the tier applies to the endpoint but no action is taken on the connection, the connection is dropped.
- **Log** - creates a log, and evaluation continues processing to the next rule

### Above and beyond

The following topics go into further detail about concepts described in this tutorial:

- [Get started with network policy]({{site.baseurl}}/security/calico-network-policy)

- [Service account selectors]({{site.baseurl}}/security/service-accounts) 

- [Get started with tiered network policy]({{site.baseurl}}/security/tiered-policy)

- [Get started with network sets]({{site.baseurl}}/security/networksets)
