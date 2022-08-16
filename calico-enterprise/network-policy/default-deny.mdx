---
title: Global default deny policy best practices
description: Implement a global default deny policy in the default tier to block unwanted traffic. 
canonical_url: '/security/default-deny'
---

In this article you will learn when and how to create a global default deny policy for the cluster.

#### What is it, when should you create one?

A global default deny policy ensures that unwanted traffic (ingress and egress) is denied by default. Pods without policy (or incorrect policy) are not allowed traffic until appropriate network policy is defined. Although the staging policy tool will help you find incorrect and missing policy, a global deny helps mitigate against other lateral malicious attacks.

#### Best practice #1: Allow, stage, then deny

We recommend that you create a global default deny policy *after you complete writing policy for the traffic that you want to allow*. Use the stage policy feature to get your allowed traffic working as expected, then lock down the cluster to block unwanted traffic. The following steps summarizes the best practice:

1. Create a staged global default deny policy. It will show all the traffic that would be blocked if it were converted into a deny.
1. Create other network policies to individually allow the traffic shown as blocked in step 1, until no connections are denied.
1. Convert the staged global network policy to an enforced policy.

#### Best practice #2: Keep the scope to non-system pods

A global default deny policy applies to the entire cluster including all workloads in all namespaces, hosts (computers that run the hypervisor for VMs, or container runtime for containers), including Kubernetes control plane and {{site.prodname}} control plane nodes and pods. 

For this reason, the best practice is to create a global default deny policy for **non-system pods** as shown in the following example. 

```yaml
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: deny-app-policy
spec:
  namespaceSelector: has(projectcalico.org/name) && projectcalico.org/name not in {"kube-system", "calico-system", "tigera-system"}
  types:
  - Ingress
  - Egress
  egress:
  # allow all namespaces to communicate to DNS pods
  - action: Allow
    protocol: UDP
    destination:
      selector: 'k8s-app == "kube-dns"'
      ports:
      - 53
```
Note the following:

- Even though we call this policy "global default deny", the above policy is not explicitly *denying traffic*. By selecting the traffic with the `namespaceSelector` but not specifying an allow, the traffic is denied after all other policy is evaluated. This design also makes it unnecessary to ensure any specific order (priority) for the default-deny policy.
- Allowing access to `kube-dns` simplifies per-pod policies because you don't need to duplicate the DNS rules in every policy
- The policy deliberately excludes the `kube-system`, `calico-system`, and `tigera-system` namespaces by using a negative `namespaceSelector` to avoid impacting any control plane components

Next, add the policy to the default tier. (As noted above, anywhere in the default tier is fine.) 

Next, use the stage policy feature and verify that the policy does not block any necessary traffic before enforcing it.

#### Don't try this! 

The following policy looks fine on the surface, and it does work. But as described in Best practices #2, the policy could break your cluster because the scope is too broad. Therefore, we do not recommend adding this type of policy to the default tier, even if you have verified allowed traffic using the stage policy feature. 

```yaml
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: default.default-deny
spec:
  tier: default
  selector: all()
  types:
    - Ingress
    - Egress
```
