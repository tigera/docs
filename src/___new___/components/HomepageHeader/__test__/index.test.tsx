import { render } from '@testing-library/react';

import HomepageHeader from '../index';

const siteConfig = {
  title: 'Test title',
  tagline: 'Test tagline',
};

describe('<HomepageHeader/>', () => {
  it('should render the HomepageHeader component', () => {
    const { asFragment } = render(<HomepageHeader siteConfig={siteConfig} isDarkMode={true} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
