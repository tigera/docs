---
title: Configure L7 logs
description: Configure and aggregate L7 logs.
canonical_url: /visibility/elastic/l7/configure
---

### Big picture

Deploy Envoy and use {{site.prodname}} L7 logs to monitor application activity.

### Value

Just like L3/4 {{site.prodname}} logs, platform operators and
development teams want visibility into L7 logs to see how applications are interacting with each
other. {{site.prodname}} flow logs only display which workloads are communicating
with each other, not the specific request details. {{site.prodname}} provides visibility into L7 traffic without the need of a service mesh.

L7 logs are also key for detecting anomalous behaviors like attempts to
access applications, restricted URLs, and scans for particular URLs.

### Features

This how-to guide uses the following {{site.prodname}} features:
- **ApplicationLayer** resource

### Concepts

#### About L7 logs

L7 logs capture application interactions from HTTP header data in requests. Data shows what is actually sent in communications between specific pods, providing more specificity than flow logs. (Flow logs capture data only from connections for workload interactions).

{{site.prodname}} collects L7 logs by sending the selected traffic through an Envoy proxy.

L7 logs are visible in the Manager UI, service graph, in the HTTP tab.

### Before you begin

**Not supported**

* Windows
* eBPF dataplane
* RKE clusters

**Limitations**

* L7 log collection is not supported for host-networked client pods.
* When selecting and deselecting traffic for L7 log collection, active connections may be disrupted.

**Required**

> **Important**: L7 logs require a minimum of 1 additional GB of log storage per node, per one day retention period. Adjust your [Log Storage](https://docs.tigera.io/maintenance/logstorage/adjust-log-storage-size) now. 
{: .alert .alert-danger}

- Configure Felix for log data collection

  Enable the Policy Sync API in Felix. To do this cluster-wide, modify the `default` FelixConfiguration to set the field `policySyncPathPrefix` to `/var/run/nodeagent`.

    ```bash
    kubectl patch felixconfiguration default --type='merge' -p '{"spec":{"policySyncPathPrefix":"/var/run/nodeagent"}}'
    ```

  Configure L7 log aggregation, retention, and reporting. See the
  [Felix Configuration documentation]({{site.baseurl}}/reference/felix/configuration#calico-enterprise-specific-configuration)
  for more details.

### How to

#### Configure L7 logs

**Step 1: Configure ApplicationLayer CRD**

In this step, you configure ApplicationLayer resource to gather the L7 logs.

1. Create or update the [ApplicationLayer]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.ApplicationLayer)
   resource named, `tigera-secure` to include a logCollection section of the file, `_api.html` [here]: ({{site.baseurl}}/reference/installation/). Ensure that `collectLogs` fields is set to `Enabled`.

   Example:

   ```yaml
   apiVersion: operator.tigera.io/v1
   kind: ApplicationLayer
   metadata:
     name: tigera-secure
   spec:
     logCollection:
       collectLogs: Enabled
       logIntervalSeconds: 5
       logRequestsPerInterval: -1
   ```

   Apply the resource. This creates `l7-log-collector` daemonset in `calico-system` namespace. Ensure that the daemonset progresses  and `l7-collector` and `envoy-proxy` containers inside the daemonset are in a `Running` state.

**Step 2: Select traffic for L7 log collection**

1. Annotate the services you wish to collect L7 logs as shown.
   ```
   kubectl annotate svc <service-name> -n <service-namespace> projectcalico.org/l7-logging=true
   ```

2. To disable L7 log collection remove the annotation.
   ```
   kubectl annotate svc <service-name> -n <service-namespace> projectcalico.org/l7-logging-
   ```

**Step 3: Test your configuration**

To test your installation, you must first know the appropriate path to access your cluster.
The path can be either of the following:
* The public address of your cluster/service
* The cluster IP of your application's service (if testing within the cluster)

After identifying the path, `curl` your service with a command similar to the following:
```
curl --head <path to access service>:<optional port>/<path>
```

Now view the L7 logs in Kibana by selecting the `tigera_secure_ee_l7` index pattern. You
should see the relevant L7 data from your request recorded.