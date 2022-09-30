import { useState, useEffect } from 'react';

const DOCUSAURUS_DEFAULT_MIN_HEADING_LEVEL = 2;
const DOCUSAURUS_DEFAULT_MAX_HEADING_LEVEL = 3;

/**
 * Builds a CSS-selector based on heading extremum values that can appear in TOC.
 */
function buildHeadingsRange(minHeadingLevel, maxHeadingLevel) {
  let headingsRange = '';

  for (let i = minHeadingLevel; i <= maxHeadingLevel; i++) {
    headingsRange += `h${i}`;

    if (i !== maxHeadingLevel) {
      headingsRange += ', ';
    }
  }

  return headingsRange;
}

/**
 * Parses current page, detects all headings (h1, h2, etc.)
 * and generates Docusaurus-compatible TOC.
 */
function generateToc(minHeadingLevel, maxHeadingLevel) {
  const headingsRange = buildHeadingsRange(minHeadingLevel, maxHeadingLevel);
  const htmlHeadings = document.querySelectorAll(headingsRange);
  const headings = Array.from(htmlHeadings);

  const toc = headings.map((heading) => {
    return {
      id: heading.id,
      value: heading.innerText,
      level: Number(heading.nodeName.charAt(1)),
    };
  });

  return toc;
}

/**
 * Returns TOC of current page on page load.
 */
export default function useToc(
  minHeadingLevel = DOCUSAURUS_DEFAULT_MIN_HEADING_LEVEL,
  maxHeadingLevel = DOCUSAURUS_DEFAULT_MAX_HEADING_LEVEL
) {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    setToc(generateToc(minHeadingLevel, maxHeadingLevel));
  }, []);

  return toc;
}
