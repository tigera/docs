import { docUrl, normalisePermalink, rewriteDocLinks } from '../links.js';

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
