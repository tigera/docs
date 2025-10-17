import React from 'react';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';

import { prodname, prodnameWindows } from '../../variables';

function CalicoWindowsInstallFirstStep(props) {
  if (props.networkingType === 'vxlan') {
    return (
      <li>
        Ensure that BGP is disabled.
        <ul>
          <li>If you installed {prodname} using the manifest, BGP is already disabled.</li>
          <li>If you installed {prodname} using the operator, run this command:</li>
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
        <p>
          Get the cluster's Kubernetes API server host and port, which will be used to update the {prodnameWindows}{' '}
          config map. The API server host and port is required so that the {prodnameWindows} installation script can
          create a kubeconfig file for {prodname} services. If your Windows nodes already have {prodnameWindows}{' '}
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
              kubectl get configmap -n kube-system kube-proxy -o yaml | grep server{'\n'}
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
          Create the <code>kubernetes-services-endpoint</code> ConfigMap with the Kubernetes API server
          host and port (discovered in the previous step) used to create a kubeconfig file for {prodname} services.
          <CodeBlock language='bash'>{`kubectl apply -f - << EOF
kind: ConfigMap
apiVersion: v1
metadata:
  name: kubernetes-services-endpoint
  namespace: tigera-operator
data:
  KUBERNETES_SERVICE_HOST: "$\{APISERVER_ADDR\}"
  KUBERNETES_SERVICE_PORT: "$\{APISERVER_PORT\}"
EOF`}
</CodeBlock>
        </p>
      </li>
      <li>
        <p>
          Get the Kubernetes service clusterIP range configured in your cluster. This must
          match the service-cluster-ip-range used by kube-apiserver.
        </p>
      </li>
      <li>
        <p>
          Add the Kubernetes service CIDR (discovered in the previous step) enable {prodnameWindows} on the Tigera Operator installation resource.
        </p>
        <p>
          For example, with a Kubernetes service clusterIP range of 10.96.0.0/12:
          <CodeBlock language='bash'>{`kubectl patch installation default --type merge --patch='{"spec": {"serviceCIDRs": ["10.96.0.0/12"], "calicoNetwork": {"windowsDataplane": "HNS"}}}'`}</CodeBlock>
        </p>
      </li>
      <li>
        Install kube-proxy on Windows nodes.
        <p>
          Depending on your platform, you may already have kube-proxy running on your Windows nodes. If kube-proxy is
          already running on your Windows nodes, skip this step. If kube-proxy is not running, you must install and run
          kube-proxy on each of the Windows nodes in your cluster. Note: The <Link href="https://raw.githubusercontent.com/kubernetes-sigs/sig-windows-tools/master/hostprocess/calico/kube-proxy/kube-proxy.yml">
          manifest provided in the kubernetes-sigs sig-windows-tools repository</Link> depends on the kubeconfig
          provided by the <code>kube-proxy</code> ConfigMap in the <code>kube-system</code> namespace.
        </p>
        <p>
          You <b>must</b> replace <code>KUBE_PROXY_VERSION</code> with your cluster's Kubernetes version in <code>kube-proxy.yml</code> to ensure the daemonset uses a kube-proxy Windows image that is compatible with your Kubernetes cluster. Use a command like the following to retrieve the YAML file, replace the version, and apply it:
          <CodeBlock language='bash'>{`curl -L  https://raw.githubusercontent.com/kubernetes-sigs/sig-windows-tools/master/hostprocess/calico/kube-proxy/kube-proxy.yml | sed "s/KUBE_PROXY_VERSION/\<YOUR_KUBERNETES_VERSION>/g" | kubectl apply -f -`}</CodeBlock>
        </p>
      </li>
      <li>
        <p>Monitor the installation.</p>
        The {prodnameWindows} HPC installation has 2 initContainers: <code>uninstall-calico</code>, which deals with removing previous manually installed {prodnameWindows} services, if any
        and <code>install-cni</code>, which installs needed CNI binaries and configuration, when using Calico CNI.
        <CodeBlock language='bash'>
          kubectl logs -f -n calico-system -l k8s-app=calico-node-windows -c uninstall-calico{'\n'}
          kubectl logs -f -n calico-system -l k8s-app=calico-node-windows -c install-cni{'\n'}
        </CodeBlock>
        <p>
          After these initContainers finish their execution, installation is complete. Next, the
          {prodnameWindows} services are started in separate containers:
        </p>
        <CodeBlock language='bash'>
          kubectl logs -f -n calico-system -l k8s-app=calico-node-windows -c node{'\n'}
          kubectl logs -f -n calico-system -l k8s-app=calico-node-windows -c felix{'\n'}
          {props.networkingType === 'windows-bgp'
            ? `kubectl logs -f -n calico-system -l k8s-app=calico-node-windows -c confd`
            : null}
        </CodeBlock>
        <p>
          The <code>calico-node-windows</code> pods will be ready after their containers finish initializing.
        </p>
      </li>
    </ol>
  );
}
