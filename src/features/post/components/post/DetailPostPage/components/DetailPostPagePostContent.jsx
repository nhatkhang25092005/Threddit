import { Box } from "@mui/material";
import {
  PostActions,
  PostHeader,
  PostMedia,
  PostStats,
  PostText,
} from "../../Post/components";
import { formatCount } from "../../SharePost/sharedPost.utils";
import { style } from "../style";

const sx = style.content;

export default function DetailPostPagePostContent({
  canInteract,
  detail,
  onCommentClick,
}) {
  const safePost = detail?.post ?? {};
  const stats = safePost.stats ?? {};
  const postContext = safePost.context ?? "detailPostPage";
  const shareMessage =
    safePost.viewer?.shareMessage ||
    safePost.shareMessage ||
    safePost.text ||
    "";

  return (
    <Box>
      <PostHeader
        author={detail.author}
        context={postContext}
        createdAt={detail.createdAt}
        hideMenu={!canInteract}
        isPinned={safePost.isPinned ?? false}
        postId={safePost.id}
        sx={sx}
      />

      <PostText
        sx={sx}
        text={detail.isSharePost ? shareMessage : safePost.text}
      />

      <PostMedia items={detail.audioMedia} />

      <PostStats
        commentNumber={stats.commentNumber ?? 0}
        formatCount={formatCount}
        reactionNumber={stats.reactionNumber ?? 0}
        saveNumber={stats.saveNumber ?? 0}
        shareNumber={stats.shareNumber ?? 0}
        sx={sx}
      />

      {canInteract ? (
        <PostActions
          onCommentClick={onCommentClick}
          postId={safePost.id}
          sx={sx}
        />
      ) : null}
    </Box>
  );
}
