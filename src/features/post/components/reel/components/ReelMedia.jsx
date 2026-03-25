import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import { Box, IconButton, Typography } from "@mui/material";
import { useReelPlayback } from "../hooks";
import { style } from "../style";
import {
  isVideoMedia,
  resolvePrimaryMedia,
  resolveVisualMedia,
} from "../utils";
import ReelHeader from "./ReelHeader";
import ReelMeta from "./ReelMeta";

export default function ReelMedia({
  isActive = false,
  isCondensed = false,
  reel,
}) {
  const mediaFiles = reel?.mediaFiles ?? []
  const media = resolvePrimaryMedia(mediaFiles)
  const mediaCount = resolveVisualMedia(mediaFiles).length
  const captionText = typeof reel?.text === "string" ? reel.text.trim() : ""
  const hasText = Boolean(captionText)
  const isVideo = isVideoMedia(media)
  const {
    handleLoadedMetadata,
    handleProgressSeek,
    handleTimeUpdate,
    handleToggleMuted,
    handleTogglePlayback,
    isMuted,
    isPaused,
    progress,
    videoRef,
  } = useReelPlayback({
    isActive,
    isVideo,
    mediaUrl: media?.url,
  })

  if (!media?.url) {
    return (
      <Box sx={style.mediaPlaceholder}>
        <Box
          sx={[
            style.mediaPlaceholderInner,
            isCondensed ? style.mediaPlaceholderInnerCondensed : null,
          ]}
        >
          <PhotoLibraryRoundedIcon sx={{ fontSize: "2.8rem" }} />
          <Typography fontWeight={800}>Reel Preview</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: "0.9rem" }}>
            Chua co video de hien thi
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      onClick={isVideo ? handleTogglePlayback : undefined}
      sx={[
        style.mediaWrap,
        isCondensed ? style.mediaWrapCondensed : null,
        isVideo ? style.mediaInteractive : null,
      ]}
    >
      {mediaCount > 1 ? (
        <Box sx={style.mediaCountBadge}>+{mediaCount} media</Box>
      ) : null}

      {isVideo ? (
        <>
          <Box sx={style.videoControlRow}>
            <IconButton
              aria-label={isPaused ? "Play video" : "Pause video"}
              onClick={handleTogglePlayback}
              sx={style.videoControlButton}
            >
              {isPaused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
            </IconButton>

            <IconButton
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              onClick={handleToggleMuted}
              sx={style.videoControlButton}
            >
              {isMuted ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
            </IconButton>
          </Box>

          <Box
            autoPlay
            component="video"
            loop
            muted={isMuted}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            playsInline
            preload="metadata"
            ref={videoRef}
            src={media.url}
            sx={[
              style.mediaElement,
              isCondensed ? style.mediaElementCondensed : null,
            ]}
          />
        </>
      ) : (
        <Box
          alt={media.originalName || "Reel media"}
          component="img"
          loading="lazy"
          src={media.url}
          sx={[
            style.mediaElement,
            isCondensed ? style.mediaElementCondensed : null,
          ]}
        />
      )}

      <Box
        onClick={(event) => event.stopPropagation()}
        sx={style.infoLayer}
      >
        <Box sx={[style.infoPanel, hasText ? style.infoPanelWithText : null]}>
          <Box sx={style.infoHeaderSection}>
            <ReelHeader author={reel?.author} />
          </Box>

          {hasText ? (
            <Box sx={style.infoTextSection}>
              <ReelMeta text={captionText} />
            </Box>
          ) : null}
        </Box>
      </Box>

      {isVideo ? (
        <Box onClick={handleProgressSeek} sx={style.progressBarWrap}>
          <Box sx={style.progressBarTrack}>
            <Box
              sx={{
                ...style.progressBarFill,
                width: `${progress}%`,
              }}
            />
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}
