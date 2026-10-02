import fs from 'fs';
import path from 'path';

import { parse } from 'yaml';

import { ceVersionFromCloudversion, resolveStatus } from '../../FeatureStatusTable/featureStatus';
import type { CellStatus, Feature } from '../../FeatureStatusTable/featureStatus';

/**
 * Guards the lifecycle notices against data/feature-status.yaml.
 *
 * The notice itself is a page-level editorial statement and reads nothing from the data file at
 * runtime, deliberately. But the release-notes tables render from that file, so when a page and
 * the file disagree the site contradicts itself in public — which is what this catches. Calico
 * Open Source 3.33 shipped with the release notes calling native v3 CRDs generally available
 * while the install page still called it a technology preview.
 *
 * Only pages that opt in are checked. A page opts in by declaring `lifecycle-id` in front matter,
 * or by passing `id` to an inline <LifecycleNotice>. A page with no id is not checked, so a
 * feature with no entry in the data file costs nothing.
 */

const ROOT = path.resolve(__dirname, '../../../..');

/**
 * Each documentation tree, and the release line its pages describe.
 *
 * `null` means a Next tree, which is ahead of every released line. The Calico Cloud trees are
 * keyed to the Calico Enterprise line they are built on, because that is what the data file
 * records. The unversioned Calico Cloud tree is treated as Next rather than trusting its own
 * `cloudversion`, which trails the published tree and is not what that tree documents.
 */
const TREES: { dir: string; product: string; version: string | null }[] = [
  { dir: 'calico', product: 'calico', version: null },
  { dir: 'calico_versioned_docs/version-3.33', product: 'calico', version: '3.33' },
  { dir: 'calico-enterprise', product: 'calico-enterprise', version: null },
  { dir: 'calico-enterprise_versioned_docs/version-3.24-2', product: 'calico-enterprise', version: '3.24' },
  { dir: 'calico-enterprise_versioned_docs/version-3.23-2', product: 'calico-enterprise', version: '3.23' },
  { dir: 'calico-cloud', product: 'calico-cloud', version: null },
  {
    dir: 'calico-cloud_versioned_docs/version-23-2',
    product: 'calico-cloud',
    version: ceVersionFromCloudversion('v3.23.1-4'),
  },
];

/** Statuses a page can declare, mapped to the data file's vocabulary. */
const DECLARABLE = ['tech-preview', 'deprecated'] as const;
type Declarable = (typeof DECLARABLE)[number];

interface Declaration {
  file: string;
  id: string;
  status: Declarable;
}

const features: Feature[] = parse(
  fs.readFileSync(path.join(ROOT, 'data/feature-status.yaml'), 'utf8')
).features;

const byId = new Map(features.map((feature) => [feature.id, feature]));

function mdxFiles(dir: string): string[] {
  const absolute = path.join(ROOT, dir);
  if (!fs.existsSync(absolute)) return [];

  return fs
    .readdirSync(absolute, { recursive: true, encoding: 'utf8' })
    .filter((entry) => entry.endsWith('.mdx'))
    .map((entry) => path.join(dir, entry));
}

const FRONT_MATTER = /^---\n([\s\S]*?)\n---/;
const INLINE_NOTICE = /<LifecycleNotice\b([^>]*)>/g;

/** Every lifecycle declaration in one file, from front matter and from inline notices. */
function declarations(file: string): Declaration[] {
  const source = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const found: Declaration[] = [];

  const header = FRONT_MATTER.exec(source);
  if (header) {
    const frontMatter = parse(header[1]) ?? {};
    const status = frontMatter['lifecycle-status'];
    const id = frontMatter['lifecycle-id'];
    if (status && id) found.push({ file, id, status });
  }

  for (const [, attributes] of source.matchAll(INLINE_NOTICE)) {
    const status = /status=["']([^"']+)["']/.exec(attributes)?.[1];
    const id = /\bid=["']([^"']+)["']/.exec(attributes)?.[1];
    if (status && id) found.push({ file, id, status: status as Declarable });
  }

  return found;
}

/**
 * The statuses in the data file that a declared status is allowed to resolve to.
 *
 * A page that says deprecated is still right once the feature is recorded as removed: removal
 * only reaches a tree whose pages are on their way out, and the notice should keep warning until
 * they go.
 */
const ALLOWED: Record<Declarable, CellStatus[]> = {
  'tech-preview': ['tech-preview'],
  deprecated: ['deprecated', 'removed'],
};

function allowedFor(declared: Declarable): RegExp {
  return new RegExp(`^(${ALLOWED[declared].join('|')})$`);
}

/** Whether a declared status agrees with what the data file holds. */
function agrees(declared: Declarable, actual: CellStatus): boolean {
  return actual !== null && ALLOWED[declared].includes(actual);
}

/**
 * Proves the check above can fail.
 *
 * Until pages are migrated there may be few declarations to check, and a suite that only ever
 * passes is worth nothing. These cases replay the contradiction that shipped in Calico Open
 * Source 3.33, against the real data file, so the detector is exercised whatever the content
 * tree currently looks like.
 */
describe('the drift check catches a stale notice', () => {
  const nativeV3Crds = () => byId.get('native-v3-crds')!;

  it('reads native v3 CRDs as generally available in Calico Open Source 3.33', () => {
    expect(resolveStatus(nativeV3Crds(), 'calico', '3.33')).toBe('ga');
  });

  it('rejects a technology preview notice on a feature that is generally available', () => {
    expect(agrees('tech-preview', resolveStatus(nativeV3Crds(), 'calico', '3.33'))).toBe(false);
  });

  it('still accepts one in the release where the feature was in preview', () => {
    expect(agrees('tech-preview', resolveStatus(nativeV3Crds(), 'calico', '3.32'))).toBe(true);
  });

  it('treats Next as carrying the last recorded status forward', () => {
    expect(resolveStatus(nativeV3Crds(), 'calico', null)).toBe('ga');
    expect(agrees('tech-preview', resolveStatus(nativeV3Crds(), 'calico', null))).toBe(false);
  });

  it('accepts a deprecation notice once the feature is removed', () => {
    const compliance = byId.get('compliance-reporting')!;
    expect(resolveStatus(compliance, 'calico-enterprise', '3.24')).toBe('removed');
    expect(agrees('deprecated', resolveStatus(compliance, 'calico-enterprise', '3.24'))).toBe(true);
  });

  it('rejects any notice on a feature the data file does not cover for that product', () => {
    expect(resolveStatus(nativeV3Crds(), 'calico-cloud', null)).toBeNull();
    expect(agrees('tech-preview', resolveStatus(nativeV3Crds(), 'calico-cloud', null))).toBe(false);
  });
});

describe('lifecycle notices agree with data/feature-status.yaml', () => {
  const cases = TREES.flatMap((tree) =>
    mdxFiles(tree.dir)
      .flatMap(declarations)
      .map((declaration) => ({ ...tree, ...declaration }))
  );

  it('has something to check', () => {
    // A rename or a moved tree would otherwise make this suite pass by checking nothing.
    expect(TREES.filter((tree) => mdxFiles(tree.dir).length > 0)).toHaveLength(TREES.length);
  });

  it.each(DECLARABLE)('recognises %s as a declarable status', (status) => {
    expect(features.some((feature) => JSON.stringify(feature.products).includes(status))).toBe(true);
  });

  if (cases.length) {
    it.each(cases)('$file declares $status for $id', ({ file, id, status, product, version }) => {
      const feature = byId.get(id);

      if (!feature) {
        throw new Error(
          `${file} declares lifecycle-id "${id}", which is not in data/feature-status.yaml`
        );
      }

      const actual = resolveStatus(feature, product, version);

      // Asserted as an object so a failure prints the page, the feature and the status the data
      // file actually holds, rather than just "expected true, received false".
      expect({ file, id, release: version ?? 'next', status: actual }).toEqual({
        file,
        id,
        release: version ?? 'next',
        status: expect.stringMatching(allowedFor(status)),
      });
    });
  }
});
