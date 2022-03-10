---
title: Policy best practices
description: Learn policy best practices for security, scalability, and performance.
canonical_url: '/security/policy-best-practices'
---

### Big picture

Policy best practices for run-time security starts with {{site.prodname}}’s robust network security policy, but other {{site.prodname}} resources play equally important roles in security, scalability, and performance. 

Learn {{site.prodname}} policy best practices and resources that support a zero trust network model:

- [Prepare for policy authoring](#prepare-for-policy-authoring)
- [Policy best practices for day-one zero trust](#policy-best-practices-for-day-one-zero-trust)
- [Policy design for efficiency and performance](#policy-design-for-efficiency-and-performance)
- [Policy life cycle tools](#policy-life-cycle-tools)

### Prepare for policy authoring

#### Determine who can write policy

Any team familiar with deploying microservices in Kubernetes can easily master writing network policies. The challenge in many organizations is deciding who will be given permission to write policy across teams. Although there are different approaches, {{site.prodname}} policy tools have the flexibility and guardrails to accommodate different approaches. 

Let’s review two common approaches. 

- **Microservices teams write policy** 
    
    In this model, network policy is treated as code, built into and tested during the development process, just like any other critical part of a microservice’s code. The team responsible for developing a microservice has a good understanding of other microservices they consume and depend on, and which microservices consume their microservice. With a defined, standardized approach to policy and label schemas, there is no reason that the teams cannot implement network policies for their microservice as part of the development of the microservice. With visibility in Service Graph, teams can even do basic troubleshooting. 

- **Dev/Ops writes policy, microservice team focuses on internals**
    
    An equally valid approach is to have development teams focus purely on the internals of the microservices they are responsible for, and leave responsibility for operating the microservices with devops teams. A Dev/ops team needs the same understanding as the microservices team above. However, network security may come much later in the organization’s processes, or even as an afterthought on a system already in production. This can be more challenging because getting network policies wrong can have significant production impacts. But using {{site.prodname}} tools, this approach is still achievable.  

When you get clarity on who can write policies, you can move to creating tiers. {{site.prodname}} tiers, along with standard Kubernetes RBAC, provide the infrastructure to meet security concerns across teams. 

#### Understand the depth of {{site.prodname}} network policy

Because {{site.prodname}} policy goes well beyond the features in Kubernetes policy, we recommend that you have a basic understanding of [network policy and global network policy]({{site.baseurl}}/security/calico-network-policy) and how they provide workload access controls. And even though you may not implement the following policies, it is helpful to know the defense in depth that {{site.prodname}} is available.

- [Policy for services]({{site.baseurl}}/security/services)
- [Policy integration for firewalls]({{site.baseurl}}/security/policy-firewalls/)
- [Policy for hosts]({{site.baseurl}}/security/hosts)

#### Create policy tiers 

**Tiers** are a hierarchical construct used to group policies and enforce higher precedence policies that cannot be circumvented by other teams. As part of your microsegmentation strategy, tiers let you apply identity-based protection to workloads and hosts. 

Before creating policies, we recommend that you create your tier structure. This often requires internal debates and discussions. As noted previously, {{site.prodname}} policy workflow has the guardrails you need to allow diverse teams to participate in policy writing. 

To understand how tiered policy works and best practices, see [Get started with tiered policies]({{site.baseurl}}/security/tiered-policy).

#### Create label standards 

Creating a label standard is often an overlooked step. But if you skip this step, it will cost you in troubleshooting down the road; especially given visibility/troubleshooting is already a challenge in a Kubernetes deployment.  

**Why are label standards important?** Network policies in Kubernetes depend on **labels and selectors** (not IP addresses and IP ranges) to determine which workloads can talk to each other. As pods dynamically scale up and down, network policy is enforced based on the labels and selectors that you define. So workloads and host endpoints need unique, identifiable labels for workloads and host endpoints. If you create duplicate label names, or labels are not intuitive, troubleshooting network policy issues and authoring network policies becomes more difficult. 

**Recommendations**:

- Follow the {% include open-new-window.html text='Kubernetes guidelines for labels' url='https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/' %}. If the Kubernetes guidelines do not cover your use cases, we recommend this blog from Tigera Support: {% include open-new-window.html text='Label standard and best practices for Kubernetes security' url='https://www.helpnetsecurity.com/2021/05/26/kubernetes-security/' %}.
- Develop a comprehensive set of labels that meets the deployment, reporting, and security requirements of different stakeholders in your organization.
- Standardize the way you label your pods and write your network policies using a consistent schema or design pattern. 
- Labels should be defined to achieve a specific and explicit purpose
- Use an intuitive language in your label definition that enables a quick and simple identification of labeled Kubernetes objects.
- Use label key prefixes and suffixes to identify attributes required for asset classification.
- Ensure the right labels are applied to Kubernetes objects by implementing label governance checks in your CI/CD pipeline or at runtime.

#### Create network sets 

Network sets and global network sets are grouping mechanisms for arbitrary sets of IPs/subnets/CIDRs or domains. They are key resources for efficient policy design. The key use cases for network sets are: 

- **Use/reuse in policy to support scaling** 

    You reference network sets in policies using selectors (rather than updating individual policies with CIDRs or domains). 

- **Visibility to traffic to/from a cluster**

    For apps that integrate with third-party APIs and SaaS services, you get enhanced visibility to this traffic in Service Graph. 

- **Global deny lists**

    Create a “deny-list” of CIDRs for bad actors or embargoed countries in policy.

**Recommendation**: Create network sets **and labels** before writing policy. 

For network set tutorial and best practices, see [Get started with network sets]({{site.baseurl}}/security/networksets).

### Policy best practices for day-one zero trust

#### Create a global default deny policy 

A global default deny network policy provides an enhanced security posture – so pods without policy (or incorrect policy) are not allowed traffic until appropriate network policy is defined. We recommend creating a global default deny, regardless if you use Calico Enterprise and/or Kubernetes network policy. 

But, be sure to understand the [best practices for creating a default deny policy]({{site.baseurl}}/security/default-deny) to avoid breaking your cluster. 

Here are sample [default deny policies]({{site.baseurl}}/security/kubernetes-default-deny).

#### Define both ingress and egress network policy rules for every pod in the cluster

Although defining network policy for traffic external to clusters (north-south) is certainly important, it is equally important to defend against attacks for east-west traffic. Simply put, **every connection from/to every pod in every cluster should be protected**. Although having both doesn’t guarantee protection against other attacks and vulnerabilities, one innocuous workload can lead to exposure of your most critical workloads.

For examples, see [basic ingress and egress policies]({{site.baseurl}}/security/calico-network-policy).

### Policy design for efficiency and performance

Teams can write policies that work, but ultimately you want policies that also scale, and do not negatively impact performance. 

If you follow a few simple guidelines, you’ll  be well on your way to writing efficient policy. 

#### Use global network policy only when all rules apply globally

- **Do**

    Use global network policy for cluster-wide scope when all rules apply to multiple namespaces or host endpoints. For example, use a global network policy to create a deny-list of CIDRs for embargoed countries, or for global default deny everywhere, even for new namespaces. 

    Why? Although at the level of packet processing there is no difference between network policy and global network, for CPU usage, one global network policy is faster than a large number of network policies.  

- **Avoid**

    Using a global network policy as a way to combine diverse, namespaced endpoints with different connectivity requirements. Although creating such a policy can work, appears efficient and is easier to view than several separate network policies, it is inefficient and should be avoided. 

    Why? Putting a lot of anything in policy (rules, CIDRs, ports) that are manipulated by selectors is inefficient. iptables/eBPF rules depend on minimizing executions and updates. When a selector is encountered in a policy rule, it is converted into one iptables rule that matches on an IP set. Then, different code keeps the IP sets up to date; this is more efficient than updating iptables rules. Also, because iptables rules execute sequentially in order, having many rules results in longer network latencies for the first packet in a flow (approximately 0.25-0.5us per rule). Finally, having more rules slows down programming of the dataplane, making policy updates take longer. 

**Example: Inefficient global network policy**

The following policy is a global network policy for a microservice that limits all egress communication external to the cluster in the security tier. Does this policy work? Yes. And logically, it seems to cleanly implement application controls.

```yaml
apiVersion: projectcalico.org/v3
2kind: GlobalNetworkPolicy
3metadata:
4  name: security.allow-egress-from-pods
5spec:
6  tier: security
7  order: 1
8  selector: all()
9  egress:
10    - action: Deny
11      source:
12        namespaceSelector: projectcalico.org/namespace starts with "tigera"
13      destination:
14        selector: threatfeed == "feodo"
15    - action: Allow
16      protocol: TCP
17      source:
18        namespaceSelector: projectcalico.org/name == "sso"
19        ports:
20          - '443'
21          - '80'
22      destination:
23        domains:
24          - '*.googleapis.com'
25    - action: Allow
26      protocol: TCP
27      source:
28        selector: psql == "external"
29      destination:
30        ports:
31          - '5432'
32        domains:
33          - '*.postgres.database.azure.com'
34    - action: Allow
35      protocol: TCP
36      source: {}
37      destination:
38        ports:
39          - '443'
40          - '80'
41        domains:
42          - '*.logic.azure.com'
43    - action: Allow
44      protocol: TCP
45      source: {}
46      destination:
47        ports:
48          - '443'
49          - '80'
50        domains:
51          - '*.azurewebsites.windows.net'
52    - action: Allow
53      protocol: TCP
54      source:
55        selector: 'app in { "call-archives-api" }||app in { "finwise" }'
56      destination:
57        domains:
58          - '*.documents.azure.com'
59    - action: Allow
60      protocol: TCP
61      source:
62        namespaceSelector: projectcalico.org/name == "warehouse"
63      destination:
64        ports:
65          - '1433'
66        domains:
67          - '*.database.windows.net'
68    - action: Allow
69      protocol: TCP
70      source: {}
71      destination:
72        nets:
73          - 65.132.216.26/32
74.         - 10.10.10.1/32
75        ports:
76          - '80'
77          - '443'
78    - action: Allow
79      protocol: TCP
80      source:
81        selector: app == "api-caller"
82      destination:
83        ports:
84          - '80'
85          - '443'
86        domains:
87          - api.example.com
88    - action: Allow
89      source:
90        selector: component == "tunnel"
91    - action: Allow
92      destination:
93        selector: all()
94        namespaceSelector: all()
95    - action: Deny
96  types:
97    - Egress
```

**Why this policy is inefficient**

First, the policy does not follow guidance on use for global network policy: that all rules apply to the endpoints. So the main issue is inefficiency, although the policy works.

The main selector all() (line 8) means the policy will be rendered on every endpoint (workload and host endpoints). The selectors in each rule (for example, lines 12 and 14) control traffic that are matched by that rule. So, even if the host doesn’t have any workloads that match `"selector: app == "api-caller"`, you’ll still get the iptables/eBPF rule rendered on every host to implement that rule. If this sample policy had 100 pods, that’s a 10 - 100x increase in the number of rules (depending on how many local endpoints match each rule). In short, it adds:

- Memory and CPU to keep track of all the extra rules
- Complexity to handle changes to endpoint labels, and to re-render all the policies too.

#### Avoid policies that may select unwanted endpoints

The following policy is for an application in a single namespace, `app1-ns` namespace. There are two microservices that are all labeled appropriately:  

- microservice 1 has `app: app1`, `svc: svc1`
- microservice 2 has `app: app1`, `svc: svc2` 

The following policy works correctly and does not incur a huge performance hit. But it could select additional endpoints that were not intended.

```yaml
apiVersion: projectcalico.org/v3
kind: NetworkPolicy
metadata:
  name: application.app1
  namespace: app1-ns
spec:
  tier: application
  order: 10
  selector: app == "app1"
  types:
    - Ingress
  ingress:
    - action: Allow 
      source:
        selector:  trusted-ip == "load-balancer"
      destination:
        selector:  svc == "svc1"
        ports:
          - 10001
      protocol: TCP  
    - action: Allow
      source:
        selector: svc == "svc1"
      destination:
        selector:  svc == "svc2"
        ports:
          - 10002
      protocol: TCP
```

However, the policy incorrectly assumes that the main policy selector (`app == "app1"`) will be combined (ANDed) with the endpoint selector, and only for certain policy types. In this case,

- **Ingress** - combines policy selector, and destination endpoint selector 
or 
- **Egress** - combines policy selector, and source endpoint selector

But if the assumptions behind the labels are not understood by other policy authors and are not correctly assigned, the endpoint selector may select *additional endpoints that were not intended*. For ingress policy, this can open up the endpoint to more IP addresses than necessary. This unintended consequence would be exacerbated if the author used a global network policy.

#### Put multiple relevant policy rules together in the same policy 

As discussed previously, it is better to create separate policies for different endpoint connectivity rules, than a single global network policy. However, you may interpret this to mean that the best practice is to make unique policies that do not aggregate any rules. But that is not the case. Why? When {{site.prodname}} calculates and enforces policy, it updates the iptables/eBPF and reads policy changes and pod/workload endpoints from the datastore. The more policies in memory, the more work it takes determine which policies match a particular endpoint. If you group more rules into one policy, there are fewer policies to match against. 

#### Understand effective use of label selectors 

Label selectors abstract network policy from the network. Misuse of selectors can slow things down. As discussed previously, the more selectors you create, the harder {{site.prodname}} works to find matches. 

The following policy shows an inefficient use of selectors. Using `selector: all()` renders the policy on all nodes for all workloads. If there are 10,000 workloads, but only 10 match label==foo, that is very inefficient at the dataplane level. 

```yaml
selector: all()
ingress:
  source: 
    selector: label == 'bar'
    destination: selector: label == 'foo'
```
The best practice policy below allows the same traffic, but is more efficient and scalable. Why? Because the policy will be rendered only on nodes with workloads that match the selector `label==foo`. 

```yaml
selector: label == 'foo'
ingress:
  source: 
    selector: label == 'bar'
```
Another common mistake is using `selector: all()` when you don’t need to. `all()` means "all workloads" so that will be a large IP set. Whenever there's a source/destination selector in a rule, it is rendered as an IP set in the dataplane. 

```yaml
source:
  selector: all()
```

#### Put domains and CIDRs in network sets rather than policy

Network sets allow you to specify CIDRs and/or domains. As noted in [Network set best practices]({{site.baseurl}}/security/policy-best-practices), we do not recommend putting large CIDRs and domains directly in policy. Although nothing stops you from do this in policy, using network sets is more efficient and supports scaling. 

### Policy life cycle tools

#### Preview, stage, deploy 

A big obstacle to adopting Kubernetes is not having confidence that you can effectively prevent, detect, and mitigate across diverse teams. The following policy life cycle tools in Manager UI (**Policies** tab) can help. 

- **Policy recommendations**

    Get a policy recommendation for unprotected workloads. Speeds up learning, while supporting zero trust. 

- **Policy impact preview**

    Preview the impacts of policy changes before you apply them to avoid unintentionally exposing or blocking other network traffic.

- **Policy staging and audit modes**

    Stage network policy so you can monitor traffic impact of both Kubernetes and {{site.prodname}} policy as if it were actually enforced, but without changing traffic flow. This minimizes misconfiguration and potential network disruption.

For details, see [Policy life cycle tools]({{site.baseurl}}/security/policy-lifecycle).    

#### Do not trust anything

Zero trust means that you do not trust anyone or anything. {{site.prodname}} handles authentication on a per request basis. Every action is either authorized or restricted, and the default is everything is restricted. To apply zero trust to policy and reduce your attack surface and risk, we recommend the following:

- Ensure that all expected and allowed network flows are explicitly allowed; any connection not explicitly allowed is denied

- Create a quarantine policy that denies all traffic that you can quickly apply to workloads when you detect suspicious activity or threats

### Above and beyond

- [Troubleshoot policies]({{site.baseurl}}/security/policy-troubleshooting)
- {% include open-new-window.html text='Security and policy best practices blog' url='https://www.tigera.io/blog/kubernetes-security-policy-10-critical-best-practices/' %}
