import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';

import { buildLegend, buildRows, cellLabel, releaseWindow } from '../featureStatus';
import type { Feature } from '../featureStatus';

const features: Feature[] = parse(
  fs.readFileSync(path.join(__dirname, '../../../../data/feature-status.yaml'), 'utf8')
).features;

/** Render rows the way the Markdown tables they replace were written. */
const asMarkdown = (product: string, versions: string[]) =>
  buildRows(features, product, versions).map((row) => `| ${row.name} | ${row.cells.map(cellLabel).join(' | ')} |`);

describe('releaseWindow', () => {
  it('returns the three releases ending at the given version, oldest first', () => {
    expect(releaseWindow('3.32')).toEqual(['3.30', '3.31', '3.32']);
  });

  it('strips the Docusaurus suffix an Enterprise version carries', () => {
    expect(releaseWindow('3.24-1')).toEqual(['3.22', '3.23', '3.24']);
    expect(releaseWindow('3.24-2')).toEqual(['3.22', '3.23', '3.24']);
  });

  it('returns null for the unversioned current version', () => {
    expect(releaseWindow('current')).toBeNull();
  });

  it('returns null for the Calico Cloud scheme, which has no minor to step back through', () => {
    expect(releaseWindow('23-2')).toBeNull();
  });
});

describe('buildRows', () => {
  const window = ['3.30', '3.31', '3.32'];
  const names = (product: string, versions: string[]) => buildRows(features, product, versions).map((row) => row.name);

  it('carries a status forward until the next recorded change', () => {
    // nftables is recorded as tech preview in 3.29 and GA in 3.31, and nothing else.
    const [row] = buildRows(features, 'calico', window).filter((r) => r.name === 'nftables data plane');
    expect(row.cells).toEqual(['tech-preview', 'ga', 'ga']);
  });

  it('reports no status before a feature first appears', () => {
    const [row] = buildRows(features, 'calico', window).filter((r) => r.name === 'Native v3 CRDs');
    expect(row.cells).toEqual([null, null, 'tech-preview']);
  });

  it('drops a feature that was never in preview in the window', () => {
    // Calico Ingress Gateway reached GA in 3.31, so a window starting after that has
    // no preview cell for it.
    expect(names('calico', window)).toContain('Calico Ingress Gateway');
    expect(names('calico', ['3.31', '3.32'])).not.toContain('Calico Ingress Gateway');
  });

  it('drops a feature that never had a preview status at all', () => {
    expect(names('calico', window)).not.toContain('FIPS mode');
  });

  it('drops a feature that is not confirmed for the product', () => {
    expect(names('calico-enterprise', ['3.20', '3.21', '3.22'])).not.toContain('Non-cluster hosts and VMs');
  });

  it('drops a feature the product does not have', () => {
    expect(names('calico', window)).not.toContain('Workload WAF');
  });

  it('orders rows by the release the feature first appeared in', () => {
    expect(names('calico-enterprise', ['3.22', '3.23', '3.24'])).toEqual([
      'DNS policy for Windows',
      'Workload WAF',
      'Gateway WAF',
      'Istio ambient mode',
      'Live migration for KubeVirt VMs',
      'Multi-VRF networking',
      'Native v3 CRDs',
      'L2 bridge networking',
      'Selector-scoped Felix configuration',
    ]);
  });

  it('reproduces the Calico Open Source 3.30 technology preview table', () => {
    expect(asMarkdown('calico', ['3.28', '3.29', '3.30'])).toEqual([
      '| nftables data plane | – | TP | TP |',
      '| Calico Ingress Gateway | – | – | TP |',
      '| Flow logs API and Whisker | – | – | TP |',
    ]);
  });

  it('reproduces the Calico Open Source 3.31 technology preview table', () => {
    expect(asMarkdown('calico', ['3.29', '3.30', '3.31'])).toEqual([
      '| nftables data plane | TP | TP | GA |',
      '| Calico Ingress Gateway | – | TP | GA |',
      '| Flow logs API and Whisker | – | TP | TP |',
    ]);
  });

  it('reproduces the Calico Open Source 3.32 technology preview table', () => {
    expect(asMarkdown('calico', window)).toEqual([
      '| nftables data plane | TP | GA | GA |',
      '| Calico Ingress Gateway | TP | GA | GA |',
      '| Flow logs API and Whisker | TP | TP | TP |',
      '| Istio ambient mode | – | – | TP |',
      '| Native v3 CRDs | – | – | TP |',
      '| Selector-scoped Felix configuration | – | – | TP |',
    ]);
  });
});

describe('buildLegend', () => {
  const legend = (product: string, versions: string[]) => buildLegend(buildRows(features, product, versions));

  it('glosses only the statuses the table actually uses', () => {
    expect(legend('calico', ['3.30', '3.31', '3.32'])).toBe(
      'TP = technology preview, GA = generally available, – = not available in that release.'
    );
  });

  it('omits GA when no feature in the window reached it', () => {
    expect(legend('calico-enterprise', ['3.19', '3.20', '3.21'])).toBe(
      'TP = technology preview, – = not available in that release.'
    );
  });

  it('omits the dash when every feature existed throughout the window', () => {
    expect(legend('calico-enterprise', ['3.19', '3.20'])).toBe('TP = technology preview.');
  });
});
