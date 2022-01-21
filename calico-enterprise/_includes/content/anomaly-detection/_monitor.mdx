
There are several ways to view and monitor anomalies. 

**Monitor anomalies in Manager UI**

**Alerts page**

In the left navbar, click **Alerts**. 

[screenshot and text for any fields that are not intuitive]

![tbd]({{site.baseurl}}/images/anomaly-detection-alert.png)

**Service Graph**

In the left navbar, click **Service Graph**.

[screenshot of Alerts tab and show how to get to Kibana raw data]


**Monitor anomalies using command line**

Anomaly detectors run indefinitely. To monitor detector execution and health, use pod logs. 

1. Find the real pod name (for example, **ad-jobs-deployment-6465464b6d-4dz5f**) using the following command:

    ```bash
    kubectl get pods -n tigera-intrusion-detection -l app=anomaly-detection
    ```

1. Read logs for a pod.

    ```bash
    kubectl logs  -n tigera-intrusion-detection -l app=anomaly-detection
    ```

After the pod starts, you can see the progress of training and detection in the log. Job execution goes through different status and begin with "START" or "Start" lines and finish with "STOP" or "Stop" lines. You also see the current configuration values in this log.

All exceptions are output to the job log.

If anomalies are detected, you see a line like this:

```bash
2021-01-20 14:06:13 : INFO : AlertClient: sent 5 alerts with anomalies.
```

**Quarantine suspicious pods**

If you find anomalous behavior that is suspicious but not urgent, you may want to disable the detector to research the root cause. For any critical anomaly, you may need to quarantine pods immediately by applying a network policy. A best practice is have a network policy ready for editing (as part of your tier and policy lifecycle workflow) to ensure that you can quickly enforce it. 