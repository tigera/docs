---
title: Stage, preview impacts, and enforce policy
description: Stage and preview policies to observe traffic implications before enforcing them.
canonical_url: /security/staged-network-policies
---

### Big picture

Stage and preview impacts on traffic before enforcing policy.

### Value

{{site.prodname}} staged network policy resources lets you test the traffic impact of the policy as if it were enforced, but without changing traffic flow. You can also preview the impacts of a staged policy on existing traffic. By verifying that correct flows are allowed and denied before enforcement, you can minimize misconfiguration and potential network disruption.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **StagedGlobalNetworkPolicy** resource
- **StagedNetworkPolicy** resource
- **StagedKubernetesNetworkPolicy** resource

### Concepts

#### About staged policies

The following staged policy resources have the same structure (i.e. the resource spec has the same fields) as their “enforced” counterpart.

- Staged global network policy
- Staged network policy
- Staged Kubernetes network policy

#### Review permissions

The default `tigera-network-admin` cluster role has the required permissions to manage the different enforced 
and staged network policies. Adjust permissions for your environment. As with {{site.prodname}} network policy and global network policies, the RBAC for {{site.prodname}} staged network policy and staged global network policy is tier-dependent.

### How to

- [Create a policy recommendation](#create-a-policy-recommendation)
- [Stage a policy](#stage-a-policy)
- [Preview policy impact](#preview-policy-impact)
- [Enforce a staged policy](#enforce-a-staged-policy)
- [Stage updates to an enforced policy](#stage-updates-to-an-enforced-policy)

#### Create a policy recommendation

One of the first things developers need to do is secure unprotected workloads with network policy. (For example, by default, Kubernetes pods accept traffic from any source.) The **Recommend policy** feature allows developers with minimal experience writing policy to secure workloads. 

Because **Recommend policy** looks at historial flow log entries that match your request, you should run your workloads for a reasonable amount of time to get "typical network traffic" for your application.

1. In the left navbar, click **Policies**.
1. Click **Recommend a policy**.
1. Enter time range, Namespace, Name, and click **Recommend**. 
1. If relevant flow logs are found within the time range for the workload endpoint, click **Preview** to assess the impact of the recommended policy, or **Stage**.

![recommend-policy]({{site.baseurl}}/images/recommend-policy.png)

#### Stage a policy

Stage a policy to test it in a near replica of a production environment. A best practice is to stage a policy before enforcing it to avoid unintentionally exposing or blocking other network traffic. 

1. In the left navbar, click **Policies**.
1. In a tier, click **Add Policy**. 
1. Create your policy and click **Stage** to save and stage it. 

![stage-new-policy]({{site.baseurl}}/images/stage-new-policy.png)

#### Enforce a staged policy

1. From **Policies Board**, click a staged policy. 
1. Click **Edit policy**, make changes and click **Enforce**. The staged policy is deleted and the enforced policy is created/updated (depending on whether it already exists).

#### Preview policy impact

The policy preview impact feature assesses traffic impact only on *enforced staged policies*. 

1. From the **Policies Board**, select a staged policy and click **Edit policy**.
1. Make some edits and click **Preview**.

The following example shows denied flows that may or may not be intended. 

![policy-preview]({{site.baseurl}}/images/policy-preview.png)

#### Stage updates to an enforced policy

1. From the **Policies Board**, open an enforced policy. 
1. In **View Policy**, click **Edit policy**.
1. Make your changes, and click **Preview**. Depending on the results, you can click **Stage**  or **Enforce**.

You can also use custom resources to stage Kubernetes and {{site.prodname}} policies, and apply them using `kubectl`. Here are sample YAMLs.

**Example: StagedGlobalNetworkPolicy**

```yaml
apiVersion: projectcalico.org/v3
kind: StagedGlobalNetworkPolicy
metadata:
  name: default.allow-tcp-6379
spec:
  tier: default
  selector: role == 'database'
  types:
  - Ingress
  - Egress
  ingress:
  - action: Allow
    protocol: TCP
    source:
      selector: role == 'frontend'
    destination:
      ports:
      - 6379
  egress:
  - action: Allow
```

**Example: StagedNetworkPolicy**

```yaml
apiVersion: projectcalico.org/v3
kind: StagedNetworkPolicy
metadata:
  name: default.allow-tcp-6379
  namespace: default
spec:
  tier: default
  selector: role == 'database'
  types:
  - Ingress
  - Egress
  ingress:
  - action: Allow
    protocol: TCP
    source:
      selector: role == 'frontend'
    destination:
      ports:
      - 6379
  egress:
  - action: Allow
```

**Example: StagedKubernetesNetworkPolicy**

```yaml
apiVersion: projectcalico.org/v3
kind: StagedKubernetesNetworkPolicy
metadata:
  name: test-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - ipBlock:
        cidr: 172.17.0.0/16
        except:
        - 172.17.1.0/24
    - namespaceSelector:
        matchLabels:
          project: myproject
    - podSelector:
        matchLabels:
          role: frontend
    ports:
    - protocol: TCP
      port: 6379
  egress:
  - to:
    - ipBlock:
        cidr: 10.0.0.0/24
    ports:
    - protocol: TCP
      port: 5978
```

### Above and beyond

- [Staged global network policy]({{site.baseurl}}/reference/resources/stagedglobalnetworkpolicy)
- [Staged network policy]({{site.baseurl}}/reference/resources/stagednetworkpolicy)
- [Staged Kubernetes network policy]({{site.baseurl}}/reference/resources/stagedkubernetesnetworkpolicy)
- For details on how to configure RBAC for staged policy resources, see [Configuring RBAC for tiered policy]({{site.baseurl}}/security/rbac-tiered-policies)
- For details on staged policy metrics, see
  - [Flow logs]({{site.baseurl}}/visibility/elastic/flow/datatypes)
  - [Prometheus statistics]({{site.baseurl}}/maintenance/monitor/metrics#content-main)
