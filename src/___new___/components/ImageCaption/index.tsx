import { Text } from '@chakra-ui/react';
import React from 'react';
import { imageCaptionStyles } from './styles';

const ImageCaption: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Text sx={imageCaptionStyles}>{children}</Text>
);

export default ImageCaption;
