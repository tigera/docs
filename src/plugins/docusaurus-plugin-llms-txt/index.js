/**
 * docusaurus-plugin-llms-txt
 *
 * A Docusaurus postBuild plugin that generates a Markdown twin of every doc page,
 * plus hierarchical llms.txt and llms-full.txt files, from rendered HTML output.
 *
 * Runs on every build. Conversion is cached against a hash of each page's HTML, so
 * only pages whose rendered output changed are reconverted.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { walkSidebar } from './sidebar-utils.js';
import { extractFromHtmlString } from './extract.js';
import { convertToMarkdown } from './convert.js';
import {
  generateProductIndex,
  generateProductFull,
  generateRootIndex,
  hasContent,
} from './generate.js';
import { writePageMarkdown } from './pages.js';
import { createCache, fingerprintConverter } from './cache.js';

const PLUGIN_NAME = 'docusaurus-plugin-llms-txt';
const LOG_PREFIX = '[llms-txt]';
const CACHE_DIR_NAME = '.llms-cache';
const USE_CASES_NAME = 'Calico use cases';

/**
 * How many pages in a version may convert to an empty body before the build fails.
 *
 * Empty pages are legitimate — a stub, or a page that renders client-side — so a
 * count of zero cannot be the rule. But "all of them" is far too loose: a theme
 * change that empties the content container on part of a product would drop most
 * of its twins and still pass, which is exactly the silent partial failure these
 * guards exist to prevent. A proportion catches that while leaving room for stubs.
 *
 * The real figure today is 3 of 1,043 pages, or 0.3%, so this has ample headroom.
 * The absolute minimum keeps small versions from tripping on a single stub, but it
 * must stay below the size of the smallest instance or the guard cannot fire there
 * at all: use-cases has five docs, so a minimum of five made it dead exactly where
 * a proportion is least meaningful.
 */
const EMPTY_PAGE_LIMIT = { rate: 0.05, minimum: 2 };

/**
 * How many empty pages a version of this size may have before the build fails.
 *
 * Exported so the arithmetic is testable: the previous minimum exceeded the size of
 * the smallest instance, which made the guard silently unable to fire there, and no
 * test would have noticed.
 *
 * @param {number} docCount
 * @returns {number}
 */
export function emptyPageAllowance(docCount) {
  return Math.max(EMPTY_PAGE_LIMIT.minimum, Math.ceil(docCount * EMPTY_PAGE_LIMIT.rate));
}

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const requireFromHere = createRequire(import.meta.url);

/**
 * Read a display version out of a docs version's variables.js.
 *
 * Docusaurus version names are navigation labels, not product versions. Calico
 * Cloud's is "23-2", which appears in no URL and no version dropdown, so an agent
 * has nothing to corroborate it against. The docs themselves render $[cloudUserVersion],
 * and that is the string a reader would recognise.
 *
 * The location mirrors src/utils/getVariableByFilePath.js, which resolves the same
 * files for the remark plugin.
 *
 * @returns {string | null}
 */
function versionLabelFromVariables(variableName, docsPath, version, siteDir) {
  const versionDir =
    version.versionName === 'current'
      ? path.join(siteDir, docsPath)
      : path.join(siteDir, `${docsPath}_versioned_docs`, `version-${version.versionName}`);
  const variablesPath = path.join(versionDir, 'variables.js');

  try {
    const value = requireFromHere(variablesPath)[variableName];
    if (typeof value === 'string' && value) {
      return value;
    }
    console.warn(`${LOG_PREFIX} ${variablesPath} has no string "${variableName}"`);
  } catch (error) {
    console.warn(`${LOG_PREFIX} Could not read ${variablesPath}: ${error.message}`);
  }

  // Fall back to the Docusaurus label rather than failing; a display string is not
  // worth a red build.
  return null;
}

/**
 * Modules whose contents determine the *cached* value.
 *
 * pages.js is deliberately absent: frontmatter is assembled at write time from
 * cached data, not stored in the cache, so editing it takes effect without any
 * invalidation. Including it would reconvert all 1,043 pages for nothing.
 */
const CONVERTER_MODULES = ['extract.js', 'convert.js'].map((f) => path.join(MODULE_DIR, f));

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
 * The conversion is cached against a hash of the HTML, so unchanged pages cost
 * only a file read and a hash.
 *
 * @returns {Promise<{ title, description, permalink, markdown, sectionLabel } | null>}
 */
async function processDoc(doc, sectionLabel, outDir, siteUrl, cache) {
  const htmlPath = path.join(outDir, doc.permalink, 'index.html');

  let rawHtml;
  try {
    rawHtml = await fs.readFile(htmlPath, 'utf-8');
  } catch {
    return null;
  }

  const key = cache.keyFor(rawHtml);
  let converted = await cache.get(key);

  if (!converted) {
    const extracted = extractFromHtmlString(rawHtml);
    if (!extracted) {
      return null;
    }

    converted = {
      title: extracted.title,
      description: extracted.description,
      markdown: await convertToMarkdown(extracted.html, siteUrl),
    };
    await cache.set(key, converted);
  }

  return {
    title: converted.title || doc.title,
    description: converted.description || doc.description || '',
    permalink: doc.permalink,
    markdown: converted.markdown,
    sectionLabel,
  };
}

const BATCH_SIZE = 50;

/**
 * Convert every doc in one loaded version.
 *
 * Every doc is converted, not just the sidebar-reachable ones, so that orphan
 * pages still get a Markdown twin. The sidebar is still walked, because llms.txt
 * needs its order and section labels.
 *
 * @returns {Promise<{ versionLabel: string, allDocs: object[], sidebarDocs: object[] }>}
 */
async function processVersion(version, outDir, siteUrl, cache) {
  const versionLabel = version.label || version.versionName;

  const docsById = new Map();
  for (const doc of version.docs) {
    docsById.set(doc.id, doc);
  }

  const sidebarEntries = walkSidebar(version.sidebars, docsById);
  const sectionByDocId = new Map();
  for (const { docId, sectionLabel } of sidebarEntries) {
    if (!sectionByDocId.has(docId)) {
      sectionByDocId.set(docId, sectionLabel);
    }
  }

  console.log(
    `${LOG_PREFIX} Processing ${version.docs.length} pages (version ${versionLabel})...`
  );

  // Process each doc — concurrently in batches to avoid overwhelming I/O
  const processedById = new Map();
  const skipped = [];

  for (let i = 0; i < version.docs.length; i += BATCH_SIZE) {
    const batch = version.docs.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map((doc) => processDoc(doc, sectionByDocId.get(doc.id) || '', outDir, siteUrl, cache))
    );

    results.forEach((result, index) => {
      if (result) {
        processedById.set(batch[index].id, result);
      } else {
        skipped.push(batch[index].id);
      }
    });
  }

  // Two structural causes reach here: the page's HTML file was missing entirely, or
  // it contained no content container at all. Both mean the build output is not
  // shaped the way this plugin expects. A page that is merely empty does not reach
  // here — it converts to an empty body and is counted against the limit below.
  if (skipped.length > 0) {
    throw new Error(
      `${PLUGIN_NAME}: ${skipped.length} of ${version.docs.length} docs in version ` +
        `${versionLabel} had no readable HTML or no content container: ` +
        `${skipped.slice(0, 5).join(', ')}` +
        `${skipped.length > 5 ? `, and ${skipped.length - 5} more` : ''}`
    );
  }

  if (version.docs.length === 0) {
    throw new Error(`${PLUGIN_NAME}: version ${versionLabel} loaded no docs at all.`);
  }

  // Guard the proportion, not just the total. Counting only "did this version
  // produce nothing" leaves the whole 1-99% band silent, and a version that lost
  // three quarters of its twins would still pass while llms-full.txt quietly shrank
  // by the same amount.
  const empty = [...processedById.values()].filter((doc) => !hasContent(doc)).length;
  const allowed = emptyPageAllowance(version.docs.length);

  if (empty > allowed) {
    throw new Error(
      `${PLUGIN_NAME}: ${empty} of ${version.docs.length} pages in version ${versionLabel} ` +
        `converted to an empty body, above the limit of ${allowed}. Either the content ` +
        'container changed shape, or these pages genuinely have no content and the limit ' +
        'needs raising.'
    );
  }

  // llms.txt keeps sidebar order and leaves orphans out
  const sidebarDocs = [];
  for (const { docId } of sidebarEntries) {
    const processed = processedById.get(docId);
    if (processed) {
      sidebarDocs.push(processed);
    }
  }

  return { versionLabel, allDocs: [...processedById.values()], sidebarDocs };
}

/**
 * Process one docs plugin instance.
 *
 * With `versions: 'all'` every built version is converted; the default 'last'
 * covers only the version served at /latest (or the sole version, for the
 * unversioned instances). llms.txt and llms-full.txt always describe the last
 * version regardless.
 *
 * `options.unversioned` suppresses the version in frontmatter, and is passed
 * explicitly by the caller rather than inferred from the loaded versions. Inferring
 * it is not safe: scripts/cc-next-preview-config.sh rewrites every instance to a
 * single 'current' version for the Calico Cloud preview build, which makes every
 * product look unversioned.
 */
async function processProduct(docsPlugin, outDir, siteUrl, options, cache) {
  const content = docsPlugin.content;
  const docsPath = docsPlugin.options?.path;
  if (!content?.loadedVersions?.length) {
    console.warn(`${LOG_PREFIX} No loaded versions for plugin instance`);
    return null;
  }

  const selected =
    options.versions === 'all'
      ? content.loadedVersions
      : content.loadedVersions.filter((v) => v.isLast);

  if (!selected.length) {
    console.warn(`${LOG_PREFIX} No latest version found`);
    return null;
  }

  const versions = [];
  for (const version of selected) {
    const result = await processVersion(version, outDir, siteUrl, cache);
    // Precedence: unversioned wins, then a variables.js label, then Docusaurus's own.
    let versionLabel = result.versionLabel;
    if (options.unversioned) {
      versionLabel = '';
    } else if (options.versionVariable && docsPath && options.siteDir) {
      versionLabel =
        versionLabelFromVariables(options.versionVariable, docsPath, version, options.siteDir) ??
        result.versionLabel;
    }

    versions.push({ ...result, versionLabel, isLast: Boolean(version.isLast) });
  }

  const lastVersion = versions.find((v) => v.isLast) || versions[0];

  return {
    versions,
    docs: lastVersion.sidebarDocs,
    versionLabel: lastVersion.versionLabel,
  };
}

/**
 * Fail unless a product produced pages, converted them, and published twins.
 *
 * Each count catches a different failure: converted covers extraction, sidebar
 * covers llms.txt, and written covers publication — which stopped being implied by
 * the other two once pages with empty bodies began to be skipped.
 */
function assertProductProduced(result, productName, written) {
  const converted = result
    ? result.versions.reduce((total, v) => total + v.allDocs.length, 0)
    : 0;
  const sidebar = result ? result.docs.length : 0;

  if (!result || converted === 0 || sidebar === 0 || written === 0) {
    throw new Error(
      `${PLUGIN_NAME}: ${productName} produced no usable output ` +
        `(${converted} converted, ${sidebar} in the sidebar, ${written} twins written). ` +
        'Refusing to publish a site that is missing a whole product.'
    );
  }
}

/**
 * Write Markdown twins for every processed doc across every processed version.
 *
 * @returns {Promise<number>} Number of pages written
 */
async function writeProductPages(result, outDir, productName, siteUrl) {
  let count = 0;

  let skipped = 0;

  for (const version of result.versions) {
    for (let i = 0; i < version.allDocs.length; i += BATCH_SIZE) {
      const batch = version.allDocs.slice(i, i + BATCH_SIZE);
      const written = await Promise.all(
        batch.map((doc) =>
          writePageMarkdown(doc, outDir, {
            productName,
            versionLabel: version.versionLabel,
            siteUrl,
          })
        )
      );

      // A zero means the page had no body and was deliberately not published.
      count += written.filter((bytes) => bytes > 0).length;
      skipped += written.filter((bytes) => bytes === 0).length;
    }
  }

  if (skipped > 0) {
    console.warn(
      `${LOG_PREFIX} ${productName}: skipped ${skipped} page(s) with an empty body ` +
        '(a stub, or a page that renders client-side); no twin is published for these'
    );
  }

  return count;
}

export default function llmsTxtPlugin(context, options) {
  return {
    name: PLUGIN_NAME,

    async postBuild(props) {
      console.log(`${LOG_PREFIX} Starting Markdown generation...`);
      const startTime = Date.now();

      const { outDir, plugins, siteConfig, siteDir } = props;
      const siteUrl = siteConfig.url.replace(/\/$/, '');

      // The fingerprint has to cover everything that determines conversion output,
      // not just our own modules. The conversion is done by cheerio, unified, rehype
      // and remark, all on caret ranges, so a dependency bump can change the Markdown
      // while every cache key stays the same — which would freeze every page at the
      // old conversion until its HTML happened to change, with nothing to notice it by.
      // yarn.lock covers transitive dependencies too, at the cost of reconverting on
      // an unrelated bump. siteUrl is in here because links are absolutised against it.
      const cache = createCache({
        cacheDir: path.join(siteDir, CACHE_DIR_NAME),
        fingerprint: `${await fingerprintConverter([
          ...CONVERTER_MODULES,
          path.join(siteDir, 'yarn.lock'),
        ])}:${siteUrl}`,
      });

      const {
        siteDescription = '',
        productDescriptions = {},
        topPages = [],
        optionalSections = [],
        versions = 'last',
        versionVariables = {},
      } = options;

      // Find all docs plugin instances
      const docsPlugins = plugins.filter(
        (p) => p.name === 'docusaurus-plugin-content-docs'
      );

      // Separate product instances from use-cases
      const productPlugins = [];
      let useCasesPlugin = null;

      const unrecognised = [];

      for (const dp of docsPlugins) {
        const instanceId = dp.options?.id || 'default';
        if (instanceId === 'use-cases') {
          useCasesPlugin = dp;
        } else if (productDescriptions[instanceId]) {
          productPlugins.push({ plugin: dp, instanceId });
        } else if (instanceId !== 'default') {
          unrecognised.push(instanceId);
        }
      }

      // Use-cases runs in the same set as the products. Running it afterwards meant a
      // use-cases failure was never reached when a product had already failed, and
      // when it failed alone it threw bare instead of joining the collected report.
      const instances = [
        ...productPlugins.map(({ plugin, instanceId }) => ({
          plugin,
          instanceId,
          productName: PRODUCT_NAMES[instanceId] || instanceId,
          description: productDescriptions[instanceId] || '',
          isProduct: true,
        })),
        ...(useCasesPlugin
          ? [
              {
                plugin: useCasesPlugin,
                instanceId: 'use-cases',
                productName: USE_CASES_NAME,
                description: '',
                isProduct: false,
                unversioned: true,
              },
            ]
          : []),
      ];

      // Not fatal — a new instance may genuinely not want Markdown output — but it
      // should never be silent, or a whole product could be added and never covered.
      if (unrecognised.length > 0) {
        console.warn(
          `${LOG_PREFIX} No productDescriptions entry for ${unrecognised.join(', ')}; ` +
            'these docs get no Markdown twins'
        );
      }

      // Process all products concurrently
      let pagesWritten = 0;
      const allProcessedDocs = new Map(); // instanceId → processedDocs[]
      const productMeta = []; // for root index linking

      const outcomes = await Promise.allSettled(
        instances.map(async ({ plugin, instanceId, productName, description, isProduct, unversioned }) => {
          console.log(`${LOG_PREFIX} Processing ${productName}...`);
          const result = await processProduct(
            plugin,
            outDir,
            siteUrl,
            {
              ...options,
              versions,
              unversioned,
              siteDir,
              versionVariable: versionVariables[instanceId],
            },
            cache
          );

          // Resolve first, then add: `x += await f()` reads x before awaiting, so
          // concurrent products would clobber each other's count.
          const written = result
            ? await writeProductPages(result, outDir, productName, siteUrl)
            : 0;

          // A product dropping out used to be a warning, which meant a green build
          // could publish a site missing hundreds of pages and 404 on llms.txt paths
          // that were live beforehand. Nothing downstream notices, so check here.
          assertProductProduced(result, productName, written);

          allProcessedDocs.set(instanceId, result);
          pagesWritten += written;

          // Use-cases contributes only to the root llms.txt; it has no files of its own.
          if (!isProduct) {
            return;
          }

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
            result.docs,
            siteUrl
          );
          const fullPath = path.join(outDir, instanceId, 'llms-full.txt');
          await fs.writeFile(fullPath, fullContent);
          console.log(`${LOG_PREFIX} Wrote ${fullPath} (${formatSize(Buffer.byteLength(fullContent))})`);

          productMeta.push({ id: instanceId, name: productName });
        })
      );

      // Products run concurrently, so a sibling failing does not stop the others and
      // Promise.all would surface only whichever rejected first. Report them all.
      const failures = outcomes
        .filter((o) => o.status === 'rejected')
        .map((o) => (o.reason instanceof Error ? o.reason.message : String(o.reason)));

      if (failures.length > 0) {
        throw new Error(
          `${PLUGIN_NAME}: ${failures.length} product(s) failed:\n  - ${failures.join('\n  - ')}`
        );
      }

      // Use-cases was processed in the set above; pull its docs out for the root index.
      const useCaseResult = allProcessedDocs.get('use-cases');
      const useCaseDocs = useCaseResult ? useCaseResult.docs : [];

      // Resolve top pages from the processed docs across all products
      const allDocsFlat = [];
      for (const [instanceId, result] of allProcessedDocs) {
        // use-cases is added below; it is in this map too now that it runs in the
        // same set, and adding it twice would double-count it.
        if (instanceId !== 'use-cases') {
          allDocsFlat.push(...result.docs);
        }
      }
      allDocsFlat.push(...useCaseDocs);

      // Normalize permalink for consistent lookup (strip trailing slash)
      const normalizePermalink = (p) => p.replace(/\/+$/, '') || '/';

      const docsByPermalink = new Map();
      for (const doc of allDocsFlat) {
        docsByPermalink.set(normalizePermalink(doc.permalink), doc);
      }

      const topPageDocs = [];
      for (const permalink of topPages) {
        const doc = docsByPermalink.get(normalizePermalink(permalink));
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

      // Backstop only — the per-product check above catches partial failures, which
      // this cannot, since one healthy product would satisfy it.
      if (pagesWritten === 0) {
        throw new Error(
          `${PLUGIN_NAME}: generation ran but produced no Markdown pages. ` +
            'Check that the docs plugin instances loaded and that build output exists.'
        );
      }

      const { hits, misses } = cache.stats;
      const pruned = await cache.prune();

      // These count different things and used to be conflated, which produced the
      // nonsense of writing more pages than were processed: totalDocs is the
      // sidebar-reachable docs of the last version that llms.txt indexes, while
      // pagesWritten is twins across every processed version, orphans included.
      console.log(
        `${LOG_PREFIX} Done in ${elapsed}s. Wrote ${pagesWritten} Markdown twins; ` +
          `llms.txt indexes ${totalDocs} docs ` +
          `(${hits} conversions cached, ${misses} run, ${pruned} stale entries dropped).`
      );
    },
  };
}
