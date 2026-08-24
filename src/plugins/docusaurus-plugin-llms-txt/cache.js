/**
 * Conversion cache.
 *
 * Converting a page means parsing a ~150 KB HTML file with cheerio and running it
 * through unified, which costs roughly 17ms per page. Almost none of that work is
 * new on any given build: a typical docs PR changes a handful of pages out of a
 * thousand. Caching the converted Markdown against a hash of the HTML that produced
 * it means each build only pays for what actually changed.
 *
 * The key mixes in a fingerprint of the converter itself, so changing the
 * conversion logic invalidates every entry without anyone having to remember to
 * bump a version.
 */

import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

const SCRIPT_TAGS = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
const LINK_TAGS = /<link\b[^>]*>/gi;

/**
 * Drop the parts of a page that change on a rebuild without the content changing.
 *
 * Webpack fingerprints its bundles, so `runtime~main.<hash>.js` differs after any
 * edit anywhere on the site, and every page references it in <head>. Hashing raw
 * HTML would therefore invalidate the entire cache whenever a single page changed,
 * which defeats the point. Script and link tags never contribute to the extracted
 * content, so removing them before hashing is safe.
 *
 * @param {string} html
 * @returns {string}
 */
export function contentOnly(html) {
  return html.replace(SCRIPT_TAGS, '').replace(LINK_TAGS, '');
}

/**
 * @param {{ cacheDir: string, fingerprint: string }} options
 */
export function createCache({ cacheDir, fingerprint }) {
  const used = new Set();
  let hits = 0;
  let misses = 0;

  return {
    /**
     * Cache key for a rendered page.
     *
     * @param {string} html - Raw page HTML
     * @returns {string}
     */
    keyFor(html) {
      return crypto
        .createHash('sha256')
        .update(fingerprint)
        .update('\0')
        .update(contentOnly(html))
        .digest('hex');
    },

    /**
     * @param {string} key
     * @returns {Promise<object | null>}
     */
    async get(key) {
      used.add(key);

      try {
        const raw = await fs.readFile(path.join(cacheDir, `${key}.json`), 'utf-8');
        hits++;
        return JSON.parse(raw);
      } catch {
        misses++;
        return null;
      }
    },

    /**
     * @param {string} key
     * @param {object} value
     */
    async set(key, value) {
      used.add(key);
      await fs.mkdir(cacheDir, { recursive: true });
      await fs.writeFile(path.join(cacheDir, `${key}.json`), JSON.stringify(value));
    },

    /**
     * Drop entries this build did not touch, so the cache tracks the current site
     * rather than growing without bound across every page that ever existed.
     *
     * @returns {Promise<number>} Entries removed
     */
    async prune() {
      let removed = 0;

      let entries;
      try {
        entries = await fs.readdir(cacheDir);
      } catch {
        return 0;
      }

      for (const entry of entries) {
        if (!entry.endsWith('.json') || used.has(entry.slice(0, -'.json'.length))) {
          continue;
        }
        await fs.rm(path.join(cacheDir, entry), { force: true });
        removed++;
      }

      return removed;
    },

    get stats() {
      return { hits, misses };
    },
  };
}

/**
 * Fingerprint the modules that determine conversion output, so that editing them
 * invalidates the cache.
 *
 * @param {string[]} filePaths
 * @returns {Promise<string>}
 */
export async function fingerprintConverter(filePaths) {
  const hash = crypto.createHash('sha256');

  for (const filePath of filePaths.slice().sort()) {
    try {
      hash.update(await fs.readFile(filePath));
    } catch (error) {
      // Failing closed is right — a fingerprint computed from a partial input set
      // would silently reuse entries it should not — but the bare ENOENT names
      // nothing, so say which input and why it matters.
      throw new Error(
        `docusaurus-plugin-llms-txt: cannot fingerprint ${filePath}, which determines ` +
          `Markdown conversion output: ${error.message}`
      );
    }
  }

  return hash.digest('hex');
}
