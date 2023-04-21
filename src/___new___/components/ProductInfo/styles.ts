export const prodContainerStyles = (hasDarkBg: boolean) => ({
  //   bg: hasDarkBg ? 'tigeraBlack' : 'tigeraGrey.100',
  bg: hasDarkBg ? 'linear-gradient(105.96deg, #0964AD 56.79%, #06547A 100%)' : 'tigeraGrey.100',

  h: '100%',
  w: '100%',
  flexDirection: 'column',
});

export const sectionOuterStyles = (hasDarkBg: boolean) => ({
  w: '100%',
  bg: hasDarkBg ? 'linear-gradient(105.96deg, #0964AD 56.79%, #06547A 100%)' : 'tigeraGrey.100',

  padding: '0 6rem',
});

export const fixedWidthStyles = {
  height: '100%',
  flexDirection: 'column',
};

export const sectionInnerStyles = (hasDarkBg: boolean) => ({
  w: '100%',
  alignItems: 'center',
  py: [8, 8, 14],

  flexDirection: hasDarkBg
    ? ['column-reverse', 'column-reverse', 'row-reverse']
    : ['column-reverse', 'column-reverse', 'row'],
});

export const sectionCol1Styles = (hasDarkBg: boolean) => ({
  flex: '1 1 50%',
  alignSelf: ['center', 'center', 'flex-start', 'flex-start', 'center'],
  [hasDarkBg ? 'ml' : 'mr']: [0, 0, 6],
});

export const sectionCol2Styles = (hasDarkBg: boolean) => ({
  flexDirection: 'column',
  flex: '1 1 50%',
  [hasDarkBg ? 'mr' : 'ml']: [0, 0, 6],
});

export const sectionScreenImage = {
  w: '100%',
  maxHeight: '372px',
  mt: [4, 4, 0],
};
