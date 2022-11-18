import React from 'react';
import { useLocation } from '@docusaurus/router';
import { parseLocationHash } from './parseLocationHash';

export function useSwitchToTab() {
  const location = useLocation();

  React.useEffect(() => {
    if (!location.hash) {
      return;
    }

    const [hash] = parseLocationHash(location);

    const header = document.getElementById(hash.slice(1));
    const tabPanel = header && header.closest('[role=tabpanel]');

    if (!tabPanel) {
      return;
    }

    const panels = Array.from(tabPanel.parentNode.children);
    var index = panels.findIndex((tab) => tab === tabPanel);

    const tabContainer = tabPanel.closest('.tabs-container');
    const tabs = Array.from(tabContainer.querySelectorAll('[role=tab]'));
    const tab = tabs[index];

    tab.click();
  }, [location]);
}
