import React from 'react';
import { If, Then, Else } from 'react-if';

import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default function ConfigDataplaneOpenShiftManifests(props) {
  return (
    <>
      <Heading
        as='h3'
        id='choose-dataplane'
      >
        Select and configure a data plane
      </Heading>
      <p>
        Calico supports two data plane options for installations on OpenShift: <strong>eBPF</strong> and <strong>iptables</strong>. You need to choose one and configure it.
      </p>
      <Heading
        as='h4'
        id='bpf-dataplane'
      >
        Option1: eBPF data plane (recommended)
      </Heading>      
      <p>
        To configure the eBPF data plane, you need to:
      </p>    
      <ol>
        <li>
          <If condition={!props.hostedControlPlane}>
            <Then>
              <p>
                Set the <code>KUBERNETES_SERVICE_HOST</code> attribute in the <code>{props.folderName}/01-configmap-kubernetes-services-endpoint.yaml</code> file.
                The following command extracts the <code>apiServerURL</code> from the <code>manifests/cluster-infrastructure-02-config.yml</code> file and sets it.
              </p>              
              <CodeBlock language='bash'>
                {`API_SERVER_URL=$(cat manifests/cluster-infrastructure-02-config.yml | sed -n 's/.*apiServerURL: https:\\/\\/\\(api\\.[^:]*\\).*/\\1/p') && \\
sed -i "s|^\\([^:]*KUBERNETES_SERVICE_HOST: \\).*\\$|\\1\\"$API_SERVER_URL\\"|" manifests/01-configmap-kubernetes-services-endpoint.yaml`}
              </CodeBlock>
            </Then>
            <Else>
              <p>
                Set the <code>KUBERNETES_SERVICE_HOST</code> attribute in the <code>{props.folderName}/01-configmap-kubernetes-services-endpoint.yaml</code> file.
                The following command sets it, assuming that the <code>$HOSTED_CLUSTER_NAME</code> and <code>$BASE_DOMAIN</code> variables were already set in the previous <strong>Create a hosted cluster</strong> step.
              </p>
              <CodeBlock language='bash'>
                {`sed -i "s|<cluster_name>|$HOSTED_CLUSTER_NAME|g" ${props.folderName}/01-configmap-kubernetes-services-endpoint.yaml && \\
sed -i "s|<base_domain>|$BASE_DOMAIN|g" ${props.folderName}/01-configmap-kubernetes-services-endpoint.yaml`}
              </CodeBlock>
            </Else>        
          </If>
        </li>
        <li>
          <p>
            Include the following <code>spec.template.spec.dnsConfig.nameservers</code> block to resolve the apiserver DNS in the <code>{props.folderName}/02-tigera-operator.yaml</code> file. For clusters in AWS, the DNS server address is 169.254.169.253.
          </p>
          <CodeBlock language='yaml'>
          {`spec:
  template:
    spec:
      (...)    
      dnsConfig:
        nameservers:
        - 169.254.169.253 # AWS DNS server`}
          </CodeBlock>
        </li>
      </ol>
      <Heading
        as='h4'
        id='iptables-dataplane'
      >
        Option2: Iptables data plane
      </Heading>           
      <p>
        To install Calico with iptables, you need to:
      </p>
      <ol>
        <li>
          <p>
            Set <code>linuxDataplane</code> to <code>Iptables</code> in the <code>{props.folderName}/01-cr-installation.yaml</code> file.
          </p>
        </li>
        <li>
          <p>
            Set <code>deployKubeProxy</code> to <code>true</code> in the <code>{props.folderName}/cluster-network-operator.yaml</code> file.
          </p>
        </li>
        <li>
          <p>
            Comment out the <code>KUBERNETES_SERVICE_HOST</code> and <code>KUBERNETES_SERVICE_PORT</code> attributes in the <code>{props.folderName}/01-configmap-kubernetes-services-endpoint.yaml</code> file.
          </p>
        </li>
      </ol>
      <p>
        You can do it by running the following command:
      </p>
      <CodeBlock language='bash'>
        {`sed -i 's/^\\(\\s*linuxDataplane:\\s*\\)BPF/\\1Iptables/' ${props.folderName}/01-cr-installation.yaml && \\
sed -i 's/^\\(\\s*deployKubeProxy:\\s*\\)false/\\1true/' ${props.folderName}/cluster-network-operator.yaml && \\
sed -i '/^\\s*KUBERNETES_SERVICE_HOST:/s/^\\(\\s*\\)/#\\1/' ${props.folderName}/01-configmap-kubernetes-services-endpoint.yaml && \\
sed -i '/^\\s*KUBERNETES_SERVICE_PORT:/s/^\\(\\s*\\)/#\\1/' ${props.folderName}/01-configmap-kubernetes-services-endpoint.yaml`}
      </CodeBlock>  
    </>
  );
}
