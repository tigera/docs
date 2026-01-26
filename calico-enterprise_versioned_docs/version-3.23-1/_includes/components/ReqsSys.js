import React from 'react';

import Admonition from '@theme/Admonition';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';

import { orchestrators } from '@site/variables';
import { prodname, baseUrl } from '../../variables';

function NodeRequirementsEnt(props) {
  return (
    <>
      <Heading
        as='h2'
        id='node-requirements'
      >
        Node requirements
      </Heading>
      <ul>
        <li>
          <p>x86-64 or arm64 processor with at least 2 cores, 8.0GB RAM and 20 GB free disk space</p>
        </li>
        <li>
          <p>
            Linux kernel 5.10 or later with <Link href='#kernel-dependencies'>required dependencies</Link>. The
            following distributions have the required kernel, its dependencies, and are known to work well with{' '}
            {prodname} and {props.orch}.
          </p>
          <ul>
            {(props.orch === orchestrators.Kubernetes || props.orch === orchestrators.HostProtection) && (
              <>
                <li>Ubuntu 20.04 and 22.04</li>
                <li>RHEL 8 and 9</li>
                <li>Debian 10</li>
                <li>Azure Linux Container Host</li>
              </>
            )}
            {props.orch === orchestrators.OpenShift && (
              <>
                <li>Red Hat Enterprise Linux CoreOS</li>
              </>
            )}
            {props.orch === orchestrators.OpenStack && (
              <>
                <li>Ubuntu 20.04 and 22.04</li>
                <li>CentOS 8</li>
              </>
            )}
          </ul>
        </li>
        <li>
          <p>
            If your node is running RHEL 8 or RHEL 9, you must install a specialized policy package before you install {prodname}.
            With this package, {prodname} can use SELinux contexts in a series of rules that allow it to interact with persistent and ephemeral data in nonstandard host system locations.
          </p>
          <ul>
            <li>
              <p>If your node has RHEL 8 installed, then run the following command:</p>
              <CodeBlock language="bash">
                {`dnf install https://downloads.tigera.io/ee/archives/calico-selinux-1.0-1.el8.noarch.rpm`}
              </CodeBlock>
            </li>
            <li>
              <p>If your node has RHEL 9 installed, then run the following command:</p>
              <CodeBlock language="bash">
                {`dnf install https://downloads.tigera.io/ee/archives/calico-selinux-1.0-1.el9.noarch.rpm`}
              </CodeBlock>
            </li>
          </ul>
        </li>
        <li>
          <p>
            {prodname} must be able to manage <code>cali*</code>
            interfaces on the host. When IPIP is enabled (the default),
            {prodname} also needs to be able to manage <code>tunl*</code>
            interfaces. When VXLAN is enabled, {prodname} also needs to be able to manage the <code>vxlan.calico</code>{' '}
            interface.
          </p>
          <Admonition type='note'>
            <p>
              Many Linux distributions, such as most of the above, include NetworkManager. By default, NetworkManager
              does not allow
              {prodname} to manage interfaces. If your nodes have NetworkManager, complete the steps in{' '}
              <Link href={`${baseUrl}/operations/troubleshoot/troubleshooting#configure-networkmanager`}>
                Preventing NetworkManager from controlling {prodname} interfaces
              </Link>{' '}
              before installing {prodname}.
            </p>
          </Admonition>
        </li>
        <li>
          <p>
            If your Linux distribution comes with installed Firewalld or another iptables manager it should be disabled.
            These may interfere with rules added by {prodname} and result in unexpected behavior.
          </p>
          <Admonition type='note'>
            <p>
              If a host firewall is needed, it can be configured by {prodname} HostEndpoint and GlobalNetworkPolicy.
              More information about configuration at <Link href={`${baseUrl}/network-policy/hosts`}>Security for host</Link>.
            </p>
          </Admonition>
        </li>
        <li>
          <p>
            In order to properly run Elasticsearch, nodes must be configured according to the{' '}
            <Link href='https://www.elastic.co/guide/en/elasticsearch/reference/current/system-config.html'>
              Elasticsearch system configuration documentation.
            </Link>
          </p>
        </li>
        <li>
          <p>
            The Typha autoscaler requires a minimum number of Linux worker nodes based on total number of schedulable
            nodes.
          </p>
          <table>
            <thead>
              <tr className='header'>
                <th>Total schedulable nodes</th>
                <th>Required Linux nodes for Typha replicas</th>
              </tr>
            </thead>
            <tbody>
              <tr className='odd'>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr className='even'>
                <td>2</td>
                <td>2</td>
              </tr>
              <tr className='odd'>
                <td>3</td>
                <td>3</td>
              </tr>
              <tr className='even'>
                <td>up to 250</td>
                <td>4</td>
              </tr>
              <tr className='odd'>
                <td>up to 500</td>
                <td>5</td>
              </tr>
              <tr className='even'>
                <td>up to 1000</td>
                <td>6</td>
              </tr>
              <tr className='odd'>
                <td>up to 1500</td>
                <td>7</td>
              </tr>
              <tr className='even'>
                <td>up to 2000</td>
                <td>8</td>
              </tr>
              <tr className='odd'>
                <td>2000 or more</td>
                <td>10</td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </>
  );
}

function NetworkRequirementsEnt(props) {
  return (
    <>
      <Heading
        as='h2'
        id='network-requirements'
      >
        Network requirements
      </Heading>
      <p>
        Ensure that your hosts and firewalls allow the necessary traffic based on your configuration. See{' '}
        <Link href={`${baseUrl}/reference/architecture/overview`}>Component architecture</Link> to view the following
        components.
      </p>
      <table>
        <colgroup>
          <col style={{ width: '27%' }} />
          <col style={{ width: '46%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <thead>
          <tr className='header'>
            <th>Configuration</th>
            <th>Host(s)</th>
            <th>Port/protocol</th>
          </tr>
        </thead>
        <tbody>
          <tr className='odd'>
            <td>
              <strong>{prodname} networking options</strong>
            </td>
            <td>IP-in-IP (default)</td>
            <td>Protocol number 4</td>
          </tr>
          <tr className='even'>
            <td></td>
            <td>BGP</td>
            <td>TCP 179</td>
          </tr>
          <tr className='odd'>
            <td></td>
            <td>VXLAN</td>
            <td>UDP 4789</td>
          </tr>
          <tr className='even'>
            <td></td>
            <td>Wireguard</td>
            <td>UDP 51820 (default)</td>
          </tr>
          <tr className='odd'>
            <td></td>
            <td>IPv6 Wireguard</td>
            <td>UDP 51821 (default)</td>
          </tr>
          <tr className='even'>
            <td>
              <strong>Cluster scaling</strong>
            </td>
            <td>Any {prodname} networking option above with Typha agents enabled</td>
            <td>TCP 5473 (default)</td>
          </tr>
          {props.orch === orchestrators.Kubernetes && (
            <>
              <tr className='odd'>
                <td>
                  <strong>APIs</strong>
                </td>
                <td>Kubernetes API (kube-apiserver) to access Kubernetes API datastore</td>
                <td>Often TCP 443 or 6443*</td>
              </tr>
              <tr className='even'>
                <td></td>
                <td>{prodname} API server</td>
                <td>TCP 8080 and 5443 (default)</td>
              </tr>
            </>
          )}
          {props.orch === orchestrators.OpenShift && (
            <>
              <tr className='odd'>
                <td>
                  <strong>APIs</strong>
                </td>
                <td>Kubernetes API (kube-apiserver) to access Kubernetes API datastore</td>
                <td>Often TCP 443 or 8443*</td>
              </tr>
              <tr className='even'>
                <td></td>
                <td>{prodname} API server</td>
                <td>TCP 8080 and 5443 (default)</td>
              </tr>
            </>
          )}
          <tr className='odd'>
            <td>
              <strong>Nodes</strong>
            </td>
            <td>calico-node (Felix, BIRD, confd)</td>
            <td>TCP 9090 (default)</td>
          </tr>
          <tr className='even'>
            <td>
              <strong>Component metrics</strong>
            </td>
            <td>Prometheus metrics</td>
            <td>TCP 9081 (default)</td>
          </tr>
          <tr className='odd'>
            <td></td>
            <td>Prometheus BGP metrics</td>
            <td>TCP 9900 (default)</td>
          </tr>
          <tr className='even'>
            <td></td>
            <td>Prometheus API service</td>
            <td>TCP 9090 (default)</td>
          </tr>
          <tr className='odd'>
            <td></td>
            <td>Prometheus Alertmanager</td>
            <td>TCP 9093 (default)</td>
          </tr>
          <tr className='even'>
            <td>
              <strong>Logs and storage</strong>
            </td>
            <td>Elasticsearch with fluentd datastore</td>
            <td>TCP 9200 (default)</td>
          </tr>
          <tr className='odd'>
            <td></td>
            <td>Elasticssearch for cloud (ECK)</td>
            <td>TCP 9443 (default)</td>
          </tr>
          <tr className='even'>
            <td></td>
            <td>Elasticsearch gateway</td>
            <td>TCP 5444 (default)</td>
          </tr>
          <tr className='odd'>
            <td>
              <strong>Visibility and troubleshooting</strong>
            </td>
            <td>Kibana</td>
            <td>TCP 5601 (default)</td>
          </tr>
          <tr className='even'>
            <td></td>
            <td>Packet capture API</td>
            <td>TCP 8444 (default)</td>
          </tr>
          <tr className='odd'>
            <td></td>
            <td>{prodname} Manager UI</td>
            <td>TCP 9443 (default)</td>
          </tr>
          <tr className='even'>
            <td>
              <strong>Intrusion Detection System (IDS)</strong>
            </td>
            <td>{prodname} intrusion detection</td>
            <td>TCP 5443 (default)</td>
          </tr>
          <tr className='odd'>
            <td>
              <strong>Compliance</strong>
            </td>
            <td>{prodname} compliance</td>
            <td>TCP 5443 (default)</td>
          </tr>
          <tr className='even'>
            <td>
              <strong>Multi-cluster management</strong>
            </td>
            <td>Additional port required for Manager UI</td>
            <td>TCP 9449</td>
          </tr>
         <tr className='odd'>
            <td>
              <strong>Egress gateway</strong>
            </td>
            <td>{prodname} egress gateway </td>
            <td>UDP 4790 </td>
          </tr>
        </tbody>
      </table>
      {(props.orch === orchestrators.Kubernetes || props.orch === orchestrators.OpenShift) && (
        <>
          <p>
            *{' '}
            <em>
              The value passed to kube-apiserver using the <code>--secure-port</code>
              flag. If you cannot locate this, check the <code>targetPort</code> value returned by &nbsp;
              <code>kubectl get svc kubernetes -o yaml</code>.
            </em>
          </p>
        </>
      )}
      {props.orch === orchestrators.OpenStack && (
        <p>
          *{' '}
          <em>
            If your compute hosts connect directly and don’t use IP-in-IP, you don’t need to allow IP-in-IP traffic.
          </em>
        </p>
      )}
    </>
  );
}

function Privileges(props) {
  return (
    <>
      <Heading
        as='h2'
        id='privilege-requirements'
      >
        Privilege requirements
      </Heading>
      <p>
        Ensure that {prodname} has the <code>CAP_SYS_ADMIN</code> privilege.
      </p>
      <p>
        The simplest way to provide the necessary privilege is to run {prodname} as root or in a privileged container.
      </p>
      {props.orch === orchestrators.Kubernetes && (
        <>
          <p>
            When installed as a Kubernetes daemon set, {prodname} meets this requirement by running as a privileged
            container. This requires that the kubelet be allowed to run privileged containers. There are two ways this
            can be achieved.
          </p>
          <ul>
            <li>
              Specify <code>--allow-privileged</code> on the kubelet (deprecated).
            </li>
            <li>
              Use a{' '}
              <Link href='https://kubernetes.io/docs/concepts/policy/pod-security-policy/'>pod security policy</Link>.
            </li>
          </ul>
        </>
      )}
    </>
  );
}

export default function ReqsSys(props) {
  return (
    <>
      <NodeRequirementsEnt {...props} />
      <NetworkRequirementsEnt {...props} />
      <Privileges {...props} />
    </>
  );
}
