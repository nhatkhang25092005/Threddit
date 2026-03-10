import { Box, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import Surface from "../../../../../../components/common/Surface";
import { story } from "../../../../../../constant/text/vi/story";
import { style } from "../../style";
import {
  STORY_MEDIA_KIND,
  STORY_MODE,
  formatStoryDuration,
  getStoryModeLabel,
  isStoryDescriptionBelowMedia,
  isTimedStoryMedia,
  isVisualStoryMedia,
  shouldRenderStoryTextOnCanvas,
} from "../storyComposer";
import { useStoryPreviewData, useStoryPreviewPlayback } from "../hooks";
import CreateStoryPlaybackControls from "./CreateStoryPlaybackControls";

const PREVIEW_TEXT = story.createStoryModal.preview;
const LOADING_DURATION_TEXT = story.createStoryModal.loadingDuration;
const sx = style.createStoryModal.preview;

export default function CreateStoryPreview() {
  const {
    handleMediaMetadata,
    media,
    mode,
    playbackSeconds,
    sourceDurationSeconds,
    text,
  } = useStoryPreviewData();
  const trimmedText = String(text || "").trim();
  const showPlaceholder = mode === STORY_MODE.EMPTY;
  const showTextOnCanvas = shouldRenderStoryTextOnCanvas(mode) && Boolean(trimmedText);
  const showBelowText = isStoryDescriptionBelowMedia(mode) && Boolean(trimmedText);
  const showSoundPanel = media?.kind === STORY_MEDIA_KIND.SOUND;
  const showSoundCanvas = showSoundPanel && !trimmedText;
  const isTimedPreview = isTimedStoryMedia(media?.kind);
  const durationLabel = isTimedPreview && !sourceDurationSeconds
    ? LOADING_DURATION_TEXT
    : formatStoryDuration(playbackSeconds);

  const {
    audioRef,
    handleProgressChange,
    handleTimedMediaProgress,
    handleTogglePlayback,
    isPaused,
    progressSeconds,
    showPlaybackControls,
    videoRef,
  } = useStoryPreviewPlayback({
    mediaKind: media?.kind,
    mediaUrl: media?.url,
    mode,
    playbackSeconds,
  });

  function handleMetadataLoaded(event) {
    const { duration } = event.currentTarget;

    if (Number.isFinite(duration) && duration > 0) {
      handleMediaMetadata(duration);
    }
  }

  return (
    <Box sx={sx.column}>
      <Surface sx={sx.panel}>
        <Typography sx={sx.sectionEyebrow}>{PREVIEW_TEXT.eyebrow}</Typography>

        <Box sx={sx.metaRow}>
          <Box sx={sx.metaPill}>{getStoryModeLabel(mode)}</Box>
          <Box sx={sx.metaPill}>{PREVIEW_TEXT.playbackPrefix(durationLabel)}</Box>
        </Box>

        <Box sx={sx.stage}>
          <Box sx={sx.phone}>
            <Box sx={sx.canvasWrap}>
              <Box sx={sx.canvas}>
                {isVisualStoryMedia(media?.kind) && media?.url ? (
                  media.kind === STORY_MEDIA_KIND.IMAGE ? (
                    <Box
                      component="img"
                      src={media.url}
                      alt={PREVIEW_TEXT.imageAlt}
                      sx={sx.media}
                    />
                  ) : (
                    <Box
                      ref={videoRef}
                      component="video"
                      src={media.url}
                      muted
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={handleMetadataLoaded}
                      onTimeUpdate={handleTimedMediaProgress}
                      sx={sx.media}
                    />
                  )
                ) : null}

                {showPlaceholder ? (
                  <Box sx={sx.placeholder}>
                    <Box sx={sx.placeholderIcon}>
                      <AutoAwesomeRoundedIcon />
                    </Box>
                    <Typography sx={sx.placeholderText}>{PREVIEW_TEXT.placeholder}</Typography>
                  </Box>
                ) : null}

                {showTextOnCanvas ? (
                  <Typography sx={sx.canvasText}>{trimmedText}</Typography>
                ) : null}

                {showSoundCanvas ? (
                  <Box sx={sx.audioCanvas}>
                    <Box sx={sx.audioIconWrap}>
                      <GraphicEqRoundedIcon fontSize="large" />
                    </Box>
                    <Typography sx={sx.audioCanvasTitle}>{PREVIEW_TEXT.soundCanvasTitle}</Typography>
                  </Box>
                ) : null}

                {mode === STORY_MODE.TEXT && trimmedText ? (
                  <Box sx={sx.textModeIcon}>
                    <NotesRoundedIcon fontSize="small" />
                  </Box>
                ) : null}
              </Box>
            </Box>

            {showPlaybackControls ? (
              <CreateStoryPlaybackControls
                isPaused={isPaused}
                playbackSeconds={playbackSeconds}
                progressSeconds={progressSeconds}
                onProgressChange={handleProgressChange}
                onTogglePlayback={handleTogglePlayback}
              />
            ) : null}

            {showBelowText ? (
              <Box sx={sx.belowText}>
                <Typography sx={sx.belowTextLabel}>{PREVIEW_TEXT.descriptionLabel}</Typography>
                <Typography sx={sx.belowTextValue}>{trimmedText}</Typography>
              </Box>
            ) : null}

            {showSoundPanel ? (
              <Box sx={sx.soundPanel}>
                <Box sx={sx.soundPanelIcon}>
                  <GraphicEqRoundedIcon />
                </Box>

                <Box sx={sx.soundMeta}>
                  <Typography sx={sx.soundTitle}>
                    {media?.file?.name || PREVIEW_TEXT.defaultAudioTitle}
                  </Typography>
                  <Typography sx={sx.soundCaption}>
                    {PREVIEW_TEXT.soundAutoplayCaption(durationLabel)}
                  </Typography>
                </Box>

                <Box sx={sx.soundWave} />

                <Box
                  ref={audioRef}
                  component="audio"
                  src={media?.url}
                  preload="metadata"
                  onLoadedMetadata={handleMetadataLoaded}
                  onTimeUpdate={handleTimedMediaProgress}
                  sx={{ display: "none" }}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
      </Surface>
    </Box>
  );
}
