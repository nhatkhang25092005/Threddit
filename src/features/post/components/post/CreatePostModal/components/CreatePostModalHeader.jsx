import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { composerText } from "../../../../../../constant/text/vi/post/composer.text";

export default function CreatePostModalHeader({
  sx,
  onClose,
  title = composerText.post.createTitle,
}) {
  return (
    <Box sx={sx.header}>
      <Typography sx={sx.headerTitle}>{title}</Typography>
      <IconButton aria-label={composerText.post.closeAriaLabel} onClick={onClose} sx={sx.closeButton}>
        <CloseIcon sx={sx.closeIcon} />
      </IconButton>
    </Box>
  );
}
