---
title:  Monitoring
description: How to monitor the anomaly detection jobs. 
canonical_url: /threat/anomaly-detection/monitoring

---

## Monitoring
The anomaly detection jobs run indefinitely.
Use the pod logs to monitor the job execution and health.
Monitor pod which name started with **ad-jobs-deployment**. The real pod name could be like **ad-jobs-deployment-6465464b6d-4dz5f**.

To get this real pod name use:

```bash
kubectl get pods -n tigera-intrusion-detection -l app=anomaly-detection
```

Use this command to read logs:

```bash
kubectl logs <pod_name> -n tigera-intrusion-detection
```

After the pod starts, you can see the progress of training and detection in the log.

Different stages of the job execution begin with "START" or "Start" lines and finish with "STOP" or "Stop" lines.
You also see the current configuration values in this log.
See the [Configuration] for details of these values.

If a job raises an exception, you see this exception in the job log.

If anomalies are detected, you see a line like this:
```
2021-01-20 14:06:13 : INFO : AlertClient: sent 5 alerts with anomalies.
```

You can see the alerts in the Tigera UI **Alert List** page.
![policy-dashboard]({{site.baseurl}}/images/anomaly-detection-alert.png)

A **description** of the alert started with the **anomaly_detection.job_id** where **job_id** can be found on [Description] page.

[Configuration]: /threat/anomaly-detection/customizing
[Description]: /threat/anomaly-detection/job-descriptions
