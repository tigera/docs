---
title: Configure federated endpoint identity 
description: Configure a local cluster to pull endpoint data from a remote cluster. 
canonical_url: /multicluster/federation/kubeconfig
---

### Big picture

Configure a local cluster to pull endpoint data from a remote cluster. 

### Value

Federating endpoints allows teams to write policies in a local cluster that references/selects endpoints in remote clusters. This expands efficiency and self-service.

### Features

This how to guide uses the following {{site.prodname}} features:

- **RemoteClusterConfiguration** resource

### Concepts

#### Local and remote clusters

Each cluster in the federation acts as both a local and remote cluster.

- Local clusters retrieve endpoint data from remote clusters
- Remote clusters allow local clusters to retrieve endpoint data

#### Configure access to remote clusters 

To allow a local cluster to access resources on a remote cluster, you create a **RemoteClusterConfiguration**. The configuration contains information like secrets, namespace, and role bindings. The connection in a remote cluster configuration is one-way: information flows only from the remote cluster to the local cluster. If you want to share information from a local cluster to a remote cluster, you must create a remote cluster configuration resource on the remote cluster.

In the following example, we federate three clusters with each other: `cluster-a`, `cluster-b`, and `cluster-c`:

- **cluster a**

  Create two RemoteClusterConfiguration resources: 1 for cluster-b, 1 for cluster-c

- **cluster b**

  Create two RemoteClusterConfiguration resources: 1 for cluster-a, 1 for cluster-c

- **cluster c**

  Create two Remote Cluster Configuration resources: 1 for cluster-a, 1 for cluster-b

>**Note**: Although this example applies remote cluster configurations symmetrically across clusters, this is not required; add RemoteClusterConfiguration resources only where needed. 
{: .alert .alert-info}

### Before you begin

**Supported networking**

- {{site.prodname}} with BGP
- AKS/Azure, EKS/AWS, and GKE with VPC

**Required**

- [Install {{site.prodname}}]({{site.baseurl}}/getting-started/kubernetes) 
- [Install and configure calicoq]({{site.baseurl}}/maintenance/clis/calicoq/installing)

### How to

- [Create kubeconfig files](#create-kubeconfig-files)
- [Create secrets](#create-secrets)
- [Create access to secrets for clusters](#create-access-to-secrets-for-clusters)
- [Add remote cluster configurations](#add-remote-cluster-configurations)
- [Configure IP pool resources](#configure-ip-pool-resources)
- [Use policy to reference pods on a remote cluster](#use-policy-to-reference-pods-on-a-remote-cluster)
- [Troubleshoot remote clusters](#troubleshoot-remote-clusters)

#### Create kubeconfig files

For each cluster in the federation, follow these steps.

1. Access the cluster using a `kubeconfig` with administrative privileges.

1. If RBAC is enabled, apply this manifest.

   ```bash
   kubectl apply -f \
   {{ "/getting-started/kubernetes/installation/federation-rem-rbac-kdd.yaml" | absolute_url }}
   ```

1. Apply the following manifest to create a service account called `tigera-federation-remote-cluster`.

   ```bash
   kubectl apply -f \
   {{ "/getting-started/kubernetes/installation/federation-remote-sa.yaml" | absolute_url }}
   ```

1. Use the following command to retrieve the name of the secret containing the token associated
   with the `tigera-federation-remote-cluster` service account.

   ```bash
   kubectl describe serviceaccounts tigera-federation-remote-cluster -n kube-system
   ```

   It should return something like the following.

   ```bash
   Name:         tigera-federation-remote-cluster
   Namespace:    kube-system
   Labels:       <none>
   Annotations:  kubectl.kubernetes.io/last-applied-configuration={"apiVersion":"v1","kind":"ServiceAccount","metadata":{"annotations":{},"name":"remote-cluster","namespace":"kube-system"}}

   Image pull secrets:  <none>
   Mountable secrets:   tigera-federation-remote-cluster-token-wzdgp
   Tokens:              tigera-federation-remote-cluster-wzdgp
   Events:              <none>
   ```
   {: .no-select-button}

   The value of `Tokens` is the name of the secret containing the service account's token.

1. Use the following command to retrieve the token of the service account.

   ```bash
   kubectl describe secrets tigera-federation-remote-cluster-token-wzdgp -n kube-system
   ```

   It should return something like the following.

   ```bash
   Name:         tigera-federation-remote-cluster-token-wzdgp
   Namespace:    kube-system
   Labels:       <none>
   Annotations:  kubernetes.io/service-account.name=tigera-federation-remote-cluster
                 kubernetes.io/service-account.uid=b3044d23-96b5-11e8-ac9b-42010a80000e

   Type:  kubernetes.io/service-account-token

   Data
   ====
   ca.crt:     1025 bytes
   namespace:  11 bytes
   token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJyZW1vdGUtY2x1c3Rlci10b2tlbi13emRncCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJyZW1vdGUtY2x1c3RlciIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImIzMDQ0ZDIzLTk2YjUtMTFlOC1hYzliLTQyMDEwYTgwMDAwZSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlLXN5c3RlbTpyZW1vdGUtY2x1c3RlciJ9.h8ngEwzjzHLMnaRANiXoqrSAWGxycVqq7cO54RM56qyyy_KlAbLpjbhHiaQBNAqJ_LTvjSZ23r2vZn-ZUbTDcoHninD4N2GXKygyVxoBeBzBJinbHWTPp6BYnLvM1pifnj5QNrQanqb0Nwy_p9T1CBMr7NmTsJ5HvRHASCMImjLToCC251kL5oIVM6MWdty_dKGvCzO1rUQhCqcwQyq4Bg6cTFNCLejFpgH0p7XdVcqSsd2uYUpPeS85q5paEKza630Dxg8jdwa5VhYAb_LZfklPOVwHAgNx9OT-z_ZRLYfWoBVlkgazXiiEz9kDweK8hESGLQdW7996C0vdeVx21A
   ```
   {: .no-select-button}

1. Save the `token` value for later steps.

1. Use the following command to retrieve the certificate authority and server data.

   ```bash
   kubectl config view --flatten --minify
   ```

   It should return something like the following.

   ```bash
   apiVersion: v1
   clusters:
   - cluster:
       certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUN5RENDQWJDZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRFNE1EY3lOVEUyTURjek4xb1hEVEk0TURjeU1qRTJNRGN6TjFvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTU9FCjc1ZWtxbmdMdjZKZW9IaGhFLy9iVU0rdnNRMyt3cUZ1eHp5NDlReFk1cmtZaGJ4WWt1TFl0c3ZBVTgycjVnNlYKbUVwbDRlOHJMQjRnTnFpRnVDcVplcmMwWWxqZDVQNllKcW5PN3A1b1J3SG5BWXA3dnZwczJRZjFTemNsTVNjSAo3Qk9XbkF4aEFFZTUzKytPSkhaVmZzL2tlTWtlK3F4b01IZ0R1eGxUb2xXU2dDV0YvbCt3eFk3ZTcyNmozYWZnClRXL0lxSk9GNTN6YTVHR05MMGRIQndFR0gzSU5CVllXa1V5TjEycXZJYlh3RzJReElCU1hEbTcvV1dvNUphMHkKeVNSWkx4L3FZSHBld1hsOU5Od3ZYaXNOZ2xvVVVsZFJ4OGtSWmJOdmViZkpad2FqQVBlRytNRkYwYVJVNHF0Zgo5NVYzdHZ5RHYxaHNJdytGQiswQ0F3RUFBYU1qTUNFd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFFaFJBNmEzUUNBRGVGalNOeFM1Qi9NZVo4dTIKenNvV2F0c21pdm81YUREUUIwUnRUUWFLTUEwU2ZlaGNLd3ZUdTJjVW5CaVJHZlZMSnJ3REwvUzUvRHBhemdBbgozVlZuWERlbGRzcjVKa3dpTElhQUZCSzg5K3BaLzVybXpuZmZpMldKS0JvY2t3N015REplb05FdklkSjVtb2t0ClMxL0pKYlcvbExZU054RjYxOXJxOE9LVVZ2YStwTmczZ2JEbGlFSUZNUmpobWdtU01tUEthRnMvaE1GcDlzdVMKV3VDd1czY2lQVXlUZXV6bnRYbzY5K3NpUGYyLzFxYUFmRWtmSHp3NS9QeG8xM1dOWnEzSzI0dDNoNXh1QjFvRwpwaXRDbEZPSGFLSnNLZ0g1UkFOSWt3dkNIOXgySG9oTzR2M3ZoOXd1KzlOMEt1K3FLVWJIODRENkVpMD0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
       server: https://10.128.0.14:6443
     name: kubernetes
   contexts:
   - context:
       cluster: kubernetes
       user: kubernetes-admin
     name: kubernetes-admin@kubernetes
   current-context: kubernetes-admin@kubernetes
   kind: Config
   preferences: {}
   users:
   - name: kubernetes-admin
     user:
       client-certificate-data: ...
       client-key-data: ...
   ```
   {: .no-select-button}

1. Save the `certificate-authority-data` and the `server` values for the next step.

1. Open a new file in your favorite editor.

   > **Tip**: We recommend coming up with a naming scheme for your clusters that makes sense for your
   > specific use case. For example, if you have four remote clusters that are similar except that they
   > are serve web pages in different languages, you can name the files `kubeconfig-rem-cluster-en`,
   > `kubeconfig-rem-cluster-es`, `kubeconfig-rem-cluster-ja`, and `kubeconfig-rem-cluster-sw`. This will
   > make the installation procedure easier to follow.
   {: .alert .alert-success}

1. Paste the following into your new file.

   ```yaml
   apiVersion: v1
   kind: Config
   users:
   - name: tigera-federation-remote-cluster
     user:
       token: <YOUR-SERVICE-ACCOUNT-TOKEN>
   clusters:
   - name: tigera-federation-remote-cluster
     cluster:
       certificate-authority-data: <YOUR-CERTIFICATE-AUTHORITY-DATA>
       server: <YOUR-SERVER-ADDRESS>
   contexts:
   - name: tigera-federation-remote-cluster-ctx
     context:
       cluster: tigera-federation-remote-cluster
       user: tigera-federation-remote-cluster
   current-context: tigera-federation-remote-cluster-ctx
   ```

1. Replace `<YOUR-SERVICE-ACCOUNT-TOKEN>`, `<YOUR-CERTIFICATE-AUTHORITY-DATA>`,
   and `<YOUR-SERVER-ADDRESS>` with the values obtained in the previous steps.

1. Verify that the `kubeconfig` file works by issuing the following command.

   ```bash
   kubectl --kubeconfig=kubeconfig-rem-cluster-n get services
   ```

   You should see your cluster listed.
   
   
#### Create secrets

The simplest method to create a secret for a remote cluster is to use the `kubectl` command because it correctly encodes the data and formats the file.

Create a secret for a remote cluster with a command like the following.

```bash
kubectl create secret generic remote-cluster-secret-name -n calico-system \
    --from-literal=datastoreType=kubernetes \
    --from-file=kubeconfig=<kubeconfig file>
```

Additional arguments:
- `--from-literal=<key>=<value>` to add literal values
- `--from-file=<key>=<file>` to add values with file contents

#### Create access to secrets for clusters

{{site.prodname}} does not generally have access to all secrets in a cluster so it is necessary to create a Role and RoleBinding for each namespace where the secrets for RemoteClusterConfigurations are created. You can reduce the number of Role and RoleBindings needed by putting the remote cluster Secrets in a dedicated namespace.

```bash
kubectl create -f - <<EOF
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: remote-cluster-secret-access
  namespace: <namespace>
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["watch", "list", "get"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: remote-cluster-secret-access
  namespace: <namespace>
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: remote-cluster-secret-access
subjects:
- kind: ServiceAccount
  name: calico-typha
  namespace: calico-system
EOF
```

#### Add remote cluster configurations

Add remote cluster configuration where needed. Each instance of the [Remote Cluster Configuration]({{site.baseurl}}/reference/resources/remoteclusterconfiguration)
resource represents a single remote cluster from which the local cluster can retrieve endpoint information. 

```yaml
apiVersion: projectcalico.org/v3
kind: RemoteClusterConfiguration
metadata:
  name: cluster-n
spec:
  clusterAccessSecret:
    name: remote-cluster-secret-name
    namespace: remote-cluster-secret-namespace
    kind: Secret
```

#### Configure IP pool resources

For local clusters with `NATOutgoing` configured on your IP pools, verify the following:

- Configure additional IP pools to cover the IP ranges of your remote clusters. This ensures that outgoing NAT is not performed on packets bound for the remote clusters. 
- On the new IP pools, ensure that `disabled` is set to `true` to ensure the pools are not used for IP assignment on the local cluster.
- Verify that the IP pool CIDR used for pod IP allocation does not overlap with any of the IP ranges used by the pods and nodes of any other federated cluster.

For example, you can configure the following on your local cluster, referring to the `IPPool` on a remote cluster:

```yaml
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: cluster1-main-pool
spec:
  cidr: 192.168.0.0/18
  disabled: true
```
Congratulations! You have completed configuration of federated endpoint identity. 

#### Use policy to reference pods on a remote cluster

For federated clusters, use labels to reference pods on a remote cluster in the local policy rules, rather than referencing them by IP address. The main policy selector still refers only to local endpoints; and that selector chooses which local endpoints to apply the policy. 

For policy rule selectors on the local cluster to correctly reference endpoints across all of the clusters, you must align the following between clusters.   

- Namespace names
- Host endpoint label names and values
- Pod label names and values within the namespace
- Service accounts (if you configure {{site.prodname}} federated services)

#### Troubleshoot remote clusters 

To verify that remote clusters are accessible, use the following command. 

```
$ calicoq eval "all()"
```

If all remote clusters are accessible, `calicoq` returns something like the following. In this example, the `remote-cluster-1` prefix indicates the remote cluster endpoints (as configured in the RemoteClusterConfiguration resource).

```
Endpoints matching selector all():
  Workload endpoint remote-cluster-1/host-1/k8s/kube-system.kube-dns-5fbcb4d67b-h6686/eth0
  Workload endpoint remote-cluster-1/host-2/k8s/kube-system.cnx-manager-66c4dbc5b7-6d9xv/eth0
  Workload endpoint host-a/k8s/kube-system.kube-dns-5fbcb4d67b-7wbhv/eth0
  Workload endpoint host-b/k8s/kube-system.cnx-manager-66c4dbc5b7-6ghsm/eth0
```

If a remote cluster is inaccessible, (network failure or a misconfiguration), the `calicoq` output includes details about the error.

**Example**: Remote-cluster-secret is not accessible

```
E0615 12:24:04.895079   30873 reflector.go:153] github.com/projectcalico/libcalico-go/lib/backend/syncersv1/remotecluster/secret_watcher.go:111: Failed to list *v1.Secret: secrets "remote-cluster-secret" is forbidden: User "system:serviceaccount:policy-demo:limited-sa" cannot list resource "secrets" in API group "" in the namespace "remote-cluster-ns"
Endpoints matching selector all():
  Workload endpoint host-a/k8s/kube-system.kube-dns-5fbcb4d67b-7wbhv/eth0
  Workload endpoint host-b/k8s/kube-system.cnx-manager-66c4dbc5b7-6ghsm/eth0
```

**Example**: Incorrect connection information in the Remote Cluster Configuration

```
Endpoints matching selector all():
  Workload endpoint host-a/k8s/kube-system.kube-dns-5fbcb4d67b-7wbhv/eth0
  Workload endpoint host-b/k8s/kube-system.cnx-manager-66c4dbc5b7-6ghsm/eth0
The following problems were encountered connecting to the remote clusters
which may have resulted in incomplete data:
-  RemoteClusterConfiguration(remote-cluster-1): connection to remote cluster failed: Get https://192.168.0.55:6443/api/v1/pods: dial tcp 192.168.0.55:6443: i/o timeout
```

### Next steps

[Configure federated services]({{site.baseurl}}/multicluster/federation/services-controller)
