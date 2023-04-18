export default {};

export const sectionOuterStyles = (hasDarkBg: boolean) => ({
  flexDirection: 'column',
  h: 'auto',
  w: '100%',
  bg: hasDarkBg ? 'linear-gradient(105.96deg, #0964AD 56.79%, #06547A 100%)' : 'tigeraGrey.100',
  pb: '60px',
});

export const tableContainerStyle = {
  justifyContent: 'center',

  alignItems: 'center',
  m: [3, 4, 8],
};

export const headerTextStyle = {
  textAlign: 'center',
  pt: 14,
  mb: 4,
};

export const subHeaderTextStyle = {
  fontWeight: '600',
  textAlign: 'center',
  mt: 7,
  fontSize: '2xl',
  lineHeight: 9,
};

export const innerTextStyle = {
  textAlign: 'center',
  fontSize: 'xl',
  fontWeight: 'normal',
  color: 'tigeraGrey.800',
  mx: '44px',
  mb: 10,
  mt: 2,
  lineHeight: 8,
};

export const iconContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  pt: '44px',
};

export const iconStyle = {
  width: '64px',
  height: '64px',
};

export const tableStyle = {
  width: ['92vw', '92vw', '92vw', '92vw', '1320px'],
};

export const actionBoxStyles = {
  mb: 14,
  justifyContent: 'center',
};
