import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDocsVersion} from '@docusaurus/plugin-content-docs/client';
import {useActivePlugin} from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

export default function DocVersionBadge({className}) {
  const versionMetadata = useDocsVersion();
  const activePlugin = useActivePlugin();
  const location = useLocation();
  const pluginId = activePlugin?.pluginId || 'unknown-plugin';
  const currentPath = location.pathname;

  const pluginNameMap = {
    'calico': 'Calico Open Source',
    'calico-enterprise': 'Calico Enterprise',
    'calico-cloud': 'Calico Cloud',
  };

  const pluginName = pluginNameMap[pluginId] || 'Unknown Plugin';

  if (pluginId === 'use-cases') {
    return null;
  }

  let badgeText;

  if (pluginId === 'calico-cloud') {
    const isFreeTier = currentPath.includes('/calico-cloud/free/');
    badgeText = isFreeTier
      ? 'Calico Cloud Free documentation'
      : 'Calico Cloud Pro documentation';
  }

  else {
    badgeText = versionMetadata.badge
      ? `${pluginName} ${versionMetadata.label} documentation`
      : `${pluginName} documentation`;
  }

  if (!badgeText) {
      return null;
  }

  return (
      <span
        className={clsx(
          className,
          ThemeClassNames.docs.docVersionBadge, styles.hcu,
          'badge badge--secondary',
        )}>
        {badgeText}
      </span>
    );
}