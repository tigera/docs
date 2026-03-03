import { render } from '@testing-library/react';

import FossaReport from '../FossaReport';

describe('<FossaReport />', () => {
  const testVersion = 'x-y-z';

  it('renders an iframe pointing to the correct proxy path', () => {
    const { getByTitle } = render(<FossaReport version={testVersion} />);
    const iframe = getByTitle(`FOSSA Attribution Report - ${testVersion}`);
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe('IFRAME');
    expect(iframe).toHaveAttribute(
      'src',
      `/calico-enterprise/fossa-reports/${testVersion}/attribution-report.html`
    );
  });

  it('sets an accessible title containing the version', () => {
    const { getByTitle } = render(<FossaReport version={testVersion} />);
    const iframe = getByTitle(`FOSSA Attribution Report - ${testVersion}`);
    expect(iframe).toHaveAttribute('title', expect.stringContaining(testVersion));
  });

  it('sandboxes the iframe and suppresses referrer', () => {
    const { getByTitle } = render(<FossaReport version={testVersion} />);
    const iframe = getByTitle(`FOSSA Attribution Report - ${testVersion}`);
    expect(iframe).toHaveAttribute('sandbox', '');
    expect(iframe).toHaveAttribute('referrerPolicy', 'no-referrer');
  });

  it('uses full width and 80vh height', () => {
    const { getByTitle } = render(<FossaReport version={testVersion} />);
    const iframe = getByTitle(`FOSSA Attribution Report - ${testVersion}`);
    expect(iframe.style.width).toBe('100%');
    expect(iframe.style.height).toBe('80vh');
  });
});
