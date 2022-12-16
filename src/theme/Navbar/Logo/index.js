import React from 'react';
import Logo from '@theme-original/Navbar/Logo';
import DropdownNavbarItem from '@theme-original/NavbarItem/DropdownNavbarItem';

// TODO: add more links
export default function LogoWrapper(props) {
  return (
    <DropdownNavbarItem
      items={[
        {
          label: 'Compare products',
          to: 'https://www.tigera.io/tigera-products/compare-products/',
        },
        {
          label: 'Pricing',
          to: 'https://www.tigera.io/tigera-products/calico-cloud-pricing/',
        },
      ]}
      label={<Logo {...props} />}
      className='logo-wrapper'
    ></DropdownNavbarItem>
  );
}
