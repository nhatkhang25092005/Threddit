import { Modal, Box, Typography, Button, Backdrop, Fade } from "@mui/material";
import { notification } from "../../constant/text/vi/notification.text";
export default function PopupNotification({ open = false, onClose, title, content, btnTitle = null, onConfirm = null }) {

  const handleClick = () => {
    onConfirm?.()
    onClose()
  }
  return (
    <Modal
      open={open}
      onClose={handleClick}
      aria-labelledby="modal-title"
      aria-describedby="model-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      sx={{ zIndex: 1600, width:"100%", height:"100%" }}
    >
      <Fade in={open}>
        <Box
          sx={{
            py: "1rem",
            bgcolor: "#071120",
            width: "fit-content",
            minWidth:'25rem',
            height: "fit-content",
            position: "absolute",
            left: "50%",
            top: "25%",
            border: "solid #243041 2px",
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
            onClick={handleClick}
            variant="primary"
            sx={{
              left: "50%",
              transform: "translateX(-50%)",
              height: "2rem",
              mt: "2rem",
            }}
          >
            {btnTitle || notification.popup.closeButton}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
