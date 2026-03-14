import { alpha } from "@mui/material/styles";

const DARK_BG = "#0A0B0B";
const LIGHT_BG = "#F4F4F4";

export const style = {
  shell: (theme) => ({
    minHeight: "100vh",
    display: "flex",
    backgroundColor: theme.palette.mode === "dark" ? DARK_BG : LIGHT_BG,
    color: theme.palette.mode === "dark" ? "#FFFFFF" : "#111111",
    position: "relative",
    overflow: "hidden",
  }),


  sidebar: (expand) => (theme) => ({
    width: expand ? "15.5rem" : "6rem",
    height: "calc(100vh - 2rem)",
    left: "1rem",
    top: "1rem",
    bottom: "1rem",
    p: "0.9rem",
    borderRadius: "1rem",
    border: `1px solid ${alpha(
      theme.palette.mode === "dark" ? "#FFFFFF" : "#111111",
      theme.palette.mode === "dark" ? 0.08 : 0.1
    )}`,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.14)"
        : "rgba(255,255,255,0.88)",
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
    justifyContent: expand ? "flex-start" : "center",
    p: expand ? "0.55rem 0.35rem" : "0.45rem 0.2rem",
  }),

  brandLogoWrap: (theme) => ({
    width: "3rem",
    height: "3rem",
    borderRadius: "1rem",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.9)"
        : "rgba(17,17,17,0.92)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 10px 25px rgba(0,0,0,0.18)"
        : "0 10px 25px rgba(0,0,0,0.12)",
  }),

  logo: {
    marginTop: 0,
    width: "2rem",
    height: "2rem",
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
        ? "rgba(255,255,255,0.65)"
        : "rgba(17,17,17,0.55)",
  }),

  navSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.45rem",
  },

  navButton: (active, expand, emphasize = false) => (theme) => ({
    width: "100%",
    minHeight: "3.5rem",
    border: 0,
    cursor: "pointer",
    appearance: "none",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: expand ? "flex-start" : "center",
    gap: expand ? "0.85rem" : 0,
    padding: expand ? "0.6rem 0.75rem 0.6rem 0.95rem" : "0.6rem",
    borderRadius: "1.15rem",
    background: "transparent",
    color:
      theme.palette.mode === "dark"
        ? active || emphasize
          ? "#FFFFFF"
          : "rgba(255,255,255,0.72)"
        : active || emphasize
          ? "#111111"
          : "rgba(17,17,17,0.7)",
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
      backgroundColor: "currentColor",
      opacity: active ? 0.9 : 0,
      transition: "width 0.18s ease, height 0.18s ease, opacity 0.18s ease",
    },
    "&:hover": {
      transform: "translateY(-1px)",
      opacity: 1,
    },
    "&:focus-visible": {
      outline: `2px solid ${alpha(
        theme.palette.mode === "dark" ? "#FFFFFF" : "#111111",
        0.55
      )}`,
      outlineOffset: "2px",
    },
  }),

  navIconWrap: (_active, emphasize = false) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    lineHeight: 0,
    "& svg": {
      width: emphasize ? "1.6rem" : "1.38rem",
      height: emphasize ? "1.6rem" : "1.38rem",
      fill: "currentColor",
    },
  }),

  navLabel: {
    fontSize: "0.92rem",
    fontWeight: 700,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  },

  sidebarFooter: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },

  utilityRow: (expand, active = false) => (theme) => ({
    minHeight: "3.4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: expand ? "flex-start" : "center",
    gap: expand ? "0.75rem" : 0,
    padding: expand ? "0.35rem 0.2rem" : "0.2rem 0",
    borderRadius: "1.1rem",
    backgroundColor: "transparent",
    color:
      theme.palette.mode === "dark"
        ? active
          ? "#FFFFFF"
          : "rgba(255,255,255,0.8)"
        : active
          ? "#111111"
          : "rgba(17,17,17,0.8)",
  }),

  utilityLabel: (theme) => ({
    fontSize: "0.86rem",
    fontWeight: 700,
    color:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.78)"
        : "rgba(17,17,17,0.72)",
  }),

  utilityIconButton: (theme) => ({
    width: "2.85rem",
    height: "2.85rem",
    minWidth: "2.85rem",
    borderRadius: "999rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.mode === "dark" ? "#FFFFFF" : "#111111",
    backgroundColor: "transparent !important",
    border: "none",
    boxShadow: "none !important",
    padding: 0,
    opacity: 0.82,
    "&:hover": {
      backgroundColor: "transparent !important",
      opacity: 1,
    },
  }),

  notificationButton: (theme) => ({
    width: "2.85rem",
    height: "2.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.mode === "dark" ? "#FFFFFF" : "#111111",
    backgroundColor: "transparent",
    transition: "opacity 0.18s ease, transform 0.18s ease",
    opacity: 0.82,
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
    "& .MuiBadge-badge": {
      right: 4,
      top: 7,
    },
  },

  main: (theme) => ({
    flex: 1,
    minWidth: 0,
    minHeight: "100vh",
    overflowY: "auto",
    position: "relative",
    backgroundColor: theme.palette.mode === "dark" ? DARK_BG : LIGHT_BG,
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background:
        theme.palette.mode === "dark"
          ? "radial-gradient(circle at top left, rgba(255,255,255,0.09), transparent 26%)"
          : "radial-gradient(circle at top left, rgba(17,17,17,0.07), transparent 24%), radial-gradient(circle at bottom right, rgba(17,17,17,0.05), transparent 24%)",
      pointerEvents: "none",
    },
  }),

  contentWrap: (isMobile) => ({
    position: "relative",
    zIndex: 1,
    minHeight: "100vh",
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
    border: `1px solid ${alpha(
      theme.palette.mode === "dark" ? "#FFFFFF" : "#111111",
      0.08
    )}`,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(15,16,16,0.88)"
        : "rgba(255,255,255,0.92)",
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
    color:
      theme.palette.mode === "dark"
        ? active || emphasize
          ? "#FFFFFF"
          : "rgba(255,255,255,0.74)"
        : active || emphasize
          ? "#111111"
          : "rgba(17,17,17,0.72)",
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
