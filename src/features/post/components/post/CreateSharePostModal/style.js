import { style as postStyle } from "../style";

const baseModal = postStyle.createPostModal;

export const style = {
  modal: {
    ...baseModal,
    surface: {
      ...baseModal.surface,
      width: {
        xs: "calc(100vw - 1rem)",
        sm: "34rem"
      },
      maxWidth: "34rem"
    },
    content: {
      ...baseModal.body,
      gap: "1rem"
    },
    compactEditor: {
      minHeight: "6.5rem",
      fontSize: "1rem"
    },
    previewWrap: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }
  },
  preview: postStyle.post
};
