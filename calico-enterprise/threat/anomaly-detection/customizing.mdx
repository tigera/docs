---
title:  Configuration
description: Review your options for customizing the anomaly detections jobs.
canonical_url: /threat/anomaly-detection/customizing

---

{{site.prodname}} ships with proprietary anomaly detection jobs.
All proprietary anomaly detection jobs are included in one deployment manifest and work in one pod.

## Install Jobs
Use these commands to deploy a pod with the anomaly detection jobs:

1. Download a manifest:
There are two options, the anomaly detection in the **managed** cluster and in the **management/standalone** cluster.
   See the [Multi-cluster management] for more details.

    1.1 For the **management** or **standalone** cluster:
    ```bash
    curl {{ "/manifests/threatdef/ad-jobs-deployment.yaml" | absolute_url }} -O
    ```
    1.2 For the **managed** cluster:
    ```bash
    curl {{ "/manifests/threatdef/ad-jobs-deployment-managed.yaml" | absolute_url }} -O
    ```

2. Configure the jobs by setting the environment variables (see below).

   If it is a managed cluster, you have to set up the **CLUSTER_NAME** environment variable.

   All other settings are optional.

3. Apply the manifest

    1.1 For the **management** or **standalone** cluster:
    ```bash
    kubectl apply -f ad-jobs-deployment.yaml
    ```
    1.2 For the **managed** cluster:
    ```bash
    kubectl apply -f ad-jobs-deployment-managed.yaml
    ```

## Configure Jobs
You can configure the jobs using the environment variables.
The recommended way to set them up is in the deployment manifest (the yaml file).

Example:

```
env:
 - name: AD_max_docs
   value: "2000000"
 - name: AD_train_interval_minutes
   value: "20"
```

### Disabling jobs
Jobs can be disabled. It usually happens if some job creates too many alerts,
and its configuration requires time for research.
- **AD_DISABLED_JOBS** - Default: "". By default, all jobs are enabled.
To disable several jobs, separate job names with `,`.
For example: `http_connection_spike,dga`




### Variables of the Elasticsearch
-   **CLUSTER_NAME** - Default: "cluster".
In a multi-cluster deployment, the name of the cluster where the AD job should detect the anomalies.
-   **ES_query_size** - Default: 10000.
The job reads the data in portions. This is the number of rows in each of this portion.

### Variables of all Anomaly Detection Jobs
-   **AD_train_interval_minutes** - Default: 1440, a full day. It is an interval between retraining the existing models, if models should be retrained.
-   **AD_search_interval_minutes** - Default: 30. It is an interval between the searching for the anomalies.
-   **AD_max_docs** - Default: 500000. This is the size of the dataset used for the training. The bigger it is, the more precise are the trained models, but the more data read from the Elasticsearch storage, and the training takes more time.

### Variables of specific Anomaly Detection Jobs

#### Note about AD_`job_name`_SENSITIVITY variables
  Changing this variable adjusts the **sensitivity** to detect suspicious values or combinations of values. 
  Higher sensitivity means more suspicious values are treated as anomalies and vice versa.
  Increase in this variable results in more alerts.
  The default values can be different for different jobs.
  Valid range: 0.0 to 100.0


#### port_scan Job
-   **AD_port_scan_threshold** - Default: 500. It is a threshold for triggering an anomaly for the **port_scan** job. This is a number of unique destination ports called from the specific source_name_aggr in the same source_namespace, and the same time bucket.

#### ip_sweep Job
-   **AD_ip_sweep_threshold** - Default: 32. It is a threshold for triggering an anomaly for the **ip_sweep** job. This is a number of unique destination IPs called from the specific source_name_aggr in the same source_namespace, and the same time bucket.

#### bytes_out Job
-   **AD_BytesOutModel_min_size_for_train** - Default: 1000. There should be enough data samples to train models.
    The models are trained only if the number of the data samples is bigger than this threshold.

#### bytes_in Job
-   **AD_BytesInModel_min_size_for_train** - Default: 1000. There should be enough data samples to train models.
    The models are trained only if the number of the data samples is bigger than this threshold.

#### process_restarts Job
- **AD_PROCESS_RESTARTS_SENSITIVITY** - Default: 2 

    Decrease this parameter if you want fewer alerts. Increase it if you want more alerts.
- **AD_PROCESS_RESTARTS_MIN_RESTARTS** - Default: 4. Increase this parameter if you want fewer alerts.
    Decrease it if you want more alerts.

#### dns_latency Job
- **AD_DNS_LATENCY_SENSITIVITY** - Default: 15

    Decrease this parameter if you want fewer alerts. Increase it if you want more alerts.

#### l7_latency Job
- **AD_L7_LATENCY_SENSITIVITY** - Default: 7

    Decrease this parameter if you want fewer alerts. Increase it if you want more alerts.

#### http_connection_spike Job
- **AD_HTTP_CONNECTION_SPIKE_SENSITIVITY** - Default: 20

    Decrease this parameter if you want fewer alerts. Increase it if you want more alerts.

#### dga Job
-   **AD_DGA_SCORE_THRESHOLD** - Default: 0.5. It separates the DGA domain names from "good" domain names.
    Increase this parameter if you want fewer alerts.
    Decrease it if you want more alerts.

#### generic_flows Job
- **AD_GENERIC_FLOWS_SENSITIVITY** - Default: 1 
 
    Decrease this parameter if you want fewer alerts. Increase it if you want more alerts.
- **AD_GENERIC_FLOWS_FIELDS** - Default: "bytes_in,bytes_out,num_flows,num_flows_started,
    num_flows_completed,packets_in,packets_out,num_process_names,num_process_ids,num_original_source_ips" 
    
    It is a list of the `flow` log numeric fields separated by `,`.
    A separate model is trained for each field in this list.
    Remove a field from this list if you don't want to detect anomalies for this field.

#### generic_dns Job
- **AD_GENERIC_DNS_SENSITIVITY** - Default: 4
 
    Decrease this parameter if you want fewer alerts. Increase it if you want more alerts.
- **AD_GENERIC_DNS_FIELDS** - Default: "count,latency_count,latency_mean,latency_max"
    
    It is a list of the `DNS` log numeric fields separated by `,`.
    A separate model is trained for each field in this list.
    Remove a field from this list if you don't want to detect anomalies for this field.

#### generic_l7 Job
- **AD_GENERIC_L7_SENSITIVITY** - Default: 10
 
    Decrease this parameter if you want fewer alerts. Increase it if you want more alerts.
- **AD_GENERIC_L7_FIELDS** - Default: "duration_mean,duration_max,bytes_in,bytes_out,count"
    
    It is a list of the `L7` log numeric fields separated by `,`.
    A separate model is trained for each field in this list.
    Remove a field from this list if you don't want to detect anomalies for this field.

#### l7_bytes Job
- **AD_L7_BYTES_SENSITIVITY** - Default: 5
 
    Decrease this parameter if you want fewer alerts. Increase it if you want more alerts.

[Multi-cluster management]: /multicluster/index
