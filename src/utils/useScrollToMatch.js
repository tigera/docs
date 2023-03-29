import React from 'react';
import { useHistory, useLocation } from '@docusaurus/router';

function trim(text) {
  return text.replaceAll(/[^\w]/g, '');
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function useScrollToMatch() {
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {

    const scrollToMatch = decodeURIComponent(location.pathname).match(/(.*)-scroll-to-(.*)/);
  

    if (scrollToMatch) {
      const hash = location.hash

      history.replace({ pathname: scrollToMatch[1] });

      const scrollTo = scrollToMatch[2];

      const headerSelector = hash === '#docusaurus_skipToContent_fallback' ? 'header' : `[id='${hash.slice(1)}']`;
      const header = document.querySelector(headerSelector);
      const contentTagsWithHeader = Array.from(
        document.querySelectorAll(`${headerSelector}, article li, article p, article td:last-child`)
      );
      const headerIndex = contentTagsWithHeader.indexOf(header);
      const contentTags = contentTagsWithHeader.slice(headerIndex);
      const trimmedScrollTo = trim(scrollTo);
      const searchResultTag = contentTags.find((tag) => trim(tag.textContent).includes(trimmedScrollTo));

      if (searchResultTag) {
        setTimeout(() => {
          if (!isInViewport(searchResultTag)) {
            searchResultTag.scrollIntoView(false);
          }

          searchResultTag.classList.add('highlight-search-result');
          setTimeout(() => {
            if (searchResultTag) {
              searchResultTag.classList.remove('highlight-search-result');
            }
          }, 2000);
        });
      }
    }
  }, [location]);
}
