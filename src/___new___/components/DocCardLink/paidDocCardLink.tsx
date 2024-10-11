import { Badge, Box } from '@chakra-ui/react';
import React from 'react';
import CardLink from './cardLink';
import { badgeStyles, cardGradientStyles, gradientStyles } from './styles';

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
    <Gradient>
      <CardLink
        href={href}
        title={title}
        description={description}
        cardSx={cardGradientStyles}
        Footer={
          <Badge
            sx={badgeStyles}
            layerStyle={'docsGradientBlueGreen'}
            fontWeight='semibold'
          >
            {paidProductLabel}
          </Badge>
        }
      />
    </Gradient>
  );
};

export default PaidProductDocCardLink;
