import { mode } from '@chakra-ui/theme-tools';
import { defineStyleConfig } from '@chakra-ui/react';

const buttonTheme = defineStyleConfig({
  baseStyle: {
    border: 'none',
    _hover: {
      cursor: 'pointer',
    },
  },
  variants: {
    solidBlack: (props) => ({
      backgroundColor: mode('gray.900', 'gray.600')(props),
      color: 'tigeraWhite',
      _hover: {
        backgroundColor: 'gray.700',
      },
      _active: {
        backgroundColor: 'gray.900',
      },
    }),
  },
});

export default buttonTheme;
