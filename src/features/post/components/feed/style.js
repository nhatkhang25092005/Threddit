import { alpha } from "@mui/material/styles";

export const style = {
  feed: {
    page: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      width: "100%",
    },

    createPostWrap: {
      width: "100%",
      maxWidth: "42rem",
    },

    storyRailWrap: {
      width: "100%",
      maxWidth: "42rem",
    },

    storyRailSurface: (theme) => ({
      width: "100%",
      boxSizing: "border-box",
      p: { xs: "0.85rem", md: "0.95rem 1rem" },
      borderRadius: "0.6rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.9rem",
      background:
        theme.palette.mode === "dark"
          ? `linear-gradient(180deg, ${alpha(theme.palette.app.header, 0.98)}, ${alpha("#08111D", 0.98)})`
          : `linear-gradient(180deg, ${alpha(theme.palette.app.header, 0.98)}, ${alpha(theme.palette.app.screenAlt, 0.96)})`,
      border: `1px solid ${alpha(theme.palette.app.border, 0.95)}`,
      overflow: "hidden",
    }),

    storyRailHeader: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "0.8rem",
      width: "100%",
    },

    storyRailHeaderText: {
      minWidth: 0,
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.18rem",
    },

    storyRailActions: {
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
      flexShrink: 0,
    },

    storyRailEyebrow: (theme) => ({
      fontSize: "0.66rem",
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: theme.palette.app.muted,
    }),

    storyRailTitle: {
      fontSize: { xs: "1rem", md: "1.08rem" },
      fontWeight: 800,
      lineHeight: 1.18,
      color: "inherit",
    },

    storyRailSubtitle: (theme) => ({
      fontSize: "0.82rem",
      lineHeight: 1.45,
      color: theme.palette.app.muted,
    }),

    storyRailList: {
      display: "flex",
      gap: "0.75rem",
      width: "100%",
      overflowX: "auto",
      overflowY: "hidden",
      pb: "0.2rem",
      scrollBehavior: "smooth",
      scrollSnapType: "x proximity",
      "&::-webkit-scrollbar": {
        height: "0.36rem",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "999rem",
        backgroundColor: "rgba(148,163,184,0.32)",
      },
    },

    storyRailNavButton: (theme) => ({
      width: "2rem",
      height: "2rem",
      borderRadius: "999rem",
      border: `1px solid ${alpha(theme.palette.app.border, 0.92)}`,
      color: theme.palette.app.text,
      backgroundColor:
        theme.palette.mode === "dark"
          ? alpha(theme.palette.app.header, 0.92)
          : alpha(theme.palette.app.header, 0.98),
      backdropFilter: "blur(12px)",
      transition:
        "transform 0.18s ease, background-color 0.18s ease, border-color 0.18s ease, opacity 0.18s ease",
      "&:hover": {
        transform: "translateY(-1px)",
        backgroundColor: alpha(theme.palette.app.primary, 0.14),
        borderColor: alpha(theme.palette.app.primary, 0.42),
      },
      "&.Mui-disabled": {
        opacity: 0.42,
        color: theme.palette.app.muted,
        borderColor: alpha(theme.palette.app.border, 0.6),
      },
    }),

    storyCreateCard: (theme) => ({
      width: "6.85rem",
      minWidth: "6.85rem",
      height: "11.75rem",
      borderRadius: "1rem",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 0,
      appearance: "none",
      textAlign: "left",
      font: "inherit",
      cursor: "pointer",
      flexShrink: 0,
      scrollSnapAlign: "start",
      border: `1px solid ${alpha(theme.palette.app.border, 0.95)}`,
      backgroundColor: theme.palette.app.header,
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 14px 32px rgba(0,0,0,0.3)"
          : "0 14px 32px rgba(15,23,42,0.08)",
      transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
      "&:hover": {
        transform: "translateY(-2px)",
        borderColor: alpha(theme.palette.app.primary, 0.34),
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 18px 34px rgba(0,0,0,0.34)"
            : "0 18px 34px rgba(15,23,42,0.12)",
      },
    }),

    storyCreateCover: (avatarUrl) => ({
      position: "relative",
      height: "67%",
      background: avatarUrl
        ? `linear-gradient(180deg, rgba(8,17,29,0.04) 0%, rgba(8,17,29,0.48) 100%), url(${avatarUrl}) center/cover no-repeat`
        : "linear-gradient(135deg, #2E8B7F 0%, #18324A 100%)",
    }),

    storyCreateFooter: (theme) => ({
      position: "relative",
      minHeight: "33%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.28rem",
      px: "0.55rem",
      pt: "0.78rem",
      pb: "0.65rem",
      textAlign: "center",
      background:
        theme.palette.mode === "dark"
          ? "linear-gradient(180deg, rgba(17,24,34,0.96) 0%, rgba(10,14,20,0.98) 100%)"
          : "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(242,247,252,0.98) 100%)",
    }),

    storyCreatePlus: (theme) => ({
      position: "absolute",
      top: 0,
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "2.2rem",
      height: "2.2rem",
      borderRadius: "999px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      background: `linear-gradient(135deg, ${theme.palette.app.primary}, ${theme.palette.app.cyan})`,
      boxShadow: "0 8px 18px rgba(0,0,0,0.22)",
      border: "3px solid rgba(255,255,255,0.92)",
      "& svg": {
        width: "1.18rem",
        height: "1.18rem",
      },
    }),

    storyCreateTitle: {
      fontSize: "0.82rem",
      fontWeight: 800,
      lineHeight: 1.18,
      color: "#fff",
    },

    storyCreateCaption: (theme) => ({
      fontSize: "0.68rem",
      lineHeight: 1.35,
      color: theme.palette.app.muted,
    }),

    storyPreviewCard: {
      position: "relative",
      width: "6.85rem",
      minWidth: "6.85rem",
      height: "11.75rem",
      borderRadius: "1rem",
      overflow: "hidden",
      padding: 0,
      appearance: "none",
      textAlign: "left",
      font: "inherit",
      border: "1px solid rgba(255,255,255,0.16)",
      cursor: "pointer",
      flexShrink: 0,
      scrollSnapAlign: "start",
      backgroundColor: "#0E1726",
      boxShadow: "0 14px 32px rgba(0,0,0,0.28)",
      transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
      "&:hover": {
        transform: "translateY(-2px)",
        borderColor: "rgba(126,231,200,0.54)",
        boxShadow: "0 18px 34px rgba(0,0,0,0.34)",
      },
    },

    storyPreviewBackdrop: (background) => ({
      position: "absolute",
      inset: 0,
      background,
    }),

    storyPreviewMedia: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },

    storyPreviewOverlay: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(180deg, rgba(5,8,12,0.16) 0%, rgba(5,8,12,0.2) 36%, rgba(5,8,12,0.78) 100%)",
    },

    storyPreviewTop: {
      position: "absolute",
      top: "0.55rem",
      left: "0.55rem",
      right: "0.55rem",
      zIndex: 2,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "0.5rem",
    },

    storyPreviewAvatar: {
      width: "2.15rem",
      height: "2.15rem",
      border: "2px solid rgba(255,255,255,0.95)",
      boxShadow: "0 6px 14px rgba(0,0,0,0.22)",
    },

    storyPreviewCount: {
      minWidth: "1.7rem",
      px: "0.38rem",
      py: "0.2rem",
      borderRadius: "999px",
      backgroundColor: "rgba(0,0,0,0.46)",
      border: "1px solid rgba(255,255,255,0.24)",
      color: "#fff",
      fontSize: "0.66rem",
      fontWeight: 800,
      lineHeight: 1,
      textAlign: "center",
      backdropFilter: "blur(4px)",
    },

    storyPreviewBottom: {
      position: "absolute",
      left: "0.6rem",
      right: "0.6rem",
      bottom: "0.6rem",
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      gap: "0.18rem",
    },

    storyPreviewName: {
      fontSize: "0.82rem",
      fontWeight: 800,
      lineHeight: 1.18,
      color: "#fff",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      textShadow: "0 2px 10px rgba(0,0,0,0.32)",
    },

    storyPreviewTime: {
      fontSize: "0.64rem",
      lineHeight: 1.3,
      color: "rgba(255,255,255,0.8)",
      textShadow: "0 2px 8px rgba(0,0,0,0.3)",
    },

    storyPreviewText: {
      fontSize: "0.66rem",
      lineHeight: 1.35,
      color: "rgba(255,255,255,0.92)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      textShadow: "0 2px 8px rgba(0,0,0,0.28)",
    },

    storyPreviewFallbackIcon: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "2.75rem",
      height: "2.75rem",
      borderRadius: "0.95rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      backgroundColor: "rgba(255,255,255,0.12)",
      border: "1px solid rgba(255,255,255,0.16)",
      boxShadow: "0 12px 24px rgba(0,0,0,0.18)",
      zIndex: 1,
      "& svg": {
        width: "1.4rem",
        height: "1.4rem",
      },
    },

    storySkeletonCard: (theme) => ({
      width: "6.85rem",
      minWidth: "6.85rem",
      height: "11.75rem",
      borderRadius: "1rem",
      overflow: "hidden",
      flexShrink: 0,
      scrollSnapAlign: "start",
      border: `1px solid ${alpha(theme.palette.app.border, 0.82)}`,
      backgroundColor: theme.palette.app.header,
    }),
  },
  friend_chat_list: {
    container: {
      display: { xs: "none", md: "block" },
      p: "0.9rem",
      width: "16.5rem",
      position: "fixed",
      top: "1rem",
      right: "1rem",
      bottom: "1rem",
      borderRadius: "1rem",
      border: (theme) => `1px solid ${theme.palette.app.border}`,
      backgroundColor: (theme) => theme.palette.app.header,
      backdropFilter: "blur(18px)",
      boxShadow: (theme) =>
        theme.palette.mode === "dark"
          ? "0 24px 60px rgba(0,0,0,0.26)"
          : "0 24px 60px rgba(0,0,0,0.14)",
      zIndex: 10,
      overflow: "hidden",
    },

    inner: {
      height: "100%",
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.85rem",
    },

    header: {
      px: "0.2rem",
    },

    headerRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.75rem",
    },

    title: {
      fontSize: "1rem",
      fontWeight: 800,
      lineHeight: 1.2,
      color: "#FFFFFF",
    },

    list: {
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.45rem",
      overflowY: "auto",
      pr: "0.2rem",
      "&::-webkit-scrollbar": {
        width: "0.36rem",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "999rem",
        backgroundColor: "rgba(148,163,184,0.32)",
      },
    },

    item: (theme) => ({
      width: "100%",
      border: `1px solid ${theme.palette.app.border}`,
      borderRadius: "0.95rem",
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.02)"
          : "rgba(255,255,255,0.04)",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      px: "0.75rem",
      py: "0.72rem",
      cursor: "pointer",
      textAlign: "left",
      color: "inherit",
      transition:
        "transform 0.18s ease, background-color 0.18s ease, border-color 0.18s ease",
      "&:hover": {
        transform: "translateY(-1px)",
        borderColor: theme.palette.app.primary,
        backgroundColor: "rgba(59,130,246,0.08)",
      },
    }),

    avatar: {
      width: "2.6rem",
      height: "2.6rem",
      flexShrink: 0,
    },

    textWrap: {
      minWidth: 0,
      flex: 1,
    },

    displayName: {
      fontSize: "0.88rem",
      fontWeight: 700,
      lineHeight: 1.25,
      color: "#FFFFFF",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },

    username: (theme) => ({
      mt: "0.12rem",
      fontSize: "0.75rem",
      lineHeight: 1.35,
      color: theme.palette.app.muted,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),

    count: (theme) => ({
      minWidth: "1.9rem",
      px: "0.48rem",
      py: "0.2rem",
      borderRadius: "999rem",
      fontSize: "0.72rem",
      fontWeight: 800,
      lineHeight: 1,
      textAlign: "center",
      color: theme.palette.app.primary,
      backgroundColor: "rgba(59,130,246,0.12)",
      border: `1px solid ${theme.palette.app.border}`,
    }),

    status: {
      flex: 1,
      minHeight: 0,
      display: "grid",
      placeItems: "center",
      textAlign: "center",
      px: "0.6rem",
    },

    statusText: (theme) => ({
      fontSize: "0.84rem",
      lineHeight: 1.5,
      color: theme.palette.app.muted,
    }),
  }
};
