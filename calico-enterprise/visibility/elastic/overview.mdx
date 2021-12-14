---
title: Overview 
description: Summary of the out-of-box features for Calico Enterprise logs.
canonical_url: /visibility/elastic/overview
---

### Big picture

Use {{site.prodname}} log data for visibility and troubleshooting Kubernetes clusters.

### Value

Workloads and policies are highly dynamic. To troubleshoot Kubernetes clusters, you need logs with workload identity and context. {{site.prodname}} deploys an Elasticsearch cluster and Kibana instance during installation with these features:

- Logs with workload context
- Centralized log collection for multiple clusters for {{site.prodname}} multi-cluster-management
- View Elasticsearch logs in {{site.prodname}} Manager UI (Kibana dashboard and Flow Visualizer), and the {% include open-new-window.html text='Elasticsearch API' url='https://www.elastic.co/guide/en/elasticsearch/reference/current/search.html' %}
- Standard Kubernetes RBAC for granular access control to logs 
- Collect/archive logs or subset of logs
- Log aggregation for high-volume logs
- Configure data retention settings to manage cluster disk space 
- Integration with third-party tools like Amazon S3, Syslog, Splunk

### Concepts

#### Logs types

Elasticsearch logs provide the visibility and troubleshooting backend for {{site.prodname}}.

| Log type | Description                                                  | Log source                                       | RBAC         | Index                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------ | ------------ | ----------------------------- |
| flow     | Network flows for workloads: source and destination namespaces, pods, labels, and policies | {{site.prodname}} cnx-node (Felix)               | `flows`      | `tigera_secure_ee_flows`      |
| audit    | Audit logs for {{site.prodname}} resources                   | {{site.prodname}} apiserver                      | `audit_ee`   | `tigera_secure_ee_audit_ee`   |
|          | Audit logs for Kubernetes resources                          | Kubernetes apiserver                             | `audit_kube` | `tigera_secure_ee_audit_kube` |
|          |                                                              | Both audit logs above                            | `audit*`     | `tigera_secure_ee_audit*`     |
| bgp      | {{site.prodname}} networking BGP peering and route propagation | {{site.prodname}} cnx-node (BIRD)                | `ee_bgp`     | `tigera_secure_ee_bgp.*`      |
| dns      | DNS lookups and responses from {{site.prodname}} domain-based policy | {{site.prodname}} cnx-node (Felix)               | `ee_dns`     | `tigera_secure_ee_dns`        |
| ids      | {{site.prodname}} intrusion detection events: anomaly detection, suspicious IPs, suspicious domains, and global alerts | {{site.prodname}} intrusion-detection-controller | `ee_events`  | `tigera_secure_ee_events`     |

>**Note**: Because of their high-volume, flow and dns logs support aggregation.
{: .alert .alert-info}

#### Default log configuration and security

{{site.prodname}} automatically installs fluentd on all nodes and collects flow, audit, and DNS logs. You can configure additional destinations like Amazon S3, Syslog, Splunk.

{{site.prodname}} enables user authentication in Elasticsearch, and secures access to Elasticsearch and Kibana instances using network policy.

#### RBAC and log access

You control user access to logs using the standard Kubernetes RBAC cluster role and cluster role binding. For example:

```
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: bob-es-access
subjects:
- kind: User
  name: bob
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: audit-ee-only
  apiGroup: rbac.authorization.k8s.io
```

You configure Elasticsearch log access per cluster using RBAC and the Kubernetes API group, `lma.tigera.io`. For example:

```
  apiGroups: ["lma.tigera.io"]
  resources: ["app-cluster"]
  resourceNames: ["flows", "dns"]
  verbs: ["get"] 

```

#### Logs for compliance reporting

{{site.prodname}} compliance reports are based on archived **flow logs** and **audit logs** for these resources:

- Pods
- Host endpoints
- Service accounts
- Namespaces
- Kubernetes service endpoints
- Global network sets
- {{site.prodname}} and Kubernetes network policies
- Global network policies
- Network sets

{{site.prodname}} also supports archiving [Cloudwatch for EKS audit logs]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.LogCollectorSpec).

### Above and beyond

- [Log storage recommendations]({{site.baseurl}}/maintenance/logstorage/log-storage-recommendations)
- [Configure RBAC for Elasticsearch logs]({{site.baseurl}}/visibility/elastic/rbac-elasticsearch)
- [Configure flow log aggregation]({{site.baseurl}}/visibility/elastic/flow/aggregation)
- [Audit logs]({{site.baseurl}}/visibility/elastic/audit-overview)
- [BGP logs]({{site.baseurl}}/visibility/elastic/bgp)
- [DNS logs]({{site.baseurl}}/visibility/elastic/dns/dns-logs)
- [Archive logs]({{site.baseurl}}/visibility/elastic/archive-storage)
- [Log collection options]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.LogCollectorSpec)
