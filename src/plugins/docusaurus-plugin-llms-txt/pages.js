/**
 * Per-page Markdown output — writes a Markdown twin for every doc route, so an
 * agent can fetch a single page instead of a multi-megabyte llms-full.txt.
 */

import fs from 'fs/promises';
import path from 'path';

import { hasContent } from './generate.js';

/**
 * Quote a value as a YAML double-quoted scalar.
 *
 * Titles and descriptions routinely contain colons, quotes and em dashes. JSON
 * string syntax is a subset of YAML's double-quoted style, so stringifying is
 * both correct and cheap.
 *
 * @param {unknown} value
 * @returns {string}
 */
function yamlString(value) {
  return JSON.stringify(String(value));
}

/**
 * Build a YAML frontmatter block, skipping fields with no value.
 *
 * @param {Record<string, string | undefined>} fields
 * @returns {string}
 */
export function buildFrontmatter(fields) {
  const lines = ['---'];

  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null || value === '') {
      continue;
    }
    lines.push(`${key}: ${yamlString(value)}`);
  }

  lines.push('---');
  return lines.join('\n');
}

/**
 * Assemble the full Markdown page: frontmatter, an h1 carrying the page title,
 * then the converted body.
 *
 * The body has no h1 of its own — the converter strips the <header> the title
 * lives in — so the title is reattached here.
 *
 * @param {{ title: string, description: string, permalink: string, markdown: string, sectionLabel?: string }} doc
 * @param {{ productName: string, versionLabel: string, siteUrl: string }} meta
 * @returns {string}
 */
export function buildPageMarkdown(doc, meta) {
  const frontmatter = buildFrontmatter({
    title: doc.title,
    description: doc.description,
    product: meta.productName,
    version: meta.versionLabel,
    section: doc.sectionLabel,
    canonical_url: `${meta.siteUrl}${doc.permalink}`,
  });

  return `${frontmatter}\n\n# ${doc.title}\n\n${doc.markdown}\n`;
}

/**
 * The two output paths for a route.
 *
 * This site has no `trailingSlash` setting, so Docusaurus canonicalises leaf docs
 * without a trailing slash (/calico/latest/about/kubernetes-training) and category
 * index docs with one (/calico-enterprise/3.22/observability/). An agent appending
 * ".md" to a URL it was given therefore guesses one of two shapes, so write both.
 *
 * @param {string} permalink
 * @returns {[string, string]}
 */
export function markdownPathsFor(permalink) {
  const base = permalink.replace(/\/+$/, '') || '/index';
  return [`${base}.md`, `${base}/index.md`];
}

/**
 * Write both Markdown twins for a doc.
 *
 * @param {object} doc
 * @param {string} outDir
 * @param {object} meta
 * @returns {Promise<number>} Bytes written per file, or 0 if the page was skipped
 */
export async function writePageMarkdown(doc, outDir, meta) {
  // A twin with no body still asserts through canonical_url that it is the page,
  // which is worse than not existing: an agent that gets a 404 falls back to the
  // HTML, while an agent given an empty file believes the page is empty. Client-
  // rendered pages (the Swagger API browsers) convert to nothing, so skip them.
  if (!hasContent(doc)) {
    return 0;
  }

  const content = buildPageMarkdown(doc, meta);

  for (const relativePath of markdownPathsFor(doc.permalink)) {
    const target = path.join(outDir, relativePath);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content);
  }

  return Buffer.byteLength(content);
}
