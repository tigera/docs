---
title: Azure
description: Support for Calico Enterprise in Azure.
canonical_url: '/reference/public-cloud/azure'
show_read_time: false
show_toc: false
---

## About {{site.prodname}} on Azure

You can use {{site.prodname}} policy with one of the following networking options.

- **Azure user-defined routes**: This option provides networking without overlays.
  Disable {{site.prodname}} networking by setting `CALICO_NETWORKING_BACKEND` to `none`
  in `{{site.nodecontainer}}`. (Also called "policy-only mode".) Refer to
  [Configuring {{site.nodecontainer}}](../node/configuration) and [Azure user-defined routes](#azure-user-defined-routes) for more information. 

- **Calico VXLAN**: Install {{site.prodname}} using VXLAN encapsulation for pod traffic.
  
- **Azure CNI IPAM plug-in**: Configure {{site.prodname}} to use the
  [Azure CNI plug-in](https://github.com/Azure/azure-container-networking/blob/master/docs/cni.md){:target="_blank"}
  instead of the {{site.prodname}} CNI plug-in.

## Azure user-defined routes

To configure Azure user-defined routes (UDR):

- Create an [Azure route table][AzureUDRCreate]{:target="_blank"} and
  associatе it with the VMs subnet.

- Enable [IP forwarding enabled][AzureIPForward]{:target="_blank"} in your
  VM network interfaces.

On Kubernetes, also complete the following.

- Ensure that the selected pod's subnet is a part of your Azure virtual
  network IP range.

- Include the name of your routing table in the configuration file of your
  Kubernetes Azure cloud provider.

## Does Azure support {{site.prodname}} networking?

Calico in VXLAN mode is supported on Azure. However, IPIP packets are blocked by the Azure network fabric.

[AzureIPForward]: https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-network-interface#enable-or-disable-ip-forwarding
[AzureUDR]: https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview#user-defined
[AzureUDRCreate]: https://docs.microsoft.com/en-us/azure/virtual-network/create-user-defined-route-portal
