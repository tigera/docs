import * as React from 'react';
import { Image, Flex, Text, Box, Heading, SystemStyleObject } from '@chakra-ui/react';

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
      flexDirection="row"
      alignItems="center"
      gap={{ base: 4, md: 8 }}
      {...rest}
    >
      <Image
        src="/img/Calico-logo-2026-badge.svg"
        alt="Calico logo"
        boxSize={{ base: "60px", md: "100px", lg: "120px" }}
        objectFit="contain"
        flexShrink={0}
        // -------------------------------
      />

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
