---
title: Provide TLS certificates for the API server
description: Add TLS certificates to secure access to the Calico Enterprise API server.
---

### Big picture

Provide TLS certificates to secure access to the {{site.prodname}} API server.

### Value

Providing TLS certificates for {{site.prodname}} components is recommended as part of a zero trust network model for security.

### Concepts

#### {{site.prodname}} API server

The {{site.prodname}} API server handles requests for {{site.prodname}} API resources. The main Kubernetes API server has an aggregation layer and will proxy requests for the {{site.prodname}} API resources to the {{site.prodname}} API server.

### Before you begin...

By default, the {{site.prodname}} API server uses self-signed certificates on connections. To provide TLS certificates,
get the certificate and key pair for the {{site.prodname}} API Server using any X.509-compatible tool or from your organization's Certificate Authority. The certificate must have Common Name or a Subject Alternate Name of `tigera-api.tigera-system.svc`.

This feature is available for Kubernetes and OpenShift.

### How to

#### Add TLS certificates

To provide certificates for use during deployment you must create a secret before applying the 'custom-resource.yaml' or before creating the Installation resource. To specify certificates for use in the {{site.prodname}} Manager, create a secret using the following command:

```bash
kubectl create secret generic tigera-apiserver-certs -n tigera-operator --from-file=apiserver.crt=</path/to/certificate-file> --from-file=apiserver.key=</path/to/key-file>
```

To update existing certificates, run the following command:

```bash
kubectl create secret generic tigera-apiserver-certs -n tigera-operator --from-file=apiserver.crt=</path/to/certificate-file> --from-file=apiserver.key=</path/to/key-file> --dry-run -o yaml --save-config | kubectl replace -f -
```

> **Note**: If the {{site.prodname}} API server is already running, updating the secret restarts the API server. While the server restarts, the {{site.prodname}} API server may be unavailable for a short period of time.
{: .alert .alert-info}

### Above and beyond

Additional documentation is available for securing [{{site.prodname}} manager connections]({{site.baseurl}}/security/comms/crypto-auth#connections-from-calico-enterprise-components-to-kube-apiserver-kubernetes-and-openshift).
