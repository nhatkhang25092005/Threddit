export const style = {
  page: {
    width: "100%",
    display: "flex",
    justifyContent: { xs: "stretch", md: "flex-end" },
  },

  surface: (theme) => ({
    width: "75%",
    height:"95vh",
    display: "flex",
    flexDirection: "row",
    placeItems: "center",
    border: `1px solid ${theme.palette.app.border}`,
    backgroundColor: theme.palette.app.header,
    borderRadius: "1rem",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 16px 40px rgba(0,0,0,0.24)"
        : "0 16px 40px rgba(0,0,0,0.14)",
    position:'fixed',
    right:'2rem',
    top:'1rem',
    bottom:'1rem'
  }),

  iconWrap: (theme) => ({
    width: 72,
    height: 72,
    borderRadius: "1.25rem",
    display: "grid",
    placeItems: "center",
    color: theme.palette.app.primary,
    backgroundColor: theme.palette.app.header,
    border: `1px solid ${theme.palette.app.border}`,
  }),

  eyebrow: (theme) => ({
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: theme.palette.app.muted,
  }),

  description: (theme) => ({
    maxWidth: "30rem",
    fontSize: "0.98rem",
    lineHeight: 1.7,
    color: theme.palette.app.muted,
  }),
};
