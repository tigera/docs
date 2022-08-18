---
title: Kubernetes audit logs
description: Enable Kubernetes audit logs on changes to Kubernetes resources. 
canonical_url: /visibility/elastic/kube-audit
---

### Big picture

Enable Kubernetes audit logs so security teams and auditors can see all the changes to Kubernetes resources over time. 

### Concepts

#### About Kubernetes audit logs

**Kubernetes resources** are used in {{site.prodname}} compliance reports and other audit-related features, but they are not enabled by default. You must enable Kubernetes resources through the Kubernetes API server. If you miss this step, some compliance reports will not work, and audit trails will not provide a complete view to your security team. 

You must enable the following Kubernetes resources for each cluster: 

- Pod
- Namespace
- Service account
- Network policy
- Endpoints

#### Audit logs in Manager UI

Like {{site.prodname}} audit logs, Kubernetes audit logs are displayed in Manager UI in the Timeline dashboard, Kibana dashboard (indexed by, `tigera_secure_ee_audit_kube`), and provide the core data for compliance reports. 

### How to

Enable Kubernetes audit logs in the Kubernetes API server:

{% tabs %}
  <label: Kubernetes on-premises,active:true>
  <%

#### Enable audit logs for Kubernetes resources

At a minimum, enable audit logs for these resources that are involved in network policy:

- Pod
- Namespace
- ServiceAccount
- NetworkPolicy (Kubernetes/OpenShift)
- Endpoints

**Sample policy**

The following sample policy audits changes to Kubernetes Pod, Namespace, ServiceAccount, Endpoints and NetworkPolicy resources. To add other audit logs for resources beyond network policy, see the {% include open-new-window.html text='Kubernetes docs' url='https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/' %}, or review this function for inspiration (which generates the GKE audit policy).

```yaml
apiVersion: audit.k8s.io/v1beta1
kind: Policy
omitStages:
- RequestReceived
rules:
  - level: RequestResponse
    verbs:
      - create
      - patch
      - update
      - delete
    resources:
    - group: networking.k8s.io
      resources: ["networkpolicies"]
    - group: extensions
      resources: ["networkpolicies"]
    - group: ""
      resources: ["pods", "namespaces", "serviceaccounts", "endpoints"]
```

#### Enable Kubernetes audit logs for {{site.prodname}}

The following updates require a restart to the Kubernetes API Server.

To enable Kubernetes resource audit logs to be read by {{site.prodname}} in fluentd, follow these steps. 

On the Kubernetes API Server, update these flags. 
- `--audit-log-path=/var/log/calico/audit/kube-audit.log`
- `--audit-policy-file=<path to file containing audit policy above>`  
    For help with flags, see kube-apiserver flags. For help with audit logging, see Kubernetes audit logging documentation.

Distribute the audit policy file to all master nodes, ensuring that it is available to the Kubernetes API server (e.g. by volume mounting it into the pods).

Restart the Kubernetes API server. The restart command depends on how you installed Kubernetes.

%>
  <label: EKS>
  <%
#### Enable audit logs for Kubernetes resources

At a minimum, enable audit logs for these resources that are involved in network policy:

- Pod
- Namespace
- ServiceAccount
- NetworkPolicy (Kubernetes/OpenShift)
- Endpoints

**Sample policy**

The following sample policy audits changes to Kubernetes Pod, Namespace, ServiceAccount, Endpoints and NetworkPolicy resources. To add other audit logs for resources beyond network policy, see the {% include open-new-window.html text='Kubernetes docs' url='https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/' %}, or review this function for inspiration (which generates the GKE audit policy).

```yaml
apiVersion: audit.k8s.io/v1beta1
kind: Policy
omitStages:
- RequestReceived
rules:
  - level: RequestResponse
    verbs:
      - create
      - patch
      - update
      - delete
    resources:
    - group: networking.k8s.io
      resources: ["networkpolicies"]
    - group: extensions
      resources: ["networkpolicies"]
    - group: ""
      resources: ["pods", "namespaces", "serviceaccounts", "endpoints"]
```
#### Enable audit logs in EKS

Amazon EKS writes Kubernetes audit logs to [Amazon Cloudwatch logs](https://aws.amazon.com/cloudwatch/){:target="_blank"}.

1. In the EKS management console, access your EKS cluster.
1. Under **Logging**, click **Update**.
1. Enable the **Audit** option, and click **Update**.
   <img src="/images/audit-log.png" alt="Audit Log" width="300">
1. Wait for the update to complete.
  The blue progress bar at the top of the page displays the message, “Cluster config update in progress.”
1. Under **Logging**, **Cloudwatch**, make a note of the URL value for a later step, then click the link.
   <img src="/images/cloudwatch-url.png" alt="Cloudwatch Logging" width="400">
1. In the **Log Streams** list, make note of the common prefix (for example, kube-apiserver-audit) for a later step.
   <img src="/images/log-streams.png" alt="Log Streams" width="400">
1. Make note of the region where the cluster is hosted (for example, `us-west-2`) for a later step.

#### Create a restricted AWS user for compliance reporting

1. Go to the **AWS IAM console** and add a user.
1. On the **Add user** page, make these changes:

   a. Select **Access type**, **Programmatic access**.
      <img src="/images/programmatic-access.png" alt="Programmatic access" width="600">

   b. In the Set permissions section, select the policy, `CloudWatchLogsReadOnlyAccess` to set read only permissions.
      <img src="/images/cloudwatch-readonly.png" alt="Cloudwatch URL" width="400">
1. (Optional) In the **Add tags** section, add a tag for the user based on your cluster information.
1. Click **Submit** to create a restricted user.

#### Update {{site.prodname}} log collector with EKS values

1. Update the `tigera-secure` LogCollector resource with values from the EKS configuration.

   where:
   - `additionalSources`: Section where EKS Cloudwatch logs are specified.
   - `eksCloudwatchLog`: Configuration section containing EKS Cloudwatch logs.
   - `fetchInterval`: Interval in seconds for {{site.prodname}} to get logs from Cloudwatch. Default: 60 seconds, this fetches 1MB every 60 seconds, adjust it based number on CRUD operations performed on cluster resource.
   - `groupName`: Name of the `Log Group` (value from "Enable audit logs in EKS")
   - `region`: AWS region where EKS cluster is hosted (value from "Enable audit logs in EKS")
   - `streamPrefix`: Prefix of `Log Stream` (value from "Enable audit logs in EKS")

   **Example**

   ```yaml
   apiVersion: operator.tigera.io/v1
   kind: LogCollector
   metadata:
     name: tigera-secure
   spec:
     additionalSources:
       eksCloudwatchLog:
         fetchInterval: 60
         groupName: /aws/eks/mitch-eks-kube-audit-log-forwarder/cluster
         region: us-west-2
         streamPrefix: kube-apiserver-audit-
   status:
     state: Ready
   ```

#### Configure authentication between {{site.prodname}} and Cloudwatch logs

In this step, you add AWS authentication information to enable {{site.prodname}} to get logs from the EKS Cloudwatch instance.

Add a Secret with the name, `tigera-eks-log-forwarder-secret` in the namespace, `tigera-operator`, and the AWS [Security Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html){:target="_blank"} in the data section.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: tigera-eks-log-forwarder-secret
  namespace: tigera-operator
type: Opaque
data:
  aws-id: $(echo -n <YOUR-AWS-ACCESS-KEY-ID> | base64 -w0)
  aws-key: $(echo -n <YOUR-AWS-ACCESS-KEY-KEY-SECRET> | base64 -w0)
```

%>

%>
  <label: AWS using kOps>
  <%


#### Enable audit logs for Kubernetes resources

At a minimum, enable audit logs for these resources that are involved in network policy:

- Pod
- Namespace
- ServiceAccount
- NetworkPolicy (Kubernetes/OpenShift)
- Endpoints

**Sample policy**

The following sample policy audits changes to Kubernetes Pod, Namespace, ServiceAccount, Endpoints and NetworkPolicy resources. To add other audit logs for resources beyond network policy, see the {% include open-new-window.html text='Kubernetes docs' url='https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/' %}, or review this function for inspiration (which generates the GKE audit policy).

```yaml
apiVersion: audit.k8s.io/v1beta1
kind: Policy
omitStages:
- RequestReceived
rules:
  - level: RequestResponse
    verbs:
      - create
      - patch
      - update
      - delete
    resources:
    - group: networking.k8s.io
      resources: ["networkpolicies"]
    - group: extensions
      resources: ["networkpolicies"]
    - group: ""
      resources: ["pods", "namespaces", "serviceaccounts", "endpoints"]
```

Follow these instructions to enable audit logs for {% include open-new-window.html text='AWS using kOps' url='https://kops.sigs.k8s.io/cluster_spec/#audit-logging' %}.

Note that `auditLogPath` should be `/var/log/calico/audit/kube-audit.log`.


%>
 {% endtabs %}