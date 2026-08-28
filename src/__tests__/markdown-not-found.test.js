/**
 * The handler builds and inspects Request and Response objects, which the default
 * jsdom environment does not provide. Deno gives the real edge runtime both.
 *
 * @jest-environment node
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import handler, {
  MARKDOWN_HEADERS,
  config,
  notFoundMarkdown,
} from '../../netlify/edge-functions/markdown-not-found.js';

/**
 * The headers `static/_headers` declares for a `.md` URL, lowercased.
 *
 * A later rule wins over an earlier wildcard, so the blocks are merged in file order.
 */
function declaredHeadersForMarkdown() {
  const file = readFileSync(join(__dirname, '../../static/_headers'), 'utf8');
  const merged = {};
  let applies = false;

  for (const line of file.split('\n')) {
    if (line.trim().startsWith('#') || line.trim() === '') {
      continue;
    }

    if (!/^\s/.test(line)) {
      applies = line.trim() === '/*' || line.trim() === '/*.md';
      continue;
    }

    if (!applies) {
      continue;
    }

    const [name, ...rest] = line.trim().split(':');
    merged[name.toLowerCase()] = rest.join(':').trim();
  }

  return merged;
}

describe('notFoundMarkdown', () => {
  const body = notFoundMarkdown('https://docs.tigera.io');

  it('names the three entry points an agent can recover from', () => {
    expect(body).toContain('https://docs.tigera.io/llms.txt');
    expect(body).toContain('https://docs.tigera.io/sitemap.xml');
    expect(body).toContain('https://docs.tigera.io/calico/latest/about.md');
  });

  it('stays short enough to be worth reading', () => {
    // The point of this function is that the 33 KB Docusaurus shell tells an agent
    // nothing. A long replacement would give up the only advantage it has.
    expect(body.length).toBeLessThan(1500);
  });

  it('keeps links on the origin it was asked about', () => {
    // A deploy preview must link to itself, not to production, or a reviewer
    // checking the preview silently ends up reading the live site.
    const preview = notFoundMarkdown('https://deploy-preview-1--tigera.netlify.app');

    expect(preview).not.toContain('docs.tigera.io');
    expect(preview).toContain('https://deploy-preview-1--tigera.netlify.app/llms.txt');
  });
});

describe('handler', () => {
  const request = new Request('https://docs.tigera.io/calico/latest/nope.md');

  it('replaces the HTML 404 with markdown', async () => {
    const context = { next: async () => new Response('<html>the shell</html>', { status: 404 }) };

    const response = await handler(request, context);

    expect(response.status).toBe(404);
    expect(response.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
    expect(await response.text()).toContain('/llms.txt');
  });

  it('passes a twin that exists straight through', async () => {
    const context = { next: async () => new Response('# A real page', { status: 200 }) };

    const response = await handler(request, context);

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('# A real page');
  });

  it('leaves a redirect alone', async () => {
    // `/*/index /:splat 301!` and the version redirects in static/_redirects can
    // answer a `.md` request; rewriting those to a 404 body would break them.
    const context = { next: async () => new Response(null, { status: 301, headers: { location: '/elsewhere' } }) };

    const response = await handler(request, context);

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('/elsewhere');
  });

  it('keeps the twins noindexed on every path through the function', async () => {
    for (const status of [200, 301, 404]) {
      const context = { next: async () => new Response(null, { status }) };

      const response = await handler(request, context);

      expect(response.headers.get('x-robots-tag')).toBe('noindex');
      expect(response.headers.get('x-frame-options')).toBe('DENY');
    }
  });
});

describe('config', () => {
  it('runs only on markdown URLs', () => {
    expect(config.path).toBe('/*.md');
  });

  it('declares only methods Netlify accepts', () => {
    // Netlify's manifest schema has no HEAD, and rejects the whole manifest if it
    // appears — see the same note in markdown-negotiation.js.
    expect(config.method).toBe('GET');
  });
});

describe('MARKDOWN_HEADERS', () => {
  it('matches what static/_headers declares for .md URLs', () => {
    // Netlify skips custom headers on a path served by an edge function, so these
    // values are the only thing keeping the twins noindexed once this ships. If a
    // rule in static/_headers changes and this does not, the twins silently lose it.
    expect(MARKDOWN_HEADERS).toEqual(declaredHeadersForMarkdown());
  });
});
