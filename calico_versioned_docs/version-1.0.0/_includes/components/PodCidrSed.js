import React from 'react';

export default function PodCidrSed(props) {
  const ip = props.yaml === 'calico' ? '192.168.0.0/16' : '10.244.0.0/16';

  return (
    <>
      If you are using pod CIDR <code>{ip}</code>, skip to the next step. If you are using a different pod CIDR with
      kubeadm, no changes are required - Calico will automatically detect the CIDR based on the running configuration.
      For other platforms, make sure you uncomment the CALICO_IPV4POOL_CIDR variable in the manifest and set it to the
      same value as your chosen pod CIDR.
    </>
  );
}
