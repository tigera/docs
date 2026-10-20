/**
 * Output generation — assembles llms.txt and llms-full.txt content
 * from processed doc entries.
 */

/**
 * @typedef {{ title: string, description: string, permalink: string, markdown: string, sectionLabel: string }} ProcessedDoc
 */

import { shiftHeadings } from './markdown.js';
import { docUrl } from './links.js';

/**
 * Whether a doc converted to anything worth publishing.
 *
 * This is the single predicate that decides a page's fate across every output, so
 * that they cannot drift apart: pages/writePageMarkdown declines to write a twin,
 * and llms-full.txt omits the section. llms.txt deliberately still lists these
 * pages, because they exist and their HTML is reachable — but any caller that
 * rewrites index links to .md must consult this first, or it will advertise a URL
 * that does not exist.
 *
 * @param {{ markdown: string }} doc
 * @returns {boolean}
 */
export function hasContent(doc) {
  return Boolean(doc.markdown && doc.markdown.trim());
}

/**
 * Group docs by their section label, preserving insertion order.
 *
 * @param {ProcessedDoc[]} docs
 * @returns {Map<string, ProcessedDoc[]>}
 */
function groupBySection(docs) {
  const groups = new Map();
  for (const doc of docs) {
    if (!groups.has(doc.sectionLabel)) {
      groups.set(doc.sectionLabel, []);
    }
    groups.get(doc.sectionLabel).push(doc);
  }
  return groups;
}

/**
 * Format a link entry for llms.txt.
 *
 * Points at the Markdown twin where one exists, per llmstxt.org, so an agent working
 * from the index never has to fetch HTML. The pages that produce no twin keep their
 * HTML link: the page is real, only its Markdown is not.
 */
function formatLink(doc, siteUrl, baseUrl) {
  const url = docUrl(doc, siteUrl, hasContent(doc), baseUrl);
  const desc = doc.description ? `: ${doc.description}` : '';
  return `- [${doc.title}](${url})${desc}`;
}

/**
 * Check if a section label matches any of the optional section patterns.
 */
function isOptionalSection(sectionLabel, optionalSections) {
  const lower = sectionLabel.toLowerCase();
  return optionalSections.some((pattern) => lower.includes(pattern.toLowerCase()));
}

/**
 * Generate a per-product llms.txt (index of links grouped by sidebar section).
 *
 * @param {string} productName - Display name (e.g., "Calico Open Source")
 * @param {string} description - Blockquote description
 * @param {ProcessedDoc[]} docs - All processed docs for this product
 * @param {string} siteUrl - Site base URL
 * @param {string[]} optionalSections - Section label patterns for ## Optional
 * @param {string} [baseUrl] - The site's baseUrl
 * @returns {string}
 */
export function generateProductIndex(
  productName,
  description,
  docs,
  siteUrl,
  optionalSections,
  baseUrl = '/'
) {
  // Unlike llms-full.txt this lists every doc, including those with no twin; those
  // entries link to HTML rather than to a .md that does not exist. See formatLink.
  const sections = groupBySection(docs);
  const lines = [];
  const optionalLines = [];

  lines.push(`# ${productName}`);
  lines.push('');
  lines.push(`> ${description}`);

  for (const [sectionLabel, sectionDocs] of sections) {
    const linkLines = sectionDocs.map((doc) => formatLink(doc, siteUrl, baseUrl));

    if (isOptionalSection(sectionLabel, optionalSections)) {
      optionalLines.push(...linkLines);
    } else {
      lines.push('');
      lines.push(`## ${sectionLabel}`);
      lines.push('');
      lines.push(...linkLines);
    }
  }

  if (optionalLines.length > 0) {
    lines.push('');
    lines.push('## Optional');
    lines.push('');
    lines.push(...optionalLines);
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Generate a per-product llms-full.txt (full concatenated Markdown).
 *
 * @param {string} productName - Display name
 * @param {string} description - Blockquote description
 * @param {string} versionLabel - Version string (e.g., "3.31")
 * @param {ProcessedDoc[]} docs - All processed docs with markdown content
 * @param {string} siteUrl - Site base URL, for the per-doc Source line
 * @returns {string}
 */
export function generateProductFull(productName, description, versionLabel, docs, siteUrl) {
  const lines = [];

  // Pages that convert to an empty body get no twin, so they should not appear here
  // either — an empty section under a heading and a Source line reads as "this page
  // has no content" rather than "this page could not be converted".
  const withContent = docs.filter(hasContent);

  lines.push(`# ${productName} - Full Documentation`);
  lines.push('');
  lines.push(`> Complete documentation for ${productName} (version ${versionLabel}).`);

  for (const doc of withContent) {
    lines.push('');
    lines.push('---');
    lines.push('');
    lines.push(`## ${doc.title}`);
    lines.push('');
    lines.push(`Source: ${siteUrl}${doc.permalink}`);
    if (doc.sectionLabel) {
      lines.push(`Section: ${doc.sectionLabel}`);
    }
    lines.push('');
    // Body headings start at h2; nest them one level under the h2 doc title.
    lines.push(shiftHeadings(doc.markdown, 1));
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Generate the root llms.txt (top pages, extra sections, then links to each
 * product's own files).
 *
 * @param {object} root
 * @param {string} root.title - h1 for the file
 * @param {string} root.description - Blockquote for the file
 * @param {ProcessedDoc[]} root.topPageDocs - Resolved top page docs
 * @param {{ title: string, docs: ProcessedDoc[] }[]} root.sections - Instances listed in full, such as use cases
 * @param {{ name: string, path: string }[]} root.products - Each product's name and the URL path its files sit under
 * @param {string} root.siteUrl - Site URL, no trailing slash
 * @param {string} [root.baseUrl] - The site's baseUrl
 * @returns {string}
 */
export function generateRootIndex({
  title,
  description,
  topPageDocs,
  sections,
  products,
  siteUrl,
  baseUrl = '/',
}) {
  const lines = [];

  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`> ${description}`);

  // Top Pages section
  lines.push('');
  lines.push('## Top Pages');
  lines.push('');
  for (const doc of topPageDocs) {
    lines.push(formatLink(doc, siteUrl, baseUrl));
  }

  for (const section of sections) {
    if (section.docs.length === 0) {
      continue;
    }
    lines.push('');
    lines.push(`## ${section.title}`);
    lines.push('');
    for (const doc of section.docs) {
      lines.push(formatLink(doc, siteUrl, baseUrl));
    }
  }

  // Product Documentation section
  lines.push('');
  lines.push('## Product Documentation');
  lines.push('');
  for (const product of products) {
    lines.push(`- [${product.name} llms.txt](${siteUrl}${product.path}/llms.txt): Index of all ${product.name} docs`);
    lines.push(`- [${product.name} llms-full.txt](${siteUrl}${product.path}/llms-full.txt): Full ${product.name} documentation content`);
  }

  lines.push('');
  return lines.join('\n');
}
