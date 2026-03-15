import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { story } from "../../../../../../constant/text/vi/story";
import { style } from "../../style";

const HEADER_TEXT = story.createStoryModal.header;
const sx = style.createStoryModal.header;

export default function CreateStoryModalHeader({
  onClose,
  title = HEADER_TEXT.title,
  subtitle = HEADER_TEXT.subtitle,
  closeAriaLabel = HEADER_TEXT.closeAriaLabel,
}) {
  return (
    <Box sx={sx.container}>
      <Box sx={sx.textWrap}>
        <Typography sx={sx.title}>{title}</Typography>
        <Typography sx={sx.subtitle}>{subtitle}</Typography>
      </Box>

      <IconButton aria-label={closeAriaLabel} sx={sx.closeButton} onClick={onClose}>
        <CloseIcon sx={sx.closeIcon} />
      </IconButton>
    </Box>
  );
}
