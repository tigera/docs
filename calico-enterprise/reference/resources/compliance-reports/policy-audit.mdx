---
title: Policy audit report
description: API for this resource. 
---

To create a Policy Audit report, create a [`GlobalReport`](../resources/globalreport) with the `reportType`
set to `policy-audit`.

The following sample command creates a GlobalReport that results in a daily policy audit report for
policies that are applied to endpoints in the `public` namespace.

```bash
kubectl apply -f - << EOF
apiVersion: projectcalico.org/v3
kind: GlobalReport
metadata:
  name: daily-public-policy-audit-report
  labels:
    deployment: production
spec:
  reportType: policy-audit
  endpoints:
    namespaces:
      names:
        - public
  schedule: 0 0 * * *
EOF
```

### Downloadable reports

#### summary.csv

A summary CSV file that includes details about the report parameters and the top level counts.

| Heading | Description | Format |
|----|----|
| startTime               | The report interval start time. | RFC3339 string |
| endTime                 | The report interval end time. | RFC3339 string |
| endpointSelector        | The endpoint selector used to restrict in-scope endpoints by endpoint label selection. | selector string |
| namespaceNames          | The set of namespace names used to restrict in-scope endpoints by namespace. | ";" separated list of namespace names |
| namespaceSelector       | The namespace selector used to restrict in-scope endpoints by namespace label selection. | selector string |
| serviceAccountNames     | The set of service account names used to restrict in-scope endpoints by service account. | ";" separated list of service account names |
| serviceAccountSelectors | The service account selector used to restrict in-scope endpoints by service account label selection. | selector string |
| numCreatedPolicies      | The number of policies that apply to in-scope endpoints that were created during the report interval. | number |
| numModifiedPolicies     | The number of policies that apply to in-scope endpoints that were modified during the report interval. | number |
| numDeletedPolicies      | The number of policies that apply to in-scope endpoints that were deleted during the report interval. | number |

#### events.json

Events formatted in JSON.

#### events.yaml

Events formatted in YAML.
