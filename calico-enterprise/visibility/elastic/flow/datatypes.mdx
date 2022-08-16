---
title: Flow log data types
description: Data that Calico Enterprise sends to Elasticsearch. 
canonical_url: /visibility/elastic/flow/datatypes
---

### Big picture

{{site.prodname}} sends the following data to Elasticsearch. 

The following table details the key/value pairs in the JSON blob, including their {% include open-new-window.html text='Elasticsearch datatype' url='https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html' %}.

| Name                  | Datatype          | Description |
| --------------------- | ----------------- | ----------- |
| `host`                | keyword           | Name of the node that collected the flow log entry. |
| `start_time`          | date              | Start time of log collection in UNIX timestamp format. |
| `end_time`            | date              | End time of log collection in UNIX timestamp format. |
| `action`              | keyword           | - `allow`: {{site.prodname}} accepted the flow.<br />- `deny`: {{site.prodname}} denied the flow. |
| `bytes_in`            | long              | Number of incoming bytes since the last export. |
| `bytes_out`           | long              | Number of outgoing bytes since the last export. |
| `dest_ip`             | ip                | IP address of the destination pod. A null value indicates aggregation. |
| `dest_name`           | keyword           | Contains one of the following values:<br />- Name of the destination pod.<br />- Name of the pod that was aggregated or the endpoint is not a pod. Check <code>dest_name_aggr</code> for more information, such as the name of the pod if it was aggregated. |
| `dest_name_aggr`      | keyword           | Contains one of the following values:<br />- Aggregated name of the destination pod. <br />- `pvt`: endpoint is not a pod. Its IP address belongs to a private subnet. <br />- `pub`: endpoint is not a pod. Its IP address does not belong to a private subnet. It is probably an endpoint on the public internet. |
| `dest_namespace`      | keyword           | Namespace of the destination endpoint. A `-` means the endpoint is not namespaced.|
| `dest_port`           | long              | Destination port. Not applicable for ICMP packets. |
| `dest_service_name`      | keyword        | Name of the destination service. A `-` means the original destination did not correspond to a known Kubernetes service (e.g. a services ClusterIP). |
| `dest_service_namespace` | keyword        | Namespace of the destination service. A `-` means the original destination did not correspond to a known Kubernetes service (e.g. a services ClusterIP). |
| `dest_service_port`      | keyword        | Port name of the destination service.<br />A `-` means :<br />- the original destination did not correspond to a known Kubernetes service (e.g. a services ClusterIP), or<br />- the destination port is aggregated.<br />A `*` means there are multiple service port names matching the destination port number. |
| `dest_type`           | keyword           | Destination endpoint type. Possible values:<br />- `wep`: A workload endpoint, a pod in Kubernetes.<br />- `ns`: A Networkset. If multiple Networksets match, then the one with the longest prefix match is chosen.<br />- `net`: A Network. The IP address did not fall into a known endpoint type.|
| `dest_labels`         | array of keywords | Labels applied to the destination pod. A hyphen indicates aggregation. |
| `dest_domains`        | array of keywords | Top level domains associated with the destination IP. Only valid for source reported flows to destinations external to the cluster. |
| `reporter`            | keyword           | - `src`: flow came from the pod that initiated the connection.<br />- `dst`: flow came from the pod that received the initial connection. |
| `num_flows`           | long              | Number of flows aggregated into this entry during this export interval. |
| `num_flows_completed` | long              | Number of flows that were completed during the export interval. |
| `num_flows_started`   | long              | Number of flows that were started during the export interval. |
| `num_process_names`   | long              | Number of unique process names aggregated into this entry during this export interval. |
| `num_process_ids`     | long              | Number of unique process ids aggregated into this entry during this export interval. |
| `num_process_args`    | long              | Number of unique process args aggregated into this entry during this export interval. |
| `nat_outgoing_ports`  | array of ints     | List of [NAT](https://en.wikipedia.org/wiki/Network_address_translation) outgoing ports for the packets that were Source NAT'd in the flow |
| `packets_in`          | long              | Number of incoming packets since the last export. |
| `packets_out`         | long              | Number of outgoing packets since the last export. |
| `proto`               | keyword           | Protocol. |
| `policies`            | array of keywords | Policy or policies that allowed or denied this flow. Staged policy names are prefixed with "staged:". |
| `process_name`        | keyword           | The name of the process that initiated or received the connection or connection request. This field will have the executable path if flowLogsCollectProcessPath is enabled. A "-" indicates that the process name is not logged. A "*" indicates that the per flow process limit has exceeded and the process names are now aggregated. |
| `process_id`          | keyword           | The process ID of the corresponding process (indicated by the `process_name` field) that initiated or received the connection or connection request. A "-" indicates that the process ID is not logged. A "*" indicates that there are more than one unique process IDs for the corresponding process name. |
| `process_args`        | array of strings  | The arguments with which the executable was invoked. The size of the list depends on the per flow process args limit. |
| `source_ip`           | ip                | IP address of the source pod. A null value indicates aggregation. |
| `source_name`         | keyword           | Contains one of the following values: <br />- Name of the source pod.<br />- Name of the pod that was aggregated or the endpoint is not a pod. Check <code>source_name_aggr</code> for more information, such as the name of the pod if it was aggregated. |
| `source_name_aggr`    | keyword           | Contains one of the following values: <br />- Aggregated name of the source pod. <br />- `pvt`: Endpoint is not a pod. Its IP address belongs to a private subnet.<br />- `pub`: the endpoint is not a pod. Its IP address does not belong to a private subnet. It is probably an endpoint on the public internet. |
| `source_namespace`    | keyword           | Namespace of the source endpoint. A `-` means the endpoint is not namespaced.|
| `source_port`         | long              | Source port. A null value indicates aggregation. |
| `source_type`         | keyword           | The type of source endpoint. Possible values:<br />- `wep`: A workload endpoint, a pod in Kubernetes.<br />- `ns`: A Networkset. If multiple Networksets match, then the one with the longest prefix match is chosen.<br />- `net`: A Network. The IP address did not fall into a known endpoint type.|
| `source_labels`       | array of keywords | Labels applied to the source pod. A hyphen indicates aggregation. |
| `original_source_ips` | array of ips      | List of external IP addresses collected from requests made to the cluster through an ingress resource. This field is only available if capturing external IP addresses is configured. See the [documentation]({{site.baseurl}}/security/ingress) for more details. |
| `num_original_source_ips` | long          | Number of unique external IP addresses collected from requests made to the cluster through an ingress resource. This count includes the IP addresses included in the `original_source_ips` field. This field is only available if capturing external IP addresses is configured. See the [documentation]({{site.baseurl}}/security/ingress) for more details. |
| `tcp_mean_send_congestion_window` | long  | Mean tcp send congestion window size. This field is only available if flowLogsEnableTcpStats is enabled |
| `tcp_min_send_congestion_window`  | long  | Minimum tcp send congestion window size. This field is only available if flowLogsEnableTcpStats is enabled |
| `tcp_mean_smooth_rtt`  | long             | Mean smooth RTT in micro seconds. This field is only available if flowLogsEnableTcpStats is enabled |
| `tcp_max_smooth_rtt`   | long             | Maximum smooth RTT in micro seconds. This field is only available if flowLogsEnableTcpStats is enabled |
| `tcp_mean_min_rtt`     | long             | Mean MinRTT in micro seconds. This field is only available if flowLogsEnableTcpStats is enabled |
| `tcp_max_min_rtt`      | long             | Maximum MinRTT in micro seconds. This field is only available if flowLogsEnableTcpStats is enabled |
| `tcp_mean_mss`         | long             | Mean TCP MSS. This field is only available if flowLogsEnableTcpStats is enabled |
| `tcp_min_mss`          | long             | Minimum TCP MSS. This field is only available if flowLogsEnableTcpStats is enabled |
| `tcp_total_retransmissions`| long         | Total retranmitted packets. This field is only available if flowLogsEnableTcpStats is enabled |
| `tcp_lost_packets`         | long         | Total lost packets. This field is only available if flowLogsEnableTcpStats is enabled |
| `tcp_unrecovered_to`       | long         | Total unrecovered timeouts. This field is only available if flowLogsEnableTcpStats is enabled |

