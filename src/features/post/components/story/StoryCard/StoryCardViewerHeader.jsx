import { Avatar, Box, CircularProgress, IconButton, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded'
import { story as storyText } from '../../../../../constant/text/vi/story'
import { storyCardViewerSx as sx } from './storyCardViewer.styles'
import { formatStoryCardTime } from './utils/storyCard.utils'
import {usePostContext} from '../../../hooks/usePostContext'
import useAuth from '../../../../../core/auth/useAuth'
import { usePostModal } from '../../../provider/usePostModal'

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
      loading: {
        getEditStoryLoading
      },
      story: {
        getDeleteLoadingByStoryIdOf
      }
    }
  } = usePostContext()
  const { isOwnerByUsername } = useAuth()
  const { openModal } = usePostModal()
  const canTogglePin = Boolean(
    story?.id != null
    && (story?.isOwner || isOwnerByUsername(story?.author?.username))
  )
  const canDelete = canTogglePin
  const canEdit = canTogglePin
  const isDeleteLoading = getDeleteLoadingByStoryIdOf(story?.id)
  const isEditLoading = getEditStoryLoading()

  const handlePinToggle = () => {
    if (!canTogglePin || isDeleteLoading || isEditLoading) return

    const action = story?.isPinned ? unpinStory : pinStory
    action(story.id, story?.author?.username)
  }

  const handleOpenEdit = () => {
    if (!canEdit || story?.id == null || isDeleteLoading || isEditLoading) return

    openModal("edit_story_modal", { storyId: story.id })
  }

  const handleDelete = async () => {
    if (!canDelete || story?.id == null || isEditLoading) return

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
          alt={story?.author?.displayName || story?.author?.username || storyText.viewer.fallbackAuthorName}
          sx={sx.authorAvatar}
        />

        <Box sx={sx.authorMeta}>
          <Typography sx={sx.authorName}>
            {story?.author?.displayName || story?.author?.username || storyText.viewer.fallbackAuthorName}
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
            aria-label={story?.isPinned ? storyText.viewer.unpin : storyText.viewer.pin}
            disabled={isDeleteLoading || isEditLoading}
            id={story?.id != null ? `story-pin-trigger-${story.id}` : undefined}
            data-story-id={story?.id != null ? String(story.id) : undefined}
            data-story-pinned={story?.isPinned ? 'true' : 'false'}
            onClick={handlePinToggle}
            title={story?.isPinned ? storyText.viewer.unpin : storyText.viewer.pin}
            sx={sx.pinButton(Boolean(story?.isPinned))}
          >
            <PushPinRoundedIcon sx={sx.pinIcon} />
          </IconButton>
        ) : null}

        {canEdit ? (
          <IconButton
            aria-label={storyText.viewer.edit}
            disabled={isDeleteLoading || isEditLoading}
            onClick={handleOpenEdit}
            title={storyText.viewer.edit}
            sx={{
              ...sx.closeButton,
              border: '1px solid rgba(148, 195, 255, 0.3)',
              backgroundColor: 'rgba(84, 139, 255, 0.14)',
              color: '#D7E6FF',
              '&:hover': {
                backgroundColor: 'rgba(84, 139, 255, 0.22)',
              },
            }}
          >
            {isEditLoading
              ? <CircularProgress size={18} color="inherit" />
              : <EditRoundedIcon />}
          </IconButton>
        ) : null}

        {canDelete ? (
          <IconButton
            aria-label={storyText.viewer.delete}
            disabled={isDeleteLoading || isEditLoading}
            onClick={handleDelete}
            title={storyText.viewer.delete}
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

        <IconButton onClick={onClose} aria-label={storyText.viewer.close} sx={sx.closeButton}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
