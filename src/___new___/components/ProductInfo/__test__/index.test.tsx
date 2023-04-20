import { render } from '@testing-library/react';

import ProductInfo from '../index';

describe('<ProductInfo/>', () => {
  it('should render the ProductInfo component', () => {
    const { asFragment } = render(<ProductInfo isDarkMode={true}  />);
    expect(asFragment()).toMatchSnapshot();
  });
});
