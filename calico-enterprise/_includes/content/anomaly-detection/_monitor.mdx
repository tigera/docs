
You can view and monitor anomalies in Manager UI and using the command line. 

**Monitor anomalies in Manager UI**

**Alerts page**

In the left navbar, click **Alerts**. 

Both security and performance alerts are listed. 

![anomaly-detection-alert-list]({{site.baseurl}}/images/anomaly-detecton-alert-list.png)

To drill down for details, expand the alert. 

![anomaly-detection-single-alert]({{site.baseurl}}/images/anomaly-detection-single-alert.png)

**Service Graph**

Alerts on security and performance anomalies are also viewable in Serice Graph.

In the left navbar, click **Service Graph**, **Alerts** tab.

![anomaly-detection-service-graph-alerts-tab]({{site.baseurl}}/images/anomaly-detection-service-graph-alerts-tab.png)

**Monitor anomalies using command line**

Anomaly detectors run indefinitely. To monitor detector execution and health, use pod logs. In a  multi-cluster management (mcm) deployments architecture, since Anomaly Detection only runs on the management cluster, run the following commands there.

1. Find the real pod name (for example, **cluster-port-scan-detection-27464946**) using associated with the  where the globalalert is deployed, run the following command:

    ```bash
    k -n tigera-intrusion-detection get pods -l cluster=<cluster name>,tigera.io.detector-cycle=detection
    ```

1. Read logs for a pod.

    ```bash
    kubectl logs -n tigera-intrusion-detection -l cluster=<cluster name>,tigera.io.detector-cycle=detection
    ```

After the pod starts, you can see the progress of training and detection in the log. Job execution goes through different status and begin with "START" or "Start" lines and finish with "STOP" or "Stop" lines. You also see the current configuration values in this log.

All exceptions are output to the job log.

If anomalies are detected, you see a line like this:

```bash
2021-01-20 14:06:13 : INFO : AlertClient: sent 5 alerts with anomalies.
```

**Quarantine suspicious pods**

If you find anomalous behavior that is suspicious but not urgent, you may want to disable the detector to research the root cause. For any critical anomaly, you may need to quarantine pods immediately by applying a network policy. A best practice is have a network policy ready for editing (as part of your tier and policy lifecycle workflow) to ensure that you can quickly enforce it. 