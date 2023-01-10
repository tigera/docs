---
title: Staged Kubernetes Network policy
description: API for this Calico Enterprise resource. 
---

A staged kubernetes network policy resource (`StagedKubernetesNetworkPolicy`) represents a staged version
of [Kubernetes network policy](https://kubernetes.io/docs/concepts/services-networking/network-policies){:target="_blank"}.
This is used to preview network behavior before actually enforcing the network policy. Once persisted, this
will create a Kubernetes network policy backed by a {{site.prodname}}
[network policy]({{site.baseurl}}/reference/resources/networkpolicy).

For `kubectl` [commands](https://kubernetes.io/docs/reference/kubectl/overview/){:target="_blank"}, the following case-insensitive aliases
may be used to specify the resource type on the CLI:
`stagedkubernetesnetworkpolicy.projectcalico.org`, `stagedkubernetesnetworkpolicies.projectcalico.org` and abbreviations such as
`stagedkubernetesnetworkpolicy.p` and `stagedkubernetesnetworkpolicies.p`.

### Sample YAML

Below is a sample policy created from the example policy from the
[Kubernetes NetworkPolicy documentation](https://kubernetes.io/docs/concepts/services-networking/network-policies/#the-networkpolicy-resource){:target="_blank"}.
The only difference between this policy and the example Kubernetes version is that the `apiVersion` and `kind` are changed
to properly specify a staged Kubernetes network policy.

```yaml
apiVersion: projectcalico.org/v3
kind: StagedKubernetesNetworkPolicy
metadata:
  name: test-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - ipBlock:
        cidr: 172.17.0.0/16
        except:
        - 172.17.1.0/24
    - namespaceSelector:
        matchLabels:
          project: myproject
    - podSelector:
        matchLabels:
          role: frontend
    ports:
    - protocol: TCP
      port: 6379
  egress:
  - to:
    - ipBlock:
        cidr: 10.0.0.0/24
    ports:
    - protocol: TCP
      port: 5978
```

### Definition
See the [Kubernetes NetworkPolicy documentation](https://v1-21.docs.kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#networkpolicyspec-v1-networking-k8s-io){:target="_blank"}
for more information.
