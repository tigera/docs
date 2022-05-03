---
title: Manager UI tutorial
description: Tour the main features of Manager UI.
canonical_url: /visibility/get-started-cem
---

### What you will learn

- Manager UI features and controls
- How to gain visibility into clusters 

Let's go through each item in the Manager left navbar from top to bottom. You can follow along using any cluster. 

### Dashboards

> From the left navbar, click Dashboards.

Dashboards are a birds-eye view of cluster activity. Note the following:

- The filter panel at the top lets you change the time range 
- The **Layout Settings** shows the default metrics. To get WireGuard metrics for pod-to-pod and host-to-host encryption, you must [enable WireGuard]({{site.baseurl}}/compliance/encrypt-cluster-pod-traffic).

![dashboards]({{site.baseurl}}/images/dashboards.png)

### Service Graph

> From the left navbar, select **Service Graph**, **Default**

Service Graph provides a point-to-point, topographical representation of network traffic within your cluster. It is the primary tool for visibility and troubleshooting.

![service-graph]({{site.baseurl}}/images/service-graph.png)

**Namespaces**  

Namespaces are the default view in Service Graph. 

When you expand the top right panel `<<`, you see a detailed view of the service-to-service communications for the namespace. 

![service-graph-namespace]({{site.baseurl}}/images/service-graph-namespace.png)   

**Nodes and edges**  

Lines going to/from nodes are called edges. When you click on a node or edge, the right panel shows details, and the associated flow logs are automatically filtered in the bottom panel. 

![edges]({{site.baseurl}}/images/edges.png)

**Layers**   

Layers allow you to create meaningful groupings of resources so you can easily hide and show them on the graph. For example, you can group resources for different platform infrastructure types in your cluster like networking, storage, and logging. 

> Click the panel on the left (`>>`) by the Namespaces breadcrumb, and then expand the Tigera components layer. 

![service-graph-layers]({{site.baseurl}}/images/service-graph-layers.png)

The **Tigera components** layer contains namespaces for {{site.prodname}} networking components, and a view of interest to Dev/Ops. 

> Click the vertical ellipses and select, **Hide layer**. Notice that only the business application namespaces remain visible in the graph. 

> To make this layer less visible, select **Restore layer** and click **De-emphasize layer**. 

**Logs, alerts, and capture jobs**  

The panel at the bottom below the graph provides tools for troubleshooting connectivity and performance issues. **Logs** (Flows, DNS, and HTTP) are the foundation of security and observability in {{site.prodname}}. When you select a node or edge in the graph, logs are filtered for the node or service. For example, here is a flow log with details including how the policies were processed in tiers. 

![service-graph-flows]({{site.baseurl}}/images/service-graph-flows.png) 

**Alerts**

For convenience, the Alerts tab duplicates the alerts you have enabled in the **Alerts tab** in the left navbar. By default, alerts are not enabled. 

**Capture jobs**

Service Graph integrates a packet feature for capturing traffic for a specific namespace, service, replica set, daemonset, statefulset, or pod. You can then download capture files to your favorite visualization tool like WireShark.

> Right-click on any endpoint to start or schedule a capture.

![packet-capture-service]({{site.baseurl}}/images/packet-capture-service.png) 

**Flow Visualizations**

> From the left navbar, select **Service Graph**, **Flow Visualizations**. 

Flow Visualizer (also called, "FlowViz") is a {{site.prodname}} tool for drilling down into network traffic within the cluster to troubleshoot issues. The most common use of Flow Visualizer is to drill down and pinpoint which policies are allowing and denying traffic between services. 

![flow-viz]({{site.baseurl}}/images/flow-viz.png)

### Policies

> From the left navbar, click **Policies**.

Network policy is the primary tool for securing a Kubernetes network. Policy is used to restrict network traffic (egress and ingress) in your cluster so only the traffic that you want to flow is allowed. {{site.prodname}} supports these policies:

- {{site.prodname}} network policy
- {{site.prodname}} global network policy
- Kubernetes policy 

{{site.prodname}} uses **tiers** (also called, hierarchical tiers) to provide guardrails for managing network policy across teams. Policy tiers allow users with more authority (for example, Dev/ops user) to enforce network policies that take precedence over teams (for example, service owners and developers).

**Policies Board** is the default view for managing tiered policies. 

![policy-board]({{site.baseurl}}/images/policy-board.png)

Users typically use a mix of Policy Board and YAMLs. Note that you can export one or all policies in a tier to YAML.

The **Policy Board filter** lets you filter by policy types and label selectors. 

![policy-filters]({{site.baseurl}}/images/policy-filters.png)

The following features provide more security and guardrails for teams.

**Recommended a policy** 

> In Policies Board, click **Recommend a policy**. 

One of the first things you'll want to do after installation is to secure unprotected pods/workloads with network policy. (For example, Kubernetes pods allow traffic from any source by default.) The Recommend a policy feature generates policies that protect specific endpoints in the cluster. Users with minimal experience with network policy can easily get started.

![recommend-policy]({{site.baseurl}}/images/recommend-policy.png)

**Policy stage** 

When you create a policy, it is a best practice to stage it to evaluate the effects before enforcing it. After you verify that a staged network policy is allowing traffic as expected, you can enforce it. 

![stage-policyl]({{site.baseurl}}/images/stage-policy.png)

**Preview** 

When you edit a policy, you can select **Preview** to see how changes may affect existing traffic. 

![policy-preview]({{site.baseurl}}/images/policy-preview.png)

### Endpoints

> From the left navbar, click **Endpoints**.

**Endpoint Details**

This page is a list of all pods in the cluster (also known as workload endpoints).

![endpoints]({{site.baseurl}}/images/endpoints.png)

**Node List**

This page lists all nodes associated with your cluster. 

![node-list]({{site.baseurl}}/images/node-list.png)

### Network Sets

Network sets and global network sets are {{site.prodname}} resources for defining IP subnetworks/CIDRs, which can be matched by standard label selectors in policy (Kubernetes or {{site.prodname}}). They are a powerful feature for use/reuse and scaling policy. 

A simple use case is to limit traffic to/from external networks. For example, you can create a global network set with "deny-list CIDR ranges 192.0.2.55/32 and 203.0.113.0/24", and then reference the network set in a global network policy. This also allows you to see this traffic in Service Graph. 

![networksets]({{site.baseurl}}/images/networksets.png)

### Managed clusters

> From the left navbar, click **Managed clusters**.

This page is where you switch views between clusters in Manager UI. When you connect to a different cluster, the entire Manager view changes to reflect the selected cluster. 

![managed-clusters]({{site.baseurl}}/images/managed-clusters.png)

### Compliance 

> From the left navbar, click **Compliance**.

Compliance tools that rely on periodic snapshots, do not provide accurate assessments of Kubernetes workloads against your compliance standards. {{site.prodname}} compliance dashboard and reports provide a complete inventory of regulated workloads, along with evidence of enforcement of network controls for these workloads. Additionally, audit reports are available to see changes to any network security controls. 

**Compliance reports** are based on archived flow logs and audit logs for all {{site.prodname}} resources, and audit logs for Kubernetes resources in the Kubernetes API server. 

![cis-benchmark]({{site.baseurl}}/images/cis-benchmark.png)

Using the filter, you can select report types. 

![compliance-filter]({{site.baseurl}}/images/compliance-filter.png)

### Activity

> From the left navbar, select **Activity**, **Timeline**. 

**Timeline**

What changed, who did it, and when? This information is critical for security. Native Kubernetes doesn’t provide an easy way to capture audit logs for pods, namespaces, service accounts, network policies, and endpoints. The {{site.prodname}} timeline provides audit logs for all changes to network policy and other resources associated with your {{site.prodname}} deployment. 

![timeline]({{site.baseurl}}/images/timeline.png)

> From the left navbar, selection **Activity**, **Alerts**. 

**Alerts**

How do you know if you have an infected workload? A possible threat? {{site.prodname}} detects and alerts on unexpected network behavior that may indicate a security breach. You can create alerts for:

- Known attacks and exploits (for example, exploits found at Shopify, Tesla, Atlassian)
- DOS attempts
- Attempted connections to botnets and command and control servers
- Abnormal flow volumes or flow patterns based on machine learning

![alerts]({{site.baseurl}}/images/alerts.png)

As shown, there are many types of alerts you can enable. None are enabled by default.  

### Kibana

{{site.prodname}} includes a fully-integrated deployment of Elasticsearch to collect flow
log data that drives key features like the Flow Visualizer, metrics in the Dashboard and Policy Board, policy automation, and testing features and security. {{site.prodname}} also embeds Kibana so you can view raw log data for the traffic within your cluster. 

> From the left navbar, click **Kibana**.

**Dashboards**

{{site.prodname}} comes with built-in dashboards. 

![kibana-dashboards]({{site.baseurl}}/images/kibana-dashboards.png)

**Log data**

Kibana provides its own set of filtering capabilities to drill down into log data. For example, use filters to drill into flow log data for specific namespaces and pods. Or view details and metadata for a single flow log entry.

![kibana]({{site.baseurl}}/images/kibana.png)

Now that you understand the basics, we recommend the following:

- [Get started with tiered network policy]({{site.baseurl}}/security/tiered-policy)
- [Get started with network sets]({{site.baseurl}}/security/networksets)
