---
title: Configure access to Calico Enterprise Manager UI
description: Configure access to the Calico Enterprise Manager user interface.
canonical_url: '/getting-started/cnx/access-the-manager'
---

### Big picture

Configure access to the {{site.prodname}} Manager user interface.

### Value

For security, the {{site.prodname}} Manager UI is not exposed outside of the cluster by default. You can configure access to {{site.prodname}} Manager UI using ingress, a load balancer service, or port forwarding.

### Before you begin

**Required**

- [Install {{site.prodname}}]({{site.baseurl}}/getting-started/)
- Choose one of the following access options and complete the required configuration:

| Option             | Description                                                  | Requirement                                                  |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Kubernetes ingress | Configure your cluster with an ingress controller to implement the `Ingress` resource using {% include open-new-window.html text='Kubernetes ingress' url='https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer' %}. | Ensure the {{site.prodname}} Manager receives a HTTPS (TLS) connection (not unencrypted HTTP). If you require TLS termination at your ingress, you must use a proxy that supports transparent HTTP/2 proxying, (for example, Envoy), or re-originate a TLS connection from your proxy to the {{site.prodname}} Manager. If you do not require TLS termination, configure your proxy to “pass thru” the TLS to {{site.prodname}} Manager. |
| Load balancer      | Configure your cluster with a service load balancer controller to implement the external load balancer. See {% include open-new-window.html text='Kubernetes loadbalancer' url='https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/' %} | Ensure the {{site.prodname}} Manager receives a HTTPS (TLS) connection (not unencrypted HTTP). If you require TLS termination at your load balancer, you must use a load balancer that supports transparent HTTP/2 proxying, or re-originate a TLS connection from your load balancer to the {{site.prodname}} Manager. If you do not require TLS termination, configure your proxy to “pass thru” the TLS to {{site.prodname}} Manager. |
| Port forwarding    | Forward traffic from a local port to the Kubernetes API server, where it is proxied to the Manager UI. This approach is **not recommended for production**, but is useful if you do not have a load balancer or ingress infrastructure configured, or you need to get started quickly. | n/a                                                          |
| OpenShift routes   | Use OpenShift routes to expose a service by giving it an externally-reachable hostname (for example, `www.example.com`) . | n/a                                                          |


### How to

#### Configure access to {{site.prodname}} Manager UI

{% tabs %}

<label:Ingress,active:true>
<%

**Basic ingress controller, no modification**

The following example uses `tigera-manager` as the backend service without modification. Use the `tigera-manager` service only when edits to the service are not required. (Note if you try to make changes to `tigera-manager`, changes may appear to take effect, but the service always resets to the default and is not overwritten.)

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: tigera-manager
  namespace: tigera-manager
spec:
  rules:
  - http:
      paths:
      - path: /
        pathType: ImplementationSpecific
        backend:
          service:
            name: tigera-manager
            port:
              number: 9443
```

**Advanced ingress controllers, with modifications**

If you need to annotate or modify the service, you must create your own service (`serviceName: <your own name>`) in the `tigera-manager` namespace, and use it in the ingress resource. For example:

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: tigera-manager
  namespace: tigera-manager
spec:
  rules:
  - http:
      paths:
      - path: /
        pathType: ImplementationSpecific
        backend:
          service:
            name: annotated-service
            port:
              number: 9443
```
#### Log in to {{site.prodname}} Manager UI 

Access the {{site.prodname}} Manager UI in your browser at: `https://localhost:9443`

%>

<label: Load balancer service>
<%

To expose the manager using a load balancer, create the following service.

```yaml
kind: Service
apiVersion: v1
metadata:
  name: tigera-manager-external
  namespace: tigera-manager
spec:
  type: LoadBalancer
  selector:
    k8s-app: tigera-manager
  externalTrafficPolicy: Local
  ports:
  - port: 9443
    targetPort: 9443
    protocol: TCP
```

After creating the service, it may take a few minutes for the load balancer to be created. Once complete, the load balancer IP address appears as an `ExternalIP` in `kubectl get services -n tigera-manager tigera-manager-external`.

#### Log in to {{site.prodname}} Manager UI 

Access the {{site.prodname}} Manager UI in your browser at: `https://localhost:9443`

%>

<label: Port forwarding>
<%

To forward traffic locally, use the following command:

```bash
kubectl port-forward -n tigera-manager service/tigera-manager 9443:9443
```

#### Log in to {{site.prodname}} Manager UI 

Access the {{site.prodname}} Manager UI in your browser at: `https://localhost:9443`

%>

%>

<label: OpenShift routes>
<%

To expose Manager UI using OpenShift routes, create the following route with these required parameters:

- host: `<clustername>.<URL>`
- name: `tigera-manager`
- targetPort: `9443`

**Example**

```
kind: Route
apiVersion: route.openshift.io/v1
metadata:
  name: tigera-manager
  namespace: tigera-manager
spec:
  host: manager.apps.demo-ocp.tigera-solutions.io
  to:
    kind: Service
    name: tigera-manager
    weight: 100
  port:
    targetPort: 9443
  tls:
    termination: passthrough
    insecureEdgeTerminationPolicy: Redirect
  wildcardPolicy: None
```  

#### Log in to {{site.prodname}} Manager UI 

Access the {{site.prodname}} Manager UI in your browser using the URL with clustername. For example: `https://manager.apps.demo-ocp.tigera-solutions.io:9443`

%>

{% endtabs %}

### Above and beyond

- [Authentication quickstart]({{site.baseurl}}/getting-started/cnx/authentication-quickstart)
- [Configure an external identity provider]({{site.baseurl}}/getting-started/cnx/configure-identity-provider)
