import {
  config,
  markdownTwinFor,
  negotiationEnabled,
  prefersMarkdown,
} from '../../netlify/edge-functions/markdown-negotiation.js';

describe('prefersMarkdown', () => {
  it('accepts what Claude Code sends', () => {
    expect(prefersMarkdown('text/markdown, text/html, */*')).toBe(true);
  });

  it('accepts what Cursor and OpenCode send', () => {
    expect(prefersMarkdown('text/markdown;q=1.0, text/html;q=0.9, */*;q=0.8')).toBe(true);
    expect(prefersMarkdown('text/markdown;q=1.0')).toBe(true);
  });

  it('declines when HTML outranks Markdown', () => {
    // Listing Markdown as a fallback is not a request for it.
    expect(prefersMarkdown('text/html;q=1.0, text/markdown;q=0.5')).toBe(false);
  });

  it('declines an explicit q=0', () => {
    expect(prefersMarkdown('text/markdown;q=0, text/html')).toBe(false);
  });

  it('declines a browser Accept header', () => {
    expect(
      prefersMarkdown('text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,*/*;q=0.8')
    ).toBe(false);
  });

  it('declines when there is no Accept header at all', () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown('')).toBe(false);
  });

  it('serves Markdown on a tie, and tolerates odd spacing and case', () => {
    expect(prefersMarkdown('TEXT/MARKDOWN , text/html')).toBe(true);
    expect(prefersMarkdown('text/markdown;q=0.7,text/html;q=0.7')).toBe(true);
  });

  it('is not fooled by a media type that merely contains the string', () => {
    expect(prefersMarkdown('text/markdown-x, text/html')).toBe(false);
  });
});

describe('markdownTwinFor', () => {
  it('maps a leaf doc route to its twin', () => {
    expect(markdownTwinFor('/calico/latest/networking/configuring/bgp')).toBe(
      '/calico/latest/networking/configuring/bgp.md'
    );
  });

  it('drops the trailing slash a category index doc carries', () => {
    expect(markdownTwinFor('/calico/latest/networking/')).toBe('/calico/latest/networking.md');
  });

  it('leaves anything with an extension alone', () => {
    // Guards against re-entering on the twin itself, and against assets.
    for (const p of ['/calico/latest/about.md', '/llms.txt', '/assets/js/main.abc.js']) {
      expect(markdownTwinFor(p)).toBeNull();
    }
  });

  it('returns null for the site root', () => {
    expect(markdownTwinFor('/')).toBeNull();
  });
});

describe('negotiationEnabled', () => {
  const on = (host) => negotiationEnabled(new URL(`https://${host}/calico/latest/about`));

  it('is off on the production domain', () => {
    // Until Vary: Accept is proven against Netlify's CDN, docs.tigera.io stays HTML.
    expect(on('docs.tigera.io')).toBe(false);
  });

  it('is on for Netlify preview and branch deploys', () => {
    expect(on('deploy-preview-2964--tigera.netlify.app')).toBe(true);
    expect(on('calico-docs-preview-next.netlify.app')).toBe(true);
  });

  it('is on for local development', () => {
    expect(negotiationEnabled(new URL('http://localhost:8888/calico/latest/about'))).toBe(true);
  });

  it('is off for any host it does not recognise', () => {
    // Allow-listed, not deny-listed: an unexpected host must not negotiate.
    for (const host of ['example.com', 'netlify.app.evil.com', 'docs.tigera.io.evil.com']) {
      expect(on(host)).toBe(false);
    }
  });
});

describe('edge function declaration', () => {
  // Netlify validates the generated manifest at bundle time and fails the whole build
  // if it does not match this enum. Adding HEAD here — which seems harmless, and which
  // only existed so `curl -I` would work — broke every deploy on both sites.
  const NETLIFY_ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

  it('declares only methods Netlify accepts', () => {
    const methods = Array.isArray(config.method) ? config.method : [config.method];

    expect(methods.length).toBeGreaterThan(0);
    for (const method of methods) {
      expect(NETLIFY_ALLOWED_METHODS).toContain(method);
    }
  });

  it('runs only when the client mentions markdown', () => {
    // Without this condition the function would execute on every documentation
    // request rather than the small fraction that could use the result.
    expect(config.header).toEqual({ accept: 'text/markdown' });
  });

  it('scopes itself to documentation routes', () => {
    expect(config.path).toEqual(
      expect.arrayContaining(['/calico/*', '/calico-enterprise/*', '/calico-cloud/*', '/use-cases/*'])
    );
    expect(config.excludedPath).toEqual(expect.arrayContaining(['/*.md']));
  });
});
