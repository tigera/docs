---
title: Configure honeypods
description: Configure honeypods to detect compromised workloads.
canonical_url: /threat/honeypod/honeypods
feature_name: feature_generic_all
---

### Big picture

Configure honeypods in your clusters and get alerts that indicate resources may be compromised.

### Value

Based on the well-known cybersecurity method, “honeypots”, {{site.prodname}} honeypods are used to detect suspicious activity within a Kubernetes cluster. The feature enables you to deploy decoys disguised as a sensitive asset (called honeypods) at different locations in your Kubernetes cluster. Any resources make attempts to communicate with the honeypods, it can be considered indicative of a suspicious connection and the cluster may be compromised.

{{site.prodname}} honeypods can be used to detect attacks such as:

- Data exfiltration
- Resources enumeration
- Privilege escalation
- Denial of service
- Vulnerability exploitation attempts

### Features

This how-to guide uses the following {{site.prodname}} features:

- **GlobalAlerts** with **Honeypods**

### Concepts

#### Honeypod implementation

Honeypods can be configured on a per-cluster basis using "template" honeypod manifests that are easily customizable. Any alerts triggered are displayed in the Alerts tab in {{site.prodname}} Manager UI. The Honeypod Dashboard in Kibana provides an easy way to monitor and analyze traffic reaching the honeypods.

### How To

  - [Configure namespace and RBAC for honeypods](#configure-namespace-and-rbac-for-honeypods)
  - [Deploy honeypods in clusters](#deploy-honeypods-in-clusters)
  - [Verify honeypods deployment](#verify-honeypods-deployment)

#### Configure namespace and RBAC for honeypods

Apply the following manifest to create a namespace and RBAC for the honeypods: 

```bash
kubectl apply -f {{ "/manifests/threatdef/honeypod/common.yaml" | absolute_url }} 
```

Add `tigera-pull-secret` into the namespace `tigera-internal`:

```bash
kubectl create secret generic tigera-pull-secret --from-file=.dockerconfigjson=<pull-secrets.json> --type=kubernetes.io/dockerconfigjson -n tigera-internal
```

#### Deploy honeypods in clusters

Use one of the following sample honeypods manifests or customize them for your implementation. All images include a minimal container that runs or mimics a running application. The images provided have been hardened with built-in protections to reduce the risk of them being compromised.

> **Note**: When modifying the provided honeypod manifests, be sure to update the [globalalert]({{site.baseurl}}/reference/resources/globalalert) section in the manifest to match your changes. Ensure the alert name has the prefix `honeypod`, for example `honeypod.new.alert`.
{: .alert .alert-info} 

- **IP Enumeration** 

  Expose an empty pod that can only be reached via PodIP; this allows you to see when the attacker is probing the pod network:

```bash
kubectl apply -f {{ "/manifests/threatdef/honeypod/ip-enum.yaml" | absolute_url }} 
```

- **Expose an nginx service**

  Expose a nginx service that serves a generic page. The pod can be discovered via ClusterIP or DNS lookup. An unreachable service `tigera-dashboard-internal-service` is created to entice the attacker to find and reach, `tigera-dashboard-internal-debug`:

```bash
kubectl apply -f {{ "/manifests/threatdef/honeypod/expose-svc.yaml" | absolute_url }} 
```

- **Vulnerable Service (MySQL)**

  Expose a SQL service that contains an empty database with easy access. The pod can be discovered via ClusterIP or DNS lookup:

```bash
kubectl apply -f {{ "/manifests/threatdef/honeypod/vuln-svc.yaml" | absolute_url }} 
```

#### Verify honeypods deployment

To verify the installation, ensure that honeypods are running within the `tigera-internal` namespace:

```bash
kubectl get pods -n tigera-internal
```

```shell
NAME                                         READY   STATUS    RESTARTS   AGE
tigera-internal-app-28c85                    1/1     Running   0          2m19s
tigera-internal-app-8c5bt                    1/1     Running   0          2m19s
tigera-internal-app-l64nz                    1/1     Running   0          2m19s
tigera-internal-app-qc7gv                    1/1     Running   0          2m19s
tigera-internal-dashboard-6df998578c-mtmqr   1/1     Running   0          2m15s
tigera-internal-db-5c57bd5987-k5ksj          1/1     Running   0          2m10s
```

And verify that global alerts are set for honeypods:

```bash
kubectl get globalalerts
```

```shell
NAME                   CREATED AT
honeypod.fake.svc      2020-10-22T03:44:36Z
honeypod.ip.enum       2020-10-22T03:44:31Z
honeypod.network.ssh   2020-10-22T03:43:40Z
honeypod.port.scan     2020-10-22T03:44:31Z
honeypod.vuln.svc      2020-10-22T03:44:40Z
```

As an example, to trigger an alert for `honeypod.ip.enum`, first get the Pod IP for one of the honeypods:

```bash
kubectl get pod tigera-internal-app-28c85 -n tigera-internal -ojsonpath='{.status.podIP}'
```

Then, run a `busybox` container with the command `ping` on the honeypod IP:

```bash
kubectl run --restart=Never --image busybox ping-runner -- ping -c1 <honeypod IP>
```

If the ICMP request reaches the honeypod, an alert will be generated within 5 minutes.

After you have verified that the honeypods are installed and working, a best practice is to remove the pull secret from the namespace:

```bash
kubectl delete secret tigera-pull-secret -n tigera-internal
```


### Above and beyond

- [Monitor honeypods]({{site.baseurl}}/threat/honeypod/honeypod-controller)
- [GlobalAlerts]({{site.baseurl}}/reference/resources/globalalert)
