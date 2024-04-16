import React from 'react';

import Admonition from '@theme/Admonition';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import { orchestrators } from '@site/variables';
import { prodname, baseUrl } from '../../variables';

function NodeRequirementsOSS(props) {
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
          <p>x86-64, arm64, ppc64le, or s390x processor</p>
        </li>
        <li>
          <p>
            {prodname} must be able to manage <code>cali*</code> interfaces on the host. When IPIP is enabled (the
            default), {prodname} also needs to be able to manage <code>tunl*</code> interfaces. When VXLAN is enabled,{' '}
            {prodname} also needs to be able to manage the
            <code>vxlan.calico</code> interface.
          </p>
        </li>
        <li>
          <p>
            Linux kernel 3.10 or later with <Link href='#kernel-dependencies'>required dependencies</Link>. The
            following distributions have the required kernel, its dependencies, and are known to work well with{' '}
            {prodname} and {props.orch}.
          </p>
          <ul>
            <li>RedHat Linux 7</li>
            {(props.orch === orchestrators.Kubernetes || props.orch === orchestrators.HostProtection) && (
              <>
                <li>CentOS 7</li>
                <li>Flatcar Container Linux</li>
                <li>Fedora CoreOS</li>
                <li>Ubuntu 18.04</li>
                <li>Debian 8</li>
              </>
            )}
            {props.orch === orchestrators.OpenShift && (
              <>
                <li>RedHat Container OS</li>
              </>
            )}
            {props.orch === orchestrators.OpenStack && (
              <>
                <li>Ubuntu 18.04</li>
                <li>CentOS 8</li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </>
  );
}

function NotesOSS() {
  return (
    <>
      <div className='note'>
        <Admonition type='note'>
          <p>
            Many Linux distributions, such as most of the above, include NetworkManager. By default, NetworkManager does
            not allow {prodname} to manage interfaces. If your nodes have NetworkManager, complete the steps in{' '}
            <Link href={`${baseUrl}/operations/troubleshoot/troubleshooting#configure-networkmanager`}>
              Preventing NetworkManager from controlling {prodname} interfaces
            </Link>{' '}
            before installing {prodname}.
          </p>
        </Admonition>
      </div>
      <ul>
        <li>
          If your Linux distribution comes with installed Firewalld or another iptables manager it should be disabled.
          These may interfere with rules added by {prodname} and result in unexpected behavior.
        </li>
      </ul>
      <div className='note'>
        <Admonition type='note'>
          <p>
            If a host firewall is needed, it can be configured by {prodname} HostEndpoint and GlobalNetworkPolicy. More
            information about configuration at <Link href={`${baseUrl}/network-policy/hosts`}>Security for host</Link>.
          </p>
        </Admonition>
      </div>
    </>
  );
}

function KeyValueStore(props) {
  return (
    <>
      <Heading
        as='h2'
        id='keyvalue-store'
      >
        Key/value store
      </Heading>
      <p>
        {prodname} requires a key/value store accessible by all {prodname} components.&nbsp;
        {
          {
            OpenShift: <span>With OpenShift, the Kubernetes API datastore is used for the key/value store.</span>,
            Kubernetes: (
              <span>
                On Kubernetes, you can configure {prodname} to access an etcdv3 cluster directly or to use the
                Kubernetes API datastore.
              </span>
            ),
            OpenStack: (
              <span>
                For production you will likely want multiple nodes for greater performance and reliability. If you don’t
                already have an etcdv3 cluster to connect to, please refer to{' '}
                <Link href='https://coreos.com/etcd/'>the upstream etcd docs</Link> for detailed advice and setup.
              </span>
            ),
            'host protection': <span>The key/value store must be etcdv3.</span>,
          }[props.orch]
        }
      </p>
    </>
  );
}

function NetworkRequirementsOSS(props) {
  return (
    <>
      <Heading
        as='h2'
        id='network-requirements'
      >
        Network requirements
      </Heading>
      <p>Ensure that your hosts and firewalls allow the necessary traffic based on your configuration.</p>
      <table style={{ width: '100%' }}>
        <colgroup>
          <col style={{ width: '53%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '12%' }} />
        </colgroup>
        <thead>
          <tr className='header'>
            <th>Configuration</th>
            <th>Host(s)</th>
            <th>Connection type</th>
            <th>Port/protocol</th>
          </tr>
        </thead>
        <tbody>
          <tr className='odd'>
            <td>{prodname} networking (BGP)</td>
            <td>All</td>
            <td>Bidirectional</td>
            <td>TCP 179</td>
          </tr>
          <tr className='even'>
            <td>{prodname} networking with IP-in-IP enabled (default)</td>
            <td>All</td>
            <td>Bidirectional</td>
            <td>
              IP-in-IP, often represented by its protocol number <code>4</code>
            </td>
          </tr>
          {props.orch === orchestrators.OpenShift && (
            <>
              <tr>
                <td>{prodname} networking with VXLAN enabled</td>
                <td>All</td>
                <td>Bidirectional</td>
                <td>UDP 4789</td>
              </tr>
              <tr>
                <td>Typha access</td>
                <td>Typha agent hosts</td>
                <td>Incoming</td>
                <td>TCP 5473 (default)</td>
              </tr>
              <tr>
                <td>All</td>
                <td>kube-apiserver host</td>
                <td>Incoming</td>
                <td>Often TCP 443 or 8443*</td>
              </tr>
            </>
          )}
          {props.orch === orchestrators.Kubernetes && (
            <>
              <tr>
                <td>{prodname} networking with VXLAN enabled</td>
                <td>All</td>
                <td>Bidirectional</td>
                <td>UDP 4789</td>
              </tr>
              <tr>
                <td>{prodname} networking with Typha enabled</td>
                <td>Typha agent hosts</td>
                <td>Incoming</td>
                <td>TCP 5473 (default)</td>
              </tr>
              <tr>
                <td>{prodname} networking with IPv4 Wireguard enabled</td>
                <td>All</td>
                <td>Bidirectional</td>
                <td>UDP 51820 (default)</td>
              </tr>
              <tr>
                <td>{prodname} networking with IPv6 Wireguard enabled</td>
                <td>All</td>
                <td>Bidirectional</td>
                <td>UDP 51821 (default)</td>
              </tr>
              <tr>
                <td>flannel networking (VXLAN)</td>
                <td>All</td>
                <td>Bidirectional</td>
                <td>UDP 4789</td>
              </tr>
              <tr>
                <td>All</td>
                <td>kube-apiserver host</td>
                <td>Incoming</td>
                <td>Often TCP 443 or 6443*</td>
              </tr>
              <tr>
                <td>etcd datastore</td>
                <td>etcd hosts</td>
                <td>Incoming</td>
                <td>
                  <Link href='http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.txt'>
                    Officially
                  </Link>{' '}
                  TCP 2379 but can vary
                </td>
              </tr>
            </>
          )}
          {props.orch !== orchestrators.Kubernetes && props.orch !== orchestrators.OpenShift && (
            <tr>
              <td>All</td>
              <td>etcd hosts</td>
              <td>Incoming</td>
              <td>
                <Link href='http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.txt'>
                  Officially
                </Link>{' '}
                TCP 2379 but can vary
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {(props.orch === orchestrators.Kubernetes || props.orch === orchestrators.OpenShift) && (
        <p>
          *{' '}
          <em>
            The value passed to kube-apiserver using the <code>--secure-port</code> flag. If you cannot locate this,
            check the <code>targetPort</code> value returned by
            <code>kubectl get svc kubernetes -o yaml</code>.
          </em>
        </p>
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
        id='privileges'
      >
        Privileges
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
      <NodeRequirementsOSS {...props} />
      <NotesOSS {...props} />
      <KeyValueStore {...props} />
      <NetworkRequirementsOSS {...props} />
      <Privileges {...props} />
    </>
  );
}
