import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { story } from "../../../../../../constant/text/vi/story";
import { style } from "../../style";

const HEADER_TEXT = story.createStoryModal.header;
const sx = style.createStoryModal.header;

export default function CreateStoryModalHeader({ onClose }) {
  return (
    <Box sx={sx.container}>
      <Box sx={sx.textWrap}>
        <Typography sx={sx.title}>{HEADER_TEXT.title}</Typography>
        <Typography sx={sx.subtitle}>{HEADER_TEXT.subtitle}</Typography>
      </Box>

      <IconButton aria-label={HEADER_TEXT.closeAriaLabel} sx={sx.closeButton} onClick={onClose}>
        <CloseIcon sx={sx.closeIcon} />
      </IconButton>
    </Box>
  );
}
