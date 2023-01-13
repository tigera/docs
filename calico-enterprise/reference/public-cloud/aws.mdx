---
title: Amazon Web Services
description: Advantages of using Calico Enterprise in AWS.
canonical_url: '/reference/public-cloud/aws'
---

{{site.prodname}} provides the following advantages when running in Amazon Web Services (AWS):

- **Network Policy for Containers**: {{site.prodname}} provides fine-grained network security policy for individual containers.
- **No Overlays**: Within each VPC subnet {{site.prodname}} doesn't need an overlay, which means high performance networking for your containers.
- **No 50 Node Limit**: {{site.prodname}} allows you to surpass the 50 node limit, which exists as a consequence of the [AWS 50 route limit](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Appendix_Limits.html#vpc-limits-route-tables){:target="_blank"} when using the VPC routing table.

## Routing traffic within a single VPC subnet

Since {{site.prodname}} assigns IP addresses outside the range used by AWS for EC2 instances, you must disable AWS src/dst
checks on each EC2 instance in your cluster
[as described in the AWS documentation](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_NAT_Instance.html#EIP_Disable_SrcDestCheck){:target="_blank"}.  This
allows {{site.prodname}} to route traffic natively within a single VPC subnet without using an overlay or any of the limited VPC routing table entries.

## Routing traffic across different VPC subnets / VPCs

If you need to split your deployment across multiple AZs for high availability then each AZ will have its own VPC subnet.  To
use {{site.prodname}} across multiple different VPC subnets or [peered VPCs](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/vpc-peering.html){:target="_blank"},
in addition to disabling src/dst checks as described above you must also enable IPIP encapsulation and outgoing NAT
on your {{site.prodname}} IP pools.

See the [IP pool configuration reference]({{site.baseurl}}/reference/resources/ippool)
for information on how to configure {{site.prodname}} IP pools.

By default, {{site.prodname}}'s IPIP encapsulation applies to all container-to-container traffic.  However,
encapsulation is only required for container traffic that crosses a VPC subnet boundary.  For better
performance, you can configure {{site.prodname}} to perform IPIP encapsulation only across VPC subnet boundaries.

To enable the "CrossSubnet" IPIP feature, configure your {{site.prodname}} IP pool resources
to enable IPIP and set the mode to "CrossSubnet".

> **Note**: This feature was introduced in {{site.prodname}} v2.1, if your deployment was created with
> an older version of {{site.prodname}}, or if you if you are unsure whether your deployment
> is configured correctly, follow the [Configuring IP-in-IP guide]({{site.baseurl}}/networking/vxlan-ipip)
> which discusses this in more detail.
>
{: .alert .alert-info}

The following `kubectl` command will create or modify an IPv4 pool with
CIDR 192.168.0.0/16 using IPIP mode `CrossSubnet`. Adjust the pool CIDR for your deployment.

```bash
kubectl apply -f - <<EOF
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: ippool-cs-1
spec:
  cidr: 192.168.0.0/16
  ipipMode: CrossSubnet
EOF
```

## Enabling workload-to-WAN traffic

To allow {{site.prodname}} networked containers to reach resources outside of AWS,
you must configure outgoing NAT on your [{{site.prodname}} IP pool]({{site.baseurl}}/reference/resources/ippool).

AWS will perform outbound NAT on any traffic which has the source address of an EC2 virtual
machine instance.  By enabling outgoing NAT on your {{site.prodname}} IP pool, {{site.prodname}} will
NAT any outbound traffic from the containers hosted on the EC2 virtual machine instances.

The following `kubectl` command will create or modify an IPv4 pool with
CIDR 192.168.0.0/16 using IPIP mode `CrossSubnet` and enables outgoing NAT.
Adjust the pool CIDR for your deployment.

```bash
kubectl apply -f - <<EOF
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: ippool-1
spec:
  cidr: 192.168.0.0/16
  ipipMode: CrossSubnet
  natOutgoing: true
EOF
```

## Using AWS networking

{{site.prodname}} supports the AWS VPC CNI plugin, which creates ENI interfaces for the pods that fall within the VPC of
the cluster. Routing to these pods is automatically handled by AWS.

We recommend using the AWS VPC CNI plugin with [federation]({{site.baseurl}}/multicluster/federation/overview) as it provides seamless IP connectivity
between your AWS cluster and a remote cluster. Ensure that you use version 1.1 or later.

Install the AWS VPC CNI plugin in your Kubernetes cluster as follows.

1. Download the AWS VPC CNI manifest.

   ```bash
   curl \
   https://raw.githubusercontent.com/aws/amazon-vpc-cni-k8s/v1.11.4/config/master/aws-k8s-cni.yaml \
   -O
   ```

1. By default, the AWS CNI plugin performs SNAT for any packet routed outside the VPC. You must disable SNAT
   on external packets to allow clusters in other VPCs or connected via VPN to communicate with pods.

   > **Important**: Required for [federation]({{site.baseurl}}/multicluster/federation/overview).
   {: .alert .alert-danger}

   To disable SNAT on external packets, open the AWS VPC CNI manifest in your favorite editor
   and add an `AWS_VPC_K8S_CNI_EXTERNALSNAT` environment variable set to `true` in the `aws-node` container.
   An example follows.

   ```yaml
   kind: DaemonSet
   apiVersion: apps/v1
   # kubernetes versions before 1.9.0 should use extensions/v1beta1
   metadata:
     name: aws-node
     namespace: kube-system
     labels:
       k8s-app: aws-node
   spec:
     updateStrategy:
       type: RollingUpdate
     selector:
       matchLabels:
         k8s-app: aws-node
     template:
       metadata:
         labels:
           k8s-app: aws-node
         annotations:
           scheduler.alpha.kubernetes.io/critical-pod: ''
       spec:
         serviceAccountName: aws-node
         hostNetwork: true
         tolerations:
         - operator: Exists
         containers:
         - image: 602401143452.dkr.ecr.us-west-2.amazonaws.com/amazon-k8s-cni:v1.3.4
           imagePullPolicy: Always
           ports:
           - containerPort: 61678
             name: metrics
           name: aws-node
           env:
             - name: AWS_VPC_K8S_CNI_LOGLEVEL
               value: DEBUG
             - name: MY_NODE_NAME
               valueFrom:
                 fieldRef:
                   fieldPath: spec.nodeName
             - name: AWS_VPC_K8S_CNI_EXTERNALSNAT
               value: "true"
   ...
   ```

   > **Note**: For details see the
   > [Amazon VPC CNI Plugin Version 1.1](https://aws.amazon.com/blogs/opensource/vpc-cni-plugin-v1-1-available){:target="_blank"}
   > release notes.
   {: .alert .alert-info}

1. Apply the manifest using kubectl.

   ```bash
   kubectl apply -f aws-k8s-cni.yaml
   ```

1. Follow the instructions to install [{{site.prodname}} on AWS]({{site.baseurl}}/getting-started/kubernetes/aws).
