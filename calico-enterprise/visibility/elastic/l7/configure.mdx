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
with each other, not the specific request details. {{site.prodname}} provides visibility into L7 traffic without the need for a service mesh.

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

**Unsupported**

- RKE
- RKE2

**Limitations**

* L7 log collection is not supported for host-networked client pods.
* When selecting and deselecting traffic for L7 log collection, active connections may be disrupted.

**Log storage requirements**

> **Important**: L7 logs require a minimum of 1 additional GB of log storage per node, per one-day retention period. Adjust your [Log Storage](https://docs.tigera.io/maintenance/logstorage/adjust-log-storage-size) before you start tasks in the next section. 
{: .alert .alert-danger}

### How to

- [Configure Felix for log data collection](#configure-felix-for-log-data-collection)
- [Configure L7 logs](#configure-l7-logs)
- [View L7 logs in Manager UI](#view-l7-logs-in-manager-ui)

#### Configure Felix for log data collection

1. Enable the Policy Sync API in Felix. 

     For cluster-wide enablement, modify the `default` FelixConfiguration and set the field `policySyncPathPrefix` to `/var/run/nodeagent`.

    ```bash
    kubectl patch felixconfiguration default --type='merge' -p '{"spec":{"policySyncPathPrefix":"/var/run/nodeagent"}}'
    ```

1. Configure L7 log aggregation, retention, and reporting. 

    For help, see [Felix Configuration documentation]({{site.baseurl}}/reference/felix/configuration#calico-enterprise-specific-configuration).

#### Configure L7 logs

In this step, you will configure L7 logs, select logs for collection, and test the configuration.

**Configure the ApplicationLayer resource for L7 logs** 

1. Create or update the [ApplicationLayer]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.ApplicationLayer) resource named, `tigera-secure` to include a logCollection section of the file, `_api.html` [here]({{site.baseurl}}/reference/installation/api). 

1. Ensure that the `collectLogs` field is set to `Enabled`.

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

1. Apply the resource. This creates `l7-log-collector` daemonset in `calico-system` namespace. 

1. Ensure that the daemonset progresses and `l7-collector` and `envoy-proxy` containers inside the daemonset are in a `Running` state.

**Select traffic for L7 log collection**

1. Annotate the services you wish to collect L7 logs as shown.

   ```bash
   kubectl annotate svc <service-name> -n <service-namespace> projectcalico.org/l7-logging=true
   ```

2. To disable the L7 log collection, remove the annotation.

   ```bash
   kubectl annotate svc <service-name> -n <service-namespace> projectcalico.org/l7-logging-
   ```

**Test your configuration**

1. Identify the path to access your cluster. Where <path> can be:

   * Public address of your cluster/service 
   or
   * Cluster IP of your application's service (if testing within the cluster)

1. `curl` your service with a command similar to the following:

    ```bash
    curl --head <path to access service>:<optional port>/<path>
    ```

#### View L7 logs in Manager UI

**Service Graph**

To view L7 logs in Service Graph:

1. In the Manager UI left navbar, click **Service Graph**. 
1. In the bottom pane you will see L7 logs in the HTTP tab.

    ![l7-logs]({{site.baseurl}}/images/l7-logs.png)

**Kibana**

To view L7 logs by index pattern in Kibana:

1. In the Manager UI left navbar, click **Kibana**. 

1. In the new Kibana browser, click the hamburger icon in the top left corner, and select **Analytics**, **Discover**.

1. Select the index pattern, `tigera_secure_ee_l7`. 
