---
title: Configure Calico Enterprise AWS security groups integration
description: Calico Enterprise lets you combine AWS security groups with network policy to enforce access control between Kubernetes pods and AWS VPC resources. 
canonical_url: /security/aws-integration/
feature_name: aws_integration
---

### Big picture

Configure {{site.prodname}} AWS security groups integration.

### Value

AWS security group integration for {{site.prodname}} allows you to combine AWS security groups with network policy to enforce granular access control between Kubernetes pods and AWS VPC resources.

### Before you begin

**Supported**

- Kubernetes and EKS clusters deployed with the Amazon VPC CNI plugin 

**Not supported**
- Helm and Docker install
- Multiple VPCs
- {{site.prodname}} non-cluster hosts, and auto-hostendpoint features. Alternatives to secure host endpoints:
  - Configure the security groups that are applied to the instances to police traffic to nodes
  - For AWS resources: apply labels to host endpoints for selecting by AWS security group
  - Use {{site.prodname}} [GlobalNetworkSets]({{site.baseurl}}/reference/resources/globalnetworkset) and use custom labels for selection in policy.

**Kubernetes cluster requirements**

- Exists within a single VPC.

- The Kubernetes AWS cloud provider is enabled.

  Verify the Kubernetes AWS cloud provider is enabled by confirming each node has a ProviderId:

  ```bash
  kubectl get node -o=jsonpath='{range .items[*]}{.metadata.name}{"\tProviderId: "}{.spec.providerID}{"\n"}{end}'
  ```

- Networking provider is [Amazon VPC Networking]({{site.baseurl}}/reference/public-cloud/aws#using-aws-networking).
  (You must be using the {% include open-new-window.html text='AWS CNI Plugin' url='https://github.com/aws/amazon-vpc-cni-k8s' %}).

  Verify the Amazon VPC Networking and CNI plugin is being used by confirming that an `aws-node` pod exists on each node:

  ```bash
  kubectl get pod -n kube-system -l k8s-app=aws-node -o wide
  ```

- You have installed [{{site.prodname}} for EKS]({{site.baseurl}}/getting-started/kubernetes/eks)
  on your cluster, or kubeadm/kops. 

  Verify {{ site.prodname }} has been installed by confirming that all tigerastatuses are available:

  ```bash
  kubectl get tigerastatus
  ```
- You have installed {{site.prodname}} configured to work with the AWS CNI Plugin. This is done by following the installation guide for EKS on your cluster or configuring the Installation resource during installation and setting the CNI.Type to `AmazonVPC`.

  Verify {{ site.prodname }} has been installed by confirming that all tigerastatuses are available:

  ```bash
   kubectl get tigerastatus
  ``` 

- You are not using the {{site.prodname}} [auto hostendpoints feature]({{site.baseurl}}/security/kubernetes-nodes), and have not created any [host endpoints]({{site.baseurl}}/reference/resources/hostendpoint) that have a `spec.node` value that matches any of your Kubernetes nodes.

  Verify that there are no entries for {{site.prodname}} host endpoints using this command:

  ```bash
  kubectl get hostendpoints
  ```

**Host requirements**

- `kubectl` configured to access the cluster
- AWS Command Line Interface (CLI). The following commands are tested/work well with AWS CLI 1.15.40.
- {% include open-new-window.html text='jq commands' url='https://stedolan.github.io/jq/' %}

### How to

- [Gather required cluster information](#gather-required-cluster-information)
- [Install AWS resources](#install-aws-resources)
- [Create operator custom resource](#create-operator-custom-resource)

#### Gather required cluster information

Gather the following information about your cluster and export it as environment variables:

| Variable | Description |
|---|---|
| `AWS_REGION` | The region in which your cluster is located. The AWS CLI commands in this install assume this environment variable has been set. |
| `VPC_ID` | The ID of the VPC in which your cluster is located. |
| `CONTROL_PLANE_SG` | The ID of a security group to which all master nodes belong. |
| `K8S_NODE_SGS` | Group ID(s) of the security group(s) that each node should belong to. If more than one, use commas to separate them. |
| `CLUSTER_NAME` | A name that uniquely identifies this cluster within the VPC. This is used as a prefix when naming per-cluster resources. It must satisfy the pattern `[a-zA-Z][-a-zA-Z0-9]*`. |

Most Kubernetes provisioners set a different security group for masters and nodes. If your cluster uses the same security group across both, it is fine to set `$CONTROL_PLANE_SG` and `$K8S_NODE_SGS` to the same value.

Here are examples of how to gather the above information in common Kubernetes environments on AWS.

**EKS cluster created with eksctl**

The following commands gather the required information of a particular EKS cluster with name `$CLUSTER_NAME` that was created with {% include open-new-window.html text='`eksctl`' url='https://github.com/weaveworks/eksctl' %}:

   ```
   VPC_ID=$(aws eks describe-cluster --name $CLUSTER_NAME --query 'cluster.resourcesVpcConfig.vpcId' --output text)
   K8S_NODE_SGS=$(aws ec2 describe-security-groups --filters Name=tag:aws:cloudformation:logical-id,Values=SG Name=vpc-id,Values=${VPC_ID} --query "SecurityGroups[0].GroupId" --output text)
   CONTROL_PLANE_SG=$(aws ec2 describe-security-groups --filters Name=tag:aws:cloudformation:logical-id,Values=ControlPlaneSecurityGroup Name=vpc-id,Values=${VPC_ID} --query "SecurityGroups[0].GroupId" --output text)
   ```
  >**Note**: Commands above apply only to EKS clusters with unmanaged nodegroups i.e. {% include open-new-window.html text='eksctl without --managed' url='https://eksctl.io/usage/eks-managed-nodes/' %} option.

**kops cluster**

The following commands gather the required information of a particular kops cluster with name `$KOPS_CLUSTER_NAME`:

   ```
   VPC_ID=$(aws ec2 describe-instances \
       --filters "Name=tag-value,Values=${KOPS_CLUSTER_NAME}" \
       --output json \
       | jq -r '.Reservations[].Instances[].VpcId' \
       | grep -v null \
       | head -1)

   CONTROL_PLANE_SG=$(aws ec2 describe-instances \
       --filters "Name=tag-value,Values=${KOPS_CLUSTER_NAME}" \
       --output json \
       | jq -r '.Reservations[].Instances[].SecurityGroups[] | select(.GroupName |startswith("master")) |.GroupId')

   K8S_NODE_SGS=$(aws ec2 describe-instances \
       --filters "Name=tag-value,Values=${KOPS_CLUSTER_NAME}" \
       --output json \
       | jq -r '.Reservations[].Instances[].SecurityGroups[] | select(.GroupName |startswith("nodes")) |.GroupId' \
       | head -1)
   ```

   >**Note**: Because `KOPS_CLUSTER_NAMES` are FQDNs, you must to choose a `CLUSTER_NAME` that does not contain any dot separators for use in the remainder of this guide. See [before you begin](#before-you-begin) for more information.
{: .alert .alert-warn}

#### Install AWS resources

1.  Install AWS per-account resources.

    The per-account resources must be applied once per AWS account. Use the following command to see if `tigera-cloudtrail` has already been applied:

    ```bash
    aws cloudformation describe-stacks --stack-name tigera-cloudtrail
    ```

    If the command output does not output a stack run the following command to create the per-account stack:

    ```bash
    aws cloudformation create-stack \
    --stack-name tigera-cloudtrail \
    --template-body {{ "/manifests/aws/security-group-integration/account-cf.yaml" | absolute_url }}

    # Wait for the stack to finish provisioning
    aws cloudformation wait stack-create-complete --stack-name tigera-cloudtrail
    ```

1.  Install AWS per-VPC resources.

    The per-VPC CloudFormation must be created once on a VPC that contains (or will contain) clusters. Run the following command to see if this VPC has had the per-VPC stack applied:

    ```bash
    aws cloudformation describe-stacks --stack-name tigera-vpc-$VPC_ID
    ```

    If the stack is not found, run the following command to create it:

    ```bash
    aws cloudformation create-stack \
    --stack-name tigera-vpc-$VPC_ID \
    --parameters ParameterKey=VpcId,ParameterValue=$VPC_ID \
    --capabilities CAPABILITY_IAM \
    --template-body {{ "/manifests/aws/security-group-integration/vpc-cf.yaml" | absolute_url }}

    # Wait for the stack to finish provisioning
    aws cloudformation wait stack-create-complete --stack-name tigera-vpc-$VPC_ID
    ```

1.  Install AWS per-cluster resources.

    ```bash
    aws cloudformation create-stack \
    --stack-name tigera-cluster-$CLUSTER_NAME \
    --parameters ParameterKey=VpcId,ParameterValue=$VPC_ID \
                 ParameterKey=KubernetesHostDefaultSGId,ParameterValue=$K8S_NODE_SGS \
                 ParameterKey=KubernetesControlPlaneSGId,ParameterValue=$CONTROL_PLANE_SG \
    --template-body {{ "/manifests/aws/security-group-integration/cluster-cf.yaml" | absolute_url }}

    # Wait for the stack to finish provisioning
    aws cloudformation wait stack-create-complete --stack-name tigera-cluster-$CLUSTER_NAME
    ```

1.  Add the controller IAM user secrets in Kubernetes.

    ```bash
    # First, get the name of the created IAM user, which is an output field in your Cluster CF stack
    CONTROLLER_USERNAME=$(aws cloudformation describe-stacks \
    --stack-name tigera-vpc-$VPC_ID \
    --output text \
    --query "Stacks[0].Outputs[?OutputKey=='TigeraControllerUserName'][OutputValue]")

    # Then create an access key for that role
    aws iam create-access-key \
    --user-name $CONTROLLER_USERNAME \
    --output text \
    --query "AccessKey.{Key:SecretAccessKey,ID:AccessKeyId}" > controller-secrets.txt

    # Add the key as a k8s secret
    cat controller-secrets.txt | tr -d '\n' | xargs bash -c \
    'kubectl create secret generic amazon-cloud-integration-credentials \
    -n tigera-operator \
    --from-literal=key-id=$0 \
    --from-literal=key-secret=$1'

    # Delete local copy of the secret
    rm -f controller-secrets.txt
    ```

1.  Gather the remaining bits of information:

    ```bash
    # Get the SQS URL
    SQS_URL=$(aws cloudformation describe-stacks \
    --stack-name tigera-vpc-$VPC_ID \
    --output text \
    --query "Stacks[0].Outputs[?OutputKey=='QueueURL'][OutputValue]")

    # Get the default pod SG
    POD_SG=$(aws cloudformation describe-stacks \
    --stack-name tigera-cluster-$CLUSTER_NAME \
    --output text \
    --query "Stacks[0].Outputs[?OutputKey=='TigeraDefaultPodSG'][OutputValue]")

    # Get the SG for enforced nodes
    ENFORCED_SG=$(aws cloudformation describe-stacks \
    --stack-name tigera-vpc-$VPC_ID \
    --output text \
    --query "Stacks[0].Outputs[?OutputKey=='TigeraEnforcedSG'][OutputValue]")

    # Get the SG for enforced nodes
    TRUST_SG=$(aws cloudformation describe-stacks \
    --stack-name tigera-vpc-$VPC_ID \
    --output text \
    --query "Stacks[0].Outputs[?OutputKey=='TigeraTrustEnforcedSG'][OutputValue]")
    ```
    
#### Create operator custom resource

Create the operator custom resource using inputs from the previous step.

```bash
kubectl create -f - <<EOF
apiVersion: operator.tigera.io/v1
kind: AmazonCloudIntegration
metadata:
  name: tigera-secure
spec:
  nodeSecurityGroupIDs:
  - $K8S_NODE_SGS
  podSecurityGroupID: $POD_SG
  vpcs:
    - $VPC_ID
  sqsURL: $SQS_URL
  awsRegion: $AWS_REGION
  enforcedSecurityGroupID: $ENFORCED_SG
  trustEnforcedSecurityGroupID: $TRUST_SG
EOF
```

Congratulations! You can now use fine-grain access controls to secure communications between VPC endpoints and pods, and between pods and VPC endpoints.

### Next steps

- [Configure fine-grained access control between VPC endpoints and pods]({{site.baseurl}}/security/aws-integration/tiers-and-policy)
