import { extractFromHtmlString } from '../extract.js';
import { convertToMarkdown } from '../convert.js';
import { shiftHeadings } from '../generate.js';
import { contentOnly } from '../cache.js';

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

/**
 * The same page with no whitespace inside the content container, which is what
 * Docusaurus's server renderer actually emits. The indented helper above leaves
 * whitespace that reads as truthy content, which is enough to mask a regression in
 * how an empty container is detected.
 */
function compactPage(body) {
  return `<!DOCTYPE html><html><head><meta name="description" content="A description."></head>` +
    `<body><main><article><div class="theme-doc-markdown markdown">` +
    `<header><h1>Page title</h1></header>${body}</div></article></main></body></html>`;
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

  it('returns null when no content container matches at all', () => {
    // Structural: a renamed theme class or a moved output path. Callers treat this
    // as fatal, because it means twins are silently missing site-wide.
    expect(extractFromHtmlString('<html><body></body></html>')).toBeNull();
  });

  it('returns an empty body, not null, for a page that has no content', async () => {
    // A stub page — valid frontmatter, no body — renders a container holding only
    // the <header><h1> that extraction strips. That is ordinary authoring, not a
    // structural fault, and conflating the two turned a stub into a failed build.
    const extracted = extractFromHtmlString(compactPage(''));

    expect(extracted).not.toBeNull();
    expect(extracted.title).toBe('Page title');
    // What matters downstream is that it converts to nothing, so no twin is written.
    await expect(convertToMarkdown(extracted.html, SITE_URL)).resolves.toBe('');
  });

  it('falls through to a later selector when the first container is empty', async () => {
    // The fallback selectors exist for pages whose content is not in
    // .theme-doc-markdown. Breaking on the first *matching* selector rather than the
    // first non-empty one made them inert exactly then, silently dropping the page.
    const moved =
      `<!DOCTYPE html><html><head><meta name="description" content="A description."></head>` +
      `<body><main><article><div class="theme-doc-markdown markdown">` +
      `<header><h1>Page title</h1></header></div><p>Real content.</p></article></main></body></html>`;

    const extracted = extractFromHtmlString(moved);

    await expect(convertToMarkdown(extracted.html, SITE_URL)).resolves.toBe('Real content.');
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

describe('cache key safety', () => {
  // The cache keys on contentOnly(html), so two pages that differ only in what
  // contentOnly strips share an entry. That is only safe if stripping cannot change
  // the Markdown. It is NOT true that stripped tags never reach the extracted
  // fragment — the Swagger pages carry a <link rel="stylesheet"> inside their content
  // — so the property to hold is the weaker, sufficient one: identical Markdown.
  const cases = {
    'scripts and links in head': page('<p>Body text.</p>'),
    'a stylesheet link inside the content, as the Swagger pages have': page(
      '<link rel="stylesheet" href="/css/swagger-ui.css"><div id="swagger-ui"></div>'
    ),
    'an inline script inside the content': page('<p>Before.</p><script>var x = 1;</script><p>After.</p>'),
    'a JSON data script inside the content': page(
      '<p>Text.</p><script type="application/json">{"a":1}</script>'
    ),
    'a code sample that mentions a script tag': page(
      '<pre class="prism-code language-html"><code><span class="token">&lt;script src="x.js"&gt;&lt;/script&gt;</span><br/></code></pre>'
    ),
  };

  for (const [name, html] of Object.entries(cases)) {
    it(`converts identically with and without stripped markup: ${name}`, async () => {
      const full = extractFromHtmlString(html);
      const stripped = extractFromHtmlString(contentOnly(html));

      const fromFull = full ? await convertToMarkdown(full.html, SITE_URL) : null;
      const fromStripped = stripped ? await convertToMarkdown(stripped.html, SITE_URL) : null;

      expect(fromStripped).toEqual(fromFull);
    });
  }

  it('keeps a code sample mentioning a script tag, rather than stripping through it', async () => {
    const extracted = extractFromHtmlString(cases['a code sample that mentions a script tag']);
    const markdown = await convertToMarkdown(extracted.html, SITE_URL);

    expect(markdown).toContain('<script src="x.js"></script>');
  });
});
