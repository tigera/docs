import { render } from '@testing-library/react';

import FossaReport from '../FossaReport';

const mockReleases = [
  { title: 'v3.22.2', components: {} },
  { title: 'v3.22.1', components: {} },
  { title: 'v3.22.0-3.0', components: {} },
];

describe('<FossaReport />', () => {
  it('renders iframe with Netlify proxy URL', () => {
    const { getByTitle } = render(<FossaReport releases={mockReleases} />);
    const iframe = getByTitle(/FOSSA Attribution Report - Calico Enterprise 3\.22/);
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe('IFRAME');
    expect(iframe).toHaveAttribute(
      'src',
      '/calico-enterprise/fossa-reports/3-22/attribution-report.html'
    );
  });

  it('extracts minor version correctly from pre-release titles', () => {
    const releases = [{ title: 'v3.20.0-2.2', components: {} }];
    const { getByTitle } = render(<FossaReport releases={releases} />);
    const iframe = getByTitle(/3\.20/);
    expect(iframe).toHaveAttribute(
      'src',
      '/calico-enterprise/fossa-reports/3-20/attribution-report.html'
    );
  });

  it('shows fallback message when only "master" in releases', () => {
    const releases = [{ title: 'master', components: {} }];
    const { getByText } = render(<FossaReport releases={releases} />);
    expect(getByText(/no FOSSA attribution report/i)).toBeInTheDocument();
  });

  it('has sandbox attribute', () => {
    const { getByTitle } = render(<FossaReport releases={mockReleases} />);
    const iframe = getByTitle(/FOSSA/);
    expect(iframe).toHaveAttribute('sandbox', '');
  });

  it('renders "Open report in new tab" link with correct href', () => {
    const { getByText } = render(<FossaReport releases={mockReleases} />);
    const link = getByText(/open report in new tab/i);
    expect(link).toHaveAttribute(
      'href',
      '/calico-enterprise/fossa-reports/3-22/attribution-report.html'
    );
    expect(link).toHaveAttribute('target', '_blank');
  });
});
