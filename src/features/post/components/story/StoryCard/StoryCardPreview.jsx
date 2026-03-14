import { Box, Typography } from '@mui/material'
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { STORY_MEDIA_KIND } from '../CreateStoryModal/storyComposer'
import { style } from '../style'
import {
  resolveStoryPrimaryMedia,
  resolveStoryCardText,
  STORY_CARD_MEDIA_META,
} from './utils/storyCard.utils'

const sx = style.storyCard

export default function StoryCardPreview({ active = false, onClick, story }) {
  const media = resolveStoryPrimaryMedia(story)
  const text = resolveStoryCardText(story)
  const hasText = Boolean(text)
  const hasMedia = media.kind !== STORY_MEDIA_KIND.NONE
  const cardKind = hasMedia ? media.kind : 'text'
  const previewText = hasText
    ? text
    : (media.name || (hasMedia ? `Story ${STORY_CARD_MEDIA_META[cardKind].label.toLowerCase()}` : 'Story'))
  const badge = STORY_CARD_MEDIA_META[cardKind] || STORY_CARD_MEDIA_META.text
  const BadgeIcon = badge.Icon
  return (
    <Box
      component={onClick ? 'button' : 'div'}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      sx={{
        ...sx.container(story),
        ...(onClick ? {
          p: 0,
          appearance: 'none',
          textAlign: 'left',
          backgroundColor: 'transparent',
        } : null),
        ...(active ? {
          borderColor: 'rgba(126,231,200,0.88)',
          boxShadow: '0 0 0 2px rgba(126,231,200,0.22), 0 14px 28px rgba(0,0,0,0.32)',
          transform: 'translateY(-2px)',
        } : null),
      }}
    >
      {hasMedia ? (
        <Box sx={sx.mediaWrap(hasText)}>
          {media.kind === STORY_MEDIA_KIND.IMAGE && media.src ? (
            <Box
              component="img"
              src={media.src}
              alt="Story image preview"
              sx={sx.media}
            />
          ) : null}

          {media.kind === STORY_MEDIA_KIND.VIDEO && media.src ? (
            <>
              <Box
                component="video"
                src={media.src}
                muted
                playsInline
                preload="metadata"
                sx={sx.media}
              />
              <Box sx={sx.videoBadge}>
                <PlayArrowRoundedIcon sx={sx.videoBadgeIcon} />
              </Box>
            </>
          ) : null}

          {media.kind === STORY_MEDIA_KIND.SOUND ? (
            <Box sx={sx.audioPreview}>
              <GraphicEqRoundedIcon sx={sx.audioPreviewIcon} />
            </Box>
          ) : null}
        </Box>
      ) : null}

      <Box sx={sx.overlay(hasMedia, hasText)} />

      <Box sx={sx.typeBadge}>
        <BadgeIcon sx={sx.typeBadgeIcon} />
        <Typography sx={sx.typeBadgeText}>{badge.label}</Typography>
      </Box>

      <Box sx={sx.contentWrap(hasMedia)}>
        <Typography sx={sx.text(hasMedia)}>{previewText}</Typography>
      </Box>
    </Box>
  )
}
