---
title: Quickstart
description: Install Calico Enterprise for Windows on a Kubernetes cluster for testing or development.
canonical_url: '/getting-started/windows-calico/quickstart'
---

### Big picture

Install {{site.prodnameWindows}} on your Kubernetes cluster in approximately 5 minutes.

### Concepts

{{site.prodnameWindows}} is a hybrid implementation that requires a Linux control node for {{site.prodname}} components and Windows nodes for Windows pods.

### Before you begin

Review the [Linux requirements]({{site.baseurl}}/getting-started/kubernetes/requirements) and the [{{site.prodnameWindows}} requirements]({{site.baseurl}}/getting-started/windows-calico/kubernetes/requirements).

Before beginning the quickstart, setup a {{site.prodname}} cluster on Linux nodes and provision Windows machines.

### How to

- [Configure strict affinity for clusters using {{site.prodname}} networking](#configure-strict-affinity-for-clusters-using-calico-enterprise-networking)
- [Install {{site.prodnameWindows}} for Windows](#install-calico-enterprise-for-windows)
- [Configure installation parameters](#configure-installation-parameters)

#### Configure strict affinity for clusters using {{site.prodname}} networking

For Linux control nodes using {{site.prodname}} networking, strict affinity must be set to `true`.
This is required to prevent Linux nodes from borrowing IP addresses from Windows nodes:

```bash
calicoctl ipam configure --strictaffinity=true
```

#### Install {{site.prodnameWindows}}

The following steps install a Kubernetes cluster on a single Windows node, with a [minimum]({{site.baseurl}}/getting-started/kubernetes/requirements#node-requirements) of 4 Linux worker nodes.

- **Kubernetes VXLAN**

  The geeky details of what you get by default:
  {% include geek-details.html details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:VXLAN,Routing:Calico,Datastore:Kubernetes' %}

- **Kubernetes BGP**

  The geeky details of what you get by default:
  {% include geek-details.html details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:No,Routing:BGP,Datastore:Kubernetes' %}

- **EKS**

  The geeky details of what you get by default:
  {% include geek-details.html details='Policy:Calico,IPAM:AWS,CNI:AWS,Overlay:No,Routing:VPC Native,Datastore:Kubernetes' %}


{% tabs %}
  <label:Kubernetes VXLAN,active:true>
  <%

1. Setup a {{site.prodname}} Kubernetes cluster with {% include open-new-window.html text='Windows nodes' url='https://docs.microsoft.com/en-us/virtualization/windowscontainers/kubernetes/getting-started-kubernetes-windows' %}.

1. Ensure that BGP is disabled since you're using VXLAN.
   If you installed Calico using operator, you can do this by:

   ```bash
   kubectl patch installation default --type=merge -p '{"spec": {"calicoNetwork": {"bgp": "Disabled"}}}'
   ```
1. Prepare the directory for Kubernetes files on Windows node.

   ```powershell
   mkdir c:\k
   ```

1. Copy the Kubernetes kubeconfig file from the master node (default, Location $HOME/.kube/config), to **c:\k\config**.

1. Copy the installation zip file  to **c:\tigera-calico-windows.zip**.

1. Download the PowerShell script, **install-calico-windows.ps1**.

   ```powershell
   Invoke-WebRequest {{ "/scripts/install-calico-windows.ps1" | absolute_url }} -OutFile c:\install-calico-windows.ps1
   ```

1. Install {{site.prodnameWindows}} for your datastore using the default parameters or [customize installation parameters](#configure-installation-parameters).
   The PowerShell script downloads {% if site.prodnameWindows == "Calico Enterprise for Windows" %}the {{site.prodnameWindows}} release binary, {% endif %}Kubernetes binaries, Windows utilities files, configures {{site.prodnameWindows}}, and starts the Calico service.

   **Kubernetes datastore (default)**

   ```powershell
   c:\install-calico-windows.ps1 -KubeVersion <your Kubernetes version (e.g. 1.18.6)> `
                                 -ServiceCidr <your service cidr (default 10.96.0.0/12)> `
                                 -DNSServerIPs <your DNS service IP (default 10.96.0.10)>
   ```

   > **Note**: You do not need to pass a parameter if the default value of the parameter is correct for your cluster.
   {: .alert .alert-info}

   > **Note**: If your Windows nodes have multiple network adapters, you can configure the one used for VXLAN by editing `VXLAN_ADAPTER` in `{{site.rootDirWindows}}\config.ps1`, then restarting {{site.prodnameWindows}}.
   {: .alert .alert-info}

1. Verify that the {{site.prodname}} services are running.

   ```powershell
   Get-Service -Name CalicoNode
   Get-Service -Name CalicoFelix
   ```

1. Install and start kubelet/kube-proxy service. Execute following PowerShell script/commands.

   ```powershell
   {{site.rootDirWindows}}\kubernetes\install-kube-services.ps1
   Start-Service -Name kubelet
   Start-Service -Name kube-proxy
   ```
1. Verify kubelet/kube-proxy services are running.

   ```powershell
   Get-Service -Name kubelet
   Get-Service -Name kube-proxy
   ```

%>

  <label:Kubernetes BGP>
  <%

1. Enable BGP service on Windows node (instead of VXLAN).
   Install the RemoteAccess service using the following Powershell commands:
   
   ```powershell
   Install-WindowsFeature RemoteAccess
   Install-WindowsFeature RSAT-RemoteAccess-PowerShell
   Install-WindowsFeature Routing
   ```
   
   Then restart the computer:
   
   ```powershell
   Restart-Computer -Force
   ```

   before running:

   ```powershell
   Install-RemoteAccess -VpnType RoutingOnly
   ```
   Sometimes the remote access service fails to start automatically after install. To make sure it is running, execute the following command:

   ```powershell
   Start-Service RemoteAccess
   ```

1. Prepare the directory for Kubernetes files on Windows node.

   ```powershell
   mkdir c:\k
   ```

1. Copy the Kubernetes kubeconfig file from the master node (default, Location $HOME/.kube/config), to **c:\k\config**.

1. Download the PowerShell script, **install-calico-windows.ps1**.

   ```powershell
   Invoke-WebRequest {{ "/scripts/install-calico-windows.ps1" | absolute_url }} -OutFile c:\install-calico-windows.ps1
   ```

1. Install {{site.prodnameWindows}} for your datastore using the default parameters or [customize installation parameters](#configure-installation-parameters).
   The PowerShell script downloads {% if site.prodnameWindows == "Calico Enterprise for Windows" %}the {{site.prodnameWindows}} release binary, {% endif %}Kubernetes binaries, Windows utilities files, configures {{site.prodnameWindows}}, and starts the Calico service.

   You do not need to pass a parameter if the default value of the parameter is correct for your cluster.

   **Kubernetes datastore**

   ```powershell
   c:\install-calico-windows.ps1 -KubeVersion <your Kubernetes version (e.g. 1.18.6)> `
                                 -ServiceCidr <your service cidr (default 10.96.0.0/12)> `
                                 -DNSServerIPs <your DNS service IP (default 10.96.0.10)>
   ```

   > **Note**: You do not need to pass a parameter if the default value of the parameter is correct for your cluster.
   {: .alert .alert-info}


1. Verify that the {{site.prodname}} services are running.

   ```powershell
   Get-Service -Name CalicoNode
   Get-Service -Name CalicoFelix
   ```

1. Install and start kubelet/kube-proxy service. Execute following PowerShell script/commands.

   ```powershell
   {{site.rootDirWindows}}\kubernetes\install-kube-services.ps1
   Start-Service -Name kubelet
   Start-Service -Name kube-proxy
   ```
1. Verify kubelet/kube-proxy services are running.

   ```powershell
   Get-Service -Name kubelet
   Get-Service -Name kube-proxy
   ```

%>

  <label:EKS>
  <%
1. Ensure that a Windows instance role has permissions to get `namespaces` and to get `secrets` in the calico-system namespace (or kube-system namespace if you are using a non operator-managed {{site.prodname}} installation.)
   One way to do this is by running the following comands to install the required permissions temporarily. Before running the commands, replace `<eks_node_name>` with the Kubernetes node name of the EKS Windows node, for example `ip-192-168-42-34.us-west-2.compute.internal`.
   > **Note**: If you are using a non operator-managed {{site.prodname}} installation, replace the namespace `calico-system` with `kube-system` in the commands below.
   {: .alert .alert-info}
   ```bash
   kubectl create clusterrole calico-install-ns --verb=get --resource=namespace
   kubectl create clusterrolebinding calico-install-ns --clusterrole=calico-install-ns --user=system:node:<eks_node_name>
   kubectl create role calico-install-token --verb=get,list --resource=secrets --namespace calico-system
   kubectl create rolebinding calico-install-token --role=calico-install-token --user=system:node:<eks_node_name> --namespace calico-system
   ```
  
1. Prepare the directory for Kubernetes files on the Windows node.

   ```powershell
   mkdir c:\k
   ```

1. [Install kubectl](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html#windows){:target="_blank"} and move the kubectl binary to **c:\k**.

1. Download the PowerShell script, **install-calico-windows.ps1**.

   ```powershell
   Invoke-WebRequest {{site.url}}/scripts/install-calico-windows.ps1 -OutFile c:\install-calico-windows.ps1
   ```

1. Install {{site.prodnameWindows}} for your datastore using the default parameters or [customize installation parameters](#configure-installation-parameters).
   The PowerShell script downloads {% if site.prodnameWindows == "Calico Enterprise for Windows" %}the {{site.prodnameWindows}} release binary, {% endif %}Kubernetes binaries, Windows utilities files, configures {{site.prodnameWindows}}, and starts the Calico service.
   
   You do not need to pass a parameter if the default value of the parameter is correct for your cluster.

   **Kubernetes datastore (default)**

   ```powershell
   c:\install-calico-windows.ps1 -ServiceCidr <your service cidr (default 10.96.0.0/12)> `
                                 -DNSServerIPs <your DNS service IP (default 10.96.0.10)>
   ```

   > **Note**: You do not need to pass a parameter if the default value of the parameter is correct for your cluster.
   {: .alert .alert-info}


1. Verify that the {{site.prodname}} services are running.

   ```powershell
   Get-Service -Name CalicoNode
   Get-Service -Name CalicoFelix
   ```

1. Verify kubelet and kube-proxy services are running.

   ```powershell
   Get-Service -Name kubelet
   Get-Service -Name kube-proxy
   ```
   
1. If you installed temporary RBAC in the first step, remove the permissions by running the following commands.
   > **Note**: If you are using a non operator-managed {{site.prodname}} installation, replace the namespace `calico-system` with `kube-system` in the commands below.
   {: .alert .alert-info}
   ```bash
   kubectl delete clusterrolebinding calico-install-ns
   kubectl delete clusterrole calico-install-ns
   kubectl delete rolebinding calico-install-token --namespace calico-system
   kubectl delete role calico-install-token --namespace calico-system
   ```
%>

{% endtabs %}

#### Configure installation parameters

| **Parameter Name** | **Description**                                           | **Default** |
| ------------------ | --------------------------------------------------------- |-------------|
| KubeVersion        | Version of Kubernetes binaries to use. If the value is an empty string (default), the {{site.prodnameWindows}} installation script does not download Kubernetes binaries and run Kubernetes service. Use the default for managed public cloud. | "" |
| DownloadOnly       | Download without installing {{site.prodnameWindows}}. Set to `yes` to manually install and configure {{site.prodnameWindows}}. For example, {{site.prodnameWindows}} the hard way. | no |
| Datastore          | {{site.prodnameWindows}} datastore type [`kubernetes`] for reading endpoints and policy information. | kubernetes |
| ServiceCidr        | Service IP range of the Kubernetes cluster. Not required for most managed Kubernetes clusters. Note: EKS has non-default value. | 10.96.0.0/12 |
| DNSServerIPs       | Comma-delimited list of DNS service IPs used by Windows pod. Not required for most managed Kubernetes clusters. Note: EKS has a non-default value. | 10.96.0.10 |
| CalicoBackend      | Calico backend network type (`vxlan` or `bgp`). If the value is an empty string (default), backend network type is auto detected. | "" |

Congratulations! You now have a Kubernetes cluster with {{site.prodnameWindows}} and a Linux control node.

### Next steps

You can now use the {{site.prodname}} Linux-based docs site for your documentation. Before you continue, review the [Limitations and known issues]({{site.baseurl}}/getting-started/windows-calico/limitations) to understand the features (and sections of documentation) that do not apply to Windows.
