import { render } from '@testing-library/react';
import Explore from '../index';

describe('<Explore/>', () => {
  it('should render the Explore component', () => {
    const { asFragment } = render(<Explore isDarkMode={true} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
