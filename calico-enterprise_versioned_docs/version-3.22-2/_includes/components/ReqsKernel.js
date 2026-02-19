import React from 'react';
import Admonition from '@theme/Admonition';
import Heading from '@theme/Heading';

import { prodname } from '../../variables';

export default function ReqsKernel() {
  return (
    <>
      <Heading
        as='h2'
        id='kernel-dependencies'
      >
        Kernel dependencies
      </Heading>
      <Admonition type='tip'>
        <p>If you are using one of the recommended distributions, you will already satisfy these.</p>
      </Admonition>
      <p>
        Due to the large number of distributions and kernel version out there, it’s hard to be precise about the names
        of the particular kernel modules that are required to run {prodname}. However, in general, you’ll need:
      </p>
      <ul>
        <li>
          <p>
            The <code>iptables</code> modules (both the “legacy” and “nft” variants are supported). These are typically
            broken up into many small modules, one for each type of match criteria and one for each type of action.{' '}
            {prodname} requires:
          </p>
          <ul>
            <li>The “base” modules (including the IPv6 versions if IPv6 is enabled in your cluster).</li>
            <li>
              At least the following match criteria: <code>set</code>, <code>rpfilter</code>, <code>addrtype</code>,{' '}
              <code>comment</code>, <code>conntrack</code>, <code>icmp</code>, <code>tcp</code>, <code>udp</code>,{' '}
              <code>ipvs</code>, <code>icmpv6</code> (if IPv6 is enabled in your kernel), <code>mark</code>,{' '}
              <code>multiport</code>, <code>rpfilter</code>, <code>sctp</code>, <code>ipvs</code> (if using
              <code>kube-proxy</code> in IPVS mode).
            </li>
            <li>
              At least the following actions: <code>REJECT</code>, <code>ACCEPT</code>, <code>DROP</code>,{' '}
              <code>LOG</code>.
            </li>
          </ul>
        </li>
        <li>
          <p>IP sets support.</p>
        </li>
        <li>
          <p>Netfilter Conntrack support compiled in (with SCTP support if using SCTP).</p>
        </li>
        <li>
          <p>
            IPVS support if using <code>kube-proxy</code> in IPVS mode.
          </p>
        </li>
        <li>
          <p>
            IPIP, VXLAN, Wireguard support, if using {prodname} networking in one of those modes.
          </p>
        </li>
        <li>
          <p>
            eBPF (including the <code>tc</code> hook support) and XDP (if you want to use the eBPF data plane).
          </p>
        </li>
      </ul>
    </>
  );
}
