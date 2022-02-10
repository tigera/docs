
1. Download the manifest.
   
    - For a **management** or **standalone** cluster:   
    ```bash
    curl {{ "/manifests/threatdef/ad-jobs-deployment.yaml" | absolute_url }} -O
    ```
    - For a **managed** cluster:   
    ```bash
    curl {{ "/manifests/threatdef/ad-jobs-deployment-managed.yaml" | absolute_url }} -O
    ```

2. Configure application environment variables using the deployment manifest (YAML).

    The out-of-the-box anomaly detection detectors and environment variables provide reasonable values for most deployments so no configuration is needed to start. The following exceptions are:
   
    For **managed clusters**, you must provide the `cluster_name`. For standalone and management clusters, it is optional.
   
    Where:
    - **CLUSTER_NAME** - Default: "cluster". 
      Name of the cluster for detecting anomalies. Replace this value only for managed clusters.

    **Example**
   
    ```yaml
    env:
     - name: AD_max_docs
       value: "2000000"
     - name: AD_train_interval_minutes
       value: "20"
    ```
   To see all anomaly detectors and environment variables, see [Anomaly detection]({{site.baseurl}}/reference/anomaly-detection/all-jobs-envars).

3. Apply the manifest.
   
    - **Standalone and management cluster**  
    ```bash
    kubectl apply -f ad-jobs-deployment.yaml
    ```
    - **Managed cluster**   
    ```bash
    kubectl apply -f ad-jobs-deployment-managed.yaml
    ```

4. Verify that anomaly detection is running and pods are ready.

   ```bash
    kubectl get pods -n tigera-intrusion-detection -l app=anomaly-detection
    ```
5. Verify that anomaly detection is running and pods are ready.

   ```bash
   kubectl get pods -n tigera-intrusion-detection -l app=anomaly-detection
   ```

That's it. You are ready to go. Alerts happen automatically when anomalies are detected.
