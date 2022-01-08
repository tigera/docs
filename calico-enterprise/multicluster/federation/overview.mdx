---
title: Overview
description: Configure local clusters for cross-cluster workload and host endpoints sharing, and cross-cluster service discovery. 
canonical_url: /multicluster/federation/overview
---

### Big picture

Configure local clusters for cross-cluster workload and host endpoints sharing, and cross-cluster service discovery.

### Value

At some point in your Kubernetes journey, you may have multiple teams (development, QA, and others) that need to work in parallel across multiple clusters, without negative impacts on each other. By default, deployed Kubernetes pods can only see pods within their cluster. Using network policy and services, you can grant access to other clusters and the applications they are running. {{site.prodname}} provides these federation features:

- **Federated endpoint identity** 

  Allow a local Kubernetes cluster to include the workload endpoints (pods) and host endpoints of a remote cluster in the calculation of local policies applied on each node of the local cluster. 

- **Federated services** 

  Provides cross-cluster service discovery for a local cluster.

### Concepts

#### Federation: network layer features

{{site.prodname}} federated endpoint identity and federated services are implemented in Kubernetes at the network layer. To apply fine-grained network policy between multiple clusters, the pod source and destination IPs must be preserved. So these features are valuable only if your clusters are designed with common networking across clusters with no encapsulation (for example, BGP routing or VPC routing). (Although there are ways to achieve a common networking equivalent across clusters using overlays, this is outside the realm of this article.) 

#### Federated endpoint identity

A simple example of implementing policy across multiple clusters is: 

"Cluster A's network policy allows **web** to talk to **db**, but all of the **web** is in cluster A, and all of the **db** is in cluster B." 

Federated endpoint identity solves this by allowing a local Kubernetes cluster to include the workload endpoints (pods) and host endpoints of a remote cluster in the calculation of the local policies for each node. 

> **Note**: This feature does not *federate network policies*; policies from a remote cluster are not applied to the endpoints on the local cluster, and the policy from the local cluster is rendered only locally and applied to the local endpoints.
{: .alert .alert-info}

#### Federated services 

Federated services works with federated endpoint identity, providing cross-cluster service discovery for a local cluster. If you have an existing service discovery mechanism, this feature is optional. 

Federated services use the Tigera Federated Services Controller to federate all {% include open-new-window.html text='Kubernetes endpoints' url='https://v1-21.docs.kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#endpoints-v1-core' %} (workload and host endpoints) across all of the clusters. The Federated Services Controller accesses service and endpoints data in the remote clusters directly through the Kubernetes API.

### Next steps

[Configure federated endpoint identity ]({{site.baseurl}}/multicluster/federation/kubeconfig)
