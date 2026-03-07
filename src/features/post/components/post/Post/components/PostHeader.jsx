import { Avatar, Box, Typography } from "@mui/material";
import PushPinIcon from '@mui/icons-material/PushPin';
import PostMenu from "./PostMenu";
import { post } from "../../../../../../constant/text/vi/post/post"
import useAuth from "../../../../../../core/auth/useAuth";
export default function PostHeader({context, sx,isPinned, author, createdAt, postId, hideMenu = false }) {
  const {isOwner} = useAuth()
  return (
    <Box sx={{ ...sx.section, ...sx.header }}>
      <Box sx={sx.authorWrap}>
        <Avatar src={author?.avatarUrl} sx={sx.avatar} />
        <Box sx={sx.authorMeta}>
          <Typography sx={sx.authorName}>{author?.displayName || post.fallbackAuthorName}</Typography>
          <Box sx={sx.subMeta}>
            <Typography component="span" sx={{ fontSize: "inherit" }}>
              {createdAt}
            </Typography>
          </Box>
        </Box>
      </Box>
      {isPinned && isOwner ? <PushPinIcon sx={{color:'yellow'}}/> : null}
      {!hideMenu ? <PostMenu postContext = {context} postId={postId} /> : null}
    </Box>
  );
}
