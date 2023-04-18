import * as React from 'react';
import { Box, Flex, Text, SystemStyleObject, Stack, Heading, Image, Link } from '@chakra-ui/react';
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

interface SelectDocsProps {
  sx?: SystemStyleObject;
}

const SelectDocs: React.FC<SelectDocsProps> = ({ ...rest }) => (
  <Flex
    sx={sectionOuterStyles(false)}
    {...rest}
  >
    <Heading
      as='h2'
      size='md'
      sx={{ ...heading2Styles(false), ...headerTextStyle }}
    >
      Select your doc set
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
                  sx={iconStyle}
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
