import React from 'react';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';

import { prodname, baseUrl } from '../../variables';

export default function EnvironmentFile(props) {
  if (props.target === 'felix') {
    var etcd_endpoints = 'FELIX_ETCDENDPOINTS';
    var etcd_cert_file = 'FELIX_ETCDCERTFILE';
    var etcd_key_file = 'FELIX_ETCDKEYFILE';
    var etcd_ca_file = 'FELIX_ETCDCAFILE';
    var datastore_type = 'FELIX_DATASTORETYPE';
  } else {
    var etcd_endpoints = 'ETCD_ENDPOINTS';
    var etcd_cert_file = 'ETCD_CERT_FILE';
    var etcd_key_file = 'ETCD_KEY_FILE';
    var etcd_ca_file = 'ETCD_CA_CERT_FILE';
    var datastore_type = 'DATASTORE_TYPE';
  }

  return (
    <>
      <p>
        <span>
          Use the following guidelines and sample file to define the environment variables for starting Calico on the
          host. For more help, see the{' '}
        </span>
        {props.install === 'container' ? (
          <Link href={`${baseUrl}/reference/configure-calico-node`}>{props.nodecontainer} configuration reference</Link>
        ) : (
          <Link href={`${baseUrl}/reference/felix/configuration`}>Felix configuration reference</Link>
        )}
      </p>
      <Tabs>
        <TabItem
          label='Kubernetes datastore'
          value='Kubernetes datastore'
        >
          <p>For a Kubernetes datastore (default) set the following:</p>
          <table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Configuration guidance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>FELIX_DATASTORETYPE</td>
                <td>
                  Set to <code>kubernetes</code>
                </td>
              </tr>
              <tr>
                <td>KUBECONFIG</td>
                <td>Path to kubeconfig file to access the Kubernetes API Server</td>
              </tr>
            </tbody>
          </table>
          {props.install === 'container' && (
            <Admonition type='note'>
              You will need to volume mount the kubeconfig file into the container at the location specified by the
              paths mentioned above.
            </Admonition>
          )}
        </TabItem>
        <TabItem
          label='etcd datastore'
          value='etcd datastore'
        >
          <p>For an etcdv3 datastore set the following:</p>
          <table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Configuration guidance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{datastore_type}</td>
                <td>
                  Set to <code>etcdv3</code>
                </td>
              </tr>
              <tr>
                <td>{etcd_endpoints}</td>
                <td>Comma separated list of etcdv3 cluster URLs, e.g. https://calico-datastore.example.com:2379</td>
              </tr>
              <tr>
                <td>{etcd_ca_file}</td>
                <td>
                  Path to CA certificate to validate etcd’s server cert. Required if using TLS and not using a public
                  CA.
                </td>
              </tr>
              <tr>
                <td>
                  {etcd_cert_file}
                  <br />
                  {etcd_key_file}
                </td>
                <td>Paths to certificate and keys used for client authentication to the etcd cluster, if enabled.</td>
              </tr>
            </tbody>
          </table>
          {props.install === 'container' && (
            <Admonition type='note'>
              If using certificates and keys, you will need to volume mount them into the container at the location
              specified by the paths mentioned above.
            </Admonition>
          )}
        </TabItem>
        <TabItem
          label='Either datastore'
          value='Either datastore'
        >
          <p>For either datastore set the following:</p>
          <table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Configuration guidance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CALICO_NODENAME</td>
                <td>
                  Identifies the node. If a value is not specified, the compute server hostname is used to identify the
                  Calico node.
                </td>
              </tr>
              <tr>
                <td>CALICO_IP or CALICO_IP6</td>
                <td>
                  If values are not specified for both, {prodname} uses the currently-configured values for the next hop
                  IP addresses for this node—these can be configured through the Node resource. If no next hop addresses
                  are configured, {prodname} automatically determines an IPv4 next hop address by querying the host
                  interfaces (and configures this value in the Node resource). You can set CALICO_IP to{' '}
                  <code>autodetect</code> for force auto-detection of IP address every time the node starts. If you set
                  IP addresses through these environment variables, it reconfigures any values currently set through the
                  Node resource.
                </td>
              </tr>
              <tr>
                <td>CALICO_AS</td>
                <td>
                  If not specified, {prodname} uses the currently configured value for the AS Number for the node BGP
                  client—this can be configured through the Node resource. If the Node resource value is not set, Calico
                  inherits the AS Number from the global default value. If you set a value through this environment
                  variable, it reconfigures any value currently set through the Node resource.
                </td>
              </tr>
              <tr>
                <td>NO_DEFAULT_POOLS</td>
                <td>
                  Set to true to prevent {prodname} from creating a default pool if one does not exist. Pools are used
                  for workload endpoints and not required for non-cluster hosts.
                </td>
              </tr>
              <tr>
                <td>CALICO_NETWORKING_BACKEND</td>
                <td>
                  The networking backend to use. In <code>bird</code> mode, Calico will provide BGP networking using the
                  BIRD BGP daemon; VXLAN networking can also be used. In <code>vxlan</code> mode, only VXLAN networking
                  is provided; BIRD and BGP are disabled. If you want to run Calico for policy only, set to{' '}
                  <code>none</code>.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Sample <code>EnvironmentFile</code> - save to <code>/etc/calico/calico.env</code>
          </p>
          <CodeBlock language='bash'>
            {`${datastore_type}=etcdv3
${etcd_endpoints}=https://calico-datastore.example.com:2379
${etcd_ca_file}="/pki/ca.pem"
${etcd_cert_file}="/pki/client-cert.pem"
${etcd_key_file}="/pki/client-key.pem"`}
            {props.install === 'container'
              ? `
CALICO_NODENAME=""
NO_DEFAULT_POOLS="true"
CALICO_IP=""
CALICO_IP6=""
CALICO_AS=""
CALICO_NETWORKING_BACKEND=bird`
              : ''}
          </CodeBlock>
        </TabItem>
      </Tabs>
    </>
  );
}
