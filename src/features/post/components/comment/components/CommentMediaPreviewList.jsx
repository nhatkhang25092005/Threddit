import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, IconButton } from "@mui/material";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import { partitionCommentMedia } from "../utils/comment.utils";
import { style } from "../style";

const sx = style.list;

export default function CommentMediaPreviewList({ items = [], onRemove }) {
  const { audio, visual } = partitionCommentMedia(items);

  if (visual.length === 0 && audio.length === 0) {
    return null;
  }

  return (
    <Box sx={sx.mediaPreviewList}>
      {[...visual, ...audio].map((item) => (
        <Box key={item.id} sx={sx.mediaPreviewItem}>
          <IconButton onClick={() => onRemove?.(item.id)} sx={sx.mediaPreviewRemove}>
            <CloseRoundedIcon sx={{ fontSize: "1rem" }} />
          </IconButton>

          {item.type === "audio" ? (
            <Box sx={sx.mediaPreviewAudioWrap}>
              <Box component="audio" controls preload="metadata" src={item.url} sx={sx.mediaPreviewAudio} />
            </Box>
          ) : item.type === "video" ? (
            <Box component="video" controls preload="metadata" src={item.url} sx={sx.mediaPreviewVisual} />
          ) : (
            <Box alt={commentText.mediaAlt} component="img" src={item.url} sx={sx.mediaPreviewVisual} />
          )}
        </Box>
      ))}
    </Box>
  );
}
