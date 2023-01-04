---
title: Configure fine-grained access control between VPC endpoints and pods 
description: Keep your AWS security groups, and configure fine-grained access control between VPC endpoints and pods. 
canonical_url: /security/aws-integration/tiers-and-policy
---

### Big picture

Configure fine-grained access control between VPC endpoints and pods.

### Value

The {{site.prodname}} AWS security group integration allows you to manage AWS security groups as you normally do, but adds the ability to apply Security Groups to individual pods.

### Features

- **AWS security groups integration**

### Concepts

#### About the integration

All AWS security groups and their enforcement rules are mapped into equivalent {{site.prodname}} network policy in non-editable integration tiers (105-107). The integration tiers only pass traffic, and do not alter security groups. Although you cannot put tiers before them, you can add regular network policy after tier 107.

All pod-to-pod traffic is allowed by default. 

The integration supports using both **Kubernetes** and **{{site.prodname}} tiered network policy**.

#### How network policy is applied

Policy in the integration tiers is evaluated first, followed by network policy. For network policy evaluation to occur, traffic must be allowed through the integration tiers. For example, if your security group rules do not allow traffic then the integration tiers will not pass it, and if you created a network policy that allows it, traffic will not make it through for evaluation by the network policy.

It is entirely up to you how you blend the normal way of controlling access in security groups using pod annotations with network policy. 

#### Best practice: restrict access to integration tiers

We recommend restricting access to integration tiers to ensure they are not modified as they are essential to operations. When you log in to {{site.prodname}} Manager, the following integration tiers are displayed. 

| Tier        | Order | Installed with ...         |
| ----------- | ----- | -------------------------- |
| `sg-remote` | 105   | AWS SG integration feature |
| `sg-local`  | 106   | AWS SG integration feature |
| `metadata`  | 107   | AWS SG integration feature |

**Best practices:**
 
To avoid accidentally modifying the above tiers and associated network policies, do not allow admin and non-admin users to view and modify them. 
  - Although you cannot hide specific tiers from non-admin users, you can use [RBAC for tiered policies]({{site.baseurl}}/security/rbac-tiered-policies), to display only a subset of tiers in the {{site.prodname}} UI. For help, see [displaying only the net-sec tier]({{site.baseurl}}/security/rbac-tiered-policies#user-can-only-view-a-specific-tier).
  - To display tiers and associated network policies, but disable write access to those tiers, see [RBAC example fine-grained permissions]({{site.baseurl}}/security/rbac-tiered-policies#fine-grained-rbac-for-policies-and-tiers).
- Do not modify the following internal integration security groups, or reference them in any ingress or egress rules. 
  - `tigera-trust-host-enforcement`
  - `tigera-has-host-enforcement`
  - `tigera-cluster-{cluster-name}-TigeraPodDefault-id`

### Tutorial

This tutorial shows an example of how to allow traffic between pods and VPC resources using only pod annotation, and then expands on that example by using network policy that selects pods based on Security Group association. The example uses Kubernetes network policy, but {{site.prodname}} network policy can also be used.

#### Setup

- Create Security group `instance-sg`, we assume it has ID `sg-12345678901234`
- Create Security group `pod-sg`, we assume it has ID `sg-98765432109876`
- In the same VPC as the cluster, create an EC2 instance named `ec2-instance`
- Add Security group `instance-sg` to the `ec2-instance`
- Ensure the wget utility is available on the ec2-instance
- Create namespace `integration-demo` with command: `kubectl create namespace integration-demo`
- Launch our test pod `kubectl create deployment --namespace integration-demo pod-tester --image nginx`.
- Get the pod IP for use in later steps `echo $(kubectl get pod -n integration-demo -l app=pod-tester -o=jsonpath='{.items[0].status.podIP}')`

#### Allow traffic between pod and VPC resource (pod annotation only)

Assuming there is no existing network policy that applies to a pod, the only steps required to allow traffic between the pod and VPC resource is to create the appropriate Security groups and annotate the pod.

1. Ensure that Security group `instance-sg` allows egress traffic to Security group `pod-sg`. Egress is typically allowed by default when creating a Security group so there may be nothing needed here.
1. Add a rule to the Pod Security group `pod-sg` that allows traffic from the Security group `instance-sg` to port 80.
1. Add the Pod `pod-tester` to the security group, `sg-98765432109876`. To do this, annotate the pod with the ID of the Security group. Ensure that you replace `sg-98765432109876` with the real Security group ID of your `pod-sg` Security group.

   **Syntax**

   ```
   kubectl annotate pod -n <namespace> -l <label-selector> aws.tigera.io/security-groups='["<sg-id>, <sg-id>"]'
   ```
   **Example**

   ```
   kubectl annotate pod -n integration-demo -l app=pod-tester aws.tigera.io/security-groups='["sg-98765432109876"]'
   ```
1. Connect to ec2-instance, then run `wget -q <pod IP> -O -`. 

  You should see a response from nginx.

#### Allow traffic between pod and VPC resource (network policy and pod annotation)

Continuing with the example, let’s assume that we want to have a default deny network policy for our pod that restricts traffic to the pod. In this case, we will create a new network policy that uses the Security group association to allow traffic.  

1. Create a default-deny NetworkPolicy in our `integration` namespace.

   ```
   kubectl create -f - <<EOF
   kind: NetworkPolicy
   apiVersion: networking.k8s.io/v1
   metadata:
     name: default-deny
     namespace: integration-demo
   spec:
     podSelector:
       matchLabels: {}
   EOF
   ```
1. Verify that traffic from the ec2-instance is blocked. Run `wget -q --timeout=5 <pod IP> -O -`, and verify that it times out.
1. Create a NetworkPolicy to allow traffic to `pod-tester` from the `ec2-instance` based on the instance being in the Security group `sg-12345678901234`. Be sure to replace `sg-12345678901234` with the real Security group ID of your `instance-sg` Security group.

   ```
   kubectl create -f - <<EOF
   kind: NetworkPolicy
   apiVersion: networking.k8s.io/v1
   metadata:
     name: allow-from-instance
     namespace: integration-demo
     annotations:
      rules.networkpolicy.tigera.io/match-security-groups: "true"
   spec:
     podSelector:
       matchLabels:
         app: pod-tester
     ingress:
     - from:
       - podSelector:
           matchLabels:
             sg.aws.tigera.io/sg-12345678901234: ""
   EOF
   ```
1. Connect to ec2-instance and run `wget -q <pod IP> -O -`. 

   You should see a response from nginx.

Congratulations you’ve used the integration features to allow traffic to a pod from a VPC endpoint. You can also use the integration to allow traffic to a VPC endpoint from a pod by adjusting the security group rules and ensuring NetworkPolicy allows the traffic.

### Troubleshooting

Host endpoints are created for all RDS and EC2 instances with labels for the security groups they belong to, as part of normal representation of your {{site.prodname}} network policy within the network. 

Here are a few verification points if you are experiencing issues:

- Verify host endpoints exists for VPC endpoints
- Verify policy exists for security groups
- Check `tigera-amazon-cloud-integration` logs
- Verify VPC endpoints have `tigera-trust-host-enforcement` security group

### Above and beyond

- [Enable pod access to AWS metadata]({{site.baseurl}}/security/aws-integration/metadata-access)
