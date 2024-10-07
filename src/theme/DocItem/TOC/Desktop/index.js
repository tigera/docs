import React from 'react';

import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import TOC from '@theme/TOC';
import useToc from '@site/src/utils/useToc';

export default function DocItemTOCDesktop() {
  const {
    frontMatter: { toc_min_heading_level, toc_max_heading_level },
  } = useDoc();
  const toc = useToc(toc_min_heading_level, toc_max_heading_level);

  return (
    <TOC
      toc={toc}
      minHeadingLevel={toc_min_heading_level}
      maxHeadingLevel={toc_max_heading_level}
      className={ThemeClassNames.docs.docTocDesktop}
    />
  );
}
