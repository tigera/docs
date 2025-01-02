import React from 'react';
import { When } from 'react-if';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import InstallOpenShiftManifests from './InstallOpenShiftManifests';
import OpenShiftPullSecret from './OpenShiftPullSecret';
import OpenShiftPrometheusOperator from './OpenShiftPrometheusOperator';
import ConfigureManagedCluster from './ConfigureManagedCluster';

import { prodname, prodnameWindows, prodnamedash, rootDirWindows, baseUrl, filesUrl, tempFilesURL } from '../../variables';

export default function InstallOpenShift(props) {
  return (
    <>
      <Heading
        as='h4'
        id='create-a-configuration-file-for-the-openshift-installer'
      >
        Create a configuration file for the OpenShift installer
      </Heading>
      <p>
        First, create a staging directory for the installation. This directory will contain the configuration file,
        along with cluster state files, that OpenShift installer will create:
      </p>
      <CodeBlock>mkdir openshift-tigera-install && cd openshift-tigera-install</CodeBlock>
      <p>Now run OpenShift installer to create a default configuration file:</p>
      <CodeBlock>openshift-install create install-config</CodeBlock>
      <Admonition type='note'>
        See the{' '}
        <Link
          href='https://cloud.redhat.com/openshift/install'
          target='_blank'
          rel='noopener noreferrer'
        >
          OpenShift installer documentation
        </Link>{' '}
        for more information about the installer and any configuration changes required for your platform.
      </Admonition>
      <p>
        After the installer finishes, your staging directory will contain the configuration file{' '}
        <code>install-config.yaml</code>.
      </p>

      <Heading
        as='h4'
        id={`update-the-configuration-file-to-use-${prodnamedash}`}
      >
        Update the configuration file to use {prodname}
      </Heading>
      <p>
        Override the OpenShift networking to use {prodname} and update the AWS instance types to meet the{' '}
        <Link href={`${baseUrl}/getting-started/install-on-clusters/openshift/requirements`}>system requirements</Link>:
      </p>
      <CodeBlock language='bash'>
        sed -i 's/\(OpenShiftSDN\|OVNKubernetes\)/Calico/' install-config.yaml{'\n'}
      </CodeBlock>

      <Admonition type='note'>
        <p>By default openshift-installer creates 3 replicas, you can change these settings by modifying the cloud-provider part in the install-config.yaml</p>
        <p>The following example changes the default deployment instance type and replica quantity.</p>
        <CodeBlock language='yaml' title='install-config.yaml'>
        {`...
          platform: 
            aws:
              type: m5.xlarge
          replicas: 2
          ...`}
        </CodeBlock>
      </Admonition>

      <Heading
        as='h4'
        id='generate-the-install-manifests'
      >
        Generate the install manifests
      </Heading>
      <p>Now generate the Kubernetes manifests using your configuration file:</p>
      <CodeBlock language='bash'>openshift-install create manifests</CodeBlock>
        <Admonition type={'note'}>
            <p>For OpenShift **v4.16 or newer** on **AWS**, configure AWS security groups to allow BGP, typha and IP-in-IP encapsulation traffic by editing the OpenShift cluster-api manifests.</p>
            <p>Edit `spec.network.cni.cniIngressRules` in the `cluster-api/02_infra-cluster.yaml` file to add </p>
            <CodeBlock language='bash'>
                {`cniIngressRules:
(...)
- description: BGP (calico enterprise)
  fromPort: 179
  protocol: tcp
  toPort: 179
- description: IP-in-IP (calico enterprise)
  fromPort: -1
  protocol: "4"
  toPort: -1
- description: Typha (calico enterprise)
  fromPort: 5473
  protocol: tcp
  toPort: 5473
`}
            </CodeBlock>
        </Admonition>
      <InstallOpenShiftManifests />

      {/* For IPI hybrid clusters (Linux + Windows) we need to enable VXLAN and disable BGP */}
      <When condition={props.clusterOS === 'hybrid'}>
        <>
          <p>
            Edit the Installation custom resource manifest <code>manifests/01-cr-installation.yaml</code> so that it
            enables VXLAN and disables BGP. This is required for {prodnameWindows}:
          </p>
          <CodeBlock language='yaml'>
            {`apiVersion: operator.tigera.io/v1
kind: Installation
metadata:
  name: default
spec:
  variant: Calico
  calicoNetwork:
    bgp: Disabled
    ipPools:
    - blockSize: 26
      cidr: 10.128.0.0/14
      encapsulation: VXLAN
      natOutgoing: Enabled
      nodeSelector: all()`}
          </CodeBlock>
        </>
      </When>
      <Heading
        as='h4'
        id='add-an-image-pull-secret'
      >
        Add an image pull secret
      </Heading>
      <OpenShiftPullSecret />

      <Heading
        as='h4'
        id='provide-additional-configuration'
      >
        Provide additional configuration
      </Heading>
      <p>
        To provide additional configuration during installation (for example, BGP configuration or peers), use a
        Kubernetes ConfigMap with your desired {prodname} resources. If you do not need to provide additional
        configuration, skip this section.
      </p>
      <p>
        To include <Link href={`${baseUrl}/reference/resources`}>{prodname} resources</Link> during installation, edit{' '}
        <code>manifests/02-configmap-calico-resources.yaml</code> in order to add your own configuration.
      </p>
      <Admonition type='note'>
        <p>If you have a directory with the {prodname} resources, you can create the file with the command:</p>
        <CodeBlock>
          {`kubectl create configmap -n tigera-operator calico-resources \\
  --from-file=<resource-directory> --dry-run -o yaml \\
  > manifests/02-configmap-calico-resources.yaml`}
        </CodeBlock>
        <p>
          With recent versions of <code>kubectl</code> it is necessary to have a kubeconfig configured or add{' '}
          <code>--server=&#39;127.0.0.1:443&#39;</code> even though it is not used.
        </p>
      </Admonition>
      <Admonition type='note'>
        <p>
          If you have provided a <code>calico-resources</code> configmap and the tigera-operator pod fails to come up
          with <code>Init:CrashLoopBackOff</code>, check the output of the init-container with{' '}
          <code>kubectl logs -n tigera-operator -l k8s-app=tigera-operator -c create-initial-resources</code>.
        </p>
      </Admonition>

      <Heading
        as='h4'
        id='create-the-cluster'
      >
        Create the cluster
      </Heading>
      <p>Start the cluster creation with the following command and wait for it to complete.</p>
      <CodeBlock>openshift-install create cluster</CodeBlock>

      <Heading
        as='h4'
        id='create-a-storage-class'
      >
        Create a storage class
      </Heading>
      <p>
        {prodname} requires storage for logs and reports. Before finishing the installation, you must{' '}
        <Link href={`${baseUrl}/operations/logstorage/create-storage`}>create a StorageClass for {prodname}</Link>.
      </p>

      <When condition={props.clusterType === 'standalone' || props.clusterType === 'management'}>
        <>
          <Heading
            as='h4'
            id={`install-the-${prodnamedash}-license`}
          >
            Install the {prodname} license
          </Heading>
          <p>
            In order to use {prodname}, you must install the license provided to you by a Tigera support representative.
            Before applying the license, wait until the Tigera API server is ready with the following command:
          </p>
          <CodeBlock>watch oc get tigerastatus</CodeBlock>
          <p>
            Wait until the <code>apiserver</code> shows a status of <code>Available</code>.
          </p>
          <p>After the Tigera API server is ready, apply the license:</p>
          <CodeBlock>{'oc create -f </path/to/license.yaml>'}</CodeBlock>
        </>
      </When>

      <Heading
        as='h4'
        id={`install-${prodnamedash}-resources`}
      >
        Install {prodname} resources
      </Heading>

      {/* OCP_ENTERPRISE_RESOURCES variable in Makefile needs to be updated for any addition or deletion of enterprise resources */}

      <When condition={props.clusterType === 'managed'}>
        <>
          <p>
            Download the Tigera custom resources. For more information on configuration options available in this
            manifest, see <Link href={`${baseUrl}/reference/installation/api`}>the installation reference</Link>.
          </p>
          <CodeBlock language='bash'>curl -O -L {filesUrl}/manifests/ocp/tigera-enterprise-resources.yaml</CodeBlock>
          <p>
            Remove the <code>Manager</code> custom resource from the manifest file.
          </p>
          <CodeBlock language='yaml'>
            {`apiVersion: operator.tigera.io/v1
kind: Manager
metadata:
  name: tigera-secure
spec:
  # Authentication configuration for accessing the Tigera manager.
  # Default is to use token-based authentication.
  auth:
    type: Token`}
          </CodeBlock>
          <p>
            Remove the <code>LogStorage</code> custom resource from the manifest file.
          </p>
          <CodeBlock language='yaml'>
            {`apiVersion: operator.tigera.io/v1
kind: LogStorage
metadata:
  name: tigera-secure
spec:
  nodes:
    count: 1`}
          </CodeBlock>
          <p>Now apply the modified manifest.</p>
          <CodeBlock>oc create -f ./tigera-enterprise-resources.yaml</CodeBlock>
        </>
      </When>

      <When condition={props.clusterType !== 'managed'}>
        <>
          <p>Apply the custom resources for enterprise features.</p>
          <CodeBlock language='bash'>oc create -f {filesUrl}/manifests/ocp/tigera-enterprise-resources.yaml</CodeBlock>        </>
      </When>

      <OpenShiftPrometheusOperator operation='install' />

      <p>You can now monitor progress with the following command:</p>
      <CodeBlock>watch oc get tigerastatus</CodeBlock>
      <p>
        When it shows all components with status <code>Available</code>, proceed to the next step.
      </p>

      <p>(Optional) Apply the full CRDs including descriptions.</p>
      <CodeBlock language='bash'>oc apply --server-side --force-conflicts -f {filesUrl}/manifests/operator-crds.yaml</CodeBlock>

      <When condition={props.clusterType === 'management'}>
        <>
          <Heading
            as='h4'
            id='create-a-management-cluster'
          >
            Create a management cluster
          </Heading>
          <p>
            To control managed clusters from your central management plane, you must ensure it is reachable for
            connections. The simplest way to get started (but not for production scenarios), is to configure a{' '}
            <code>NodePort</code> service to expose the management cluster. Note that the service must live within the{' '}
            <code>tigera-manager</code> namespace.
          </p>
          <ol>
            <li>
              <p>
                Create a service to expose the management cluster. The following example of a NodePort service may not
                be suitable for production and high availability. For options, see{' '}
                <Link href={`${baseUrl}/multicluster/mcm/fine-tune-deployment`}>
                  Fine-tune multi-cluster management for production
                </Link>
                . Apply the following service manifest.
              </p>
              <CodeBlock language='bash'>
                {`oc create -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: tigera-manager-mcm
  namespace: tigera-manager
spec:
  ports:
  - nodePort: 30449
    port: 9449
    protocol: TCP
    targetPort: 9449
  selector:
    k8s-app: tigera-manager
  type: NodePort
EOF`}
              </CodeBlock>
            </li>
            <li>
              <p>
                Export the service port number, and the public IP or host of the management cluster. (Ex.
                "example.com:1234" or "10.0.0.10:1234".)
              </p>
              <CodeBlock language='bash'>{'export MANAGEMENT_CLUSTER_ADDR=<your-management-cluster-addr>'}</CodeBlock>
            </li>
            <li>
              <p>
                Apply the{' '}
                <Link href={`${baseUrl}/reference/installation/api#operator.tigera.io/v1.ManagementCluster`}>
                  ManagementCluster
                </Link>{' '}
                CR.
              </p>
              <CodeBlock language='bash'>
                {`oc apply -f - <<EOF
apiVersion: operator.tigera.io/v1
kind: ManagementCluster
metadata:
  name: tigera-secure
spec:
  address: $MANAGEMENT_CLUSTER_ADDR
EOF`}
              </CodeBlock>
            </li>
          </ol>
          <Heading
            as='h4'
            id='create-an-admin-user-and-verify-management-cluster-connection'
          >
            Create an admin user and verify management cluster connection
          </Heading>
          <p>
            To access resources in a managed cluster from the {prodname} Manager within the management cluster, the
            logged-in user must have appropriate permissions defined in that managed cluster (clusterrole bindings).
          </p>
          <ol>
            <li>
              <p>
                Create an admin user called, <code>mcm-user</code> in the default namespace with full permissions, by
                applying the following commands.
              </p>
              <CodeBlock language='bash'>
                oc create sa mcm-user{'\n'}
                oc create clusterrolebinding mcm-user-admin --serviceaccount=default:mcm-user
                --clusterrole=tigera-network-admin
              </CodeBlock>
            </li>
            <li>
              <p>Get the login token for your new admin user, and log in to {prodname} Manager.</p>
              <CodeBlock language='bash'>
                {`oc get secret $(oc get serviceaccount mcm-user -o jsonpath='{range .secrets[*]}{.name}{"\n"}{end}' | grep token) -o go-template='{{.data.token | base64decode}}' && echo`}
              </CodeBlock>
              <p>
                In the top right banner, your management cluster is displayed as the first entry in the cluster
                selection drop-down menu with the fixed name, <code>management cluster</code>.
              </p>
              <p>
                <img
                  src='/img/calico-enterprise/mcm/mcm-management-cluster.png'
                  alt='Cluster Created'
                />
              </p>
            </li>
          </ol>
          <p>You have successfully installed a management cluster.</p>
        </>
      </When>

      <When condition={props.clusterType === 'managed'}>
        <>
          <ConfigureManagedCluster kubectlCmd='oc' />
          <Heading
            as='h4'
            id='provide-permissions-to-view-the-managed-cluster'
          >
            Provide permissions to view the managed cluster
          </Heading>
          <p>
            To access resources belonging to a managed cluster from the {prodname} Manager UI, the service or user
            account used to log in must have appropriate permissions defined in the managed cluster.
          </p>
          <p>
            Let&#39;s define admin-level permissions for the service account (<code>mcm-user</code>) we created to log
            in to the Manager UI. Run the following command against your managed cluster.
          </p>
          <CodeBlock language='bash'>
            oc create clusterrolebinding mcm-user-admin --serviceaccount=default:mcm-user
            --clusterrole=tigera-network-admin
          </CodeBlock>
        </>
      </When>

      <When condition={props.clusterOS === 'hybrid'}>
        <InstallOpenShiftWindows />
      </When>
    </>
  );
}

// Contains extra OpenShift installation instructions for hybrid Linux+Windows clusters.
function InstallOpenShiftWindows() {
  return (
    <>
      <Heading
        as='h4'
        id='configure-strict-affinity'
      >
        Configure strict affinity
      </Heading>
      <p>
        Next, <Link href={`${baseUrl}/operations/clis/calicoctl/install`}>install calicoctl</Link> and ensure strict
        affinity is true:
      </p>
      <CodeBlock language='bash'>calicoctl ipam configure --strictaffinity=true</CodeBlock>
      <Heading
        as='h4'
        id='add-windows-nodes-to-the-cluster'
      >
        Add Windows nodes to the cluster
      </Heading>
      <p>
        Download the latest{' '}
        <a
          href='https://github.com/openshift/windows-machine-config-bootstrapper/releases'
          target='_blank'
          rel='noopener noreferreer'
        >
          Windows Node Installer (WNI)
        </a>{' '}
        binary <code>wni</code> that matches your OpenShift minor version.
      </p>
      <Admonition type='note'>
        For OpenShift 4.6, use the latest wni for OpenShift 4.5. A wni binary for OpenShift 4.6 is not published yet.
      </Admonition>
      <p>
        Next, determine the AMI id corresponding to Windows Server 1903 (build 18317) or greater. <code>wni</code>{' '}
        defaults to using Windows Server 2019 (build 10.0.17763) which does not include WinDSR support. One way to do
        this is by searching for AMI&#39;s matching the string{' '}
        <code>Windows_Server-1903-English-Core-ContainersLatest</code> in the Amazon EC2 console.
      </p>
      <p>
        Next, run <code>wni</code> to add a Windows node to your cluster. Replace AMI_ID, AWS_CREDENTIALS_PATH,
        AWS_KEY_NAME and AWS_PRIVATE_KEY_PATH with your values:
      </p>
      <CodeBlock language='bash'>
        {`chmod u+x wni
./wni aws create \\
  --image-id AMI_ID \\
  --kubeconfig openshift-tigera-install/auth/kubeconfig \\
  --credentials AWS_CREDENTIALS_PATH \\
  --credential-account default \\
  --instance-type m5a.large \\
  --ssh-key AWS_KEY_NAME \\
  --private-key AWS_PRIVATE_KEY_PATH`}
      </CodeBlock>
      <p>An example of running the above steps:</p>
      <CodeBlock>
        {`$ chmod u+x wni
$ ./wni aws create \
>   --kubeconfig openshift-tigera-install/auth/kubeconfig \\
>   --credentials ~/.aws/credentials \\
>   --credential-account default \\
>   --instance-type m5a.large \\
>   --ssh-key test-key \\
>   --private-key /home/user/.ssh/test-key.pem
2020/10/05 12:52:51 kubeconfig source: /home/user/openshift-tigera-install/auth/kubeconfig
2020/10/05 12:52:59 Added rule with port 5986 to the security groups of your local IP
2020/10/05 12:52:59 Added rule with port 22 to the security groups of your local IP
2020/10/05 12:52:59 Added rule with port 3389 to the security groups of your local IP
2020/10/05 12:52:59 Using existing Security Group: sg-06d1de22807d5dc48
2020/10/05 12:57:30 External IP: 52.35.12.231
2020/10/05 12:57:30 Internal IP: 10.0.90.193`}
      </CodeBlock>
      <Heading
        as='h4'
        id='get-the-administrator-password'
      >
        Get the administrator password
      </Heading>
      <p>
        The <code>wni</code> binary writes the instance details to the file <code>windows-node-installer.json</code>. An
        example of the file:
      </p>
      <CodeBlock>{`{"InstanceIDs":["i-02e13d4cc76c13c83"],"SecurityGroupIDs":["sg-0a777565d64e1d2ef"]}`}</CodeBlock>
      <p>
        Use the instance ID from the file and the path of the private key used to create the instance to get the
        Administrator user's password:
      </p>
      <CodeBlock language='bash'>
        {'aws ec2 get-password-data --instance-id <instance id> --priv-launch-key <aws private key path>'}
      </CodeBlock>

      <Heading
        as='h4'
        id={`install-${prodnameWindows}`}
      >
        Install {prodnameWindows}
      </Heading>
      <ol>
        <li>
          <p>Remote into the Windows node, open a Powershell window, and prepare the directory for Kubernetes files.</p>
          <CodeBlock language='powershell'>mkdir c:\k</CodeBlock>
        </li>
        <li>
          <p>
            Copy the Kubernetes kubeconfig file (default location: openshift-tigera-install/auth/kubeconfig), to the
            file <strong>c:\k\config</strong>.
          </p>
        </li>
        <li>
          <p>
            Download the powershell script, <strong>install-calico-windows.ps1</strong>.
          </p>
          <CodeBlock language='powershell'>
            Invoke-WebRequest {tempFilesURL}/scripts/install-calico-windows.ps1  -OutFile c:install-calico-windows.ps1
          </CodeBlock>
        </li>
        <li>
          <p>
            Run the installation script, replacing the Kubernetes version with the version corresponding to your version
            of OpenShift.
          </p>
          <CodeBlock language='powershell'>
            {
              'c:install-calico-windows.ps1 -KubeVersion <kube version> -ServiceCidr 172.30.0.0/16 -DNSServerIPs 172.30.0.10'
            }
          </CodeBlock>
          <Admonition type='note'>
            <p>
              Get the Kubernetes version with <code>oc version</code> and use only the major, minor, and patch version
              numbers. For example from a cluster that returns:
            </p>
            <CodeBlock>
              {`$ oc version
Client Version: 4.5.3
Server Version: 4.5.14
Kubernetes Version: v1.18.3+5302882`}
            </CodeBlock>
            <p>
              You will use <code>1.18.3</code>:
            </p>
          </Admonition>
        </li>
        <li>
          <p>Install and start kube-proxy service. Execute following powershell script/commands.</p>
          <CodeBlock language='powershell'>
            {rootDirWindows}\kubernetes\install-kube-services.ps1 -service kube-proxy{'\n'}
            Start-Service -Name kube-proxy
          </CodeBlock>
        </li>
        <li>
          <p>Verify kube-proxy service is running.</p>
          <CodeBlock language='bash'>Get-Service -Name kube-proxy</CodeBlock>
        </li>
      </ol>
      <Heading
        as='h4'
        id='configure-kubelet'
      >
        Configure kubelet
      </Heading>
      <p>
        From the Windows node, download the Windows Machine Config Bootstrapper <code>wmcb.exe</code> that matches your
        OpenShift minor version from{' '}
        <a
          href='https://github.com/openshift/windows-machine-config-bootstrapper/releases'
          target='_blank'
          rel='noopener noreferreer'
        >
          Windows Machine Config Bootstrapper releases
        </a>
        . For example, for OpenShift 4.5.x:
      </p>
      <CodeBlock language='powershell'>
        curl https://github.com/openshift/windows-machine-config-bootstrapper/releases/download/v4.5.2-alpha/wmcb.exe -o
        c:\wmcb.exe
      </CodeBlock>
      <Admonition type='note'>
        For OpenShift 4.6, use the latest wmcb.exe for OpenShift 4.5. A wmcb.ex binary for OpenShift 4.6 is not
        published yet.
      </Admonition>
      <p>
        Next, we will download the <code>worker.ign</code> file from the API server:
      </p>
      <CodeBlock language='powershell'>
        {`$apiServer = c:\k\kubectl --kubeconfig c:\k\config get po -n  openshift-kube-apiserver -l apiserver=true --no-headers -o custom-columns=":metadata.name" | select -first 1
c:\k\kubectl --kubeconfig c:\k\config -n openshift-kube-apiserver exec $apiserver -- curl -ks https://localhost:22623/config/worker > c:\worker.ign
((Get-Content c:\worker.ign) -join "\`n") + "\`n" | Set-Content -NoNewline c:\worker.ign`}
      </CodeBlock>
      <p>Next, we run wmcb to configure the kubelet:</p>
      <CodeBlock language='powershell'>
        c:\wmcb.exe initialize-kubelet --ignition-file worker.ign --kubelet-path c:\k\kubelet.exe
      </CodeBlock>
      <Admonition type='note'>
        The kubelet configuration installed by Windows Machine Config Bootstrapper includes{' '}
        <code>--register-with-taints=&quot;os=Windows:NoSchedule&quot;</code> which will require Windows pods to
        tolerate that taint.
      </Admonition>
      <p>
        Next, we make a copy of the kubeconfig because <code>wmcb.exe</code> expects the kubeconfig to be the file{' '}
        <code>c:\k\kubeconfig</code>. Then we configure kubelet to use Calico CNI:
      </p>
      <CodeBlock language='powershell'>
        cp c:\k\config c:\k\kubeconfig{'\n'}
        c:\wmcb.exe configure-cni --cni-dir c:\k\cni --cni-config c:\k\cni\config\10-calico.conf
      </CodeBlock>
      <p>Finally, clean up the additional files created on the Windows node:</p>
      <CodeBlock language='powershell'>rm c:\k\kubeconfig,c:\wmcb.exe,c:\worker.ign</CodeBlock>
      <p>Exit the remote session to the Windows node and return to a shell to a Linux node.</p>
      <p>
        We need to approve the CSR&#39;s generated by the kubelet&#39;s bootstrapping process. First, view the pending
        CSR&#39;s:
      </p>
      <CodeBlock language='bash'>oc get csr</CodeBlock>
      <p>For example:</p>
      <CodeBlock>
        {`$ oc get csr
NAME        AGE     SIGNERNAME                                    REQUESTOR                                                                   CONDITION
csr-55brx   4m32s   kubernetes.io/kube-apiserver-client-kubelet   system:admin                                                                Approved,Issued
csr-bmnfd   4m30s   kubernetes.io/kubelet-serving                 system:node:ip-10-0-45-102.us-west-2.compute.internal                       Pending
csr-hwl89   5m1s    kubernetes.io/kube-apiserver-client-kubelet   system:serviceaccount:openshift-machine-config-operator:node-bootstrapper   Pending`}
      </CodeBlock>
      <p>To approve the pending CSR's:</p>
      <CodeBlock language='bash'>oc get csr -o name | xargs oc adm certificate approve</CodeBlock>
      <p>For example:</p>
      <CodeBlock>
        {`$ oc get csr -o name | xargs oc adm certificate approve
certificatesigningrequest.certificates.k8s.io/csr-55brx approved
certificatesigningrequest.certificates.k8s.io/csr-bmnfd approved
certificatesigningrequest.certificates.k8s.io/csr-hwl89 approved`}
      </CodeBlock>
      <p>Finally, wait a minute or so and get all nodes:</p>
      <CodeBlock>$ oc get node -owide</CodeBlock>
      <p>
        If the Windows node registered itself successfully, it should appear in the list with a Ready status, ready to
        run Windows pods!
      </p>
    </>
  );
}
