---
title: Get started
description: Learn about the Calico Enterprise AWS security groups integration.
canonical_url: /security/aws-integration/get-started
---

### Big picture

Learn about the {{site.prodname}} AWS security groups integration. 

### Value

It is common for a Kubernetes cluster in AWS to interact with other Amazon-hosted resources such as application instances and datastores like RDS. The native protection for these resources is VPC security groups. By default, VPC security groups can be applied only to application instances. So to allow a subset of pods access to an RDS instance, you must allow access for your entire Kubernetes cluster -- which allows *all* Kubernetes pods access to the RDS instance. This is probably not what you want if you are securing microservices and multi-tenant deployments. 

{{site.prodname}} extends AWS security groups with its tiered network policy, enforcing granular access control between Kubernetes pods and AWS VPC resources. The following challenges are examples of use cases that this integration helps address:

✓ In general, it is hard to implement granular egress and ingress access controls to resources in a cluster.

✓ The load balancers fronting my microservices must be given total access to a Kubernetes cluster, so any compromise in the load balancer exposes every microservice.

✓ Kubernetes clusters must be all-or-nothing access to an RDS; enabling access per application is not possible.
 
✓ The Kubernetes cluster is shared between development and production, but there is no way to distinguish dev and prod workloads when accessing the RDS and EBS datastores.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **AWS security groups integration with custom resource definition**

### Concepts

#### Control access between pods and VPC resources

With native AWS security groups, you cannot secure communications to and from individual pods for VPC resources. 

![aws-vpc]({{site.baseurl}}/images/aws-security-groups/aws-security-groups.png)

With {{site.prodname}}, you can extend AWS security groups to pods, 

![aws-goal]({{site.baseurl}}/images/aws-security-groups/aws-pods.png)

and use network policy and annotations to secure and control access to VPC resources.

![ingress-egress]({{site.baseurl}}/images/aws-security-groups/ingress-egress.png) 

#### About the integration

The {{site.prodname}} AWS security groups integration uses the Kubernetes cloud controller to monitor the security groups and VPC endpoints in the Amazon VPC, create network policies, and ensure that required security groups are added to VPC endpoints.

The high-level implementation steps are: 

| Task                                                        | Steps                                                        |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| 1 - Prepare AWS security groups                             | 1. Add your VPC resources (represented by endpoints) to a security group.<br />2. Create AWS security groups with rules to allow traffic for the cluster. |
| 2 - Enable {{site.prodname}} AWS security group integration | Create a custom resource definition (CRD) with VPC security group information. |
| 3 - Control pod access to/from VPC resources                | Use {{site.prodname}} tiered network policy and annotations to allow and deny access. |

To see an EKS workshop on AWS security groups and Tigera Secure Cloud Edition, see {% include open-new-window.html text='Integrating VPC security groups and Kubernetes network policy with TSCE' url='https://www.eksworkshop.com/beginner/120_network-policies/tigera/tsce-sg-integration/' %} 

### Next steps

- [Configure {{site.prodname}} AWS security groups integration]({{site.baseurl}}/security/aws-integration/aws-security-group-integration)
