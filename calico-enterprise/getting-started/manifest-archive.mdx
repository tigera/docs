---
title: Install a patch release
description: Install an older patch release of Calico Enterprise.
---

### Big picture

Install an older patch release of {{site.prodname}}.

### Concepts

Installing a patch release is easy:

1. Download and "un-tar" a patch release to a local directory.
1. Apply the downloaded manifests.

### Before you begin

This feature is:
- Available in 3.0 and later
- Not available for Helm with operator

### How to

1. Go to the {% include open-new-window.html text='Releases tab' url='https://docs.tigera.io/releases' %}, and navigate to the appropriate release (3.0 and later).

1. In the left navigation, click [Release notes]({{site.baseurl}}/release-notes/), and click the link, **Release archive**.

1. Untar the **release-x.x.x.tgz** to a local directory.

   ```bash
   tar xzvf release-x.y.z.tgz
   ```

{% tabs %}

<label:Kubernetes,active:true>
<%

In the patch release archive, navigate to the `manifests` folder.

1. Follow the [quickstart installation]({{site.baseurl}}/getting-started/kubernetes/quickstart), making the following changes:
   1. Install Tigera operator and custom resource definitions.
      
      ```bash
      kubectl create -f <your-local-directory-archive>/manifests/tigera-operator.yaml
      ```

   2. If you are not using an existing Prometheus operator, install it.
      
      ```bash
      kubectl create -f <your-local-directory-archive>/manifests/tigera-prometheus-operator.yaml
      ```

   3. Install Tigera custom resources.
      
      ```bash
      kubectl create -f <your-local-directory-archive>/manifests/custom-resources.yaml
      ```

      > **NOTE**: For platforms like AKS or EKS, you must modify the command to be platform specific.
      > EKS example: `kubectl create -f <your-local-directory-archive>/manifests/eks/custom-resources.yaml`
      > {: .alert .alert-info}

%>

<label: OpenShift>
<%

In the patch release archive, navigate to the `ocp-manifests` folder which contains three folders `install-manifests`,
`enterprise-resources`, and `upgrade-manifests`.

- `install-manifests` contains all the manifests needed for minimal OCP cluster.
- `enterprise-resources` contains the {{site.prodname}} resources.
- `upgrade-manifests` folder contains all the manifests needed for upgrading {{site.prodname}}.

1. Create the cluster by following [the standard installation]({{site.baseurl}}/getting-started/openshift/installation), with the following caveat:
   1. After the Kubernetes manifests directory is generated, copy the files from `install-manifests` instead of downloading the manifests.

      > **NOTE**: Before creating the cluster, be sure to add an image pull secret in `install-manifests/02-pull-secret.yaml`
      > {: .alert .alert-info}

  1. Install {{site.prodname}} resources:

    ```bash
    cd <your-local-directory-archive>/ocp-manifests/enterprise-resources && oc create -f

%>

<label: Features>
<%

In the patch release archive, there are additional manifests relating to specific features.

**Examples**

To apply the patch release for threat defense features.

```bash
cd <your-local-directory-archive>/manifests/threatdef && kubectl create -f ejr-vpn.yaml.yaml
cd <your-local-directory-archive>/manifests/threatdef && kubectl create -f tor-exit-feed.yaml
```

%>

{% endtabs %}