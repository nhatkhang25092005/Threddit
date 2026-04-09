import { alpha } from "@mui/material/styles";

const DARK_BG = "#071120";
const LIGHT_BG = "#0B121E";

export const style = {
  shell: (theme) => ({
    height: "100dvh",
    minHeight: "100dvh",
    display: "flex",
    backgroundColor: theme.palette.mode === "dark" ? DARK_BG : LIGHT_BG,
    color: theme.palette.app.text,
    position: "relative",
    overflow: "hidden",
  }),


  sidebar: (expand) => (theme) => ({
    width: expand ? "15.5rem" : "6rem",
    height: "calc(100dvh - 2rem)",
    left: "1rem",
    top: "1rem",
    bottom: "1rem",
    p: "0.9rem",
    borderRadius: "1rem",
    border: `1px solid ${theme.palette.app.border}`,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.app.header
        : theme.palette.app.header,
    backdropFilter: "blur(18px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 24px 60px rgba(0,0,0,0.26)"
        : "0 24px 60px rgba(0,0,0,0.14)",
    overflow: "hidden",
    transition:
      "width 0.22s ease, background-color 0.22s ease, box-shadow 0.22s ease",
  }),

  sidebarInner: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  brandBlock: (expand) => ({
    display: "flex",
    alignItems: "center",
    gap: expand ? "0.85rem" : 0,
    justifyContent: "center",
    p: expand ? "0.55rem 0.35rem" : "0.45rem 0.2rem",
  }),

  logo: {
    marginTop: 0,
    display: "block",
  },

  brandTitle: {
    fontSize: "0.98rem",
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "0.01em",
  },

  brandSubtitle: (theme) => ({
    mt: "0.18rem",
    fontSize: "0.72rem",
    fontWeight: 600,
    color:
      theme.palette.mode === "dark"
        ? theme.palette.app.muted
        : theme.palette.app.muted,
  }),

  navSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.45rem",
  },

  navButton: (active, expand, emphasize = false) => (theme) => ({
    width: expand ? "100%" : "3.5rem",
    minHeight: "3.5rem",
    border: 0,
    cursor: "pointer",
    appearance: "none",
    position: "relative",
    alignSelf: expand ? "stretch" : "center",
    display: "flex",
    alignItems: "center",
    justifyContent: expand ? "flex-start" : "center",
    gap: expand ? "0.85rem" : 0,
    padding: expand ? "0.6rem 0.75rem 0.6rem 0.95rem" : "0.6rem",
    borderRadius: "1.15rem",
    background: "transparent",
    color: theme.palette.app.text,
    opacity: active || emphasize ? 1 : 0.8,
    transition:
      "transform 0.18s ease, color 0.18s ease, opacity 0.18s ease",
    "&::before": {
      content: '""',
      position: "absolute",
      left: expand ? "0.12rem" : "0.35rem",
      top: "50%",
      width: active ? "0.18rem" : "0rem",
      height: active ? "1.3rem" : "0.35rem",
      borderRadius: "999rem",
      transform: "translateY(-50%)",
      backgroundColor: theme.palette.app.primary,
      opacity: active ? 0.9 : 0,
      transition: "width 0.18s ease, height 0.18s ease, opacity 0.18s ease",
    },
    "&:hover": {
      transform: "translateY(-1px)",
      opacity: 1,
    },
    "&:focus-visible": {
      outline: `2px solid ${alpha(theme.palette.app.primary, 0.55)}`,
      outlineOffset: "2px",
    },
  }),

  navIconWrap: (active, emphasize = false) => (theme) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    lineHeight: 0,
    color: active || emphasize ? theme.palette.app.primary : theme.palette.app.muted,
    "& svg": {
      width: emphasize ? "1.6rem" : "1.38rem",
      height: emphasize ? "1.6rem" : "1.38rem",
      fill: "currentColor",
    },
  }),

  navLabel: (active, emphasize = false) => (theme) => ({
    fontSize: "0.92rem",
    fontWeight: 700,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    color: active || emphasize ? theme.palette.app.primary : theme.palette.app.muted,
  }),

  sidebarFooter: (expand) => ({
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    alignItems: expand ? "stretch" : "center",
  }),

  utilityLabel: (active = false) => (theme) => ({
    fontSize: "0.86rem",
    fontWeight: 700,
    color: active ? theme.palette.app.primary : theme.palette.app.muted,
  }),

  utilityIconButton: (active = false) => (theme) => ({
    width: "2.85rem",
    height: "2.85rem",
    minWidth: "2.85rem",
    borderRadius: "999rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: active ? theme.palette.app.primary : theme.palette.app.muted,
    backgroundColor: "transparent !important",
    border: "none",
    boxShadow: "none !important",
    padding: 0,
    opacity: active ? 1 : 0.82,
    "&:hover": {
      backgroundColor: "transparent !important",
      opacity: 1,
    },
  }),

  utilityActionButton: (active = false) => (theme) => ({
    width: "100%",
    minHeight: "3.4rem",
    border: 0,
    cursor: "pointer",
    appearance: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "0.75rem",
    padding: "0.35rem 0.2rem",
    borderRadius: "1.1rem",
    backgroundColor: "transparent",
    color: active ? theme.palette.app.primary : theme.palette.app.muted,
    font: "inherit",
    textAlign: "left",
    opacity: active ? 1 : 0.82,
    transition: "transform 0.18s ease, opacity 0.18s ease",
    "&:hover": {
      transform: "translateY(-1px)",
      opacity: 1,
    },
    "&:focus-visible": {
      outline: `2px solid ${alpha(theme.palette.app.primary, 0.55)}`,
      outlineOffset: "2px",
    },
  }),

  utilityActionIconWrap: {
    width: "2.85rem",
    minWidth: "2.85rem",
    height: "2.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    lineHeight: 0,
    "& svg": {
      width: "1.35rem",
      height: "1.35rem",
      color: "currentColor",
      fill: "currentColor",
      stroke: "currentColor",
    },
  },

  notificationButton: (active = false) => (theme) => ({
    width: "2.85rem",
    height: "2.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: active ? theme.palette.app.primary : theme.palette.app.muted,
    backgroundColor: "transparent",
    transition: "opacity 0.18s ease, transform 0.18s ease",
    opacity: active ? 1 : 0.82,
    "& svg": {
      fontSize: "1.35rem",
    },
    "&:hover": {
      transform: "translateY(-1px)",
      backgroundColor: "transparent",
      opacity: 1,
    },
  }),

  notificationBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.85rem",
    minWidth: "2.85rem",
    height: "2.85rem",
    flexShrink: 0,
    "& .MuiBadge-badge": {
      right: 5,
      top: 8,
    },
  },

  main: (theme) => ({
    flex: 1,
    minWidth: 0,
    height: "100dvh",
    minHeight: 0,
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
    backgroundColor: theme.palette.mode === "dark" ? DARK_BG : LIGHT_BG,
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background:
        theme.palette.mode === "dark"
          ? `radial-gradient(circle at top left, ${alpha(theme.palette.app.primary, 0.18)}, transparent 26%)`
          : `radial-gradient(circle at top left, ${alpha(theme.palette.app.primary, 0.18)}, transparent 24%)`,
      pointerEvents: "none",
    },
  }),

  contentWrap: (isMobile) => ({
    position: "relative",
    zIndex: 1,
    minHeight: "100%",
    width: "min(100%, 96rem)",
    mx: "auto",
    px: { xs: "1rem", sm: "1.35rem", md: "1.75rem", lg: "2.25rem" },
    pt: { xs: "1rem", md: "1.4rem", lg: "1.75rem" },
    pb: isMobile ? "6.5rem" : "2.5rem",
  }),

  mobileUtilityBar: {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    zIndex: 40,
    display: "flex",
    alignItems: "center",
    gap: "0.55rem",
  },

  mobileDock: (theme) => ({
    position: "fixed",
    left: "50%",
    bottom: "1rem",
    transform: "translateX(-50%)",
    zIndex: 40,
    display: "block",
    height: "fit-content",
    width: "calc(100% - 1.5rem)",
    maxWidth: "28rem",
    p: "0.45rem",
    borderRadius: "1.5rem",
    border: `1px solid ${theme.palette.app.border}`,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.app.header
        : theme.palette.app.header,
    backdropFilter: "blur(18px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 18px 36px rgba(0,0,0,0.28)"
        : "0 18px 36px rgba(0,0,0,0.14)",
  }),

  mobileDockInner: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: "0.3rem",
    alignItems: "center",
  },

  mobileNavButton: (active, emphasize = false) => (theme) => ({
    width: "100%",
    minHeight: emphasize ? "3.55rem" : "3.2rem",
    border: 0,
    cursor: "pointer",
    appearance: "none",
    position: "relative",
    display: "grid",
    placeItems: "center",
    padding: 0,
    borderRadius: "1rem",
    background: "transparent",
    color: active || emphasize ? theme.palette.app.primary : theme.palette.app.muted,
    opacity: active || emphasize ? 1 : 0.82,
    transition: "transform 0.18s ease, opacity 0.18s ease",
    "&::after": {
      content: '""',
      position: "absolute",
      left: "50%",
      bottom: "0.35rem",
      width: active ? "1rem" : 0,
      height: "0.18rem",
      borderRadius: "999rem",
      transform: "translateX(-50%)",
      backgroundColor: "currentColor",
      opacity: active ? 0.9 : 0,
      transition: "width 0.18s ease, opacity 0.18s ease",
    },
    "&:hover": {
      transform: "translateY(-1px)",
      opacity: 1,
    },
    "& svg": {
      width: emphasize ? "1.5rem" : "1.28rem",
      height: emphasize ? "1.5rem" : "1.28rem",
      fill: "currentColor",
    },
  }),
};
