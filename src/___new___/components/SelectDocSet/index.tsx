import * as React from 'react';
import { Box, Flex, Text, SystemStyleObject, Stack, Heading, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
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
      direction={['column', 'column', 'column', 'column', 'row', 'row', 'row']}
      spacing={6}
      alignItems="stretch"
      justifyContent="center"
    >
      {docCardsInfo.map((info, index) => (
        <Link
          key={index}
          href={info.link}
          style={{ textDecoration: 'none', display: 'flex' }}
        >
          <Box
            role="group"
            sx={{
              ...rectangleStyle,
              maxWidth: '400px',
              width: '100%',
              height: 'auto',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            }}
            _hover={{
              transform: 'translateY(-4px)',
              boxShadow: 'lg',
            }}
            flex="1 1 auto"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            // Changed from 'center' to 'flex-start' for left alignment
            alignItems="flex-start"
            textAlign="left"
            padding="40px 24px"
            gap="16px"
          >
            <Box width="100%">
              <Heading as="h3" size="md" mb={4} color="black">
                {info.heading}
              </Heading>
              <Text fontSize="sm" color="gray.700">
                {info.caption}
              </Text>
            </Box>

            <Box mt={8}>
              <Button
                variant="unstyled"
                display="inline-flex"
                alignItems="center" // Keeps text and arrow vertically aligned
                rightIcon={<ArrowForwardIcon />}
                color="black"
                fontWeight="bold"
                fontSize="md"
                height="auto"
                p={0}
                pointerEvents="none"
              >
                Go to documentation
              </Button>
            </Box>
          </Box>
        </Link>
      ))}
    </Stack>
  </Flex>
);

export default SelectDocs;