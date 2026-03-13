import { Box, IconButton, Typography } from '@mui/material'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import NotesRoundedIcon from '@mui/icons-material/NotesRounded'
import CreateStoryPlaybackControls from '../CreateStoryModal/components/CreateStoryPlaybackControls'
import {
  STORY_MEDIA_KIND,
  STORY_MODE,
  isVisualStoryMedia,
} from '../CreateStoryModal/storyComposer'
import { style } from '../style'
import { storyCardViewerSx as sx } from './storyCardViewer.styles'
import { resolveStoryCardGradient } from './utils/storyCard.utils'

const composerSx = style.createStoryModal.preview

export default function StoryCardViewerStage({
  canGoNext = false,
  canGoPrev = false,
  onNext,
  onPrev,
  viewer,
}) {
  const {
    handleMetadataLoaded,
    media,
    mode,
    playback,
    playbackSeconds,
    showBelowText,
    showPlaceholder,
    showTextOnCanvas,
    story,
    text,
  } = viewer

  return (
    <Box sx={sx.stage}>
      <IconButton
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label="Previous story"
        sx={sx.navButton}
      >
        <ChevronLeftRoundedIcon />
      </IconButton>

      <Box sx={sx.viewerColumn}>
        <Box sx={sx.phone}>
          <Box sx={{ ...composerSx.canvasWrap, ...sx.canvasWrap }}>
            <Box
              sx={{
                ...composerSx.canvas,
                ...sx.canvas,
                background: media.kind === STORY_MEDIA_KIND.NONE
                  ? resolveStoryCardGradient(story)
                  : composerSx.canvas.backgroundColor,
              }}
            >
              {isVisualStoryMedia(media.kind) && media.src ? (
                media.kind === STORY_MEDIA_KIND.IMAGE ? (
                  <Box
                    component="img"
                    src={media.src}
                    alt="Story media"
                    sx={composerSx.media}
                  />
                ) : (
                  <Box
                    ref={playback.videoRef}
                    component="video"
                    src={media.src}
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={handleMetadataLoaded}
                    onTimeUpdate={playback.handleTimedMediaProgress}
                    sx={composerSx.media}
                  />
                )
              ) : null}

              {showPlaceholder ? (
                <Box sx={composerSx.placeholder}>
                  <Box sx={composerSx.placeholderIcon}>
                    <NotesRoundedIcon />
                  </Box>
                  <Typography sx={composerSx.placeholderText}>Story trong</Typography>
                </Box>
              ) : null}

              {showTextOnCanvas ? (
                <Typography sx={composerSx.canvasText}>{text}</Typography>
              ) : null}

              {mode === STORY_MODE.TEXT && text ? (
                <Box sx={composerSx.textModeIcon}>
                  <NotesRoundedIcon fontSize="small" />
                </Box>
              ) : null}
            </Box>
          </Box>

          {showBelowText ? (
            <Box sx={{ ...composerSx.belowText, ...sx.belowText }}>
              <Typography sx={composerSx.belowTextLabel}>Van ban</Typography>
              <Typography sx={{ ...composerSx.belowTextValue, ...sx.belowTextValue }}>
                {text}
              </Typography>
            </Box>
          ) : null}

          {media.kind === STORY_MEDIA_KIND.SOUND ? (
            <Box
              ref={playback.audioRef}
              component="audio"
              src={media.src}
              preload="metadata"
              onLoadedMetadata={handleMetadataLoaded}
              onTimeUpdate={playback.handleTimedMediaProgress}
              sx={{ display: 'none' }}
            />
          ) : null}

          {playback.showPlaybackControls ? (
            <Box sx={sx.controlsDock}>
              <CreateStoryPlaybackControls
                isPaused={playback.isPaused}
                playbackSeconds={playbackSeconds}
                progressSeconds={playback.progressSeconds}
                onProgressChange={playback.handleProgressChange}
                onTogglePlayback={playback.handleTogglePlayback}
              />
            </Box>
          ) : null}
        </Box>
      </Box>

      <IconButton
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next story"
        sx={sx.navButton}
      >
        <ChevronRightRoundedIcon />
      </IconButton>
    </Box>
  )
}
