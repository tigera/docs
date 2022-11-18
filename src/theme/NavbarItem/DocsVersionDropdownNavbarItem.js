import React from 'react';
import DocsVersionDropdownNavbarItem from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';
import { useProductId } from '../../utils/useProductId';

export default function DocsVersionDropdownNavbarItemWrapper(props) {
  const productId = useProductId();

  if (!productId) {
    return null;
  }

  return (
    <>
      <DocsVersionDropdownNavbarItem
        {...props}
        docsPluginId={productId}
      />
    </>
  );
}
