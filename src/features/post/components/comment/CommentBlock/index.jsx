import { Avatar, Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import { usePostContext } from "../../../hooks";
import { CommentComposer } from "../components";
import {
  CommentBlockActions,
  CommentBlockBubble,
  CommentBlockReplies,
} from "./components";
import { useCommentComposer, useCommentReplies } from "./hooks";
import { style } from "./style";

const sx = style.block;
const REPLY_COMPOSER_SCROLL_PADDING = 16;

const scrollReplyComposerIntoView = (node) => {
  if (!(node instanceof HTMLElement)) return;

  const scrollContainer = node.closest("[data-comment-thread-scroll='true']");
  if (!(scrollContainer instanceof HTMLElement)) return;

  const containerRect = scrollContainer.getBoundingClientRect();
  const composerRect = node.getBoundingClientRect();
  const maxScrollLeft = Math.max(0, scrollContainer.scrollWidth - scrollContainer.clientWidth);

  if (composerRect.right > containerRect.right - REPLY_COMPOSER_SCROLL_PADDING) {
    const delta = composerRect.right - containerRect.right + REPLY_COMPOSER_SCROLL_PADDING;
    scrollContainer.scrollTo({
      left: Math.min(maxScrollLeft, scrollContainer.scrollLeft + delta),
      behavior: "smooth",
    });
    return;
  }

  if (composerRect.left < containerRect.left + REPLY_COMPOSER_SCROLL_PADDING) {
    const delta = containerRect.left - composerRect.left + REPLY_COMPOSER_SCROLL_PADDING;
    scrollContainer.scrollTo({
      left: Math.max(0, scrollContainer.scrollLeft - delta),
      behavior: "smooth",
    });
  }
};

export default function CommentBlock({
  comment,
  currentUser,
  onDelete,
  onEdit,
  onReact,
  onReply,
  targetCommentId = null,
}) {
  const { state } = usePostContext();
  const isDeleting = Boolean(state?.loading?.item?.[comment?.id]?.deleteContent);
  const commentRootRef = useRef(null);
  const replyComposerRef = useRef(null);
  const isTargetComment =
    targetCommentId != null && String(comment?.id) === String(targetCommentId);

  const replies = useCommentReplies({
    comment,
    currentUser,
    onDelete,
    onReact,
    onReply,
    targetCommentId,
  });
  const composer = useCommentComposer({
    comment,
    onEdit,
    onReply: replies.handleReply,
  });

  useEffect(() => {
    if (!composer.isReplying || isDeleting) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      scrollReplyComposerIntoView(replyComposerRef.current);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [composer.isReplying, isDeleting]);

  useEffect(() => {
    if (!isTargetComment) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      commentRootRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isTargetComment]);

  return (
    <Box
      data-comment-id={comment?.id ?? undefined}
      ref={commentRootRef}
      sx={[
        sx.root,
        isTargetComment && {
          scrollMarginTop: "6rem",
        }
      ]}
    >
      <Box sx={sx.row}>
        <Avatar
          src={comment.author?.avatarUrl || ""}
          sx={sx.avatar(comment.level)}
        />

        <Box sx={sx.body}>
          <CommentBlockBubble
            comment={comment}
            currentUser={currentUser}
            isDeleting={isDeleting}
            isEditing={composer.isEditing}
            isTargetComment={isTargetComment}
            onCancelEdit={composer.closeEdit}
            onDelete={() => onDelete?.(comment)}
            onEdit={composer.openEdit}
            onSubmitEdit={composer.submitEdit}
          />

          {!composer.isEditing && !isDeleting ? (
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
                onDelete={replies.handleDelete}
                onEdit={onEdit}
                onReact={replies.handleReact}
                onReply={replies.handleReply}
                targetCommentId={targetCommentId}
              />
            )}
            showCollapseReplies={replies.showCollapseReplies}
            showEmptyReplies={replies.showEmptyReplies}
          />

          {composer.isReplying && !isDeleting ? (
            <Box ref={replyComposerRef} sx={sx.replyComposerWrap}>
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
