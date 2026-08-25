/**
 * Serve the Markdown twin to clients that ask for Markdown.
 *
 * Appending ".md" to a URL only helps agents that know to try it. Several do not:
 * of seven coding agents surveyed in February 2026, Claude Code, Cursor and OpenCode
 * announce `Accept: text/markdown` but never guess a suffix, while Codex, Gemini CLI,
 * Copilot and Windsurf announce nothing useful. Content negotiation is the only way
 * to reach the first group.
 *
 * The `header` condition in the config below means this function does not run at all
 * for ordinary browser traffic, so it costs nothing on the overwhelming majority of
 * requests.
 *
 * Deliberately does not run on the production domain yet. Netlify excludes `Accept`
 * from `Netlify-Vary` because of its cardinality, and while the standard `Vary` header
 * is documented as feeding cache keys, the failure mode if it does not — a browser
 * served raw Markdown out of the CDN — is bad enough to prove on a preview first.
 */

/**
 * Whether to negotiate on this host.
 *
 * Allow-listed rather than deny-listed, so an unrecognised host means "do not
 * negotiate". Netlify preview and branch deploys are served from *.netlify.app;
 * docs.tigera.io is not, and stays on HTML until the caching behaviour is proven.
 * Promoting it is a deliberate one-line change here.
 *
 * This is decided from the request rather than from an env var because environment
 * plumbing turned out to be the least reliable part of this: CONTEXT is undefined
 * under `netlify dev`, which also ignores [context.dev.environment] in netlify.toml.
 *
 * @param {URL} url
 * @returns {boolean}
 */
export function negotiationEnabled(url) {
  return url.hostname.endsWith('.netlify.app') || url.hostname === 'localhost';
}

/**
 * Quality value for a media type in an Accept header, or null if absent.
 *
 * @param {string} accept
 * @param {string} mediaType
 * @returns {number | null}
 */
function qualityFor(accept, mediaType) {
  for (const entry of accept.split(',')) {
    const [type, ...params] = entry.split(';').map((part) => part.trim());
    if (type.toLowerCase() !== mediaType) {
      continue;
    }

    const q = params.map((p) => p.match(/^q=([0-9.]+)$/i)).find(Boolean);
    return q ? Number.parseFloat(q[1]) : 1;
  }

  return null;
}

/**
 * Whether the client genuinely prefers Markdown over HTML.
 *
 * Substring-matching "text/markdown" is not enough: a client may list it purely as a
 * fallback below HTML. Ties go to Markdown, since a client that names it at all and
 * ranks it level with HTML is signalling it can use it.
 *
 * @param {string | null} accept
 * @returns {boolean}
 */
export function prefersMarkdown(accept) {
  if (!accept) {
    return false;
  }

  const markdown = qualityFor(accept, 'text/markdown');
  if (markdown === null || markdown === 0) {
    return false;
  }

  const html = qualityFor(accept, 'text/html');
  return html === null || markdown >= html;
}

/**
 * The twin path for a doc route, or null if this is not one.
 *
 * Mirrors the emitter: a trailing slash is dropped, because a category index doc's
 * canonical URL carries one while its twin does not.
 *
 * @param {string} pathname
 * @returns {string | null}
 */
export function markdownTwinFor(pathname) {
  // Anything with an extension is an asset or an already-Markdown request.
  if (/\.[a-z0-9]+$/i.test(pathname)) {
    return null;
  }

  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed ? `${trimmed}.md` : null;
}

export default async (request, context) => {
  const url = new URL(request.url);

  if (!negotiationEnabled(url) || !prefersMarkdown(request.headers.get('accept'))) {
    return;
  }

  const twin = markdownTwinFor(url.pathname);
  if (!twin) {
    return;
  }

  // `Accept: */*` on the internal fetch so this cannot re-enter itself, whatever the
  // path matching does later.
  const response = await fetch(new URL(twin, url), { headers: { accept: '*/*' } });

  // No twin for this page — the client gets the HTML it would have got anyway.
  if (!response.ok) {
    return;
  }

  const headers = {
    'content-type': 'text/markdown; charset=utf-8',
    // Tells every cache between here and the client that this URL has more than one
    // representation. Without it a shared cache could hand this body to a browser.
    vary: 'Accept',
    'x-robots-tag': 'noindex',
    // The HTML page is the canonical one; this is an alternate representation.
    link: `<${url.href}>; rel="canonical"`,
  };

  return new Response(response.body, { headers });
};

export const config = {
  // Doc routes only. Everything else — the landing page, /archive, /lynx — is left
  // alone even if something asks it for Markdown.
  path: ['/calico/*', '/calico-enterprise/*', '/calico-cloud/*', '/use-cases/*'],
  excludedPath: ['/*.md', '/*.txt', '/*.json', '/*.yaml', '/*.html', '/*.xml'],
  // GET only. Netlify's manifest schema allows GET, POST, PUT, PATCH, DELETE and
  // OPTIONS — not HEAD — and rejects the whole manifest if HEAD appears, failing the
  // build. A HEAD request therefore gets the HTML page's headers; agents use GET, so
  // this only affects `curl -I` style probing, which needs `curl -sD - -o /dev/null`
  // against a GET instead.
  method: 'GET',
  // The whole point: this function is invisible to clients that do not ask for
  // Markdown, so browser traffic never reaches it.
  header: { accept: 'text/markdown' },
};
