import * as React from 'react';
import { Box, Flex, Text, SystemStyleObject, Stack, Heading, Image } from '@chakra-ui/react';
import { heading2Styles } from '../styles';
import selectDocsInfo from '../../data/selectDocsInfo';

import {
  sectionOuterStyles,
  iconContainerStyle,
  iconStyle,
  rectangleStyle,
  stackStyle,
  subHeaderTextStyle,
  headerTextStyle,
} from './styles';
import Link from '@docusaurus/Link';

interface SelectDocsProps {
  sx?: SystemStyleObject;
  isDarkMode: boolean;
}

const SelectDocs: React.FC<SelectDocsProps> = ({ isDarkMode, ...rest }) => (
  <Flex
    sx={sectionOuterStyles(isDarkMode)}
    {...rest}
  >
    <Heading
      as='h2'
      size='md'
      sx={{ ...heading2Styles(isDarkMode), ...headerTextStyle }}
    >
      Select a doc set
    </Heading>
    <Stack
      sx={stackStyle}
      direction={['column', 'column', 'column', 'column', 'row', 'row', 'row']}
    >
      {selectDocsInfo.selectDocsInfo.map((info, index) => (
        <Box key={index}>
          <Link href={info.link}>
            <Box
              sx={rectangleStyle}
              key={index}
            >
              <Box sx={iconContainerStyle}>
                <Image
                  src={info.image}
                  alt={info.alt}
                  sx={iconStyle}
                  loading='lazy'
                />
              </Box>
              <Text sx={subHeaderTextStyle}>{info.title}</Text>
            </Box>
          </Link>
        </Box>
      ))}
    </Stack>
  </Flex>
);

export default SelectDocs;
