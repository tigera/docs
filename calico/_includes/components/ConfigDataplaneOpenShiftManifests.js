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
      Configure the Data plane
    </Heading>    
    <Tabs>
      <TabItem label="eBPF" value="eBPF">
          <p>
            Calico uses eBPF data plane by default. To configure it you need to set the <code>KUBERNETES_SERVICE_HOST</code> attribute in <code>{props.folderName}/01-configmap-kubernetes-services-endpoint.yaml</code> file:
          </p>    
          <If condition={!props.hostedControlPlane}>
            <Then>
              <CodeBlock language='bash'>
                {`CLUSTER_NAME=\`grep -o '"ClusterName": "[^"]*' .openshift_install_state.json | sed 's/"ClusterName": "//'\` && \\
BASE_DOMAIN=\`grep -o '"BaseDomain": "[^"]*' .openshift_install_state.json | sed 's/"BaseDomain": "//'\` && \\
sed -i "s|<cluster_name>|$CLUSTER_NAME|g" ${props.folderName}/01-configmap-kubernetes-services-endpoint.yaml && \\
sed -i "s|<base_domain>|$BASE_DOMAIN|g" ${props.folderName}/01-configmap-kubernetes-services-endpoint.yaml`}
              </CodeBlock>
            </Then>
            <Else>
              <CodeBlock language='bash'>
                {`sed -i "s|<cluster_name>|$HOSTED_CLUSTER_NAME|g" ${props.folderName}/01-configmap-kubernetes-services-endpoint.yaml && \\
sed -i "s|<base_domain>|$BASE_DOMAIN|g" ${props.folderName}/01-configmap-kubernetes-services-endpoint.yaml`}
              </CodeBlock>
            </Else>        
          </If>
          <p>
            And also, to include <code>spec.template.spec.dnsConfig.nameservers</code> value to resolve the apiserver DNS in{' '}
            <code>{props.folderName}/02-tigera-operator.yaml</code> file. For clusters in AWS, the DNS server address is 169.254.169.253.
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
        </TabItem>
          <TabItem label="Iptables" value="Iptables">
          <p>
            As of <b>v3.30</b>, Calico uses the eBPF data plane by default on OpenShift. If you prefer to install Calico with Iptables, you can configure it by running the following command:
          </p>
          <CodeBlock language='bash'>
            {`sed -i 's/^\\(\\s*linuxDataplane:\\s*\\)BPF/\\1Iptables/' ${props.folderName}/01-cr-installation.yaml && \\
sed -i 's/^\\(\\s*deployKubeProxy:\\s*\\)false/\\1true/' ${props.folderName}/cluster-network-operator.yaml && \\
sed -i '/^\\s*KUBERNETES_SERVICE_HOST:/s/^\\(\\s*\\)/#\\1/' ${props.folderName}/01-configmap-kubernetes-services-endpoint.yaml && \\
sed -i '/^\\s*KUBERNETES_SERVICE_PORT:/s/^\\(\\s*\\)/#\\1/' ${props.folderName}/01-configmap-kubernetes-services-endpoint.yaml`}
          </CodeBlock>  
        </TabItem>      
      </Tabs>
  
    </>
  );
}
