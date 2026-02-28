import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CreatePostModalHeader({ sx, onClose }) {
  return (
    <Box sx={sx.header}>
      <Typography sx={sx.headerTitle}>Tạo Bài Viết</Typography>
      <IconButton aria-label="Dong" onClick={onClose} sx={sx.closeButton}>
        <CloseIcon sx={sx.closeIcon} />
      </IconButton>
    </Box>
  );
}
