import { Modal, Box, Typography, Button, Backdrop, Fade } from "@mui/material";

export default function PopupNotification({ open = false, onClose, title, content }) {

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="model-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            py: "1rem",
            bgcolor: "#0A0B0B",
            width: "30vw",
            height: "fit-content",
            position: "absolute",
            left: "50%",
            top: "25%",
            border: "solid #A6A6A6 2px",
            borderRadius: "7px",
            transform: "translateX(-50%)",
          }}
        >
          <Typography
            id="modal-title"
            variant="title"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            {title}
          </Typography>
          <Typography id="modal-description" sx={{ textAlign: "center" }}>
            {content}
          </Typography>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              left: "50%",
              transform: "translateX(-50%)",
              height: "2rem",
              mt: "1rem",
            }}
          >
            Đóng
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
