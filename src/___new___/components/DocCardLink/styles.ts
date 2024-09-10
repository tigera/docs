export const linkStyles = { textDecoration: 'none' };

const cardHover = {
  boxShadow: 'rgb(0, 0, 0, 0.2) 2px 2px 8px',
};
const shadowTransition = 'box-shadow 0.2s ease-in-out';

export const cardStyles = {
  p: 4,
  h: 'full',
};

export const lightCardStyles = {
  ...cardStyles,
  _hover: cardHover,
  transition: shadowTransition,
  boxShadow: 'none',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'tigeraGrey.200',
};

export const cardHeaderStyles = {
  p: 0,
  mb: 3,
};

export const headingStyles = {
  fontSize: 'md',
  m: 0,
  transition: 'color 0.2s ease-in-out',
};

export const lightHeadingStyles = {
  ...headingStyles,
  color: 'tigeraBlack',
  _hover: {
    color: 'tigeraBlueDark',
  },
};

export const darkHeadingStyles = {
  ...headingStyles,
  color: 'tigeraGrey.100',
  _hover: {
    color: 'var(--tigera-dropdown-item-background-color-hover)',
  },
};

export const cardBodyStyles = {
  p: 0,
};

export const cardTextStyles = {
  fontSize: 'sm',
  m: '0',
};

export const gradientStyles = {
  position: 'relative',
  height: 'full',
  borderRadius: '6px',
  p: '2px',
  _hover: cardHover,
  transition: shadowTransition,
};

export const cardGradientStyles = {
  ...cardStyles,
  border: 'none',
  borderRadius: '5px',
  position: 'relative',
  _hover: undefined,
};

export const badgeStyles = {
  marginLeft: 'auto',
  color: 'tigeraWhite',
  textTransform: 'none',
};

export const footerStyles = {
  p: 0,
  pt: 2,
};
