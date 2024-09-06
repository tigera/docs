import React, { PropsWithChildren } from 'react';
import { Grid } from '@chakra-ui/react';
import type { GridProps, HTMLChakraProps } from '@chakra-ui/system';
import { gridStyles } from './styles';

const DocCardLinkLayout: React.FC<GridProps & PropsWithChildren & HTMLChakraProps<'div'>> = ({ children, ...rest }) => {
  return (
    <Grid
      sx={gridStyles}
      {...rest}
    >
      {children}
    </Grid>
  );
};

export default DocCardLinkLayout;
