import { Box, Typography } from "@mui/material";

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
            {`${formatCount(reactionNumber)} lượt tương tác`}
          </Typography>
        </Box>

        <Box sx={sx.statsRight}>
          <Typography component="span" sx={{ fontSize: "inherit" }}>
            {formatCount(saveNumber)} Lượt lưu
          </Typography>
          <Typography component="span" sx={{ fontSize: "inherit" }}>
            {formatCount(commentNumber)} bình luận
          </Typography>
          <Typography component="span" sx={{ fontSize: "inherit" }}>
            {formatCount(shareNumber)} lượt chia sẻ
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
