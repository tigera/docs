import { render } from '@testing-library/react';

import SelectDocs from '../index';

describe('<SelectDocs/>', () => {
  it('should render the HowItWorks component', () => {
    const { asFragment } = render(<SelectDocs />);
    expect(asFragment()).toMatchSnapshot();
  });
});
