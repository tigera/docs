---
title: L7 log data types
description: L7 data that Calico Enterprise sends to Elasticsearch. 
canonical_url: /visibility/elastic/l7/datatypes
feature_name: l7_logs
---

### Big picture

{{site.prodname}} sends the following data to Elasticsearch. 

The following table details the key/value pairs in the JSON blob, including their {% include open-new-window.html text='Elasticsearch datatype' url='https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html' %}.

| Name                     | Datatype          | Description |
| ------------------------ | ----------------- | ----------- |
| `host`                   | keyword           | Name of the node that collected the L7 log entry. |
| `start_time`             | date              | Start time of log collection in UNIX timestamp format. |
| `end_time`               | date              | End time of log collection in UNIX timestamp format. |
| `bytes_in`               | long              | Number of incoming bytes since the last export. |
| `bytes_out`              | long              | Number of outgoing bytes since the last export. |
| `duration_mean`          | long              | Mean duration time of all the requests that match this combination of L7 data in nanoseconds. |
| `duration_max`           | long              | Max duration time of all the requests that match this combination of L7 data in nanoseconds. |
| `count`                  | long              | Number of requests that match this combination of L7 data. |
| `src_name_aggr`          | keyword           | Contains one of the following values:<br />- Aggregated name of the source pod. <br />- `pvt`: endpoint is not a pod. Its IP address belongs to a private subnet. <br />- `pub`: endpoint is not a pod. Its IP address does not belong to a private subnet. It is probably an endpoint on the public internet. |
| `src_namespace`          | keyword           | Namespace of the source endpoint. |
| `src_type`               | keyword           | Source endpoint type. Possible values:<br />- `wep`: A workload endpoint, a pod in Kubernetes.<br />- `ns`: A Networkset. If multiple Networksets match, then the one with the longest prefix match is chosen.<br />- `net`: A Network. The IP address did not fall into a known endpoint type.|
| `dest_name_aggr`         | keyword           | Contains one of the following values:<br />- Aggregated name of the destination pod. <br />- `pvt`: endpoint is not a pod. Its IP address belongs to a private subnet. <br />- `pub`: endpoint is not a pod. Its IP address does not belong to a private subnet. It is probably an endpoint on the public internet. |
| `dest_namespace`         | keyword           | Namespace of the destination endpoint. |
| `dest_type`              | keyword           | Destination endpoint type. Possible values:<br />- `wep`: A workload endpoint, a pod in Kubernetes.<br />- `ns`: A Networkset. If multiple Networksets match, then the one with the longest prefix match is chosen.<br />- `net`: A Network. The IP address did not fall into a known endpoint type.|
| `dest_service_name`      | keyword           | Name of the destination service. This may be empty if the request was not made against a service. |
| `dest_service_namespace` | keyword           | Namespace of the destination service. This may be empty if the request was not made against a service. |
| `dest_service_port`      | long              | Destination service port. |
| `url`                    | keyword           | URL that the request was made against. |
| `response_code`          | keyword           | Response code returned by the request. |
| `method`                 | keyword           | HTTP method for the request. |
| `user_agent`             | keyword           | User agent of the request. |
| `type`                   | keyword           | Type of request made. Possible values include `tcp`, `tls`, and `html/<version>`. |

