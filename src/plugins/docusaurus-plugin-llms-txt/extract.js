/**
 * HTML extractor — reads a Docusaurus-built HTML page and extracts
 * clean doc content using cheerio. Strips UI chrome, preprocesses
 * tabs for expansion, and extracts metadata.
 */

import * as cheerio from 'cheerio';
import fs from 'fs/promises';

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
  'svg.iconExternalLink',
  '.table-of-contents',
  'nav.navbar',
  'nav[aria-label="Breadcrumbs"]',
  'footer.footer',
  'header',
];

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
 * Extract content and metadata from a Docusaurus HTML file.
 *
 * @param {string} htmlPath - Absolute path to the HTML file
 * @returns {Promise<{ html: string, title: string, description: string } | null>}
 */
export async function extractFromHtml(htmlPath) {
  let rawHtml;
  try {
    rawHtml = await fs.readFile(htmlPath, 'utf-8');
  } catch {
    return null;
  }

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

  // Preprocess tabs before extraction
  preprocessTabs($);

  // Extract content using priority selectors
  let contentHtml = '';
  for (const selector of CONTENT_SELECTORS) {
    const el = $(selector).first();
    if (el.length) {
      contentHtml = el.html();
      break;
    }
  }

  if (!contentHtml) {
    return null;
  }

  return { html: contentHtml, title, description };
}
