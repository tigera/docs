import React from 'react';

import Admonition from '@theme/Admonition';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { cloud, enterprise, openSource, global } from '@site/variables';
import { toKebab } from '../utils/formatters';

const { orchestrators } = global;

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
            {props.prodname} must be able to manage <code>cali*</code> interfaces on the host. When IPIP is enabled (the
            default), {props.prodname} also needs to be able to manage <code>tunl*</code> interfaces. When VXLAN is
            enabled, {props.prodname} also needs to be able to manage the
            <code>vxlan.calico</code> interface.
          </p>
        </li>
        <li>
          <p>
            Linux kernel 3.10 or later with <Link href='#kernel-dependencies'>required dependencies</Link>. The
            following distributions have the required kernel, its dependencies, and are known to work well with{' '}
            {props.prodname} and {props.orch}.
          </p>
          <ul>
            <li>RedHat Linux 7</li>
            {(props.orch === orchestrators.Kubernetes || props.orch === orchestrators.HostProtection) && (
              <>
                <li>CentOS 7</li>
                <li>Flatcar Container Linux</li>
                <li>Fedora CoreOS</li>
                <li>Ubuntu 16.04</li>
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
          <p>x86-64 processor with at least 2 cores, 8.0GB RAM and 20 GB free disk space</p>
        </li>
        <li>
          <p>
            Linux kernel 3.10 or later with <Link href='#kernel-dependencies'>required dependencies</Link>. The
            following distributions have the required kernel, its dependencies, and are known to work well with{' '}
            {props.prodname} and {props.orch}.
          </p>
          <ul>
            {(props.orch === orchestrators.Kubernetes || props.orch === orchestrators.HostProtection) && (
              <>
                <li>CentOS 8</li>
                <li>Ubuntu 18.04 and 20.04</li>
                <li>RHEL 8</li>
                <li>Debian 10</li>
              </>
            )}
            {props.orch === orchestrators.OpenShift && (
              <>
                <li>Red Hat Enterprise Linux CoreOS</li>
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
        <li>
          <p>
            {props.prodname} must be able to manage <code>cali*</code>
            interfaces on the host. When IPIP is enabled (the default),
            {props.prodname} also needs to be able to manage <code>tunl*</code>
            interfaces. When VXLAN is enabled, {props.prodname} also needs to be able to manage the{' '}
            <code>vxlan.calico</code> interface.
          </p>
          <Admonition type='note'>
            <p>
              Many Linux distributions, such as most of the above, include NetworkManager. By default, NetworkManager
              does not allow
              {props.prodname} to manage interfaces. If your nodes have NetworkManager, complete the steps in{' '}
              <Link
                href={`docs/${toKebab(
                  props.prodname
                )}/maintenance/troubleshoot/troubleshooting#configure-networkmanager`}
              >
                Preventing NetworkManager from controlling {props.prodname} interfaces
              </Link>{' '}
              before installing {props.prodname}.
            </p>
          </Admonition>
        </li>
        <li>
          <p>
            If your Linux distribution comes with installed Firewalld or another iptables manager it should be disabled.
            These may interfere with rules added by {props.prodname} and result in unexpected behavior.
          </p>
          <Admonition type='note'>
            <p>
              If a host firewall is needed, it can be configured by {props.prodname} HostEndpoint and
              GlobalNetworkPolicy. More information about configuration at{' '}
              <Link href={`docs/${toKebab(props.prodname)}/security/hosts`}>Security for host</Link>.
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

function NotesOSS(props) {
  return (
    <>
      <div className='note'>
        <Admonition type='note'>
          <p>
            Many Linux distributions, such as most of the above, include NetworkManager. By default, NetworkManager does
            not allow {props.prodname} to manage interfaces. If your nodes have NetworkManager, complete the steps in{' '}
            <Link
              href={`/docs/${toKebab(
                props.prodname
              )}/maintenance/troubleshoot/troubleshooting#configure-networkmanager`}
            >
              Preventing NetworkManager from controlling {props.prodname} interfaces
            </Link>{' '}
            before installing {props.prodname}.
          </p>
        </Admonition>
      </div>
      <ul>
        <li>
          If your Linux distribution comes with installed Firewalld or another iptables manager it should be disabled.
          These may interfere with rules added by {props.prodname} and result in unexpected behavior.
        </li>
      </ul>
      <div className='note'>
        <Admonition type='note'>
          <p>
            If a host firewall is needed, it can be configured by {props.prodname} HostEndpoint and GlobalNetworkPolicy.
            More information about configuration at{' '}
            <Link href={`/docs/${toKebab(props.prodname)}/security/hosts`}>Security for host</Link>.
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
        {props.prodname} requires a key/value store accessible by all {props.prodname} components.&nbsp;
        {
          {
            OpenShift: <span>With OpenShift, the Kubernetes API datastore is used for the key/value store.</span>,
            Kubernetes: (
              <span>
                On Kubernetes, you can configure {props.prodname} to access an etcdv3 cluster directly or to use the
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
            <td>{props.prodname} networking (BGP)</td>
            <td>All</td>
            <td>Bidirectional</td>
            <td>TCP 179</td>
          </tr>
          <tr className='even'>
            <td>{props.prodname} networking with IP-in-IP enabled (default)</td>
            <td>All</td>
            <td>Bidirectional</td>
            <td>
              IP-in-IP, often represented by its protocol number <code>4</code>
            </td>
          </tr>
          {props.orch === orchestrators.OpenShift && (
            <>
              <tr>
                <td>{props.prodname} networking with VXLAN enabled</td>
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
                <td>{props.prodname} networking with VXLAN enabled</td>
                <td>All</td>
                <td>Bidirectional</td>
                <td>UDP 4789</td>
              </tr>
              <tr>
                <td>{props.prodname} networking with Typha enabled</td>
                <td>Typha agent hosts</td>
                <td>Incoming</td>
                <td>TCP 5473 (default)</td>
              </tr>
              <tr>
                <td>{props.prodname} networking with IPv4 Wireguard enabled</td>
                <td>All</td>
                <td>Bidirectional</td>
                <td>UDP 51820 (default)</td>
              </tr>
              <tr>
                <td>{props.prodname} networking with IPv6 Wireguard enabled</td>
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
        <Link href={'/docs/calico-enterprise/reference/architecture/overview'}>Component architecture</Link> to view the
        following components.
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
              <strong>{props.prodname} networking options</strong>
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
          {props.prodname !== cloud.prodname && (
            <>
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
            </>
          )}
          <tr className='even'>
            <td>
              <strong>Cluster scaling</strong>
            </td>
            <td>Any {props.prodname} networking option above with Typha agents enabled</td>
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
                <td>{props.prodname} API server</td>
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
                <td>{props.prodname} API server</td>
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
            <td>{props.prodname} Manager UI</td>
            <td>TCP 9443 (default)</td>
          </tr>
          <tr className='even'>
            <td>
              <strong>Intrusion Detection System (IDS)</strong>
            </td>
            <td>{props.prodname} intrusion detection</td>
            <td>TCP 5443 (default)</td>
          </tr>
          <tr className='odd'>
            <td>
              <strong>Compliance</strong>
            </td>
            <td>{props.prodname} compliance</td>
            <td>TCP 5443 (default)</td>
          </tr>
          <tr className='even'>
            <td>
              <strong>Multi-cluster management</strong>
            </td>
            <td>Additional port required for Manager UI</td>
            <td>TCP 9449</td>
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
        id='privileges'
      >
        Privileges
      </Heading>
      <p>
        Ensure that {props.prodname} has the <code>CAP_SYS_ADMIN</code> privilege.
      </p>
      <p>
        The simplest way to provide the necessary privilege is to run {props.prodname} as root or in a privileged
        container.
      </p>
      {props.orch === orchestrators.Kubernetes && (
        <>
          <p>
            When installed as a Kubernetes daemon set, {props.prodname} meets this requirement by running as a
            privileged container. This requires that the kubelet be allowed to run privileged containers. There are two
            ways this can be achieved.
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
  const prod =
    props.prodname === openSource.prodname
      ? openSource
      : props.prodname === enterprise.prodname
      ? enterprise
      : props.prodname === cloud.prodname
      ? cloud
      : null;

  if (!prod) {
    console.error('props.prodname is not valid: ' + props.prodname);
    return null;
  }

  return (
    <>
      {props.prodname === openSource.prodname && (
        <>
          <NodeRequirementsOSS
            {...prod}
            {...props}
          />
          <NotesOSS
            {...prod}
            {...props}
          />
        </>
      )}

      {(props.prodname === enterprise.prodname || props.prodname === cloud.prodname) && (
        <NodeRequirementsEnt
          {...prod}
          {...props}
        />
      )}

      <KeyValueStore
        {...prod}
        {...props}
      />

      {props.prodname === openSource.prodname && (
        <NetworkRequirementsOSS
          {...prod}
          {...props}
        />
      )}

      {(props.prodname === enterprise.prodname || props.prodname === cloud.prodname) && (
        <NetworkRequirementsEnt
          {...prod}
          {...props}
        />
      )}

      <Privileges
        {...prod}
        {...props}
      />
    </>
  );
}
