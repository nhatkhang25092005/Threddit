import { alpha } from "@mui/material/styles";

export const style = {
  searchSlot: (theme) => ({
    width: "100%",
    minHeight: "3.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.32rem 0.36rem 0.32rem 0.52rem",
    borderRadius: "1.15rem",
    color: theme.palette.app.text,
    backgroundColor: theme.palette.app.header,
    border: `1px solid ${theme.palette.app.border}`,
  }),

  searchLeadingIcon: {
    width: "1.85rem",
    minWidth: "1.85rem",
    height: "1.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    lineHeight: 0,
    "& svg": {
      width: "1.02rem",
      height: "1.02rem",
      fill: "currentColor",
      color: "currentColor",
    },
  },

  searchInput: ({ mobile = false } = {}) => (theme) => ({
    flex: 1,
    "& .MuiOutlinedInput-root": {
      minHeight: mobile ? "2.8rem" : "2.55rem",
      paddingRight: 0,
      borderRadius: mobile ? "0.95rem" : "0.9rem",
      backgroundColor: mobile
        ? theme.palette.app.screenAlt
        : "transparent",
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: mobile ? "0.34rem 0.1rem" : "0.3rem 0",
      fontSize: mobile ? "0.84rem" : "0.82rem",
      fontWeight: 600,
      color: theme.palette.app.text,
      "&::placeholder": {
        color: theme.palette.app.muted,
        opacity: 1,
      },
    },
  }),

  searchCloseButton: (theme) => ({
    width: "1.95rem",
    height: "1.95rem",
    minWidth: "1.95rem",
    padding: "0.2rem",
    color: theme.palette.app.text,
    opacity: 0.72,
    transition: "opacity 0.18s ease, background-color 0.18s ease",
    "&:hover": {
      opacity: 1,
      backgroundColor: theme.palette.app.primarySoft,
    },
  }),

  mobileSearchBar: (theme) => ({
    position: "fixed",
    left: "50%",
    bottom: "5.7rem",
    transform: "translateX(-50%)",
    zIndex: 45,
    width: "calc(100% - 1.5rem)",
    maxWidth: "28rem",
    p: "0.42rem 0.48rem",
    borderRadius: "1.35rem",
    border: `1px solid ${theme.palette.app.border}`,
    backgroundColor: theme.palette.app.header,
    backdropFilter: "blur(18px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 18px 36px rgba(0,0,0,0.28)"
        : "0 18px 36px rgba(0,0,0,0.14)",
  }),

  mobileSearchInner: {
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
  },

  searchPreviewSlot: ({ mobile = false, active = false, theme }) => {
    const accent = theme.palette.app.primary

    return {
      ...(mobile ? {
        position: "fixed",
        left: "50%",
        bottom: "5.7rem",
        transform: "translateX(-50%)",
        zIndex: 44,
        width: "calc(100% - 1.5rem)",
        maxWidth: "28rem",
        minHeight: "3.85rem",
      } : {
        width: "100%",
        minHeight: "3.5rem",
      }),
      border: `1px solid ${alpha(accent, active ? 0.22 : 0.14)}`,
      borderRadius: mobile ? "1rem" : "0.9rem",
      color: theme.palette.app.text,
      background:
        theme.palette.mode === "dark"
          ? `linear-gradient(135deg, ${alpha(theme.palette.app.primary, active ? 0.14 : 0.08)}, ${theme.palette.app.screenAlt})`
          : `linear-gradient(135deg, ${alpha(theme.palette.app.primary, active ? 0.14 : 0.08)}, ${theme.palette.app.screenAlt})`,
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 10px 20px rgba(0,0,0,0.14)"
          : "0 10px 20px rgba(0,0,0,0.04)",
      display: "flex",
      alignItems: "center",
      gap: "0.65rem",
      padding: mobile ? "0.56rem 0.7rem" : "0.5rem 0.7rem",
      cursor: "pointer",
      appearance: "none",
      font: "inherit",
      textAlign: "left",
      backdropFilter: mobile ? "blur(18px)" : "none",
      transition: "transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease",
      "&:hover": {
        transform: "translateY(-1px)",
        borderColor: alpha(accent, active ? 0.28 : 0.2),
      },
      "&:focus-visible": {
        outline: `2px solid ${alpha(accent, 0.3)}`,
        outlineOffset: "2px",
      },
    }
  },

  searchPreviewIcon: (theme) => {
    const accent = theme.palette.app.cyan

    return {
      width: "2.1rem",
      minWidth: "2.1rem",
      height: "2.1rem",
      borderRadius: "0.65rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: accent,
      backgroundColor: theme.palette.app.primarySoft,
      "& svg": {
        width: "1rem",
        height: "1rem",
      },
    }
  },

  searchPreviewBody: {
    minWidth: 0,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.18rem",
  },

  searchPreviewEyebrow: (theme) => ({
    fontSize: "0.63rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: theme.palette.app.muted,
  }),

  searchPreviewValue: {
    fontSize: "0.92rem",
    fontWeight: 700,
    lineHeight: 1.2,
    color: "inherit",
  },

  searchResultsPage: {
    page: {
      width: "100%",
      maxWidth: "42rem",
      mx: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },

    hero: () => ({
      width: "100%",
      maxWidth: "42rem",
      boxSizing: "border-box",
      p: { xs: "0.9rem 1rem", md: "1rem 1rem 1.05rem" },
      borderRadius: "0.4rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.8rem",
    }),

    heroTop: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },

    heroIcon: (theme) => {
      return {
        width: "2.55rem",
        minWidth: "2.55rem",
        height: "2.55rem",
        borderRadius: "0.55rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.app.cyan,
        backgroundColor: theme.palette.app.primarySoft,
        "& svg": {
          width: "1.18rem",
          height: "1.18rem",
        },
      }
    },

    heroText: {
      minWidth: 0,
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.18rem",
    },

    heroEyebrow: (theme) => ({
      fontSize: "0.68rem",
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: theme.palette.app.muted,
    }),

    heroTitle: {
      fontSize: { xs: "1.05rem", md: "1.15rem" },
      fontWeight: 800,
      lineHeight: 1.18,
      color: "inherit",
    },

    heroDescription: (theme) => ({
      fontSize: "0.9rem",
      lineHeight: 1.55,
      color: theme.palette.app.muted,
    }),

    list: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      width: "100%",
    },

    userSection: (theme) => ({
      width: "100%",
      boxSizing: "border-box",
      p: { xs: "0.9rem", md: "0.95rem 1rem" },
      borderRadius: "0.6rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.9rem",
      background:
        `linear-gradient(135deg, ${alpha(theme.palette.app.primary, 0.05)}, ${theme.palette.app.header})`,
    }),

    sectionHeader: {
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "0.8rem",
      flexWrap: "wrap",
    },

    sectionHeading: {
      minWidth: 0,
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.38rem",
    },

    sectionTitleRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      minWidth: 0,
    },

    sectionTitleGroup: {
      minWidth: 0,
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.16rem",
    },

    sectionIcon: (theme) => ({
      width: "2.4rem",
      minWidth: "2.4rem",
      height: "2.4rem",
      borderRadius: "0.7rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.app.cyan,
      backgroundColor: alpha(theme.palette.app.primary, 0.12),
      "& svg": {
        width: "1.05rem",
        height: "1.05rem",
      },
    }),

    sectionEyebrow: (theme) => ({
      fontSize: "0.66rem",
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: theme.palette.app.muted,
    }),

    sectionTitle: {
      fontSize: { xs: "0.98rem", md: "1.04rem" },
      fontWeight: 800,
      lineHeight: 1.22,
      color: "inherit",
    },

    sectionDescription: (theme) => ({
      fontSize: "0.84rem",
      lineHeight: 1.5,
      color: theme.palette.app.muted,
    }),

    sectionAction: (theme) => ({
      minHeight: "2.2rem",
      px: "0.9rem",
      borderRadius: "999px",
      fontSize: "0.78rem",
      fontWeight: 700,
      textTransform: "none",
      color: theme.palette.app.primary,
      backgroundColor: alpha(theme.palette.app.primary, 0.1),
      "&:hover": {
        backgroundColor: alpha(theme.palette.app.primary, 0.16),
      },
    }),

    userList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.7rem",
      width: "100%",
    },

    userCard: (theme) => ({
      width: "100%",
      border: `1px solid ${alpha(theme.palette.app.border, 0.9)}`,
      borderRadius: "1rem",
      padding: "0.75rem 0.8rem",
      backgroundColor: theme.palette.app.header,
      display: "flex",
      alignItems: "center",
      gap: "0.8rem",
      cursor: "pointer",
      appearance: "none",
      textAlign: "left",
      transition: "transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease",
      "&:hover": {
        transform: "translateY(-1px)",
        borderColor: alpha(theme.palette.app.primary, 0.28),
        backgroundColor: theme.palette.app.screenAlt,
      },
      "&:focus-visible": {
        outline: `2px solid ${alpha(theme.palette.app.primary, 0.28)}`,
        outlineOffset: "2px",
      },
    }),

    userAvatar: {
      width: 52,
      height: 52,
      flexShrink: 0,
    },

    userContent: {
      minWidth: 0,
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.18rem",
    },

    userName: {
      fontSize: "0.94rem",
      fontWeight: 800,
      lineHeight: 1.25,
      color: "#fff",
    },

    userMeta: (theme) => ({
      fontSize: "0.78rem",
      lineHeight: 1.4,
      color: theme.palette.app.muted,
    }),

    expandUsersButton: (theme) => ({
      minHeight: "2.7rem",
      borderRadius: "0.95rem",
      border: `1px dashed ${alpha(theme.palette.app.primary, 0.34)}`,
      fontSize: "0.84rem",
      fontWeight: 800,
      textTransform: "none",
      color: theme.palette.app.primary,
      backgroundColor: alpha(theme.palette.app.primary, 0.05),
      "&:hover": {
        borderColor: alpha(theme.palette.app.primary, 0.46),
        backgroundColor: alpha(theme.palette.app.primary, 0.1),
      },
    }),

    userSkeletonList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.7rem",
      width: "100%",
    },

    userSkeletonRow: (theme) => ({
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "0.8rem",
      padding: "0.72rem 0.8rem",
      borderRadius: "1rem",
      border: `1px solid ${alpha(theme.palette.app.border, 0.75)}`,
      backgroundColor: theme.palette.app.header,
    }),

    userSkeletonBody: {
      minWidth: 0,
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.12rem",
    },
  },
};
