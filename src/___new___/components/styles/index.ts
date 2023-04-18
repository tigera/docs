/* 
    Common styles for SignIn page
*/

export const heading1Styles = (hasDarkBg: boolean) => ({
  my: '6',
  color: hasDarkBg ? 'white' : 'tigeraBlack',
  fontWeight: 'bold',
  fontSize: ['32px', '32px', '32px', '40px', '48px'],
  lineHeight: ['48px', '48px', '48px', '56x', '64px'],
});

export const heading2Styles = (hasDarkBg: boolean) => ({
  fontWeight: 'bold',
  fontSize: ['xl', 'xl', '32px'],
  lineHeight: [8, 8, '48px'],
  mb: [4, 4, 6],
  color: hasDarkBg ? 'white' : 'tigeraBlack',
});

export const textContentStyles = (hasDarkBg: boolean) => ({
  fontWeight: 'medium',
  fontSize: ['md', 'md', 'lg'],
  lineHeight: [6, 6, 8],
  mb: 4,
  color: hasDarkBg ? 'white' : 'tigeraBlack',
});

export const headerTextStyle = {
  textAlign: 'center',
  pt: 14,
  mb: 4,
};
