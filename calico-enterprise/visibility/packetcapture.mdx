---
title: Packet capture
description: Capture live traffic for debugging microservices and application interaction.
canonical_url: /visibility/packetcapture
---

### Big picture

Capture live traffic inside a Kubernetes cluster, and export to visualization tools like Wireshark for troubleshooting and debugging applications.

### Value 

{{site.prodname}} packet capture is implemented in a Kubernetes-native way so you can troubleshoot service/application connectivity issues and performance issues. You can start a packet capture in Manager UI Service Graph, or using the CLI. 

Packet capture integration with **Service Graph** makes it very easy to capture traffic for a specific namespace, service, replica set, daemonset, statefulset, or pod. Just right-click on an endpoint to start or schedule a capture, and then download capture files to your favorite visualization tool like WireShark. 

With {{site.prodname}} packet capture you can:

- Run packet capture whenever you want (available 24/7)
- Preschedule packet captures to start and stop when needed
- Customize packet captures by port and protocol
- Share packet capture jobs

**Demos and blogs**

-  {% include open-new-window.html text='Video: packet capture demo' url='https://www.tigera.io/features/packet-capture/' %}
-  {% include open-new-window.html text='Troubleshooting microservices with Dynamic Packet Capture' url='https://thenewstack.io/faster-troubleshooting-with-dynamic-packet-capture/' %}

### Features

This how-to guide uses the following {{site.prodname}} features:

- **FelixConfig** with **PacketCapture**

### Concepts

### About packet capture

Typically, when you troubleshoot microservices and applications for connectivity issues or slow performance, you run a traditional packet capture tool like **tcpdump** against a container in a pod. But live troubleshooting in an ephemeral Kubernetes environment is tricky; problems do not last a long time, and happen randomly. So you need to be very fast to capture meaningful information to determine root causes. {{site.prodname}} makes it easy with these basic steps:

1. Determine the workload(s) you want to capture.
1. Start/schedule a packet capture job in Service Graph (Manager UI) or the CLI.
1. After the capture is finished, download the packet capture files (known as `pcap` files), and import them into your analysis tool (for example, WireShark).

For a simple use case workflow see, {% include open-new-window.html text='Faster troubleshooting of microservices, containers, and Kubernetes with Dynamic Packet Capture' url='https://www.tigera.io/blog/faster-troubleshooting-of-microservices-containers-and-kubernetes-with-dynamic-packet-capture/' %}.

### Before you begin

**Not supported**

- Capturing traffic from host networked pods or host endpoints
- Capturing traffic from pods with multiple interfaces
- Capturing traffic for pods running on Windows hosts

### How To

- [Packet capture in Service Graph](#packet-capture-in-service-graph)
- [Packet capture using the command line](#packet-capture-using-the-command-line)
- [Store and rotate capture files](#store-and-rotate-capture-files) 
- [Enforce RBAC for capture tasks for CLI users](#enforce-rbac-for-capture-tasks-for-cli-users)

#### Packet capture in Service Graph

1. Select an endpoint from the service graph (for example, namespace, service, replica set, daemonset, statefulset, or pod), right-click, and select **Initiate packet capture**.

    ![start-capture]({{site.baseurl}}/images/start-capture.png)

1. Schedule the capture to run now or at a later time, and click **Run**.

    ![schedule-pc]({{site.baseurl}}/images/schedule-pc.png)

1. From the **Capture Jobs** tab in the bottom panel, the Status field will show that status, "Capturing". Scroll to the right, and click the drop-down menu for options to stop and manage captures.

    ![capture-menu]({{site.baseurl}}/images/capture-menu.png)

#### Packet capture using the command line

This section provides examples of using the CLI to manage packet capture jobs and pcap files.  

**Create a PacketCapture resource**

**Example: All pods in a namespace**

This example captures traffic for all pods in the `sample` namespace.

```
apiVersion: projectcalico.org/v3
kind: PacketCapture
metadata:
  name: sample-capture-all
  namespace: sample
spec:
  selector: all()
```

**Example: All pods in a namespace matching a label and selector**

This example captures traffic on all pods in the namespace `sample`, with the label `k8s-app`, equal to `nginx`.

```yaml
apiVersion: projectcalico.org/v3
kind: PacketCapture
metadata:
  name: sample-capture-nginx
  namespace: sample
spec:
  selector: k8s-app == "nginx"
```

**Example: All pods in a namespace, TCP traffic only**

This example captures traffic on all pods in the `sample` namespace, but only for TCP traffic.

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

**Start a packet capture job, now**

To start a packet capture job immediately, use the following command:

```bash
kubectl apply -f <your_packet_capture_filename>
```

**Schedule a packet capture job**

You can schedule a packet capture job to start and/or stop at a specific time using RFC3339 format. In the following example, a traffic capture job is scheduled for 10 minutes, between 00:30 UTC and 00:40 UTC for all pods in the sample namespace.

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

**Monitor status of packet capture job**

After you start capture a job, it cycles through these states: Scheduled (if applicable), WaitingForTraffic, Capturing, and Finished. To monitor the status of a PacketCapture, use the following command:

```bash
kubectl get packetcaptures -A
```

**Stop a packet capture job**

To stop a capture job immediately, update the PacketCaptureResource by setting the `endTime` to the current time (or earlier). 

**Stop a packet capture job, and delete the capture file from the cluster**

```bash
kubectl delete -f <your_packet_capture_filename>
```

**Delete a packet capture job**

```bash
kubectl delete -f <your_packet_capture_filename>
```

**Find packet capture files**

To find generated capture files, query the status of the PacketCapture:

```bash
kubectl get packetcaptures -n <namespace> <name> -o yaml
```

```bash
export NS=<REPLACE_WITH_CAPTURE_NAMESPACE>
export NAME=<REPLACE_WITH_CAPTURE_NAME>
```

**Sample output**

```yaml
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

**Get packet capture files from pods**

Get the pod on the node with the packet capture that you want.

```bash
kubectl get pods -ntigera-fluentd --no-headers --field-selector spec.nodeName="<REPLACE_WITH_NODE_NAME>"
```

Copy the packet capture using the pod information.

```bash
kubectl cp tigera-fluentd/<REPLACE_WITH_POD_NAME>:var/log/calico/pcap/sample/sample-capture/ .
```

**Delete packet capture files**

```bash
kubectl exec -it tigera-fluentd/<REPLACE_WITH_POD_NAME> -- sh -c "rm -r /var/log/calico/pcap/sample/sample-capture/"
```

#### Store and rotate capture files

Packet capture files are stored on the host-mounted volume used for calico nodes. FelixConfig contains several parameters for storing and rotating capture files. 

**Note**:
- Capture files are stored using the following directory structure: 
`{namespace}/{packet capture resource name}`
- The active packet capture file is identified using the following schema: 
`{workload endpoint name}_{host network interface}.pcap` 
- Rotated capture file names contain an index matching the rotation timestamp
- Packet capture files are deleted after the packet capture resource is deleted.

**Rotate capture files**

The Felix parameter, `captureRotationSeconds` lets you schedule how often saved pcap are rotated. In the following example, the time rotation time is one day.

```bash
kubectl patch felixconfiguration default -p '{"spec":{"captureRotationSeconds":"86400"}}'
```

#### Enforce RBAC for capture tasks for CLI users

Packet capture permissions are enforced using the standard Kubernetes RBAC for CLI users, based on Role and RoleBindings within a namespace.

**Example**

The following Role and RoleBindings shows how to allow user jane to create/delete/get/list/update/watch packet captures for a specific namespace. 

```yaml
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
To allow user jane to access (get and delete) the capture files generated for a specific namespace, a role/role binding similar to the one below can be used:

```yaml
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

