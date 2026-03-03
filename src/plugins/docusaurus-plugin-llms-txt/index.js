/**
 * docusaurus-plugin-llms-txt
 *
 * A Docusaurus postBuild plugin that generates hierarchical llms.txt
 * and llms-full.txt files from rendered HTML output.
 *
 * Gated by GENERATE_LLMS=true environment variable — no-op on regular builds.
 */

import fs from 'fs/promises';
import path from 'path';
import { walkSidebar } from './sidebar-utils.js';
import { extractFromHtml } from './extract.js';
import { convertToMarkdown } from './convert.js';
import {
  generateProductIndex,
  generateProductFull,
  generateRootIndex,
} from './generate.js';

const PLUGIN_NAME = 'docusaurus-plugin-llms-txt';
const LOG_PREFIX = '[llms-txt]';

/** Pretty-print byte size */
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Product display names */
const PRODUCT_NAMES = {
  calico: 'Calico Open Source',
  'calico-enterprise': 'Calico Enterprise',
  'calico-cloud': 'Calico Cloud',
};

/**
 * Process a single doc: read HTML, extract content, convert to Markdown.
 *
 * @returns {Promise<{ title, description, permalink, markdown, sectionLabel } | null>}
 */
async function processDoc(doc, sectionLabel, outDir, siteUrl) {
  // Map permalink to HTML file path
  const htmlPath = path.join(outDir, doc.permalink, 'index.html');
  const extracted = await extractFromHtml(htmlPath);

  if (!extracted) {
    return null;
  }

  const markdown = await convertToMarkdown(extracted.html, siteUrl);

  return {
    title: extracted.title || doc.title,
    description: extracted.description || doc.description || '',
    permalink: doc.permalink,
    markdown,
    sectionLabel,
  };
}

/**
 * Process all docs for a single product (plugin instance + latest version).
 */
async function processProduct(docsPlugin, outDir, siteUrl, options) {
  const content = docsPlugin.content;
  if (!content?.loadedVersions?.length) {
    console.warn(`${LOG_PREFIX} No loaded versions for plugin instance`);
    return null;
  }

  // Find the latest version
  const latestVersion = content.loadedVersions.find((v) => v.isLast);
  if (!latestVersion) {
    console.warn(`${LOG_PREFIX} No latest version found`);
    return null;
  }

  // Build a map of docId → doc metadata
  const docsById = new Map();
  for (const doc of latestVersion.docs) {
    docsById.set(doc.id, doc);
  }

  // Walk the sidebar to get ordered doc list with section labels
  const sidebarEntries = walkSidebar(latestVersion.sidebars, docsById);

  console.log(
    `${LOG_PREFIX} Processing ${sidebarEntries.length} pages (version ${latestVersion.label || latestVersion.versionName})...`
  );

  // Process each doc — concurrently in batches to avoid overwhelming I/O
  const BATCH_SIZE = 50;
  const processedDocs = [];
  const skipped = [];

  for (let i = 0; i < sidebarEntries.length; i += BATCH_SIZE) {
    const batch = sidebarEntries.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(({ docId, sectionLabel }) => {
        const doc = docsById.get(docId);
        if (!doc) {
          skipped.push(docId);
          return null;
        }
        return processDoc(doc, sectionLabel, outDir, siteUrl);
      })
    );
    processedDocs.push(...results.filter(Boolean));
  }

  if (skipped.length > 0) {
    console.warn(`${LOG_PREFIX} Skipped ${skipped.length} docs not found in metadata: ${skipped.slice(0, 5).join(', ')}${skipped.length > 5 ? '...' : ''}`);
  }

  return {
    docs: processedDocs,
    versionLabel: latestVersion.label || latestVersion.versionName,
  };
}

export default function llmsTxtPlugin(context, options) {
  return {
    name: PLUGIN_NAME,

    async postBuild(props) {
      if (process.env.GENERATE_LLMS !== 'true') {
        return;
      }

      console.log(`${LOG_PREFIX} Starting llms.txt generation...`);
      const startTime = Date.now();

      const { outDir, plugins, siteConfig } = props;
      const siteUrl = siteConfig.url.replace(/\/$/, '');

      const {
        siteDescription = '',
        productDescriptions = {},
        topPages = [],
        optionalSections = [],
      } = options;

      // Find all docs plugin instances
      const docsPlugins = plugins.filter(
        (p) => p.name === 'docusaurus-plugin-content-docs'
      );

      // Separate product instances from use-cases
      const productPlugins = [];
      let useCasesPlugin = null;

      for (const dp of docsPlugins) {
        const instanceId = dp.options?.id || 'default';
        if (instanceId === 'use-cases') {
          useCasesPlugin = dp;
        } else if (productDescriptions[instanceId]) {
          productPlugins.push({ plugin: dp, instanceId });
        }
      }

      // Process all products concurrently
      const allProcessedDocs = new Map(); // instanceId → processedDocs[]
      const productMeta = []; // for root index linking

      await Promise.all(
        productPlugins.map(async ({ plugin, instanceId }) => {
          const productName = PRODUCT_NAMES[instanceId] || instanceId;
          const description = productDescriptions[instanceId] || '';

          console.log(`${LOG_PREFIX} Processing ${productName}...`);
          const result = await processProduct(plugin, outDir, siteUrl, options);

          if (!result || result.docs.length === 0) {
            console.warn(`${LOG_PREFIX} No docs processed for ${productName}`);
            return;
          }

          allProcessedDocs.set(instanceId, result);

          // Generate per-product llms.txt
          const indexContent = generateProductIndex(
            productName,
            description,
            result.docs,
            siteUrl,
            optionalSections
          );
          const indexPath = path.join(outDir, instanceId, 'llms.txt');
          await fs.mkdir(path.dirname(indexPath), { recursive: true });
          await fs.writeFile(indexPath, indexContent);
          console.log(`${LOG_PREFIX} Wrote ${indexPath} (${formatSize(Buffer.byteLength(indexContent))})`);

          // Generate per-product llms-full.txt
          const fullContent = generateProductFull(
            productName,
            description,
            result.versionLabel,
            result.docs
          );
          const fullPath = path.join(outDir, instanceId, 'llms-full.txt');
          await fs.writeFile(fullPath, fullContent);
          console.log(`${LOG_PREFIX} Wrote ${fullPath} (${formatSize(Buffer.byteLength(fullContent))})`);

          productMeta.push({ id: instanceId, name: productName });
        })
      );

      // Process use-cases for the root file
      let useCaseDocs = [];
      if (useCasesPlugin) {
        const result = await processProduct(useCasesPlugin, outDir, siteUrl, options);
        if (result) {
          useCaseDocs = result.docs;
        }
      }

      // Resolve top pages from the processed docs across all products
      const allDocsFlat = [];
      for (const result of allProcessedDocs.values()) {
        allDocsFlat.push(...result.docs);
      }
      allDocsFlat.push(...useCaseDocs);

      const docsByPermalink = new Map();
      for (const doc of allDocsFlat) {
        docsByPermalink.set(doc.permalink, doc);
      }

      const topPageDocs = [];
      for (const permalink of topPages) {
        const doc = docsByPermalink.get(permalink);
        if (doc) {
          topPageDocs.push(doc);
        } else {
          console.warn(`${LOG_PREFIX} Top page not found: ${permalink}`);
        }
      }

      // Generate root llms.txt
      // Sort product meta to have a consistent order
      productMeta.sort((a, b) => a.id.localeCompare(b.id));

      const rootContent = generateRootIndex(
        siteDescription,
        topPageDocs,
        useCaseDocs,
        productMeta,
        siteUrl
      );
      const rootPath = path.join(outDir, 'llms.txt');
      await fs.writeFile(rootPath, rootContent);
      console.log(`${LOG_PREFIX} Wrote ${rootPath} (${formatSize(Buffer.byteLength(rootContent))})`);

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const totalDocs = allDocsFlat.length;
      console.log(`${LOG_PREFIX} Done. Processed ${totalDocs} docs in ${elapsed}s.`);
    },
  };
}
