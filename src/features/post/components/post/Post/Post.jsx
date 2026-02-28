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

const resolvePrimaryMedia = (mediaFiles = []) => {
  const firstMedia = mediaFiles[0] || {};
  return {
    src: firstMedia.url || firstMedia.mediaUrl || firstMedia.fileUrl || "",
    type: firstMedia.contentType || firstMedia.mediaType || "",
  };
};

export default function Post({ post }) {
  const safePost = post ?? {};

  const createdAt = formatDateTime(safePost.timelineCreatedAt);
  const media = resolvePrimaryMedia(safePost.mediaFiles);
  const author = safePost.author || safePost.timelineOwner || {};
  const reactionNumber = safePost.reactionNumber
  const commentNumber = safePost.commentNumber
  const shareNumber = safePost.shareNumber
  const saveNumber = safePost.saveNumber

  return (
    <Surface  sx={sx.card}>
      <PostHeader sx={sx} author={author} createdAt={createdAt} postId={safePost.contentId} />
      <PostText sx={sx} text={safePost.text} />
      <PostMedia sx={sx} src={media.src} type={media.type} />
      <PostStats
        sx={sx}
        reactionNumber={reactionNumber}
        commentNumber={commentNumber}
        shareNumber={shareNumber}
        formatCount={formatCount}
        saveNumber={saveNumber}
      />
      <PostActions sx={sx} postId={safePost.contentId}/>
    </Surface>
  );
}
