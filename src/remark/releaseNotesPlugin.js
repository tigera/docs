import fs from 'node:fs';
import path from 'node:path';
import { visit, SKIP } from 'unist-util-visit';

export const MARKER_NAME = 'IncludeReleaseNotes';

// Matches per-release files such as v3.32.4-release-notes.md, the name the upstream
// projectcalico/calico repo uses, so a file can be copied in unchanged.
const RELEASE_FILE = /^v(\d+)\.(\d+)\.(\d+)-release-notes\.mdx?$/;

// Matches optional docs-only upgrade steps for one release, such as v3.32.1-updating.md.
// They render under that release's generated "Updating" section.
const UPDATING_FILE = /^v(\d+)\.(\d+)\.(\d+)-updating\.mdx?$/;

// None of these files are pages: docusaurus.config.js adds these globs to each docs
// plugin's `exclude`, which also makes Docusaurus treat them as importable partials.
export const RELEASE_NOTES_GLOBS = ['**/v*-release-notes.{md,mdx}', '**/v*-updating.{md,mdx}'];

export const DEFAULT_UPGRADE_GUIDE = '../operations/upgrading/index.mdx';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Upstream dates look like "26 Oct 2026". The docs write "October 26, 2026".
const UPSTREAM_DATE = /^(\d{1,2}) ([A-Z][a-z]+) (\d{4})$/;

const ORDERS = ['ascending', 'descending'];

function compareVersions(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a.version[i] !== b.version[i]) return a.version[i] - b.version[i];
  }
  return 0;
}

const versionKey = (match) => match.slice(1, 4).map(Number);

export function findReleaseFiles(
  dir,
  fail = (message) => {
    throw new Error(message);
  }
) {
  const names = fs.readdirSync(dir);

  const updating = new Map();
  for (const name of names) {
    const match = UPDATING_FILE.exec(name);
    if (match) updating.set(versionKey(match).join('.'), name);
  }

  const releases = names
    .map((name) => {
      const match = RELEASE_FILE.exec(name);
      if (!match) return null;
      const version = versionKey(match);
      const id = version.join('_');
      const updatingName = updating.get(version.join('.'));
      updating.delete(version.join('.'));
      return {
        name,
        version,
        componentName: `ReleaseNotes_${id}`,
        updating: updatingName && { name: updatingName, componentName: `Updating_${id}` },
      };
    })
    .filter(Boolean)
    .sort(compareVersions);

  // An updating file with no release file would otherwise be silently left off the page.
  for (const name of updating.values()) {
    fail(`${name} has no matching vX.Y.Z-release-notes.md file in ${dir}.`);
  }

  return releases;
}

/** Rewrites "26 Oct 2026" as "October 26, 2026". Returns null for anything else. */
export function formatUpstreamDate(text) {
  const match = UPSTREAM_DATE.exec(text.trim());
  if (!match) return null;
  const [, day, month, year] = match;
  const full = MONTHS.find((m) => m === month || (month.length >= 3 && m.startsWith(month)));
  if (!full) return null;
  return `${full} ${Number(day)}, ${year}`;
}

function importDeclaration({ name, componentName }) {
  const source = `./${name}`;
  return {
    type: 'ImportDeclaration',
    specifiers: [
      {
        type: 'ImportDefaultSpecifier',
        local: { type: 'Identifier', name: componentName },
      },
    ],
    source: { type: 'Literal', value: source, raw: JSON.stringify(source) },
    attributes: [],
  };
}

// Upstream files start at the release date, with no title, so the page supplies one.
function releaseHeading(product, version) {
  const kind = version[2] === 0 ? 'general availability' : 'bug fix';
  return {
    type: 'heading',
    depth: 3,
    children: [{ type: 'text', value: `${product} ${version.join('.')} ${kind} release` }],
  };
}

const text = (value) => ({ type: 'text', value });

// The same "Updating" section every release had when the notes lived in one file.
// $[prodname] is resolved by variablesPlugin, which runs after this plugin.
function updatingSection(upgradeGuide) {
  return [
    { type: 'heading', depth: 4, children: [text('Updating')] },
    {
      type: 'paragraph',
      children: [
        text('To update a previous version of $[prodname], see '),
        { type: 'link', url: upgradeGuide, children: [text('our upgrade guides')] },
        text('.'),
      ],
    },
  ];
}

const element = (name) => ({ type: 'mdxJsxFlowElement', name, attributes: [], children: [] });

// Runs when Docusaurus compiles a release file itself: rewrite an upstream-style date in
// the first paragraph, so files can be copied from projectcalico/calico unchanged.
function formatReleaseDate(tree) {
  const first = tree.children.find((node) => node.type !== 'mdxjsEsm');
  if (first?.type !== 'paragraph' || first.children.length !== 1 || first.children[0].type !== 'text') return;
  const formatted = formatUpstreamDate(first.children[0].value);
  if (formatted) first.children[0].value = formatted;
}

function attributeValue(node, name) {
  const attr = node.attributes?.find((a) => a.type === 'mdxJsxAttribute' && a.name === name);
  return typeof attr?.value === 'string' ? attr.value : undefined;
}

/**
 * This is a remark plugin which runs during the build. It replaces an
 * <IncludeReleaseNotes product="..." /> element with every per-release file that sits next
 * to the page, so that each release gets its own file instead of everyone editing one long
 * page.
 *
 * A release file is any file named vX.Y.Z-release-notes.md in the same directory as the
 * page. For each one, in version order, the plugin adds a level 3 heading such as
 * "Calico Open Source 3.32.4 bug fix release" (or "general availability release" for X.Y.0)
 * renders the file through an ordinary MDX import, and adds the standard "Updating" section
 * that links to the upgrade guides. Docs-only upgrade steps for a release go in an optional
 * vX.Y.Z-updating.md file, which renders at the end of that release's "Updating" section.
 * Because these are imports:
 *   - webpack recompiles the page when a release file changes,
 *   - Docusaurus adds the release file's headings to the page's table of contents,
 *   - relative links in a release file resolve the same way they would in the page itself.
 *
 * Use order="descending" to put the newest release first. The default is ascending.
 * Use upgradeGuide="..." to change the upgrade guide link, relative to the page.
 *
 * Release files are written in the upstream style, which starts with a date such as
 * "26 Oct 2026". When Docusaurus compiles a release file, this plugin rewrites that date
 * as "October 26, 2026".
 *
 * A new file is picked up the next time the page compiles. In `yarn start`, save the page
 * (or restart) after you add one.
 */
export default function releaseNotesPlugin(_options) {
  return function transformer(tree, file) {
    if (file.path && RELEASE_FILE.test(path.basename(file.path))) {
      formatReleaseDate(tree);
      return;
    }

    const markers = [];
    visit(tree, 'mdxJsxFlowElement', (node, index, parent) => {
      if (node.name !== MARKER_NAME) return;
      markers.push({ node, index, parent });
      return SKIP;
    });

    if (markers.length === 0) return;
    if (markers.length > 1) {
      file.fail(`<${MARKER_NAME} /> can appear only once on a page.`);
    }

    const { node, index, parent } = markers[0];

    const product = attributeValue(node, 'product');
    if (!product) {
      file.fail(`<${MARKER_NAME} /> needs a product attribute, for example product="Calico Open Source".`);
    }

    const order = attributeValue(node, 'order') ?? 'ascending';
    if (!ORDERS.includes(order)) {
      file.fail(`<${MARKER_NAME} order="${order}"> is not valid. Expected one of ${ORDERS.join(', ')}.`);
    }

    const upgradeGuide = attributeValue(node, 'upgradeGuide') ?? DEFAULT_UPGRADE_GUIDE;

    const releases = findReleaseFiles(path.dirname(file.path), (message) => file.fail(message));
    if (releases.length === 0) {
      // Failing is the point: a page that silently renders no release notes would publish.
      file.fail(`<${MARKER_NAME} /> found no vX.Y.Z-release-notes.md files next to ${file.path}.`);
    }
    if (order === 'descending') releases.reverse();

    const nodes = releases.flatMap(({ version, componentName, updating }) => [
      releaseHeading(product, version),
      element(componentName),
      ...updatingSection(upgradeGuide),
      ...(updating ? [element(updating.componentName)] : []),
    ]);
    parent.children.splice(index, 1, ...nodes);

    tree.children.unshift({
      type: 'mdxjsEsm',
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: releases.flatMap((release) =>
            release.updating
              ? [importDeclaration(release), importDeclaration(release.updating)]
              : [importDeclaration(release)]
          ),
        },
      },
    });
  };
}
