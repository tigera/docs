import React from 'react';
import DocsVersionDropdownNavbarItem from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';
import { useProductId } from '../../utils/useProductId';

export default function DocsVersionDropdownNavbarItemWrapper(props) {
  const productId = useProductId();

  if (!productId || productId === 'calico-cloud') {
    return null;
  }

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
