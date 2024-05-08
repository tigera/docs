import React, { PropsWithChildren } from 'react';
import { Grid } from '@chakra-ui/react';
import type { GridProps, HTMLChakraProps } from '@chakra-ui/system';
import { theme } from '../../theme';
import { ChakraProvider } from '@chakra-ui/react';
import { gridStyles } from './styles';

const DocCardLinkLayout: React.FC<GridProps & PropsWithChildren & HTMLChakraProps<'div'>> = ({ children, ...rest }) => {
  return (
    <ChakraProvider theme={theme}>
      <Grid
        sx={gridStyles}
        {...rest}
      >
        {children}
      </Grid>
    </ChakraProvider>
  );
};

export default DocCardLinkLayout;
