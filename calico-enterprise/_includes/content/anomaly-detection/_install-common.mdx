
1. Create a Global Alert of type `AnomalyDetection` to indicate which anomaly detector to run.

  To trigger running a detector create a GlobalAlert specifying the `type` field to have the value of `AnomalyDetection` and configure the detector parameter fields to indicate which detector to run by specifying the ID of the detector in the `detector.name` field.  The ID can be found in the [Anomaly detection reference page]({{site.baseurl}}/reference/anomaly-detection/all-jobs-envars).
  

  ```yaml
  apiVersion: projectcalico.org/v3
  kind: GlobalAlert
  metadata:
    name: sample
  spec:
    description: "Sample"
    summary: "Sample port-scan anomaly detection"
    type: AnomalyDetection
    detector: 
      name: port_scan
    severity: 100
  ```

  The example above shows the minimal fields required to start. To see descriptions of how the GlobalAlert fields function when the `type` field is set to `AnomalyDetection` refer to the [GlobalAlert reference page]({{site.baseurl}}/reference/resources/globalalert).

  > **Note**: Anomaly Detection will be creating its own alerts with predefined values for the following fields: `summary`, `description`, `severity`.  These values of these fields defined in the GlobalAlert will not be transferred to the Alerts it will be creating.
  {: .alert .alert-warning}

2. Create the globalalert from the manifest.
    ```bash
    kubectl create -f sample-port-scan-globalalert.yaml
    ```

    - **Managed cluster**
      Create the GlobalAlert on the managed cluster that you wish to monitor. The anomaly detection itself will run on the management cluster, but will only create alerts based on the {{site.prodname}} Elasticsearch logs of the specified managed cluster.


3. Verify that a detection cronjob is created for the globalalert.

    - **Standard cluster**
    ```bash
    kubectl get cronjobs -n tigera-intrusion-detection -l tigera.io.detector-cycle=detection
    ```

    - **Multi-Cluster Management (MCM)**
      Since anomaly detection will run on the management cluster, run this command specifying the cluster name on the management cluster to verify an anomaly detection CronJob is running for the GlobalAlert on the specified cluster.
      ```bash
      kubectl get cronjobs -n tigera-intrusion-detection -l cluster=<cluster-name>,tigera.io.detector-cycle=detection
      ```

4. Verify that a training cronjob is created for the cluster.

    - **Standard cluster**
      ```bash
      kubectl get cronjobs -n tigera-intrusion-detection -l tigera.io.detector-cycle=training
      ```
    
    - **Multi-Cluster Management (MCM)**
      Since anomaly detection will run on the management cluster, run this command specifying the cluster name on the management cluster to verify a training anomaly detection CronJob is running for the specified cluster.
      ```bash
      kubectl get cronjobs -n tigera-intrusion-detection -l cluster=<cluster-name>,tigera.io.detector-cycle=training
      ```

That's it. You are ready to go. Alerts happen automatically when anomalies are detected.
