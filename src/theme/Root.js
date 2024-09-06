import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../___new___/theme/index';

const Root = ({ children }) => (
  <ChakraProvider
    theme={theme}
    resetCSS={false}
  >
    {children}
  </ChakraProvider>
);

export default Root;
