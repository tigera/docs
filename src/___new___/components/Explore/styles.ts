export default {};

export const howItWorksStyle = {
  width: '100%',
  h: 'auto',
  bg: 'linear-gradient(105.96deg, #0964AD 56.79%, #06547A 100%)',
  flexDirection: 'column',
  pb: '60px',
};

export const stackStyle = {
  justifyContent: 'center',
  h: 'auto',
  alignItems: 'center',
  mb: -2,
  px: [4, 0],
};

export const headerTextStyle = {
  textAlign: 'center',
  pt: 14,
  mb: 4,
};

export const subHeaderTextStyle = (isDarkMode: boolean) => ({
  fontWeight: '600',
  textAlign: 'center',
  color: isDarkMode ? 'tigeraWhite' : 'tigeraBlack',

  mt: 7,
  fontSize: '2xl',
  lineHeight: 9,
});

export const innerTextStyle = (isDarkMode: boolean) => ({
  textAlign: 'center',
  fontSize: 'xl',
  fontWeight: 'normal',
  color: isDarkMode ? 'tigeraWhite' : 'tigeraGrey.800',
  mx: '44px',
  mb: 10,
  mt: 2,
  lineHeight: 8,
});

export const rectangleStyle = (isDarkMode: boolean) => ({
  width: ['100%', '371px'],
  border: '1px',
  borderColor: 'tigeraCloudGrey',
  borderRadius: 'lg',
  bg: isDarkMode ? 'tigeraBlack' : 'tigeraWhite',
  ml: [0, 4],
  mr: [0, 4],
  mt: [4, 4, 4, 4, ''],
  mb: [4, 4, 4, 4, ''],
  pb: '40px',
});

export const actionBoxStyles = {
  mb: 14,
  justifyContent: 'center',
};
