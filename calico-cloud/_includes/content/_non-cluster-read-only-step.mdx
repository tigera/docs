#### Step 1: (Optional) Configure access for the non-cluster-host
In order to run Calico Node as a container, it will need a kubeconfig. You can skip this step if you already have a kubeconfig ready to use.

{% include content/create-kubeconfig.md %}

Run the following two commands to create a cluster role with read-only access and a corresponding cluster role binding.

```bash
kubectl apply -f {{ "/manifests/non-cluster-host-clusterrole.yaml" | absolute_url }}
kubectl create clusterrolebinding $SA_NAME --serviceaccount=calico-system:$SA_NAME --clusterrole=non-cluster-host-read-only
```

> **Note**: We include examples for systemd, but the commands can be
> applied to other init daemons such as upstart.
{: .alert .alert-info}

