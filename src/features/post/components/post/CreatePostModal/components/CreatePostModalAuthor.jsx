import { Avatar, Box, Typography } from "@mui/material";

export default function CreatePostModalAuthor({ sx, avatarUrl, displayName }) {
  return (
    <Box sx={sx.authorRow}>
      <Avatar src={avatarUrl} sx={sx.avatar} />
      <Typography sx={sx.authorName}>{displayName}</Typography>
    </Box>
  );
}
