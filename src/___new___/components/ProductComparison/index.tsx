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
  Thead,
  Tr,
  Th,
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
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ ...rest }) => (
  <Flex
    sx={sectionOuterStyles(false)}
    {...rest}
  >
    <Heading
      as='h2'
      size='md'
      sx={{ ...heading2Styles(false), ...headerTextStyle }}
    >
      Best fit
    </Heading>
    <Box sx={tableContainerStyle}>
      <TableContainer>
        <Table
          size='xl'
          sx={tableStyle}
        >
          <Thead>
            <Tr>
              <Th></Th>
              <Th> </Th>
              <Th>Best fit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {compareInfo.bestFit.map((info, index) => (
              <Tr key={index}>
                <Td>
                  <Box sx={iconContainerStyle}>
                    <Image
                      src={info.image}
                      sx={iconStyle}
                    />
                  </Box>
                  {info.title}
                </Td>
                <Td>
                  <b>
                    {info.costSupport.map((desc, index) => (
                      <Text
                        key={index}
                        // sx={textContentStyles(hasDarkBg)}
                      >
                        {desc}
                      </Text>
                    ))}
                  </b>
                </Td>
                <Td>
                  <b>{info.target}</b>
                  {info.bestFit.map((desc, index) => (
                    <Text
                      key={index}
                      // sx={textContentStyles(hasDarkBg)}
                    >
                      {desc}
                    </Text>
                  ))}
                  <b>{info?.target2}</b>
                  {info.bestFit2?.map((desc, index) => (
                    <Text
                      key={index}
                      // sx={textContentStyles(hasDarkBg)}
                    >
                      {desc}
                    </Text>
                  ))}
                  {/* {info.bestFit} */}
                </Td>
              </Tr>
              // <Box key={index}>
              //   <Link href={info.link}>
              //     <Box
              //       sx={rectangleStyle}
              //       key={index}
              //     >
              //       <Box sx={iconContainerStyle}>
              //         <Image
              //           src={info.image}
              //           sx={iconStyle}
              //         />
              //       </Box>
              //       <Text sx={subHeaderTextStyle}>{info.title}</Text>
              //     </Box>
              //   </Link>
              // </Box>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  </Flex>
);

export default ProductComparison;
