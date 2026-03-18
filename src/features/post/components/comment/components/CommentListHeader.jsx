import { Box, Typography } from "@mui/material";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import { formatCommentCount } from "../utils/comment.utils";
import { style } from "../style";

const sx = style.list;

export default function CommentListHeader({ totalCount }) {
  return (
    <Box sx={sx.header}>
      <Box sx={sx.headerMeta}>
        <Box sx={sx.titleRow}>
          <Typography sx={sx.title}>{commentText.sectionTitle}</Typography>
          <Box component="span" sx={sx.count}>
            {formatCommentCount(totalCount)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
