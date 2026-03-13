import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded'
import NotesRoundedIcon from '@mui/icons-material/NotesRounded'
import VideocamIcon from '@mui/icons-material/Videocam'
import { STORY_MEDIA_KIND } from '../../CreateStoryModal/storyComposer'

export const STORY_CARD_MEDIA_META = {
  [STORY_MEDIA_KIND.IMAGE]: { label: 'Anh', Icon: VideocamIcon },
  [STORY_MEDIA_KIND.VIDEO]: { label: 'Video', Icon: VideocamIcon },
  [STORY_MEDIA_KIND.SOUND]: { label: 'Am thanh', Icon: GraphicEqRoundedIcon },
  text: { label: 'Van ban', Icon: NotesRoundedIcon },
}

export function detectStoryCardMediaKind(type = '', src = '') {
  const normalizedType = String(type || '').toLowerCase()

  if (normalizedType === 'image' || normalizedType.startsWith('image/')) return STORY_MEDIA_KIND.IMAGE
  if (normalizedType === 'video' || normalizedType.startsWith('video/')) return STORY_MEDIA_KIND.VIDEO
  if (
    normalizedType === 'audio'
    || normalizedType === 'sound'
    || normalizedType.startsWith('audio/')
  ) {
    return STORY_MEDIA_KIND.SOUND
  }

  const normalizedSrc = String(src || '').toLowerCase()

  if (/\.(png|jpe?g|gif|webp|bmp|svg)(\?|$)/.test(normalizedSrc)) return STORY_MEDIA_KIND.IMAGE
  if (/\.(mp4|mov|webm|mkv|m4v)(\?|$)/.test(normalizedSrc)) return STORY_MEDIA_KIND.VIDEO
  if (/\.(mp3|wav|ogg|m4a|aac|flac)(\?|$)/.test(normalizedSrc)) return STORY_MEDIA_KIND.SOUND

  return STORY_MEDIA_KIND.NONE
}

export function resolveStoryPrimaryMedia(story = {}) {
  const firstMedia = Array.isArray(story.mediaFiles)
    ? (story.mediaFiles[0] || null)
    : (story.mediaFile || story.media || null)

  const src = firstMedia?.url || firstMedia?.mediaUrl || firstMedia?.fileUrl || firstMedia?.src || ''
  const type = firstMedia?.contentType || firstMedia?.mediaType || firstMedia?.type || firstMedia?.mimeType || ''
  const name = firstMedia?.name || firstMedia?.originalName || firstMedia?.fileName || ''

  return {
    file: firstMedia,
    kind: detectStoryCardMediaKind(type, src),
    name,
    src,
    type,
  }
}

export function resolveStoryCardText(story = {}) {
  const value = story?.text || story?.name || ''
  return typeof value === 'string' ? value.trim() : ''
}

export function formatStoryCardTime(value) {
  const date = value ? new Date(value) : null

  if (!date || Number.isNaN(date.getTime())) {
    return 'Vua xong'
  }

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
  }).format(date)
}

export function resolveStoryCardGradient(story = {}) {
  return story?.gradient || 'linear-gradient(160deg, #335C67 0%, #1B2A41 52%, #121826 100%)'
}
