---
title: Packet capture
description: Capture live traffic for debugging microservices and application interaction.
canonical_url: /visibility/packetcapture
---

### Big picture

Capture live traffic inside a Kubernetes cluster, and export to visualization tools like Wireshark for troubleshooting and debugging applications.

### Value 

Packet capture is a valuable tool for debugging microservices and application interaction in day-to-day operations and incident response. But manually setting up packet capturing can be tedious. {{site.prodname}} provides an easy way to capture packets using the widely-known "pcap" format, and export them to visualization tools like WireShark.

### Features

This how-to guide uses the following {{site.prodname}} features:

- **FelixConfig** with **PacketCapture**

### Concepts

Libpcap file format, also known as {% include open-new-window.html text='pcap' url='https://wiki.wireshark.org/Development/LibpcapFileFormat' %}, is the main file format used for capturing traffic by network tools.

### Before you begin

**Supported**

- All platforms supported in this release
- pcap file format for captured traffic

**Not supported**

- pcapng format for captured traffic
- Capturing traffic from host networked pods or host endpoints
- Capturing traffic from pods with multiple interfaces
- Capturing traffic for pods running on Windows hosts

### How To

- [Capture live traffic](#capture-live-traffic)
- [Schedule traffic capture](#schedule-traffic-capture)
- [Configure packet capture rotation](#configure-packet-capture-rotation)
- [Enforce RBAC for packet capture](#enforce-rbac-for-packet-capture)
- [Access packet capture files](#access-packet-capture-files)

### Capture live traffic


Capturing live traffic will start by creating a [PacketCapture]({{site.baseurl}}/reference/resources/packetcapture) resource.

Create a yaml file containing one or more packet captures and apply the packet capture to your cluster.

```bash
kubectl apply -f <your_packet_capture_filename>
```

In order to stop capturing traffic, delete the packet capture from your cluster.

```bash
kubectl delete -f <your_packet_capture_filename>
```
**Examples of selecting workloads**

Following is a basic example to select a single workload that has the label `k8s-app` with value `nginx`.

```yaml
apiVersion: projectcalico.org/v3
kind: PacketCapture
metadata:
  name: sample-capture-nginx
  namespace: sample
spec:
  selector: k8s-app == "nginx"
```

In the following example, we select all workload endpoints in `sample` namespace.

```yaml
apiVersion: projectcalico.org/v3
kind: PacketCapture
metadata:
  name: sample-capture-all
  namespace: sample
spec:
  selector: all()
```

In the following example, we select all workload endpoints in `sample` namespace and only TCP traffic.

```yaml
apiVersion: projectcalico.org/v3
kind: PacketCapture
metadata:
  name: sample-capture-all
  namespace: sample
spec:
  selector: all()
  filters:
    - protocol: TCP
```

More examples for filtering traffic are provided at [PacketCapture]({{site.baseurl}}/reference/resources/packetcapture) resource definition.

### Schedule traffic capture

You can schedule a `PacketCapture` to start and/or stop at a certain time. Start and end time are defined using RFC3339 format. 

In the following example, we schedule traffic capture for 10 minutes between 00:30 UTC and 00:40 UTC for all workload
endpoints in `sample` namespace.

```yaml
apiVersion: projectcalico.org/v3
kind: PacketCapture
metadata:
  name: sample-capture-all
  namespace: sample
spec:
  selector: all()
  startTime: "2021-09-08T00:30:00Z"
  endTime: "2021-09-08T00:40:00Z"
```

In order to check the state of the capture, you can monitor to status of a `PacketCapture` for each node there are pods 
scheduled and targeted by the selector to cycle between states: `Scheduled`, `WaitingForTraffic`, `Capturing` and `Finished`.

More examples for scheduling to capture traffic are provided at [PacketCapture]({{site.baseurl}}/reference/resources/packetcapture) resource definition.

### Configure packet capture rotation

Live traffic will be stored as pcap files that will be rotated by size and time. All packet capture files rotate using
parameters defined in [FelixConfig]({{site.baseurl}}/reference/resources/felixconfig).

Packet Captures files will be rotated either when reaching maximum size or when passing rotation time.

For example, in order to extend the time rotation to one day, the command below can be used:

```bash
kubectl patch felixconfiguration default -p '{"spec":{"captureRotationSeconds": 86400}}'
```

### Enforce RBAC for packet capture

Packet Capture permissions are enforced using the standard Kubernetes RBAC based on Role and RoleBindings within a namespace.

For example, in order to allow user jane to create/delete/get/list/update/watch packet captures for a specific namespace, the command below can be used:
 
```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: sample
  name: tigera-packet-capture-role
rules:
- apiGroups: ["projectcalico.org"]
  resources: ["packetcaptures"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: tigera-packet-capture-role-jane
  namespace: sample
subjects:
- kind: ServiceAccount
  name: jane
roleRef:
  kind: Role
  name: tigera-packet-capture-role
  apiGroup: rbac.authorization.k8s.io
```

In order to allow user jane to access (retrieve and delete) the capture files generated for a specific namespace, a role/role binding similar to the one below can be used:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: tigera-authentication-clusterrole-jane
rules:
- apiGroups: ["projectcalico.org"]
  resources: ["authenticationreviews"]
  verbs: ["create"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: tigera-authentication-clusterrolebinding-jane
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: tigera-authentication-clusterrole-jane
subjects:
- kind: ServiceAccount
  name: jane
  namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: sample
  name: tigera-capture-files-role
rules:
- apiGroups: ["projectcalico.org"]
  resources: ["packetcaptures/files"]
  verbs: ["get", "delete"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: tigera-capture-files-role-jane
  namespace: sample
subjects:
- kind: ServiceAccount
  name: jane
  namespace: default
roleRef:
  kind: Role
  name: tigera-capture-files-role
  apiGroup: rbac.authorization.k8s.io
```

### Access packet capture files

Capture files will be stored on the host mounted volume used for calico nodes. These can be visualized using tools such as Wireshark.

Packet capture files will be stored using the following directory structure: {namespace}/{packet capture resource name} under the capture directory defined via FelixConfig.
The active packet capture file will be identified using the following schema: {workload endpoint name}_{host network interface}.pcap. Rotated capture files name will contain an index matching the rotation timestamp.

Packet capture files will be deleted after the packet capture resource has been deleted.

In order to locate the capture files generated, query the status of the [PacketCapture]({{site.baseurl}}/reference/resources/packetcapture)

```bash
export NS=<REPLACE_WITH_CAPTURE_NAMESPACE>
export NAME=<REPLACE_WITH_CAPTURE_NAME>
```

```bash
kubectl get packetcaptures -n $NS $NAME -o yaml
```

Sample of received output:
```
apiVersion: projectcalico.org/v3
kind: PacketCapture
metadata:
  name: sample-capture-all
  namespace: sample
spec:
  selector: all()
status:
  files:
  - directory: /var/log/calico/pcap
    fileNames:
    - pod_cali.pcap
    node: node-0
    state: Capturing
```

#### Access packet capture files via Service Graph

[Service Graph]({{site.baseurl}}/visibility/get-started-cem) lets you access captured traffic for your workload endpoints.

By selecting a service graph vertex that corresponds to a namespace, you can schedule a capture job that selects all workload endpoints within that particular namespace. Other vertex types supported are: service, service groups and replica sets.

![initiate-capture-job]({{site.baseurl}}/images/initiate-capture-job.png)

From the Capture Jobs tab in the bottom panel, you can: rerun/stop a capture job, retrieve and delete capture files, view YAML files and delete a capture job.

#### Access packet capture files via API

To access the capture files locally, you can use the following api that is available via tigera-manager service:

```bash
kubectl port-forward -n tigera-manager service/tigera-manager 9443:9443 &
NS=<REPLACE_WITH_PACKETCAPTURE_NS> NAME=<REPLACE_WITH_PACKETCAPTURE_NAME> TOKEN=<REPLACE_WITH_YOUR_TOKEN> \
curl "https://localhost:9443/packet-capture/download/$NS/$NAME/files.zip" -L -O -k \
-H "Authorization: Bearer $TOKEN"
```

Retrieving capture files from a managed cluster is performed by calling the same API:

```bash
kubectl port-forward -n tigera-manager service/tigera-manager 9443:9443 &
NS=<REPLACE_WITH_PACKETCAPTURE_NS> NAME=<REPLACE_WITH_PACKETCAPTURE_NAME> TOKEN=<REPLACE_WITH_YOUR_TOKEN> MANAGED_CLUSTER=<REPLACE_WITH_THE_NAME_OF_MANAGED_CLUSTER>\
curl "https://localhost:9443/packet-capture/download/$NS/$NAME/files.zip" -L -O -k \
-H "Authorization: Bearer $TOKEN" -H "X-CLUSTER-ID: $MANAGED_CLUSTER"
```

In addition, capture files can be deleted at any point in time once a PacketCapture was marked as `Finished`.

```bash
kubectl port-forward -n tigera-manager service/tigera-manager 9443:9443 &
NS=<REPLACE_WITH_PACKETCAPTURE_NS> NAME=<REPLACE_WITH_PACKETCAPTURE_NAME> TOKEN=<REPLACE_WITH_YOUR_TOKEN> \
curl -X DELETE "https://localhost:9443/packet-capture/files/$NS/$NAME/files.zip" -k \
-H "Authorization: Bearer $TOKEN"
```

Deleting capture files from a managed cluster is performed by calling the same API:

```bash
kubectl port-forward -n tigera-manager service/tigera-manager 9443:9443 &
NS=<REPLACE_WITH_PACKETCAPTURE_NS> NAME=<REPLACE_WITH_PACKETCAPTURE_NAME> TOKEN=<REPLACE_WITH_YOUR_TOKEN> MANAGED_CLUSTER=<REPLACE_WITH_THE_NAME_OF_MANAGED_CLUSTER>\
curl -X DELETE "https://localhost:9443/packet-capture/download/$NS/$NAME/files.zip" -k \
-H "Authorization: Bearer $TOKEN" -H "X-CLUSTER-ID: $MANAGED_CLUSTER"
```


Users accessing packet captures from management and managed clusters need to be allowed `CREATE` actions for `authenticationreviews` in api group `projectcalico.org` in the management cluster, as in the example in the section above.

Next, get the token from the service account.
Using the running example of a service account named, `jane` in the default namespace:

```bash
{% raw %}kubectl get secret $(kubectl get serviceaccount jane -o jsonpath='{range .secrets[*]}{.name}{"\n"}{end}' | grep token) -o go-template='{{.data.token | base64decode}}' && echo{% endraw %}
```

#### Access packet capture files via CLI

Alternatively, you can access the capture files locally using [calicoctl]({{site.baseurl}}/reference/calicoctl/captured-packets) CLI:

```bash
calicoctl captured-packets copy sample-capture --namespace sample --destination /tmp
```

You can access the capture files locally from the Fluentd pods using similar commands like the ones below:

```bash
kubectl get pods -ntigera-fluentd --no-headers --field-selector spec.nodeName="<REPLACE_WITH_NODE_NAME>"
```

```bash
kubectl cp tigera-fluentd/<REPLACE_WITH_POD_NAME>:var/log/calico/pcap/sample/sample-capture/ .
```

[calicoctl]({{site.baseurl}}/reference/calicoctl/captured-packets) CLI can be used to clean capture files:

```bash
calicoctl captured-packets clean sample-capture -namespace sample
```

Alternatively, the following command can be used to clean up capture files:

```bash
kubectl exec -it tigera-fluentd/<REPLACE_WITH_POD_NAME> -- sh -c "rm -r /var/log/calico/pcap/sample/sample-capture/"
```

### Above and beyond

- [Configure access to the Manager UI]({{site.baseurl}}/getting-started/cnx/access-the-manager)
- [Get started with Calico Enterprise Manager]({{site.baseurl}}/visibility/get-started-cem)
