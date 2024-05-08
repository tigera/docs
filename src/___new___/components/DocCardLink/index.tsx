import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { theme } from '../../theme';
import { ChakraProvider } from '@chakra-ui/react';
import { useDocById } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { useProductId } from '../../../utils/useProductId';
import { cardBodyStyles, cardHeaderStyles, cardStyles, cardTextStyles, headingStyles, linkStyles } from './styles';

const useDocVersion = (productId: string | undefined) => {
  const { pathname } = useLocation();
  const regex = new RegExp(`${productId}\/(latest|\d+(\.\d+)*)\/`);

  return productId === 'calico-cloud' || !productId ? null : (pathname.match(regex) ?? [])[1];
};

const useDocUrl = (docId: string) => {
  const productId = useProductId();
  const version = useDocVersion(productId);

  return `/${[productId, version, docId].filter(Boolean).join('/')}`;
};

type DocCardLinkProps = {
  docId: string;
  title?: string;
  description?: string;
};

const CardLink: React.FC<DocCardLinkProps> = ({ docId, title, description }) => {
  const doc = useDocById(docId);
  const href = useDocUrl(docId);

  return (
    <ChakraProvider theme={theme}>
      <Link
        href={href}
        style={linkStyles}
      >
        <Card sx={cardStyles}>
          <CardHeader sx={cardHeaderStyles}>
            <Heading sx={headingStyles}>{title ?? doc.title}</Heading>
          </CardHeader>
          <CardBody sx={cardBodyStyles}>
            <Text sx={cardTextStyles}>{description ?? doc.description}</Text>
          </CardBody>
        </Card>
      </Link>
    </ChakraProvider>
  );
};

export default CardLink;
