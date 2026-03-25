export const style = {
  emoji: {
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      "&.Mui-disabled": {
        opacity: 0.4,
        color: "action.disabled",
        cursor: "not-allowed",
      },
    },
    icon: {
      color: '#00F2FF',
      fontSize: '1.2rem'
    },
    popover: {
      zIndex: 2000
    },
    emojiPopoverPaper: {
      borderRadius: '0.8rem',
      zIndex: 1400,
      maxHeight: '20rem',
      border: '1px solid',
      borderColor: (theme) => theme.palette.mode === 'dark' ? '#243041' : '#DADDE1',
      boxShadow: (theme) => theme.palette.mode === 'dark'
        ? '0 10px 28px rgba(0,0,0,0.45)'
        : '0 10px 28px rgba(0,0,0,0.14)',
      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#131F31' : '#ffffff',
      overflow: 'hidden'
    },
    emojiPicker: {
      width: '18rem',
      maxWidth: 'calc(100vw - 2rem)',
      padding: '0.65rem',
      backgroundColor: 'transparent',
      boxShadow: 'none'
    },
    emojiPickerTitle: {
      fontSize: '0.8rem',
      fontWeight: 700,
      lineHeight: 1.2,
      mb: '0.45rem',
      color: (theme) => theme.palette.mode === 'dark' ? '#E4E6EB' : '#1C1E21'
    },
    emojiTypeFlex: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxHeight: '15rem',
      overflowY: 'auto',
      paddingRight: '0.25rem',
      marginRight: '-0.15rem',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(128,128,128,0.55) transparent',
      '&::-webkit-scrollbar': {
        width: '0.35rem'
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '999rem',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#64748B' : '#BCC0C4'
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent'
      }
    },
    emojiTypeItem: {
      display: 'flex',
      flexDirection: 'column'
    },
    emojiGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
      gap: '0.2rem'
    },
    emojiButton: {
      width: '2rem',
      height: '2rem',
      borderRadius: '0.45rem',
      backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'transparent' : '#F7F8FA',
      border: '1px solid',
      borderColor: (theme) => theme.palette.mode === 'dark' ? 'transparent' : '#E6E9EE',
      opacity: 1,
      '&:hover': {
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#182334' : '#F2F3F5'
      }
    },
    emojiChar: {
      fontSize: '1.15rem',
      lineHeight: 1,
      opacity: 1,
      filter: (theme) => theme.palette.mode === 'dark' ? 'none' : 'saturate(1.08) contrast(1.08)'
    }
  },
  reaction:{
    likeActionWrap: {
      position: "relative",
      width: "100%",
      display: "flex",
    },
    actionBtn: {
      minHeight: "2.3rem",
      borderRadius: "0.45rem",
      color: (theme) => (theme.palette.mode === "dark" ? "#94A3B8" : "#64748B"),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.35rem",
      fontSize: "0.88rem",
      fontWeight: 600,
      "&:hover": {
        backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#182334" : "#F2F3F5"),
      },
    },
    selectedReactionEmoji: {
      fontSize: "1.12rem",
      lineHeight: 1,
    },
    actionIcon: {
      color:'white',
      fontSize: "1.5rem",
    },
    reactionPopover: {
      position: "absolute",
      left: "50%",
      bottom: "calc(100% + 0.28rem)",
      transform: "translateX(-50%)",
      zIndex: 2,
    },
  },
  reactionBar:{
    tray: {
    display: "flex",
    alignItems: "center",
    gap: "0.12rem",
    px: "0.35rem",
    py: "0.25rem",
    borderRadius: "999rem",
    border: "1px solid",
    borderColor: (theme) => (theme.palette.mode === "dark" ? "#243041" : "#CED0D4"),
    bgcolor: (theme) => (theme.palette.mode === "dark" ? "#131F31" : "#ffffff"),
    boxShadow: (theme) =>
      theme.palette.mode === "dark"
        ? "0 8px 20px rgba(0,0,0,0.45)"
        : "0 8px 20px rgba(0,0,0,0.18)",
  },
  item: {
    width: "2.1rem",
    height: "2.1rem",
    transition: "transform 120ms ease",
    "&:hover": {
      transform: "translateY(-0.45rem) scale(1.22)",
      bgcolor: "transparent",
    },
  },
  emoji: {
    fontSize: "1.45rem",
    lineHeight: 1,
    userSelect: "none",
  },
  }
}
