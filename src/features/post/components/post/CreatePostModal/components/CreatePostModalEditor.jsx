import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { composerText } from "../../../../../../constant/text/vi/post/composer.text";

const editorWrapSx = {
  position: "relative",
  overflow: "visible",
};

const mediaSx = {
  width: "100%",
  borderRadius: "0.6rem",
  marginTop: "0.35rem",
  border: "1px solid",
  borderColor: (theme) =>
    theme.palette.mode === "dark" ? "#243041" : "#DADDE1",
};

const videoSx = {
  ...mediaSx,
  maxHeight: "22rem",
  backgroundColor: "#000000",
  objectFit: "contain",
};

const audioSx = {
  ...mediaSx,
  padding: "0.35rem",
  border: "none"
};

const mediaItemWrapSx = {
  position: "relative",
  marginTop: "0.75rem",
};

const audioItemWrapSx = {
  ...mediaItemWrapSx,
  pt: "2rem",
  borderRadius: "0.6rem",
  backgroundColor: (theme) =>
    theme.palette.mode === "dark" ? "#131F31" : "#F0F2F5",
};

const removeMediaButtonSx = {
  position: "absolute",
  right: "0.45rem",
  top: "0.45rem",
  zIndex: 2,
  width: "1.8rem",
  height: "1.8rem",
  backgroundColor: (theme) =>
    theme.palette.mode === "dark" ? "rgba(36,37,38,0.92)" : "rgba(255,255,255,0.92)",
  border: "1px solid",
  borderColor: (theme) => (theme.palette.mode === "dark" ? "#243041" : "#DADDE1"),
  "&:hover": {
    backgroundColor: (theme) =>
      theme.palette.mode === "dark" ? "rgba(58,59,60,0.96)" : "rgba(245,245,245,0.96)",
  },
};

const removeMediaIconSx = {
  fontSize: "1rem",
};

export default function CreatePostModalEditor({
  sx,
  mention,
  loading,
  images = [],
  videos = [],
  sounds = [],
  hasMedia,
  displayName,
  onRemoveImage = () => {},
  onRemoveVideo = () => {},
  onRemoveSound = () => {},
  placeholder = null,
  editorSx = null,
}) {
  return (
    <Box sx={editorWrapSx}>
      <Box
        component="textarea"
        placeholder={placeholder || composerText.post.editor.placeholder(displayName)}
        sx={{
          ...sx.editor(hasMedia),
          ...(editorSx || {})
        }}
        {...mention.bind}
        disabled={loading}
      />
      {mention.overlay}
      {images.map((image, index) =>
        image?.url ? (
          <Box key={`${image.url}-${index}`} sx={mediaItemWrapSx}>
            <IconButton
              aria-label={composerText.post.editor.removeImage}
              sx={removeMediaButtonSx}
              onClick={() => onRemoveImage(index)}
            >
              <CloseIcon sx={removeMediaIconSx} />
            </IconButton>
            <Box component="img" src={image.url} alt={composerText.post.editor.previewAlt} sx={{ ...sx.img, mt: 0 }} />
          </Box>
        ) : null
      )}
      {videos.map((video, index) =>
        video?.url ? (
          <Box key={`${video.url}-${index}`} sx={mediaItemWrapSx}>
            <IconButton
              aria-label={composerText.post.editor.removeVideo}
              sx={removeMediaButtonSx}
              onClick={() => onRemoveVideo(index)}
            >
              <CloseIcon sx={removeMediaIconSx} />
            </IconButton>
            <Box
              component="video"
              src={video.url}
              controls
              preload="metadata"
              sx={{ ...videoSx, mt: 0 }}
            />
          </Box>
        ) : null
      )}
      {sounds.map((sound, index) =>
        sound?.url ? (
          <Box key={`${sound.url}-${index}`} sx={audioItemWrapSx}>
            <IconButton
              aria-label={composerText.post.editor.removeSound}
              sx={removeMediaButtonSx}
              onClick={() => onRemoveSound(index)}
            >
              <CloseIcon sx={removeMediaIconSx} />
            </IconButton>
            <Box
              component="audio"
              src={sound.url}
              controls
              preload="metadata"
              sx={{ ...audioSx, mt: 0 }}
            />
          </Box>
        ) : null
      )}
    </Box>
  );
}
