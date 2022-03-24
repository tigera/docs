---
title: Web Application Firewall (WAF)
description: Configure Calico to use with Layer 7 Web Application Firewall
canonical_url: /threat/web-application-firewall
---

**Note:** This feature is tech preview. Tech preview features may be subject to significant changes before they become GA.
{: .alert .alert-info}

### Big picture

Protect cloud-native applications from application layer attacks with {{site.prodname}} Web Application Firewall (WAF).

### Value

A web application firewall (WAF) protects web applications from a variety of application layer attacks such as {% include open-new-window.html text='cross-site scripting (XSS)' url='https://www.f5.com/services/resources/glossary/cross-site-scripting-xss-or-css' %}, {% include open-new-window.html text='SQL injection' url='https://www.f5.com/services/resources/glossary/sql-injection' %}, and {% include open-new-window.html text='cookie poisoning' url='https://www.f5.com/services/resources/glossary/cookie-poisoning' %}, among others. Given that attacks on apps are the {% include open-new-window.html text='leading cause of breaches' url='https://www.f5.com/labs/articles/threat-intelligence/application-protection-report-2019--episode-2--2018-breach-trend' %}, you need to protect the HTTP traffic that provides a gateway to valuable app data.

Historically, web application firewalls (WAFs) were deployed at the edge of your cluster to filter incoming traffic. Our WAF solution takes a unique, cloud-native approach to web security by allowing you to implement zero-trust rules for **internal east/west traffic** inside your cluster.

{{site.prodname}} WAF allows you to selectively run service traffic within your cluster, and protect intra-cluster traffic from common HTTP-layer attacks such as SQL injection, and cross-site request forgery. To increase protection, you can use {{site.prodname}} network policies to enforce security controls on selected pods on the host.

In addition to protecting against application layer attacks, any blocked HTTP requests will be logged and available in ElasticSearch for review. You can also set globalAlerts to be triggered based on these logs.

### Features 

This how-to-guide uses the following {{site.prodname}} features:
- Application Layer resource

### Concepts

#### About {{site.prodname}} WAF

With {{site.prodname}} WAF, you gain visibility into internal east/west traffic at the HTTP layer in Manager UI Service Graph, Kibana, and Alerts page. 

#### {{site.prodname}} WAF implementation

{{site.prodname}} WAF is deployed in your cluster as an Envoy daemonset. {{site.prodname}} proxies selected service traffic through Envoy, checking HTTP requests using the industry standard ModSecurity module.

### Before you begin

**Not supported**
- Windows
- eBPF dataplane
- RKE clusters

**Limitations**
- WAF is not supported for host-networked client pods
- When selecting and deselecting traffic for WAF, active connections may be disrupted

**Required**

Configure Felix for syncing WAF policy. Note: this is the same step required for L7 log collection so you may already have this set.

Enable the Policy Sync API in Felix. To do this cluster-wide, modify the `default` FelixConfiguration to set the field `policySyncPathPrefix` to `/var/run/nodeagent`.

### How to

- [Configure a cluster for WAF](#configure-a-cluster-for-waf)
- [Add and edit rules](#add-and-edit-rules)
- [Manager UI](#manager-ui)

#### Configure a cluster for WAF

##### Step 1: Configure ApplicationLayer CRD

Create or update the [ApplicationLayer](https://docs.tigera.io/reference/installation/api#operator.tigera.io/v1.ApplicationLayer) resource to include the webApplicationFirewall section of the file. Ensure value of the field is set to Enabled.

Example:
```
apiVersion: operator.tigera.io/v1
kind: ApplicationLayer
metadata:
  name: tigera-secure
spec:
  webApplicationFirewall: Enabled
```

##### Step 2: Select traffic for WAF

Annotate the services you wish to enable WAF for as shown.

```bash
kubectl annotate svc <service-name> -n <service-namespace> projectcalico.org/l7-logging=true
```

To disable WAF for the service, remove the annotation.

```bash
kubectl annotate svc <service-name> -n <service-namespace> projectcalico.org/l7-logging-
```


##### Step 3: Test your installation

To test your installation, you must first know the URL to access services. The URL can be either of the following:
- The external address of your cluster/service
- The cluster IP of your application's service (if testing within the cluster).

After identifying the URL, `curl` your service with a command to trigger an OWASP rule. This is a simple example of potential SQL Injection attack:

```
curl http://<host>//test/artists.php?artist=0+div+1+union%23foo*%2F*bar%0D%0Aselect%23foo%0D%0A1%2C2%2Ccurrent_user
```

Now view the WAF logs in Kibana by selecting the `tigera_secure_ee_waf` index pattern. You should see the relevant WAF assessment from your request recorded:

<img src="/images/waf-kibana.png" alt="WAF logs in Kibana" width="600">

#### Add and edit rules

The OWASP Core Rule set that is bundled with {{site.prodname}} WAF, has reasonable defaults to get started.

ModSecurity provides the following rule sets and options:

- **DetectionOnly**
Allows all traffic to pass, regardless of action specified. However, potentially malicious traffic warning(s) are returned from ModSecurity and logged accordingly with the OWASP violation details.
    
- **On or Off**
Denies all traffic if the SecAction is set to "deny" or "drop". However "block" traffic is not denied or dropped - this is slightly counter-intuitive.

In case of an error, HTTP request will return HTTP 403 Response Code from Envoy to the originating service.

| Action | Description | Disruptive? |
| ------ | ----------- | ----------- |
| Block | Despite the name, this **will not block or drop the request**. ModSecurity will return detection=0 in this case and Calico will log the event in ElasticSearch. | No |
| Deny | Denies HTTP traffic as ModSecurity will return detection=1. | Yes |
| Drop | Denies HTTP traffic as ModSecurity will return detection=1. | Yes |

##### Add or edit a rule set

Create a directory, and download the core rules set files that you want to use, for example:

```bash
mkdir -p my-core-rules-sets && cd my-core-rules-sets
curl -O https://raw.githubusercontent.com/coreruleset/coreruleset/v3.3/dev/rules/REQUEST-942-APPLICATION-ATTACK-SQLI.conf
```

Note: For completeness, it is a good practice to download these bootstrapping configuration files
[(Reference)](https://medium.com/lightbaseio/web-application-firewall-in-go-feat-owasp-modsecurity-core-rule-set-3f97a26e3311).
{: .alert .alert-info}

```bash
curl -O https://raw.githubusercontent.com/lsgroup/SmartReverseProxy/master/modsecdefault.conf
curl https://raw.githubusercontent.com/coreruleset/coreruleset/v3.3/dev/crs-setup.conf.example > crs-setup.conf
```

> **Important**: The two bootstrapping files `modsecdefault.conf` and `crs-setup.conf` MUST be named lowercase i.e. lowercase "m" and lowercase "c" respectively in order to ensure they are loaded into ModSec before any REQUST-*.conf Core Rules Set files. Presence of these two files is required and enforced by the operator.
{: .alert .alert-warning}

Create a configMap from all core rules set files downloaded to your new directory:

```bash
kubectl create configmap -n tigera-operator modsecurity-ruleset --from-file=../my-core-rules-sets
```

#### Manager UI

Create a new Global Alert for WAF using Manager UI, or using standard YAML.

For example, we would like to trigger a Global Alert for SQL Injection attack specifically Rule ID 942100 as per {% include open-new-window.html text='custom version of Core Rule Set file' url='https://github.com/coreruleset/coreruleset/blob/v3.4/dev/rules/REQUEST-942-APPLICATION-ATTACK-SQLI.conf' %} that will "deny" all traffic instead of "block".


```
apiVersion: projectcalico.org/v3
kind: GlobalAlert
metadata:
  name: waf-new-alert-rule-info
spec:
  summary: "WAF new waf-alert-942100"
  description: "Test WAF Global Alert"
  severity: 1
  dataSet: waf
  period: 1m
  lookback: 1h
  query: '"rule_info" IN {"*942100*"}'
  threshold: 0
  condition: gt
```

Apply the YAML to your cluster using: `kubectl apply -f test-demo-alert.yaml`

Now if a SQL Injection attack is detected for rule ID 942100, you will see the global alert in Manager UI, Activity, Alerts.

<img src="/images/waf-alert.png" alt="WAF alert" width="600">
