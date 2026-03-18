import { Box } from "@mui/material";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import { partitionCommentMedia } from "../utils/comment.utils";
import { style } from "../style";

const sx = style.list;

export default function CommentMediaList({ items = [] }) {
  const { audio, visual } = partitionCommentMedia(items);

  if (visual.length === 0 && audio.length === 0) {
    return null;
  }

  return (
    <Box sx={sx.mediaList}>
      {visual.length > 0 ? (
        <Box sx={sx.mediaGrid(visual.length)}>
          {visual.map((item) => (
            <Box key={item.id} sx={sx.mediaVisualItem}>
              {item.type === "video" ? (
                <Box
                  component="video"
                  controls
                  preload="metadata"
                  src={item.url}
                  sx={sx.mediaVisual}
                />
              ) : (
                <Box
                  alt={commentText.mediaAlt}
                  component="img"
                  src={item.url}
                  sx={sx.mediaVisual}
                />
              )}
            </Box>
          ))}
        </Box>
      ) : null}

      {audio.map((item) => (
        <Box key={item.id} sx={sx.mediaAudioItem}>
          <Box component="audio" controls preload="metadata" src={item.url} sx={sx.mediaAudio} />
        </Box>
      ))}
    </Box>
  );
}
