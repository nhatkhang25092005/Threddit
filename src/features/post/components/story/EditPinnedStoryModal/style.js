export const style = {
  editPinnedStoryModal: {
    surface: {
      mx: 'auto',
      my: {
        xs: '0.75rem',
        sm: '1rem',
        md: '1.4rem',
      },
      width: {
        xs: 'calc(100vw - 1rem)',
        sm: 'min(31rem, calc(100vw - 2rem))',
      },
      maxWidth: '31rem',
      p: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '0.8rem',
      border: '1px solid',
      borderColor: (theme) => (theme.palette.mode === 'dark' ? '#243041' : '#D9E1E8'),
      background: (theme) => (theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg, #0B121E 0%, #0B121E 100%)'
        : 'linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 100%)'),
      boxShadow: (theme) => (theme.palette.mode === 'dark'
        ? '0 24px 64px rgba(0,0,0,0.44)'
        : '0 24px 64px rgba(15,23,42,0.18)'),
    },
    divider: {
      borderColor: (theme) => (theme.palette.mode === 'dark' ? '#243041' : '#E5EAF0'),
    },
    header: {
      container: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '1rem',
        px: {
          xs: '1rem',
          sm: '1.1rem',
        },
        py: '0.95rem',
      },
      textWrap: {
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem',
      },
      title: {
        fontSize: {
          xs: '1.02rem',
          sm: '1.14rem',
        },
        fontWeight: 800,
        lineHeight: 1.2,
      },
      subtitle: {
        fontSize: '0.83rem',
        lineHeight: 1.45,
        color: (theme) => (theme.palette.mode === 'dark' ? '#94A3B8' : '#64748B'),
      },
      counter: {
        mt: '0.12rem',
        alignSelf: 'flex-start',
        px: '0.65rem',
        py: '0.28rem',
        borderRadius: '999rem',
        border: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'dark'
          ? 'rgba(94,139,255,0.32)'
          : 'rgba(94,139,255,0.22)'),
        backgroundColor: (theme) => (theme.palette.mode === 'dark'
          ? 'rgba(94,139,255,0.14)'
          : 'rgba(94,139,255,0.08)'),
        color: '#3B82F6',
        fontSize: '0.74rem',
        fontWeight: 800,
        lineHeight: 1.1,
      },
      closeButton: {
        width: '2.3rem',
        height: '2.3rem',
        flexShrink: 0,
        border: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? '#243041' : '#DBE1E8'),
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#131F31' : '#F3F5F7'),
        '&:hover': {
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#182334' : '#E9EDF2'),
        },
      },
      closeIcon: {
        fontSize: '1.15rem',
        color: (theme) => (theme.palette.mode === 'dark' ? '#F5F7FA' : '#18212C'),
      },
    },
    content: {
      container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        p: {
          xs: '1rem',
          sm: '1.1rem',
        },
      },
      helperText: {
        fontSize: '0.84rem',
        lineHeight: 1.5,
        color: (theme) => (theme.palette.mode === 'dark' ? '#94A3B8' : '#64748B'),
      },
    },
    grid: {
      overview: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.28rem',
      },
      eyebrow: {
        fontSize: '0.73rem',
        fontWeight: 800,
        lineHeight: 1.1,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: (theme) => (theme.palette.mode === 'dark' ? '#8FA1B5' : '#5C7893'),
      },
      caption: {
        fontSize: '0.86rem',
        lineHeight: 1.45,
        color: (theme) => (theme.palette.mode === 'dark' ? '#C5CDD8' : '#4F5F71'),
      },
      frame: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        mt: '0.85rem',
        px: {
          xs: '0.3rem',
          sm: '0.45rem',
        },
      },
      track: {
        width: '100%',
        maxWidth: '21rem',
        display: 'grid',
        gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
        gridAutoFlow: 'column',
        gridAutoColumns: '6.4rem',
        gap: '0.85rem',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollSnapType: 'x mandatory',
        scrollPaddingInline: '0.15rem',
        pl: '0.15rem',
        pr: '0.95rem',
        pt: '0.82rem',
        pb: '0.12rem',
        '&::-webkit-scrollbar': {
          height: '0.36rem',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '999rem',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#474D56' : '#CAD3DD'),
        },
      },
      navButton: (direction) => ({
        position: 'absolute',
        top: '50%',
        [direction]: 0,
        transform: 'translateY(-50%)',
        zIndex: 5,
        width: '2rem',
        height: '2rem',
        border: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? '#243041' : '#D4DCE4'),
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#20242A' : '#FFFFFF'),
        boxShadow: '0 10px 24px rgba(15,23,42,0.18)',
        '&:hover': {
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#243041' : '#F7F9FB'),
        },
        '&.Mui-disabled': {
          opacity: 0,
          pointerEvents: 'none',
        },
      }),
    },
    gridItem: {
      container: (isRemoving = false) => ({
        position: 'relative',
        width: '6.4rem',
        minWidth: '6.4rem',
        opacity: isRemoving ? 0.72 : 1,
        transition: 'opacity 0.2s ease',
        scrollSnapAlign: 'start',
      }),
      storyCardWrap: {
        width: '6.4rem',
      },
      placeholder: {
        width: '6.4rem',
        aspectRatio: '9 / 16',
        borderRadius: '0.95rem',
      },
      removeButton: {
        position: 'absolute',
        top: '-0.7rem',
        right: '-0.7rem',
        zIndex: 6,
        width: '1.85rem',
        height: '1.85rem',
        border: '1px solid rgba(255,255,255,0.44)',
        backgroundColor: 'rgba(12,17,22,0.78)',
        color: '#F8FAFC',
        backdropFilter: 'blur(6px)',
        '&:hover': {
          backgroundColor: 'rgba(25,31,39,0.92)',
        },
      },
      removeIcon: {
        fontSize: '1rem',
      },
      removeProgress: {
        color: '#F8FAFC',
      },
    },
    emptyState: {
      container: {
        minHeight: '13rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.85rem',
        px: '1.25rem',
        py: '1.6rem',
        textAlign: 'center',
        borderRadius: '1rem',
        border: '1px dashed',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? '#3A414A' : '#D6DEE8'),
        background: (theme) => (theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, rgba(26,30,35,0.92) 0%, rgba(18,20,24,0.92) 100%)'
          : 'linear-gradient(180deg, rgba(250,251,253,0.98) 0%, rgba(244,247,251,0.98) 100%)'),
      },
      iconWrap: {
        width: '3.15rem',
        height: '3.15rem',
        borderRadius: '0.95rem',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: (theme) => (theme.palette.mode === 'dark'
          ? 'rgba(94,139,255,0.14)'
          : 'rgba(94,139,255,0.1)'),
        color: '#3B82F6',
      },
      title: {
        fontSize: '1rem',
        fontWeight: 800,
        lineHeight: 1.25,
      },
      text: {
        maxWidth: '19rem',
        fontSize: '0.88rem',
        lineHeight: 1.55,
        color: (theme) => (theme.palette.mode === 'dark' ? '#B3BCC8' : '#64748B'),
      },
      loader: {
        color: '#3B82F6',
      },
    },
  },
}
