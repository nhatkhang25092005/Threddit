import { Box, CircularProgress, Typography } from '@mui/material'
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded'
import { style } from '../style'
import { EDIT_PINNED_STORY_MODAL_TEXT } from '../utils/constants'

const sx = style.editPinnedStoryModal.emptyState

export default function EditPinnedStoryEmptyState({ isLoading = false }) {
  return (
    <Box sx={sx.container}>
      <Box sx={sx.iconWrap}>
        {isLoading ? (
          <CircularProgress size={22} thickness={5} sx={sx.loader} />
        ) : (
          <PushPinRoundedIcon />
        )}
      </Box>

      <Typography sx={sx.title}>
        {isLoading
          ? EDIT_PINNED_STORY_MODAL_TEXT.loadingTitle
          : EDIT_PINNED_STORY_MODAL_TEXT.emptyTitle}
      </Typography>

      <Typography sx={sx.text}>
        {isLoading
          ? EDIT_PINNED_STORY_MODAL_TEXT.loadingText
          : EDIT_PINNED_STORY_MODAL_TEXT.emptyText}
      </Typography>
    </Box>
  )
}
