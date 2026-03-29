import { Box, IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { story } from '../../../../../constant/text/vi/story'
import { style } from '../style'
import FriendStoryList from './FriendStoryList'

const sx = style.storyList

export default function StoryListBackground({ onClose, showCloseButton = false }) {
  return (
    <>
      <FriendStoryList />
      {showCloseButton && (
        <IconButton
          aria-label={story.viewer.close}
          onClick={onClose}
          sx={sx.backgroundCloseButton}
        >
          <CloseRoundedIcon />
        </IconButton>
      )}
      <Box sx={sx.orb('-7rem', '-5rem', '#47C8A84D')} />
      <Box sx={sx.orb('58%', '10%', '#6A7CFF42')} />
    </>
  )
}
