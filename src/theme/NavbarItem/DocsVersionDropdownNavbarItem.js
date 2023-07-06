import React from 'react';
import DocsVersionDropdownNavbarItem from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';
import { useProductId } from '../../utils/useProductId';

export default function DocsVersionDropdownNavbarItemWrapper(props) {
  const productId = useProductId();

  {/* Commented out to allow navigation between Calico Cloud versions.

  if (!productId || productId === 'calico-cloud') {
    return null;
  }

  */}

  const dropdownItemsAfter = props.dropdownItemsAfter.filter(
    (item) => !item.className || !item.className.startsWith('product') || item.className.endsWith(productId)
  );

  return (
    <>
      <DocsVersionDropdownNavbarItem
        {...props}
        dropdownItemsAfter={dropdownItemsAfter}
        docsPluginId={productId}
      />
    </>
  );
}
