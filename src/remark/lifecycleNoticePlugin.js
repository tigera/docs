import { visit } from 'unist-util-visit';

export const COMPONENT_NAME = 'LifecycleNotice';

const STATUS_KEY = 'lifecycle-status';
const FEATURE_KEY = 'lifecycle-feature';
const ID_KEY = 'lifecycle-id';

const VALID_STATUSES = ['tech-preview', 'deprecated'];

function attribute(name, value) {
  return { type: 'mdxJsxAttribute', name, value };
}

/**
 * This is a remark plugin which runs during the build. When a page declares `lifecycle-status`
 * in its front matter, it inserts a <LifecycleNotice> element directly after the page's H1, so
 * that a whole-page technology preview or deprecation notice is a one-line declaration rather
 * than an admonition copied between pages and left behind when the status changes.
 *
 * It inserts the component rather than building an admonition node directly, so that the front
 * matter form and the hand-placed form in MDX render through exactly the same code and cannot
 * drift apart. The component resolves through the global registration in
 * src/theme/MDXComponents.js; nothing has to be imported by the page.
 *
 * Placement is after the H1 rather than before it because that is where every hand-written
 * notice already sat, and a reader should see the page title first.
 */
export default function lifecycleNoticePlugin(_options) {
  return function transformer(tree, file) {
    const frontMatter = file.data?.frontMatter;
    const status = frontMatter?.[STATUS_KEY];

    if (!status) return;

    if (!VALID_STATUSES.includes(status)) {
      file.fail(
        `${STATUS_KEY}: "${status}" is not a valid status. Expected one of ${VALID_STATUSES.join(', ')}.`
      );
    }

    const attributes = [attribute('status', status)];

    const feature = frontMatter[FEATURE_KEY];
    if (feature) attributes.push(attribute('feature', feature));

    const id = frontMatter[ID_KEY];
    if (id) attributes.push(attribute('id', id));

    let index = null;
    let parent = null;

    visit(tree, 'heading', (node, nodeIndex, nodeParent) => {
      if (node.depth !== 1 || index !== null) return;
      index = nodeIndex;
      parent = nodeParent;
    });

    if (index === null) {
      // Failing is the point. A page that declares a status but has no title has nowhere to put
      // the notice, and silently dropping it would publish the page as though the feature were
      // generally available.
      file.fail(`${STATUS_KEY} is set but the page has no level 1 heading to place the notice after.`);
    }

    parent.children.splice(index + 1, 0, {
      type: 'mdxJsxFlowElement',
      name: COMPONENT_NAME,
      attributes,
      children: [],
    });
  };
}
