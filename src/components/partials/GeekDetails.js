import React from 'react';
import { toKebab } from '../utils/formatters';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
} from '@chakra-ui/react';

export default function GeekDetails(props) {
  const [selectedDetail, setSelectedDetail] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const details = props.details.split(',').map((detail) => detail.split(':'));

  const renderTitle = (detail) => {
    if (!detail) {
      return;
    }

    return detail === INFO ? 'Calico Deployment Options' : `${detail[0]} ${detail[1]}`;
  };

  const renderContent = (detail) => {
    if (!detail) {
      return;
    }

    const key = detail === INFO ? INFO : toKebab(`${detail[0]}-${detail[1]}`);

    return detailsMap[key](props);
  };

  return (
    <div
      className='geek-details'
      style={{ display: 'flex' }}
    >
      <table>
        <thead>
          <tr>
            {details.map((detail) => (
              <th
                style={{ padding: '5px' }}
                key={detail.join('-')}
              >
                {detail[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {details.map((detail) => (
              <td
                style={{
                  padding: '5px',
                  textAlign: 'center',
                }}
                key={detail.join('-')}
              >
                <button
                  className='button button--sm button--secondary'
                  onClick={() => {
                    setSelectedDetail(detail);
                    setIsOpen(true);
                  }}
                >
                  {detail[1]}
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <button
        className='button geek-details-info'
        onClick={() => {
          setSelectedDetail(INFO);
          setIsOpen(true);
        }}
      >
        ?
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size='lg'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{renderTitle(selectedDetail)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderContent(selectedDetail)}</ModalBody>
          <ModalFooter>
            <Button
              size='sm'
              variant='solidBlack'
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

const INFO = 'info';

const detailsMap = {
  ['cni-aws']: ({ prodname }) => (
    <>
      <p>
        The CNI (Container Network Interface) plugin being used by Kubernetes determines the details of exactly how pods
        are connected to the underlying network.
      </p>
      <p>
        The AWS Amazon VPC CNI and IPAM plugins provide pods with IP addresses from the underlying VPC (Virtual Private
        Cloud) to provide a VPC-Native pod network. The AWS VPC is used to route pod traffic between nodes, and
        understands which pod IP address are located on which nodes. This avoids the need for an overlay, and typically
        has good network performance characteristics.
      </p>
      <p>
        In addition, pod IPs are understood by the broader AWS network, so for example, VMs outside of the cluster can
        connect directly to any pod without going via a Kubernetes service if desired.
      </p>
    </>
  ),
  ['cni-azure']: ({ prodname }) => (
    <>
      <p>
        The CNI (Container Network Interface) plugin being used by Kubernetes determines the details of exactly how pods
        are connected to the underlying network.
      </p>
      <p>
        The Azure CNI and IPAM plugins provide pods with IP addresses from the underlying Azure VNET (Virtual Network)
        to provide a VPC-Native pod network. The Azure VNET is used to route pod traffic between nodes, and understands
        which pod IP address are located on which nodes. This avoids the need for an overlay, and typically has good
        network performance characteristics.
      </p>
      <p>
        In addition, pod IPs are understood by the broader AWS network, so for example, VMs outside of the cluster can
        connect directly to any pod without going via a Kubernetes service if desired.
      </p>
    </>
  ),
  ['cni-calico']: ({ prodname }) => (
    <>
      <p>
        The CNI (Container Network Interface) plugin being used by Kubernetes determines the details of exactly how pods
        are connected to the underlying network.
      </p>
      <p>
        The {prodname} CNI plugin connects pods to the host networking using L3 routing, without the need for an L2
        bridge. This is simple and easy to understand, and more efficient than other common alternatives such as kubenet
        or flannel.
      </p>
    </>
  ),
  ['cni-kubenet']: ({ prodname }) => (
    <>
      <p>
        The CNI (Container Network Interface) plugin being used by Kubernetes determines the details of exactly how pods
        are connected to the underlying network.
      </p>
      <p>
        Kubenet combines an L2 Bridge CNI plugin with Host-local IPAM. The result is a pod network with a combination of
        L2 and L3 segments, and relies on some other controller to manage the routing of pod traffic between nodes.
        Often this is done by adding static routes per node at node creation time.{' '}
      </p>
      <p>Note that a Kubenet based network is slightly less efficient than {prodname} CNI's pure L3 network.</p>
    </>
  ),
  ['cross-subnet-ipip']: ({ prodname }) => (
    <>
      <p>
        With {prodname}'s cross-subnet IPIP mode, traffic between pods on the same subnet does not use an overlay, while
        traffic between pods on different subnets will go via an IPIP overlay.{' '}
      </p>
      <p>
        Packets between pods on nodes within the same subnet, are sent without using an overlay to give the best
        possible network performance.
      </p>
      <p>
        Packets between pods on nodes in different subnets are encapsulated using IPIP, wrapping each original packet in
        an outer packet that uses node IPs, and hiding the pod IPs of the inner packet. This can be done very
        efficiently by the Linux kernel, but it still represents a small overhead compared to non-overlay traffic.
      </p>
    </>
  ),
  ['cross-subnet-vxlan']: ({ prodname }) => (
    <>
      <p>
        With {prodname}'s cross-subnet VXLAN mode, traffic between pods on the same subnet does not use an overlay,
        while traffic between pods on different subnets will go via an VXLAN overlay.{' '}
      </p>
      <p>
        Packets between pods on nodes within the same subnet, are sent without using an overlay to give the best
        possible network performance.
      </p>
      <p>
        Packets between pods on nodes in different subnets are encapsulated using IPIP, wrapping each original packet in
        an outer packet that uses node IPs, and hiding the pod IPs of the inner packet. This can be done very
        efficiently by the Linux kernel, but it still represents a small overhead compared to non-overlay traffic.
      </p>
    </>
  ),
  ['datastore-etcd']: ({ prodname }) => (
    <>
      <p>
        {prodname} stores the operational and configuration state of your cluster in a central datastore. If the
        datastore is unavailable, your {prodname} network continues operating, but cannot be updated (no new pods can be
        networked, no policy changes can be applied, etc.).
      </p>
      <p>{prodname} has two datastore drivers you can choose from:</p>
      <ul>
        <li>etcd - for direct connection to an etcd cluster</li>
        <li>Kubernetes - for connection to a Kubernetes API server</li>
      </ul>
      <p>The advantages of using etcd as the datastore are:</p>
      <ul>
        <li>Allows you to run {prodname} on non-Kubernetes platforms (e.g. OpenStack)</li>
        <li>
          Allows separation of concerns between Kubernetes and {prodname} resources, for example allowing you to scale
          the datastores independently
        </li>
        <li>
          Allows you to run a {prodname} cluster that contains more than just a single Kubernetes cluster, for example,
          bare metal servers with {prodname} host protection interworking with a Kubernetes cluster or multiple
          Kubernetes clusters.
        </li>
      </ul>
      <p>For completeness, the advantages of using Kubernetes as the datastore are:</p>
      <ul>
        <li>It doesn't require an extra datastore, so is simpler to install and manage</li>
        <li>You can use Kubernetes RBAC to control access to {prodname} resources</li>
        <li>You can use Kubernetes audit logging to generate audit logs of changes to {prodname} resources.</li>
      </ul>
    </>
  ),
  ['datastore-kubernetes']: ({ prodname }) => (
    <>
      <p>
        {prodname} stores the operational and configuration state of your cluster in a central datastore. If the
        datastore is unavailable, your {prodname} network continues operating, but cannot be updated (no new pods can be
        networked, no policy changes can be applied, etc.).
      </p>
      <p>{prodname} has two datastore drivers you can choose from</p>
      <ul>
        <li>etcd - for direct connection to an etcd cluster</li>
        <li>Kubernetes - for connection to a Kubernetes API server</li>
      </ul>
      <p>The advantages of using Kubernetes as the datastore are:</p>
      <ul>
        <li>It doesn't require an extra datastore, so is simpler to install and manage</li>
        <li>You can use Kubernetes RBAC to control access to {prodname} resources</li>
        <li>You can use Kubernetes audit logging to generate audit logs of changes to {prodname} resources</li>
      </ul>
      <p>For completeness, the advantages of using etcd as the datastore are:</p>
      <ul>
        <li>Allows you to run {prodname} on non-Kubernetes platforms (e.g. OpenStack)</li>
        <li>
          Allows separation of concerns between Kubernetes and {prodname} resources, for example allowing you to scale
          the datastores independently
        </li>
        <li>
          Allows you to run a {prodname} cluster that contains more than just a single Kubernetes cluster, for example,
          bare metal servers with {prodname} host protection interworking with a Kubernetes cluster or multiple
          Kubernetes clusters.
        </li>
      </ul>
    </>
  ),
  [INFO]: ({ prodname }) => (
    <>
      <p>
        {prodname}'s flexible modular architecture supports a wide range of deployment options, so you can select the
        best networking and network policy options for your specific environment. This includes the ability to run with
        a variety of CNI and IPAM plugins, and underlying networking options.
      </p>
      <p>
        The {prodname} Getting Started guides default to the options most commonly used in each environment, so you
        don't have to dive into the details unless you want to.
      </p>
      <p>You can click on any deployment option to learn more.</p>
    </>
  ),
  ['ipam-aws']: ({ prodname }) => (
    <>
      <p>
        How Kubernetes assigns IP address to pods is determined by the IPAM (IP Address Management) plugin being used.
      </p>
      <p>
        The AWS IPAM plugin dynamically allocates small blocks of IP addresses to nodes as required, using IP addresses
        from the underlying VPC (Virtual Private Cloud). The AWS IPAM plugin is used in conjunction with the Amazon VPC
        CNI plugin to provide VPC native pod networking.
      </p>
    </>
  ),
  ['ipam-azure']: ({ prodname }) => (
    <>
      <p>
        How Kubernetes assigns IP address to pods is determined by the IPAM (IP Address Management) plugin being used.
      </p>
      <p>
        The Azure IPAM plugin dynamically allocates small blocks of IP addresses to nodes as required, using IP
        addresses from the underlying VNET (Virtual Network). The Azure IPAM plugin is used in conjunction with the
        Azure CNI plugin to provide VPC native pod networking.
      </p>
    </>
  ),
  ['ipam-calico']: ({ prodname }) => (
    <>
      <p>
        How Kubernetes assigns IP address to pods is determined by the IPAM (IP Address Management) plugin being used.
      </p>
      <p>
        The {prodname} IPAM plugin dynamically allocates small blocks of IP addresses to nodes as required, to give
        efficient overall use of the available IP address space. In addition, {prodname} IPAM supports advanced features
        such as multiple IP pools, the ability to specify a specific IP address range that a namespace or pod should
        use, or even the specific IP address a pod should use.
      </p>
    </>
  ),
  ['ipam-host-local']: ({ prodname }) => (
    <>
      <p>
        How Kubernetes assigns IP address to pods is determined by the IPAM (IP Address Management) plugin being used.
      </p>
      <p>
        The Host-local IPAM plugin allocates a static range of IP addresses for each node at node creation time. The
        pods on each node are then allocated IP addresses from within each node's static range.{' '}
      </p>
      <p>By default, the static range is a /24 (256 IP addresses).</p>
      <p>
        For most deployments, Host-local IPAM is a simple and adequate solution. However, using a static address range
        per node typically means less efficient use of the available IP address space. If you are running particularly
        large clusters, or have other significant enterprise address space demands, then it may be worth considering{' '}
        {prodname} IPAM as an alternative to provide more efficient address space management.
      </p>
    </>
  ),
  ['overlay-ipip']: ({ prodname }) => (
    <>
      <p>
        An overlay network allows pods to communicate between nodes without the underlying network being aware of the
        pods or pod IP addresses.
      </p>
      <p>
        Packets between pods on different nodes are encapsulated using IPIP, wrapping each original packet in an outer
        packet that uses node IPs, and hiding the pod IPs of the inner packet. This can be done very efficiently by the
        Linux kernel, but it still represents a small overhead, which you might want to avoid if running particularly
        network intensive workloads.
      </p>
      <p>
        For completeness, in contrast, operating without using an overlay provides the highest performance network. The
        packets that leave your pods are the packets that go on the wire.
      </p>
    </>
  ),
  ['overlay-no']: ({ prodname }) => (
    <>
      <p>
        Operating without using an overlay provides the highest performance network. The packets that leave your pods
        are the packets that go on the wire.
      </p>
      <p>
        For completeness, in contrast, with an overlay network, packets between pods on different nodes are encapsulated
        using a protocol such as VXLAN or IPIP, wrapping each original packet in an outer packet that uses node IPs, and
        hiding the pod IPs of the inner packet. This can be done very efficiently by the Linux kernel, but it still
        represents a small overhead, which you might want to avoid if running particularly network intensive workloads.
      </p>
    </>
  ),
  ['overlay-vxlan']: ({ prodname }) => (
    <>
      <p>
        An overlay network allows pods to communicate between nodes without the underlying network being aware of the
        pods or pod IP addresses.
      </p>
      <p>
        Packets between pods on different nodes are encapsulated using VXLAN, wrapping each original packet in an outer
        packet that uses node IPs, and hiding the pod IPs of the inner packet. This can be done very efficiently by the
        Linux kernel, but it still represents a small overhead, which you might want to avoid if running particularly
        network intensive workloads.
      </p>
      <p>
        For completeness, in contrast, operating without using an overlay provides the highest performance network. The
        packets that leave your pods are the packets that go on the wire.
      </p>
    </>
  ),
  ['policy-calico']: ({ prodname }) => (
    <>
      <p>
        Kubernetes network policies are implemented by network plugins rather than Kubernetes itself. Simply creating a
        network policy resource without a network plugin to implement it, will have no effect on network traffic.
      </p>
      <p>
        The {prodname} plugin implements the full set of Kubernetes network policy features. In addition, {prodname}{' '}
        supports {prodname} network policies, providing additional features and capabilities beyond Kubernetes network
        policies. Kubernetes and {prodname} network policies work together seamlessly, so you can choose whichever is
        right for you, and mix and match as desired.
      </p>
    </>
  ),
  ['policy-none']: ({ prodname }) => (
    <>
      <p>Kubernetes network policies are implemented by network plugins rather than Kubernetes itself. </p>
      <p>Without any network policy implementation, defined network policies will have no effect on network traffic.</p>
    </>
  ),
  ['routing-bgp']: ({ prodname }) => (
    <>
      <p>BGP (Border Gateway Protocol) is used to dynamically program routes for pod traffic between nodes.</p>
      <p>
        BGP is a standards-based routing protocol used to build the internet. It scales exceptionally well, and even the
        largest Kubernetes clusters represent a tiny amount of load compared to what BGP can cope with.
      </p>
      <p>{prodname} can run BGP in three modes:</p>
      <ul>
        <li>
          <strong>Full mesh</strong> - where each node talks BGP to each other, easily scaling to 100 nodes, on top of
          an underlying L2 network or using IPIP overlay
        </li>
        <li>
          <strong>With route reflectors</strong> - where each node talks to one or more BGP route reflectors, scaling
          beyond 100 nodes, on top of an underlying L2 network or using IPIP overlay
        </li>
        <li>
          <strong>Peered with TOR (Top of Rack) routers</strong> - in a physical data center where each node talks to
          routers in the top of the corresponding rack, scaling to the limits of your physical data center.
        </li>
      </ul>
    </>
  ),
  ['routing-calico']: ({ prodname }) => (
    <>
      <p>
        {prodname} routing distributes and programs routes for pod traffic between nodes using its data store without
        the need for BGP. {prodname} routing supports unencapsulated traffic within a single subnet, as well as
        selective VXLAN encapsulation for clusters that span multiple subnets.
      </p>
    </>
  ),
  ['routing-static']: ({ prodname }) => (
    <>
      <p>
        Static routes are used to route pod traffic between nodes. The static routes are typically added to the host,
        and if required, the underlying network, by the installation framework used to create the Kubernetes deployment.
        Static routes are usually used in conjunction with the Host-local IPAM plugin, which statically assigns a /24
        pod IP address range per node.
      </p>
    </>
  ),
  ['routing-vpc-native']: ({ prodname }) => (
    <>
      <p>
        The underlying cloud VPC (Virtual Private Cloud) is used to route pod traffic between nodes, and understands
        which pod IP address are located on which nodes. This avoids the need for an overlay, and typically has good
        performance characteristics.{' '}
      </p>
      <p>
        In addition, pod IPs are understood by the broader cloud network, so for example, VMs outside of the cluster can
        connect directly to any pod without going via a Kubernetes service if desired.
      </p>
    </>
  ),
};
