import { Modal, Box, Typography, Button, Backdrop, Fade } from "@mui/material";

export default function PopupNotification({ open = false, onClose, title, content, btnTitle = null }) {

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
      sx={{ zIndex: 12, width:"100%", height:"100%" }}
    >
      <Fade in={open}>
        <Box
          sx={{
            py: "1rem",
            bgcolor: "#0A0B0B",
            width: "fit-content",
            height: "fit-content",
            position: "absolute",
            left: "50%",
            top: "25%",
            border: "solid #A6A6A6 2px",
            borderRadius: "7px",
            transform: "translateX(-50%)",
            px:"1rem",
            pt:"1.5rem",
            pb:"2rem"
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
          <Typography id="modal-description" sx={{ textAlign: "center",mt:"1rem" }}>
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
            {btnTitle || "Đóng"}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
