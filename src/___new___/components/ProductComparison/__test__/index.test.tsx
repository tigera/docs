import { render } from '@testing-library/react';

import ProductComparison from '../index';

describe('<ProductComparison/>', () => {
  it('should render the ProductComparison component', () => {
    const { asFragment } = render(<ProductComparison isDarkMode={true}  />);
    expect(asFragment()).toMatchSnapshot();
  });
});
