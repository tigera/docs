import React from 'react';
import DropdownNavbarItem from '@theme-original/NavbarItem/DropdownNavbarItem';
import { useProductId } from '../../utils/useProductId';
import { getProductNameById } from '../../utils/getProductNameById';

function useDropdownLabel(props) {
  const productId = useProductId();

  if (props.className !== 'documentation-dropdown') {
    return props.label;
  }

  return productId === 'use-cases' ? props.label : getProductNameById(productId) || props.label;
}

export default function DropdownNavbarItemWrapper(props) {
  const label = useDropdownLabel(props);

  return (
    <>
      <DropdownNavbarItem
        {...props}
        label={label}
      />
    </>
  );
}
