import { useCallback, useMemo, useState } from 'react'
import {
  STORY_MODE,
  formatStoryDuration,
  getPlaybackSeconds,
  isStoryDescriptionBelowMedia,
  isTimedStoryMedia,
  resolveStoryMode,
  shouldRenderStoryTextOnCanvas,
} from '../../CreateStoryModal/storyComposer'
import { useStoryPreviewPlayback } from '../../CreateStoryModal/hooks/useStoryPreviewPlayback'
import {
  resolveStoryPrimaryMedia,
  resolveStoryCardText,
} from '../utils/storyCard.utils'

export function useStoryCardViewer({ onNext, story }) {
  const [sourceDurationSeconds, setSourceDurationSeconds] = useState(0)

  const media = useMemo(() => resolveStoryPrimaryMedia(story), [story])
  const trimmedText = useMemo(() => resolveStoryCardText(story), [story])
  const mode = useMemo(
    () => resolveStoryMode({ text: trimmedText, mediaKind: media.kind }),
    [media.kind, trimmedText]
  )
  const playbackSeconds = useMemo(
    () => getPlaybackSeconds({
      mediaKind: media.kind,
      sourceDuration: sourceDurationSeconds,
    }),
    [media.kind, sourceDurationSeconds]
  )

  const showPlaceholder = mode === STORY_MODE.EMPTY
  const showTextOnCanvas = shouldRenderStoryTextOnCanvas(mode) && Boolean(trimmedText)
  const showBelowText = isStoryDescriptionBelowMedia(mode) && Boolean(trimmedText)
  const isTimedPreview = isTimedStoryMedia(media.kind)
  const durationLabel = isTimedPreview && !sourceDurationSeconds
    ? 'Dang doc...'
    : formatStoryDuration(playbackSeconds)

  const playback = useStoryPreviewPlayback({
    loop: false,
    mediaKind: media.kind,
    mediaUrl: media.src,
    mode,
    onComplete: onNext,
    playbackSeconds,
  })

  const progressPercent = playbackSeconds > 0
    ? Math.min((playback.progressSeconds / playbackSeconds) * 100, 100)
    : 0

  const handleMetadataLoaded = useCallback((event) => {
    const { duration } = event.currentTarget

    if (Number.isFinite(duration) && duration > 0) {
      setSourceDurationSeconds(duration)
    }
  }, [])

  return {
    durationLabel,
    handleMetadataLoaded,
    media,
    mode,
    playback,
    playbackSeconds,
    progressPercent,
    showBelowText,
    showPlaceholder,
    showTextOnCanvas,
    text: trimmedText,
  }
}
