import { Avatar, Box, IconButton, Typography } from "@mui/material";

import PostMenu from "./PostMenu";
export default function PostHeader({ sx, author, createdAt, postId }) {
  return (
    <Box sx={{ ...sx.section, ...sx.header }}>
      <Box sx={sx.authorWrap}>
        <Avatar src={author?.avatarUrl} sx={sx.avatar} />
        <Box sx={sx.authorMeta}>
          <Typography sx={sx.authorName}>{author?.displayName || "Unknown"}</Typography>
          <Box sx={sx.subMeta}>
            <Typography component="span" sx={{ fontSize: "inherit" }}>
              {createdAt}
            </Typography>
          </Box>
        </Box>
      </Box>

      <PostMenu postId={postId}/>
    </Box>
  );
}
