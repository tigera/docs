---
title: Optimize egress networking for workloads with long-lived TCP connections
description: React to egress gateway maintenance windows and minimize the impact of egress gateway downtime on sensitive workloads
canonical_url: '/networking/egress/egress-gateway-maintenance'
---

### Big Picture
React to egress gateway maintenance windows and minimize the impact of egress gateway downtime on sensitive workloads

### Value
While most workloads benefit from the reduced downtime associated with increased replicas, there are some specific cases where increasing your number of egress gateways will not have as significant an effect on availability.

One area where this applies is when your workloads must maintain long-lived TCP connections that are coupled to higher-level abstractions, such as database sessions, transactions, or similar. In these environments, if an egress gateway becomes unavailable, these long-lived sessions may close. Data may need to be retransmitted. And in some cases, data may be lost.

### Features
In this how-to, we'll use a set of annotations which are automatically added to your workloads:
 - `egress.projectcalico.org/gatewayMaintenanceGatewayIP` notes the IP of a terminating egress gateway your pod is using.
 - `egress.projectcalico.org/gatewayMaintenanceStartedTimestamp` marks when an egress gateway pod started terminating.
 - `egress.projectcalico.org/gatewayMaintenanceFinishedTimestamp` marks when an egress gateway pod will finish terminating.

We will also explore how to minimize the impact of egress gateway maintenance on your workloads:
 - `egress.projectcalico.org/maxNextHops` specifies the maximum number of egress gateway replicas from the selected deployment that a pod should depend on.

Or, [jump to the quick-reference](#reference).

### Before you begin
These features require you to have configured a functioning egress gateway deployment in a cluster. For more information on deploying egress gateways, [see our other egress gateway guides]({{site.baseurl}}/networking/egress/)

### How to
 - [Observe gateway maintenance impact](#observe-gateway-maintenance-impact)
 - [Expose gateway maintenance annotations to your application](#expose-gateway-maintenance-annotations-to-your-application)
 - [Reduce the impact of gateway downtime](#reduce-the-impact-of-gateway-downtime)

#### Observe gateway maintenance impact
A number of egress-related annotations are automatically added to your workloads when an egress gateway they use is in the "terminating" phase. These annotations will outline *which* gateway is about to terminate, *when it began terminating*, and *when it will fully terminate*. This information can prove useful for conducting non-disruptive maintenance on your cluster, as it means any planned termination of egress pods will be communicated to dependent workloads.

Before we can observe these annotations, we must first configure a *termination grace period* for our egress gateways. The termination grace period prolongs an egress gateway's termination phase, giving us a window to react to the termination. Without configuring the grace period, we would have a zero-second window to react to gateway termination.

##### Add a termination grace period to egress gateway replicas
In order to widen our maintenance window, we must adjust the `terminationGracePeriodSeconds` field on our egress gateway pods. The amount of time we allot for the termination grace period will dictate how much time a dependent workload has to prepare for a gateway going down.

Let's add a termination grace period of 60 seconds to all pods in our egress gateway deploymment, so that our egress-dependent workloads have a wider window to react:

```sh
$ # patch a termination grace period of 60s into egress gateway deployment
$ kubectl get deploy
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
egress-gateway     2/2     2            2           16m

$ # patch our deployment with a 60-second termination grace period
$ kubectl patch deploy egress-gateway --type=merge -p '{"spec": {"template": {"spec": {"terminationGracePeriodSeconds": 60}}}}'
deployment.apps/egress-gateway patched

$ # wait for change to rollout
$ kubectl rollout status deploy/egress-gateway
```
> **Note**:
> - Making the above alterations to an egress gateway deployment will trigger a new rollout - you can monitor the rollout status with `kubectl rollout status deploy/<deployment name>`
> - If your rollout seems to have stalled and egress gateway pods are stuck on "ContainerCreating" phase, it's possible the deployment's IPPool has been exhausted. You can check if this is the case by inspecting a stuck pod with `kubectl describe pod <pod name>`
{: .alert .alert-info}

##### Inspect workload annotations
Once the updated egress gateway deployment rolls out, we're ready to observe the gateway maintenance annotations {{site.prodname}} adds to your dependent workloads. Let's simulate cluster maintenance by deleting an egress gateway pod. It should take 60 seconds to terminate - the amount of time defined by `terminationGracePeriodSeconds`.

```sh
$ # show pods in default namespace - two egress gateway pods and one application pod using them.
$ kubectl get pods -o wide

NAME                                      READY   STATUS              RESTARTS   AGE     IP
application-with-long-lived-connections   1/1     Running             0          20m    192.168.192.210
egress-gateway-6576ccdf66-fxdvh           1/1     Running             0          3m     10.10.10.1
egress-gateway-6644fbb56b-5xbh2           1/1     Running             0          3m     10.10.10.0 

$ # delete one of the egress gateways being used by the application pod - do not block waiting for termination to finish
$ kubectl delete pod egress-gateway-6576ccdf66-fxdvh --wait=false
pod "egress-gateway-6576ccdf66-fxdvh" deleted
```

The gateway we just deleted should now wait in the "terminating" phase until its termination grace period expires, at-which point it will be deleted. If our application pod depends on the terminating egress gateway, we'll see gateway maintenance annotations added to the dependent application pod automatically, outlining what gateway is going down, when it began terminating, and when it will be deleted:

```sh
$ # observe the annotations added to the dependent application pod
$ kubectl get pod application-with-long-lived-connections -o yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    ...
    egress.projectcalico.org/gatewayMaintenanceFinishedTimestamp: "2022-04-19T16:00:18Z"
    egress.projectcalico.org/gatewayMaintenanceGatewayIP: 10.10.10.1
    egress.projectcalico.org/gatewayMaintenanceStartedTimestamp: "2022-04-19T15:59:18Z"
...
```
Success! Our workload's annotations mark a 60-second maintenance window for the gateway we terminated, indicating when the egress gateway began terminating, and when it will fully terminate.

> **Note**:
>  - Adjusting egress deployments, say, by modifying the `terminationGracePeriodSeconds` field, will trigger a new rollout.
>  - Egress pods terminating due to a new rollout will behave the same as if they were deleted for maintenance - dependent workloads will receive gateway maintenance annotations, and gateway pods will terminate after their termination grace period has elapsed.
>  - Deleting an egress gateway in a way that overrides the termination grace period, say, by using `kubectl delete pod my-pod --grace-period=0`, will result in the gateway going down immediately, and dependent workloads will not have any time to react to the termination.
{: .alert .alert-info}

<br>

#### Expose gateway maintenance annotations to your application
While the presence of gateway maintenance annotations may be useful to a cluster administrator inspecting pods, it's not quite enough if our workload wishes to react to terminating egress gateways, say, by restarting its session gracefully before loss of connectivity.

The [Kubernetes downward API](https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#the-downward-api){:target="_blank"} provides a means of exposing pod information [as files](https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#store-pod-fields){:target="_blank"} or as [environment variables](https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/#use-pod-fields-as-values-for-environment-variables){:target="_blank"} within the pod. This value can then be polled by your workload, in order to react to changes as you see fit.

Let's write a simple pod manifest that uses the downward API to expose maintenance annotations to the program running within:

```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    egress.projectcalico.org/selector: egress-code == 'red'
    egress.projectcalico.org/namespaceSelector: projectcalico.org/name == 'default'
  name: poll-my-own-annotations
  namespace: default
spec:
  containers:
  - name: application-container
    image: k8s.gcr.io/busybox:1.24
    command: ["sh", "-c"]
    args:
      - while true; do
          echo 'polling egress maintenance timestamp...';
          if [[ -e /var/run/egress/gatewayMaintenanceStartedTimestamp ]]; then
            echo -n 'gatewayMaintenanceStartedTimestamp has value "'; cat /var/run/egress/gatewayMaintenanceStartedTimestamp; echo -en '"\n';
          fi;
          sleep 3;
        done;
    volumeMounts:
    - name: egress-maintenance-started
      mountPath: /var/run/egress
  volumes:
    - name: egress-maintenance-started
      downwardAPI:
        items:
          - path: "gatewayMaintenanceStartedTimestamp"
            fieldRef:
              fieldPath: metadata.annotations['egress.projectcalico.org/gatewayMaintenanceStartedTimestamp']
```

This sample manifest will create a pod whose `gatewayMaintenanceStartedTimestamp` annotation is mounted to the file `/var/run/egress/gatewayMaintenanceStartedTimestamp`. The pod's main process is a script which polls the value of this file.

After deleting an egress gateway this workload relies on, let's check its logs:

```sh
$ kubectl logs poll-my-own-annotations
polling egress maintenance timestamp...
gatewayMaintenanceStartedTimestamp has value ""
polling egress maintenance timestamp...
gatewayMaintenanceStartedTimestamp has value ""
polling egress maintenance timestamp...
gatewayMaintenanceStartedTimestamp has value ""
polling egress maintenance timestamp...
gatewayMaintenanceStartedTimestamp has value "2022-04-19T17:24:46Z"
polling egress maintenance timestamp...
gatewayMaintenanceStartedTimestamp has value "2022-04-19T17:24:46Z"
```
We can see above that our script saw the value of the mounted volume change at the same time what we terminated our egress gateway pod. This work can be further developed to propagate notifications to our production workloads, without any need for polling kubernetes itself.

**Note**: It's not recommended to couple your production applications to a Kubernetes client for the purposes of polling pod information, as it could give an attacker greater privileges if successful in compromising a workload. Instead, use a method such as the downward API that fully decouples the program.
{: .alert .alert-danger}

<br>

#### Reduce the impact of gateway downtime
So far we have observed egress gateway maintenance windows, added a termination grace period to gateway pods, and propagated maintenance information directly to our workloads. Finally, we are going to look at the `maxNextHops` annotation, which is designed to limit the impact of a terminating egress gateway.

Below is a sample kubernetes deployment which was adapted from the earlier annotation-aware pod manifest. The deployment has 3 replicas, and is configured to use egress gateways:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: annotation-aware-workloads
spec:
  replicas: 3
  selector:
    matchLabels:
      app: annotation-aware-workload
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:      
    metadata:
      labels:
        app: annotation-aware-workload
      annotations:
        egress.projectcalico.org/selector: egress-code == 'red'
        egress.projectcalico.org/namespaceSelector: projectcalico.org/name == 'default'
    spec:
      containers:
      - name: application-container
        image: k8s.gcr.io/busybox:1.24
        command: ["sh", "-c"]
        args:
        - while true; do
            echo "[${MY_POD_NAME}] polling egress maintenance timestamp...";
            if [[ -e /var/run/egress/gatewayMaintenanceStartedTimestamp ]]; then
              echo -n "[${MY_POD_NAME}] gatewayMaintenanceStartedTimestamp has value '"; cat /var/run/egress/gatewayMaintenanceStartedTimestamp; echo -en "'\n";
            fi;
            sleep 3;
          done;
        volumeMounts:
        - name: egress-maintenance-started
          mountPath: /var/run/egress
        env:
        - name: MY_POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
      volumes:
      - name: egress-maintenance-started
        downwardAPI:
          items:
            - path: "gatewayMaintenanceStartedTimestamp"
              fieldRef:
                fieldPath: metadata.annotations['egress.projectcalico.org/gatewayMaintenanceStartedTimestamp']
```

##### Observing the impact of egress gateway maintenance
We now want to conduct maintenance on a particular node in our cluster, resulting in one of our egress gateways terminating. In this scenario, since our dependent applications' connections are load-balanced evenly across all available egress gateways, all of our application pods will receive a maintenance window annotation. If we have configured our applications to react to such a window, we will see them all react at once in a thundering herd:

```sh
$ # begin the termination of an egress gateway pod
$ kubectl delete pod egress-gateway-6576ccdf66-mtqzl --wait=false
pod "egress-gateway-6576ccdf66-mtqzl" deleted

$ # lets collect logs from all pods in our maintenance-aware application deployment
$ kubectl logs --selector=app=annotation-aware-workload
[annotation-aware-workloads-7987f55c9f-f7mkq] polling egress maintenance timestamp...
[annotation-aware-workloads-7987f55c9f-f7mkq] gatewayMaintenanceStartedTimestamp has value ''
[annotation-aware-workloads-7987f55c9f-qtcs2] polling egress maintenance timestamp...
[annotation-aware-workloads-7987f55c9f-qtcs2] gatewayMaintenanceStartedTimestamp has value ''
[annotation-aware-workloads-7987f55c9f-z5x25] polling egress maintenance timestamp...
[annotation-aware-workloads-7987f55c9f-z5x25] gatewayMaintenanceStartedTimestamp has value ''
[annotation-aware-workloads-7987f55c9f-qtcs2] polling egress maintenance timestamp...
[annotation-aware-workloads-7987f55c9f-qtcs2] gatewayMaintenanceStartedTimestamp has value '2022-04-20T12:24:34Z'
[annotation-aware-workloads-7987f55c9f-f7mkq] polling egress maintenance timestamp...
[annotation-aware-workloads-7987f55c9f-f7mkq] gatewayMaintenanceStartedTimestamp has value '2022-04-20T12:24:34Z'
[annotation-aware-workloads-7987f55c9f-z5x25] polling egress maintenance timestamp...
[annotation-aware-workloads-7987f55c9f-z5x25] gatewayMaintenanceStartedTimestamp has value '2022-04-20T12:24:34Z'
```
We can see in the above logs that all of our applications have been affected by the downtime of just a single egress gateway. In the worst case, this could lead to a window of downtime for the application, as all replicas scramble to restart their connections at once. To avoid this, lets use the `egress.projectcalico.org/maxNextHops` annotation to restrict the total number of gateways each application can depend on.

##### Reducing the impact of egress gateway maintenance
To place a limit on the number of egress gateways an application can depend on, annotate the application's pod with the `egress.projectcalico.org/maxNextHops` annotation. Alternatively, to limit all pods in a certain namespace, annotate that namespace. Let's annotate all pods in our sample deployment from earlier:

```sh
kubectl patch deploy annotation-aware-workloads --type=merge -p \
'{"spec":
    {"template":
        {"metadata":
            {"annotations":
                {"egress.projectcalico.org/maxNextHops": "1"}
            }
        }
    }
}'
```
> **Note**:
> - Either a *pod or a namespace* can be annotated with `egress.projectcalico.org/maxNextHops`, however, the `egress.projectcalico.org/selector` annotation must also be present on the selected resource.
> - If annotating pods, the `egressIPSupport` Felixconfiguration option must be set to `EnabledPerNamespaceOrPerPod`.
> - If a pod's desired `maxNextHops` exceeds the total number of available egress gateways, scaling up the egress gateway deployment will result in the pod's egress networking updating until the desired number of gateways are being used.
> - In all other cases, the `maxNextHops` annotation only takes effect at the time a pod is created. To ensure a pod's egress networking remains functional for its entire lifecycle, modifications to `maxNextHops` after a pod's creation will have no effect. For this reason, it's recommended that any egress gateway deployments have been scaled prior to deploying dependent workloads.
{: .alert .alert-info}

Once our patched sample deployment has been fully rolled out, each of our application pods should now depend on at-most 1 egress gateway replica. Lets bring down another egress gateway pod and monitor our application logs:

```sh
$ # begin the termination of an egress gateway pod
$ kubectl delete pod egress-gateway-6576ccdf66-c42v7 --wait=false
pod "egress-gateway-6576ccdf66-c42v7" deleted

$ # collect logs from each application pod
$ kubectl logs --selector=app=annotation-aware-workload
[annotation-aware-workloads-565b6855b9-tjvqr] polling egress maintenance timestamp...
[annotation-aware-workloads-565b6855b9-tjvqr] gatewayMaintenanceStartedTimestamp has value ''
[annotation-aware-workloads-565b6855b9-s44pt] polling egress maintenance timestamp...
[annotation-aware-workloads-565b6855b9-s44pt] gatewayMaintenanceStartedTimestamp has value ''
[annotation-aware-workloads-565b6855b9-46cw5] polling egress maintenance timestamp...
[annotation-aware-workloads-565b6855b9-46cw5] gatewayMaintenanceStartedTimestamp has value ''
[annotation-aware-workloads-565b6855b9-tjvqr] polling egress maintenance timestamp...
[annotation-aware-workloads-565b6855b9-tjvqr] gatewayMaintenanceStartedTimestamp has value '2022-04-20T12:53:32Z'
[annotation-aware-workloads-565b6855b9-s44pt] polling egress maintenance timestamp...
[annotation-aware-workloads-565b6855b9-s44pt] gatewayMaintenanceStartedTimestamp has value ''
[annotation-aware-workloads-565b6855b9-46cw5] polling egress maintenance timestamp...
[annotation-aware-workloads-565b6855b9-46cw5] gatewayMaintenanceStartedTimestamp has value ''
```
We can see from the above logs that only a single application pod has now been affected by the terminating egress gateway. The other pods have not received an annotation for a terminating gateway because they have chosen different gateways to depend on, and thus won't be affected.

> **Note**: The subset of egress gateway replicas that each pod will depend on when using the `maxNextHops` annotation can't be manually selected.
> {{site.prodname}} selects a subset of replicas in such a way as to evenly distribute load across the whole replica set.
{: .alert .alert-info}

<br>

### Reference
**The following are annotations that {{site.prodname}} sets automatically on any egress-dependent pods:**

|Annotation|Description|Datatype|Default value|Expected values|
|----------|-----------|--------|-------------|---------------|
|`egress.projectcalico.org/gatewayMaintenanceGatewayIP`|Indicates the IP of a terminating egress gateway your pod is using. | IP Address | "" |Any IP within the egress gateway deployment's IPSet. |
|`egress.projectcalico.org/gatewayMaintenanceStartedTimestamp`|Indicates when the egress gateway identified by `gatewayMaintenanceGatewayIP` began terminating. | String | "" | An RFC3339 date string |
|`egress.projectcalico.org/gatewayMaintenanceFinishedTimestamp` |Indicates when the egress gateway identified by `gatewayMaintenanceGatewayIP` will finish terminating. |String |"" |An RFC3339 date string |

<br>

**The following annotations are used to configure your egress-dependent workloads. These annotations can be set either on a namespace, or on a pod. If setting the annotations on pods, the `egressIPSupport` Felixcconfiguration option must be set to `EnabledPerNamespaceOrPerPod`.**

|Annotation|Description|Datatype|Default value|Possible values|
|----------|-----------|--------|-------------|---------------|
|`egress.projectcalico.org/maxNextHops` |Specifies the maximum number of egress gateway replicas from the selected deployment that a pod should depend on. Replicas will be chosen in a manner that attempts to balance load across the whole egress gateway replicaset. If unset, or set to "0", egress traffic will behave in the default manner (load balanced over all available gateways). |String |"" |"0", "1", "2", "3", ... |

### Above and beyond 🚀
- [Troubleshooting egress gateways]({{site.baseurl}}/networking/egress/troubleshoot).