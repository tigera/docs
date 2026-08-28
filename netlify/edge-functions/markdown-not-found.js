/**
 * Answer a missing `.md` URL with a short Markdown body instead of the HTML 404 page.
 *
 * Every doc page has a Markdown twin at the same URL with `.md` appended (see
 * src/plugins/docusaurus-plugin-llms-txt), so `.md` requests come from agents, not
 * browsers. Netlify already returns a real 404 status for a path that does not exist,
 * but the body it returns is the 33 KB Docusaurus shell. An agent that guessed a twin
 * URL wrong learns nothing from that and has no way to recover. This hands it the
 * entry points it can actually use: llms.txt, the sitemap, and the product doc roots.
 *
 * Scoped to `/*.md`, so ordinary page traffic never reaches this function.
 */

/**
 * The headers `static/_headers` would have applied to a `.md` URL.
 *
 * Netlify does not apply custom headers on a path served by an edge function, so
 * without this every twin would lose them the moment this function shipped — and the
 * one that matters is `X-Robots-Tag: noindex`, which is the only thing keeping several
 * thousand Markdown twins out of the index as duplicates of the HTML pages.
 *
 * Duplicating the values is the tradeoff for running here at all. The unit test reads
 * `static/_headers` and fails if the two ever disagree.
 */
export const MARKDOWN_HEADERS = {
  'cross-origin-opener-policy': 'same-origin',
  'x-frame-options': 'DENY',
  'content-security-policy': "frame-ancestors 'none'",
  'x-robots-tag': 'noindex',
};

/**
 * The body served for a missing `.md` URL.
 *
 * Links are absolute so an agent can follow them out of a response it may have fetched
 * without keeping the request URL, and built from the request origin so that deploy
 * previews point at themselves rather than at production.
 *
 * @param {string} origin
 * @returns {string}
 */
export function notFoundMarkdown(origin) {
  return `# Not found

There is no Calico documentation page at this URL.

Every documentation page has a Markdown version at its own URL with \`.md\` appended,
so a page that exists is reachable this way. This one does not exist.

## Where to go instead

- [${origin}/llms.txt](${origin}/llms.txt): an index of the documentation, written for agents
- [${origin}/sitemap.xml](${origin}/sitemap.xml): every published URL
- [${origin}/calico/latest/about.md](${origin}/calico/latest/about.md): Calico Open Source
- [${origin}/calico-enterprise/latest/about.md](${origin}/calico-enterprise/latest/about.md): Calico Enterprise
- [${origin}/calico-cloud/about.md](${origin}/calico-cloud/about.md): Calico Cloud
`;
}

/**
 * A copy of `response` carrying the headers `static/_headers` can no longer add.
 *
 * @param {Response} response
 * @returns {Response}
 */
function withMarkdownHeaders(response) {
  const copy = new Response(response.body, response);

  for (const [name, value] of Object.entries(MARKDOWN_HEADERS)) {
    copy.headers.set(name, value);
  }

  return copy;
}

export default async (request, context) => {
  const response = await context.next();

  // The twin exists, or a redirect in static/_redirects answered first.
  if (response.status !== 404) {
    return withMarkdownHeaders(response);
  }

  const { origin } = new URL(request.url);

  return withMarkdownHeaders(
    new Response(notFoundMarkdown(origin), {
      status: 404,
      headers: { 'content-type': 'text/markdown; charset=utf-8' },
    })
  );
};

export const config = {
  path: '/*.md',
  // GET only, matching markdown-negotiation.js: Netlify's manifest schema has no HEAD
  // and fails the build if it appears. A HEAD request therefore still gets the HTML
  // 404, so verify with `curl -sD - -o /dev/null` against a GET.
  method: 'GET',
};
