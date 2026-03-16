import Surface from "../../../../../components/common/Surface";
import { style } from "../style";
import { PostHeader, PostText } from "../Post/components";
import SharedPostPreviewCard from "./SharedPostPreviewCard";
import { formatDateTime, resolveSharedPost } from "./sharedPost.utils";

const sx = style.post;

export default function SharePost({ post }) {
  const safePost = post ?? {};
  const sharedPost = resolveSharedPost(safePost) ?? safePost;

  const sharer = safePost.sharer || safePost.author || {};
  const sharedAt = formatDateTime(safePost.time?.sharedAt || safePost.time?.createdAt);
  const shareMessage = safePost.viewer?.shareMessage || safePost.shareMessage || "";

  return (
    <Surface sx={sx.card}>
      <PostHeader hideMenu sx={sx} author={sharer} createdAt={sharedAt} postId={safePost.id} />
      <PostText sx={sx} text={shareMessage} />
      <SharedPostPreviewCard post={sharedPost} sx={sx} actionPostId={safePost.id} />
    </Surface>
  );
}
