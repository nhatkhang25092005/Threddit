import { Box, IconButton, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VideocamIcon from "@mui/icons-material/Videocam";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Emoji from "../../../reaction/Emoji";
import { composerText } from "../../../../../../constant/text/vi/post/composer.text";
import MediaInput from "./MediaInput";

const mediaInputSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const videoIconSx = {
  color: "#22C55E",
  fontSize: "1.35rem",
};

const audioIconSx = {
  color: "#00F2FF",
  fontSize: "1.35rem",
};

export default function CreatePostModalActionBar({
  sx,
  mention,
  onUploadImage,
  onUploadVideo,
  onUploadSound,
  onOpenMentionList,
  label = composerText.post.actionBarLabel,
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
            <IconButton component="span" sx={sx.actionIconButton} aria-label={composerText.post.actionAria.addImage}>
              <AddPhotoAlternateIcon sx={sx.photoIcon} />
            </IconButton>
          </MediaInput>
        ) : null}

        {showVideoUpload ? (
          <MediaInput multiple accept="video/*" onChange={onUploadVideo} sx={mediaInputSx}>
            <IconButton component="span" sx={sx.actionIconButton} aria-label={composerText.post.actionAria.addVideo}>
              <VideocamIcon sx={videoIconSx} />
            </IconButton>
          </MediaInput>
        ) : null}

        {showSoundUpload ? (
          <MediaInput multiple accept="audio/*" onChange={onUploadSound} sx={mediaInputSx}>
            <IconButton component="span" sx={sx.actionIconButton} aria-label={composerText.post.actionAria.addSound}>
              <MusicNoteIcon sx={audioIconSx} />
            </IconButton>
          </MediaInput>
        ) : null}

        <IconButton
          sx={sx.actionIconButton}
          onClick={onOpenMentionList}
          aria-label={composerText.post.actionAria.tagFriends}
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
