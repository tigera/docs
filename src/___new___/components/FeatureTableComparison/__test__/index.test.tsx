import { render } from '@testing-library/react';

import FeatureTableComparison from '../index';

describe('<FeatureTableComparison/>', () => {
    it('should render the FeatureTableComparison component', () => {
        const { asFragment } = render(<FeatureTableComparison isDarkMode={true} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
