// /* istanbul ignore file */
// import React from 'react';
// import { render } from '@testing-library/react';
// import { mount, shallow } from 'enzyme';
// import { ChakraProvider } from '@chakra-ui/react';
// import { MemoryRouter } from 'react-router';
// import { theme } from '../src/theme';
// import { LocalStorage } from 'node-localstorage';

// const BaseWrapper = ({ children }) => (
//     <MemoryRouter initialEntries={['/']}>
//         <ChakraProvider theme={theme}>{children}</ChakraProvider>
//     </MemoryRouter>
// );

// const BaseWrapperExcludingRouter = ({ children }) => (
//     <ChakraProvider theme={theme}>{children}</ChakraProvider>
// );

// export const mountWithBaseWrapperExcludingRouter = (node) =>
//     mount(node, {
//         wrappingComponent: BaseWrapperExcludingRouter,
//         wrappingComponentProps: {},
//     });

// export const mountWithBaseWrapper = (node) =>
//     mount(node, {
//         wrappingComponent: BaseWrapper,
//         wrappingComponentProps: {},
//     });

// export const shallowWithBaseWrapper = (node) =>
//     shallow(node, {
//         wrappingComponent: BaseWrapper,
//         wrappingComponentProps: {},
//     });

// export const testRender = (ui, options?: any) =>
//     render(ui, { wrapper: BaseWrapper, ...options });

// export * from '@testing-library/react';

// global.localStorage = new LocalStorage('./scratch'); // ensure to .gitignore ./scratch
