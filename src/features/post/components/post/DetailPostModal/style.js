import { style as postStyle } from "../style";

const baseModal = postStyle.createPostModal;
const basePost = postStyle.post;

export const style = {
  modal: {
    ...baseModal,
    surface: {
      ...baseModal.surface,
      width: {
        xs: "calc(100vw - 1rem)",
        sm: "42rem",
      },
      maxWidth: "35rem",
      maxHeight: {
        xs: "calc(100dvh - 1rem)",
        md: "calc(100dvh - 4rem)",
      },
      padding: 0,
    },
    layout: {
      display: "flex",
      flexDirection: "column",
      flex: "1 1 auto",
      minHeight: 0,
      overflow: "hidden",
    },
    contentPanel: {
      minWidth: 0,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
    },
    contentScroll: {
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
          theme.palette.mode === "dark" ? "#64748B" : "#C8CDD4",
      },
    },
    commentPlaceholder: {
      mx: "1rem",
      my: "1rem",
      px: "1rem",
      py: "1.15rem",
      borderRadius: "0.9rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "0.55rem",
      border: "1px dashed",
      borderColor: (theme) =>
        theme.palette.mode === "dark" ? "#475569" : "#D0D6DE",
      background: (theme) =>
        theme.palette.mode === "dark"
          ? "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)"
          : "linear-gradient(145deg, #FBFCFE 0%, #F4F7FB 100%)",
    },
    commentIconWrap: {
      width: "3rem",
      height: "3rem",
      borderRadius: "999rem",
      display: "grid",
      placeItems: "center",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#131F31" : "#E9EEF6",
    },
    commentIcon: {
      fontSize: "1.4rem",
      color: (theme) =>
        theme.palette.mode === "dark" ? "#E4E6EB" : "#3A4556",
    },
    commentTitle: {
      fontSize: "0.95rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    commentDescription: {
      maxWidth: "25rem",
      fontSize: "0.88rem",
      lineHeight: 1.55,
      color: (theme) =>
        theme.palette.mode === "dark" ? "#94A3B8" : "#64748B",
    },
    sharedUnavailableBox: {
      mx: "1rem",
      mb: "0.9rem",
      px: "1rem",
      py: "1rem",
      borderRadius: "0.8rem",
      border: "1px solid",
      borderColor: (theme) =>
        theme.palette.mode === "dark" ? "#243041" : "#DADDE1",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#0B121E" : "#FFFFFF",
    },
    sharedUnavailableText: {
      fontSize: "0.88rem",
      lineHeight: 1.5,
      color: (theme) =>
        theme.palette.mode === "dark" ? "#94A3B8" : "#64748B",
    },
  },
  postDetail: {
    ...basePost,
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
    sharedCard: {
      ...basePost.sharedCard,
      mx: "1rem",
      mb: "0.9rem",
    },
    sharedCardBody: {
      ...basePost.sharedCardBody,
      pb: "0.15rem",
    },
    sharedUnavailable: {
      ...basePost.sharedUnavailable,
      py: "1rem",
    },
    stats: {
      ...basePost.stats,
      py: "0.7rem",
      borderTop: "1px solid",
      borderBottom: "1px solid",
      borderColor: (theme) =>
        theme.palette.mode === "dark" ? "#243041" : "#DADDE1",
    },
    actionsRow: {
      ...basePost.actionsRow,
      py: "0.25rem",
    },
  },
};
