---
title: Trace and block suspicious external IP addresses
description: Use flow logs to trace external IP addresses that access clusters.
canonical_url: /threat/suspicious-external-ips
feature_name: suspicious_external_ips
feature_name: feature_generic_all
---

## Big Picture

Use {{site.prodname}} flow logs to trace external IP addresses that access
clusters.

## Value

Anomaly detection is key to threat protection. {{site.prodname}} not only
captures North-South ingress traffic in flow logs, but also external IP
addresses that access clusters.

Having visibility into external IP addresses allows network security teams
to detect unusual amounts of traffic coming from any single IP address, or if
traffic is coming from an untrusted source.

Capturing ingress flow records is also necessary for compliance monitoring
and reporting.

## Features

This how-to guide uses the following features:

* Flow logs in Elasticsearch (or similar tool)

## Concepts

#### The hops in between matter

Typically, flow logs only show where traffic starts, and where it ends up
within the cluster. Starting and ending points are fine for intra-cluster
traffic, but not very helpful on their own for ingress because traffic
typically goes through intermediaries such as load balancers and ingress
proxies.

To expose external IP addresses in flow logs, {{site.prodname}} must also
track these intermediaries that function between the internet and the
cluster. When configured, {{site.prodname}} flow logs for traffic that has
traversed load balancers and web proxies will include both the source IP of
the intermediary and the original source IP of the connection.

#### Interpreting the hops of an external IP address

If you identify source IP addresses of malicious traffic, searching the flow
logs for the original source IP of the traffic will alert you if these sources
are hitting your cluster. For example, if there is a known malicious actor at
192.0.2.1, enabling ingress flow logs allow you to report on the source IP from
the HTTP headers in addition to the connection information we already collect.
If traffic from 192.0.2.1 is hitting your cluster, it should show up in your flow
logs, and appropriate actions can be taken to prevent such access.

#### Blocking suspicious IPs

We recommend that you investigate suspicious IPs before you block an IP address based
on the flow logs. If you decide to block an external IP address found in the original
source IP field of flow logs, note that since this information derives from the HTTP
headers, it is more appropriate to block this traffic at your firewall. If the
suspicious IP appears as the *source* IP, rather than the *original* source IP, then it
made a direct connection without an intermediary into your cluster.

## Before you begin

Ensure that intermediary components are configured. For example, enable direct server return
(for load balancers and such) and HTTP header forwarding (specifically for the
`X-Forwarded-For` and `X-Real-IP` headers).

The following ingress controllers are supported:
* [Kubernetes, Nginx](https://github.com/kubernetes/ingress-nginx){:target="_blank"}
* [Nginx, Nginx](https://github.com/nginxinc/kubernetes-ingress){:target="_blank"}

The following are required before starting to configure flow logs to trace external
IP addresses:
* {{site.prodname}} flow logs are running **with flow log aggregation level of 1 or 0**.
  See [Felix configuration documentation for flowLogsFileAggregationKindForAllowed]({{site.baseurl}}/reference/resources/felixconfig#spec)
  for more details.
* Ingress controllers/routers are running
* (OpenShift only) Syslog is running as a container in your cluster with the proper
  router configuration. For details, see {% include open-new-window.html text='OpenShift Documentation' url='https://docs.openshift.com/container-platform/4.3/welcome/index.html' %}.

Create a Kubernetes pull secret in the namespace your ingress controller or router syslog
server is running in.
```bash
kubectl create secret generic cnx-pull-secret -n <ingress controller namespace> --from-file=.dockerconfigjson=$HOME/.docker/config.json --type kubernetes.io/dockerconfigjson
```

## How to

#### Step 1: Set up the ingress log collector

To gather the appropriate information for consolidating source IPs with your existing flow
logs, you need to set up the ingress log collector and configure {{site.prodname}} to accept the
collected logs. The installation of the ingress log collector will be done in a later step.

1. Download the patch file to patch-ingress.yaml.
   ```
   curl {{ "/manifests/ingress/patch-ingress.yaml" | absolute_url }} -O
   ```

1. Modify patch-ingress.yaml so that the ingress controller container name appropriately
   reflects the container name in your ingress controller installation. Replace
   `<ingress-controller-name>` with the name of the ingress controller **container** in your pod.
   If you are running a router in OpenShift, replace `<ingress-controller-name>` with the name
   of the syslog **container** you have set up to receive the router logs in the below command.
   ```
   sed -i -e "s?<INGRESS_CONTROLLER_NAME>?<ingress-controller-name>?g" patch-ingress.yaml
   ```

1. In the “env” section of the ingress-collector container in `patch-ingress.yaml`, set the
   following environment variables to meet your needs:

| Environment Variable                | Default Value                         | Description |
| ----------------------------------- | ------------------------------------- | ----------- |
| `INGRESS_LOG_INTERVAL_SECONDS`      | 5 seconds                             | Interval in seconds for sending flow log information for processing. |
| `INGRESS_LOG_REQUESTS_PER_INTERVAL` | 10 IP addresses                       | Maximum number of unique IP addresses that are sent during each interval. All other requests beyond this limit are tracked in the count of requests. To ignore the maximum limit, set this to any negative number (for example, -1). |
| `INGRESS_LOG_PATH`                  | `/var/log/calico/ingress/ingress.log` | Path to ingress log files. |
| `FELIX_DIAL_TARGET`                 |                                       | Path of the socket for communication with Felix. |
| `LOG_LEVEL`                         | `Panic`                               | Logging level. There are seven levels: `Trace`, `Debug`, `Info`, `Warning`, `Error`, `Fatal` and `Panic`. |

#### Step 2: Enable communication with {{site.prodname}}

In order for the logs captured by the ingress log collector to be correlated with connection flow
logs properly, we need to enable communication between the ingress log collector and {{site.prodname}}. Follow
the directions based on your orchestrator.

**Kubernetes**

**Prerequisites**:

 - [{{site.prodname}} installed]({{site.baseurl}}/getting-started/)

Ingress flow log correlation requires the Policy Sync API to be enabled on Felix. To do this cluster-wide, modify the `default`
FelixConfiguration to set the field `policySyncPathPrefix` to `/var/run/nodeagent`.

```bash
kubectl patch felixconfiguration default --type='merge' -p '{"spec":{"policySyncPathPrefix":"/var/run/nodeagent"}}'
```
**OpenShift**

1. Download the appropriate patch file for enabling the Policy Sync API on Felix.
   ```
   curl {{ "/manifests/ingress/patch-flexvol.yaml" | absolute_url }} -O
   ```
1. Apply the Policy Sync API patch.
   ```
   oc patch daemonset calico-node -n kube-system --patch "$(cat patch-flexvol.yaml)"
   ```

#### Step 3: Install the ingress log collector

Now that Felix has been configured, apply the customized `patch-ingress.yaml`. If you are running
a router in OpenShift, replace the resource (`deployment` and `deploymentconfig` in the below
examples) and `<name of ingress controller deployment>` with the resource type and name of your
syslog server resource respectively.

Example Kubernetes command:
```
kubectl patch deployment <name of ingress controller deployment> -n <namespace> --patch "$(cat patch-ingress.yaml)"
```

Example OpenShift command:
```
oc patch deploymentconfig <name of syslog server resource> -n <namespace> --patch "$(cat patch-ingress.yaml)"
```

#### Step 4: Configure your ingress controller/router

To read out the correct information to correlate Ingress source IPs with flow logs, add
the appropriate information to the ingress controller logs.

1. Add the following json template to the logging format for your chosen ingress
   controller/router:

   ```
   tigera_secure_ee_ingress: {"source_port": $realip_remote_port, "destination_ip": "$server_addr", "destination_port": $server_port, "source_ip": "$realip_remote_addr", "x-forwarded-for": "$http_x_forwarded_for", "x-real-ip": "$http_x_real_ip"}
   ```

   **Kubernetes community-maintained NGINX ingress controller**
   Set the [log-format-upstream](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#log-format-upstream){:target="_blank"}
   variable in your ingress controller configuration configmap (see the
   [Kubernetes community maintained NGINX ingress controller documentation](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/){:target="_blank"}
   for more details).

   **NGINX Inc-maintained NGINX ingress controller**
   Set the [log-format](https://docs.nginx.com/nginx-ingress-controller/configuration/global-configuration/configmap-resource#logging){:target="_blank"}
   variable in your ingress controller configuration configmap (see the
   [NGINX Inc. ingress controller documentation](https://docs.nginx.com/nginx-ingress-controller/configuration/){:target="_blank"}
   for more details).

   **OpenShift router**
   In order to view OpenShift router logs, set up a syslog server (See the
   [OpenShift documentation](https://docs.okd.io/3.11/admin_guide/router.html#viewing-logs){:target="_blank"}
   for more details). Once that is set up appropriately, add the above json
   template to the `ROUTER_SYSLOG_FORMAT` environment variable on your router.

   > **Note**: The variable values for `source_ip`, `destination_ip`, `x-forwarded-for`, and `x-real-ip`
   > should be quoted.
   {: .alert .alert-info}

1. Set the log file path to `/var/log/calico/ingress/ingress.log`.

   **Kubernetes community-maintained NGINX ingress controller**
   If you are using the community maintained ingress controller, set
   [access-log-path](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#access-log-path){:target="_blank"}
   in your configmap. Set this value to `/var/log/calico/ingress/ingress.log`

   > **Note**: Setting the access-log-path will reroute logs in NGINX from writing to stdout.
   > This means that the `kubectl log` command will no longer return logs since they are now
   > being routed to the file of your choice. These logs are still accessible within your
   > containers at the new location. If you are also reading the container logs mounted on your
   > host, NGINX info will no longer be at the stdout file `0.log` but will now be at the newly
   > specified log location. To have logs readable through the `kubectl log` command, you will
   > need to follow the same directions as the NGINX Inc-maintained NGINX ingress controller
   > but instead mount in your NGINX template according to the
   > [Kubernetes community-maintained ingress controller documentation](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/custom-template/){:target="_blank"}.

   **NGINX Inc-maintained NGINX ingress controller**
   If you are using the NGINX Inc maintained ingress controller, create a custom
   NGINX template in order to tell NGINX to log to a file. To do this, set
   [main-template](https://github.com/nginxinc/kubernetes-ingress/blob/1f4ad601f8b94ce6767c43a3ae66e7caf00963bc/docs/configmap-and-annotations.md#snippets-and-custom-templates){:target="_blank"}
   in your configmap. Your new template should probably look similar to the
   [mounted template](https://github.com/nginxinc/kubernetes-ingress/blob/8986c96331f3806172aa10ec6a0f773a630eee9c/internal/configs/version1/nginx.tmpl){:target="_blank"}.
   The only difference is that under each `access_log` line, another `access_log` line should be
   added pointing towards `/var/log/calico/ingress/ingress.log`.

   Example:
   ```
   access_log  /var/log/nginx/access.log  main;
   access_log  /var/log/calico/ingress/ingress.log  main;
   ```

   **OpenShift router**
   If you are using the OpenShift router, configure your syslog server to write
   log files to `/var/log/calico/ingress/ingress.log`.

#### Step 5: Test your installation

To test your installation, you must first know the appropriate path to access your cluster.
The path can be either of the following:
* The public address of your cluster/service
* The cluster IP of your ingress service (if testing within the cluster)

After identifying the path, run the following command.
```
curl <path to access service> --header "X-Forwarded-For: 1.1.1.1" --header "X-Real-Ip: 2.2.2.2"
```

Now when viewing the flow logs in Kibana, you should be able to see the `original_source_ip` field
populated with `2.2.2.2` on the connection that the curl command made. In the case where an
`X-Real-Ip` header is not provided, then you should instead see the `original_source_ip` field
populated with the value from the `X-Forwarded-For` header.

