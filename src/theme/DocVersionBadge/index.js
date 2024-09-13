import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDocsVersion} from '@docusaurus/plugin-content-docs/client';
import {useActivePlugin} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

export default function DocVersionBadge({className}) {
  const versionMetadata = useDocsVersion();
  const activePlugin = useActivePlugin();
  const pluginId = activePlugin?.pluginId || 'unknown-plugin';

  const pluginNameMap = {
    'calico': 'Calico Open Source',
    'calico-enterprise': 'Calico Enterprise',
    'calico-cloud': 'Calico Cloud',
  };

  const pluginName = pluginNameMap[pluginId] || 'Unknown Plugin';

  if (pluginId === 'use-cases') {
    return null;
  }

  return (
      <span
        className={clsx(
          className,
          ThemeClassNames.docs.docVersionBadge, styles.hcu,
          'badge badge--secondary',
        )}>
        <Translate
          id="theme.docs.versionBadge.label"
          values={{
            versionLabel: versionMetadata.label,
            pluginName: pluginName,
          }}>
        {versionMetadata.badge
          ? "{pluginName} {versionLabel} documentation"
          : "{pluginName} documentation"}
        </Translate>
      </span>
    );
}
