import { hasMarkdownTwin, twinPathFor } from '../../../utils/markdownTwin';

describe('twinPathFor', () => {
  it('appends .md to a leaf doc route', () => {
    expect(twinPathFor('/calico/latest/networking/configuring/bgp')).toBe(
      '/calico/latest/networking/configuring/bgp.md'
    );
  });

  it('drops the trailing slash a category index doc carries', () => {
    // Its canonical URL ends in a slash; the twin is a sibling file, not a child.
    expect(twinPathFor('/calico/latest/networking/')).toBe('/calico/latest/networking.md');
  });
});

describe('hasMarkdownTwin', () => {
  const EXCLUSIONS = ['/reference/rest-api-reference'];

  it('is true for an ordinary doc page', () => {
    expect(hasMarkdownTwin('/calico/latest/about', EXCLUSIONS)).toBe(true);
  });

  it('is false for a client-rendered page, in every product and version', () => {
    // One suffix has to cover all eight of these, or the list needs an entry per
    // version and goes stale at the next version cut.
    for (const permalink of [
      '/calico/latest/reference/rest-api-reference',
      '/calico/3.31/reference/rest-api-reference',
      '/calico-enterprise/latest/reference/rest-api-reference',
      '/calico-enterprise/3.22/reference/rest-api-reference',
      '/calico-cloud/reference/rest-api-reference',
    ]) {
      expect(hasMarkdownTwin(permalink, EXCLUSIONS)).toBe(false);
    }
  });

  it('matches an excluded route that carries a trailing slash', () => {
    expect(hasMarkdownTwin('/calico/latest/reference/rest-api-reference/', EXCLUSIONS)).toBe(false);
  });

  it('does not match a page that merely starts the same way', () => {
    expect(hasMarkdownTwin('/calico/latest/reference/rest-api-reference-guide', EXCLUSIONS)).toBe(
      true
    );
  });

  it('treats an absent list as excluding nothing', () => {
    expect(hasMarkdownTwin('/calico/latest/about')).toBe(true);
  });
});
