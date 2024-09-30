import React from 'react';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import variables from '@site/calico_versioned_docs/version-3.26/variables';

function CalicoWindowsInstallFirstStep(props) {
  if (props.networkingType === 'vxlan') {
    return (
      <li>
        Ensure that BGP is disabled.
        <ul>
          <li>If you installed {variables.prodname} using the manifest, BGP is already disabled.</li>
          <li>If you installed {variables.prodname} using the operator, run this command:</li>
          <br />
          <CodeBlock language='bash'>
            {`kubectl patch installation default --type=merge -p '{"spec": {"calicoNetwork": {"bgp": "Disabled"}}}'`}
          </CodeBlock>
        </ul>
      </li>
    );
  }

  return (
    <li>
      <p>
        Enable BGP service on the Windows nodes. Install the RemoteAccess service using the following Powershell
        commands:
      </p>
      <CodeBlock language='powershell'>
        Install-WindowsFeature RemoteAccess{'\n'}
        Install-WindowsFeature RSAT-RemoteAccess-PowerShell
        {'\n'}
        Install-WindowsFeature Routing
      </CodeBlock>
      <p>Then restart the computer:</p>
      <CodeBlock language='powershell'>Restart-Computer -Force</CodeBlock>
      <p>before running:</p>
      <CodeBlock language='powershell'>Install-RemoteAccess -VpnType RoutingOnly</CodeBlock>
      <p>
        Sometimes the remote access service fails to start automatically after install. To make sure it is running, run
        the following command:
      </p>
      <CodeBlock language='powershell'>Start-Service RemoteAccess</CodeBlock>
    </li>
  );
}

export default function CalicoWindowsInstall(props) {
  return (
    <ol>
      <CalicoWindowsInstallFirstStep {...props} />
      <li>
        <p>Download the {variables.prodnameWindows} installation manifest.</p>
        <CodeBlock language='bash'>
          {props.networkingType === 'vxlan'
            ? `curl ${variables.manifestsUrl}/manifests/calico-windows-vxlan.yaml -o calico-windows.yaml`
            : `curl ${variables.manifestsUrl}/manifests/calico-windows-bgp.yaml -o calico-windows.yaml`}
        </CodeBlock>
      </li>
      <li>
        <p>
          Get the cluster's Kubernetes API server host and port, which will be used to update the {variables.prodnameWindows}{' '}
          config map. The API server host and port is required so that the {variables.prodnameWindows} installation script can
          create a kubeconfig file for {variables.prodname} services. If your Windows nodes already have {variables.prodnameWindows}{' '}
          installed manually, skip this step. The installation script will use the API server host and port from your
          node's existing kubeconfig file if the <code>KUBERNETES_SERVICE_HOST</code> and{' '}
          <code>KUBERNETES_SERVICE_PORT</code> variables are not provided in the <code>calico-windows-config</code>{' '}
          ConfigMap.
        </p>
        <p>First, make a note of the address of the API server:</p>
        <ul>
          <li>
            <p>
              If you have a single API server with a static IP address, you can use its IP address and port. The IP can
              be found by running:
            </p>
            <CodeBlock language='bash'>kubectl get endpoints kubernetes -o wide</CodeBlock>
            <p>The output should look like the following, with a single IP address and port under "ENDPOINTS":</p>
            <CodeBlock>
              {`NAME         ENDPOINTS             AGE
kubernetes   172.16.101.157:6443   40m`}
            </CodeBlock>
            <p>
              If there are multiple entries under "ENDPOINTS", then your cluster must have more than one API server. In
              this case, use the appropriate load balancing option below for your cluster.
            </p>
          </li>
          <li>
            <p>
              If using DNS load balancing (as used by <code>kops</code>), use the FQDN and port of the API server{' '}
              <code>
                api.internal.{'<'}clustername{'>'}
              </code>
              .
            </p>
          </li>
          <li>
            <p>
              If you have multiple API servers with a load balancer in front, you should use the IP and port of the load
              balancer.
            </p>
          </li>
          <Admonition type='tip'>
            <p>
              If your cluster uses a ConfigMap to configure <code>kube-proxy</code> you can find the "right" way to
              reach the API server by examining the config map. For example:
            </p>
            <CodeBlock>
              kubectl get configmap -n kube-system kube-proxy -o yaml | grep server`{'\n'}
              server: https://d881b853ae312e00302a84f1e346a77.gr7.us-west-2.eks.amazonaws.com
            </CodeBlock>
            <p>
              In this case, the server is <code>d881b853aea312e00302a84f1e346a77.gr7.us-west-2.eks.amazonaws.com</code>{' '}
              and the port is 443 (the standard HTTPS port).
            </p>
          </Admonition>
        </ul>
      </li>
      <li>
        <p>
          Edit the <code>calico-windows-config</code> ConfigMap in the downloaded manifest and ensure the required
          variables are correct for your cluster.
        </p>
        <ul>
          <li>
            {props.networkingType === 'vxlan' ? (
              <>
                <code>CALICO_NETWORKING_BACKEND</code>: This should be set to <strong>vxlan</strong>.
              </>
            ) : (
              <>
                <code>CALICO_NETWORKING_BACKEND</code>: This should be set to <strong>windows-bgp</strong>.
              </>
            )}
          </li>
          <li>
            <code>KUBERNETES_SERVICE_HOST</code> and <code>KUBERNETES_SERVICE_PORT</code>: The Kubernetes API server
            host and port (discovered in the previous step) used to create a kubeconfig file for {variables.prodname} services. If
            your node already has an existing kubeconfig file, leave these variables blank.
          </li>
          <li>
            <code>K8S_SERVICE_CIDR</code>: The Kubernetes service clusterIP range configured in your cluster. This must
            match the service-cluster-ip-range used by kube-apiserver.
          </li>
          <li>
            <code>CNI_BIN_DIR</code>: Path where {variables.prodname} CNI binaries will be installed. This must match the CNI bin
            value in the ContainerD service configuration. If you used the provided Install-Containerd.ps1 script, you
            should use the CNI bin path value you provided to that script.
          </li>
          <li>
            <code>CNI_CONF_DIR</code>: Path where {variables.prodname} CNI configuration will be installed. This must match the
            CNI conf value in the ContainerD service configuration. If you used the provided Install-Containerd.ps1
            script, you should use the CNI conf path value you provided to that script.
          </li>
          <li>
            <code>DNS_NAME_SERVERS</code>: The DNS nameservers that will be used in the CNI configuration.
          </li>
          <li>
            <code>FELIX_HEALTHENABLED</code>: The Felix health check server must be enabled.
          </li>
        </ul>
      </li>
      <li>
        <p>Apply the {variables.prodnameWindows} installation manifest.</p>
        <CodeBlock language='bash'>kubectl create -f calico-windows.yaml</CodeBlock>
      </li>
      <li>
        <p>Monitor the installation.</p>
        <CodeBlock language='bash'>
          kubectl logs -f -n calico-system -l k8s-app=calico-node-windows -c install
        </CodeBlock>
        <p>
          After the log <code>Calico for Windows installed</code> appears, installation is complete. Next, the{' '}
          {variables.prodnameWindows} services are started in separate containers:
        </p>
        <CodeBlock language='bash'>
          kubectl logs -f -n calico-system -l k8s-app=calico-node-windows -c node{'\n'}
          kubectl logs -f -n calico-system -l k8s-app=calico-node-windows -c felix{'\n'}
          {props.networkingType === 'windows-bgp'
            ? `kubectl logs -f -n calico-system -l k8s-app=calico-node-windows -c confd`
            : null}
        </CodeBlock>
      </li>
      <li>
        Install kube-proxy.
        <p>
          Depending on your platform, you may already have kube-proxy running on your Windows nodes. If kube-proxy is
          already running on your Windows nodes, skip this step. If kube-proxy is not running, you must install and run
          kube-proxy on each of the Windows nodes in your cluster. Note: The provided manifest depends on the kubeconfig
          provided by the <code>kube-proxy</code> ConfigMap in the <code>kube-system</code> namespace.
        </p>
        <ul>
          <li>
            <p>Download the kube-proxy manifest:</p>
            <CodeBlock language='bash'>curl {variables.manifestsUrl}/manifests/windows-kube-proxy.yaml -o windows-kube-proxy.yaml</CodeBlock>
          </li>
          <li>
            Edit the downloaded manifest
            <ul>
              <li>
                Replace <code>VERSION</code> with your Windows nodes&#39; server version. E.g. <code>1809</code>.
              </li>
              <li>
                Update the <code>K8S_VERSION</code> env variable value with your Kubernetes cluster version.
              </li>
            </ul>
          </li>
          <li>
            <p>Apply the manifest</p>
            <CodeBlock language='bash'>kubectl apply -f windows-kube-proxy.yaml</CodeBlock>
          </li>
          <li>
            <p>Verify the kube-proxy-windows daemonset is running</p>
            <CodeBlock language='bash'>kubectl describe ds -n kube-system kube-proxy-windows</CodeBlock>
          </li>
        </ul>
      </li>
    </ol>
  );
}
