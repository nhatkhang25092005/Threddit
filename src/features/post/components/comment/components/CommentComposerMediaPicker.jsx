import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { Box, Typography } from "@mui/material";
import ImageInput from "../../../../../components/common/input/ImageInput";
import SoundInput from "../../../../../components/common/input/SoundInput";
import VideoInput from "../../../../../components/common/input/VideoInput";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import { style } from "../style";

const sx = style.list;

function ToolButton({ children }) {
  return <Box sx={sx.composerToolButton}>{children}</Box>;
}

export default function CommentComposerMediaPicker({
  onPickAudio,
  onPickImage,
  onPickVideo,
}) {
  return (
    <Box sx={sx.composerTools}>
      <ImageInput multiple onClick={onPickImage}>
        <ToolButton>
          <InsertPhotoOutlinedIcon sx={{ color: "#45BD62", fontSize: "1.1rem" }} />
          <Typography component="span" sx={sx.composerToolLabel}>
            {commentText.mediaImageLabel}
          </Typography>
        </ToolButton>
      </ImageInput>

      <VideoInput multiple onClick={onPickVideo}>
        <ToolButton>
          <VideocamOutlinedIcon sx={{ color: "#1877F2", fontSize: "1.1rem" }} />
          <Typography component="span" sx={sx.composerToolLabel}>
            {commentText.mediaVideoLabel}
          </Typography>
        </ToolButton>
      </VideoInput>

      <SoundInput multiple onClick={onPickAudio}>
        <ToolButton>
          <GraphicEqRoundedIcon sx={{ color: "#F5533D", fontSize: "1.1rem" }} />
          <Typography component="span" sx={sx.composerToolLabel}>
            {commentText.mediaAudioLabel}
          </Typography>
        </ToolButton>
      </SoundInput>
    </Box>
  );
}
