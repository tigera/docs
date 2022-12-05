---
title: License metrics
description: Monitor Calico Enterprise license metrics such as nodes used, nodes available, and days until license expires.
canonical_url: /maintenance/monitor/metrics/license-agent
---

### Big picture

Use the Prometheus monitoring and alerting tool to get {{site.prodname}} license metrics.

### Value

Platform engineering teams need to report licensing usage on third-party software (like {{site.prodname}}) for their CaaS/Kubernetes platforms. This is often driven by compliance, but also to mitigate risks from license expiration or usage that may impact operations. For teams to easily access these vital metrics, {{site.prodname}} provides license metrics using the Prometheus monitoring and alerting tool.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **LicenseKey resource**

### Concepts

#### About Prometheus

The Prometheus monitoring tool scrapes metrics from instrumented jobs and displays time series data in a visualizer (such as Grafana). For {{site.prodname}}, the “jobs” that Prometheus can harvest metrics from the License Agent component. 

#### About License Agent

The **License Agent** is a containerized application that monitors the following {{site.prodname}} licensing information from the Kubernetes cluster, and exports the metrics through the Prometheus server:

- Days till expiration
- Nodes available
- Nodes used

#### FAQ

{% include content/license.md %}

### How to

- [Add license agent in your Kubernetes cluster](#add-license-agent-in-your-kubernetes-cluster)
- [Create alerts using Prometheus metrics](#create-alerts-using-prometheus-metrics)

#### Add license agent in your Kubernetes cluster

To add the license-agent component in a Kubernetes cluster for license metrics, install the pull secret and apply the license-agent manifest. 

1. Create a namespace for the license-agent.
   ```
    kubectl create namespace tigera-license-agent
   ```
1. Install your pull secret.
   ```
    kubectl create secret generic tigera-pull-secret \
      --type=kubernetes.io/dockerconfigjson -n tigera-license-agent \
      --from-file=.dockerconfigjson=<path/to/pull/secret>
   ```
1. Apply the manifest.
   ```
    kubectl apply -f {{ "/manifests/licenseagent.yaml" | absolute_url }}
   ```

#### Create alerts using Prometheus metrics

In the following example, an alert is configured when the license expiry is fewer than 15 days.

```
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: calico-prometheus-license
  namespace: tigera-prometheus
  labels:
    role: tigera-prometheus-rules
    prometheus: calico-node-prometheus
spec:
  groups:
  - name: tigera-license.rules
    rules:
    - alert: CriticalLicenseExpiry
      expr: license_number_of_days < 15
      labels:
        severity: Warning
      annotations:
        summary: "Calico Enterprise License expires in less than 15 days"
        description: "Calico Enterprise License expires in less than 15 days"
```

>**Note**: If the Kubernetes api-server serves on any port other than 6443 or 443, add that port in the Egress policy of the license agent manifest. 
{: .alert .alert-info}

### Above and beyond

- [LicenseKey resource]({{site.baseurl}}/reference/resources/licensekey)
- [Configure Alertmanager]({{site.baseurl}}/maintenance/monitor/prometheus/alertmanager)
