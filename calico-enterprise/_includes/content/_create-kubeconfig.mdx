
1. Create a service account

   ```bash
   SA_NAME=my-host
   kubectl create serviceaccount $SA_NAME -n calico-system -o yaml
   ```
1. Create a secret for service Account manually.

   >**Note**: This step is needed if your k8s version is 1.24 or above. From K8s 1.24, K8s won’t generate Secrets automatically for ServiceAccounts and need be created manually.
   {: .alert .alert-info}
   ```bash
   kubectl apply -f - <<EOF
   apiVersion: v1
   kind: Secret
   type: kubernetes.io/service-account-token
   metadata:
     name: $SA_NAME
     namespace: calico-system 
     annotations:
       kubernetes.io/service-account.name: $SA_NAME
   EOF
   ```
   
1. Obtain the token for the secret associated with your host
   
   ```bash
   kubectl describe secret $SA_NAME -n calico-system
   ```

1. Obtain the token for the secret associated with your host

   >**Note**: This step is applicable only if your k8s version is less than 1.24.
   {: .alert .alert-info}
   
   ```bash
   kubectl describe secret -n calico-system $(kubectl get serviceaccount -n calico-system $SA_NAME -o=jsonpath="{.secrets[0].name}")
   ```

1. Use a text editor to create a kubeconfig file

   ```
   apiVersion: v1
   kind: Config

   users:
   - name: my-host
     user:
       token: <token from previous step>

   clusters:
   - cluster:
       certificate-authority-data: <your cluster certificate>
       server: <your cluster server>
     name: <your cluster name>

   contexts:
   - context:
       cluster: my-cluster
       user: my-host
     name: my-host

   current-context: my-cluster
   ```

   Take the cluster information from an already existing kubeconfig.
