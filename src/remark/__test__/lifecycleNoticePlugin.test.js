import lifecycleNoticePlugin, { COMPONENT_NAME } from '../lifecycleNoticePlugin';

/** A tree shaped like a typical page: title, intro paragraph, section heading. */
const page = () => ({
  type: 'root',
  children: [
    { type: 'heading', depth: 1, children: [{ type: 'text', value: 'Gateway WAF' }] },
    { type: 'paragraph', children: [{ type: 'text', value: 'Intro.' }] },
    { type: 'heading', depth: 2, children: [{ type: 'text', value: 'Big picture' }] },
  ],
});

/** A stand-in vfile. `fail` throws, as it does in a real build. */
const vfile = (frontMatter) => ({
  data: { frontMatter },
  fail(message) {
    throw new Error(message);
  },
});

const run = (tree, frontMatter) => lifecycleNoticePlugin()(tree, vfile(frontMatter));

const attributes = (node) =>
  Object.fromEntries(node.attributes.map((attr) => [attr.name, attr.value]));

describe('lifecycleNoticePlugin', () => {
  it('inserts the component directly after the H1', () => {
    const tree = page();
    run(tree, { 'lifecycle-status': 'tech-preview', 'lifecycle-feature': 'Gateway WAF' });

    expect(tree.children.map((node) => node.type)).toEqual([
      'heading',
      'mdxJsxFlowElement',
      'paragraph',
      'heading',
    ]);

    const inserted = tree.children[1];
    expect(inserted.name).toBe(COMPONENT_NAME);
    expect(attributes(inserted)).toEqual({ status: 'tech-preview', feature: 'Gateway WAF' });
  });

  it('passes lifecycle-id through for the drift check', () => {
    const tree = page();
    run(tree, {
      'lifecycle-status': 'deprecated',
      'lifecycle-feature': 'Fortinet integration',
      'lifecycle-id': 'fortinet-integration',
    });

    expect(attributes(tree.children[1])).toEqual({
      status: 'deprecated',
      feature: 'Fortinet integration',
      id: 'fortinet-integration',
    });
  });

  it('omits the feature attribute when no name is declared', () => {
    const tree = page();
    run(tree, { 'lifecycle-status': 'tech-preview' });

    expect(attributes(tree.children[1])).toEqual({ status: 'tech-preview' });
  });

  it.each([[undefined], [{}], [{ description: 'Something unrelated.' }]])(
    'leaves the tree untouched when no status is declared (%p)',
    (frontMatter) => {
      const tree = page();
      const before = JSON.stringify(tree);
      run(tree, frontMatter);
      expect(JSON.stringify(tree)).toBe(before);
    }
  );

  // Only the first H1 counts. A page with two would otherwise get two notices.
  it('ignores a second level 1 heading', () => {
    const tree = page();
    tree.children.push({ type: 'heading', depth: 1, children: [{ type: 'text', value: 'Again' }] });
    run(tree, { 'lifecycle-status': 'tech-preview' });

    expect(tree.children.filter((node) => node.type === 'mdxJsxFlowElement')).toHaveLength(1);
    expect(tree.children[1].type).toBe('mdxJsxFlowElement');
  });

  it('fails when the page has no level 1 heading', () => {
    const tree = { type: 'root', children: [{ type: 'paragraph', children: [] }] };

    expect(() => run(tree, { 'lifecycle-status': 'tech-preview' })).toThrow(/no level 1 heading/);
  });

  it('fails on a status that is not one of the known values', () => {
    expect(() => run(page(), { 'lifecycle-status': 'preview' })).toThrow(/not a valid status/);
  });
});
