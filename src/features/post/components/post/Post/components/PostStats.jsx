import { Box, Typography } from "@mui/material";
import { post } from "../../../../../../constant/text/vi/post/post";

export default function PostStats({
  sx,
  reactionNumber,
  commentNumber,
  shareNumber,
  formatCount,
  saveNumber
}) {
  return (
    <Box sx={sx.section}>
      <Box sx={sx.stats}>
        <Box sx={sx.reactWrap}>
          <Typography component="span" sx={{ fontSize: "inherit" }}>
            {`${formatCount(reactionNumber)} ${post.statsReaction}`}
          </Typography>
        </Box>

        <Box sx={sx.statsRight}>
          <Typography component="span" sx={{ fontSize: "inherit" }}>
            {`${formatCount(saveNumber)} ${post.statsSave}`}
          </Typography>
          <Typography component="span" sx={{ fontSize: "inherit" }}>
            {`${formatCount(commentNumber)} ${post.statsComment}`}
          </Typography>
          <Typography component="span" sx={{ fontSize: "inherit" }}>
            {`${formatCount(shareNumber)} ${post.statsShare}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
