---
title: Bring your own Prometheus
description: Steps to get Calico Enterprise metrics using your own Prometheus.
canonical_url: /maintenance/monitor/prometheus/byo-prometheus
---

### Big picture

Scrape {{site.prodname}} metrics for Bring Your Own (BYO) Prometheus.

### Value

{{site.prodname}} uses the Prometheus monitoring tool to scrape metrics from instrumented jobs, and displays time-series data in a visualizer such as Grafana. You can scrape the following time-series metrics for {{site.prodname}} components to your own Prometheus:

- elasticsearch
- fluentd
- calico-node
- kube-controllers
- felix
- typha

To use BYO Prometheus, you must create your own:
- Service monitors
- Alerts
   
>**Note**: With BYO Prometheus, {{site.prodname}} metrics and alerts are not visible in Manager UI. 
{: .alert .alert-info}

### Before you begin

**Supported**

 For the supported version of Prometheus in this release, see the [Release Notes]({{site.baseurl}}/release-notes) (`coreos-prometheus`).

### How to
 
- [Scrape metrics](#scrape-metrics)
- [Verify BYO Prometheus](#verify-byo-prometheus)
- [Create policy to secure traffic between pods](#create-policy-to-secure-traffic-between-pods)

#### Scrape metrics

{% tabs %}

<label: elasticsearch,active:true>
<%

**Configure TLS certificates**

1. Copy the required secret and configmap to your namespace.
2. Save the manifest of the required TLS secret and CA configmap.

   ```bash
   kubectl get secret calico-node-prometheus-client-tls -n tigera-prometheus -o yaml >  calico-node-prometheus-client-tls.yaml
   ```
   
   ```bash
   kubectl get configmap -n tigera-prometheus tigera-ca-bundle -o yaml > tigera-ca-bundle.yaml
   ```
3. Edit `calico-node-prometheus-client-tls.yaml` and `tigera-ca-bundle.yaml` by changing the namespace to the namespace where your prometheus instance is running.
4. Apply the manifests to your cluster.

   ```bash
   kubectl apply -f calico-node-prometheus-client-tls.yaml
   ```
   ```bash
   kubectl apply -f tigera-ca-bundle.yaml
   ```

**Create the service monitor**

Apply the ServiceMonitor to the namespace where Prometheus is running.

```bash
export NAMESPACE=<my-prometheus-namespace>
```
   
```bash
kubectl apply -f {{site.baseurl}}/manifests/prometheus/elasticsearch-metrics-service-monitor.yaml -n $NAMESPACE
```
   
The .yamls have no namespace defined so when you apply `kubectl`, it is applied in the $NAMESPACE.

%>

<label: fluentd>
<%

**Configure TLS certificates**

1. Copy the required secret and configmap to your namespace.
2. Save the manifest of the required TLS secret and CA configmap.

   ```bash
   kubectl get secret calico-node-prometheus-client-tls -n tigera-prometheus -o yaml >  calico-node-prometheus-client-tls.yaml
   ```
   
   ```bash
   kubectl get configmap -n tigera-prometheus tigera-ca-bundle -o yaml > tigera-ca-bundle.yaml
   ```
3. Edit `calico-node-prometheus-client-tls.yaml` and `tigera-ca-bundle.yaml` and change the namespace to the namespace where your prometheus instance is running.
4. Apply the manifests to your cluster.

   ```bash
   kubectl apply -f calico-node-prometheus-client-tls.yaml
   ```
   ```bash
   kubectl apply -f tigera-ca-bundle.yaml
   ```

**Create the service monitor**

Apply the ServiceMonitor to the namespace where Prometheus is running.

```bash
export NAMESPACE=<my-prometheus-namespace>
```

```bash
kubectl apply -f  {{site.baseurl}}/manifests/prometheus/fluentd-metrics-service-monitor.yaml -n $NAMESPACE
```

The .yamls have no namespace defined so when you apply `kubectl`, it is applied in the $NAMESPACE.

%>

<label: calico node>
  <%

**Configure TLS certificates**

1. Copy the required secret and configmap to your namespace.
2. Save the manifest of the required TLS secret and CA configmap.

   ```bash
   kubectl get secret calico-node-prometheus-client-tls -n tigera-prometheus -o yaml >  calico-node-prometheus-client-tls.yaml
   ```
   
   ```bash
   kubectl get configmap -n tigera-prometheus tigera-ca-bundle -o yaml > tigera-ca-bundle.yaml
   ```
3. Edit `calico-node-prometheus-client-tls.yaml` and `tigera-ca-bundle.yaml` by changing the namespace to the namespace where your prometheus instance is running.
4. Apply the manifests to your cluster.

   ```bash
   kubectl apply -f calico-node-prometheus-client-tls.yaml
   ```
   ```bash
   kubectl apply -f tigera-ca-bundle.yaml
   ```

**Create the service monitor**

Apply the ServiceMonitor to the namespace where Prometheus is running.

```bash
export NAMESPACE=<my-prometheus-namespace>
```

```bash
kubectl apply -f  {{site.baseurl}}/manifests/prometheus/calico-node-monitor-service-monitor.yaml -n $NAMESPACE
```

The .yamls have no namespace defined so when you apply `kubectl`, it is applied in $NAMESPACE.

%>

%>

<label: kube-controllers>
<%

Note that kube-controllers metrics are not TLS enabled, so configuration is not required.

**Create the service monitor**

Apply the ServiceMonitor to the namespace where Prometheus is running.

```bash
export NAMESPACE=<my-prometheus-namespace>
```

```bash
kubectl apply -f  {{site.baseurl}}/manifests/prometheus/kube-controller-metrics-service-monitor.yaml-n $NAMESPACE
```

The .yamls have no namespace defined so when you apply `kubectl`, it is applied in the $NAMESPACE.

%>

%>

<label: Felix>
 <%

**Enable metrics**

Felix metrics are not enabled by default.

By default, Felix uses **port 9091 TCP** to publish metrics.

Use the following command to enable Felix metrics.

```bash
kubectl patch felixconfiguration default --type merge --patch '{"spec":{"prometheusMetricsEnabled": true}}'
```

You should see a result similar to:
```
felixconfiguration.projectcalico.org/default patched
```
For all Felix configuration values, see [Felix configuration]({{site.baseurl}}/reference/felix/configuration). 

For all Prometheus Felix configuration values, see [Felix Prometheus]({{site.baseurl}}/reference/felix/prometheus).

**Create a service to expose Felix metrics**

```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: felix-metrics-svc
  namespace: calico-system
  labels:
    k8s-app: felix-metrics
spec:
  selector:
    k8s-app: calico-node
  ports:
  - port: 9091
    targetPort: 9091
EOF
```

**Create the service monitor**

Apply the ServiceMonitor to the namespace where Prometheus is running.

```bash
export NAMESPACE=<my-prometheus-namespace>
```

```bash
kubectl apply -f  {{site.baseurl}}/manifests/prometheus/felix-metrics-service-monitor.yaml -n $NAMESPACE
```

The .yamls have no namespace defined so when you apply `kubectl`, it is applied in the $NAMESPACE.

%>

%>
  
 
  <label: Typha>
  <%

**Enable metrics**

Typha metrics are not enabled by default.

By default, Typha uses **port 9091** TCP to publish metrics. However, if {{site.prodname}} is installed using the Amazon yaml file, this port will be 9093 because it is set manually using the **TYPHA_PROMETHEUSMETRICSPORT** environment variable.

Use the following command to enable Typha metrics.

```bash
kubectl patch installation default --type=merge -p '{"spec": {"typhaMetricsPort":9093}}'
```

You should see a result similar to:
```bash
installation.operator.tigera.io/default patched
```

**Create a service to expose Typha metrics**

```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: typha-metrics-svc
  namespace: calico-system
  labels:
    k8s-app: typha-metrics
spec:
  selector:
    k8s-app: calico-typha
  ports:
  - port: 9093
    targetPort: 9093
EOF
```

**Create the service monitor**

Apply the ServiceMonitor to the namespace where Prometheus is running.

```bash
export NAMESPACE=<my-prometheus-namespace>
```

```bash
kubectl apply -f  {{site.baseurl}}/manifests/prometheus/typha-metrics-service-monitor.yaml -n $NAMESPACE
```

The .yamls have no namespace defined so when you apply `kubectl`, it is applied in the $NAMESPACE.

%>
  {% endtabs %}



### Verify BYO Prometheus

**Verify metrics in the Prometheus console**

1. Access the Prometheus dashboard using the port-forwarding feature.

   ```bash 
   kubectl port-forward pod/byo-prometheus-pod 9090:9090 -n $NAMESPACE
   ```

1. Browse to the Prometheus dashboard: http://localhost:9090.

1. In the Expression text box, enter your metric name and click the **Execute** button.

    The Console table is populated with all of your nodes with the number of endpoints.


**Verify endpoint authentication**

1. Use the following command to retrieve the tls.key and tls.cert.

   ```bash
   export NAMESPACE=<my-prometheus-namespace>
   ```

   ```bash
   kubectl get secret -n $NAMESPACE calico-node-prometheus-client-tls -o yaml
   ``` 

1. Save the tls.key and tls.cert content into key and cert after base64 decode.

   ```bash
   $:tls_key=<tls.key content>
   $:echo $tsls_key|base64 -d >key.pem
   
   $:tls_cert=<tls.crt content>
   $:echo $cert|base64 -d>cert.pem
   ```

1. Get the ca-bundle certificate using this command:
   
   ```bash
   kubectl get cm -n $NAMESPACE tigera-ca-bundle -o yaml
   ```

1. Open a new file (bundle.pem) in your favorite editor, and paste the content from "BEGIN CERTIFICATE" to "END CERTIFICATE".

1. Port-forward the prometheus pods and run this command with the forwarded port.

   ```bash
   curl --cacert bundle.pem --key key.pem  --cert cert.pem https://localhost:8080/metrics
   ```

You should be able to see the metrics.


### Create policy to secure traffic between pods

To support zero trust, we recommend that you create {{site.prodname}} network policy to allow the traffic between BYO Prometheus pods, and the respective metrics pods. For samples of ingress and egress policies, see [Get started with Calico network policy]({{site.baseurl}}/security/calico-network-policy).
