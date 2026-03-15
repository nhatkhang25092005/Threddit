import { Avatar, Box, CircularProgress, IconButton, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded'
import { storyCardViewerSx as sx } from './storyCardViewer.styles'
import { formatStoryCardTime } from './utils/storyCard.utils'
import {usePostContext} from '../../../hooks/usePostContext'
import useAuth from '../../../../../core/auth/useAuth'

export default function StoryCardViewerHeader({
  durationLabel,
  modeLabel,
  onClose,
  story,
  storyCount = 1,
}) {
  const {
    actions: { deleteStory, pinStory, unpinStory },
    selector: {
      story: {
        getDeleteLoadingByStoryIdOf
      }
    }
  } = usePostContext()
  const { isOwnerByUsername } = useAuth()
  const canTogglePin = Boolean(
    story?.id != null
    && (story?.isOwner || isOwnerByUsername(story?.author?.username))
  )
  const canDelete = canTogglePin
  const isDeleteLoading = getDeleteLoadingByStoryIdOf(story?.id)

  const handlePinToggle = () => {
    if (!canTogglePin || isDeleteLoading) return

    const action = story?.isPinned ? unpinStory : pinStory
    action(story.id, story?.author?.username)
  }

  const handleDelete = async () => {
    if (!canDelete || story?.id == null) return

    const response = await deleteStory(story.id)

    if (response?.success && storyCount <= 1) {
      onClose?.()
    }
  }

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
            {story?.author?.displayName || story?.author?.username || 'Người dùng'}
          </Typography>
          <Typography sx={sx.authorSubline}>
            @{story?.author?.username || 'story'} | {formatStoryCardTime(story?.time?.createdAt)}
          </Typography>
        </Box>
      </Box>

      <Box sx={sx.badgeRow}>
        <Box sx={sx.metaPill}>{modeLabel}</Box>
        <Box sx={sx.metaPill}>{durationLabel}</Box>

        {canTogglePin ? (
          <IconButton
            aria-label={story?.isPinned ? 'Unpin story' : 'Pin story'}
            disabled={isDeleteLoading}
            id={story?.id != null ? `story-pin-trigger-${story.id}` : undefined}
            data-story-id={story?.id != null ? String(story.id) : undefined}
            data-story-pinned={story?.isPinned ? 'true' : 'false'}
            onClick={handlePinToggle}
            title={story?.isPinned ? 'Unpin story' : 'Pin story'}
            sx={sx.pinButton(Boolean(story?.isPinned))}
          >
            <PushPinRoundedIcon sx={sx.pinIcon} />
          </IconButton>
        ) : null}

        {canDelete ? (
          <IconButton
            aria-label="Xóa tin"
            disabled={isDeleteLoading}
            onClick={handleDelete}
            title="Xóa tin"
            sx={{
              ...sx.closeButton,
              border: '1px solid rgba(255, 133, 133, 0.32)',
              backgroundColor: 'rgba(255, 96, 96, 0.12)',
              color: '#FFD2D2',
              '&:hover': {
                backgroundColor: 'rgba(255, 96, 96, 0.2)',
              },
            }}
          >
            {isDeleteLoading
              ? <CircularProgress size={18} color="inherit" />
              : <DeleteOutlineRoundedIcon />}
          </IconButton>
        ) : null}

        <IconButton onClick={onClose} aria-label="Close story" sx={sx.closeButton}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
