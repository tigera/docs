---
title: Configure data retention
description: Configure how long to retain logs and compliance reports.
canonical_url: /visibility/elastic/retention
---

### Big picture

Configure how long to retain logs and compliance reports.

### Features

This how-to guide uses the following features: 

- **LogStorage**

### Before you begin...

Review [LogStorageSpec.Retention]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.Retention) and determine the appropriate values for your deployment.

> **Note**: LogStorage has built-in retention thresholds of 80% for total storage, and 70% for logs (flow and DNS). If either of these are exceeded, the oldest records and logs are removed.
{: .alert .alert-info}

### How to

#### Configure data retention

Create or update the **LogStorage** resource by adding or updating the `retention` section. In the following example, auditReports, snapshots, and complianceReports are retained for 90 days, and flows are retained for 7 days.

```
apiVersion: operator.tigera.io/v1
kind: LogStorage
metadata:
  name: tigera-secure
spec:
  retention:
    auditReports: 91
    snapshots: 91
    complianceReports: 91
    flows: 8
  nodes:
    count: 1
```

This configuration can be done at initial creation of the **LogStorage** resource or by updating it after it is created, like in the following example:

```
kubectl patch logstorage tigera-secure --type merge -p '{"spec":{"retention":{"flows":8}}}'
kubectl patch logstorage tigera-secure --type merge -p '{"spec":{"retention":{"auditReports":91}}}'
kubectl patch logstorage tigera-secure --type merge -p '{"spec":{"retention":{"snapshots":91}}}'
kubectl patch logstorage tigera-secure --type merge -p '{"spec":{"retention":{"complianceReports":91}}}'
```
