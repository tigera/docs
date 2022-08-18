---
title: Configure CIS benchmark reports 
description: Configure reports to assess compliance for all assets in a Kubernetes cluster.
canonical_url: '/compliance/compliance-reports-cis'
---

### Big picture

Use the {{site.prodname}} Kubernetes CIS benchmark report to assess compliance for all assets in a Kubernetes cluster.

### Value

A standard requirement for an organization’s security and compliance posture is to assess your Kubernetes clusters against CIS benchmarks. The {{site.prodname}} Kubernetes CIS benchmark report provides this comprehensive view into your Kubernetes clusters while strengthening your threat detection capability by looking beyond networking data.

### Features

This how-to guide uses the following {{site.prodname}} features:

- Preconfigured Kubernetes CIS benchmark report in Manager UI
- **GlobalReport** resource to schedule reports and set thresholds

### Concepts

#### Default settings and configuration

During {{site.prodname}} installation, each node starts a pod named, `compliance-benchmarker`. A preconfigured Kubernetes CIS benchmark report is generated every hour. You can view the report in **Manager UI**, **Compliance**, **Compliance Reports**, download it  to .csv format.  

To schedule the CIS benchmark report or change settings, use the **global report** resource. Global reports are configured as YAMLs and are applied using `kubectl`. 

#### Best practices

We recommend that you review the CIS benchmark best practices for securing cluster component configurations here: {% include open-new-window.html text='CIS benchmarks downloads' url='https://learn.cisecurity.org/benchmarks' %}.

### Before you begin

**Supported**

- Kubernetes/kubeadm
- RKE
- OpenShift 
- AWS/kOps
- TKG

### How to

- [Configure and schedule CIS benchmark reports](#configure-and-schedule-cis-benchmark-reports)
- [View report generation status](#view-report-generation-status)
- [Review and address CIS benchmark results](#review-and-address-cis-benchmark-results)
- [Manually run reports](#manually-run-reports)
- [Troubleshooting](#troubleshooting)

#### Configure and schedule CIS benchmark reports

Verify that the `compliance-benchmarker` is running and the `cis-benchmark` report type is installed.

```bash
kubectl get -n tigera-compliance daemonset compliance-benchmarker
kubectl get globalreporttype cis-benchmark
```

In the following example, we use a **GlobalReport** with CIS benchmark fields to schedule and filter results. The report is scheduled to run at midnight of the next day (in UTC), and the benchmark items 1.1.4 and 1.2.5 will be omitted from the results.

| **Fields**           | **Description** |
| -------------------- | --------------- |
| schedule             | The start and end time of the report using {% include open-new-window.html text='crontab format' url='https://en.wikipedia.org/wiki/Cron' %}. To allow for archiving, reports are generated approximately 30 minutes after the end time. A single report is limited to a maximum of two per hour. |
| highThreshold        | **Optional**. Integer percentage value that determines the lower limit of passing tests to consider a node as healthy. Default: 100 |
| medThreshold         | **Optional**. Integer percentage value that determines the lower limit of passing tests to consider a node as unhealthy. Default: 50 |
| includeUnscoredTests | **Optional**. Boolean value that when false, applies a filter to exclude tests that are marked as “Unscored” by the CIS benchmark standard. If true, the tests will be included in the report. Default: true |
| numFailedTests       | **Optional**. Integer value that sets the number of tests to display in the Top-failed Tests section of the CIS benchmark report. Default: 5 |
| resultsFilter        | **Optional**. An include or exclude filter to apply on the test results that will appear on the report. |

```yaml
apiVersion: projectcalico.org/v3
kind: GlobalReport
metadata:
  name: daily-cis-results
  labels:
    deployment: production
spec:
  reportType: cis-benchmark
  schedule: 0 0 * * *
  cis:
    highThreshold: 100
    medThreshold: 50
    includeUnscoredTests: true
    numFailedTests: 5
    resultsFilters:
    - benchmarkSelection: { kubernetesVersion: "1.13" }
      exclude: ["1.1.4", "1.2.5"]
```

#### View report generation status

To view the status of a report, you must use the `kubectl` command. For example:

```bash
kubectl get globalreports.projectcalico.org daily-cis-results -o yaml
```

In a report, the job status types are:

- **lastScheduledReportJob**:
  The most recently scheduled job for generating the report. Because reports are scheduled in order, the “end time” of
  this report will be the “start time” of the next scheduled report.
- **activeReportJobs**:
  Default = allows up to 5 concurrent report generation jobs.
- **lastFailedReportJobs**:
  Default = keeps the 3 most recent failed jobs and deletes older ones. A single report generation job will be retried
  up to 6 times (by default) before it is marked as failed.
- **lastSuccessfulReportJobs**:
  Default = keeps the 2 most recent successful jobs and deletes older ones.

##### Change the default report generation time

By default, reports are generated 30 minutes after the end of the report, to ensure all of the audit data is archived.
(However, this gap does not affect the data collected “start/end time” for a report.)

You can adjust the time for audit data for cases like initial report testing, to demo a report, or when manually
creating a report that is not counted in global report status.

To change the delay, go to the installation manifest, and uncomment and set the environment variable
`TIGERA_COMPLIANCE_JOB_START_DELAY`. Specify value as a [Duration string][parse-duration].

#### Review and address CIS benchmark results

We recommend the following approach to CIS benchmark reports results:
1. Download the Kubernetes CIS benchmarks and export your full CIS benchmark results in .csv format.
1. In the compliance dashboard, review the "Top-Failed Tests" section to identify which tests are the most problematic.
1. Cross-reference the top-failed tests to identify which nodes are failing that test.
1. Look up those tests in the {% include open-new-window.html text='Kubernetes benchmark document' url='https://downloads.cisecurity.org/#/' %} and follow the remediation steps to resolve the failure.
1. Discuss with your infrastructure and security team if this remediation is viable within your organization.
  1. If so, update your nodes with the fix and ensure that the test passes on the next generation of the report.
  1. If the fix is not viable but is an acceptable risk to take within the organization, configure the report specification to exclude that test index so that it no longer appears in the report.
  1. If the fix is not viable and not an acceptable risk to take on, keep the failing test within the report so that your team is reminded to address the issue as soon as possible.

#### Manually run reports

You can manually run reports at any time. For example, run a manual report:

- To specify a different start/end time
- If a scheduled report fails

{{site.prodname}} GlobalReport schedules Kubernetes Jobs which create a single-run pod to generate a report and store it in Elasticsearch. Because you need to run manual reports as a pod, you need higher permissions: allow `create` access for pods in namespace `tigera-compliance` using the `tigera-compliance-reporter` service account.

To manually run a report:

1. Download the pod template corresponding to your installation method.  
   **Operator**

   ```bash
   curl -O {{ "/manifests/compliance-reporter-pod.yaml" | absolute_url }}
   ```

1. Edit the template as follows:
   - Edit the pod name if required.
   - If you are using your own docker repository, update the container image name with your repo and image tag.
   - Set the following environments according to the instructions in the downloaded manifest:
     - `TIGERA_COMPLIANCE_REPORT_NAME`
     - `TIGERA_COMPLIANCE_REPORT_START_TIME`
     - `TIGERA_COMPLIANCE_REPORT_END_TIME`

1. Apply the updated manifest, and query the status of the pod to ensure it completes.
   Upon completion, the report is available in Manager UI.

   ```bash
   # Apply the compliance report pod
   kubectl apply -f compliance-reporter-pod.yaml
   # Query the status of the pod
   kubectl get pod <podname> -n=tigera-compliance
   ```

>**Note**: Manually-generated reports do not appear in GlobalReport status.
{: .alert .alert-info}


#### Troubleshooting

**Problem**: Compliance reports can fail to generate if the `compliance-benchmarker` component cannot find the required `kubelet` or `kubectl` binaries to determine the Kubernetes version running on the cluster. 

**Solution or workaround**: If a node is running within a container (not running `kubelet` as a binary), make sure the `kubectl` binary is available in the `/usr/bin` directory.

### Above and beyond

- For details on configuring and scheduling reports, see [Global reports]({{site.baseurl}}/reference/resources/globalreport)
- For other predefined compliance reports, see [Compliance reports]({{site.baseurl}}/reference/compliance-reports/)

[parse-duration]: https://golang.org/pkg/time/#ParseDuration
