import React from 'react';

const orchList = {
    Kubernetes: 'Kubernetes',
    HostProtection: 'host protection',
    OpenShift: 'OpenShift',
    OpenStack: 'OpenStack',
}

const osList = [
    {
        Name: 'RedHat Linux 7',
        OrchTags: [orchList.All],
    },
    {
        Name: 'CentOS 7',
        OrchTags: [orchList.Kubernetes, orchList.HostProtection],
    },
    {
        Name: 'Flatcar Container Linux',
        OrchTags: [orchList.Kubernetes, orchList.HostProtection],
    },
    {
        Name: 'Fedora CoreOS',
        OrchTags: [orchList.Kubernetes, orchList.HostProtection],
    },
    {
        Name: 'Ubuntu 16.04',
        OrchTags: [orchList.Kubernetes, orchList.HostProtection],
    },
    {
        Name: 'Debian 8',
        OrchTags: [orchList.Kubernetes, orchList.HostProtection],
    },
    {
        Name: 'RedHat Container OS',
        OrchTags: [orchList.OpenShift],
    },
    {
        Name: 'Ubuntu 18.04',
        OrchTags: [orchList.OpenStack],
    },
    {
        Name: 'CentOS 8',
        OrchTags: [orchList.OpenStack],
    },
]

function osForOrch(orch) {
    let rv = []
    osList.forEach(i => {
        let include = false
        i.OrchTags.forEach(j => include = include ? true : j === orch)
        if (include) rv[rv.length] = i
    })
    return rv;
}

function NodeRequirements(props) {
    return (
        <>
            <h2 id="node-requirements">Node requirements</h2>
            <ul>
                <li><p>x86-64, arm64, ppc64le, or s390x processor</p></li>
                <li><p>Linux kernel 3.10 or later with <a
                    href="#kernel-dependencies">required dependencies</a>. The following
                    distributions have the required kernel, its dependencies, and are known
                    to work well with {props.prodname} and {props.orch}.</p>
                    <ul>
                        {props.os.map((props, idx) => (
                            <li key={idx}>{props.Name}</li>
                        ))}
                    </ul>
                </li>
                <li><p>{props.prodname} must be able to manage <code>cali*</code> interfaces
                    on the host. When IPIP is enabled (the default), {props.prodname} also needs
                    to be able to manage <code>tunl*</code> interfaces. When VXLAN is
                    enabled, {props.prodname} also needs to be able to manage the
                    <code>vxlan.calico</code> interface.</p>
                </li>
            </ul>
        </>
    )
}

function Notes(props) {
    return (
        <>
            <div className="note">
                <blockquote>
                    <p><strong>Note</strong>: Many Linux distributions, such as most of the
                        above, include NetworkManager. By default, NetworkManager does not allow
                        {props.prodname} to manage interfaces. If your nodes have NetworkManager,
                        complete the steps in <a
                            href="/maintenance/troubleshoot/troubleshooting#configure-networkmanager">Preventing
                            NetworkManager from controlling {props.prodname} interfaces</a> before
                        installing {props.prodname}.</p>
                </blockquote>
            </div>
            <ul>
                <li>If your Linux distribution comes with installed Firewalld or another
                    iptables manager it should be disabled. These may interfere with rules
                    added by {props.prodname} and result in unexpected behavior.
                </li>
            </ul>
            <div className="note">
                <blockquote>
                    <p><strong>Note</strong>: If a host firewall is needed, it can be
                        configured by {props.prodname} HostEndpoint and GlobalNetworkPolicy. More
                        information about configuration at <a href="/security/hosts">Security for host</a>.</p>
                </blockquote>
            </div>
        </>
    )
}

function KeyValueStore(props) {
    return (
        <>
            <h2 id="keyvalue-store">Key/value store</h2>
            <p>{props.prodname} requires a key/value store accessible by all {props.prodname} components.
                {
                    {
                        OpenShift:
                            <span>With OpenShift, the Kubernetes API datastore is used for the key/value store.</span>,
                        Kubernetes: <span>On Kubernetes, you can configure {props.prodname} to access an etcdv3 cluster directly or to use the Kubernetes API datastore.</span>,
                        OpenStack: <span>For production you will likely want multiple nodes for greater performance and reliability. If you don’t already have an etcdv3 cluster to connect to,
                            please refer to <a href="https://coreos.com/etcd/">the upstream etcd docs</a> for detailed advice and setup.</span>,
                        HostProtection: <span>The key/value store must be etcdv3.</span>,
                    }[props.orch]
                }
            </p>
        </>
    )
}

function NetworkRequirments(props) {
    return (
        <>
            <h2 id="network-requirements">Network requirements</h2>
            <p>Ensure that your hosts and firewalls allow the necessary traffic
                based on your configuration.</p>
            <table style={{width: '100%'}}>
                <colgroup>
                    <col style={{width: '53%'}}/>
                    <col style={{width: '18%'}}/>
                    <col style={{width: '14%'}}/>
                    <col style={{width: '12%'}}/>
                </colgroup>
                <thead>
                <tr className="header">
                    <th>Configuration</th>
                    <th>Host(s)</th>
                    <th>Connection type</th>
                    <th>Port/protocol</th>
                </tr>
                </thead>
                <tbody>
                <tr className="odd">
                    <td>{props.prodname} networking (BGP)</td>
                    <td>All</td>
                    <td>Bidirectional</td>
                    <td>TCP 179</td>
                </tr>
                <tr className="even">
                    <td>{props.prodname} networking with IP-in-IP enabled (default)</td>
                    <td>All</td>
                    <td>Bidirectional</td>
                    <td>IP-in-IP, often represented by its protocol number <code>4</code></td>
                </tr>
                {props.orch === orchList.OpenShift &&
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
                }
                {props.orch === orchList.Kubernetes &&
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
                            <td><a
                                href="http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.txt">Officially</a> TCP
                                2379 but can vary
                            </td>
                        </tr>
                    </>
                }
                {(props.orch !== orchList.Kubernetes && props.orch !== orchList.OpenShift) &&
                    <tr>
                        <td>All</td>
                        <td>etcd hosts</td>
                        <td>Incoming</td>
                        <td><a
                            href="http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.txt">Officially</a> TCP
                            2379 but can vary
                        </td>
                    </tr>
                }
                </tbody>
            </table>
            {props.orch === orchList.Kubernetes || props.orch === orchList.OpenShift &&
                <p>* <em>The value passed to kube-apiserver using the <code>--secure-port</code> flag.
                    If you cannot locate this, check the <code>targetPort</code> value returned by
                    <code>kubectl get svc kubernetes -o yaml</code>.</em>
                </p>
            }
            {props.orch === orchList.OpenStack &&
                <p>* <em>If your compute hosts connect directly and don’t use IP-in-IP, you don’t need to allow IP-in-IP
                    traffic.</em></p>
            }
        </>
    )
}

function Privileges(props) {
    return (
        <>
            <h2 id="privileges">Privileges</h2>
            <p>Ensure that {props.prodname} has the <code>CAP_SYS_ADMIN</code> privilege.</p>
            <p>The simplest way to provide the necessary privilege is to run {props.prodname} as root or in a privileged
                container.</p>
            {props.orch === orchList.Kubernetes &&
                <>
                    <p>When installed as a Kubernetes daemon set, {props.prodname} meets this requirement by running
                        as a privileged container. This requires that the kubelet be allowed to run privileged
                        containers.
                        There are two ways this can be achieved.</p>
                    <ul>
                        <li key={1}>Specify <code>--allow-privileged</code> on the kubelet (deprecated).</li>
                        <li key={2}>Use a <a href="https://kubernetes.io/docs/concepts/policy/pod-security-policy/">pod
                            security policy</a>.
                        </li>
                    </ul>
                </>
            }
        </>
    )
}

export default function ReqsSys(props) {
    const newProps = {
        ...props,
        os: osForOrch(props.orch)
    }
    return (
        <>
            <NodeRequirements {...newProps}/>
            <Notes {...newProps}/>
            <KeyValueStore {...newProps}/>
            <NetworkRequirments {...newProps}/>
            <Privileges {...newProps}/>
        </>
    );
}
