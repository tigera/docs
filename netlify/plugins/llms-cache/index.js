/**
 * Persist the Markdown conversion cache between Netlify builds.
 *
 * Without this the cache is cold on every build, because each build runs in a
 * fresh container. With it, a build only reconverts the pages whose rendered HTML
 * actually changed — typically a handful out of a thousand.
 *
 * The cache is keyed by a hash of each page's HTML plus a fingerprint of the
 * converter, so a restored cache can never serve output from different source or
 * different conversion logic.
 */

const CACHE_DIR = '.llms-cache';

module.exports = {
  async onPreBuild({ utils }) {
    if (await utils.cache.restore(CACHE_DIR)) {
      console.log(`Restored the Markdown conversion cache from ${CACHE_DIR}`);
    } else {
      console.log('No Markdown conversion cache found; this build converts every page');
    }
  },

  async onPostBuild({ utils }) {
    await utils.cache.save(CACHE_DIR);
    console.log(`Saved the Markdown conversion cache from ${CACHE_DIR}`);
  },
};
