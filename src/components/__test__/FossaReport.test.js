import { render } from '@testing-library/react';

import FossaReport from '../FossaReport';

describe('<FossaReport />', () => {
  const testVersion = 'x-y-z';

  it('renders an iframe pointing to the correct proxy path', () => {
    const { container } = render(<FossaReport version={testVersion} />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      `/calico-enterprise/fossa-reports/${testVersion}/attribution-report.html`
    );
  });

  it('sets an accessible title containing the version', () => {
    const { container } = render(<FossaReport version={testVersion} />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('title', expect.stringContaining(testVersion));
  });

  it('uses full width and 80vh height', () => {
    const { container } = render(<FossaReport version={testVersion} />);
    const iframe = container.querySelector('iframe');
    expect(iframe.style.width).toBe('100%');
    expect(iframe.style.height).toBe('80vh');
  });
});
