import { Box, Typography } from "@mui/material";

export default function PostText({postId,  sx, text }) {
  if (!text) return null;

  return (
    <Box sx={sx.section}>
      <Typography data-testid={`text-content-of-${postId}`} sx={sx.text}>{text}</Typography>
    </Box>
  );
}
