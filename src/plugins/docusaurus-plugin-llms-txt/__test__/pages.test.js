import fs from 'fs/promises';
import os from 'os';
import path from 'path';

import {
  buildFrontmatter,
  buildPageMarkdown,
  markdownPathsFor,
  writePageMarkdown,
} from '../pages.js';

const META = {
  productName: 'Calico Open Source',
  versionLabel: '3.32 (latest)',
  siteUrl: 'https://docs.tigera.io',
};

const DOC = {
  title: 'Configure BGP peering',
  description: 'Configure BGP peering for Calico Open Source.',
  permalink: '/calico/latest/networking/configuring/bgp',
  markdown: '## Overview\n\nSome text.',
  sectionLabel: 'Networking',
};

describe('buildFrontmatter', () => {
  it('omits fields with no value', () => {
    expect(buildFrontmatter({ title: 'A', description: '', section: undefined })).toBe(
      '---\ntitle: "A"\n---'
    );
  });

  it('quotes values containing colons, quotes and dashes', () => {
    const frontmatter = buildFrontmatter({
      title: 'Step 1: Create a cluster',
      description: 'Uses "kind" — a tool for local clusters',
    });

    expect(frontmatter).toContain('title: "Step 1: Create a cluster"');
    expect(frontmatter).toContain('description: "Uses \\"kind\\" — a tool for local clusters"');
  });
});

describe('markdownPathsFor', () => {
  it('covers both URL shapes for a leaf doc', () => {
    expect(markdownPathsFor('/calico/latest/about')).toEqual([
      '/calico/latest/about.md',
      '/calico/latest/about/index.md',
    ]);
  });

  it('covers both URL shapes for a category index doc', () => {
    expect(markdownPathsFor('/calico-enterprise/3.22/observability/')).toEqual([
      '/calico-enterprise/3.22/observability.md',
      '/calico-enterprise/3.22/observability/index.md',
    ]);
  });

  it('never yields a bare ".md" filename, whatever the permalink', () => {
    for (const permalink of ['/', '//', '/calico/latest/about']) {
      for (const output of markdownPathsFor(permalink)) {
        expect(output.startsWith('/')).toBe(true);
        expect(output).not.toBe('.md');
        expect(output.endsWith('/.md')).toBe(false);
      }
    }
  });
});

describe('buildPageMarkdown', () => {
  it('carries the product and version an agent needs to avoid conflating docs', () => {
    const page = buildPageMarkdown(DOC, META);

    expect(page).toContain('product: "Calico Open Source"');
    expect(page).toContain('version: "3.32 (latest)"');
    expect(page).toContain('section: "Networking"');
  });

  it('points canonical_url at the HTML page, keeping any trailing slash', () => {
    const page = buildPageMarkdown({ ...DOC, permalink: '/calico/latest/networking/' }, META);

    expect(page).toContain('canonical_url: "https://docs.tigera.io/calico/latest/networking/"');
  });

  it('reattaches the title as an h1 above the body', () => {
    const page = buildPageMarkdown(DOC, META);

    expect(page).toContain('---\n\n# Configure BGP peering\n\n## Overview');
  });
});

describe('writePageMarkdown', () => {
  let outDir;

  beforeEach(async () => {
    outDir = await fs.mkdtemp(path.join(os.tmpdir(), 'llms-pages-test-'));
  });

  afterEach(async () => {
    await fs.rm(outDir, { recursive: true, force: true });
  });

  it('writes both URL shapes with identical content', async () => {
    await writePageMarkdown(DOC, outDir, META);

    const [flat, nested] = markdownPathsFor(DOC.permalink).map((p) => path.join(outDir, p));
    expect(await fs.readFile(flat, 'utf-8')).toBe(await fs.readFile(nested, 'utf-8'));
  });

  it('writes nothing for a page whose body converted to nothing', async () => {
    // The Swagger API browsers render client-side, so they convert to an empty body.
    // An empty twin would still claim through canonical_url to be the page.
    const written = await writePageMarkdown({ ...DOC, markdown: '   \n  ' }, outDir, META);

    expect(written).toBe(0);
    await expect(fs.access(path.join(outDir, markdownPathsFor(DOC.permalink)[0]))).rejects.toThrow();
  });

  it('omits the version line when the product is unversioned', () => {
    const page = buildPageMarkdown(DOC, { ...META, versionLabel: '' });

    expect(page).not.toContain('version:');
    expect(page).toContain('product: "Calico Open Source"');
  });
});
