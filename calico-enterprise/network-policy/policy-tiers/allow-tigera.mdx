---
title: Change allow-tigera tier behavior
description: Understand the purpose of the allow-tigera tier and how to change its behavior.
canonical_url: '/security/allow-tigera'
---

### Big picture
Change traffic behavior of the tier that secures {{site.prodname}} components.

### Value 
Although the tier that secures {{site.prodname}} components cannot be changed, you can create policies in adjacent tiers to change its behavior.

### Concepts
{{site.prodname}} automatically creates the `allow-tigera` tier during installation with network policies that select traffic to and from Tigera components. These policies ensure that traffic required for {{site.prodname}} operation is allowed, and that any unnecessary traffic involving Tigera components is denied. This tier prevents disruption of {{site.prodname}} functionality in case of network policy misconfiguration impacting Tigera components, and denies unexpected traffic in case of defect or compromise.

#### Ownership and management of allow-tigera
Tigera defines the `allow-tigera` tier and manages the policies within it. The Tigera Operator installs and monitors these policies, ensuring they always match the state defined by Tigera. Management by the Operator also ensures integrity for upgrades.

> **Note**: The `allow-tigera` tier and its policies should not be edited, and the tier should not be moved. However, if you inadvertently make changes they are automatically reverted by the Operator to ensure your cluster is always protected.
{: .alert .alert-info}

### Tutorial
#### Change behavior of allow-tigera
If you want to change the way traffic is enforced by the `allow-tigera` tier, you must create policy in an adjacent tier to meet your needs. For example, if a policy in the `allow-tigera` tier allows or denies traffic, and you want to change how that traffic is enforced, you can create a policy in a tier before `allow-tigera` that selects the same traffic to make your desired changes. Similarly, if a policy in the `allow-tigera` tier passes or does not select traffic that you want to enforce, you can create a policy in a tier after `allow-tigera` to select this traffic to meet the desired behavior.

#### Example: use preceding tier to tighten security
Let's say an `allow-tigera` policy allows ingress traffic from a {{site.prodname}} component that you do not use, and you want to tighten enforcement to not allow this traffic.

Within a tier that comes before `allow-tigera`, you can create a policy that selects the same endpoint and contains ingress rules that deny traffic from that component and pass to `allow-tigera` for traffic from other components.

```yaml
# allow-tigera.es-gateway-access allows ingress from deep packet inspection, a feature not utilized for the purpose of this example.
# This policy tightens the scope of allowed ingress to es-gateway without modifying the allow-tigera policy directly.

apiVersion: projectcalico.org/v3
kind: NetworkPolicy
metadata:
  name: preceding-tier.es-gateway-access
  namespace: tigera-elasticsearch
spec:
  # Place in a tier prior to allow-tigera.
  tier: preceding-tier
  
  # Select the same endpoint as the original policy.
  selector: k8s-app == 'tigera-secure-es-gateway'
  ingress:
    # Select the same component ingress.
    - source:
        selector: k8s-app == 'tigera-dpi'
        namespaceSelector: name == 'tigera-dpi'
      # Enact different behavior (originally: Allow)
      action: Deny
      
    # Defer to allow-tigera for other ingress/egress decisions for this endpoint.
    - action: Pass
```

This example shows how you can change the impact of the `allow-tigera` tier on traffic without modifying the tier itself. This makes your changes more maintainable, and allows the allow-tigera tier to continue to receive updates as {{site.prodname}} evolves without you needing to reconcile your changes each release.

For help to manage or change the behavior of the `allow-tigera` tier, contact Tigera Support.
