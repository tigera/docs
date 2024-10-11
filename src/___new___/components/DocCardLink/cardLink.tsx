import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SystemStyleObject,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import Link from '@docusaurus/Link';
import {
  cardBodyStyles,
  cardHeaderStyles,
  cardTextStyles,
  darkHeadingStyles,
  footerStyles,
  lightHeadingStyles,
  linkStyles,
} from './styles';

type CardLinkProps = {
  title: string;
  description: string;
  href: string;
  cardSx: SystemStyleObject;
  Footer?: React.ReactNode;
};

const CardLink: React.FC<CardLinkProps> = ({ href, title, description, cardSx, Footer }) => {
  const headingSx = useColorModeValue(lightHeadingStyles, darkHeadingStyles);

  return (
    <Link
      href={href}
      style={linkStyles}
    >
      <Card sx={cardSx}>
        <CardHeader sx={cardHeaderStyles}>
          <Heading
            sx={headingSx}
            as='h5'
          >
            {title}
          </Heading>
        </CardHeader>
        <CardBody sx={cardBodyStyles}>
          <Text sx={cardTextStyles}>{description}</Text>
        </CardBody>

        {Footer && <CardFooter sx={footerStyles}>{Footer}</CardFooter>}
      </Card>
    </Link>
  );
};

export default CardLink;
