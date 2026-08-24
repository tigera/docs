/**
 * HTML extractor — reads a Docusaurus-built HTML page and extracts
 * clean doc content using cheerio. Strips UI chrome, preprocesses
 * tabs for expansion, and extracts metadata.
 */

import * as cheerio from 'cheerio';

const CONTENT_SELECTORS = [
  '.theme-doc-markdown',
  'article',
  'main .container .col',
  'main',
];

const REMOVE_SELECTORS = [
  '.theme-doc-toc-desktop',
  '.theme-doc-toc-mobile',
  '.theme-doc-version-banner',
  '.theme-doc-version-badge',
  '.theme-doc-footer',
  '.theme-doc-breadcrumbs',
  '.pagination-nav',
  'button[class*="copyButton"]',
  'a.hash-link',
  'svg.iconExternalLink',
  '.table-of-contents',
  'nav.navbar',
  'nav[aria-label="Breadcrumbs"]',
  'footer.footer',
  'header',
];

/**
 * Strip HTML comment nodes.
 *
 * React's server renderer emits `<!-- -->` as a separator between adjacent text
 * nodes, and rehype-remark carries those through into the Markdown. They are pure
 * noise. The tab markers the converter emits are built during conversion, not read
 * from the page, so they are unaffected.
 *
 * @param {cheerio.CheerioAPI} $
 */
function removeComments($) {
  $('*')
    .contents()
    .filter(function () {
      return this.type === 'comment';
    })
    .remove();
}

/**
 * Preprocess Prism code blocks: demote each `token-line` from a block-level div
 * to an inline span.
 *
 * Prism emits every source line as `<div class="token-line">…<br/></div>`, so the
 * line break is represented twice — once by the block boundary and once by the
 * <br>. hast-util-to-text honours both, double-spacing every fence. Demoting the
 * div to a span leaves the <br> as the only line break. Doing it this way (rather
 * than dropping the <br>) keeps genuinely blank source lines, which are empty
 * divs whose only content is the <br>.
 *
 * @param {cheerio.CheerioAPI} $
 */
function preprocessCodeBlocks($) {
  $('pre .token-line').each(function () {
    this.tagName = 'span';
  });
}

/**
 * Preprocess tab containers: expand all panels and annotate with group info.
 * Docusaurus tabs use role="tablist" for the button bar and role="tabpanel"
 * for content panels. Only the active panel is visible by default.
 *
 * @param {cheerio.CheerioAPI} $
 */
function preprocessTabs($) {
  // Find tab containers — Docusaurus wraps tabs in a div with class 'tabs-container'
  // or we can look for elements containing both [role="tablist"] and [role="tabpanel"]
  $('ul[role="tablist"]').each(function () {
    const tablist = $(this);
    // The parent container holds both the tablist and the tabpanels
    const container = tablist.parent();

    // Extract group ID if present
    const groupId = tablist.find('[role="tab"]').first().attr('data-group') || '';

    // Collect tab labels from buttons
    const labels = [];
    tablist.find('[role="tab"]').each(function () {
      labels.push($(this).text().trim());
    });

    // Collect tab panels — they are siblings of the tablist within the container
    const panels = [];
    container.find('[role="tabpanel"]').each(function () {
      // Remove hidden attribute so content is visible
      $(this).removeAttr('hidden');
      $(this).css('display', '');
      panels.push($(this));
    });

    // Build replacement HTML with data attributes the converter can process
    const groupAttr = groupId ? ` data-tabs-group="${groupId}"` : '';
    let replacement = `<div data-tabs-expanded="true"${groupAttr}>`;

    for (let i = 0; i < panels.length; i++) {
      const label = labels[i] || `Tab ${i + 1}`;
      replacement += `<div data-tab-label="${label}">${panels[i].html()}</div>`;
    }

    replacement += '</div>';

    container.replaceWith(replacement);
  });
}

/**
 * Extract content and metadata from a rendered Docusaurus page.
 *
 * @param {string} rawHtml - Full page HTML
 * @returns {{ html: string, title: string, description: string } | null}
 */
export function extractFromHtmlString(rawHtml) {
  const $ = cheerio.load(rawHtml);

  // Extract metadata before stripping elements
  const title =
    $('article h1').first().text().trim() ||
    $('h1').first().text().trim() ||
    $('title').text().trim().replace(/ \|.*$/, '');

  const description =
    $('meta[name="description"]').attr('content') || '';

  // Remove noise elements
  for (const selector of REMOVE_SELECTORS) {
    $(selector).remove();
  }

  // Preprocess code blocks and tabs before extraction
  removeComments($);
  preprocessCodeBlocks($);
  preprocessTabs($);

  // Extract content using priority selectors.
  //
  // Prefer the first selector that yields actual content, not merely the first that
  // matches an element. The fallbacks exist for pages whose content sits somewhere
  // other than .theme-doc-markdown, and breaking on a matched-but-empty container
  // made them inert in exactly that case — the content was discarded even though a
  // later selector would have found it.
  let contentHtml = null;
  let firstMatch = null;

  for (const selector of CONTENT_SELECTORS) {
    const el = $(selector).first();
    if (!el.length) {
      continue;
    }

    const html = el.html() || '';
    if (firstMatch === null) {
      firstMatch = html;
    }

    if (html.trim()) {
      contentHtml = html;
      break;
    }
  }

  // Every container that matched was empty: an ordinary stub, or a page that renders
  // client-side. Report the empty body so the caller skips publishing a twin.
  if (contentHtml === null) {
    contentHtml = firstMatch;
  }

  // Nothing matched at all, which means the page is not shaped the way we expect —
  // a renamed theme class, a moved output path. That is structural, and fatal.
  if (contentHtml === null) {
    return null;
  }

  return { html: contentHtml, title, description };
}
