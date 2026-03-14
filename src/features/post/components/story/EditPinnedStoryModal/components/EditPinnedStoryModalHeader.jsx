import { Box, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { style } from '../style'
import { EDIT_PINNED_STORY_MODAL_TEXT } from '../utils/constants'

const sx = style.editPinnedStoryModal.header

export default function EditPinnedStoryModalHeader({ onClose, storyCount }) {
  return (
    <Box sx={sx.container}>
      <Box sx={sx.textWrap}>
        <Typography sx={sx.title}>{EDIT_PINNED_STORY_MODAL_TEXT.title}</Typography>
        <Typography sx={sx.subtitle}>{EDIT_PINNED_STORY_MODAL_TEXT.subtitle}</Typography>
        <Typography component="span" sx={sx.counter}>
          {EDIT_PINNED_STORY_MODAL_TEXT.countLabel(storyCount)}
        </Typography>
      </Box>

      <IconButton
        aria-label={EDIT_PINNED_STORY_MODAL_TEXT.closeAriaLabel}
        onClick={onClose}
        sx={sx.closeButton}
      >
        <CloseIcon sx={sx.closeIcon} />
      </IconButton>
    </Box>
  )
}
