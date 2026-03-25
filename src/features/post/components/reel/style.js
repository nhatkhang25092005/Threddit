const REEL_MAX_HEIGHT = {
  xs: "85vh",
  sm: "85vh",
  lg: "85vh",
}

const REEL_MIN_HEIGHT = {
  xs: "95vh",
  sm: "95vh",
  lg: "95vh",
}

const REEL_MEDIA_MAX_WIDTH = {
  xs: "calc(100vw - 6rem)",
  sm: "min(calc(100vw - 8rem), 42rem)",
  lg: "min(calc(100vw - 12rem), 54rem)",
}

const REEL_COMMENT_SIDEBAR_WIDTH = {
  xs: "min(100vw, 28rem)",
  md: "30vw",
  lg: "30vw",
}

const REEL_BROWSER_SCROLLBAR_GAP = {
  md: "0.85rem",
  lg: "0.85rem",
}

const REEL_MEDIA_MAX_WIDTH_CONDENSED = {
  xs: REEL_MEDIA_MAX_WIDTH.xs,
  sm: REEL_MEDIA_MAX_WIDTH.sm,
  md: "clamp(18rem, calc(100vw - 30vw - 8rem), 36rem)",
  lg: "clamp(18rem, calc(100vw - 30vw - 8rem), 36rem)",
}

const REEL_PLACEHOLDER_WIDTH = {
  xs: "min(calc(100vw - 6rem), 18rem)",
  sm: "min(calc(100vw - 8rem), 22rem)",
  lg: "24rem",
}

const getReelIconColor = (theme) => (
  theme.palette.mode === "dark"
    ? theme.palette.common.white
    : theme.palette.common.black
)

const getReelMutedIconColor = (theme) => (
  theme.palette.mode === "dark"
    ? theme.palette.app.muted
    : theme.palette.app.muted
)

const getReelButtonBackground = (theme) => (
  theme.palette.mode === "dark"
    ? theme.palette.app.header
    : theme.palette.app.header
)

const getReelButtonHoverBackground = (theme) => (
  theme.palette.mode === "dark"
    ? theme.palette.app.primarySoft
    : theme.palette.app.primarySoft
)

const getReelButtonBorder = (theme) => (
  theme.palette.mode === "dark"
    ? theme.palette.app.border
    : theme.palette.app.border
)

const getReelButtonShadow = (theme) => (
  theme.palette.mode === "dark"
    ? "none"
    : "0 10px 24px rgba(15,23,42,0.12)"
)

const getReelButtonDisabledBackground = (theme) => (
  theme.palette.mode === "dark"
    ? theme.palette.app.border
    : theme.palette.app.border
)

const getReelButtonActiveBackground = (theme) => (
  theme.palette.mode === "dark"
    ? theme.palette.app.primarySoft
    : theme.palette.app.primarySoft
)

const getReelButtonActiveHoverBackground = (theme) => (
  theme.palette.mode === "dark"
    ? theme.palette.app.primary
    : theme.palette.app.primary
)

const getReelButtonActiveInset = (theme) => (
  theme.palette.mode === "dark"
    ? theme.palette.app.border
    : theme.palette.app.border
)

const getReelButtonActiveShadow = (theme) => (
  theme.palette.mode === "dark"
    ? `inset 0 0 0 1px ${getReelButtonActiveInset(theme)}`
    : `${getReelButtonShadow(theme)}, inset 0 0 0 1px ${getReelButtonActiveInset(theme)}`
)

const getReelOverlayButtonBackground = (theme) => (
  theme.palette.mode === "dark"
    ? theme.palette.app.header
    : theme.palette.app.header
)

const getReelOverlayButtonHoverBackground = (theme) => (
  theme.palette.mode === "dark"
    ? theme.palette.app.panelAlt
    : theme.palette.app.panelAlt
)

export const style = {
  page: {
    display: "flex",
    justifyContent: "center",
    px: { xs: 1, sm: 2, lg: 3 },
    py: 0,
    width: "100%",
  },
  shell: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    maxWidth: "72rem",
    width: "100%",
  },
  viewport: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  list: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    width: "100%",
  },
  screenSlot: {
    height: "100vh",
    minHeight: "100vh",
    overflow: "hidden",
    width: "100%",
  },
  screenSlotInner: {
    alignItems: "center",
    boxSizing: "border-box",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    minWidth: 0,
    width: "100%",
  },
  screenSlotInnerCommentOpen: {
    pr: {
      md: `calc(${REEL_COMMENT_SIDEBAR_WIDTH.md} + ${REEL_BROWSER_SCROLLBAR_GAP.md})`,
      lg: `calc(${REEL_COMMENT_SIDEBAR_WIDTH.lg} + ${REEL_BROWSER_SCROLLBAR_GAP.lg})`,
    },
  },
  itemFrame: {
    alignItems: "flex-end",
    display: "flex",
    gap: { xs: 1, sm: 1.15 },
    justifyContent: "center",
    maxWidth: "100%",
    minWidth: 0,
    width: "fit-content",
  },
  mediaColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    maxWidth: "100%",
    minWidth: 0,
    width: "fit-content",
  },
  mediaColumnCondensed: {
    maxWidth: REEL_MEDIA_MAX_WIDTH_CONDENSED,
  },
  card: {
    backgroundColor: "#0B121E",
    border: "1px solid #243041",
    borderRadius: "1.6rem",
    boxShadow: "0 24px 70px rgba(0,0,0,0.32)",
    flex: "0 1 auto",
    maxWidth: "100%",
    minWidth: 0,
    overflow: "hidden",
    position: "relative",
    transition: "box-shadow 180ms ease",
    width: "fit-content",
  },
  cardCondensed: {
    maxWidth: REEL_MEDIA_MAX_WIDTH_CONDENSED,
  },
  mediaWrap: {
    background: "linear-gradient(180deg, #131F31 0%, #071120 100%)",
    display: "flex",
    justifyContent: "center",
    maxWidth: REEL_MEDIA_MAX_WIDTH,
    position: "relative",
    width: "fit-content",
  },
  mediaWrapCondensed: {
    maxWidth: REEL_MEDIA_MAX_WIDTH_CONDENSED,
  },
  mediaInteractive: {
    cursor: "pointer",
    userSelect: "none",
  },
  mediaElement: {
    display: "block",
    height: REEL_MAX_HEIGHT,
    maxHeight: REEL_MAX_HEIGHT,
    maxWidth: REEL_MEDIA_MAX_WIDTH,
    minHeight: REEL_MIN_HEIGHT,
    width: "auto",
  },
  mediaElementCondensed: {
    maxWidth: REEL_MEDIA_MAX_WIDTH_CONDENSED,
  },
  mediaPlaceholder: {
    background: "linear-gradient(180deg, #131F31 0%, #071120 100%)",
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
    width: "fit-content",
  },
  mediaPlaceholderInner: {
    alignItems: "center",
    background: "radial-gradient(circle at top, rgba(59,130,246,0.25), transparent 45%), linear-gradient(180deg, #0F1723 0%, #071120 100%)",
    color: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    gap: 1,
    height: REEL_MAX_HEIGHT,
    justifyContent: "center",
    maxWidth: REEL_MEDIA_MAX_WIDTH,
    minHeight: REEL_MIN_HEIGHT,
    width: REEL_PLACEHOLDER_WIDTH,
  },
  mediaPlaceholderInnerCondensed: {
    maxWidth: REEL_MEDIA_MAX_WIDTH_CONDENSED,
  },
  mediaCountBadge: {
    backgroundColor: "rgba(10, 18, 30, 0.82)",
    border: "1px solid #243041",
    borderRadius: "999px",
    color: "#FFFFFF",
    fontSize: "0.72rem",
    fontWeight: 700,
    px: 1,
    py: 0.35,
    position: "absolute",
    right: "1rem",
    top: "1rem",
    zIndex: 2,
  },
  videoControlRow: {
    alignItems: "center",
    display: "flex",
    gap: 1,
    left: { xs: "0.75rem", sm: "1rem" },
    position: "absolute",
    top: { xs: "0.75rem", sm: "1rem" },
    zIndex: 3,
  },
  videoControlButton: {
    backdropFilter: "blur(10px)",
    backgroundColor: getReelOverlayButtonBackground,
    border: "1px solid",
    borderColor: getReelButtonBorder,
    boxShadow: getReelButtonShadow,
    color: getReelIconColor,
    height: "2.6rem",
    width: "2.6rem",
    "&:hover": {
      backgroundColor: getReelOverlayButtonHoverBackground,
    },
  },
  infoLayer: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 2,
  },
  infoPanel: {
    boxSizing: "border-box",
    display: "grid",
    gap: 0.85,
    maxWidth: "100%",
    minWidth: 0,
    padding: "1rem 1rem 1.2rem",
    width: "100%",
  },
  infoPanelWithText: {
    gridTemplateRows: "auto auto",
    rowGap: 0.55,
  },
  infoHeaderSection: {
    minHeight: 0,
  },
  infoTextSection: {
    minHeight: 0,
  },
  header: {
    alignItems: "center",
    display: "flex",
    gap: 1,
  },
  authorRow: {
    alignItems: "center",
    display: "flex",
    gap: 1,
    minWidth: 0,
  },
  avatarButton: {
    alignItems: "center",
    appearance: "none",
    background: "none",
    border: 0,
    borderRadius: "999px",
    cursor: "pointer",
    display: "inline-flex",
    justifyContent: "center",
    lineHeight: 0,
    padding: 0,
    "&:disabled": {
      cursor: "default",
    },
    "&:focus-visible": {
      outline: "2px solid rgba(255,255,255,0.92)",
      outlineOffset: "2px",
    },
  },
  avatar: {
    border: "2px solid rgba(255,255,255,0.85)",
    height: "2.5rem",
    width: "2.5rem",
  },
  authorMeta: {
    color: "#F8FAFC",
    display: "flex",
    flexDirection: "column",
    gap: 0.15,
    minWidth: 0,
  },
  authorName: {
    color: "#FFFFFF",
    fontSize: "0.94rem",
    fontWeight: 700,
    lineHeight: 1.2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    textShadow: "0 2px 12px rgba(0,0,0,0.45)",
    whiteSpace: "nowrap",
  },
  subMeta: {
    color: "rgba(255,255,255,0.76)",
    fontSize: "0.74rem",
    lineHeight: 1.2,
    textShadow: "0 2px 10px rgba(0,0,0,0.42)",
  },
  meta: {
    color: "#F8FAFC",
    display: "flex",
    flexDirection: "column",
    gap: 0.45,
    justifyContent: "flex-start",
  },
  caption: {
    color: "#FFFFFF",
    fontSize: "0.95rem",
    lineHeight: 1.45,
    textShadow: "0 2px 14px rgba(0,0,0,0.5)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  captionCollapsed: {
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    display: "-webkit-box",
    overflow: "hidden",
  },
  captionToggle: {
    alignSelf: "flex-start",
    appearance: "none",
    background: "none",
    border: 0,
    color: "#F8FAFC",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "0.82rem",
    fontWeight: 700,
    padding: 0,
    textDecoration: "underline",
  },
  progressBarWrap: {
    alignItems: "flex-end",
    bottom: 0,
    cursor: "pointer",
    display: "flex",
    height: "0.9rem",
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 4,
  },
  progressBarTrack: {
    backgroundColor: "rgba(255,255,255,0.24)",
    height: "0.24rem",
    width: "100%",
  },
  progressBarFill: {
    background: "linear-gradient(90deg, #FFFFFF 0%, #CBD5E1 100%)",
    height: "100%",
    transition: "width 120ms linear",
    width: 0,
  },
  actionRailShell: {
    alignItems: "stretch",
    display: "flex",
    flex: "0 0 auto",
    height: REEL_MAX_HEIGHT,
    justifyContent: "center",
  },
  sideRail: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    height: "100%",
    justifyContent: "space-between",
  },
  navRail: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: 1,
    justifyContent: "center",
  },
  navButton: {
    backgroundColor: getReelButtonBackground,
    border: "1px solid",
    borderColor: getReelButtonBorder,
    boxShadow: getReelButtonShadow,
    color: getReelIconColor,
    height: "3rem",
    width: "3rem",
    "&.Mui-disabled": {
      backgroundColor: getReelButtonDisabledBackground,
      borderColor: getReelButtonBorder,
      color: getReelMutedIconColor,
    },
    "&:hover": {
      backgroundColor: getReelButtonHoverBackground,
    },
  },
  actionRail: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  actionItem: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 0.35,
  },
  actionItemReaction: {
    position: "relative",
  },
  reactionPopover: {
    bottom: "calc(100% + 0.5rem)",
    left: "50%",
    position: "absolute",
    transform: "translateX(-50%)",
    zIndex: 6,
  },
  actionButton: {
    backgroundColor: getReelButtonBackground,
    border: "1px solid",
    borderColor: getReelButtonBorder,
    boxShadow: getReelButtonShadow,
    color: getReelIconColor,
    height: "2.9rem",
    width: "2.9rem",
    "&:hover": {
      backgroundColor: getReelButtonHoverBackground,
    },
  },
  actionButtonActive: {
    backgroundColor: getReelButtonActiveBackground,
    boxShadow: getReelButtonActiveShadow,
    "&:hover": {
      backgroundColor: getReelButtonActiveHoverBackground,
    },
  },
  actionReactionEmoji: {
    fontSize: "1.45rem",
    lineHeight: 1,
    userSelect: "none",
  },
  actionCount: {
    color: getReelIconColor,
    fontSize: "0.72rem",
    fontWeight: 700,
    lineHeight: 1.1,
  },
  actionCountActive: {
    color: getReelIconColor,
  },
  actionAvatar: {
    border: "2px solid",
    borderColor: (theme) =>
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.78)"
        : "rgba(15,23,42,0.18)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    height: "2.65rem",
    width: "2.65rem",
  },
  actionAvatarButton: {
    flexShrink: 0,
  },
  commentSidebarShell: {
    backfaceVisibility: "hidden",
    bottom: 0,
    contain: "paint",
    maxWidth: REEL_COMMENT_SIDEBAR_WIDTH,
    opacity: 0,
    overflow: "hidden",
    pointerEvents: "none",
    position: "fixed",
    right: { xs: 0, md: REEL_BROWSER_SCROLLBAR_GAP.md, lg: REEL_BROWSER_SCROLLBAR_GAP.lg },
    top: 0,
    transform: "translate3d(100%, 0, 0)",
    transition: "transform 260ms ease, opacity 200ms ease",
    willChange: "transform, opacity",
    width: REEL_COMMENT_SIDEBAR_WIDTH,
    zIndex: 40,
  },
  commentSidebarShellOpen: {
    opacity: 1,
    pointerEvents: "auto",
    transform: "translate3d(0, 0, 0)",
  },
  commentSidebarPanel: {
    backdropFilter: "blur(12px)",
    backgroundColor: (theme) =>
      theme.palette.mode === "dark"
        ? "rgba(15,18,24,0.94)"
        : "rgba(255,255,255,0.96)",
    border: "1px solid",
    borderColor: (theme) =>
      theme.palette.mode === "dark" ? "#243041" : "#D9E2EC",
    borderRadius: 0,
    boxShadow: (theme) =>
      theme.palette.mode === "dark"
        ? "-18px 0 44px rgba(0,0,0,0.32)"
        : "-18px 0 44px rgba(34,48,74,0.14)",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    maxHeight: "100vh",
    minHeight: "100vh",
    overflow: "hidden",
    transform: "translateZ(0)",
    width: "100%",
  },
  commentSidebarHeader: {
    alignItems: "center",
    borderBottom: "1px solid",
    borderColor: (theme) =>
      theme.palette.mode === "dark" ? "#243041" : "#DCE3EC",
    display: "flex",
    gap: "0.75rem",
    justifyContent: "space-between",
    px: "0.85rem",
    py: "0.8rem",
  },
  commentSidebarMeta: {
    alignItems: "center",
    display: "flex",
    gap: "0.65rem",
    minWidth: 0,
  },
  commentSidebarBadge: {
    alignItems: "center",
    backgroundColor: (theme) =>
      theme.palette.mode === "dark" ? "#242B35" : "#EDF3FA",
    borderRadius: "999rem",
    display: "inline-flex",
    flexShrink: 0,
    height: "2.2rem",
    justifyContent: "center",
    width: "2.2rem",
  },
  commentSidebarBadgeIcon: {
    color: getReelIconColor,
    fontSize: "1.2rem",
  },
  commentSidebarHeading: {
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
    minWidth: 0,
  },
  commentSidebarTitle: {
    color: (theme) =>
      theme.palette.mode === "dark" ? "#F8FAFC" : "#17202A",
    fontSize: "0.95rem",
    fontWeight: 800,
    lineHeight: 1.2,
  },
  commentSidebarSubtitle: {
    color: (theme) =>
      theme.palette.mode === "dark" ? "#A9B2BE" : "#64748B",
    fontSize: "0.78rem",
    lineHeight: 1.25,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  commentSidebarCloseButton: {
    backgroundColor: (theme) =>
      theme.palette.mode === "dark" ? "#232A33" : "#EEF3F8",
    color: getReelIconColor,
    flexShrink: 0,
    height: "2.2rem",
    width: "2.2rem",
    "&:hover": {
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#2D3744" : "#E2EAF2",
    },
  },
  commentSidebarBody: {
    contain: "layout paint",
    flex: "1 1 auto",
    minHeight: 0,
    overflowX: "hidden",
    overflowY: "auto",
    overscrollBehavior: "contain",
    WebkitOverflowScrolling: "touch",
    "&::-webkit-scrollbar": {
      width: "0.38rem",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#64748B" : "#CBD5E1",
      borderRadius: "999rem",
    },
  },
  commentSidebarBodyPending: {
    flex: "1 1 auto",
    minHeight: 0,
  },
  loadingList: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  loadingCard: {
    borderRadius: "1.6rem",
    height: REEL_MAX_HEIGHT,
    maxHeight: REEL_MAX_HEIGHT,
    maxWidth: REEL_PLACEHOLDER_WIDTH,
    minHeight: REEL_MIN_HEIGHT,
    overflow: "hidden",
    width: "100%",
  },
  emptyCard: {
    mx: "auto",
    p: 2.2,
    textAlign: "center",
    width: "min(100%, 32rem)",
  },
  emptyTitle: {
    fontSize: "1.05rem",
    fontWeight: 800,
    mb: 0.75,
  },
  emptyText: {
    color: "text.secondary",
    fontSize: "0.92rem",
    lineHeight: 1.6,
  },
}
