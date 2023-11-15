import * as React from 'react';
import {
  Box,
  Flex,
  SystemStyleObject,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import { heading2Styles, tableStyle } from '../styles';
import featureTableComparisonInfo from '../../data/featureTableComparisonInfo';

import {
  sectionOuterStyles,
  rowStyle,
  tableContainerStyle,
  headerTextStyle,
  checkStyle,
  headerTextStyleSmall,
  thStyle,
} from './styles';

interface ProductComparisonProps {
  sx?: SystemStyleObject;
  isDarkMode: boolean;
}

export const iconStyles = { color: 'tigeraGreen.900', w: '21px', h: '21px' };

const ProductComparison: React.FC<ProductComparisonProps> = ({ isDarkMode, ...rest }) => (
  <Flex
    sx={sectionOuterStyles(true)}
    {...rest}
  >
    <Heading
      as='h2'
      size='md'
      sx={{ ...heading2Styles(true), ...headerTextStyle }}
    >
      Product comparison by feature
    </Heading>
    <Box sx={tableContainerStyle}>
      {featureTableComparisonInfo.entries.map((info, index) => (
        <>
          <Heading
            as='h3'
            size='sm'
            sx={{ ...heading2Styles(true), ...headerTextStyleSmall }}
          >
            {info.title}
          </Heading>

          <TableContainer>
            <Table
              size='xl'
              sx={tableStyle(isDarkMode)}
            >
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th sx={thStyle(isDarkMode)}>Calico Open Source</Th>
                  <Th sx={thStyle(isDarkMode)}>Calico Enterprise</Th>
                  <Th sx={thStyle(isDarkMode)}>Calico Cloud</Th>
                </Tr>
              </Thead>
              <Tbody>
                {info.content.map((info, index_inner) => (
                  <Tr key={`${index}-${index_inner}`}>
                    <Td sx={rowStyle}>{info.rowHeader}</Td>
                    <Td sx={checkStyle}>{info.CalicoOpenSource === 'Y' ? <CheckIcon sx={iconStyles} /> : ''}</Td>
                    <Td sx={checkStyle}>{info.CalicoEnterprise === 'Y' ? <CheckIcon sx={iconStyles} /> : ''}</Td>
                    <Td sx={checkStyle}>{info.CalicoCloud === 'Y' ? <CheckIcon sx={iconStyles} /> : ''}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      ))}
    </Box>
  </Flex>
);

export default ProductComparison;
