/**
 * Markdown converter — unified pipeline that converts HTML fragments
 * to clean Markdown with custom handlers for Docusaurus elements.
 */

import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import { toText } from 'hast-util-to-text';

/**
 * Build an mdast blockquote node from children.
 */
function blockquote(children) {
  return { type: 'blockquote', children };
}

/**
 * Build an mdast strong node.
 */
function strong(text) {
  return {
    type: 'strong',
    children: [{ type: 'text', value: text }],
  };
}

/**
 * Build an mdast paragraph from inline children.
 */
function paragraph(children) {
  return { type: 'paragraph', children };
}

/**
 * Custom rehype-remark handlers for Docusaurus-specific HTML elements.
 */
function createHandlers(siteUrl) {
  return {
    // Admonition handler
    div(state, node) {
      const className = (node.properties?.className || []).join(' ');

      // --- Admonitions ---
      if (className.includes('theme-admonition')) {
        const typeMatch = className.match(/alert--([\w]+)/);
        const admonitionType = typeMatch ? typeMatch[1].toUpperCase() : 'NOTE';

        // Find the content div (class starts with 'admonitionContent')
        let contentNode = null;
        for (const child of node.children || []) {
          const childClass = (child.properties?.className || []).join(' ');
          if (childClass.match(/admonitionContent/i)) {
            contentNode = child;
            break;
          }
        }

        // Convert the content children to mdast
        const contentChildren = contentNode
          ? state.all(contentNode)
          : state.all(node);

        // Build: > **TYPE:** content
        // Prepend the type label to the first paragraph
        if (contentChildren.length > 0 && contentChildren[0].type === 'paragraph') {
          contentChildren[0].children.unshift(
            strong(`${admonitionType}:`),
            { type: 'text', value: ' ' }
          );
        } else {
          contentChildren.unshift(
            paragraph([strong(`${admonitionType}:`), { type: 'text', value: ' ' }])
          );
        }

        return blockquote(contentChildren);
      }

      // --- Expanded tabs ---
      if (node.properties?.dataTabsExpanded === 'true') {
        const groupId = node.properties?.dataTabsGroup || '';
        const results = [];

        // Opening comment
        const commentText = groupId ? `tabs:group=${groupId}` : 'tabs';
        results.push({ type: 'html', value: `<!-- ${commentText} -->` });

        // Process each tab panel
        for (const child of node.children || []) {
          if (child.properties?.dataTabLabel) {
            const label = child.properties.dataTabLabel;
            results.push(
              paragraph([strong(`Tab: ${label}`)])
            );
            results.push(...state.all(child));
          }
        }

        // Closing comment
        results.push({ type: 'html', value: '<!-- /tabs -->' });

        return results;
      }

      // --- Default div handling: pass through children ---
      return state.all(node);
    },

    // Code block handler
    pre(state, node) {
      const className = (node.properties?.className || []).join(' ');
      const langMatch = className.match(/language-([\w-]+)/);

      // Check the <code> child for language too
      let lang = langMatch ? langMatch[1] : '';
      const codeNode = node.children?.find(
        (c) => c.tagName === 'code'
      );
      if (!lang && codeNode) {
        const codeClass = (codeNode.properties?.className || []).join(' ');
        const codeLangMatch = codeClass.match(/language-([\w-]+)/);
        if (codeLangMatch) lang = codeLangMatch[1];
      }

      const value = codeNode ? toText(codeNode) : toText(node);

      return {
        type: 'code',
        lang: lang || null,
        value: value.replace(/\n$/, ''),
      };
    },

    // Link handler — resolve relative URLs to absolute
    a(state, node) {
      const href = node.properties?.href || '';
      let url = href;

      if (href.startsWith('/')) {
        url = `${siteUrl}${href}`;
      }

      const children = state.all(node);

      return {
        type: 'link',
        url,
        children: children.length ? children : [{ type: 'text', value: url }],
      };
    },

    // Image handler — resolve relative src to absolute
    img(state, node) {
      const src = node.properties?.src || '';
      let url = src;

      if (src.startsWith('/')) {
        url = `${siteUrl}${src}`;
      }

      return {
        type: 'image',
        url,
        alt: node.properties?.alt || '',
        title: node.properties?.title || null,
      };
    },
  };
}

/**
 * Convert an HTML fragment string to clean Markdown.
 *
 * @param {string} html - HTML fragment (already extracted from the page)
 * @param {string} siteUrl - Base URL for resolving relative links (e.g., 'https://docs.tigera.io')
 * @returns {Promise<string>}
 */
export async function convertToMarkdown(html, siteUrl) {
  const processor = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeRemark, { handlers: createHandlers(siteUrl) })
    .use(remarkGfm)
    .use(remarkStringify, {
      bullet: '-',
      fence: '`',
      fences: true,
      listItemIndent: 'one',
      resourceLink: true,
    });

  const result = await processor.process(html);
  let markdown = String(result);

  // Post-processing cleanup
  markdown = markdown
    // Collapse 3+ consecutive blank lines to 2
    .replace(/\n{3,}/g, '\n\n')
    // Trim trailing whitespace per line
    .replace(/[ \t]+$/gm, '')
    // Trim leading/trailing whitespace from the whole string
    .trim();

  return markdown;
}
