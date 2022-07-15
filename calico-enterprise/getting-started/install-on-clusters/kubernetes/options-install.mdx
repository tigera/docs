---
title: Options for installing Calico Enterprise
description: Learn about API-driven installation and how to customize your installation configuration.
feature_name: feature_generic_all
---

### Big picture

Understand the options for installing {{site.prodname}}. 

### Value

Determine the right install method for your deployment, how to customize your installation configuration, and explains concepts important for integrating {{site.prodname}} into your configuration management.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **operator.tigera.io installation APIs** 
- **{{site.prodname}} resources**
- **calicoctl**

### Concepts

#### API-driven installation

Starting in release v3.0, {{site.prodname}} API-driven installation is the only supported installation method. The Tigera operator APIs (**operator.tigera.io**), let you define a {{site.prodname}} cluster using declarative states. The APIs in the operator.tigera.io group define the desired state for your installation, and provide status reporting and visibility into the health of {{site.prodname}}. The Tigera operator makes sure the cluster’s state matches your desired state. These APIs can be configured at install-time, and can also be modified on a running cluster to adjust configuration.

#### Available APIs

Each API in the operator.tigera.io API group configures the installation of a different {{site.prodname}} subsystem. The resources that you deploy and the settings you choose for each, depends on your cluster(s). For a detailed look at the available APIs, see the [installation API reference]({{site.baseurl}}/reference/installation/api). 

| **Resource**                    | **Description**                                              |
| ------------------------------- | ------------------------------------------------------------ |
| **Installation**                | The foundation of every deployment is the **Installation** resource. It deploys core networking and network policy enforcement features to the cluster, and is required for all other resources to function. |
| **APIServer**                   | Installs the Tigera API server, which enables access to the full set of [{{site.prodname}} APIs]({{site.baseurl}}/reference/installation/api). |
| **LogStorage**                  | Configures installation of storage for {{site.prodname}} flow and DNS logs. |
| **LogCollector**                | Configures collection of those logs from the cluster, including optional configuration to backup logs in additional stores. |
| **Compliance**                  | Configures the {{site.prodname}} compliance reporting feature. |
| **IntrusionDetection**          | Configures the {{site.prodname}} intrusion detection feature. |
| **Manager**                     | Installs the {{site.prodname}} Manager web UI.               |
| **ManagementClusterConnection** | Configures a connection to the management cluster for managed clusters. |
| **TigeraStatus**                | Displays conditions for a component (available, progressing, or degraded). |

#### Additional configuration

In addition to the above APIs, some product features are configured through additional Kubernetes Secrets and Kubernetes ConfigMaps. For details, see the relevant documentation for each feature.

#### Customize over time

The out-of-the-box {{site.prodname}} installation gives you a working cluster with reasonable defaults with minimal post-installation tasks. 

{% include content/default-install.md install="default" %}

You do not have to customize everything during initial install. As you progress through each stage of implementing {{site.prodname}} leading to production (following diagram), you will gradually customize {{site.prodname}} resources and automate cluster deployment. For example, when you move to **2 - Pre-production**, you may switch from standalone clusters (default) to multi-cluster management for centralization and scaling. 

![customize install]({{site.baseurl}}/images/customize-install.png)

#### API-driven installation options

For most users, we recommend the standard installation, which uses a Kubernetes operator to guide and manage the installation.
For exceptional circumstances, {{site.prodname}} components can be installed using the following methods:

**Install directly on non-cluster hosts**

Although {{site.prodname}} requires a Kubernetes control plane to function, you may want to install the node components on [non-cluster hosts]({{site.baseurl}}/getting-started/bare-metal/) to consistently secure all of your infrastructure. 

**Install on Kubernetes using Helm**

If your deployment requires Helm charts, we provide a helm chart that installs {{site.prodname}} using the Tigera operator. The Helm `values.yaml` includes sections that correspond directly to the operator.tigera.io APIs for installing the product. In the following example, the installation value is piped into the **spec** field of the **installation API**.

**values.yaml**

```
installation:
  variant: TigeraSecureEnterprise
  registry: gcr.io/mycorp
```

**installation.yaml**

```
apiVersion: operator.tigera.io/v1
kind: Installation
metadata:
  name: default
spec:
  variant: TigeraSecureEnterprise
  registry: gcr.io/mycorp
```

#### Installation steps

The following table shows the conceptual stages of a {{site.prodname}} install. 

>**Note**: Details in the following steps will vary for platforms; for example, OpenShift automatically orchestrates the execution of the steps through tooling. 
{: .alert .alert-info}

| **Steps**                                                    | **Resources/files/APIs**                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1 - Install the necessary APIs using CustomResourceDefinitions, and install the necessary operators | This step installs CustomResourceDefinitions (CRDs) into the cluster to enable the necessary API endpoints in the Kubernetes API server.  It also installs the Tigera operator and the Prometheus operator which implements those APIs. <br /><br />**Tip**: For most platforms, this step is accomplished by installing `tigera-operator.yaml`. However, note that OpenShift requires all resources to be in their own file, and so `tigera-operator.yaml` is split among many files for OpenShift installs. |
| 2 - Install any required {{site.prodname}} resources         | Depending on your cluster, you may want to configure certain features of {{site.prodname}} at install-time. For example, you may require cluster-specific BGP configurations. You can create any install-time configuration using `calicoctl`. <br /><br />**Tip**: On OpenShift clusters, this is done automatically by placing configuration in a Kubernetes ConfigMap. |
| 3 - Install {{site.prodname}}                                | Install {{site.prodname}} by creating instances of the **operator.tigera.io** resources discussed above.  The Tigera operator reads this configuration and installs the necessary components, verifying that everything is working along the way. |

### Frequently asked questions

**Are new {{site.prodname}} features always delivered in major or minor release of the Tigera operator?** 
  
  Usually, but not always. Sometimes new features are delivered in a patch version of the Tigera operator. 

**How do I find the version of the Tigera operator for troubleshooting?**

  ```bash
  kubectl exec -n tigera-operator -l name=tigera-operator -- operator --version
  ```

**Which CLI do I use to customize and configure {{site.prodname}}?**
  
  You can use `kubectl` for all resources in the operator.tigera.io/v1 API group.

  For projectcalico.org/v3 APIs, you can use `kubectl` as long as the Tigera API server is running. Before the Tigera API server is running (for example, during product installation), you must use `calicoctl` to configure these APIs.

### Next steps

- To get started with installation, see [Install on clusters]({{site.baseurl}}/getting-started/install-on-clusters/)
- To upgrade from a non-operator installation method, see [Upgrade]({{site.baseurl}}/maintenance/kubernetes-upgrade-tsee/operator)
