import { Box, Button, Portal, Typography } from "@mui/material";
import Surface from "../../../../../../components/common/Surface";
import { composerText } from "../../../../../../constant/text/vi/post/composer.text";

const sx = {
  overlay: {
    position: "fixed",
    inset: 0,
    top:'-10rem',
    zIndex: 1700,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
  panel: {
    width: "100%",
    maxWidth: "24rem",
    borderRadius: "0.9rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  title: {
    fontSize: "1.05rem",
    fontWeight: 700,
    lineHeight: 1.3,
  },
  message: {
    fontSize: "0.9rem",
    lineHeight: 1.45,
    opacity: 0.85,
  },
  actions: {
    marginTop: "0.25rem",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
  },
  cancelButton: {
    textTransform: "none",
    fontWeight: 600,
  },
  confirmButton: {
    textTransform: "none",
    fontWeight: 700,
  },
};

export default function CloseAlert({
  onConfirm,
  onCancel,
  title = composerText.post.closeAlert.create.title,
  message = composerText.post.closeAlert.create.message,
  cancelLabel = composerText.post.closeAlert.cancelLabel,
  confirmLabel = composerText.post.closeAlert.confirmLabel,
}) {
  return (
    <Portal>
      <Box sx={sx.overlay} onClick={onCancel}>
        <Surface
          variant="modal"
          sx={sx.panel}
          onClick={(event) => event.stopPropagation()}
        >
          <Typography sx={sx.title}>{title}</Typography>
          <Typography sx={sx.message}>{message}</Typography>

          <Box sx={sx.actions}>
            <Button variant="secondary" sx={sx.cancelButton} onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button variant="primary" sx={sx.confirmButton} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </Box>
        </Surface>
      </Box>
    </Portal>
  );
}
