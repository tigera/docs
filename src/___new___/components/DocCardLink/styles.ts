export const linkStyles = { textDecoration: 'none' };

const cardHover = {
  boxShadow: 'rgb(0, 0, 0, 0.2) 2px 2px 8px',
};

export const cardStyles = {
  p: 4,
  h: 'full',
  _hover: cardHover,
  transition: 'box-shadow 0.2s ease-in-out',
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
  color: 'tigeraBlack',
  transition: 'color 0.2s ease-in-out',
  _hover: {
    color: 'tigeraBlueDark',
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
