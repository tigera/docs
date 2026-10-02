import { render, screen } from '@testing-library/react';

import LifecycleNotice from '../index';

// @theme/Admonition only exists inside a Docusaurus build, so it has to be mocked virtually.
// The stand-in records the type and title as attributes so assertions can check which variant
// rendered without depending on Infima's markup.
jest.mock(
  '@theme/Admonition',
  () => ({
    __esModule: true,
    default: ({ type, title, children }) => (
      <aside data-testid='admonition' data-type={type}>
        <h5>{title}</h5>
        {children}
      </aside>
    ),
  }),
  { virtual: true }
);

const admonition = () => screen.getByTestId('admonition');
const title = () => screen.getByRole('heading').textContent;

describe('LifecycleNotice', () => {
  it('renders a note for technology preview, naming the feature in the title', () => {
    render(<LifecycleNotice status='tech-preview' feature='Istio ambient mode' />);

    expect(admonition()).toHaveAttribute('data-type', 'note');
    expect(title()).toBe('Technology preview: Istio ambient mode');
    expect(screen.getByText(/not supported for production use/)).toBeInTheDocument();
  });

  it('renders a warning for deprecated, naming the feature in the title', () => {
    render(<LifecycleNotice status='deprecated' feature='Fortinet integration' />);

    expect(admonition()).toHaveAttribute('data-type', 'warning');
    expect(title()).toBe('Deprecated: Fortinet integration');
    expect(screen.getByText(/scheduled for removal/)).toBeInTheDocument();
  });

  // The name is a title rather than a sentence subject precisely so that a plural name needs no
  // special handling. If this ever renders "Native v3 CRDs is a...", the design has regressed.
  it.each([
    ['Native v3 CRDs', 'Technology preview: Native v3 CRDs'],
    ['Gateway WAF', 'Technology preview: Gateway WAF'],
  ])('uses %s verbatim in the title', (feature, expected) => {
    render(<LifecycleNotice status='tech-preview' feature={feature} />);
    expect(title()).toBe(expected);
  });

  it.each([
    ['tech-preview', 'Technology preview'],
    ['deprecated', 'Deprecation and removal notice'],
  ] as const)('falls back to a generic title for %s when no feature is given', (status, expected) => {
    render(<LifecycleNotice status={status} />);
    expect(title()).toBe(expected);
  });

  it('renders extra guidance after the standard sentence', () => {
    render(
      <LifecycleNotice status='deprecated' feature='Application layer policy'>
        <p>Use Istio ambient mode instead.</p>
      </LifecycleNotice>
    );

    const paragraphs = Array.from(admonition().querySelectorAll('p')).map((p) => p.textContent);
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toMatch(/scheduled for removal/);
    expect(paragraphs[1]).toBe('Use Istio ambient mode instead.');
  });

  // A mistyped status must fail the build rather than publish a page that says nothing.
  it('throws on an unknown status', () => {
    const quiet = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<LifecycleNotice status={'preview' as never} />)).toThrow(
      /unknown status "preview"/
    );

    quiet.mockRestore();
  });

  // The id binds an inline notice to data/feature-status.yaml for the drift check only.
  it('never renders the id', () => {
    render(<LifecycleNotice status='tech-preview' feature='Gateway WAF' id='gateway-waf' />);
    expect(admonition().textContent).not.toMatch(/gateway-waf/);
  });
});
