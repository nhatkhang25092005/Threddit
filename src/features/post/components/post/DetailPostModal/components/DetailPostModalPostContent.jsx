import { Box, Typography } from "@mui/material";
import { detailPost } from "../../../../../../constant/text/vi/post/detailpost.text";
import {
  PostActions,
  PostHeader,
  PostMedia,
  PostStats,
  PostText,
} from "../../Post/components";
import SharedPostPreviewCard from "../../SharePost/SharedPostPreviewCard";
import { formatCount } from "../../SharePost/sharedPost.utils";
import { style } from "../style";

const contentSx = style.postDetail;
const modalSx = style.modal;

export default function DetailPostModalPostContent({
  detail,
  onCommentClick,
}) {
  const safePost = detail
  const stats = safePost.stats ?? {};
  const shareMessage =
    safePost.viewer?.shareMessage ||
    safePost.shareMessage ||
    safePost.text ||
    "";
  const previewPost = detail?.sharedPost ?? null;
  const hasPreviewPost = Boolean(
    previewPost?.id ||
    previewPost?.text ||
    previewPost?.mediaFiles?.length ||
    previewPost?.author
  );


  return (
    <Box>
      <PostHeader
        author={detail.author}
        context={safePost.context ?? null}
        createdAt={detail.createdAt}
        isPinned={safePost.isPinned ?? false}
        postId={safePost.id}
        sx={contentSx}
      />

      {detail.isSharePost ? (
        <>
          <PostText sx={contentSx} text={shareMessage} />

          {hasPreviewPost ? (
            <SharedPostPreviewCard post={previewPost} sx={contentSx} />
          ) : (
            <Box sx={modalSx.sharedUnavailableBox}>
              <Typography sx={modalSx.sharedUnavailableText}>
                {detailPost.sharedPostUnavailable}
              </Typography>
            </Box>
          )}
        </>
      ) : null}

      {!detail.isSharePost ? <PostText sx={contentSx} text={safePost.text} /> : null}

      <PostMedia items={detail.mediaFiles} postId={safePost.id} />

      <PostStats
        commentNumber={stats.commentNumber ?? 0}
        formatCount={formatCount}
        reactionNumber={stats.reactionNumber ?? 0}
        saveNumber={stats.saveNumber ?? 0}
        shareNumber={stats.shareNumber ?? 0}
        sx={contentSx}
      />

      <PostActions
        onCommentClick={onCommentClick}
        postId={safePost.id}
        sx={contentSx}
      />
    </Box>
  );
}
