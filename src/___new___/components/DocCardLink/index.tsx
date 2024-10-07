import { useColorModeValue } from '@chakra-ui/react';
import { useDocById } from '@docusaurus/plugin-content-docs/client';
import React from 'react';
import { useDocUrl } from '../../hooks';
import CardLink from './cardLink';
import PaidProductDocCardLink from './paidDocCardLink';
import { cardStyles, lightCardStyles } from './styles';

type DocCardLinkProps = {
  docId: string;
  title?: string;
  description?: string;
};

const DocCardLink: React.FC<DocCardLinkProps> = ({ docId, title, description }) => {
  const doc = useDocById(docId);
  const href = useDocUrl(docId);
  const cardSx = useColorModeValue(lightCardStyles, cardStyles);

  return (
    <CardLink
      href={href}
      title={title ?? doc.title}
      description={description ?? doc.description}
      cardSx={cardSx}
    />
  );
};

export { PaidProductDocCardLink };

export default DocCardLink;
