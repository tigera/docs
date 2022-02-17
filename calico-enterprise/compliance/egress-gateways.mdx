---
title: Secure egress gateways
description: Enable Egress Gateways with Zero-trust policies adopted.
canonical_url: '/compliance/egress-gateways'
---


# Introduction

As a security requirment, all traffic leaving your cluster must flow through a set of dedicated, external nodes. Separated from the rest of the nodes that are running applications, these nodes can serve a policy-enforcement function on the egress traffic and can enable thorough monitoring than other nodes.


# The Setup

Consider the following setup:

<div class="mermaid">
graph LR;
    AR[pod/app-red];
    ER[deployment/egress-gateway];
    GW[external gateway];
    AR --> ER;
    ER --> GW;
    GW --> O([outbound]);
</div>

## Enable Egress Gateways

First, our cluster needs to have the feature enabled:

```
# enable egress gateways
kubectl patch felixconfiguration.p default --type='merge' -p '{"spec":{"egressIPSupport":"EnabledPerNamespace"}}'
# enable policy sync
kubectl patch felixconfiguration.p default --type='merge' -p \
    '{"spec":{"policySyncPathPrefix":"/var/run/nodeagent"}}'
```

## BGP setup

```
calicoctl apply -f - <<EOF
apiVersion: projectcalico.org/v3
kind: BGPConfiguration
metadata:
  name: default
spec:
  nodeToNodeMeshEnabled: true
  asNumber: 63400
EOF
```

Our external node / gateway must have `bird` installed and configured. For example, while `ssh`'d into your external node:

1. `bird` installation:

```
sudo apt-get install -y bird
```

2. Example `/etc/bird/bird.conf` contents:
```
router id __EXTERNAL_NODE_PRIVATE_IP__;

protocol kernel {
        scan time 60;
        import none;
        export all;
}

protocol device {
        scan time 60;
}

protocol direct {
  debug all;
  interface -"cali*", -"kube-ipvs*", "*";
}

# don't use the name master, turns out it's reserved!
protocol bgp master0 {
  description "master0";
  local as 63400;
  neighbor __MASTER_NODE_PRIVATE_IP__ as 63400;
}

protocol bgp infra {
  description "infra";
  local as 63400;
  neighbor __INFRA_NODE_PRIVATE_IP__ as 63400;
}

protocol bgp node0 {
  description "node0";
  local as 63400;
  neighbor __NODE_0_PRIVATE_IP__ as 63400; 
}

protocol bgp node1 {
  description "node1";
  local as 63400;
  neighbor __NODE_1_PRIVATE_IP__ as 63400;
}

protocol bgp node2 {
  description "node2";
  local as 63400;
  neighbor __NODE_2_PRIVATE_IP__ as 63400;
}
EOF
```

3. Check `bird` status:

```
sudo birdc show route
```

## Deploy Egress Gateway Client pods

We create an egress-gateway client pods deployment, named `egress-gateway`. For now, let's create this deployment in the `default` namespace.

1. Copy over pull secret to the default namespace:
```
kubectl get secret tigera-pull-secret --namespace=calico-system -o yaml | \
   grep -v '^[[:space:]]*namespace:[[:space:]]*calico-system' | \
   kubectl apply --namespace=default -f -
```

2. Create IP Pool for egress gateway client pods: 

```
kubectl apply -f - <<EOF
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: egress-ippool
spec:
  cidr: 10.10.10.0/31
  blockSize: 31
  nodeSelector: "!all()"
EOF
```

2. Create deployment for egress gateways client pods:
```
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: egress-gateway
  namespace: default
  labels:
    egress-code: red
spec:
  replicas: 1
  selector:
    matchLabels:
      egress-code: red
  template:
    metadata:
      annotations:
        cni.projectcalico.org/ipv4pools: "[\"10.10.10.0/31\"]"
      labels:
        egress-code: red
    spec:
      imagePullSecrets:
      - name: tigera-pull-secret
      nodeSelector:
        kubernetes.io/os: linux
      containers:
      - name: egress-gateway
        image: gcr.io/unique-caldron-775/cnx/tigera/egress-gateway:master
        env:
        - name: EGRESS_POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        securityContext:
          privileged: true
        volumeMounts:
        - mountPath: /var/run
          name: policysync
      terminationGracePeriodSeconds: 0
      volumes:
      - flexVolume:
          driver: nodeagent/uds
        name: policysync
EOF
```

3. Assign a namespace that can use the egress-gateway pods we just created:

```
kubectl apply -f - <<EOF
apiVersion: v1
kind: Namespace
metadata:
  name: ns-red
  annotations:
    egress.projectcalico.org/selector: 'egress-code == "red"'
    egress.projectcalico.org/namespaceSelector: 'projectcalico.org/name == "default"'
EOF
```

## Deploy example application pods


1. Create an IPPool for our application pods

```
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  namespace: ns-red
  name: multitool-test
spec:
  nodeName: __NODE_NAME__
  containers:
  - name: multitool
    image: praqma/network-multitool
EOF
```


## Adopt zero-trust security:

At the bare minimum, we must have a global default-deny:

```
kubectl apply -f - << EOF
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: default-deny-policy
spec:
  namespaceSelector: has(projectcalico.org/name) && projectcalico.org/name not in {"kube-system", "calico-system"}
  types:
  - Ingress
  - Egress
  egress:
  - action: Allow
    destination:
      ports:
      - 53
      selector: k8s-app == "kube-dns"
    protocol: UDP
    source: {}
EOF
```

## Testing

1. Allowed Traffic to Gateway

    Since v3.12, by default, egress-gateway client pods are allowed traffic to the external egress gateway node. However, we still need to be explicit about the traffic we're interested in allowing or denying before traffic makes it through the vxlan link:

  ```
kubectl apply -f - << EOF
apiVersion: projectcalico.org/v3
kind: NetworkPolicy
metadata:
  name: allow-client-server
  namespace: ns-red
spec:
  types:
  - Ingress
  - Egress
  egress:
  - action: Allow
    protocol: TCP
    destination:
      ports:
      - 8089
    source: {}
EOF
```

    Start a corresponding test server on external node:

    ```
    netcat -n -v -l -k -p 8089
    ```

    Start TCP Dump on the external node:

    ```
    sudo tcpdump -n -i ens5 tcp
    ```
    Note: `ens5` could also be `eth0`

    Generate traffic from an application node:

    ```
    kubectl apply -f - <<EOF
    apiVersion: v1
        kind: Pod
    metadata:
        namespace: ns-red
        name: multitool-test
    spec:
        nodeName: __NODE_NAME__
        containers:
        - name: multitool
          image: praqma/network-multitool
    EOF
    ```

    ```
    kubectl -n ns-red exec -it multitool-test -- nc __EXTERNAL_NODE_PRIVATE_IP__ 8089
    hi
    mom
    ``` 

    Verify that the traffic in tcpdump shows the source IP address of the egress-gateway pod(s)!


# Further

  Egress Gateways and their related Calico Network Policies are only limited to traffic within your cluster that are about to egress to your external node(s). For more information on running Calico (and its features) please read [Calicon on Bare Metal]({{ site.baseurl }}/getting-started/bare-metal/)