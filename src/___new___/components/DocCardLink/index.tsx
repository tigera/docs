import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useDocById } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import { cardBodyStyles, cardHeaderStyles, cardStyles, cardTextStyles, headingStyles, linkStyles } from './styles';
import { useDocUrl } from '../../hooks';
import PaidProductDocCardLink from './paidDocCardLink';

type DocCardLinkProps = {
  docId: string;
  title?: string;
  description?: string;
};

const CardLink: React.FC<DocCardLinkProps> = ({ docId, title, description }) => {
  const doc = useDocById(docId);
  const href = useDocUrl(docId);

  return (
    <Link
      href={href}
      style={linkStyles}
    >
      <Card sx={cardStyles}>
        <CardHeader sx={cardHeaderStyles}>
          <Heading
            sx={headingStyles}
            as='h5'
          >
            {title ?? doc.title}
          </Heading>
        </CardHeader>
        <CardBody sx={cardBodyStyles}>
          <Text sx={cardTextStyles}>{description ?? doc.description}</Text>
        </CardBody>
      </Card>
    </Link>
  );
};

export { PaidProductDocCardLink };

export default CardLink;
