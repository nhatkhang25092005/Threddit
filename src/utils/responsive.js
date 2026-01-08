
/**
========================================
  Breakpoints reference:
  xs: 0px      (mobile)
  sm: 600px    (tablet)
  md: 900px    (desktop small)
  lg: 1200px   (desktop)
  xl: 1536px   (desktop large)
========================================
*/
export const responsive = {
  px: (xs = 1, sm = 2, md = 3) => ({
    px:{xs: `${xs}rem`, sm: `${sm}rem`, md: `${md}rem`}
  }),

  width: (xs = '95vw', sm = '80vw', md = '60vw', lg = '50vw') => ({
    width: { xs, sm, md, lg },
    maxWidth: '800px',
    mx: 'auto'
  }),

  stackToRow: (breakpoint = 'sm') => ({
    flexDirection: { xs: 'column', [breakpoint]: 'row' }
  }),

  fontSize: (xs = '12px', sm = '14px', md = '16px') => ({
    fontSize: { xs, sm, md }
  }),

}