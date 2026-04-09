import { Avatar, Box, ButtonBase, Typography } from "@mui/material";
import PushPinIcon from '@mui/icons-material/PushPin';
import { useNavigate } from "react-router-dom";
import PostMenu from "./PostMenu";
import { post } from "../../../../../../constant/text/vi/post/post"
import useAuth from "../../../../../../core/auth/useAuth";
import { buildProfileRoute } from "../../../story/storyRoute";
import { resolveProfileUsername } from "../../../reel/utils";
export default function PostHeader({context, sx,isPinned, author, createdAt, postId, hideMenu = false }) {
  const {isOwner} = useAuth()
  const navigate = useNavigate()
  const profileUsername = resolveProfileUsername(author?.username)
  const canNavigateProfile = Boolean(profileUsername)

  const handleNavigateProfile = () => {
    if (!canNavigateProfile) return
    navigate(buildProfileRoute(profileUsername))
  }

  return (
    <Box sx={{ ...sx.section, ...sx.header }}>
      <Box sx={sx.authorWrap}>
        <ButtonBase
          onClick={handleNavigateProfile}
          sx={{
            borderRadius: "50%",
            cursor: canNavigateProfile ? "pointer" : "default",
            flexShrink: 0,
          }}
        >
          <Avatar src={author?.avatarUrl} sx={sx.avatar} />
        </ButtonBase>
        <Box sx={sx.authorMeta}>
          <ButtonBase
            onClick={handleNavigateProfile}
            sx={{
              alignSelf: "flex-start",
              borderRadius: "0.35rem",
              cursor: canNavigateProfile ? "pointer" : "default",
              justifyContent: "flex-start",
              maxWidth: "100%",
              textAlign: "left",
            }}
          >
            <Typography sx={sx.authorName}>{author?.displayName || post.fallbackAuthorName}</Typography>
          </ButtonBase>
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
