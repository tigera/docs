---
title: Troubleshoot policies
description: Common policy implementation problems. 
canonical_url: '/security/policy-troubleshooting'
feature_name: feature_generic_all
---

#### Problem

I created ​​my first egress policy with default deny behavior, but now I’ve blocked other traffic.

#### Solution

In Kubernetes, when there are no egress policies that apply to an endpoint, all egress traffic is allowed. However, as soon as you add the first egress policy to an endpoint, {{site.prodname}} switches to default deny and blocks everything else; this is part of our zero trust network policy model. For new users of {{site.prodname}}, this is unexpected behavior (but it’s required by both Kubernetes and {{site.prodname}} policy specs.)  

For egress policy in particular, you may not be used to worrying about “system-level” egress traffic that is now suddenly blocked. For example, most workloads rely on DNS, but you may not have thought of this when writing your policy. So you end up with this problem loop: you allow HTTP traffic, but then your DNS traffic gets blocked, but then HTTP traffic stops working because it relies on DNS to function.

A natural response to this issue is to add an egress rule to allow DNS(!). For example, you add an egress rule “allow UDP to port 53 to namespace kube-system”. In some systems (OpenShift), the DNS pod actually listens on port 5353, not port 53. However, the DNS Service DNATs the traffic from port 53 to port 5353, hiding that detail from the DNS client. {{site.prodname}} then blocks the traffic because it sees the traffic after the DNAT. So {{site.prodname}} sees port 5353, not the expected port 53. 

The solution is to define policy for workload services, not for ports used by workloads. For help, see [Policy for services]({{site.baseurl}}/security/services).

#### Problem

Traffic is blocked, even though I allow it in a policy.

#### Solution

The problem of blocking traffic can reside in your tier, or a different tier. 

1. **Check policies in your tier** 

   Go to your policy and see if there is a higher precedent policy in the tier that is blocking processing. 
     - If that is not the problem, go to step 2. 
     - If that is the problem, and if it makes sense for the traffic, you can reorder the policies in the tier. If you cannot, you must change the policy that is dropping traffic to allow your traffic flow using a Pass action rule.

2. **Check policies in other tiers**

   Go to the next applicable higher precedent tier for your workload to see if a policy in that tier is blocking traffic. The policy at the end of the tier could be blocking traffic because the default behavior at the end of a tier is to drop traffic as part of zero trust. To unblock traffic, add a **Pass action rule** to the policy, or create a **Pass policy**. 

For help with visibility, use Service Graph to see how traffic is passed. Click on your flow, and view details in the right panel.  

For help with Pass action rules, see [Get started with tiered policy]({{site.baseurl}}/security/tiered-policy).