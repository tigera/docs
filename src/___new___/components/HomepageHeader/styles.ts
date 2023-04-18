export const heroContainerStyles = {
  h: '100%',
  w: '100%',
  bg: 'linear-gradient(105.96deg, #0964AD 56.79%, #06547A 100%)',
  textAlign: 'left',
  padding: '0 6rem',
};

export const heroInnerContainerStyles = {
  h: '100%',
  w: '100%',
  flexDirection: ['column', 'column', 'row'],
};

export const heroTextContentStyles = {
  flex: ['1 1 100%', '1 1 100%', '1 1 50%'],
  pr: [0, 0, 4],
  flexDirection: 'column',
  justifyContent: 'center',
};

export const heroScreensStyles = {
  flex: ['1 1 100%', '1 1 100%', '1 1 50%'],
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  pl: [0, 0, 4],
  py: [8, 8, 0],
};

export const heroScreenInnerStyles = {
  position: 'relative',
  height: ['355px', '546px', '546px', '546px', '546px'],
  w: '100%',
  '>div': {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: ['flex', 'flex', 'block'],
    justifyContent: 'center',
    img: {
      position: 'absolute',
      filter: 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.16))',
    },
    'img:nth-of-type(1)': {
      top: 0,
      width: ['80%', '80%', '303px', '303px', '303px'],
      left: ['auto', 'auto', '31%', '34%', '31%'],
    },
    'img:nth-of-type(2)': {
      top: ['14%', '14%', '17%', '14%'],
      left: ['auto', 'auto', 'auto'],
      width: ['90%', '90%', '89%', '453px'],
    },
    'img:nth-of-type(3)': {
      left: ['auto', 'auto', '9%', '7%', '14%'],
      width: ['100%', '100%', '89%', '474px'],
      top: ['34%', '34%', '44%'],
    },
  },
};

export const listIconStyles = {
  color: 'tigeraDarkBlue',
  fill: 'tigeraDarkBlue',
  width: '18px',
  height: '18px',
  marginRight: '12px',
  marginTop: '4px',
};

export const listTextStyles = {
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '36px',
  color: 'white',
  pl: '5px',
};

export const listItemStyles = {
  display: 'flex',
  alignItems: 'center',
  svg: {
    path: {
      stroke: 'white',
    },
  },
};

export const heroTextInnerContentStyles = {
  pt: ['42px', '42px', '42px', 14],
  pb: ['12px', '12px', '42px', 14],
  mr: [4, 4, 4, 4, '48px'],
};
export const heroHeadingStyles = {
  my: '6',
  color: 'white',
  fontWeight: 'bold',
  fontSize: ['32px', '32px', '32px', '40px', '48px'],
  lineHeight: ['48px', '48px', '48px', '56x', '64px'],
};

export const heroTextStyles = {
  mt: 6,
  fontWeight: 'normal',

  fontSize: 'xl',
  lineHeight: 6,
  color: 'white',
};

export const logoStyles = {
  width: '224px',
};
