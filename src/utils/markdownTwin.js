/**
 * Where a doc page's Markdown twin lives, and whether it has one.
 */

/**
 * The twin path for a permalink.
 *
 * The trailing slash goes first: a category index doc's canonical URL carries one
 * while its twin, a sibling file, does not. netlify/edge-functions/markdown-negotiation.js
 * repeats this rule rather than importing it — that file is bundled separately for
 * Deno and has to stay self-contained.
 *
 * @param {string} permalink
 * @returns {string}
 */
export function twinPathFor(permalink) {
  return `${permalink.replace(/\/+$/, '')}.md`;
}

/**
 * Whether a doc page has a Markdown twin.
 *
 * A few pages render entirely client-side, so they convert to an empty body and the
 * generator publishes no twin. Linking to one would advertise a 404, so those routes
 * are listed in `customFields.markdownTwinExclusions` as path suffixes, which keeps
 * one entry covering the same page across every product and version. The generator
 * checks that list against the pages it actually skipped, so the two cannot drift.
 *
 * @param {string} permalink
 * @param {string[]} exclusions - Path suffixes
 * @returns {boolean}
 */
export function hasMarkdownTwin(permalink, exclusions = []) {
  const route = permalink.replace(/\/+$/, '');
  return !exclusions.some((suffix) => route.endsWith(suffix));
}
