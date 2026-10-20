import { docUrl, normalisePermalink, outputPathFor, rewriteDocLinks, twinPath } from '../links.js';

const SITE = 'https://docs.tigera.io';
const TWINS = new Set([
  '/calico/latest/about',
  '/calico/latest/networking',
  '/calico-cloud/get-started/connect-cluster',
]);
const hasTwin = (p) => TWINS.has(p);

const rewrite = (md) => rewriteDocLinks(md, SITE, hasTwin);

describe('rewriteDocLinks', () => {
  it('points a doc link at its twin', () => {
    expect(rewrite(`[About](${SITE}/calico/latest/about)`)).toBe(
      `[About](${SITE}/calico/latest/about.md)`
    );
  });

  it('rewrites across a product boundary', () => {
    // 7.9% of links do this, and they are where an agent most easily conflates
    // Open Source with Cloud.
    expect(rewrite(`[Connect](${SITE}/calico-cloud/get-started/connect-cluster)`)).toBe(
      `[Connect](${SITE}/calico-cloud/get-started/connect-cluster.md)`
    );
  });

  it('handles a category index doc, whose canonical URL has a trailing slash', () => {
    expect(rewrite(`[Networking](${SITE}/calico/latest/networking/)`)).toBe(
      `[Networking](${SITE}/calico/latest/networking.md)`
    );
  });

  it('keeps the fragment after the extension', () => {
    expect(rewrite(`[Anchor](${SITE}/calico/latest/about#what-is-calico)`)).toBe(
      `[Anchor](${SITE}/calico/latest/about.md#what-is-calico)`
    );
  });

  it('leaves pages that produced no twin alone', () => {
    // The Swagger pages render client-side; linking to a .md would be a 404.
    const link = `[REST API](${SITE}/calico/latest/reference/rest-api-reference)`;
    expect(rewrite(link)).toBe(link);
  });

  it('leaves asset links alone', () => {
    // The corpus carries several hundred of these.
    for (const asset of ['/assets/images/x.png', '/img/logo.svg', '/files/manifest.yaml']) {
      expect(rewrite(`[Asset](${SITE}${asset})`)).toBe(`[Asset](${SITE}${asset})`);
    }
  });

  it('leaves external links alone', () => {
    const link = '[Kubernetes](https://kubernetes.io/docs/home/)';
    expect(rewrite(link)).toBe(link);
  });

  it('leaves URLs inside fenced code alone', () => {
    const md = [
      `[Real](${SITE}/calico/latest/about)`,
      '',
      '```bash',
      `curl ${SITE}/calico/latest/about`,
      `# see [About](${SITE}/calico/latest/about)`,
      '```',
    ].join('\n');

    const out = rewrite(md);
    expect(out).toContain(`[Real](${SITE}/calico/latest/about.md)`);
    expect(out).toContain(`curl ${SITE}/calico/latest/about\n`);
    expect(out).toContain(`# see [About](${SITE}/calico/latest/about)`);
  });

  it('does not double-append to a link that is already a twin', () => {
    const link = `[About](${SITE}/calico/latest/about.md)`;
    expect(rewrite(link)).toBe(link);
  });

  it('rewrites every link on a line', () => {
    expect(rewrite(`[A](${SITE}/calico/latest/about) and [B](${SITE}/calico/latest/networking)`)).toBe(
      `[A](${SITE}/calico/latest/about.md) and [B](${SITE}/calico/latest/networking.md)`
    );
  });
});

describe('normalisePermalink', () => {
  it('strips trailing slashes', () => {
    expect(normalisePermalink('/calico/latest/networking/')).toBe('/calico/latest/networking');
    expect(normalisePermalink('/calico/latest/about')).toBe('/calico/latest/about');
  });
});

describe('docUrl', () => {
  it('advertises the twin when one exists', () => {
    expect(docUrl({ permalink: '/calico/latest/networking/' }, SITE, true)).toBe(
      `${SITE}/calico/latest/networking.md`
    );
  });

  it('falls back to the HTML page when it does not', () => {
    expect(docUrl({ permalink: '/calico/latest/x' }, SITE, false)).toBe(`${SITE}/calico/latest/x`);
  });
});

describe('outputPathFor', () => {
  it('leaves permalinks alone on a site served from the root', () => {
    expect(outputPathFor('/calico/latest/about', '/')).toBe('/calico/latest/about');
  });

  it('strips a non-root baseUrl, which the build directory already stands for', () => {
    expect(outputPathFor('/lynx/1.4/install', '/lynx/')).toBe('/1.4/install');
    expect(outputPathFor('/lynx/1.4/networking/', '/lynx/')).toBe('/1.4/networking/');
  });

  it('maps the baseUrl itself to the build root', () => {
    expect(outputPathFor('/lynx/', '/lynx/')).toBe('/');
    expect(outputPathFor('/lynx', '/lynx/')).toBe('/');
  });

  it('does not strip a prefix that only looks like the baseUrl', () => {
    expect(() => outputPathFor('/lynxish/page', '/lynx/')).toThrow(/outside the site baseUrl/);
  });
});

describe('twinPath', () => {
  it('appends .md to an ordinary page', () => {
    expect(twinPath('/calico/latest/networking/')).toBe('/calico/latest/networking.md');
    expect(twinPath('/lynx/1.3/', '/lynx/')).toBe('/lynx/1.3.md');
  });

  it('keeps the root doc inside the site, where its index.md is written', () => {
    // /lynx.md would be outside the site the build directory is served as.
    expect(twinPath('/lynx/', '/lynx/')).toBe('/lynx/index.md');
    expect(twinPath('/', '/')).toBe('/index.md');
  });

  it('rewrites a link to the root doc of a site served from /', () => {
    const rootOnly = (p) => p === '';
    expect(rewriteDocLinks(`[Home](${SITE}/)`, SITE, rootOnly)).toBe(`[Home](${SITE}/index.md)`);
    expect(rewriteDocLinks(`[Home](${SITE}/)`, SITE, () => false)).toBe(`[Home](${SITE}/)`);
  });

  it('agrees with the files pages.js writes', () => {
    expect(docUrl({ permalink: '/lynx/' }, SITE, true, '/lynx/')).toBe(`${SITE}/lynx/index.md`);
    expect(rewriteDocLinks(`[Home](${SITE}/lynx/)`, SITE, () => true, '/lynx/')).toBe(
      `[Home](${SITE}/lynx/index.md)`
    );
  });
});
