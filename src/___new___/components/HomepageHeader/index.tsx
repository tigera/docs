import * as React from 'react';
import { Flex, Text, Box, Heading, SystemStyleObject } from '@chakra-ui/react';

import {
  heroContainerStyles,
  heroInnerContainerStyles,
  heroTextContentStyles,
  heroTextInnerContentStyles,
  heroTextStyles,
} from './styles';

import { heading1Styles } from '../styles';

interface HeroBannerProps {
  siteConfig: any;
  isDarkMode: boolean;
  sx?: SystemStyleObject;
}

const HomepageHeader: React.FC<HeroBannerProps> = ({ sx, siteConfig, isDarkMode, ...rest }) => {
  return (
    <Flex
      sx={{ ...heroContainerStyles, ...sx }}
      {...rest}
    >
      <Flex sx={heroInnerContainerStyles}>
        <Flex sx={heroTextContentStyles}>
          <Box sx={heroTextInnerContentStyles}>
            <Heading
              as='h1'
              size='md'
              sx={heading1Styles(true)}
            >
              {siteConfig.title}
            </Heading>

            <Text sx={heroTextStyles}>{siteConfig.tagline}</Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomepageHeader;
