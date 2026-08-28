import { render, screen } from '@testing-library/react';

// @theme/* and @docusaurus/Translate only resolve inside a Docusaurus build, so they
// are mocked virtually here. @docusaurus/Link already has a shared mock in
// jest.config.mjs, but that one renders children without an anchor; the destinations
// are what this suite is checking, so it needs one that keeps the href.
jest.mock('@theme/Heading', () => ({ __esModule: true, default: ({ children }) => <h1>{children}</h1> }), {
  virtual: true,
});
jest.mock('@docusaurus/Translate', () => ({ __esModule: true, default: ({ children }) => children }), {
  virtual: true,
});
jest.mock('@docusaurus/Link', () => ({
  __esModule: true,
  default: ({ to, children }) => <a href={to}>{children}</a>,
}));

import NotFoundContent from '../index';

describe('NotFoundContent', () => {
  beforeEach(() => {
    render(<NotFoundContent />);
  });

  it('offers a doc root for each product', () => {
    expect(screen.getByText('Calico Open Source')).toHaveAttribute('href', '/calico/latest/about');
    expect(screen.getByText('Calico Enterprise')).toHaveAttribute('href', '/calico-enterprise/latest/about');
    expect(screen.getByText('Calico Cloud')).toHaveAttribute('href', '/calico-cloud/about');
  });

  it('points agents at the machine-readable indexes', () => {
    // The reason this page was rewritten: whoever lands here needs somewhere to go,
    // and these two files are the only entry points that enumerate the whole site.
    expect(screen.getByText('llms.txt')).toHaveAttribute('href', '/llms.txt');
    expect(screen.getByText('sitemap.xml')).toHaveAttribute('href', '/sitemap.xml');
  });

  it('drops the stock advice to contact whoever linked here', () => {
    expect(screen.queryByText(/contact the owner of the site/i)).toBeNull();
  });
});
