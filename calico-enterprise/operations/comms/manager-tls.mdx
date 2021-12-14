---
title: Provide TLS certificates for Calico Enterprise Manager
description: Add TLS certificates to secure access to Calico Enterprise Manager user interface. 
---

### Big picture

Provide TLS certificates that secure access to the {{site.prodname}} manager user interface.

### Value

By default, the {{site.prodname}} manager UI uses self-signed TLS certificates on connections. This article describes how to provide TLS certificates that users' browsers will trust.

### Before you begin...

- **Get the certificate and key pair for the {{site.prodname}} Manager UI**
  Generate the certificate using any X.509-compatible tool or from your organization's Certificate Authority. The certificate must have Common Name or Subject Alternate Names that match the IPs or DNS names that will be used to [access the manager UI]({{site.baseurl}}/getting-started/cnx/access-the-manager).

### How to

To provide certificates for use during deployment you must create a secret before applying the 'custom-resource.yaml' or before creating the Installation resource. To specify certificates for use in the manager, create a secret using the following command:

```bash
kubectl create secret generic manager-tls -n tigera-operator --from-file=cert=</path/to/certificate-file> --from-file=key=</path/to/key-file>
```

To update existing certificates, run the following command:

```bash
kubectl create secret generic manager-tls -n tigera-operator --from-file=cert=</path/to/certificate-file> --from-file=key=</path/to/key-file> --dry-run -o yaml --save-config | kubectl replace -f -
```

If the {{site.prodname}} Manager UI is already running then updating the secret should cause it to restart and pickup the new certificate and key. This will result in a short period of unavailability of the {{site.prodname}} Manager UI.

### Above and beyond

Additional documentation is available for securing [{{site.prodname}} manager connections]({{site.baseurl}}/security/comms/crypto-auth#calico-enterprise-manager-connections).
