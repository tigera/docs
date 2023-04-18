// import { render } from '../../../tests/helper';
import { render } from '@testing-library/react';

import Explore from '../index';

describe('<Explore/>', () => {
  it('should render the Explore component', () => {
    const { asFragment } = render(<Explore />);
    expect(asFragment()).toMatchSnapshot();
  });
});
