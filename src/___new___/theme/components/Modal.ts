import { mode } from '@chakra-ui/theme-tools';
import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const modalTheme = defineMultiStyleConfig({
  baseStyle: (props) => ({
    dialog: {
      backgroundColor: mode('white', 'gray.800')(props),
    },
    closeButton: {
      border: 'none',
      _hover: {
        cursor: 'pointer',
        bg: mode('blackAlpha.100', 'whiteAlpha.100')(props),
      },
    },
    body: {
      fontSize: 'md',
    },
  }),
});

export default modalTheme;
