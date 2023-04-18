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

import { heading2Styles } from '../styles';
import featureTableComparisonInfo from '../../data/featureTableComparisonInfo';

import { sectionOuterStyles, tableContainerStyle, headerTextStyle, checkStyle, headerTextStyleSmall } from './styles';

interface ProductComparisonProps {
  sx?: SystemStyleObject;
}

export const iconStyles = { color: 'tigeraGreen.900', w: '21px', h: '21px' };

const ProductComparison: React.FC<ProductComparisonProps> = ({ ...rest }) => (
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
            <Table size='xl'>
              {/* <TableCaption>Product comparison by feature</TableCaption> */}
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Calico Open Source</Th>
                  <Th>Calico Enterprise</Th>
                  <Th>Calico Cloud</Th>
                </Tr>
              </Thead>
              <Tbody>
                {info.content.map((info, index_inner) => (
                  <Tr key={`${index}-${index_inner}`}>
                    <Td sx={{ w: '700px' }}>{info.rowHeader}</Td>
                    <Td sx={checkStyle}>{info.CalicoOpenSource === 'Y' ? <CheckIcon sx={iconStyles} /> : ''}</Td>
                    <Td sx={checkStyle}>{info.CalicoEntreprise === 'Y' ? <CheckIcon sx={iconStyles} /> : ''}</Td>
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
