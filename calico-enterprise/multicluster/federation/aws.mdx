---
title: Federation example for an AWS cluster
description: A sample configuration of Calico Enterprise federated endpoint identity and federated services for an AWS cluster.
canonical_url: /multicluster/federation/aws
---

### Big picture

A sample configuration for federated endpoint identity and federated services using AWS clusters. 

### Tutorial

**Set up**

The cluster is installed on real hardware where node and pod IPs are routable, using an edge VPN router to peer with the AWS cluster.

![A diagram showing the key configuration requirements setting up an AWS cluster (using AWS VPN CNI) peering
with an on-premise cluster.](/images/federation/aws-rcc.svg)

**Calico Enterprise configuration**

- IP pool resource is configured for the on-premise IP assignment with IPIP is disabled
- BGP peering to the VPN router 
- A Remote Cluster Configuration resource references the AWS cluster
- Service discovery of the AWS cluster services uses the Calico Enterprise Federated Services Controller

**Notes**

- If VPN Router is configured as a route reflector for the on-premise cluster, you would:
  - Configure the default BGP Configuration resource to disable node-to-node mesh
  - Configure a global BGP Peer resource to peer with the VPN router
- If the IP Pool has `Outgoing NAT` enabled, then you must add an IP Pool covering the AWS cluster VPC with disabled set to `true`. When set to `true` the pool is not used for IP allocations, and SNAT is not performed for traffic to the AWS cluster.

**AWS configuration**

- A VPC CIDR is chosen that does not overlap with the on-premise IP ranges.
- There are 4 subnets within the VPC, split across two AZs (for availability) such that each AZ has a public and private subnet. In this particular example, the split of responsibility is:
  - The private subnet is used for node and pod IP allocation
  - The public subnet is used to home a NAT gateway for pod-to-internet traffic.
- The VPC is peered to an on-premise network using a VPN. This is configured as a VPN gateway for the AWS side, and a classic VPN for the customer side. BGP is used for route distribution.
- Routing table for private subnet has:
  - "propagate" set to "true" to ensure BGP-learned routes are distributed
  - Default route to the NAT gateway for public internet traffic
  - Local VPC traffic
- Routing table for public subnet has default route to the internet gateway.
- Security group for the worker nodes has:
  - Rule to allow traffic from the peered networks
  - Other rules required for settings up VPN peering (refer to the AWS docs for details).
  
To automatically create a Network Load Balancer (NLB) for the AWS deployment, we apply a service with the correct annotation. 

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
  name: nginx-external
spec:
  externalTrafficPolicy: Local
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: 80
  selector:
    run: nginx
  type: LoadBalancer
```
