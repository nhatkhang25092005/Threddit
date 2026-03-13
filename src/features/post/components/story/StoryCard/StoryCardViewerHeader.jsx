import { Avatar, Box, IconButton, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded'
import { storyCardViewerSx as sx } from './storyCardViewer.styles'
import { formatStoryCardTime } from './utils/storyCard.utils'

export default function StoryCardViewerHeader({
  durationLabel,
  modeLabel,
  onClose,
  story,
}) {
  return (
    <Box sx={sx.header}>
      <Box sx={sx.authorWrap}>
        <Avatar
          src={story?.author?.avatarUrl || undefined}
          alt={story?.author?.displayName || story?.author?.username || 'Story author'}
          sx={sx.authorAvatar}
        />

        <Box sx={sx.authorMeta}>
          <Typography sx={sx.authorName}>
            {story?.author?.displayName || story?.author?.username || 'Nguoi dung'}
          </Typography>
          <Typography sx={sx.authorSubline}>
            @{story?.author?.username || 'story'} | {formatStoryCardTime(story?.time?.createdAt)}
          </Typography>
        </Box>
      </Box>

      <Box sx={sx.badgeRow}>
        <Box sx={sx.metaPill}>{modeLabel}</Box>
        <Box sx={sx.metaPill}>{durationLabel}</Box>
        {story?.isPinned ? <Box sx={sx.metaPill}>Pinned</Box> : null}
        <IconButton
          aria-label={story?.isPinned ? 'Pinned story' : 'Pin story'}
          id={story?.id != null ? `story-pin-trigger-${story.id}` : undefined}
          data-story-id={story?.id != null ? String(story.id) : undefined}
          data-story-pinned={story?.isPinned ? 'true' : 'false'}
          title={story?.id != null ? `Story ID: ${story.id}` : 'Pin story'}
          sx={sx.pinButton(Boolean(story?.isPinned))}
        >
          <PushPinRoundedIcon sx={sx.pinIcon} />
        </IconButton>
        <IconButton onClick={onClose} aria-label="Close story" sx={sx.closeButton}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
