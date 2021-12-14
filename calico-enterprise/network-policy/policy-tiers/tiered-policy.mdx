---
title: Get started with tiered policies
description: Understand how tiered policy works and supports microsegmentation.
canonical_url: /security/tiered-policy
---

### Big picture

Learn the basics of tiered policy in {{site.prodname}}.

### About policy 

Network policy is the primary tool for securing a Kubernetes network. It lets you restrict network traffic in your cluster so only the traffic that you want to flow is allowed. {{site.prodname}} supports:

- {{site.prodname}} network policy
- {{site.prodname}} global network policy
- Kubernetes network policy

The ability to use both types of policies in the same workflow promotes self-service for microservices teams, while preserving the security controls required by security teams.  

### About tiers 

**Tiers** are a hierarchical construct used to group policies and enforce higher precedence policies that cannot be circumvented by other teams. As part of your microsegmentation strategy, tiers let you apply identity-based protection to workloads and hosts. All {{site.prodname}} and Kubernetes network policies reside in **tiers**.  (Tiers are one of the major feature differences between Project Calico open-source and {{site.prodname}}.) 

To start "thinking in tiers", you can group your teams and types of policies. For example, 

![policy-types]({{site.baseurl}}/images/policy-types.png)

Next, you can determine the priority of policies in tiers, and draft your policies including whether to use namespaced policy, global policies, and Kubernetes policies. In the following example, the security team and platform teams can manage global {{site.prodname}} network policies that apply to all pods, while developer teams can safely manage pods within namespaces for their microservices using Kubernetes network policy. 

![policy-tiers]({{site.baseurl}}/images/policy-tiers.png)

### Tier layout in Policy Board 

All of the previous steps can be done right in Manager UI, which is a good place to start. Policy Board is a graphical view of your policies in tiers and policies. 

To create a tier in Policy Board:

1. From the left navigation bar, click **Policies**.
1. Click the policy board icon.
   ![policy-board]({{site.baseurl}}/images/policy-board.png) 
1. Click **Add Tier**.
1. Name the tier, select Order, Add after `allow-tigera`, and save. 

**Alternative YAML**

```yaml
  apiVersion: projectcalico.org/v3
  kind: Tier
  metadata:
    name: security
  spec:
    order: 300
```

Apply the YAML using `kubectl`.

```bash
kubectl apply -f security.yaml
```
1. To create a policy, click the menu and select **Add policy**.
   ![add-policy]({{site.baseurl}}/images/add-policy.png)


### The default tier: always last

The default tier is created during installation and is always the last tier. 

![default-tier]({{site.baseurl}}/images/default-tier.png)

It is the tier where:

- You manage all of your Kubernetes network policies
- Calico open source network policies land if you upgrade to {{site.prodname}}
- The policy recommendation feature puts recommended policies

### System tiers

System tiers are hidden by default. Currently, we have the `allow-tigera` tier that contains policies for {{site.prodname}} components. System tiers should not be edited or reordered. 

![system-tiers]({{site.baseurl}}/images/system-tiers.png)

>**Tip**: To reorder tiers, you must first make all tiers are visible. Click the “Toggle Tiers” icon and select “Show All”.
{: .alert .alert-info}

![show-all-tiers]({{site.baseurl}}/images/show-all-tiers.png)

### Tier order 

Tiers are ordered from left to right, starting with highest priority (also called highest precedence) tiers. In the following example, tier priorities are as follows:

![tier-order]({{site.baseurl}}/images/tier-order.png)

The tier you put first as highest priority depends on your environment. In compliance-driven environments, it is common for security teams to request that the security tier be the highest priority --  to ensure the cluster is in compliance at all times. However, if you’re trying to ensure platform communication first, you can put the platform tier first as shown in the above example. There is no one-size-fits-all order.

### Policy processing

Policies are processed in sequential order from the top of a tier, to the bottom of a tier. 

![policy-processing]({{site.baseurl}}/images/policy-processing.png)

There are two important mechanisms that drive how traffic is processed across tiered policies:

- Labels and selectors
- Policy action rules

It is important to understand the roles they play.

#### Labels and selectors

Instead of IP addresses and IP ranges, network policies in Kubernetes depend on labels and selectors to determine which workloads can talk to each other. Workload identity is the same for Kubernetes and {{site.prodname}} network policies: as pods dynamically come and go, network policy is enforced based on the labels and selectors that you define. 
The following diagrams shows the relationship between all of the elements that affect traffic flow: 

- **Tiers** group and order policies
- **Policy action rules** define how to process traffic in and across tiers, and policy labels and selectors specify how groups of pods are allowed to communicate with each other and other network endpoints
- The **CNI**, **{{site.prodname}} components**, and underlying **dataplane** (iptables/eBPF) all make use of labels and selectors as part of routing traffic.

![tier-funnel]({{site.baseurl}}/images/tier-funnel.png)

#### Policy action rules

{{site.prodname}} network policy uses action rules to specify how to process traffic/packets:

- **Allow or Deny** - traffic is allowed or denied and the packet is handled accordingly. No further rules are processed.
- **Pass** - skips to the next tier that contains a policy that applies to the endpoint, and processes the packet. If the tier applies to the endpoint but no action is taken on the packet, the packet is dropped.
- **Log** - creates a log, and evaluation continues processing to the next rule

#### Implicit default deny 

As shown in the following diagram, at the end of each tier is an implicit default deny. This is a safeguard that helps mitigate against unsecured policy. Because of this safeguard, you must explicitly apply the **Pass** action rule when you want traffic evaluation to continue. In the following example, the Pass action in a policy ensures that traffic evaluation continues, and overrides the implicit default deny.

![implicit-deny]({{site.baseurl}}/images/implicit-deny.svg)

Let’s look at a Dev/Ops global network policy in a high precedence tier (Platform). The policy denies ingress and egress traffic to workloads that match selector, `env != "stage"`. To ensure that policies continue to evaluate traffic after this policy, the policy adds an action: pass for both ingress and egress.

**Pass action rule example**

```yaml
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: devops.stage-env
spec:
  tier: devops
  order: 255
  selector: env == "stage"
  ingress:
    - action: Deny
      source:
        selector: env != "stage"
    - action: Pass
  egress:
    - action: Deny
      destination:
        selector: env != "stage"
    - action: Pass
  types:
    - Ingress
    - Egress
```

#### Policy endpoint matching across tiers

Whoever is responsible for tier creation, also needs to understand how policy selects matching endpoints across tiers. For normal policy processing (without apply-on-forward, pre-DNAT, and do-not-track), if no policies within a tier apply to endpoints, the tier is skipped, and the tier's implicit deny behavior is not executed. 

For example, if policy D in Tier 1 includes a **Pass** action rule, but no policy matches endpoints in Tier 2, Tier 2 is skipped, including the end of tier deny. And the first policy with a matching endpoint is in Tier 3, **policy J**.

![endpoint-match]({{site.baseurl}}/images/endpoint-match.svg)

#### Default endpoint behavior

Also, tier managers need to understand the default behavior for endpoints based whether the endpoint is known or unknown, and the endpoint type. As shown in the following table: 

- **Known endpoints** - {{site.prodname}} resources that are managed by Felix
- **Unknown endpoints** - interfaces/resources not recognizable as part of our data model 

| Endpoint type | Default behavior for known endpoints | Default behavior for unknown endpoints (outside of our data model) |
| ---------------- | -------------------------------------------- | -------------------------------------------- |
| Workload, {{site.prodname}} | Deny | Deny |
| Workload, Kubernetes | Allow ingress from same Kubernetes namespace; allow all egress | Deny |
| Host        | Deny. With exception of auto host endpoints, which gets `default-allow `. | Fall through and use iptable rules |

### Best practices for tiered policy

To control and authorize access to {{site.prodname}} tiers, policies, and Kubernetes network policies, you use Kubernetes RBAC. Security teams can prevent unauthorized viewing or modification of higher precedence (lower order) tiers, while still allowing developers or service owners to manage the detailed policies related to their workloads. 

We recommend:

- Limit tier creation permissions to Admin users only (`tigera-network-admin`); creating and reordering tiers affects your policy processing workflow 

- Limit full CRUD operations on tiers and policy management to select Admin users

- Review your policy processing whenever you add/reorder tiers  

  For example, you may need to add new Pass action rules to policies before or after the new tier. Intervening tiers may require changes to policies before and after, depending on the endpoints.

- Use the [staged network policy]({{site.baseurl}}/security/policy-lifecycle/) feature to eliminate any cluster/network outage caused by introducing new policies. You can preview the new policy and see its effect in action before enforcing it.  

### Above and beyond

- For details on using RBAC for fine-grained access to tiers and policies, see [Configure RBAC for tiered policies]({{site.baseurl}}/security/rbac-tiered-policies).