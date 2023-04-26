export default (hasDarkBg: boolean) => ({
  w: 'auto',
  ml: '-23px',
  fontStyle: 'normal',
  fontWeight: 'semibold',
  fontSize: ['md', 'lg', 'xl'],
  lineHeight: 7,
  color: hasDarkBg ? 'white' : 'tigeraBlueDark',
  svg: {
    path: {
      stroke: hasDarkBg ? 'white' : 'tigeraBlueDark',
    },
  },
  _hover: {
    svg: {
      path: {
        stroke: 'tigeraBlueMedium',
      },
    },
  },
});
