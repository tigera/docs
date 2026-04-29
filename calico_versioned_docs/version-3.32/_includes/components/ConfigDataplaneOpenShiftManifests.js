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
      Calico manifests for OpenShift are ready to configure and install the <strong>eBPF</strong> data plane. The steps in the <strong>eBPF (recommended)</strong> tab below will guide you through the process. You can also select a different tab to follow the steps for configuring another data plane.
      </p>
      <Tabs>
      <TabItem label="eBPF (recommended)" value="eBPF">
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
                {`API_SERVER_URL=$(cat manifests/cluster-infrastructure-02-config.yml | sed -n 's/.*apiServerInternalURI: https:\\/\\/\\(api-int\\.[^:]*\\).*/\\1/p') && \\
sed -i "s|^\\([^:]*KUBERNETES_SERVICE_HOST: \\).*\\$|\\1\\"$API_SERVER_URL\\"|" manifests/01-configmap-kubernetes-services-endpoint.yaml`}
                </CodeBlock>
              </Then>
              <Else>
                <p>
                  Set the <code>KUBERNETES_SERVICE_HOST</code> attribute in the <code>{props.folderName}/01-configmap-kubernetes-services-endpoint.yaml</code> file.
                  You can use the <code>oc config view</code> command to look at the <code>server</code> attribute for the cluster.
                  The following extracts the URL from the <code>oc config view</code> command and sets it.
                </p>
                <CodeBlock language='bash'>
                {`API_SERVER_URL=$(oc config view | sed -n 's/.*server: https:\\/\\/\\([^:]*\\).*/\\1/p') && \\
sed -i "s|^\\([^:]*KUBERNETES_SERVICE_HOST: \\).*\\$|\\1\\"$API_SERVER_URL\\"|" ${props.folderName}/01-configmap-kubernetes-services-endpoint.yaml`}
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
            <If condition={props.hostedControlPlane}>
              <li>
                <p>
                  Disable kube-proxy in the OpenShift Cluster Network Operator:
                </p>
                <CodeBlock language='bash'>
                {`oc patch network.operator.openshift.io cluster --type merge --patch '{"spec":{"deployKubeProxy":false}}'`}
                </CodeBlock>
              </li>
            </If>
        </ol>
      </TabItem>
      <TabItem label="Iptables" value="iptables">
        <p>
          To install Calico with iptables, you need to:
        </p>
        <ol>
          <li>
            <p>
              Set <code>linuxDataplane</code> to <code>Iptables</code> in the <code>{props.folderName}/03-cr-installation.yaml</code> file.
            </p>
          </li>
          <li>
            <p>
              Remove the <code>{props.folderName}/cluster-network-operator.yaml</code> and <code>{props.folderName}/01-configmap-kubernetes-services-endpoint.yaml</code> files.
            </p>
          </li>
        </ol>
        <p>
          You can do it by running the following command:
        </p>
        <CodeBlock language='bash'>
          {`sed -i 's/^\\(\\s*linuxDataplane:\\s*\\)BPF/\\1Iptables/' ${props.folderName}/03-cr-installation.yaml && \\
rm -f ${props.folderName}/cluster-network-operator.yaml && \\
rm -f ${props.folderName}/01-configmap-kubernetes-services-endpoint.yaml`}
        </CodeBlock>
      </TabItem>
{/*
      <TabItem label="Nftables" value="nftables">
        <p>
          To install Calico with nftables, you need to:
        </p>
        <ol>
          <li>
            <p>
              Set <code>linuxDataplane</code> to <code>Nftables</code> in the <code>{props.folderName}/03-cr-installation.yaml</code> file.
            </p>
          </li>
          <li>
            <p>
              Remove the <code>{props.folderName}/cluster-network-operator.yaml</code> and <code>{props.folderName}/01-configmap-kubernetes-services-endpoint.yaml</code> files.
            </p>
          </li>
        </ol>
        <p>
          You can do it by running the following command:
        </p>
        <CodeBlock language='bash'>
          {`sed -i 's/^\\(\\s*linuxDataplane:\\s*\\)BPF/\\1Nftables/' ${props.folderName}/03-cr-installation.yaml && \\
rm -f ${props.folderName}/cluster-network-operator.yaml && \\
rm -f ${props.folderName}/01-configmap-kubernetes-services-endpoint.yaml`}
        </CodeBlock>
      </TabItem>
*/}
      </Tabs>
    </>
  );
}
