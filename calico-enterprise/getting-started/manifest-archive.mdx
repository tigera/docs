---
title: Install a patch release
description: Install an older patch release of Calico Enterprise.
feature_name: feature_generic_all
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

   ```
   tar xzvf release-x.y.z.tgz
   ```

**OpenShift users**

1. In the patch release archive, find the `ocp-manifests` folder.  This contains three folders `install-manifests`,
`enterprise-resources`, and `upgrade-manifests`. `install-manifests` contains all the manifests needed for minimal OCP cluster. 
`enterprise-resources` contains the {{site.prodname}} resources. `upgrade-manifests` folder contains all the manifests needed for upgrading {{site.prodname}}. 

1. Apply patches.

   Create the cluster using the following command.

   ```
   cd <your-local-directory-archive>/ocp-manifests/install-manifests && kubectl create -f
   ```

   To install {{site.prodname}} resources apply the following command.

   ```
   cd <your-local-directory-archive>/ocp-manifests/enterprise-resources && kubectl create -f
   ```

   **Example**
   
   ```
   cd /mylocaldir/release-v3.0.0-v1.6.3/ocp-manifests/install-manifests && kubectl create -f
   cd /mylocaldir/release-v3.0.0-v1.6.3/ocp-manifests/enterprise-resources && kubectl create -f
   ```  

**All other users**

1. In the patch release, note the full path to your patch release and platform that you want to apply. 
1. Use the following command to apply the appropriate .yamls for your platform.

   ```
   cd <your-local-directory-archive>/manifests && kubectl create -f <manifest-name>.yaml
   ```

   **Examples**

   **On-premises**

   In this example, we apply a patch release for Kubernetes on-premises.

   ```
   cd /mylocaldir/release-v3.0.0-v1.6.3/manifests && kubectl create -f tigera-operator.yaml
   cd /mylocaldir/release-v3.0.0-v1.6.3/manifests && kubectl create -f custom-resources.yaml
   cd /mylocaldir/release-v3.0.0-v1.6.3/manifests && kubectl create -f tigera-policies.yaml
   cd /mylocaldir/release-v3.0.0-v1.6.3/manifests && kubectl create -f tigera-policies-managed.yaml
   cd /mylocaldir/release-v3.0.0-v1.6.3/manifests && kubectl create -f compliance-reporter-pod-es-config.yaml
   ...
   ```

   In this example, we apply a patch release for the threat defense feature.

   ```
   cd /mylocaldir/release-v3.0.0-v1.6.3/manifests/threatdef && kubectl create -f ejr-vpn.yaml.yaml
   cd /mylocaldir/release-v3.0.0-v1.6.3/manifests/threatdef && kubectl create -f tor-exit-feed.yaml
   ```

   **Managed cloud provider**

   In this example, we apply a patch release for GKE.

   ```
   cd /mylocaldir/release-v3.0.0-v1.6.3/manifests/gke && kubectl create -f cnx-api-kdd.yaml.yaml
   cd /mylocaldir/release-v3.0.0-v1.6.3/manifests/gke && kubectl create -f calico-typha.yaml.yaml
   ...
   ```
