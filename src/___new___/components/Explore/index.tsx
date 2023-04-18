import * as React from 'react';
import { Box, Flex, Text, SystemStyleObject, Stack, Heading } from '@chakra-ui/react';
import { heading2Styles } from '../styles';
import howItWorksInfo from '../../data/exploreInfo';

import {
  howItWorksSyle,
  iconContainerStyle,
  innerTextStyle,
  rectangleStyle,
  stackStyle,
  subHeaderTextStyle,
  headerTextStyle,
} from './styles';

interface HowItWorksProps {
  sx?: SystemStyleObject;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ ...rest }) => (
  <Flex
    sx={howItWorksSyle}
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
            sx={rectangleStyle}
            key={index}
          >
            <Box sx={iconContainerStyle}>
              {/* <Image
                src={info.image}
                sx={iconStyle}
              /> */}
            </Box>
            <Text sx={subHeaderTextStyle}>{info.title}</Text>
            {info.description.map((desc, index) => (
              <Text
                key={index}
                sx={innerTextStyle}
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
