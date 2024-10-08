import React from 'react';
import clsx from 'clsx';

import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import TOCCollapsible from '@theme/TOCCollapsible';
import useToc from '@site/src/utils/useToc';

import styles from './styles.module.css';

export default function DocItemTOCMobile() {
  const {
    frontMatter: { toc_min_heading_level, toc_max_heading_level },
  } = useDoc();
  const toc = useToc(toc_min_heading_level, toc_max_heading_level);

  return (
    <TOCCollapsible
      toc={toc}
      minHeadingLevel={toc_min_heading_level}
      maxHeadingLevel={toc_max_heading_level}
      className={clsx(ThemeClassNames.docs.docTocMobile, styles.tocMobile)}
    />
  );
}
