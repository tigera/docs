
1. Create a service account

   ```bash
   SA_NAME=my-host
   kubectl create serviceaccount $SA_NAME -n calico-system -o yaml
   ```
1. Create a secret for the service account

   >**Note**: This step is needed if your Kubernetes cluster is version v1.24 or above. Prior to Kubernetes v1.24, this secret is created automatically.
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

1. For Kubernetes v1.24+, use the following command to obtain the token for the secret associated with your host
   
   ```bash
   kubectl describe secret $SA_NAME -n calico-system
   ```

   For Kubernetes clusters prior to version v1.24, use the following command to retrieve your token:

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
