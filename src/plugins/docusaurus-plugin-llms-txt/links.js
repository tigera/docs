/**
 * Link rewriting — point internal doc links at their Markdown twins.
 *
 * Without this, an agent that follows a link out of a twin lands back on a ~110 KB
 * HTML page and loses the saving immediately. With it, following links keeps an
 * agent in Markdown.
 *
 * This runs after conversion rather than inside it, for two reasons: whether a
 * target has a twin is only knowable once every page has been converted, and
 * keeping it out of the converter means the cached value stays link-agnostic, so
 * the cache does not need invalidating when this logic changes.
 */

import { mapNonFencedLines } from './markdown.js';

function escapeForRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Strip a trailing slash, so a category index doc's canonical URL and its twin
 * agree. `/calico/latest/networking/` and `/calico/latest/networking` are the same
 * page, and the twin is `networking.md`.
 *
 * @param {string} pathname
 * @returns {string}
 */
export function normalisePermalink(pathname) {
  return pathname.replace(/\/+$/, '');
}

/**
 * Rewrite absolute links to this site so that anything with a twin points at it.
 *
 * Only exact known twins are rewritten, which is what keeps asset links alone: the
 * corpus carries several hundred links to /assets/, /img/ and /files/, none of
 * which are docs. Links inside fenced code are left untouched, as are links to
 * pages that produced no twin — advertising those would be a 404.
 *
 * @param {string} markdown
 * @param {string} siteUrl - No trailing slash
 * @param {(permalink: string) => boolean} hasTwin
 * @returns {string}
 */
export function rewriteDocLinks(markdown, siteUrl, hasTwin) {
  const pattern = new RegExp(`\\]\\(${escapeForRegExp(siteUrl)}(/[^)\\s]*)\\)`, 'g');

  return mapNonFencedLines(markdown, (line) =>
    line.replace(pattern, (match, target) => {
      const hashAt = target.indexOf('#');
      const pathname = hashAt === -1 ? target : target.slice(0, hashAt);
      const fragment = hashAt === -1 ? '' : target.slice(hashAt);

      const permalink = normalisePermalink(pathname);
      if (!permalink || permalink.endsWith('.md') || !hasTwin(permalink)) {
        return match;
      }

      return `](${siteUrl}${permalink}.md${fragment})`;
    })
  );
}

/**
 * The URL an index should advertise for a doc: its twin when one exists, otherwise
 * the HTML page. A doc with no twin is still a real page.
 *
 * @param {{ permalink: string }} doc
 * @param {string} siteUrl
 * @param {boolean} twinExists
 * @returns {string}
 */
export function docUrl(doc, siteUrl, twinExists) {
  const permalink = normalisePermalink(doc.permalink);
  return twinExists ? `${siteUrl}${permalink}.md` : `${siteUrl}${doc.permalink}`;
}
