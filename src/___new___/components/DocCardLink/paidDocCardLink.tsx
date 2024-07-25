import { Badge, Box, Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react';
import Link from '@docusaurus/Link';
import React from 'react';
import {
  badgeStyles,
  cardBodyStyles,
  cardGradientStyles,
  cardHeaderStyles,
  cardTextStyles,
  footerStyles,
  gradientStyles,
  headingStyles,
  linkStyles,
} from './styles';

enum PaidProductName {
  cloud = 'cloud',
  enterprise = 'enterprise',
}

const Labels = {
  [PaidProductName.cloud]: 'Cloud',
  [PaidProductName.enterprise]: 'Enterprise',
};

const Gradient = ({ children }) => {
  return (
    <Box
      sx={gradientStyles}
      layerStyle={'docsGradientBlueGreen'}
    >
      {children}
    </Box>
  );
};

type PaidDocCardLinkProps = {
  title: string;
  description: string;
  paidProductName: PaidProductName;
  url: string;
};

export const PaidProductDocCardLink: React.FC<PaidDocCardLinkProps> = ({
  title = '',
  description = '',
  paidProductName = '',
  url = '',
}) => {
  const paidProductLabel = paidProductName && (Labels[paidProductName] ?? '');
  const href = url.startsWith('/') ? url : `/${url}`;

  return (
    <Link
      href={href}
      style={linkStyles}
    >
      <Gradient>
        <Card sx={cardGradientStyles}>
          <CardHeader sx={cardHeaderStyles}>
            <Heading
              sx={headingStyles}
              as='h5'
            >
              {title}
            </Heading>
          </CardHeader>
          <CardBody sx={cardBodyStyles}>
            <Text sx={cardTextStyles}>{description}</Text>
          </CardBody>

          <CardFooter sx={footerStyles}>
            <Badge
              sx={badgeStyles}
              layerStyle={'docsGradientBlueGreen'}
              fontWeight='semibold'
            >
              {paidProductLabel}
            </Badge>
          </CardFooter>
        </Card>
      </Gradient>
    </Link>
  );
};

export default PaidProductDocCardLink;
