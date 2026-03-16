import { Box, IconButton, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VideocamIcon from "@mui/icons-material/Videocam";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Emoji from "../../../reaction/Emoji";
import MediaInput from "./MediaInput";

const mediaInputSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const videoIconSx = {
  color: "#F5533D",
  fontSize: "1.35rem",
};

const audioIconSx = {
  color: "#8E44FF",
  fontSize: "1.35rem",
};

export default function CreatePostModalActionBar({
  sx,
  mention,
  onUploadImage,
  onUploadVideo,
  onUploadSound,
  onOpenMentionList,
  label = "Thêm vào bài viết của bạn",
  showImageUpload = true,
  showVideoUpload = true,
  showSoundUpload = true,
}) {
  return (
    <Box sx={sx.addToPostContainer}>
      <Typography sx={sx.addToPostLabel}>{label}</Typography>

      <Box sx={sx.actionList}>
        {showImageUpload ? (
          <MediaInput multiple accept="image/*" onChange={onUploadImage} sx={mediaInputSx}>
            <IconButton component="span" sx={sx.actionIconButton} aria-label="Them anh">
              <AddPhotoAlternateIcon sx={sx.photoIcon} />
            </IconButton>
          </MediaInput>
        ) : null}

        {showVideoUpload ? (
          <MediaInput multiple accept="video/*" onChange={onUploadVideo} sx={mediaInputSx}>
            <IconButton component="span" sx={sx.actionIconButton} aria-label="Them video">
              <VideocamIcon sx={videoIconSx} />
            </IconButton>
          </MediaInput>
        ) : null}

        {showSoundUpload ? (
          <MediaInput multiple accept="audio/*" onChange={onUploadSound} sx={mediaInputSx}>
            <IconButton component="span" sx={sx.actionIconButton} aria-label="Them am thanh">
              <MusicNoteIcon sx={audioIconSx} />
            </IconButton>
          </MediaInput>
        ) : null}

        <IconButton
          sx={sx.actionIconButton}
          onClick={onOpenMentionList}
          aria-label="Tag ban be"
        >
          <PersonAddAlt1Icon sx={sx.tagIcon} />
        </IconButton>

        <Box sx={{ ...sx.actionIconButton, justifyContent: "center" }}>
          <Emoji mention={mention} />
        </Box>
      </Box>
    </Box>
  );
}
