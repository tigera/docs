---
title: License key
description: API for this Calico Enterprise resource. 
canonical_url: /reference/resources/licensekey
---

A License Key resource (`LicenseKey`) represents a user's license to use {{site.prodname}}. Keys are
provided by Tigera support, and must be applied to the cluster to enable
{{site.prodname}} features.

For `kubectl` commands, the following case-insensitive aliases may be used to specify
the resource type on the CLI: `licensekey.projectcalico.org`, `licensekeys.projectcalico.org`
as well as abbreviations such as `licensekey.p` and `licensekeys.p`.

### Working with license keys

#### Applying or updating a license key

When you add {{site.prodname}} to an existing Kubernetes cluster or create a
new OpenShift cluster, you must apply your license key to complete the installation
and gain access to the full set of {{site.prodname}} features.

When your license key expires, you must update it to continue using {{site.prodname}}.

To apply or update a license key use the following command, replacing `<customer-name>`
with the customer name in the file sent to you by Tigera.

**Command**
```
kubectl apply -f <customer-name>-license.yaml
```

**Example**
```
kubectl apply -f awesome-corp-license.yaml
```

#### Viewing information about your license key

To view the number of licensed nodes and the license key expiry, use:

```
kubectl get licensekeys.p -o custom-columns='Name:.metadata.name,MaxNodes:.status.maxnodes,Expiry:.status.expiry,PackageType:.status.package'
```

This is an example of the output of above command.

```
Name      MaxNodes   Expiry                 Package
default   100        2021-10-01T23:59:59Z   Enterprise
```
{: .no-select-button}

### Sample YAML

```yaml
apiVersion: projectcalico.org/v3
kind: LicenseKey
metadata:
  creationTimestamp: null
  name: default
spec:
  certificate: |
    -----BEGIN CERTIFICATE-----
    MII...n5
    -----END CERTIFICATE-----
  token: eyJ...zaQ
status:
  expiry: "2021-10-01T23:59:59Z"
  maxnodes: 100
  package: Enterprise
```

The data fields in the license key resource may change without warning.  The license key resource
is currently a singleton: the only valid name is `default`.

### Supported operations

| Datastore type        | Create | Delete | Update | Get/List | Notes
|-----------------------|--------|--------|--------|----------|------
| Kubernetes API server | Yes    |   No   | Yes    | Yes      |
