import * as React from 'react';
import { Button, Link, SystemStyleObject } from '@chakra-ui/react';
import styles from './styles';

interface LearnMoreButtonProps {
  href: string;
  ariaLabel: string;
  hasDarkBg?: boolean;
  sx?: SystemStyleObject;
}

const LearnMoreButton: React.FC<LearnMoreButtonProps> = ({ sx, ariaLabel, href, hasDarkBg = false, ...rest }) => {
  return (
    <Button
      sx={styles(hasDarkBg)}
      as={Link}
      variant='ghost'
      size='lg'
      {...{
        href,
        'aria-label': ariaLabel,
      }}
      {...rest}
    >
      Visit the documentation
    </Button>
  );
};

export default LearnMoreButton;
