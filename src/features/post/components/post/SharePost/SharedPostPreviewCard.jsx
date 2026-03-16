import { Box, Typography } from "@mui/material";
import { PostActions, PostHeader, PostMedia, PostText } from "../Post/components";
import { style } from "../style";
import { formatDateTime, resolveMedia } from "./sharedPost.utils";

const defaultSx = style.post;

export default function SharedPostPreviewCard({
  post,
  sx = defaultSx,
  actionPostId = null,
  showActions = Boolean(actionPostId),
}) {
  const safePost = post ?? {};
  const author = safePost.author || {};
  const createdAt = formatDateTime(safePost.time?.createdAt);
  const media = resolveMedia(safePost.mediaFiles);
  const hasSharedContent = Boolean(safePost?.id || safePost?.text || media.length > 0);

  return (
    <Box sx={sx.sharedCard}>
          {hasSharedContent ? (
        <Box sx={sx.sharedCardBody}>
          <PostHeader
            postId={actionPostId ?? safePost.id}
            sx={sx}
            author={author}
            createdAt={createdAt}
            hideMenu={!actionPostId}
          />
          <PostText sx={sx} text={safePost.text} />
          <PostMedia items={media} />
          {showActions && actionPostId != null ? (
            <PostActions sx={sx} postId={actionPostId} />
          ) : null}
        </Box>
      ) : (
        <Box sx={sx.section}>
          <Typography sx={sx.sharedUnavailable}>
            Bài viết được chia sẻ hiện không còn tồn tại
          </Typography>
        </Box>
      )}
    </Box>
  );
}
