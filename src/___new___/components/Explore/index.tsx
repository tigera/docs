//Possibly to be removed

import * as React from 'react';
import { Box, Flex, Text, SystemStyleObject, Stack, Heading } from '@chakra-ui/react';
import { heading2Styles } from '../styles';
import howItWorksInfo from '../../data/exploreInfo';

import {
  howItWorksStyle,
  innerTextStyle,
  rectangleStyle,
  stackStyle,
  subHeaderTextStyle,
  headerTextStyle,
} from './styles';

interface HowItWorksProps {
  sx?: SystemStyleObject;
  isDarkMode: boolean;

}

const HowItWorks: React.FC<HowItWorksProps> = ({ isDarkMode,...rest }) => (
  <Flex
    sx={howItWorksStyle}
    {...rest}
  >
    <Heading
      as='h2'
      size='md'
      sx={{ ...heading2Styles(true), ...headerTextStyle }}
    >
      Explore the basics...
    </Heading>
    <Stack
      sx={stackStyle}
      direction={['column', 'column', 'column', 'column', 'row', 'row', 'row']}
    >
      {howItWorksInfo.howItWorksInfo.map((info, index) => (
        <Box key={index}>
          <Box
            sx={rectangleStyle(isDarkMode)}
            key={index}
          >
            <Text sx={subHeaderTextStyle(isDarkMode)}>{info.title}</Text>
            {info.description.map((desc, index) => (
              <Text
                key={index}
                sx={innerTextStyle(isDarkMode)}
              >
                {desc}
              </Text>
            ))}
          </Box>
        </Box>
      ))}
    </Stack>
  </Flex>
);

export default HowItWorks;
