import * as React from 'react';
import {
  Box,
  Flex,
  Text,
  SystemStyleObject,
  Heading,
  Image,
  TableContainer,
  Table,
  Tr,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { heading2Styles } from '../styles';
import compareInfo from '../../data/compareInfo';

import {
  sectionOuterStyles,
  iconContainerStyle,
  iconStyle,
  tableContainerStyle,
  headerTextStyle,
  tableStyle,
} from './styles';

interface ProductComparisonProps {
  sx?: SystemStyleObject;
  isDarkMode: boolean;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ isDarkMode, ...rest }) => (
  <Flex
    sx={sectionOuterStyles}
    {...rest}
  >
    <Heading
      as='h2'
      size='md'
      sx={{ ...heading2Styles(true), ...headerTextStyle }}
    >
      Best fit
    </Heading>
    <Box sx={tableContainerStyle}>
      <TableContainer>
        <Table
          size='xl'
          sx={tableStyle(isDarkMode)}
        >
          <Tbody>
            {compareInfo.bestFit.map((info, index) => (
              <Tr key={index}>
                <Td sx={{ textAlign: 'center' }}>
                  <Box sx={iconContainerStyle}>
                    <Image
                      src={info.image}
                      alt={info.alt}
                      sx={iconStyle}
                      loading='lazy'
                    />
                  </Box>
                  {info.title}
                </Td>
                <Td>
                  <b>
                    {info.costSupport.map((desc, index) => (
                      <Text key={index}>{desc}</Text>
                    ))}
                  </b>
                </Td>
                <Td>
                  <b>{info.target}</b>
                  {info.bestFit.map((desc, index) => (
                    <Text key={index}>{desc}</Text>
                  ))}
                  {info.bestFitSub?.map((desc, index) => (
                    <Text key={index}>&ensp;{desc}</Text>
                  ))}
                  <b>{info?.target2}</b>
                  {info.bestFit2?.map((desc, index) => (
                    <Text key={index}>{desc.trim() === '' ? <br /> : desc}</Text>
                  ))}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  </Flex>
);

export default ProductComparison;
