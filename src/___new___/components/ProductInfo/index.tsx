import * as React from 'react';
import { Flex, Box, SystemStyleObject, Heading, Text, Image } from '@chakra-ui/react';
import compareInfo from '../../data/compareInfo';
import {
  prodContainerStyles,
  sectionCol1Styles,
  sectionCol2Styles,
  sectionInnerStyles,
  sectionOuterStyles,
  sectionScreenImage,
} from './styles';
import { headerTextStyle, heading2Styles, textContentStyles } from '../styles';
import LearnMoreButton from '../LearnMoreButton';

interface ProductInfoProps {
  sx?: SystemStyleObject;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ sx, ...rest }) => {
  return (
    <Flex
      sx={{ ...prodContainerStyles, ...sx }}
      {...rest}
    >
      <Heading
        as='h2'
        size='md'
        sx={{ ...heading2Styles(false), ...headerTextStyle }}
      >
        About Tigera products
      </Heading>
      {compareInfo.aboutInfo.map((info, index) => {
        const hasDarkBg = index % 2 !== 0;

        return (
          <Flex
            sx={sectionOuterStyles(false)}
            key={index}
          >
            <Flex sx={sectionInnerStyles(hasDarkBg)}>
              <Box sx={sectionCol1Styles(hasDarkBg)}>
                <Image
                  src={info.image}
                  sx={sectionScreenImage}
                />
              </Box>
              <Flex sx={sectionCol2Styles(hasDarkBg)}>
                <Heading
                  as='h2'
                  size='md'
                  sx={heading2Styles(false)}
                >
                  {info.title}
                </Heading>
                <Box>
                  {info.description.map((desc, index) => (
                    <Text
                      key={index}
                      sx={textContentStyles(false)}
                    >
                      {desc}
                    </Text>
                  ))}
                </Box>

                <Flex justifyContent={['center', 'center', 'start']}>
                  <LearnMoreButton
                    href={info.link}
                    ariaLabel={info.linkDescription}
                    hasDarkBg={false}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default ProductInfo;
