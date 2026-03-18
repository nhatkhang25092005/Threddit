import { Avatar, Box } from "@mui/material";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import { CommentComposer } from "../components";
import {
  CommentBlockActions,
  CommentBlockBubble,
  CommentBlockReplies,
} from "./components";
import { useCommentComposer, useCommentReplies } from "./hooks";
import { style } from "./style";

const sx = style.block;

export default function CommentBlock({
  comment,
  currentUser,
  onDelete,
  onEdit,
  onReact,
  onReply,
}) {
  const replies = useCommentReplies({
    comment,
    currentUser,
    onReact,
    onReply,
  });
  const composer = useCommentComposer({
    comment,
    onEdit,
    onReply: replies.handleReply,
  });

  return (
    <Box sx={sx.root}>
      <Box sx={sx.row}>
        <Avatar
          src={comment.author?.avatarUrl || ""}
          sx={sx.avatar(comment.level)}
        />

        <Box sx={sx.body}>
          <CommentBlockBubble
            comment={comment}
            currentUser={currentUser}
            isEditing={composer.isEditing}
            onCancelEdit={composer.closeEdit}
            onDelete={() => onDelete?.(comment.id)}
            onEdit={composer.openEdit}
            onSubmitEdit={composer.submitEdit}
          />

          {!composer.isEditing ? (
            <CommentBlockActions
              comment={comment}
              isViewRepliesLoading={replies.isViewRepliesLoading}
              onReact={(nextReaction) =>
                replies.handleReact(
                  comment.id,
                  nextReaction,
                  comment.viewer?.reaction ?? null
                )
              }
              onReply={composer.toggleReplying}
              onViewReplies={replies.handleViewReplies}
              viewRepliesLabel={commentText.loadMoreReplies}
            />
          ) : null}

          <CommentBlockReplies
            hasMoreReplies={replies.hasMoreReplies}
            isLoadingMoreReplies={replies.isLoadingMoreReplies}
            onCollapseReplies={replies.hideReplies}
            replies={replies.showReplies ? replies.visibleReplies : []}
            repliesLoadMoreRef={replies.repliesLoadMoreRef}
            renderReply={(reply) => (
              <CommentBlock
                key={reply.id}
                comment={reply}
                currentUser={currentUser}
                onDelete={onDelete}
                onEdit={onEdit}
                onReact={replies.handleReact}
                onReply={replies.handleReply}
              />
            )}
            showCollapseReplies={replies.showCollapseReplies}
            showEmptyReplies={replies.showEmptyReplies}
          />

          {composer.isReplying ? (
            <Box sx={sx.replyComposerWrap}>
              <CommentComposer
                autoFocus
                avatarUrl={currentUser?.avatarUrl || ""}
                compact
                onCancel={composer.closeReplying}
                onSubmit={composer.submitReply}
                placeholder={commentText.replyPlaceholder}
                replyLabel={`@${comment.author?.username || comment.author?.displayName || "user"}`}
                submitLabel={commentText.submit}
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
