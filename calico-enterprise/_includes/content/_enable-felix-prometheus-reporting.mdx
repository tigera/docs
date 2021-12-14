1. Save the current global `FelixConfiguration` resource to a file named `default-felixconfig.yaml`.

   ```
   calicoctl get felixconfig default -o yaml --export | tee default-felixconfig.yaml
   ```

   You should see the following output.

   ```
   apiVersion: projectcalico.org/v3
   kind: FelixConfiguration
   metadata:
     creationTimestamp: null
     name: default
   spec:
     ipipEnabled: true
     logSeverityScreen: Info
     reportingInterval: 0s
   ```
   {: .no-select-button}

1. Update `default-felixconfig.yaml` and append the lines `prometheusReporterEnabled: true` and `prometheusReporterPort: 9081`.

   ```
   cat default-felixconfig.yaml
   ```

   Your file should now look like the following.

   ```
   apiVersion: projectcalico.org/v3
   kind: FelixConfiguration
   metadata:
     creationTimestamp: null
     name: default
   spec:
     ipipEnabled: true
     logSeverityScreen: Info
     reportingInterval: 0s
     prometheusReporterEnabled: true
     prometheusReporterPort: 9081
   ```
   {: .no-select-button}

1. Use the `calicoctl replace` command to update the `default` FelixConfiguration resource with the new fields for enabling metrics.

   ```
   calicoctl replace -f default-felixconfig.yaml
   ```

   You should see the following response.
   ```
   Successfully replaced 1 'FelixConfiguration' resource(s)
   ```
   {: .no-select-button}
