export const style = {
  mentionList: {
    overlay: {
      position: "fixed",
      inset: 0,
      zIndex: 1700,
      top:'-13rem',
      display: "grid",
      placeItems: "center",
      backgroundColor: "transparent",
      px: "0.5rem",
      py: "0rem",
    },
    panel: {
      width: {
        xs: "calc(100vw - 1rem)",
        sm: "31.25rem",
      },
      maxWidth: "31.25rem",
      height:'28rem',
      maxHeight: {
        xs: "calc(100dvh - 1rem)",
        sm: "min(34rem, calc(100dvh - 2rem))",
      },
      padding: 0,
      borderRadius: "0.9rem",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    header: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "3.25rem",
      px: "1rem",
    },
    title: {
      fontWeight: 700,
      fontSize: "1rem",
      lineHeight: 1.2,
    },
    closeButton: {
      position: "absolute",
      right: "0.8rem",
      top: "50%",
      transform: "translateY(-50%)",
      width: "2rem",
      height: "2rem",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#3A3B3C" : "#E4E6EB",
      "&:hover": {
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#4E4F50" : "#D8DADF",
      },
    },
    divider: {
      height: "1px",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#3E4042" : "#DADDE1",
      flexShrink: 0,
    },
    body: {
      p: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      flex: "1 1 auto",
      minHeight: 0,
    },
    search: {
      "& .MuiInputBase-root": {
        borderRadius: "999rem",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#3A3B3C" : "#F0F2F5",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
    searchIcon: {
      color: (theme) => (theme.palette.mode === "dark" ? "#B0B3B8" : "#65676B"),
      fontSize: "1.15rem",
    },
    list: {
      flex: "1 1 auto",
      minHeight: "14rem",
      maxHeight: "20rem",
      overflowY: "auto",
      pr: "0.1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
      "&::-webkit-scrollbar": {
        width: "0.35rem",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "999rem",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#4E4F50" : "#CED0D4",
      },
    },
    empty: {
      fontSize: "0.85rem",
      lineHeight: 1.35,
      textAlign: "center",
      py: "1rem",
      color: (theme) => (theme.palette.mode === "dark" ? "#B0B3B8" : "#65676B"),
    },
    row: {
      display: "flex",
      alignItems: "center",
      gap: "0.65rem",
      px: "0.5rem",
      py: "0.45rem",
      borderRadius: "0.6rem",
      cursor: "pointer",
      outline: "none",
      "&:hover": {
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#2F3031" : "#F2F3F5",
      },
      "&:focus-visible": {
        boxShadow: "0 0 0 2px rgba(24,119,242,0.35)",
      },
    },
    avatar: {
      width: "2.25rem",
      height: "2.25rem",
      flexShrink: 0,
    },
    meta: {
      minWidth: 0,
      flex: "1 1 auto",
      display: "flex",
      flexDirection: "column",
      gap: "0.08rem",
    },
    name: {
      fontSize: "0.9rem",
      lineHeight: 1.2,
      fontWeight: 600,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    username: {
      fontSize: "0.78rem",
      lineHeight: 1.2,
      color: (theme) => (theme.palette.mode === "dark" ? "#B0B3B8" : "#65676B"),
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    helper: {
      fontSize: "0.78rem",
      lineHeight: 1.2,
      color: (theme) => (theme.palette.mode === "dark" ? "#B0B3B8" : "#65676B"),
      px: "0.15rem",
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end",
      pt: "0.15rem",
    },
    doneButton: {
      minHeight: "2.2rem",
      minWidth: "6rem",
      borderRadius: "0.5rem",
      fontWeight: 700,
      textTransform: "none",
      boxShadow: "none",
    },
    chosenFriends:{
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
    }
  },
};
