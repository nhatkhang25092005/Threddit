import Surface from "../../../../../components/common/Surface";
import { style } from "../style";
import { PostActions, PostHeader, PostMedia, PostStats, PostText } from "./components"
const sx = style.post;
// const CLOSE_REACTION_DELAY_MS = 120;

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

export default function Post({ post }) {
  const safePost = post ?? {};
  const createdAt = formatDateTime(safePost.time?.createdAt);
  const media = resolveMedia(safePost.mediaFiles);
  const author = safePost.viewer?.isShared
    ? (safePost.sharer || safePost.author || {})
    : (safePost.author || {});
  const reactionNumber = safePost.stats?.reactionNumber ?? 0
  const commentNumber = safePost.stats?.commentNumber ?? 0
  const shareNumber = safePost.stats?.shareNumber ?? 0
  const saveNumber = safePost.stats?.saveNumber ?? 0
  const isPinned = safePost?.isPinned ?? false

  return (
    <Surface  sx={sx.card}>
      <PostHeader sx={sx} isPinned={isPinned} author={author} createdAt={createdAt} postId={safePost.id} />
      <PostText sx={sx} text={safePost.text} />
      <PostMedia items={media} />
      <PostStats
        sx={sx}
        reactionNumber={reactionNumber}
        commentNumber={commentNumber}
        shareNumber={shareNumber}
        formatCount={formatCount}
        saveNumber={saveNumber}
      />
      <PostActions sx={sx} postId={safePost.id}/>
    </Surface>
  );
}
