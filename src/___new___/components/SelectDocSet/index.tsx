import * as React from 'react';
import { Box, Flex, Text, SystemStyleObject, Stack, Heading, Button } from '@chakra-ui/react';
import Link from '@docusaurus/Link';

import { heading2Styles } from '../styles';
import {
  sectionOuterStyles,
  rectangleStyle,
  stackStyle,
  headerTextStyle,
} from './styles';

import { docCardsInfo } from '../../data/docCardsInfo';

interface SelectDocsProps {
  sx?: SystemStyleObject;
  isDarkMode: boolean;
}

const SelectDocs: React.FC<SelectDocsProps> = ({ isDarkMode, ...rest }) => (
  <Flex
    sx={sectionOuterStyles(isDarkMode)}
    {...rest}
    flexDirection="column"
  >
    <Heading
      as='h2'
      size='md'
      sx={{ ...heading2Styles(isDarkMode), ...headerTextStyle }}
      textAlign="center"
      mb={10}
    >
    Products
    </Heading>

    <Stack
      sx={stackStyle}
      // 'stretch' ensures all cards in a row have the same height
      direction={['column', 'column', 'column', 'column', 'row', 'row', 'row']}
      spacing={6}
      alignItems="stretch"
      justifyContent="center"
    >
      {docCardsInfo.map((info, index) => (
        <Box
          key={index}
          sx={{
            ...rectangleStyle,
            maxWidth: '400px',
            width: '100%',
            height: 'auto',
          }}
          flex="0 1 auto"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          padding="40px 24px"
          gap="16px"
        >
          <Box>
            <Heading as="h3" size="m" mb={4} color={isDarkMode ? 'white' : 'black'}>
              {info.heading}
            </Heading>
            <Text fontSize="sm" color={isDarkMode ? 'gray.400' : 'gray.600'}>
              {info.caption}
            </Text>
          </Box>

          <Box mt={8}>
            <Link href={info.link} style={{ textDecoration: 'none' }}>
              <Button
                bg="#F89C1D"
                color="white"
                px={8}
                fontWeight="bold"
                borderRadius="md"
                transition="background 0.2s ease-in-out"
                _hover={{
                  bg: '#E0891A',
                  textDecoration: 'none'
                }}
                _active={{
                  bg: '#C77916'
                }}
              >
                Go to docs
              </Button>
            </Link>
          </Box>
        </Box>
      ))}
    </Stack>
  </Flex>
);

export default SelectDocs;