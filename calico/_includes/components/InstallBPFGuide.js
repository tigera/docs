import { When } from 'react-if';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { prodname, manifestsUrl, calicoReleasesURL } from '../../variables';

export default function InstallBPFGuide(props) {
  return (
    <>
      <When condition={props.installMode=="auto"}>
        <Heading as="h3" id='pre-requisites'>Pre-requisites</Heading>
        <p>
          You can choose the automatic eBPF configuration if your cluster meets the following requirements:
        </p>

        <ul>
          <li>Installation with Operator.</li>
          <li>Your cluster has <code>kube-proxy</code> running in the <code>kube-system</code> namespace.</li>
          <li><code>kube-proxy</code> is <strong>not</strong> managed by an automated tool, such as Helm or ArgoCD.</li>
          <li>Operator can access <code>kubernetes</code> service and endpoints.</li>
        </ul>
      </When>

      <p>To install directly in eBPF is very similar; this guide explains the differences:</p>

      <ul>
        <li><a href={`#create-a-suitable-cluster-${props.installMode}`}>Create a cluster</a> suitable to run {prodname} <strong>with the added requirement that the nodes must use a recent enough kernel</strong>.</li>
        {props.installMode=="manual" && <li><a href={`#create-kubernetes-service-endpoint-config-map-${props.installMode}`}><strong>Create a config map with the "real" address of the API server.</strong></a> This allows the operator to install {prodname} with a direct connection to the API server so that it can take over from <code>kube-proxy</code>.</li>}
        <li><a href={`#install-the-tigera-operator-${props.installMode}`}>Install the Tigera Operator</a> (possibly via a Helm chart), and the associated Custom Resource Definitions.</li>
        <li><strong><a href={`#tweak-and-apply-installation-custom-resources-${props.installMode}`}>Download and tweak the installation Custom Resource</a> to tell the operator to use eBPF mode.</strong></li>
        <li><a href={`#tweak-and-apply-installation-custom-resources-${props.installMode}`}>Apply a set of Custom Resources</a> to tell the operator what to install.</li>
        <li><a href={`#monitor-the-progress-of-the-installation-${props.installMode}`}>Wait for the operator to provision all the associated resources and report back via its status resource</a>.</li>
        {props.installMode=="manual" && <li><a href={`#disable-kube-proxy-or-avoid-conflicts-${props.installMode}`}>Disable kube-proxy or avoid conflicts</a>.</li>}
      </ul>

      <Heading
        as='h3'
        id={`create-a-suitable-cluster-${props.installMode}`}
      >
        Create a suitable cluster
      </Heading>      
      <p>The basic requirement for eBPF mode is to have a recent-enough kernel (see <a href="#supported">above</a>).</p>
      <p>Select the appropriate tab below for distribution-specific instructions:</p>

      <Tabs groupId="k8s-distro">
        <TabItem label="Generic or kubeadm" value="Generic or kubeadm-0">
          <p>
            <code>kubeadm</code> supports a number of base OSes; as long as the base OS chosen (such as Ubuntu 20.04) meets the kernel
            requirements, <code>kubeadm</code>-provisioned clusters are supported.
          </p>
          <p>
            Since <code>kube-proxy</code> is not required in eBPF mode, you must disable <code>kube-proxy</code> at install time. With <code>kubeadm</code>
            you can do that by passing the <code> --skip-phases=addon/kube-proxy</code> flag to <code>kubeadm init</code>:
          </p>
          <CodeBlock language="bash">
            {`kubeadm init --skip-phases=addon/kube-proxy`}
          </CodeBlock>
        </TabItem>

        <TabItem label="kOps" value="kOps-1">
          <p>
            <code>kops</code> supports a number of base OSes; as long as the base OS chosen (such as Ubuntu 20.04 or RHEL 8.2) meets the kernel
            requirements, <code>kops</code>-provisioned clusters are supported.
          </p>
          <p>
            Since <code>kube-proxy</code> is not required in eBPF mode, you must disable <code>kube-proxy</code> at install time. With <code>kops</code> you
            can do that by setting the following in your <code>kops</code> configuration:
          </p>
          <CodeBlock language="yaml">
            {`kubeProxy:
    enabled: false`}
          </CodeBlock>
        </TabItem>

        <TabItem label="OpenShift" value="OpenShift-2">
          <p>
            Calico uses eBPF mode by default on OpenShift. For more information on how to install Calico on OpenShift, see{' '}
            <a href="../../getting-started/kubernetes/openshift/installation.mdx">Install an OpenShift 4 cluster with Calico</a>.
          </p>
        </TabItem>

        <TabItem label="AKS" value="AKS-3">
          <p>
            Azure Kubernetes Service (AKS) supports a number of base OSes. The most recent Ubuntu 18.04 image has a recent enough
            kernel to use with eBPF mode.
          </p>
          <p>
            AKS does not support disabling <code>kube-proxy</code> so it's necessary to tell $[prodname] not to try to clean up
            <code>kube-proxy</code>'s iptables rules at a later stage.
          </p>
        </TabItem>

        <TabItem label="EKS" value="EKS-4">
          <p>
            Amazon's Elastic Kubernetes Service (EKS) supports a number of base OSes for nodes. At the time of writing, the
            default kernel used by Amazon Linux is recent enough to run eBPF mode, as is the Bottlerocket kernel. The Ubuntu
            18.04 image did not have a recent-enough kernel (but that may have changed by the time you read this).
          </p>
        </TabItem>

        <TabItem label="MKE" value="MKE-5">
          <p>
            The eBPF data plane is supported on MKE with any Linux operating system that meets the minimum kernel requirements.
          </p>
          <p>
            Since <code>kube-proxy</code> is not required in eBPF mode, you must disable <code>kube-proxy</code> at install time. With <code>MKE</code> you
            can do that by setting <code>--kube-proxy-mode=disabled</code> and <code>--kube-default-drop-masq-bits</code> when installing the cluster.
          </p>
          <p>
            More details can be found in{' '}
            <a href="https://docs.mirantis.com/mke/current/install/predeployment/configure-networking/cluster-service-networking-options.html" target="_blank" rel="noopener noreferrer">
              the MKE documentation
            </a>
            .
          </p>
        </TabItem>
      </Tabs>

      <When condition={props.installMode=="manual"}>
      <Heading
        as='h3'
        id={`create-kubernetes-service-endpoint-config-map-${props.installMode}`}
      >
        Create kubernetes-service-endpoint config map
      </Heading>
      <p>
        In eBPF mode, {prodname} takes over from <code>kube-proxy</code>. This means that, like{' '}
        <code>kube-proxy</code>, it needs to be able to reach the API server <em>directly</em> rather than by using the
        API server's <code>ClusterIP</code>. To tell {prodname} how to reach the API server we create a{' '}
          <code>ConfigMap</code> with the API server's "real" address. In this guide we do that before installing the
          Tigera Operator. That means that the operator itself can also use the direct connection and hence it doesn't
          require <code>kube-proxy</code> to be running.
        </p>
        <p>
          The tabs below explain how to find the "real" address of the API server for a range of distributions.
          <br />
          <strong>Note:</strong> In all cases it's important that the address used is stable even if your API server is
          restarted or scaled up/down. If you have multiple API servers, with DNS or other load balancing in front, it's
          important to use the address of the load balancer. This prevents {prodname} from being
          disconnected if the API server's IP changes.
        </p>

        <Tabs groupId="k8s-distro">
          <TabItem label="Generic or kubeadm" value="Generic or kubeadm-0">
            <p>
              If you created a cluster manually (for example by using <code>kubeadm</code>) then the right address to use
              depends on whether you opted for a high-availability cluster with multiple API servers or a simple one-node API
              server.
            </p>
            <ul>
              <li>
                If you opted to set up a high availability cluster then you should use the address of the load balancer that
                you used in front of your API servers. As noted in the Kubernetes documentation, a load balancer is required
                for a HA set-up but the precise type of load balancer is not specified.
              </li>
              <li>
                If you opted for a single control plane node then you can use the address of the control plane node itself.
                However, it's important that you use a <em>stable</em> address for that node such as a dedicated DNS record,
                or a static IP address. If you use a dynamic IP address (such as an EC2 private IP) then the address may
                change when the node is restarted causing {prodname} to lose connectivity to the API server.
              </li>
            </ul>
          </TabItem>
          <TabItem label="kOps" value="kOps-1">
            <p>
              When using <code>kops</code>, <code>kops</code> typically sets up a load balancer of some sort in front of the
              API server. You should use the FQDN and port of the API load balancer:{' '}
              <code>api.internal.&lt;clustername&gt;</code>.
            </p>
          </TabItem>

          <TabItem label="OpenShift" value="OpenShift-2">
            <p>
              Calico uses eBPF mode by default on OpenShift. For more information on how to install Calico on OpenShift, see{' '}
              <a href="../../getting-started/kubernetes/openshift/installation.mdx">
                Install an OpenShift 4 cluster with Calico
              </a>
              .
            </p>
          </TabItem>

          <TabItem label="AKS" value="AKS-3">
            <p>
              For AKS clusters, you should use the FQDN of your API server. This can be found by running the following
              command:
            </p>
            <CodeBlock language="bash">kubectl cluster-info</CodeBlock>
            <p>Which should give output similar to the following:</p>
            <CodeBlock language="bash">
              Kubernetes master is running at
              https://mycalicocl-calicodemorg-03a087-36558dbb.hcp.canadaeast.azmk8s.io:443
            </CodeBlock>
            <p>
              In this example, you would use <code>mycalicocl-calicodemorg-03a087-36558dbb.hcp.canadaeast.azmk8s.io</code> for{' '}
              <code>KUBERNETES_SERVICE_HOST</code> and <code>443</code> for <code>KUBERNETES_SERVICE_PORT</code> when creating
              the config map.
            </p>
          </TabItem>

          <TabItem label="EKS" value="EKS-4">
            <p>
              For an EKS cluster, it's important to use the domain name of the EKS-provided load balancer that is in front of
              the API server. This can be found by running the following command:
            </p>
            <CodeBlock language="bash">kubectl cluster-info</CodeBlock>
            <p>Which should give output similar to the following:</p>
            <CodeBlock language="bash">
              Kubernetes master is running at
              https://60F939227672BC3D5A1B3EC9744B2B21.gr7.us-west-2.eks.amazonaws.com
            </CodeBlock>
            <p>
              In this example, you would use{' '}
              <code>60F939227672BC3D5A1B3EC9744B2B21.gr7.us-west-2.eks.amazonaws.com</code> for{' '}
              <code>KUBERNETES_SERVICE_HOST</code> and <code>443</code> for <code>KUBERNETES_SERVICE_PORT</code> when creating
              the config map.
            </p>
          </TabItem>

          <TabItem label="MKE" value="MKE-11">
            <p>
              MKE runs a reverse proxy in each node which can be used to reach the api-server.{' '}
              <code>KUBERNETES_SERVICE_HOST</code> must be set to <code>proxy.local</code> and{' '}
              <code>KUBERNETES_SERVICE_PORT</code> must be set to <code>6444</code>.
            </p>
          </TabItem>
        </Tabs>        
      </When>

      <Heading
        as='h3'
        id={`install-the-tigera-operator-${props.installMode}`}
      >
        Install the Tigera Operator
      </Heading>
      <p>
        Follow the steps in the main install guide for your platform to install the Tigera Operator,
        without applying the <code>custom-resources.yaml</code> (you will update this file in a later step in this doc).
      </p>
      <p>
        For clusters in AWS, such as kOps and EKS, you must also patch the <code>tigera-operator</code> deployment
        with DNS config so the operator can resolve the API server DNS. AWS DNS server's address is 169.254.169.253.
      </p>
      <CodeBlock language="bash">{
      `kubectl patch deployment -n tigera-operator tigera-operator -p '{"spec":{"template":{"spec":{"dnsConfig":{"nameservers":["169.254.169.253"]}}}}}'`}
      </CodeBlock> 

      <When condition={props.installMode=="manual"}>
        <Heading
          as='h3'
          id='create-the-config-map'
        >
          Create the Config Map
        </Heading>
        <p>
          Create the following config map in the <code>tigera-operator</code> namespace using the host and port determined above:
        </p>
        <CodeBlock language="yaml">{
`kubectl apply -f - <<EOF
kind: ConfigMap
apiVersion: v1
metadata:
  name: kubernetes-services-endpoint
  namespace: tigera-operator
data:
  KUBERNETES_SERVICE_HOST: "<API server host>"
  KUBERNETES_SERVICE_PORT: "<API server port>"
EOF`}
        </CodeBlock>
      </When>

      <Heading
        as='h3'
        id={`tweak-and-apply-installation-custom-resources-${props.installMode}`}
      >
        Tweak and apply installation Custom Resources
      </Heading>
      <p>
        When the main install guide tells you to apply the <code>custom-resources.yaml</code>, typically by running <code>kubectl create</code> with the URL of the file directly, you should instead download the file, so that you can edit it:
      </p>

      <CodeBlock language="bash">{`curl -o custom-resources.yaml ${manifestsUrl}/manifests/custom-resources.yaml`}</CodeBlock>

      <p>
        Edit the file in your editor of choice and find the <code>Installation</code> resource, which should be at the top of the file. To enable eBPF mode, we need to add a new <code>calicoNetwork</code> section inside the <code>spec</code> of the Installation resource, including the 
        {props.installMode=="auto" && <span><code>bpfNetworkBootstrap</code>, <code>kubeProxyManagement</code> and the <code>linuxDataplane</code> fields. </span>}
        {props.installMode=="manual" &&<span> <code>linuxDataplane</code> field. </span>}
        For EKS Bottlerocket OS only, you should also add the <code>flexVolumePath</code> setting as shown below.
      </p>

      <p>For example:</p>
      <CodeBlock language="yaml">{
`# This section includes base ${prodname} installation configuration.

apiVersion: operator.tigera.io/v1
kind: Installation
metadata:
  name: default
spec:
  # Added calicoNetwork section with linuxDataplane field
  calicoNetwork:
    linuxDataplane: BPF${props.installMode === "auto" ? '\n    bpfNetworkBootstrap: Enabled\n    kubeProxyManagement: Enabled' : ''}

  # EKS with Bottlerocket as node image only:
  # flexVolumePath: /var/lib/kubelet/plugins

  # Install Calico Open Source
  variant: Calico

# This section configures the Calico API server.

apiVersion: operator.tigera.io/v1
kind: APIServer 
metadata: 
  name: default 
spec: {}`}
      </CodeBlock>

      <p>Then apply the edited file:</p>
      <CodeBlock language="bash">{`kubectl create -f custom-resources.yaml`}</CodeBlock>

      <Admonition type="tip" title="Tip">
        <p>
          If you already created the custom resources, you can switch your cluster over to eBPF mode by updating the installation resource. The operator will automatically roll out the change.
        </p>
        <CodeBlock language="bash">{`kubectl patch installation.operator.tigera.io default --type merge -p '{"spec":{"calicoNetwork":{"linuxDataplane":"BPF", ${props.installMode === "auto" ? '"bpfNetworkBootstrap":"Enabled", "kubeProxyManagement":"Enabled", ' : ''}"hostPorts":null}}}'`}</CodeBlock>
      </Admonition>

      <Heading
        as='h3'
        id={`monitor-the-progress-of-the-installation-${props.installMode}`}
      >
        Monitor the progress of the installation
      </Heading>
      <p>You can monitor progress of the installation with the following command:</p>
      <CodeBlock language="bash">{`watch kubectl get tigerastatus`}</CodeBlock>

      <Heading
        as='h3'
        id={`disable-kube-proxy-or-avoid-conflicts-${props.installMode}`}
      >
        Disable <code>kube-proxy</code> (or avoid conflicts)
      </Heading>
      <p>
        In eBPF mode, to avoid conflicts with <code>kube-proxy</code> it's necessary to either disable <code>kube-proxy</code> or configure {prodname} not to clean up <code>kube-proxy</code>'s iptables rules.
        If you didn't disable <code>kube-proxy</code> when starting your cluster, follow the steps below to avoid conflicts:
      </p>

      <Tabs groupId="k8s-distro">
        <TabItem value="Generic or kubeadm-0" label="Generic or kubeadm">
          <p>
            For a cluster that runs <code>kube-proxy</code> in a <code>DaemonSet</code> (such as a <code>kubeadm</code>-created cluster),
            you can disable <code>kube-proxy</code> reversibly by adding a node selector that matches no nodes:
          </p>
          <CodeBlock language="bash">
  {`kubectl patch ds -n kube-system kube-proxy -p '{"spec":{"template":{"spec":{"nodeSelector":{"non-calico": "true"}}}}}'`}
          </CodeBlock>
          <p>
            To re-enable <code>kube-proxy</code>, simply remove the node selector.
          </p>
        </TabItem>

        <TabItem value="kOps-1" label="kOps">
          <p>
            <code>kops</code> allows <code>kube-proxy</code> to be disabled by setting the following in your config:
          </p>
          <CodeBlock language="yaml">
  {`kubeProxy:
    enabled: false`}
          </CodeBlock>
          <p>
            Then run <code>kops update cluster</code> to apply the change.
          </p>
        </TabItem>

        <TabItem value="OpenShift-2" label="OpenShift">
          <p>
            In OpenShift, you can disable <code>kube-proxy</code> as follows:
          </p>
          <p>
            Calico uses eBPF mode by default on OpenShift. For more information, see{' '}
            <a href="../../getting-started/kubernetes/openshift/installation.mdx">
              Install an OpenShift 4 cluster with Calico
            </a>.
          </p>
        </TabItem>

        <TabItem value="AKS-3" label="AKS">
          <p>
            AKS with Azure CNI does not allow <code>kube-proxy</code> to be disabled, as it's managed by the add-on manager.
            To prevent conflicts with {prodname}, disable iptables cleanup with:
          </p>
          <CodeBlock language="bash">
  {`kubectl patch felixconfiguration default --type merge --patch='{"spec": {"bpfKubeProxyIptablesCleanupEnabled": false}}'`}
          </CodeBlock>
        </TabItem>

        <TabItem value="EKS-4" label="EKS">
          <p>
            In EKS, you can disable <code>kube-proxy</code> by adding a node selector that matches no nodes:
          </p>
          <CodeBlock language="bash">
  {`kubectl patch ds -n kube-system kube-proxy -p '{"spec":{"template":{"spec":{"nodeSelector":{"non-calico": "true"}}}}}'`}
          </CodeBlock>
          <p>
            To re-enable <code>kube-proxy</code>, remove the node selector.
          </p>
        </TabItem>
      </Tabs>

      <Admonition type="note" title="NOTE">
        If you are running <code>kube-proxy</code> in IPVS mode, switch to iptables mode before disabling.
      </Admonition>

    </>
  );
}
