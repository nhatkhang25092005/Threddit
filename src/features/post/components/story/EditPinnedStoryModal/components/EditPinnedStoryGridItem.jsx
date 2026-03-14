import { Box, CircularProgress, IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import StoryCard from '../../StoryCard'
import { useOpenPinnedStory } from '../hooks'
import { style } from '../style'
import { EDIT_PINNED_STORY_MODAL_TEXT } from '../utils/constants'

const sx = style.editPinnedStoryModal.gridItem

export default function EditPinnedStoryGridItem({
  story,
  onUnpin,
  isRemoving = false,
}) {
  const openPinnedStory = useOpenPinnedStory()

  if (!story) {
    return <Box aria-hidden sx={sx.placeholder} />
  }

  const handleUnpin = (event) => {
    event.stopPropagation()
    onUnpin(story)
  }

  const handleOpenStory = () => {
    if (isRemoving) return
    openPinnedStory(story)
  }

  return (
    <Box sx={sx.container(isRemoving)}>
      <IconButton
        aria-label={EDIT_PINNED_STORY_MODAL_TEXT.removeAriaLabel}
        disabled={isRemoving}
        onClick={handleUnpin}
        sx={sx.removeButton}
      >
        {isRemoving ? (
          <CircularProgress size={16} thickness={5} sx={sx.removeProgress} />
        ) : (
          <CloseRoundedIcon sx={sx.removeIcon} />
        )}
      </IconButton>

      <Box sx={sx.storyCardWrap}>
        <StoryCard
          onClick={handleOpenStory}
          story={story}
          variant="preview"
        />
      </Box>
    </Box>
  )
}
