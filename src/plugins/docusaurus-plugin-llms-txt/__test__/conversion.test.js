import { extractFromHtmlString } from '../extract.js';
import { convertToMarkdown } from '../convert.js';
import { shiftHeadings } from '../generate.js';

const SITE_URL = 'https://docs.tigera.io';

/**
 * Build a page in the shape Docusaurus and Prism actually emit: the title in a
 * <header>, headings trailed by a zero-width hash-link anchor, and every code line
 * wrapped in a block-level `token-line` div that also ends in a <br>.
 */
function page(body) {
  return `<!DOCTYPE html><html><head><meta name="description" content="A description."></head>
    <body><nav class="navbar">nav</nav><main><article><div class="theme-doc-markdown markdown">
    <header><h1>Page title</h1></header>${body}
    </div></article></main><footer class="footer">footer</footer></body></html>`;
}

function codeBlock(lines, lang = 'yaml') {
  const rendered = lines
    .map((l) => `<div class="token-line"><span class="token plain">${l}</span><br/></div>`)
    .join('');
  return `<pre class="prism-code language-${lang}"><code class="codeBlockLines_vJ6I">${rendered}</code></pre>`;
}

function codeBlockPage(lines) {
  return page(codeBlock(lines));
}

function heading(level, id, text) {
  return `<h${level} class="anchor" id="${id}">${text}<a href="#${id}" class="hash-link" aria-label="Direct link to ${text}" title="Direct link to ${text}">​</a></h${level}>`;
}

describe('extractFromHtmlString', () => {
  it('keeps the page title as metadata and out of the body', () => {
    const extracted = extractFromHtmlString(page('<p>Body text.</p>'));

    expect(extracted.title).toBe('Page title');
    expect(extracted.description).toBe('A description.');
    expect(extracted.html).not.toContain('Page title');
  });

  it('drops site chrome', () => {
    const extracted = extractFromHtmlString(page('<p>Body text.</p>'));

    expect(extracted.html).not.toContain('nav');
    expect(extracted.html).not.toContain('footer');
  });

  it('returns null for HTML with no doc content', () => {
    expect(extractFromHtmlString('<html><body></body></html>')).toBeNull();
  });
});

describe('convertToMarkdown', () => {
  it('strips the zero-width hash-link anchor from headings', async () => {
    const extracted = extractFromHtmlString(page(heading(2, 'before-you-begin', 'Before you begin')));
    const markdown = await convertToMarkdown(extracted.html, SITE_URL);

    expect(markdown).toBe('## Before you begin');
    expect(markdown).not.toContain('​');
  });

  it('emits one line per source line, not two', async () => {
    const extracted = extractFromHtmlString(page(codeBlock(['kind: Cluster', 'nodes:'])));
    const markdown = await convertToMarkdown(extracted.html, SITE_URL);

    expect(markdown).toBe('```yaml\nkind: Cluster\nnodes:\n```');
  });

  it('preserves indentation and column alignment inside code', async () => {
    const extracted = extractFromHtmlString(
      codeBlockPage(['nodes:', '  - role: control-plane', 'NAME     STATUS'])
    );
    const markdown = await convertToMarkdown(extracted.html, SITE_URL);

    expect(markdown).toContain('\n  - role: control-plane\n');
    expect(markdown).toContain('NAME     STATUS');
  });

  it('preserves genuinely blank lines inside code', async () => {
    const extracted = extractFromHtmlString(codeBlockPage(['first', '', 'third']));
    const markdown = await convertToMarkdown(extracted.html, SITE_URL);

    expect(markdown).toBe('```yaml\nfirst\n\nthird\n```');
  });

  it('resolves root-relative links against the site URL', async () => {
    const extracted = extractFromHtmlString(page('<p><a href="/calico/latest/about">About</a></p>'));
    const markdown = await convertToMarkdown(extracted.html, SITE_URL);

    expect(markdown).toBe('[About](https://docs.tigera.io/calico/latest/about)');
  });
});

describe('shiftHeadings', () => {
  it('shifts headings down by the given delta', () => {
    expect(shiftHeadings('## A\ntext\n### B', 2)).toBe('#### A\ntext\n##### B');
  });

  it('caps at h6', () => {
    expect(shiftHeadings('##### A\n###### B', 2)).toBe('###### A\n###### B');
  });

  it('is a no-op for a delta of zero', () => {
    expect(shiftHeadings('## A', 0)).toBe('## A');
  });

  it('leaves comments inside fenced code alone', () => {
    const input = '## Real\n\n```bash\n# not a heading\n## also not\n```\n\n## Real again';
    const want = '#### Real\n\n```bash\n# not a heading\n## also not\n```\n\n#### Real again';

    expect(shiftHeadings(input, 2)).toBe(want);
  });

  it('leaves comments inside a fence indented under a list item alone', () => {
    const input = '## H\n\n1. step\n\n   ```yaml\n   # comment\n   ```\n\n## H2';
    const want = '#### H\n\n1. step\n\n   ```yaml\n   # comment\n   ```\n\n#### H2';

    expect(shiftHeadings(input, 2)).toBe(want);
  });

  it('handles tilde fences, including backticks nested inside one', () => {
    const input = '## H\n~~~\n```\n# no\n```\n~~~\n## H2';
    const want = '#### H\n~~~\n```\n# no\n```\n~~~\n#### H2';

    expect(shiftHeadings(input, 2)).toBe(want);
  });

  it('ignores a hash run with no following space', () => {
    expect(shiftHeadings('##NotAHeading\n## Yes', 2)).toBe('##NotAHeading\n#### Yes');
  });
});
