/**
 * Sidebar walker — traverses a Docusaurus sidebar tree and produces
 * a flat, ordered list of { docId, sectionLabel } entries.
 *
 * Top-level categories become section labels. Nested subcategories
 * are flattened into their parent top-level section.
 */

/**
 * Walk a single sidebar item, emitting doc entries.
 *
 * @param {object|string} item - A sidebar item (string doc ref, doc object, category, or link)
 * @param {string} sectionLabel - The current top-level section label
 * @returns {{ docId: string, sectionLabel: string }[]}
 */
function walkItem(item, sectionLabel) {
  // String shorthand: 'getting-started/kubernetes/quickstart'
  if (typeof item === 'string') {
    return [{ docId: item, sectionLabel }];
  }

  if (!item || typeof item !== 'object') {
    return [];
  }

  // External link — skip
  if (item.type === 'link' || item.type === 'ref') {
    return [];
  }

  // Plain doc reference: { type: 'doc', id: '...' }
  if (item.type === 'doc') {
    return [{ docId: item.id, sectionLabel }];
  }

  // Category
  if (item.type === 'category') {
    const entries = [];

    // If the category itself links to a doc, include it
    if (item.link && item.link.type === 'doc' && item.link.id) {
      entries.push({ docId: item.link.id, sectionLabel });
    }

    // Recurse into child items
    if (Array.isArray(item.items)) {
      for (const child of item.items) {
        entries.push(...walkItem(child, sectionLabel));
      }
    }

    return entries;
  }

  // Unknown type — skip
  return [];
}

/**
 * Walk an entire sidebar definition and return a flat ordered list of doc entries
 * grouped by top-level section label.
 *
 * @param {object} sidebars - The resolved `version.sidebars` object from Docusaurus
 *   e.g. { calicoSidebar: [ ... ] }
 * @param {Map<string, object>} docsById - Map of docId → doc metadata (for title lookup on bare refs)
 * @returns {{ docId: string, sectionLabel: string }[]}
 */
export function walkSidebar(sidebars, docsById) {
  const entries = [];

  for (const sidebarItems of Object.values(sidebars)) {
    if (!Array.isArray(sidebarItems)) continue;

    for (const topItem of sidebarItems) {
      // Determine the section label from the top-level item
      let sectionLabel;

      if (typeof topItem === 'string') {
        // Bare doc ref at top level — use the doc's title as the section label
        const doc = docsById.get(topItem);
        sectionLabel = doc ? doc.title : topItem;
        entries.push({ docId: topItem, sectionLabel });
        continue;
      }

      if (topItem.type === 'doc') {
        const doc = docsById.get(topItem.id);
        sectionLabel = topItem.label || (doc ? doc.title : topItem.id);
        entries.push({ docId: topItem.id, sectionLabel });
        continue;
      }

      if (topItem.type === 'category') {
        sectionLabel = topItem.label || 'Uncategorized';
        entries.push(...walkItem(topItem, sectionLabel));
        continue;
      }

      // External links at top level — skip
    }
  }

  return entries;
}
