import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CreatePostModalHeader({
  sx,
  onClose,
  title = "Tạo bài viết",
}) {
  return (
    <Box sx={sx.header}>
      <Typography sx={sx.headerTitle}>{title}</Typography>
      <IconButton aria-label="Dong" onClick={onClose} sx={sx.closeButton}>
        <CloseIcon sx={sx.closeIcon} />
      </IconButton>
    </Box>
  );
}
