import React from 'react';
import MDXContent from '@theme-original/MDXContent';

import { useSwitchToTab } from '../../utils/useSwitchToTab';
import { useScrollToMatch } from '../../utils/useScrollToMatch';

export default function MDXContentWrapper(props) {
  useSwitchToTab();
  useScrollToMatch();

  return (
    <>
      <MDXContent {...props} />
    </>
  );
}
