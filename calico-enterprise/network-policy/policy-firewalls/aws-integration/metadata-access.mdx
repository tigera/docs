---
title: Enable pods to access AWS metadata
description: Enable pods to access the AWS metadate endpoint. 
canonical_url: /security/aws-integration/metadata-access
---

### Big picture

Enable pods to access AWS metadata.

### Value

You can enable pod access to the AWS metadata endpoint for all or individual pods. Metadata includes instance and user metadata, and IAM credentials of the node. For details, see:

- {% include open-new-window.html text='AWS metadata' url='https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html' %}
- {% include open-new-window.html text='Instance and user metadata' url='https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#instancedata-data-categories' %}

### How to

By default, {{site.prodname}} blocks pods from accessing the AWS metadata endpoint on their node.

#### Enable pod access to metadata

The following command allows an individual pod to access the AWS metadata endpoint on its node.

  ```
  kubectl label pods <pod-name> aws.tigera.io/allow-metadata-access=true
  ```

#### Enable all pods to access the AWS metadata endpoint

If the number of pods you need to allow exceeds the number that you need to block, it may be more convenient to change the default to _allow_ access and then deny access to individual pods that do not need it.

- Edit the [AmazonCloudIntegration resource]({{site.baseurl}}/reference/installation/api#operator.tigera.io/v1.AmazonCloudIntegration).

  ```
  kubectl edit amazoncloudintegration tigera-secure
  ```

  ```
  apiVersion: operator.tigera.io/v1beta1
  kind: AmazonCloudIntegration
  metadata:
    name: tigera-secure
  spec:
    defaultPodMetadataAccess: Allowed
    <... do not remove any of the existing fields ...>
  ```

  Now all pods can access AWS metadata by default.

  >**Note**: You can also add the `defaultPodMetadataAccess` field to the AmazonCloudIntegration
  when it is initially created.
  {: .alert .alert-info}

- Use the following command to block specific pods.

  ```
  kubectl label pods <pod-name> aws.tigera.io/allow-metadata-access=false
  ```
