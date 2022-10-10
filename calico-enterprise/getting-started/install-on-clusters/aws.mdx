---
title: kOps on AWS
description: Install Calico Enterprise with a self-managed Kubernetes cluster using kOps on AWS.
canonical_url: '/getting-started/kubernetes/aws'
---

### Big picture

Install {{site.prodname}} with a self-managed Kubernetes cluster using Kubernetes Operations (kOps) on AWS. kOps is a cluster management tool that provisions cluster VMs and installs Kubernetes. It is a good default choice for most because it gives you access to all {{site.prodname}} [flexible and powerful networking features]({{site.baseurl}}/networking). However, other options may work better for your environment. 

### Before you begin

**CNI support**

- Calico CNI for networking with {{site.prodname}} network policy

   The geeky details of what you get:    
   {% include geek-details.html details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:IPIP,Routing:BGP,Datastore:Kubernetes' %}  

- AWS VPC CNI for networking with {{site.prodname}} network policy 

   The geeky details of what you get:    
   {% include geek-details.html details='Policy:Calico,IPAM:AWS,CNI:AWS,Overlay:No,Routing:VPC Native,Datastore:Kubernetes' %}

**Required**

- A [compatible kOps cluster]({{site.baseurl}}/getting-started/compatibility#kops-on-aws)
- A [Tigera license key and credentials]({{site.baseurl}}/getting-started/calico-enterprise)
- Cluster meets [system requirements]({{site.baseurl}}/getting-started/kubernetes/requirements)
- {% include open-new-window.html text='Install kubectl' url='https://kubernetes.io/docs/tasks/tools/install-kubectl/' %}
- {% include open-new-window.html text='Install AWS CLI tools' url='https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html' %}

### How to

Select one of the following installation paths:

- [Install Calico Enterprise networking and network policy](#install-calico-enterprise-networking-and-network-policy)
- [Install Amazon VPC networking with Calico Enterprise network policy](#install-amazon-vpc-networking-with-calico-enterprise-network-policy)

#### Install Calico Enterprise networking and network policy

To use kOps to create a cluster with {{site.prodname}} networking and network policy:

1. {% include open-new-window.html text='Install kOps' url='https://kops.sigs.k8s.io/install/' %} on your workstation.
1. {% include open-new-window.html text='Set up your environment for AWS' url='https://kops.sigs.k8s.io/getting_started/aws/' %} .
1. Be sure to {% include open-new-window.html text='set up an S3 state store' url='https://kops.sigs.k8s.io/getting_started/aws/#cluster-state-storage' %} and export its name:

   ```bash
   export KOPS_STATE_STORE=s3://<name-of-your-state-store-bucket>
   ```
1. Configure kOps to use {{site.prodname}} for networking.
   Create a cluster with kOps using the `--networking cni` flag. For example:

   ```
   kops create cluster \
    --zones us-west-2a \
    --networking cni \
    <name-of-your-cluster>
   ```

      > **Note:** The name of the cluster must be chosen as a valid DNS name belonging to the root user.  It can either be a subdomain of an existing domain name or a subdomain which can be configured on AWS Route 53 service. More details on DNS domain requirements on the `kops` command can be found in Kubernetes' {% include open-new-window.html text='documentation for kops' url='https://kubernetes.io/docs/setup/production-environment/tools/kops/#2-5-create-a-route53-domain-for-your-cluster' %}.
      

   Or, you you can add `cni` to your cluster config.  Run `kops update cluster --name=<name-of-your-cluster>` and set the following networking configuration.

   ```
   networking:
     cni: {}
   ```
      > **Note:** Setting the `--networking cni` flag delegates the installation of the CNI to the user for a later stage.

1. The provisioned kOps cluster will assign it's own set of pod network CIDR in the kube-proxy instance different than the one {{site.prodname}} expects.  To set the cluster cidr for the kube-proxy to match the one expected by {{site.prodname}} edit the cluster config `kops edit cluster <name-of-your-cluster>` and add the the `kubeProxy` config with the `clusterCIDR` expected by the default {{site.prodname}} installation.  
   ```
   spec:
      ...
      kubeProxy:
         clusterCIDR: 192.168.0.0/16
   ```
      > **Note:** For more advanced pod networking CIDR configuration, the requirement is to have `ipPools` CIDR set by the {{site.prodname}} installation to match cluster CIDR set in kube-proxy.  Calico's `ipPools` setting is obtainable in the Installation resource `kubectl get installation -o yaml` and can be configured in the editting the operator manifest found in the [install instructions for {{site.prodname}}]({{site.baseurl}}/getting-started/kubernetes/generic-install).


1. The default size of the provisioned instance groups for the cluster might not be sufficient for the full installation of kubernetes and {{site.prodname}}. To increase the size of the instance groups run `kops edit ig <name-of-instance-group-in-your-cluster> --name <name-of-your-cluster>` and edit the following fields accordingly.
   ```
      spec:
         ...
         machineType: t3.medium
         maxSize: 1
         minSize: 1
   ```
   The name of the instance groups can be obtained from `kops get instancegroups --name <name-of-your-cluster>`.

1. Once your cluster has been configured run `kops update cluster --name=<name-of-your-cluster>` to preview the changes.  Then the same command with `--yes` option (ie. `kops update cluster --name=<name-of-your-cluster> --yes`) to commit the changes to AWS to create the cluster. It may take 10 to 15 minutes for the cluster to be fully created.

    > **Note:** Once the cluster has been created, the `kubectl` command should be pointing to the newly created cluster. By default `kops>=1.19` does not update `kubeconfig` to include the cluster certificates, accesses to the cluster through `kubectl` must be configured. 

1. Validate that nodes are created.

   ```bash
   kubectl get nodes
   ```
  The above should return the status of the nodes in the `Not Ready` state.

1. KOps does not install any CNI when the flag ```--networking cni``` or ```spec.networking: cni {}``` is used. In this case the user is expected to install the CNI separately.
   To Install {{site.prodname}} follow the [install instructions for {{site.prodname}}]({{site.baseurl}}/getting-started/kubernetes/generic-install).

1. Finally, to delete your cluster once finished, run `kops delete cluster <name-of-your-cluster> --yes`.

You can further customize the {{site.prodname}} install with {% include open-new-window.html text='options listed in the kops documentation' url='https://kops.sigs.k8s.io/networking/#calico-example-for-cni-and-network-policy' %}.

#### Install Amazon VPC networking with Calico Enterprise network policy

You can use Amazon’s VPC CNI plugin for networking, and {{site.prodname}} for network policy. The advantage of this approach is that pods are assigned IP addresses associated with Elastic Network Interfaces on worker nodes. The IPs come from the VPC network pool, and therefore do not require NAT to access resources outside the Kubernetes cluster.

Set your kOps cluster configuration to:

```
  networking:
    amazonvpc: {}
  ```

After the cluster is up and ready, [Install {{site.prodname}}]({{site.baseurl}}/getting-started/kubernetes/generic-install).

### Next steps

- {% include open-new-window.html text='Video: Everything you need to know about Kubernetes pod networking on AWS' url='https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-pod-networking-on-aws/' %}
- [Try out {{site.prodname}} network policy]({{site.baseurl}}/security/calico-network-policy)
