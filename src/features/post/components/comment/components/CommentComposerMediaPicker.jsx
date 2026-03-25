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

function ToolButton({ children, compact = false }) {
  return <Box sx={sx.composerToolButton(compact)}>{children}</Box>;
}

export default function CommentComposerMediaPicker({
  compact = false,
  onPickAudio,
  onPickImage,
  onPickVideo,
}) {
  return (
    <Box sx={sx.composerMediaTools(compact)}>
      <ImageInput onClick={onPickImage}>
        <ToolButton compact={compact}>
          <InsertPhotoOutlinedIcon sx={{ color: "#45BD62", fontSize: compact ? "0.98rem" : "1.1rem" }} />
          <Typography component="span" sx={sx.composerToolLabel(compact)}>
            {commentText.mediaImageLabel}
          </Typography>
        </ToolButton>
      </ImageInput>

      <VideoInput onClick={onPickVideo}>
        <ToolButton compact={compact}>
          <VideocamOutlinedIcon sx={{ color: "#3B82F6", fontSize: compact ? "0.98rem" : "1.1rem" }} />
          <Typography component="span" sx={sx.composerToolLabel(compact)}>
            {commentText.mediaVideoLabel}
          </Typography>
        </ToolButton>
      </VideoInput>

      <SoundInput onClick={onPickAudio}>
        <ToolButton compact={compact}>
          <GraphicEqRoundedIcon sx={{ color: "#22C55E", fontSize: compact ? "0.98rem" : "1.1rem" }} />
          <Typography component="span" sx={sx.composerToolLabel(compact)}>
            {commentText.mediaAudioLabel}
          </Typography>
        </ToolButton>
      </SoundInput>
    </Box>
  );
}
