/**
 * Row derivation for the release-notes technology preview table.
 *
 * data/feature-status.yaml records only status *changes*: a status carries forward from
 * the release it is declared in until the next entry for that feature and product.
 * Before a feature's first entry it did not exist, which is distinct from any recorded
 * status and renders as a dash.
 *
 * This is pure so the carry-forward and ordering rules can be tested without rendering.
 */

export type FeatureStatus = 'tech-preview' | 'ga' | 'deprecated' | 'removed';

/** A resolved cell: a status, or `null` where the feature did not yet exist. */
export type CellStatus = FeatureStatus | null;

export interface Feature {
  id: string;
  name: string;
  /** Per-product history: release line to status, plus an optional `confirmed` flag. */
  products: Record<string, Record<string, FeatureStatus | boolean>>;
}

export interface FeatureRow {
  name: string;
  /** One entry per version in the requested window, in the same order. */
  cells: CellStatus[];
}

/**
 * Every status, in the order a legend lists them.
 *
 * One table drives the cell text, the legend gloss, and which YAML values count as a
 * status at all, so the three cannot drift apart.
 */
const STATUSES: { status: FeatureStatus; label: string; gloss: string }[] = [
  { status: 'tech-preview', label: 'TP', gloss: 'technology preview' },
  { status: 'ga', label: 'GA', gloss: 'generally available' },
  { status: 'deprecated', label: 'Deprecated', gloss: 'scheduled for removal' },
  { status: 'removed', label: 'Removed', gloss: 'no longer present' },
];

/** En dash, for a release in which the feature did not exist. */
export const NOT_AVAILABLE = '–';

/** Release notes show the current release and the two before it. */
const COLUMN_COUNT = 3;

/** Cell text for a resolved status. */
export function cellLabel(cell: CellStatus): string {
  return STATUSES.find((entry) => entry.status === cell)?.label ?? NOT_AVAILABLE;
}

/** Compare two release lines numerically rather than as text, so 3.9 sorts below 3.10. */
function compare(a: string, b: string): number {
  const [aMajor, aMinor] = a.split('.').map(Number);
  const [bMajor, bMinor] = b.split('.').map(Number);
  return aMajor - bMajor || aMinor - bMinor;
}

/**
 * The three release lines ending at the given docs version, oldest first.
 *
 * The leading match also strips the Docusaurus suffix that Enterprise versions carry,
 * so 3.24-1 and 3.24-2 both resolve to line 3.24. Returns null for any version with no
 * release line to anchor a window to: the unversioned `current` version, which the site
 * labels Next, and the Calico Cloud scheme, which has no minor at all.
 */
export function releaseWindow(version: string): string[] | null {
  const match = /^(\d+)\.(\d+)/.exec(version);
  if (!match) return null;

  const [major, minor] = match.slice(1).map(Number);
  return Array.from({ length: COLUMN_COUNT }, (_, index) => `${major}.${minor - COLUMN_COUNT + 1 + index}`);
}

/** A feature's recorded status changes for one product, oldest first. */
function statusChanges(history: Record<string, FeatureStatus | boolean>) {
  return Object.entries(history)
    .filter(([, value]) => STATUSES.some((entry) => entry.status === value))
    .map(([version, status]) => ({ version, status: status as FeatureStatus }))
    .sort((a, b) => compare(a.version, b.version));
}

/** The status in effect at a given release, carrying the last change forward. */
function statusAt(changes: ReturnType<typeof statusChanges>, version: string): CellStatus {
  let current: CellStatus = null;
  for (const change of changes) {
    if (compare(change.version, version) > 0) break;
    current = change.status;
  }
  return current;
}

/**
 * The rows of the technology preview table: every feature that was in preview at some
 * point in the window.
 *
 * Rows are ordered by the release a feature first appeared in, oldest first, so the
 * table reads as the order features arrived. Features that arrived in the same release
 * keep their data-file order, which is alphabetical by id.
 */
export function buildRows(features: Feature[], product: string, versions: string[]): FeatureRow[] {
  const rows: (FeatureRow & { since: string; order: number })[] = [];

  features.forEach((feature, order) => {
    const history = feature.products?.[product];

    // `confirmed: false` keeps an entry in the data file without rendering it.
    if (!history || history.confirmed === false) return;

    const changes = statusChanges(history);
    if (!changes.length) return;

    const cells = versions.map((version) => statusAt(changes, version));
    if (!cells.includes('tech-preview')) return;

    rows.push({ name: feature.name, cells, since: changes[0].version, order });
  });

  return rows
    .sort((a, b) => compare(a.since, b.since) || a.order - b.order)
    .map(({ name, cells }) => ({ name, cells }));
}

/**
 * The legend sentence for a set of rows.
 *
 * Only statuses that actually appear are glossed, so a table with no GA cells does not
 * explain what GA means.
 */
export function buildLegend(rows: FeatureRow[]): string {
  const present = new Set<CellStatus>(rows.flatMap((row) => row.cells));

  const parts = STATUSES.filter((entry) => present.has(entry.status)).map((entry) => `${entry.label} = ${entry.gloss}`);
  if (present.has(null)) parts.push(`${NOT_AVAILABLE} = not available in that release`);

  return `${parts.join(', ')}.`;
}
