import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { Box, Typography } from "@mui/material";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import { style } from "../style";

const sx = style.list;

export default function CommentEmptyState({
  description = commentText.emptyDescription,
  title = commentText.emptyTitle,
}) {
  return (
    <Box sx={sx.emptyState}>
      <ChatBubbleOutlineRoundedIcon sx={sx.emptyIcon} />
      <Typography sx={sx.emptyTitle}>{title}</Typography>
      <Typography sx={sx.emptyDescription}>{description}</Typography>
    </Box>
  );
}
