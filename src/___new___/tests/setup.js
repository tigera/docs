import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

class TextDecoder {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(_) {
        this.decode = (str) => str;
    }
}

global.TextDecoder = TextDecoder;
global.fetch = jest.fn(() => Promise.resolve({}));
global.Request = (url) => url;

global.matchMedia =
    global.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {},
        };
    };
