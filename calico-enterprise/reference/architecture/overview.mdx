---
title: Component architecture
description: Understand the Calico Enterprise components and the basics of BGP networking.
canonical_url: '/reference/architecture/overview'
---

### About {{site.prodname}} architecture

The following diagram shows the components that comprise a Kubernetes on-premises deployment using the {{site.prodname}} CNI for networking and network policy.

**Tip**: For best visibility, right-click on the image below and select "Open image in new tab"

![calico-components]({{site.baseurl}}/images/architecture-ee.svg)

Calico open-source components are the foundation of {{site.prodname}}. {{site.prodname}} provides value-added components for visibility and troubleshooting, compliance, policy lifecycle management, threat and anomaly detection, and multi-cluster management.

### {{site.prodname}} components

 - [calicoq](#calicoq)
 - [Compliance](#compliance)
 - [Elasticsearch gateway](#elasticsearch-gateway)
 - [Intrusion detection](#intrusion-detection)
 - [kube-controllers](#kube-controllers)
 - [Manager](#manager)
 - [Packet capture API](#packet-capture-api)
 - [Prometheus API service](#prometheus-api-service)

### Bundled third-party components

- [fluentd](#fluentd)
- [Elasticsearch and Kibana](#elasticsearch-and-kibana)
- [Prometheus](#prometheus)

### Calico open-source components

 - [API server](#api-server)
 - [Felix](#felix)
 - [BIRD](#bird)
 - [calicoctl](#calicoctl)
 - [calico-node](#calico-node)
 - [confd](#confd)
 - [CNI plugin](#cni-plugin)
 - [Datastore plugin](#datastore-plugin)
 - [IPAM plugin](#ipam-plugin)
 - [Typha](#typha) 

### Kubernetes components

- [Kubernetes API server](#kubernetes-api-server)
- [kubectl](#kubectl)

### Cloud orchestrator plugins (not pictured)

Translates the orchestrator APIs for managing networks to the {{site.prodname}} data-model and datastore.

For cloud providers, {{site.prodname}} has a separate plugin for each major cloud orchestration platform. This allows {{site.prodname}} to tightly bind to the orchestrator, so users can manage the {{site.prodname}} network using their orchestrator tools. When required, the orchestrator plugin provides feedback from the {{site.prodname}} network to the orchestrator. For example, providing information about Felix liveness, and marking specific endpoints as failed if network setup fails.

### {{site.prodname}} components

#### calicoq

**Main task**: A command line tool for policy inspection to ensure policies are configured as intended. For example, you can determine which endpoints a selector or policy matches, or which policies apply to an endpoint. Requires a separate installation. [calicoq]({{site.baseurl}}/reference/calicoq/).

#### Compliance

**Main task**: Generates compliance reports for the Kubernetes cluster. Report are based on archived flow and audit logs for {{site.prodname}} resources, plus any audit logs you’ve configured for Kubernetes resources in the Kubernetes API server. Compliance reports provide the following high-level information:

- Protection
  - Endpoints explicitly protected using ingress or egress policy
- Policies and services
  - Policies and services associated with endpoints
  - Policy audit logs
- Traffic
  - Allowed ingress/egress traffic to/from namespaces, and to/from the internet

Compliance is comprised of these components:

**compliance-snapshotter**

Handles listing of required Kubernetes and {{site.prodname}} configuration and pushes snapshots to Elasticsearch. Snapshots give you visibility into configuration changes, and how the cluster-wide configuration has evolved within a reporting interval.

**compliance-reporter**

Handles report generation. Reads configuration history from Elasticsearch and determines time evolution of cluster-wide configuration, including relationships between policies, endpoints, services and networksets. Data is then passed through a zero-trust aggregator to determine the "worst-case outlyers" in the reporting interval.

**compliance-controller**

Reads report configuration, and manages creation, deletion, and monitoring of report generation jobs.

**compliance-server**

Provides the API for listing, downloading, and rendering reports, and RBAC by performing authentication and authorization through the Kubernetes API server. RBAC is determined from the users RBAC for the GlobalReportType and GlobalReport resources.

**compliance-benchmarker**

A daemonset that runs checks in the CIS Kubernetes Benchmark on each node so you can see if Kubernetes is securely deployed. 

#### Elasticsearch gateway

**Main task**: Protects managed clusters from potential attacks in a multi-cluster management (mcm) deployment. Enforces that 1) managed cluster components do not get credentials for an Elasticsearch user (for access/permissions to Elasticsearch and Kibana), and 2) all Elasticsearch requests from a managed cluster are only on an index that the cluster is allowed to access. In short, a compromised component in a managed cluster cannot write data or create indexes for another cluster/tenant.

#### Intrusion detection

**Main task**: Consists of a controller that handles integrations with threat intelligence feeds and {{site.prodname}} custom alerts, and an installer that installs the Kibana dashboards for viewing jobs through the Kibana UI.

#### kube-controllers

**Main task**: Monitors the Kubernetes API and performs actions based on cluster state. The {{site.prodname}} kube-controllers container includes these controllers:

- Node
- Service
- Federated services
- Authorization
- Elasticsearch configuration
- Managed cluster (for management clusters only)

#### Manager

**Main task**: Provides network traffic visibility, centralized multi-cluster management, threat-defense troubleshooting, policy lifecycle management, and compliance using a browser-based UI for multiple roles/stakeholders. [Manager]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.Manager).

#### Packet capture API

**Main task**: Retrieves capture files (pcap format) generated by a packet capture for use with network protocol analysis tools like Wireshark. The packet capture feature is installed by default in all cluster types. Packet capture data is visible in the Manager UI, service graph. 

#### Prometheus API service

**Main task**: A proxy querying service that checks a user’s token RBAC to validate its scope and forwards the query to the Prometheus monitoring component.  

### Bundled third-party components

#### Elasticsearch and Kibana 

**Main task**: Built-in third-party search-engine and visualization dashboard, which provide logs for visibility into workloads, to troubleshoot Kubernetes clusters. Installed and configured by default. [Elasticsearch]({{site.baseurl}}/visibility/). 

#### fluentd

**Main task**: Collects and forwards {{site.prodname}} logs (flows, DNS, L7) to Elasticsearch. Open source data collector for unified logging. {% include open-new-window.html text='fluentd open source' url='https://www.fluentd.org/' %}.

#### Prometheus

**Main task**:  The default monitoring component for collecting {{site.prodname}} policy metrics. It can also be used to collect metrics on calico/nodes from Felix. Prometheus is an open-source toolkit for systems monitoring and alerting. [Prometheus metrics]({{site.baseurl}}/reference/felix/prometheus), and [Configure Prometheus]({{site.baseurl}}/maintenance/monitor/).

### Calico open-source components

#### API server

**Main task**: Allows users to manage {{site.prodname}} resources such as policies and tiers through `kubectl` or the Kubernetes API. `kubectl` has significant advantages over `calicoctl` including: audit logging, RBAC using Kubernetes Roles and RoleBindings, and not needing to provide privileged  Kubernetes CRD access to anyone who needs to manage resources. [API server]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.APIServer).

#### BIRD

**Main task**: Gets routes from Felix and distributes to BGP peers on the network for inter-host routing. Runs on each node that hosts a Felix agent. Open source, internet routing daemon. [BIRD]({{site.baseurl}}/reference/node/configuration#content-main).

The BGP client is responsible for:

- **Route distribution**

    When Felix inserts routes into the Linux kernel FIB, the BGP client distributes them to other nodes in the deployment. This ensures efficient traffic routing for the deployment.

- **BGP route reflector configuration**

    BGP route reflectors are often configured for large deployments rather than a standard BGP client. (Standard BGP requires that every BGP client be connected to every other BGP client in a mesh topology, which is difficult to maintain.) 
    For redundancy, you can seamlessly deploy multiple BGP route reflectors. Note that BGP route reflectors are involved only in control of the network: endpoint data does not passes through them. When the {{site.prodname}} BGP client advertises 
    routes from its FIB to the route reflector, the route reflector advertises those routes to the other nodes in the deployment.

#### calicoctl

**Main task**: Command line interface used largely during pre-installation for CRUD operations on {{site.prodname}} objects. `kubectl` is the recommended CLI for CRUD operations. calicoctl is available on any host with network access to the {{site.prodname}} datastore as either a binary or a container. Requires separate installation. [calicoctl]({{site.baseurl}}/reference/calicoctl/)).

#### calico-node

**Main task**: Bundles key components that are required for networking containers with {{site.prodname}}:

- Felix
- BIRD
- confd

The calico repository contains the Dockerfile for calico-node, along with various configuration files to configure and “glue” these components together. In addition, we use runit for logging (svlogd) and init (runsv) services. [calico-node]({{site.baseurl}}/reference/node/configuration).

#### CNI plugin

**Main task**: Provides {{site.prodname}} networking for Kubernetes clusters. 

The Calico CNI plugin allows you to use Calico networking for any orchestrator that makes use of the CNI networking specification. The Calico binary that presents this API to Kubernetes is called the CNI plugin, and must be installed on every node in the Kubernetes cluster. Configured through the standard {% include open-new-window.html text='CNI configuration mechanism' 
url='https://github.com/containernetworking/cni/blob/master/SPEC.md#network-configuration' %}, and [Calico CNI plugin]({{site.baseurl}}/reference/cni-plugin/configuration).

#### confd

**Main task**: Monitors {{site.prodname}} datastore for changes to BGP configuration and global defaults such as AS number, logging levels, and IPAM information. An open source, lightweight configuration management tool. 

Confd dynamically generates BIRD configuration files based on the updates to data in the datastore. When the configuration file changes, confd triggers BIRD to load the new files. [Configure confd]({{site.baseurl}}/reference/node/configuration#content-main), and {% include open-new-window.html text='confd project' url='https://github.com/kelseyhightower/confd' %}.

#### Datastore plugin

**Main task**: The datastore for the {{site.prodname}} CNI plugin. The Kubernetes API datastore:

   - Is simple to manage because it does not require an extra datastore
   - Uses Kubernetes RBAC to control access to Calico resources
   - Uses Kubernetes audit logging to generate audit logs of changes to {{site.prodname}} resources

#### Felix

**Main task**: Programs routes and ACLs, and anything else required on the host to provide desired connectivity for the endpoints on that host. Runs on each machine that hosts endpoints. Runs as an agent daemon. [Felix resource]({{site.baseurl}}/reference/resources/felixconfig).

Depending on the specific orchestrator environment, Felix is responsible for:

- **Interface management**
    
    Programs information about interfaces into the kernel so the kernel can correctly handle the traffic from that endpoint. In particular, it ensures that the host responds to ARP requests from each workload with the MAC of the host, and enables IP forwarding for interfaces that it manages. It also monitors interfaces to ensure that the programming is applied at the appropriate time.

- **Route programming**
   
    Programs routes to the endpoints on its host into the Linux kernel FIB (Forwarding Information Base). This ensures that packets destined for those endpoints that arrive on at the host are forwarded accordingly.

- **ACL programming**
    
    Programs ACLs into the Linux kernel to ensure that only valid traffic can be sent between endpoints, and that endpoints cannot circumvent {{site.prodname}} security measures.

- **State reporting**

    Provides network health data. In particular, it reports errors and problems when configuring its host. This data is written to the datastore so it visible to other components and operators of the network.

> **Note**: `{{site.nodecontainer}}` can be run in *policy only mode* where Felix runs without BIRD and confd. This provides policy management without route distribution between hosts, and is used for deployments like managed cloud providers.
{: .alert .alert-info}

#### IPAM plugin

**Main task**: Uses {{site.prodname}}’s IP pool resource to control how IP addresses are allocated to pods within the cluster. It is the default plugin used by most {{site.prodname}} installations. It is one of the {{site.prodname}} [CNI plugins]({{site.baseurl}}/reference/cni-plugin/configuration).

#### Typha

**Main task**: Increases scale by reducing each node’s impact on the datastore. Runs as a daemon between the datastore and instances of Felix. Installed by default, but not configured. {% include open-new-window.html text='Typha description' url='https://github.com/projectcalico/typha' %}, and [Typha component]({{site.baseurl}}/reference/typha/).

Typha maintains a single datastore connection on behalf of all of its clients like Felix and confd. It caches the datastore state and deduplicates events so that they can be fanned out to many listeners. Because one Typha instance can support hundreds of Felix instances, it reduces the load on the datastore by a large factor. And because Typha can filter out updates that are not relevant to Felix, it also reduces Felix’s CPU usage. In a high-scale (100+ node) Kubernetes cluster, this is essential because the number of updates generated by the API server scales with the number of nodes.

### Kubernetes components

#### Kubernetes API server

**Main task**: A Kubernetes component that validates and configures data for the API objects (for example, pods, services, and others). Proxies requests for {{site.prodname}} API resources to the Kubernetes API server through an aggregation layer.

#### kubectl

**Main task**: The recommended command line interface for CRUD operations on {{site.prodname}} and Calico objects. {% include open-new-window.html text='kubectl' url='https://kubernetes.io/docs/reference/kubectl/overview/' %}.
