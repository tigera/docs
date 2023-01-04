---
title: Calico Enterprise for Kubernetes demo
description: Learn the extra features for Calico Enterprise that make it so important for production environments.
canonical_url: /security/simple-policy-cnx
---

This guide is a variation of the [simple policy demo]({{site.baseurl}}/security/tutorials/kubernetes-policy-basic) intended to introduce the extra features of {{site.prodname}} to people already familiar with Project Calico for Kubernetes.

It requires a Kubernetes cluster configured with Calico networking and {{site.prodname}}, and expects that you have `kubectl` configured to interact with the cluster.

You can quickly and easily obtain such a cluster by following one of the
[installation guides]({{site.baseurl}}/getting-started/kubernetes/),
or by [upgrading an existing cluster]({{site.baseurl}}/maintenance/upgrade-to-tsee).

The key steps in moving to {{site.prodname}} are to change to the {{site.prodname}} version of calico-node, update its configuration, download [calicoq]({{site.baseurl}}/reference/calicoq) and deploy Prometheus.

This guide assumes that you have installed all the {{site.prodname}} components from the
guides above and that your cluster consists of the following nodes:
  * k8s-node1
  * k8s-node2
  * k8s-master

Where you see references to these in the text below, substitute for your actual node names. You can find what nodes are on your cluster with `kubectl get nodes`

### Configure Namespaces

This guide will deploy pods in a Kubernetes namespace.  Let's create the `Namespace` object for this guide.

```
kubectl create ns policy-demo
```

### Create demo pods

We'll use Kubernetes `Deployment` objects to easily create pods in the namespace.

1. Create some nginx pods in the `policy-demo` namespace.

   ```shell
   kubectl create deployment --namespace=policy-demo nginx --image=nginx
   ```

1. Expose them through a service.

   ```shell
   kubectl expose --namespace=policy-demo deployment nginx --port=80
   ```

1. Ensure the nginx service is accessible.

   ```shell
   kubectl run --namespace=policy-demo access --rm -ti --image busybox /bin/sh
   ```

   This should open up a shell session inside the `access` pod, as shown below.

   ```
   Waiting for pod policy-demo/access-472357175-y0m47 to be running, status is Pending, pod ready: false

   If you don't see a command prompt, try pressing enter.

   / #
   ```
   {: .no-select-button}

1. From inside the `access` pod, attempt to reach the `nginx` service.

   ```shell
   wget -q nginx -O -
   ```

   You should see a response from `nginx`.  Great! Our service is accessible.  You can exit the pod now.

1. Inspect the network policies using calicoq.  The `host` command displays
information about the policies for endpoints on a given host.

   > **Note**: calicoq complements calicoctl by inspecting the
   > dynamic aspects of {{site.prodname}} Policy: in particular displaying the endpoints actually affected by policies,
   > and the policies that actually apply to endpoints.
   >
   > The full calicoq documentation is [here]({{site.baseurl}}/reference/calicoq).
   {: .alert .alert-info}

   ```
   DATASTORE_TYPE=kubernetes calicoq host k8s-node1
   ```

   You should see the following output.

   ```
   Policies and profiles for each endpoint on host "k8s-node1":

   Workload endpoint k8s/tigera-prometheus.alertmanager-calico-node-alertmanager-0/eth0
     Policies:
       Policy "tigera-prometheus/knp.default.calico-node-alertmanager" (order 1000; selector "(projectcalico.org/orchestrator == 'k8s' && alertmanager == 'calico-node-alertmanager' && app == 'alertmanager') && projectcalico.org/namespace == 'tigera-prometheus'")
       Policy "tigera-prometheus/knp.default.calico-node-alertmanager-mesh" (order 1000; selector "(projectcalico.org/orchestrator == 'k8s' && alertmanager == 'calico-node-alertmanager' && app == 'alertmanager') && projectcalico.org/namespace == 'tigera-prometheus'")
       Policy "tigera-prometheus/knp.default.default-deny" (order 1000; selector "(projectcalico.org/orchestrator == 'k8s') && projectcalico.org/namespace == 'tigera-prometheus'")
     Profiles:
       Profile "kns.tigera-prometheus"
     Rule matches:
       Policy "tigera-prometheus/knp.default.calico-node-alertmanager-mesh" inbound rule 1 source match; selector "(projectcalico.org/namespace == 'tigera-prometheus') && (projectcalico.org/orchestrator == 'k8s' && app in { 'alertmanager' } && alertmanager in { 'calico-node-alertmanager' })"

   ...

   Workload endpoint k8s/policy-demo.nginx-8586cf59-5bxvh/eth0
     Policies:
     Profiles:
       Profile "kns.policy-demo"
   ```
   {: .no-select-button}

   For each workload endpoint, the `Policies:` section lists the policies that
   apply to that endpoint, in the order they apply.  calicoq displays both
   {{site.prodname}} Policies and Kubernetes NetworkPolicies, although this
   example focuses on the latter.  The `Rule matches:` section lists the
   policies that match that endpoint in their rules, in other words that have
   rules that deny or allow that endpoint as a packet source or destination.

   Focusing on the
   `k8s/tigera-prometheus.alertmanager-calico-node-alertmanager-0/eth0` endpoint:

   - The first two policies are defined in the monitor-calico.yaml manifest.
     The selectors here have been translated from the original NetworkPolicies to
     the {{site.prodname}} format (note the addition of the namespace test).

   - The third policy and the following profile are created automatically by the
     policy controller.

1. Use kubectl to see the detail of any particular policy or profile.  For
   example, for the `kns.policy-demo` profile, which defines default behavior for
   pods in the `policy-demo` namespace:

   ```shell
   kubectl get profile kns.policy-demo -o yaml
   ```

   You should see the following output.

   ```yaml
    apiVersion: projectcalico.org/v3
    kind: Profile
    metadata:
      creationTimestamp: "2022-01-06T21:32:05Z"
      name: kns.policy-demo
      resourceVersion: 435026/
      uid: 75dd2ed4-d3a6-41ca-a106-db073bfa946a
    spec:
      egress:
      - action: Allow
        destination: {}
        source: {}
      ingress:
      - action: Allow
        destination: {}
        source: {}
      labelsToApply:
        pcns.projectcalico.org/name: policy-demo
   ```
   {: .no-select-button}

   Alternatively, you may also use {{site.prodname}} Manager to inspect and view information and metrics associated with policies, endpoints, and nodes.

### Enable isolation

Let's turn on isolation in our policy-demo namespace. {{site.prodname}} will then prevent connections to pods in this namespace.

Running the following command creates a NetworkPolicy which implements a default deny behavior for all pods in the `policy-demo` namespace.

```shell
kubectl create -f - <<EOF
kind: NetworkPolicy
apiVersion: networking.k8s.io/v1
metadata:
  name: default-deny
  namespace: policy-demo
spec:
  podSelector:
    matchLabels: {}
EOF
```

#### Test Isolation

This will prevent all access to the nginx service.  We can see the effect by trying to access the service again.

1. Start another pod within the `policy-demo` namespace.

   ```shell
   kubectl run --namespace=policy-demo access --rm -ti --image busybox /bin/sh
   ```

   This should open up a shell session inside the `access` pod, as shown below.

   ```
   If you don't see a command prompt, try pressing enter.

   / #
   ```
   {: .no-select-button}

1. From inside the `access` pod, attempt to connect to the nginx service.

   ```
   wget -q --timeout=5 nginx -O -
   ```

   You should see the following output.

   ```
   wget: download timed out
   ```
   {: .no-select-button}

   The request should time out after 5 seconds.  By enabling isolation on the namespace, we've prevented access to the service.

### {{site.prodname}} Metrics

Now would be a great time to take a look at the metrics.

In {{site.prodname}} Manager, head to the dashboard view. You will see graphs associated with allowed packets/bytes and denied packets/bytes. The graphs represent the rates at which packets/bytes are being allowed or denied and are time windowed.

Now if we wanted to dig in further and find out what's causing the packets to be denied, we could take a look at the **Packets by Policy** bar graph. Each individual bar represents a policy that has either denied or allowed a packet. Also, the policies shown by the graph, just like the rest of the dashboard graphs, are time-windowed i.e. they will reflect only the ones that were recently exercised.

> **Note**: The `NetworkPolicy` spec for [`default-deny`](#enable-isolation) does not come configured
> with any rules. This policy results in a 'default deny' because of how it is [evaluated]({{site.baseurl}}/reference/resources/tier#how-policy-is-evaluated). A packet will be dropped if the policies (like default-deny in this case) affecting the
> endpoint takes no action.
>
> You can review the metrics associated with such behavior in the **Implict Drops** block.
> To view it, go to the policy page and enable **Implicit Drops** from the **Eye** (next to **Add New Tier** button) dropdown.
{: .alert .alert-info}

### Allow Access using a NetworkPolicy

Now, let's enable access to the nginx service using a NetworkPolicy.  This will allow incoming connections from our `access` pod, but not
from anywhere else.

1. Create a network policy `access-nginx` with the following contents:

   ```shell
   kubectl create -f - <<EOF
   kind: NetworkPolicy
   apiVersion: networking.k8s.io/v1
   metadata:
     name: access-nginx
     namespace: policy-demo
   spec:
     podSelector:
       matchLabels:
         app: nginx
     ingress:
       - from:
         - podSelector:
             matchLabels:
               run: access
   EOF
   ```

   > **Note**: The NetworkPolicy allows traffic from pods with the label `run: access`
   > to pods with the label `app: nginx`.  These are the labels automatically added to
   > pods started via `kubectl run` based on the name of the `Deployment`.
   {: .alert .alert-info}

1. We should now be able to access the service from the `access` pod.

   ```shell
   kubectl run --namespace=policy-demo access --rm -ti --image busybox /bin/sh
   ```

   This should open up a shell session inside the `access` pod, as shown below.

   ```
   If you don't see a command prompt, try pressing enter.

   / #
   ```
   {: .no-select-button}

1. From inside the busybox pod, attempt to access the service again.

   ```
   wget -q --timeout=5 nginx -O -
   ```

   You should see an HTTP response.

1. Return to the **Dashboard** page and review the **Packets by Policy** bar graph to confirm that `access-nginx` causes the packets to be accepted. Other inspection workflows/options include: filtering through the information presented in policies, endpoints and nodes pages.

1. To set a stream of allowed packets run the following command.

   ```shell
   for i in `seq 1 10000`; do (wget -q --timeout=1 nginx -O - & sleep 0.01); done
   ```

1. Coming back, however, we still cannot access the service from a pod without the label `run: access`:

   ```shell
   kubectl run --namespace=policy-demo cant-access --rm -ti --image busybox /bin/sh
   ```

   This should open up a shell session inside the `cant-access` pod, as shown below.

   ```
   If you don't see a command prompt, try pressing enter.

   / #
   ```
   {: .no-select-button}

1. From inside the `cant-access` pod, attempt to access the service again.

   ```shell
   wget -q --timeout=5 nginx -O -
   ```

   After 5 seconds, you should see the following output.

   ```
   wget: download timed out
   ```
   {: .no-select-button}

1. You can clean up the demo by deleting the demo namespace.

   ```shell
   kubectl delete ns policy-demo
   ```

   This was just a simple example of the Kubernetes NetworkPolicy API and how {{site.prodname}} can secure your Kubernetes cluster.  For more
   information on network policy in Kubernetes, see the [Kubernetes user guide](http://kubernetes.io/docs/user-guide/networkpolicies/){:target="_blank"}.
