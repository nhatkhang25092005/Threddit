import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { Box, Typography } from "@mui/material";
import { detailPost } from "../../../../../../constant/text/vi/post/detailpost.text";
import { style } from "../style";

const sx = style.modal;

export default function DetailPostModalCommentPlaceholder() {
  return (
    <Box sx={sx.commentPlaceholder}>
      <Box sx={sx.commentIconWrap}>
        <ChatBubbleOutlineRoundedIcon sx={sx.commentIcon} />
      </Box>

      <Typography sx={sx.commentTitle}>
        {detailPost.commentPlaceholderTitle}
      </Typography>

      <Typography sx={sx.commentDescription}>
        {detailPost.commentPlaceholderDescription}
      </Typography>
    </Box>
  );
}
