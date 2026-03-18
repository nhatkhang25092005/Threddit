import { style as postStyle } from "../style";

const basePost = postStyle.post;

export const style = {
  page: {
    root: {
      position: "fixed",
      inset: 0,
      zIndex: 1500,
      width: "100vw",
      minHeight: "100dvh",
      display: "grid",
      gridTemplateColumns: {
        xs: "minmax(0, 1fr)",
        lg: "minmax(0, 1.35fr) minmax(23rem, 26rem)",
      },
      gridTemplateRows: {
        xs: "minmax(52dvh, auto) minmax(0, 1fr)",
        lg: "minmax(0, 100dvh)",
      },
      background: (theme) =>
        theme.palette.mode === "dark"
          ? "linear-gradient(145deg, #060709 0%, #101317 55%, #161A1F 100%)"
          : "linear-gradient(145deg, #EFF3F8 0%, #F7F9FC 42%, #FFFFFF 100%)",
    },
    viewer: {
      position: "relative",
      minWidth: 0,
      minHeight: {
        xs: "52dvh",
        lg: "100dvh",
      },
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 38%), #050506",
    },
    viewerMediaWrap: {
      position: "relative",
      zIndex: 1,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      px: {
        xs: "0.5rem",
        sm: "1rem",
        lg: "4.5rem",
      },
      py: {
        xs: "4.5rem",
        lg: "2rem",
      },
    },
    viewerMedia: {
      display: "block",
      width: "100%",
      height: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      borderRadius: {
        xs: 0,
        sm: "1rem",
      },
      boxShadow: "0 18px 55px rgba(0, 0, 0, 0.28)",
      backgroundColor: "#050505",
    },
    viewerTopBar: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.8rem",
      px: {
        xs: "0.75rem",
        sm: "1rem",
      },
      py: {
        xs: "0.75rem",
        sm: "1rem",
      },
      background:
        "linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.14) 68%, transparent 100%)",
    },
    viewerTopBarLeft: {
      display: "flex",
      alignItems: "center",
      gap: "0.65rem",
      minWidth: 0,
    },
    closeButton: {
      width: "2.5rem",
      height: "2.5rem",
      color: "#FFFFFF",
      backgroundColor: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(10px)",
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.2)",
      },
    },
    topBarTitle: {
      color: "#FFFFFF",
      fontSize: "0.95rem",
      fontWeight: 700,
      lineHeight: 1.2,
      textShadow: "0 2px 10px rgba(0,0,0,0.35)",
    },
    counterBadge: {
      px: "0.75rem",
      py: "0.35rem",
      borderRadius: "999rem",
      color: "#FFFFFF",
      fontSize: "0.82rem",
      fontWeight: 700,
      backgroundColor: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(10px)",
      textShadow: "0 2px 10px rgba(0,0,0,0.35)",
    },
    navButton: (direction) => ({
      position: "absolute",
      top: "50%",
      [direction]: {
        xs: "0.65rem",
        sm: "1rem",
        lg: "1.5rem",
      },
      transform: "translateY(-50%)",
      zIndex: 3,
      width: "3rem",
      height: "3rem",
      color: "#FFFFFF",
      backgroundColor: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(10px)",
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.22)",
      },
      "&.Mui-disabled": {
        color: "rgba(255,255,255,0.36)",
        backgroundColor: "rgba(255,255,255,0.07)",
      },
    }),
    navIcon: {
      fontSize: "1.7rem",
    },
    sidebar: {
      minWidth: 0,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#111418" : "#FFFFFF",
      borderLeft: {
        lg: "1px solid",
      },
      borderTop: {
        xs: "1px solid",
        lg: 0,
      },
      borderColor: (theme) =>
        theme.palette.mode === "dark" ? "#2C3138" : "#DADDE1",
      boxShadow: (theme) =>
        theme.palette.mode === "dark"
          ? "-10px 0 30px rgba(0,0,0,0.22)"
          : "-10px 0 30px rgba(25,35,52,0.08)",
    },
    sidebarScroll: {
      flex: "1 1 auto",
      minHeight: 0,
      overflowY: "auto",
      overflowX: "hidden",
      overscrollBehavior: "contain",
      "&::-webkit-scrollbar": {
        width: "0.4rem",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "999rem",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#5C626B" : "#CDD3DB",
      },
    },
    commentPlaceholder: {
      mx: "1rem",
      my: "1rem",
      px: "1rem",
      py: "1.15rem",
      borderRadius: "0.95rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "0.55rem",
      border: "1px dashed",
      borderColor: (theme) =>
        theme.palette.mode === "dark" ? "#46505D" : "#D4DAE2",
      background: (theme) =>
        theme.palette.mode === "dark"
          ? "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)"
          : "linear-gradient(145deg, #FBFCFE 0%, #F4F7FB 100%)",
    },
    commentIconWrap: {
      width: "3rem",
      height: "3rem",
      borderRadius: "999rem",
      display: "grid",
      placeItems: "center",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#252A31" : "#E8EEF6",
    },
    commentIcon: {
      fontSize: "1.4rem",
      color: (theme) =>
        theme.palette.mode === "dark" ? "#E6E8EB" : "#374355",
    },
    commentTitle: {
      fontSize: "0.95rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    commentDescription: {
      maxWidth: "24rem",
      fontSize: "0.88rem",
      lineHeight: 1.55,
      color: (theme) =>
        theme.palette.mode === "dark" ? "#AAB3BE" : "#667384",
    },
    stateRoot: {
      minHeight: "100dvh",
      display: "grid",
      placeItems: "center",
      px: "1rem",
      background: (theme) =>
        theme.palette.mode === "dark"
          ? "linear-gradient(145deg, #060709 0%, #101317 55%, #161A1F 100%)"
          : "linear-gradient(145deg, #EFF3F8 0%, #F7F9FC 42%, #FFFFFF 100%)",
    },
    stateCard: {
      width: "100%",
      maxWidth: "28rem",
      px: {
        xs: "1.1rem",
        sm: "1.4rem",
      },
      py: {
        xs: "1.3rem",
        sm: "1.55rem",
      },
      borderRadius: "1rem",
      textAlign: "center",
      border: "1px solid",
      borderColor: (theme) =>
        theme.palette.mode === "dark" ? "#31363D" : "#D9E0E9",
      background: (theme) =>
        theme.palette.mode === "dark"
          ? "linear-gradient(145deg, #13171C 0%, #1B2027 100%)"
          : "linear-gradient(145deg, #FFFFFF 0%, #F7FAFD 100%)",
      boxShadow: (theme) =>
        theme.palette.mode === "dark"
          ? "0 18px 42px rgba(0,0,0,0.28)"
          : "0 18px 42px rgba(30,45,66,0.12)",
    },
    stateSpinner: {
      color: "#1877F2",
      mb: "0.9rem",
    },
    stateTitle: {
      fontSize: "1.05rem",
      fontWeight: 800,
      lineHeight: 1.2,
    },
    stateDescription: {
      mt: "0.55rem",
      fontSize: "0.9rem",
      lineHeight: 1.6,
      color: (theme) =>
        theme.palette.mode === "dark" ? "#ABB4BF" : "#677587",
    },
    stateButton: {
      mt: "1rem",
      minHeight: "2.4rem",
      px: "1.2rem",
      borderRadius: "999rem",
      fontWeight: 700,
      textTransform: "none",
    },
  },
  content: {
    ...basePost,
    card: {
      ...basePost.card,
      maxWidth: "100%",
      mb: 0,
      pb: "0.2rem",
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    section: {
      px: "1rem",
    },
    header: {
      ...basePost.header,
      py: "0.9rem",
    },
    text: {
      ...basePost.text,
      pb: "0.9rem",
      fontSize: "0.98rem",
      lineHeight: 1.55,
    },
    stats: {
      ...basePost.stats,
      py: "0.7rem",
      borderTop: "1px solid",
      borderBottom: "1px solid",
      borderColor: (theme) =>
        theme.palette.mode === "dark" ? "#2C3138" : "#DADDE1",
    },
    actionsRow: {
      ...basePost.actionsRow,
      py: "0.25rem",
    },
  },
};
