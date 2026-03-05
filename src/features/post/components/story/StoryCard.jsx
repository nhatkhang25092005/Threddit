import { Box, Typography } from '@mui/material'
// import ImageOutlinedRoundedIcon from '@mui/icons-material/ImageOutlinedRounded'
import VideocamIcon from '@mui/icons-material/Videocam';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded'
import NotesRoundedIcon from '@mui/icons-material/NotesRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { style } from './style'

const sx = style.storyCard

const MEDIA_KIND = {
  image: 'image',
  video: 'video',
  audio: 'audio',
  unknown: 'unknown',
}

const MEDIA_META = {
  image: { label: 'Anh', Icon: VideocamIcon },
  video: { label: 'Video', Icon: VideocamIcon },
  audio: { label: 'Am thanh', Icon: GraphicEqRoundedIcon },
  text: { label: 'Van ban', Icon: NotesRoundedIcon },
}

const detectMediaKind = (type = '', src = '') => {
  const normalizedType = String(type || '').toLowerCase()
  if (normalizedType.startsWith('image/')) return MEDIA_KIND.image
  if (normalizedType.startsWith('video/')) return MEDIA_KIND.video
  if (normalizedType.startsWith('audio/')) return MEDIA_KIND.audio

  const normalizedSrc = String(src || '').toLowerCase()
  if (/\.(png|jpe?g|gif|webp|bmp|svg)(\?|$)/.test(normalizedSrc)) return MEDIA_KIND.image
  if (/\.(mp4|mov|webm|mkv|m4v)(\?|$)/.test(normalizedSrc)) return MEDIA_KIND.video
  if (/\.(mp3|wav|ogg|m4a|aac|flac)(\?|$)/.test(normalizedSrc)) return MEDIA_KIND.audio

  return MEDIA_KIND.unknown
}

const resolvePrimaryMedia = (story = {}) => {
  const firstMedia = Array.isArray(story.mediaFiles)
    ? (story.mediaFiles[0] || null)
    : (story.mediaFile || story.media || null)

  const src = firstMedia?.url || firstMedia?.mediaUrl || firstMedia?.fileUrl || firstMedia?.src || ''
  const type = firstMedia?.contentType || firstMedia?.mediaType || firstMedia?.type || firstMedia?.mimeType || ''
  const name = firstMedia?.name || firstMedia?.originalName || firstMedia?.fileName || ''

  return {
    src,
    type,
    name,
    kind: detectMediaKind(type, src),
  }
}

const resolveStoryText = (story = {}) => {
  const value = story?.text || story?.name || ''
  return typeof value === 'string' ? value.trim() : ''
}

export default function StoryCard({ story }) {
  const media = resolvePrimaryMedia(story)
  const text = resolveStoryText(story)
  const hasText = Boolean(text)
  const hasMedia = media.kind !== MEDIA_KIND.unknown
  const cardKind = hasMedia ? media.kind : 'text'
  const previewText = hasText
    ? text
    : (media.name || (hasMedia ? `Story ${MEDIA_META[cardKind].label.toLowerCase()}` : 'Story'))
  const badge = MEDIA_META[cardKind] || MEDIA_META.text
  const BadgeIcon = badge.Icon

  return (
    <Box sx={sx.container(story)}>
      {hasMedia && (
        <Box sx={sx.mediaWrap(hasText)}>
          {media.kind === MEDIA_KIND.image && media.src && (
            <Box
              component="img"
              src={media.src}
              alt="Story image preview"
              sx={sx.media}
            />
          )}

          {media.kind === MEDIA_KIND.video && media.src && (
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
          )}

          {media.kind === MEDIA_KIND.audio && (
            <Box sx={sx.audioPreview}>
              <GraphicEqRoundedIcon sx={sx.audioPreviewIcon} />
            </Box>
          )}
        </Box>
      )}

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
