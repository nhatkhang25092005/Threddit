export const style = {
  storyCard : {
    container:(story)=>({
      width: { xs: '4rem', sm: '6.2rem' },
      height: { xs: '12rem', sm: '12.8rem' },
      flex: '0 0 auto',
      borderRadius: '0.85rem',
      overflow: 'hidden',
      position: 'relative',
      cursor: 'pointer',
      scrollSnapAlign: 'start',
      background: story?.gradient || 'linear-gradient(160deg, #4A5A6A 0%, #1B2735 100%)',
      border: '1px solid rgba(255,255,255,0.16)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.22)',
      transform: 'translateZ(0)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        boxShadow: '0 6px 16px rgba(0,0,0,0.28)',
        transform: 'translateY(-2px)',
      },
    }),
    mediaWrap:(hasText)=>({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: hasText ? '64%' : '100%',
      overflow: 'hidden',
    }),
    media:{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      backgroundColor: '#111316',
    },
    audioPreview:{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background:
        'linear-gradient(140deg, rgba(23,128,109,0.95) 0%, rgba(42,157,143,0.95) 48%, rgba(31,69,91,0.9) 100%)',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: '18%',
        right: '18%',
        bottom: '22%',
        height: '0.34rem',
        borderRadius: '999rem',
        background:
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 7px, rgba(255,255,255,0.08) 7px 13px)',
      },
    },
    audioPreviewIcon:{
      color: '#ffffff',
      fontSize: { xs: '1.15rem', sm: '1.4rem' },
      filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.35))',
      zIndex: 1,
    },
    videoBadge:{
      position: 'absolute',
      top: '0.45rem',
      right: '0.45rem',
      width: { xs: '1.2rem', sm: '1.45rem' },
      height: { xs: '1.2rem', sm: '1.45rem' },
      borderRadius: '999rem',
      backgroundColor: 'rgba(0,0,0,0.55)',
      border: '1px solid rgba(255,255,255,0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    },
    videoBadgeIcon:{
      fontSize: { xs: '0.86rem', sm: '1rem' },
      color: '#ffffff',
    },
    overlay:(hasMedia, hasText)=>({
      position: 'absolute',
      inset: 0,
      background: hasMedia
        ? (hasText
          ? 'linear-gradient(180deg, rgba(5,8,12,0.02) 28%, rgba(5,8,12,0.74) 100%)'
          : 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.36) 100%)')
        : 'linear-gradient(160deg, rgba(10,18,28,0.3) 0%, rgba(10,18,28,0.7) 100%)',
      zIndex: 1,
    }),
    typeBadge:{
      position: 'absolute',
      top: '0.45rem',
      left: '0.45rem',
      borderRadius: '999rem',
      px: '0.42rem',
      py: '0.18rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.18rem',
      backgroundColor: 'rgba(0,0,0,0.48)',
      border: '1px solid rgba(255,255,255,0.36)',
      backdropFilter: 'blur(2px)',
      zIndex: 3,
    },
    typeBadgeIcon:{
      fontSize: { xs: '0.62rem', sm: '0.74rem' },
      color: '#ffffff',
    },
    typeBadgeText:{
      color: '#ffffff',
      fontSize: { xs: '0.5rem', sm: '0.57rem' },
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
      lineHeight: 1,
    },
    contentWrap:(hasMedia)=>({
      position: 'absolute',
      left: '0.65rem',
      right: '0.65rem',
      bottom: '0.55rem',
      top: hasMedia ? 'auto' : '2.2rem',
      zIndex: 3,
    }),
    text:(hasMedia)=>({
      color: '#ffffff',
      fontSize: { xs: '0.56rem', sm: '0.74rem' },
      fontWeight: 700,
      lineHeight: 1.28,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: hasMedia ? 4 : 9,
      textShadow: '0 2px 8px rgba(0,0,0,0.45)',
    })
  },

  pinnedStoryContainer:{
    surface:{
      width: '100%',
      p: '0.9rem',
    },
    title:{
      mb: '0.7rem',
      fontWeight: 700,
    },
    wrapper:{
      position: 'relative',
    },
    iconButton:(direction)=>({
      position: 'absolute',
      top: '50%',
      [direction]: '-0.55rem',
      transform: 'translateY(-50%)',
      zIndex: 5,
      width: '2rem',
      height: '2rem',
      border: '1px solid',
      borderColor: (theme) => (theme.palette.mode === 'dark' ? '#3A3B3C' : '#D0D7DE'),
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#242526' : '#ffffff'),
      boxShadow: '0 2px 10px rgba(0,0,0,0.22)',
      '&:hover': {
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#303233' : '#F7F9FB'),
      },
      '&.Mui-disabled': {
        opacity: 0,
        pointerEvents: 'none',
      },
    }),
    list:{
      py:'0.4rem',
      display: 'flex',
      gap: '0.65rem',
      overflowX: 'auto',
      overflowY: 'hidden',
      pb: '0.25rem',
      px: '0.15rem',
      scrollSnapType: 'x mandatory',
      '&::-webkit-scrollbar': {
        height: '0.35rem',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '999rem',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#4A4C4F' : '#CBD2D9'),
      },
    }
  }
}
