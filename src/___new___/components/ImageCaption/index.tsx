import React from 'react';
import { ChakraProvider, Text } from '@chakra-ui/react';
import { imageCaptionStyles } from './styles';
import { theme } from '../../theme';

const ImageCaption: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Text sx={imageCaptionStyles}>{children}</Text>
  </ChakraProvider>
);

export default ImageCaption;
