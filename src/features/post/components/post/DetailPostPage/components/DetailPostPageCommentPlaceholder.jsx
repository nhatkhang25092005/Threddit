import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { Box, Typography } from "@mui/material";
import { detailPostPage } from "../../../../../../constant/text/vi/post/detailpostpage.text";
import { style } from "../style";

const sx = style.page;

export default function DetailPostPageCommentPlaceholder() {
  return (
    <Box sx={sx.commentPlaceholder}>
      <Box sx={sx.commentIconWrap}>
        <ChatBubbleOutlineRoundedIcon sx={sx.commentIcon} />
      </Box>

      <Typography sx={sx.commentTitle}>
        {detailPostPage.commentPlaceholderTitle}
      </Typography>

      <Typography sx={sx.commentDescription}>
        {detailPostPage.commentPlaceholderDescription}
      </Typography>
    </Box>
  );
}
