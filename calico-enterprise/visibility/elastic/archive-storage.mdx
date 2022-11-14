---
title: Archive logs 
description: Archive logs to Syslog, Splunk, or Amazon S3 for maintaining compliance data.
canonical_url: /visibility/elastic/archive-storage
---

### Big picture

Archive {{site.prodname}} logs to SIEMs like Syslog, Splunk, or Amazon S3 to meet compliance storage requirements.

### Value

Archiving your {{site.prodname}} Elasticsearch logs to storage services like Amazon S3, Syslog, or Splunk are reliable 
options for maintaining and consolidating your compliance data long term.

### Features

This how-to guide uses the following {{site.prodname}} features:
- **LogCollector** resource

### How to

{% tabs %}
  <label:Amazon S3,active:true>
<%
1. Create an AWS bucket to store your logs.
   You will need the bucket name, region, key, secret key, and the path in the following steps.

2. Create a Secret in the `tigera-operator` namespace named `log-collector-s3-credentials` with the fields `key-id` and `key-secret`.
   Example:

   ```
    kubectl create secret generic log-collector-s3-credentials \
    --from-literal=key-id=<AWS-access-key-id> \
    --from-literal=key-secret=<AWS-secret-key> \
    -n tigera-operator
   ```

3. Update the [LogCollector]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.LogCollector)
   resource named, `tigera-secure` to include an [S3 section]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.S3StoreSpec)
   with your information noted from above.
   Example:

   ```yaml
   apiVersion: operator.tigera.io/v1
   kind: LogCollector
   metadata:
     name: tigera-secure
   spec:
     additionalStores:
       s3:
         bucketName: <S3-bucket-name>
         bucketPath: <path-in-S3-bucket>
         region: <S3-bucket region>
   ```
   This can be done during installation by editing the custom-resources.yaml
   by applying it, or after installation by editing the resource with the command:

   ```bash
   kubectl edit logcollector tigera-secure
   ```

%>
  '<label:Syslog>'

<%
1. Update the [LogCollector]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.LogCollector)
   resource named `tigera-secure` to include a [Syslog section]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.SyslogStoreSpec)
   with your syslog information.
   Example:
   ```yaml
   apiVersion: operator.tigera.io/v1
   kind: LogCollector
   metadata:
     name: tigera-secure
   spec:
     additionalStores:
       syslog:
         # (Required) Syslog endpoint, in the format protocol://host:port
         endpoint: tcp://1.2.3.4:514
         # (Optional) If messages are being truncated set this field
         packetSize: 1024
   ```
   This can be done during installation by editing the custom-resources.yaml by applying it or after installation by editing the resource with the command:
   ```bash
   kubectl edit logcollector tigera-secure
   ```
2. You can control which types of {{site.prodname}} log data you would like to send to syslog. 
   The [Syslog section]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.SyslogStoreSpec) 
   contains a field called `logTypes` which allows you to list which log types you would like to include. 
   The allowable log types are:
    - Audit
    - DNS
    - Flows
    - IDSEvents

   Refer to the [Syslog section]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.SyslogStoreSpec) for more details on what data each log type represents.

   Building on the example from the previous step:
   ```yaml
   apiVersion: operator.tigera.io/v1
   kind: LogCollector
   metadata:
     name: tigera-secure
   spec:
     additionalStores:
       syslog:
         # (Required) Syslog endpoint, in the format protocol://host:port
         endpoint: tcp://1.2.3.4:514
         # (Optional) If messages are being truncated set this field
         packetSize: 1024
         # (Required) Types of logs to forward to Syslog (must specify at least one option)
         logTypes:
         - Audit
         - DNS
         - Flows
         - IDSEvents
   ```

   > **Note**: The log type `IDSEvents` is only supported for a cluster that has [LogStorage]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.LogStorage) configured. It is because intrusion detection event data is pulled from the corresponding LogStorage datastore directly.
   {: .alert .alert-info}

   The `logTypes` field is a required, which means you must specify at least one type of log to export to syslog.

**TLS configuration**

3. You can enable TLS option for syslog forwarding by including the "encryption" option in the [Syslog section]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.SyslogStoreSpec).

   ```yaml
   apiVersion: operator.tigera.io/v1
   kind: LogCollector
   metadata:
     name: tigera-secure
   spec:
     additionalStores:
       syslog:
         # (Required) Syslog endpoint, in the format protocol://host:port
         endpoint: tcp://1.2.3.4:514
         # (Optional) If messages are being truncated set this field
         packetSize: 1024
         # (Optional) To Configure TLS mode
         encryption: TLS
   ```

4. Using the self-signed CA with the field name tls.crt, create a configmap in the tigera-operator namespace named, syslog-ca. Example:

   > **Note**: Skip this step if publicCA bundle is good enough to verify the server certificates.
   {: .alert .alert-info}

   ```bash
   kubectl create configmap syslog-ca --from-file=tls.crt -n tigera-operator
   ```

%>

 <label: Splunk>
  <%

**Support**

In this release, only {% include open-new-window.html text='Splunk Enterprise' url='https://www.splunk.com/en_us/download/splunk-enterprise.html?utm_campaign=google_amer_en_search_brand&utm_source=google&utm_medium=cpc&utm_content=Splunk_Enterprise_Demo&utm_term=splunk%20enterprise&_bk=splunk%20enterprise&_bt=439715964910&_bm=e&_bn=g&_bg=43997960527&device=c&gclid=Cj0KCQjw9_mDBhCGARIsAN3PaFMDEaiLqaUcE1vGv7bnUe5qclx81iydekBjibZ0ueN5w08Y45rXHE0aAmu8EALw_wcB' %} is supported.

{{site.prodname}} uses Splunk's **HTTP Event Collector** to send data to Splunk server. To copy the flow, audit, and dns logs to Splunk, follow these steps:

1. Create a HTTP Event Collector token by following the steps listed in Splunk's documentation for your specific Splunk version. Here is the link to do this for {% include open-new-window.html text='Splunk version 8.0.0' url='https://docs.splunk.com/Documentation/Splunk/8.0.0/Data/UsetheHTTPEventCollector' %}.

2. Create a Secret in the `tigera-operator` namespace named `logcollector-splunk-credentials` with the field `token`.
   Example:

   ```
    kubectl create secret generic logcollector-splunk-credentials \
    --from-literal=token=<splunk-hec-token> \
    -n tigera-operator
   ```

3. Update the
   [LogCollector]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.LogCollector)
   resource named `tigera-secure` to include
   a [Splunk section]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.SplunkStoreSpec)
   with your Splunk information.
   Example:

   ```yaml
   apiVersion: operator.tigera.io/v1
   kind: LogCollector
   metadata:
     name: tigera-secure
   spec:
     additionalStores:
       splunk:
         # Splunk HTTP Event Collector endpoint, in the format protocol://host:port
         endpoint: https://1.2.3.4:8088
   ```
   This can be done during installation by editing the custom-resources.yaml
   by applying it or after installation by editing the resource with the command:
   ```
   kubectl edit logcollector tigera-secure
   ```
%>

{% endtabs %}
