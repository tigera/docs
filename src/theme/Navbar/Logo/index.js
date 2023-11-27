import React from 'react';
import Logo from '@theme-original/Navbar/Logo';
import DropdownNavbarItem from '@theme-original/NavbarItem/DropdownNavbarItem';

// TODO: Add comments to explain how this file is used.
export default function LogoWrapper(props) {
  return (
    <DropdownNavbarItem
      items={[
        {
          label: 'Tigera home',
          to: 'https://tigera.io',
        },
        {
          label: 'Project Calico',
          to: 'https://www.tigera.io/project-calico/',
        },
        {
          label: 'Compare products',
          to: 'https://www.tigera.io/tigera-products/compare-products/',
        },
        {
          label: 'Pricing',
          to: 'https://www.tigera.io/tigera-products/calico-cloud-pricing/',
        },
        {
          label: 'Blog',
          to: 'https://www.tigera.io/blog/',
        },
        {
          label: 'Events',
          to: 'https://www.tigera.io/events',
        },
        {
          label: 'Contact us',
          to: 'https://www.tigera.io/contact',
        },
      ]}
      label={<Logo {...props} />}
      className='logo-wrapper'
    ></DropdownNavbarItem>
  );
}
