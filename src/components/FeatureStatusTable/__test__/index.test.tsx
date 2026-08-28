import { render, screen } from '@testing-library/react';

import { DeprecatedFeaturesTable, TechPreviewTable } from '../index';
import type { Feature } from '../featureStatus';

const features: Feature[] = [
  {
    id: 'nftables-dataplane',
    name: 'nftables data plane',
    products: { calico: { '3.29': 'tech-preview', '3.31': 'ga' } },
  },
  {
    id: 'istio-ambient-mode',
    name: 'Istio ambient mode',
    products: {
      calico: { '3.32': 'tech-preview' },
      'calico-enterprise': { '3.22': 'tech-preview' },
    },
  },
  {
    id: 'fips-mode',
    name: 'FIPS mode',
    products: { calico: { '3.28': 'ga', '3.30': 'deprecated' } },
  },
];

const docsVersion = { pluginId: 'calico', version: '3.32' };

// Both modules are aliases that only exist inside a Docusaurus build, so they have to be
// mocked virtually. The factories close over the fixtures rather than reading them, so
// they run safely before the fixtures are initialised.
jest.mock('@docusaurus/useGlobalData', () => ({ usePluginData: () => ({ features }) }), {
  virtual: true,
});

jest.mock('@docusaurus/plugin-content-docs/client', () => ({ useDocsVersion: () => docsVersion }), {
  virtual: true,
});

const columns = () => screen.getAllByRole('columnheader').map((cell) => cell.textContent);

/** The rows as `[feature, ...cells]`, in render order. */
const rows = () =>
  screen
    .getAllByRole('row')
    .slice(1)
    .map((row) => Array.from(row.querySelectorAll('td')).map((cell) => cell.textContent));

describe('<TechPreviewTable/>', () => {
  beforeEach(() => {
    docsVersion.pluginId = 'calico';
    docsVersion.version = '3.32';
  });

  it('derives the product and the version window from the docs version', () => {
    render(<TechPreviewTable />);

    expect(columns()).toEqual(['Feature', '3.30', '3.31', '3.32']);
    expect(rows()).toEqual([
      ['nftables data plane', 'TP', 'GA', 'GA'],
      ['Istio ambient mode', '–', '–', 'TP'],
    ]);
  });

  it('renders the Enterprise product and window on an Enterprise page', () => {
    docsVersion.pluginId = 'calico-enterprise';
    docsVersion.version = '3.24-1';
    render(<TechPreviewTable />);

    expect(columns()).toEqual(['Feature', '3.22', '3.23', '3.24']);
    expect(rows()).toEqual([['Istio ambient mode', 'TP', 'TP', 'TP']]);
  });

  it('renders the legend for the statuses in the table', () => {
    render(<TechPreviewTable />);

    expect(
      screen.getByText('TP = technology preview, GA = generally available, – = not available in that release.')
    ).toBeInTheDocument();
  });

  it('renders nothing on a version with no release line, and says why', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    docsVersion.version = 'current';
    const { container } = render(<TechPreviewTable />);

    expect(container).toBeEmptyDOMElement();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('No release window'));
    warn.mockRestore();
  });

  it('renders nothing when no feature was in preview during the window', () => {
    docsVersion.version = '3.28';
    const { container } = render(<TechPreviewTable />);

    expect(container).toBeEmptyDOMElement();
  });
});

describe('<DeprecatedFeaturesTable/>', () => {
  beforeEach(() => {
    docsVersion.pluginId = 'calico';
    docsVersion.version = '3.32';
  });

  it('selects on deprecated and removed rather than preview', () => {
    render(<DeprecatedFeaturesTable />);

    expect(columns()).toEqual(['Feature', '3.30', '3.31', '3.32']);
    expect(rows()).toEqual([['FIPS mode', 'Deprecated', 'Deprecated', 'Deprecated']]);
  });

  it('shares the empty and legend behaviour of the preview table', () => {
    docsVersion.version = '3.29';
    const { container } = render(<DeprecatedFeaturesTable />);

    expect(container).toBeEmptyDOMElement();
  });
});
