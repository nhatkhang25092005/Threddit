import { Box, Typography } from "@mui/material";

export default function PostText({ sx, text }) {
  if (!text) return null;

  return (
    <Box sx={sx.section}>
      <Typography sx={sx.text}>{text}</Typography>
    </Box>
  );
}
