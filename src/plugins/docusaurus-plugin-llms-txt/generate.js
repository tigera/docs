/**
 * Output generation — assembles llms.txt and llms-full.txt content
 * from processed doc entries.
 */

/**
 * @typedef {{ title: string, description: string, permalink: string, markdown: string, sectionLabel: string }} ProcessedDoc
 */

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
 */
function formatLink(doc, siteUrl) {
  const url = `${siteUrl}${doc.permalink}`;
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
 * @returns {string}
 */
export function generateProductIndex(productName, description, docs, siteUrl, optionalSections) {
  const sections = groupBySection(docs);
  const lines = [];
  const optionalLines = [];

  lines.push(`# ${productName}`);
  lines.push('');
  lines.push(`> ${description}`);

  for (const [sectionLabel, sectionDocs] of sections) {
    const linkLines = sectionDocs.map((doc) => formatLink(doc, siteUrl));

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
 * @returns {string}
 */
export function generateProductFull(productName, description, versionLabel, docs) {
  const sections = groupBySection(docs);
  const lines = [];

  lines.push(`# ${productName} - Full Documentation`);
  lines.push('');
  lines.push(`> Complete documentation for ${productName} (version ${versionLabel}).`);

  for (const [sectionLabel, sectionDocs] of sections) {
    lines.push('');
    lines.push('---');
    lines.push('');
    lines.push(`## ${sectionLabel}`);

    for (const doc of sectionDocs) {
      lines.push('');
      lines.push(`### ${doc.title}`);
      lines.push('');
      lines.push(doc.markdown);
    }
  }

  lines.push('');
  return lines.join('\n');
}

/**
 * Generate the root llms.txt (top pages + use cases + product file links).
 *
 * @param {string} siteDescription - Blockquote for the root file
 * @param {ProcessedDoc[]} topPageDocs - Resolved top page docs
 * @param {ProcessedDoc[]} useCaseDocs - Use-case docs
 * @param {{ id: string, name: string }[]} products - Product metadata for linking to per-product files
 * @param {string} siteUrl - Site base URL
 * @returns {string}
 */
export function generateRootIndex(siteDescription, topPageDocs, useCaseDocs, products, siteUrl) {
  const lines = [];

  lines.push('# Calico Documentation');
  lines.push('');
  lines.push(`> ${siteDescription}`);

  // Top Pages section
  lines.push('');
  lines.push('## Top Pages');
  lines.push('');
  for (const doc of topPageDocs) {
    lines.push(formatLink(doc, siteUrl));
  }

  // Use Cases section
  if (useCaseDocs.length > 0) {
    lines.push('');
    lines.push('## Use Cases');
    lines.push('');
    for (const doc of useCaseDocs) {
      lines.push(formatLink(doc, siteUrl));
    }
  }

  // Product Documentation section
  lines.push('');
  lines.push('## Product Documentation');
  lines.push('');
  for (const product of products) {
    const basePath = product.id;
    lines.push(`- [${product.name} llms.txt](${siteUrl}/${basePath}/llms.txt): Index of all ${product.name} docs`);
    lines.push(`- [${product.name} llms-full.txt](${siteUrl}/${basePath}/llms-full.txt): Full ${product.name} documentation content`);
  }

  lines.push('');
  return lines.join('\n');
}
