---
title: Create staged policies
description: Describes how to stage Calico and native Kubernetes network policies to safely observe traffic implications without impacting traffic flow.
---

### Big picture

Stage network policies to observe possible traffic implications before enforcing the policy.

### Value

#### Minimize disruption from misconfigured network policy

{{site.prodname}} staged network policy resources lets you monitor the traffic impact of the policy as if it were actually 
enforced, but without changing traffic flow. This minimizes misconfiguration and potential network disruption.

#### Works with all supported network policy types

You can stage policy changes for Calico and native Kubernetes network policy types.

#### Control who can stage and who can enforce policies

Using RBAC for staged policies lets you separate users who can stage policy versus enforce policy. For example, you could 
allow developers to craft staged network policies appropriate for their applications, but only allow the security teams 
to actually enforce those policies after they validate them.

### Features

This how-to guide uses the following {{site.prodname}} features:
- **StagedGlobalNetworkPolicy** resource
- **StagedNetworkPolicy** resource
- **StagedKubernetesNetworkPolicy** resource

### Concepts

#### Enforced policies for production

{{site.prodname}} supports Calico network policies, Calico global network policies and Kubernetes network policies. 
Because these policies potentially impact traffic, they are considered “enforced policies” and are suitable for 
production environments.

#### Staged policies for testing

Staged policies let you test traffic impacts of your network policies before going to production. Specifically, you can verify that correct flows are being allowed or denied. A staged policy provides the same packet, byte and connection metrics and flow log/flow visualization hits as if it was being enforced. When you update policies, you can verify policy and policy rule packet rates (denied/pass/allow) and preview the impact on past flows. 

{{site.prodname}} provides the following staged policies. Each staged policy resource has the same structure (i.e. the resource spec has the same fields) as their “enforced” counterpart.

- Staged global network policy
- Staged network policy
- Staged Kubernetes network policy

#### Managing enforced and staged policies in the UI

Although you can configure staged policies independently of their enforced counterpart, the UI simplifies management
by linking staged and enforced policies of the same kind, name, namespace and tier. The following table summarizes the 
behavior when using these policies. 

| If you have an existing... | And you... | Staged policy is... | Enforced policy is... |
| :-------------------: | :-------------------: | :-------------: | --------------- |
| Enforced policy with no staged update | Stage an update to the enforced policy | Created with the same name and namespace as the enforced policy | Not changed |
| Enforced policy with a staged update | Stage an update to the enforced policy | Updated | Not changed |
|  | Enforce an update to the enforced policy | Not changed | Updated |
|  | Enforce an update to the staged policy | Deleted | Updated |
| Staged policy (not yet enforced) | Enforce an update to the staged policy | Deleted | Created |

### Before you begin

#### Review permissions

The default `tigera-network-admin` cluster role has the required permissions to manage the different enforced 
and staged network policies. Adjust permissions for your environment. As with Calico network policy and global network 
policies, the RBAC for Calico staged network policy and staged global network policy is tier-dependent.

### How to

- [Create a new staged policy](#create-a-new-staged-policy)
- [Stage updates to an enforced policy](#stage-updates-to-an-enforced-policy)
- [View impact of a staged policy](#view-impact-of-a-staged-policy)
- [Enforce a staged policy](#enforce-a-staged-policy)
- [Create a staged policy using kubectl](#create-a-staged-policy-using-kubectl)

#### Create a new staged policy

From the **Create Policy** page in the UI, craft a new policy and click the
**STAGE** button.

In the Policies pane the new staged policy is indicated by a **STAGED** tag. 

![A new policy first created in staged mode]({{site.url}}/images/staged-network-policies/new.png)

#### Stage updates to an enforced policy

From the **Policies** pane in the UI, edit the enforced policy, and click **STAGE**.

In the Policies pane both the enforced policy and the staged policy will be present. Unless the order is explicitly
modified, the staged policy is inserted before the enforced policy.

![An existing policy with a staged update]({{site.url}}/images/staged-network-policies/update.png)

#### View impact of a staged policy

There are three different ways to view the impact of a staged policy on the traffic.

**Check staged policy hits in flow visualization**

From the **Flow Visualizations** pane select a flow that you expect your staged policy to hit.

On the right hand side, check the list of Ingress and Egress policies list that matched the flow. Staged policy names 
are prefixed with "staged:".

In the example below the highlighted flow has both ingress (allow) and egress (deny) matches on staged policy 
“elasticsearch-access” in tier “allow-cnx”.

![Flow visualization showing a flow that matched a staged policy]({{site.url}}/images/staged-network-policies/flow-viz.png)

**Check packet/byte/connection metrics**

From the **Policies** pane, select **View policy** for the staged policy.

The traffic and connection statistics displayed in the UI are measured from actual traffic data.

In the example below, there were measured Denies - meaning that if the policy were Enforced, some packets would have 
been denied. A value of “n/a” indicates no measured packets.

![Flow visualization showing a flow that matched a staged policy]({{site.url}}/images/staged-network-policies/traffic.png)

**Preview impact of enforcing the staged policy**

From the **Policies** pane, select **Edit policy** for the staged policy.

Select **PREVIEW**, and set the toggle to “Changes Applied”. The flow visualization indicates which flows would be 
impacted if the staged policy is enforced.

Toggle on/off “Changed applied” to see what flows actually changed.

In the example below, we can see that there would be some denied flows if the policy were enforced.

![Previewing the impact of enforcing a staged policy]({{site.url}}/images/staged-network-policies/pip.png)

#### Enforce a staged policy

From the **Policies** pane, select **Edit policy** for the staged policy, and click **ENFORCE**.

The staged policy is deleted, and the enforced policy is created or updated (depending on whether it already exists).

#### Create a staged policy using kubectl

You can manage staged policies the same way as enforced policies using `kubectl`.

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
