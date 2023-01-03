---
title: Create policy recommendation
description: Create a Calico Enterprise policy recommendation to secure unprotected namespaces or workloads.
---

### Big picture

Create a {{site.prodname}} policy recommendation to secure namespaces or workloads.

### Value

After installing {{site.prodname}}, one of the first things developers need to do is secure unprotected workloads that do not have network policy enforcement. (For example, by default, Kubernetes pods accept traffic from any source.) The {{site.prodname}} Manager policy recommendation feature helps developers with minimal, to no experience to create a {{site.prodname}} network policy to secure namespaces or workloads.

This self-service feature for developers allows network security teams to focus on the overall network policy labeling, evaluation, RBAC, and workflow.

### Features

This how-to guide uses the following {{site.prodname}} features:
- **Flow logs**
- **StagedNetworkPolicy** resource
- **NetworkPolicy** resource (optional)

### Concepts

#### Policy recommendations: when and why

Policy recommendation automatically creates policies that explicitly allow traffic because of {{site.prodname}}'s [day-one zero trust](policy-best-practices#policy-best-practices-for-day-one-zero-trust) enhanced security posture.

A typical scenario for using the policy recommendation feature is:

- Your Kubernetes clusters are up and running under {{site.prodname}}
- Clusters are successfully running, and workloads have been running long enough to gather traffic for applications
- Developers want to secure their namespaces (or workloads, pods, and endpoints using advanced options)

Developers without any experience using {{site.prodname}} network policy, can simply specify a few parameters, click a button, and create a valid {{site.prodname}} network policy to protect their namespaces.

#### Default tier and Kubernetes policies

During installation, all Kubernetes network policies land in the **default tier** in {{site.prodname}} Manager. This is perfect because the minimum permissions for non-Admin users include the default tier. Developers can run the policy recommendation feature in the default tier.

#### Preview and stage the policy

After developers get a recommended {{site.prodname}} network policy to secure the namespace (or workload), they can **preview it**, and **stage it** to observe the impact of a recommended policy on network traffic before applying it (if they are granted permissions). Remember, the format of a recommended {{site.prodname}} network policy is valid and accurate; it is only totally “valid” when you validate the intended results during staging.

#### Tips for creating policy recommendations

The policy recommendation feature does not look into existing policies. It looks only into *flow logs that match a request, and only at entries with an `Allow` action*. Because of this, you should run your workloads for a reasonable amount of time so “typical network traffic” for your application can be gathered.

### Before you begin...

#### Flow logs

Ensure that flow logs are generated and sent to Elasticsearch.

#### Permissions

- To create a policy recommendation, you must have permission to read flow logs.
- To stage a policy recommendation, you must have permission to create a **StagedNetworkPolicy** in the namespace of the workload that is being secured.
- To enforce a policy, you must have permission to create a **NetworkPolicy** in the namespace that is being secured. It is recommended to stage a policy to verify its impact before enforcing it.

### How to

#### Create a policy recommendation

To create a {{site.prodname}} policy recommendation, go the **Recommend Policy** page,

![Navigate to Policy Recommendation]({{site.baseurl}}/images/generate-policy-recommendation/recommend-policy-action-bar.png)

and specify:

- **Time Range**
- **Namespace**

And click, **Recommend**.

![Create a Policy Recommendation]({{site.baseurl}}/images/generate-policy-recommendation/recommend-policy-screen.png){:height="75%" width="75%"}

Click on **Advanced Options** and specify:

- **Name** of the workload
- (optional)  "Unprotected only" checkbox considers flow logs that are not explicitly allowed by a network policy.

![Create a Policy Recommendation]({{site.baseurl}}/images/generate-policy-recommendation/recommend-policy-screen-advanced-options.png){:height="75%" width="75%"}

to create workload endpoint based recommendations.

If relevant flow logs are found within the selected time range for the namespace or the workload endpoint, the recommended policy is displayed in the **Create Policy** screen.

![Preview or Stage a Policy Recommendation]({{site.baseurl}}/images/generate-policy-recommendation/create-policy-action-buttons.png)

Then, you can assess the impact of the recommended policy using **Preview** and/or **Stage** to observe the effect on traffic without impacting the actual traffic flows.

>**Note**: We do not recommend using **Enforce** without first assessing the impact of the recommended policy using **Preview** and/or **Stage**.
{: .alert .alert-info}

### Troubleshooting

**Error**: No matching flows to compute rules for

**Solution/workaround**: Informational message that indicates no flow log entries with an `Allow` action were found in the workflow to create a policy.

### Above and beyond

- [Stage, preview impacts, and enforce policy]({{site.baseurl}}/security/staged-network-policies)
