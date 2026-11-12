import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import releaseNotesPlugin, { MARKER_NAME, formatUpstreamDate } from '../releaseNotesPlugin';

let dir;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'release-notes-'));
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

const touch = (...names) => names.forEach((name) => fs.writeFileSync(path.join(dir, name), ''));

const marker = (attributes = []) => ({ type: 'mdxJsxFlowElement', name: MARKER_NAME, attributes, children: [] });

const PRODUCT = { type: 'mdxJsxAttribute', name: 'product', value: 'Calico Open Source' };

/** A tree shaped like a release notes page: a heading, then the marker. */
const page = (attributes = [PRODUCT]) => ({
  type: 'root',
  children: [{ type: 'heading', depth: 2, children: [{ type: 'text', value: 'Release details' }] }, marker(attributes)],
});

/** A stand-in vfile. `fail` throws, as it does in a real build. */
const vfile = () => ({
  path: path.join(dir, 'index.mdx'),
  fail(message) {
    throw new Error(message);
  },
});

const run = (tree, file = vfile()) => releaseNotesPlugin()(tree, file);

const importSources = (tree) => tree.children[0].data.estree.body.map((decl) => decl.source.value);
const elementNames = (tree) => tree.children.filter((n) => n.type === 'mdxJsxFlowElement').map((n) => n.name);

describe('releaseNotesPlugin', () => {
  it('imports and renders each release in ascending version order by default', () => {
    // 3.32.10 sorts after 3.32.9 only with a numeric comparison.
    touch(
      'v3.32.10-release-notes.md',
      'v3.32.9-release-notes.md',
      'v3.32.0-release-notes.mdx',
      'index.mdx',
      '_template.md',
      'v3.32-release-notes.md'
    );
    const tree = page();
    run(tree);

    expect(tree.children[0].type).toBe('mdxjsEsm');
    expect(importSources(tree)).toEqual([
      './v3.32.0-release-notes.mdx',
      './v3.32.9-release-notes.md',
      './v3.32.10-release-notes.md',
    ]);
    expect(elementNames(tree)).toEqual(['ReleaseNotes_3_32_0', 'ReleaseNotes_3_32_9', 'ReleaseNotes_3_32_10']);
  });

  it('puts the newest release first with order="descending"', () => {
    touch('v3.32.0-release-notes.md', 'v3.32.1-release-notes.md');
    const tree = page([PRODUCT, { type: 'mdxJsxAttribute', name: 'order', value: 'descending' }]);
    run(tree);

    expect(elementNames(tree)).toEqual(['ReleaseNotes_3_32_1', 'ReleaseNotes_3_32_0']);
  });

  it('replaces the marker in place', () => {
    touch('v3.32.0-release-notes.md');
    const tree = page();
    run(tree);

    expect(tree.children.map((n) => n.type)).toEqual([
      'mdxjsEsm',
      'heading',
      'heading',
      'mdxJsxFlowElement',
      'heading',
      'paragraph',
    ]);
    expect(elementNames(tree)).not.toContain(MARKER_NAME);
  });

  it('titles each release, calling X.Y.0 the general availability release', () => {
    touch('v3.32.0-release-notes.md', 'v3.32.4-release-notes.md');
    const tree = page();
    run(tree);

    const titles = tree.children.filter((n) => n.type === 'heading' && n.depth === 3).map((n) => n.children[0].value);
    expect(titles).toEqual([
      'Calico Open Source 3.32.0 general availability release',
      'Calico Open Source 3.32.4 bug fix release',
    ]);
  });

  it('fails without a product', () => {
    touch('v3.32.0-release-notes.md');
    expect(() => run(page([]))).toThrow(/needs a product attribute/);
  });

  it('leaves a page without the marker untouched', () => {
    touch('v3.32.0-release-notes.md');
    const tree = { type: 'root', children: [{ type: 'paragraph', children: [] }] };
    run(tree);

    expect(tree.children).toHaveLength(1);
  });

  it('fails when there are no release files', () => {
    touch('_template.md');
    expect(() => run(page())).toThrow(/found no vX.Y.Z-release-notes.md files/);
  });

  it('fails on an unknown order', () => {
    touch('v3.32.0-release-notes.md');
    expect(() => run(page([PRODUCT, { type: 'mdxJsxAttribute', name: 'order', value: 'newest' }]))).toThrow(
      /not valid/
    );
  });

  it('fails when the marker appears twice', () => {
    touch('v3.32.0-release-notes.md');
    const tree = page();
    tree.children.push(marker());
    expect(() => run(tree)).toThrow(/only once/);
  });

  it('adds the standard Updating section after each release', () => {
    touch('v3.32.0-release-notes.md');
    const tree = page();
    run(tree);

    const [, , , , updating, paragraph] = tree.children;
    expect(updating).toMatchObject({ type: 'heading', depth: 4, children: [{ value: 'Updating' }] });
    expect(paragraph.children[0].value).toBe('To update a previous version of $[prodname], see ');
    expect(paragraph.children[1]).toMatchObject({ type: 'link', url: '../operations/upgrading/index.mdx' });
  });

  it('takes the upgrade guide link from upgradeGuide', () => {
    touch('v3.32.0-release-notes.md');
    const tree = page([PRODUCT, { type: 'mdxJsxAttribute', name: 'upgradeGuide', value: '../upgrade.mdx' }]);
    run(tree);

    expect(tree.children[5].children[1].url).toBe('../upgrade.mdx');
  });

  it("renders a release's updating file at the end of its Updating section", () => {
    touch('v3.32.0-release-notes.md', 'v3.32.1-release-notes.md', 'v3.32.1-updating.md');
    const tree = page();
    run(tree);

    expect(importSources(tree)).toEqual([
      './v3.32.0-release-notes.md',
      './v3.32.1-release-notes.md',
      './v3.32.1-updating.md',
    ]);
    expect(tree.children.slice(6).map((n) => n.name ?? n.type)).toEqual([
      'heading',
      'ReleaseNotes_3_32_1',
      'heading',
      'paragraph',
      'Updating_3_32_1',
    ]);
  });

  it('fails on an updating file with no release file', () => {
    touch('v3.32.0-release-notes.md', 'v3.32.1-updating.md');
    expect(() => run(page())).toThrow(/v3.32.1-updating.md has no matching/);
  });
});

describe('release file dates', () => {
  const releaseFile = (date) => ({
    type: 'root',
    children: [
      { type: 'paragraph', children: [{ type: 'text', value: date }] },
      { type: 'heading', depth: 4, children: [{ type: 'text', value: 'Bug fixes' }] },
    ],
  });

  const runOnReleaseFile = (tree) => run(tree, { ...vfile(), path: path.join(dir, 'v3.32.3-release-notes.md') });

  it('rewrites an upstream date in a release file', () => {
    const tree = releaseFile('26 Oct 2026');
    runOnReleaseFile(tree);
    expect(tree.children[0].children[0].value).toBe('October 26, 2026');
  });

  it('leaves a date already in the docs format alone', () => {
    const tree = releaseFile('October 26, 2026');
    runOnReleaseFile(tree);
    expect(tree.children[0].children[0].value).toBe('October 26, 2026');
  });

  it('does not rewrite dates on other pages', () => {
    const tree = releaseFile('26 Oct 2026');
    run(tree);
    expect(tree.children[0].children[0].value).toBe('26 Oct 2026');
  });

  it.each([
    ['1 Jan 2026', 'January 1, 2026'],
    ['09 Sept 2026', 'September 9, 2026'],
    ['30 April 2026', 'April 30, 2026'],
    ['31 Foo 2026', null],
    ['DD MMMM YYYY', null],
  ])('formats %s as %s', (input, expected) => {
    expect(formatUpstreamDate(input)).toBe(expected);
  });
});
