import { Box, IconButton, Slider, Typography } from "@mui/material";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { story } from "../../../../../../constant/text/vi/story";
import { style } from "../../style";
import { formatStoryDuration } from "../storyComposer";

const PREVIEW_TEXT = story.createStoryModal.preview;
const sx = style.createStoryModal.preview;

export default function CreateStoryPlaybackControls({
  isPaused,
  playbackSeconds,
  progressSeconds,
  onProgressChange,
  onTogglePlayback,
}) {
  return (
    <Box sx={sx.playbackControls}>
      <IconButton
        onClick={onTogglePlayback}
        aria-label={isPaused ? PREVIEW_TEXT.playLabel : PREVIEW_TEXT.pauseLabel}
        title={isPaused ? PREVIEW_TEXT.playLabel : PREVIEW_TEXT.pauseLabel}
        sx={sx.playbackToggle}
      >
        {isPaused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
      </IconButton>

      <Box sx={sx.playbackTimeline}>
        <Slider
          min={0}
          max={playbackSeconds}
          step={1}
          value={progressSeconds}
          onChange={onProgressChange}
          aria-label={PREVIEW_TEXT.progressLabel}
          sx={sx.playbackSlider}
        />

        <Box sx={sx.playbackTimeRow}>
          <Typography sx={sx.playbackTimeValue}>
            {formatStoryDuration(progressSeconds)}
          </Typography>
          <Typography sx={sx.playbackTimeValue}>
            {formatStoryDuration(playbackSeconds)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
