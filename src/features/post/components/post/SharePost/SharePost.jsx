import { Box, Typography } from "@mui/material";
import Surface from "../../../../../components/common/Surface";
import { style } from "../style";
import { PostHeader, PostMedia, PostStats, PostText } from "../Post/components";

const sx = style.post;

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCount = (value = 0) => {
  if (value < 1000) return String(value);

  const shortValue = (value / 1000).toFixed(value >= 10000 ? 0 : 1);
  return `${shortValue.replace(".0", "")}K`;
};

const resolveMedia = (mediaFiles = []) => (
  [...(Array.isArray(mediaFiles) ? mediaFiles : [])]
    .map((media, index) => ({ ...media, __idx: index }))
    .sort((a, b) => {
      const aOrder = Number.isFinite(a?.sortOrder) ? a.sortOrder : Number.MAX_SAFE_INTEGER;
      const bOrder = Number.isFinite(b?.sortOrder) ? b.sortOrder : Number.MAX_SAFE_INTEGER;
      return aOrder - bOrder || a.__idx - b.__idx;
    })
);

const resolveSharedPost = (post = {}) => {
  const candidate =
    post?.sharedPost ??
    post?.sharedContent ??
    post?.originalPost ??
    post?.originPost ??
    post?.content;

  if (candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
    return candidate;
  }

  return null;
};

export default function SharePost({ post }) {
  const safePost = post ?? {};
  const sharedPost = resolveSharedPost(safePost) ?? safePost;

  const sharer = safePost.sharer || safePost.author || {};
  const sharedAt = formatDateTime(safePost.time?.sharedAt || safePost.time?.createdAt);
  const shareMessage = safePost.viewer?.shareMessage || safePost.shareMessage || "";

  const originalAuthor = sharedPost.author || safePost.author || {};
  const originalCreatedAt = formatDateTime(sharedPost.time?.createdAt || safePost.time?.createdAt);
  const media = resolveMedia(sharedPost.mediaFiles);
  const reactionNumber = sharedPost.stats?.reactionNumber ?? 0;
  const commentNumber = sharedPost.stats?.commentNumber ?? 0;
  const shareNumber = sharedPost.stats?.shareNumber ?? 0;
  const saveNumber = sharedPost.stats?.saveNumber ?? 0;
  const hasSharedContent = Boolean(sharedPost?.id || sharedPost?.text || media.length > 0);

  return (
    <Surface sx={sx.card}>
      <PostHeader sx={sx} author={sharer} createdAt={sharedAt} postId={safePost.id} />
      <PostText sx={sx} text={shareMessage} />

      <Box sx={sx.sharedCard}>
        {hasSharedContent ? (
          <Box sx={sx.sharedCardBody}>
            <PostHeader sx={sx} author={originalAuthor} createdAt={originalCreatedAt} hideMenu />
            <PostText sx={sx} text={sharedPost.text} />
            <PostMedia items={media} />
            <PostStats
              sx={sx}
              reactionNumber={reactionNumber}
              commentNumber={commentNumber}
              shareNumber={shareNumber}
              saveNumber={saveNumber}
              formatCount={formatCount}
            />
          </Box>
        ) : (
          <Box sx={sx.section}>
            <Typography sx={sx.sharedUnavailable}>
              Bài viết được chia sẻ hiện không còn tồn tại
            </Typography>
          </Box>
        )}
      </Box>
    </Surface>
  );
}
