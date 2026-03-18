import { Avatar, Box, ButtonBase, CircularProgress, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import useInfiniteScroll from "../../../../../hooks/useInfiniteScroll";
import { usePostContext } from "../../../hooks";
import {
  CommentComposer,
  CommentMediaList,
} from "../components";
import {
  findCommentByIdInTree,
  mergeCommentPage,
  normalizeCommentItem,
  updateCommentReactionInTree,
} from "../utils/comment.utils";
import { CommentBlockActions, CommentBlockHeader } from "./components";
import { style } from "./style";

const sx = style.block;
const EMPTY_REPLIES_MESSAGE = "Hiện chưa có phản hồi.";

function resolveFetchedReplyItems(data) {
  if (Array.isArray(data?.comments)) return data.comments;
  if (Array.isArray(data?.commentList)) return data.commentList;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data)) return data;
  return [];
}

function normalizeFetchedReplies(items = [], parentCommentId, viewerUsername = null) {
  const parentKey = String(parentCommentId);
  const normalized = (Array.isArray(items) ? items : [])
    .map((reply) =>
      normalizeCommentItem(reply, {
        level:
          String(reply?.parentCommentId || reply?.parentId || parentCommentId) === parentKey
            ? 1
            : 2,
        parentId: reply?.parentCommentId || reply?.parentId || parentCommentId,
        viewerUsername,
      })
    )
    .filter(Boolean)
    .map((reply) => ({
      ...reply,
      children: [],
    }));

  const byId = new Map(normalized.map((reply) => [String(reply.id), reply]));
  const roots = [];

  normalized.forEach((reply) => {
    const currentParentId =
      reply.parentId == null ? null : String(reply.parentId);

    if (!currentParentId || currentParentId === parentKey) {
      roots.push(reply);
      return;
    }

    const parent = byId.get(currentParentId);
    if (!parent) {
      roots.push(reply);
      return;
    }

    parent.children = [...(parent.children || []), reply];
    parent.stats = {
      ...parent.stats,
      replyNumber: parent.children.length,
    };
  });

  return roots;
}

export default function CommentBlock({
  comment,
  currentUser,
  onDelete,
  onEdit,
  onReact,
  onReply,
}) {
  const { actions } = usePostContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [loadedReplies, setLoadedReplies] = useState(null);
  const [hasViewedReplies, setHasViewedReplies] = useState(false);
  const [isViewRepliesLoading, setIsViewRepliesLoading] = useState(false);
  const [isLoadingMoreReplies, setIsLoadingMoreReplies] = useState(false);
  const [hasMoreReplies, setHasMoreReplies] = useState(false);
  const [showRepliesEmptyState, setShowRepliesEmptyState] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);
  const replyItems = useMemo(() => {
    const baseReplies = Array.isArray(comment.children) ? comment.children : [];
    if (!Array.isArray(loadedReplies)) {
      return baseReplies;
    }

    return mergeCommentPage(baseReplies, loadedReplies);
  }, [comment.children, loadedReplies]);

  const visibleReplies = useMemo(() => {
    const replies = Array.isArray(replyItems) ? replyItems : [];
    return showAllReplies ? replies : replies.slice(0, 2);
  }, [replyItems, showAllReplies]);

  const handleReplySubmit = async ({ media, text }) => {
    const result = await onReply?.({
      media,
      parentComment: comment,
      text,
    });

    if (result?.success !== false) {
      setIsReplying(false);
    }

    return result;
  };

  const handleEditSubmit = async ({ media, text }) => {
    const result = await onEdit?.(comment.id, {
      media,
      text,
    });

    if (result?.success !== false) {
      setIsEditing(false);
    }

    return result;
  };

  const handleViewReplies = async () => {
    setHasViewedReplies(true);

    if (isViewRepliesLoading) {
      return;
    }

    if (Array.isArray(loadedReplies)) {
      setShowRepliesEmptyState(loadedReplies.length === 0);
      if (loadedReplies.length > 0) {
        setShowAllReplies(true);
      }
      return;
    }

    if (typeof actions?.getChildComment !== "function") {
      return;
    }

    setIsViewRepliesLoading(true);
    setShowRepliesEmptyState(false);

    try {
      const response = await actions.getChildComment(comment.id, {
        ignoreHasMore: true,
        refresh: true,
      });

      if (!response?.success) {
        return response;
      }

      const fetchedReplyItems = resolveFetchedReplyItems(response.data);
      setHasMoreReplies(Boolean(response?.data?.hasMore));

      if (fetchedReplyItems.length === 0) {
        setLoadedReplies([]);
        setShowAllReplies(false);
        setShowRepliesEmptyState(true);
        return response;
      }

      const normalizedReplies = normalizeFetchedReplies(
        fetchedReplyItems,
        comment.id,
        currentUser?.username || null
      );

      setLoadedReplies(normalizedReplies);
      setShowRepliesEmptyState(normalizedReplies.length === 0);
      setShowAllReplies(true);
      return response;
    } finally {
      setIsViewRepliesLoading(false);
    }
  };

  const handleLoadMoreReplies = async () => {
    if (
      comment.level > 0 ||
      !hasViewedReplies ||
      !showAllReplies ||
      isViewRepliesLoading ||
      isLoadingMoreReplies ||
      !hasMoreReplies ||
      typeof actions?.getChildComment !== "function"
    ) {
      return null;
    }

    setIsLoadingMoreReplies(true);

    try {
      const response = await actions.getChildComment(comment.id);

      if (!response?.success) {
        return response;
      }

      const fetchedReplyItems = resolveFetchedReplyItems(response.data);
      const normalizedReplies = normalizeFetchedReplies(
        fetchedReplyItems,
        comment.id,
        currentUser?.username || null
      );

      setHasMoreReplies(Boolean(response?.data?.hasMore));
      setLoadedReplies((current) =>
        mergeCommentPage(Array.isArray(current) ? current : [], normalizedReplies)
      );

      return response;
    } finally {
      setIsLoadingMoreReplies(false);
    }
  };

  const handleReact = useCallback(
    async (targetCommentId, nextReaction) => {
      const targetReply = Array.isArray(loadedReplies)
        ? findCommentByIdInTree(loadedReplies, targetCommentId)
        : null;

      if (!targetReply) {
        return onReact?.(targetCommentId, nextReaction);
      }

      const previousReaction = targetReply.viewer?.reaction ?? null;
      const nextReplies = updateCommentReactionInTree(loadedReplies, targetCommentId, nextReaction);
      setLoadedReplies(nextReplies);

      let response = null;

      try {
        response = await onReact?.(targetCommentId, nextReaction);
      } catch (error) {
        console.error(error);
      }

      if (response?.success === false) {
        setLoadedReplies((current) =>
          updateCommentReactionInTree(Array.isArray(current) ? current : [], targetCommentId, previousReaction)
        );
      }

      return response;
    },
    [loadedReplies, onReact]
  );

  const repliesLoadMoreRef = useInfiniteScroll({
    hasMore:
      comment.level === 0 &&
      hasViewedReplies &&
      showAllReplies &&
      hasMoreReplies &&
      replyItems.length > 0,
    loading: isViewRepliesLoading || isLoadingMoreReplies,
    onLoadMore: handleLoadMoreReplies,
    rootMargin: "120px",
  });

  return (
    <Box sx={sx.root}>
      <Box sx={sx.row}>
        <Avatar src={comment.author?.avatarUrl || ""} sx={sx.avatar(comment.level)} />

        <Box sx={sx.body}>
          <Box sx={sx.bubble}>
            <CommentBlockHeader
              author={comment.author}
              canManage={comment.meta?.isOwner}
              createdLabel={comment.meta?.createdLabel}
              onDelete={() => onDelete?.(comment.id)}
              onEdit={() => setIsEditing(true)}
            />

            {isEditing ? (
              <CommentComposer
                autoFocus
                avatarUrl={currentUser?.avatarUrl || ""}
                compact
                initialMedia={comment.media}
                initialText={comment.text}
                onCancel={() => setIsEditing(false)}
                onSubmit={handleEditSubmit}
                placeholder={commentText.editPlaceholder}
                submitLabel={commentText.saveEdit}
              />
            ) : (
              <>
                {comment.replyTo?.username ? (
                  <Typography sx={sx.replyTo}>
                    {commentText.replyToPrefix} @{comment.replyTo.username}
                  </Typography>
                ) : null}

                {comment.text ? <Typography sx={sx.text}>{comment.text}</Typography> : null}

                <CommentMediaList items={comment.media} />
              </>
            )}
          </Box>

          {!isEditing ? (
            <CommentBlockActions
              comment={comment}
              isViewRepliesLoading={isViewRepliesLoading}
              onReact={(nextReaction) => handleReact(comment.id, nextReaction)}
              onReply={() => setIsReplying((current) => !current)}
              onViewReplies={handleViewReplies}
              viewRepliesLabel={commentText.loadMoreReplies}
            />
          ) : null}

          {hasViewedReplies && showRepliesEmptyState && !isViewRepliesLoading && replyItems.length === 0 ? (
            <Box sx={sx.repliesNotice}>
              <Typography sx={sx.repliesNoticeText}>{EMPTY_REPLIES_MESSAGE}</Typography>
            </Box>
          ) : null}

          {hasViewedReplies && visibleReplies.length > 0 ? (
            <Box sx={sx.repliesWrap}>
              {visibleReplies.map((reply) => (
                <CommentBlock
                  key={reply.id}
                  comment={reply}
                  currentUser={currentUser}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onReact={handleReact}
                  onReply={onReply}
                />
              ))}

              {hasMoreReplies ? <Box ref={repliesLoadMoreRef} sx={sx.repliesSentinel} /> : null}

              {isLoadingMoreReplies ? (
                <Box sx={sx.repliesLoading}>
                  <CircularProgress color="inherit" size={16} />
                </Box>
              ) : null}
            </Box>
          ) : null}

          {hasViewedReplies &&
          Array.isArray(replyItems) &&
          replyItems.length > 2 &&
          showAllReplies ? (
            <ButtonBase onClick={() => setShowAllReplies(false)} sx={sx.repliesToggle}>
              <Typography component="span" sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
                {commentText.collapseReplies}
              </Typography>
            </ButtonBase>
          ) : null}

          {isReplying ? (
            <Box sx={sx.replyComposerWrap}>
              <CommentComposer
                autoFocus
                avatarUrl={currentUser?.avatarUrl || ""}
                compact
                onCancel={() => setIsReplying(false)}
                onSubmit={handleReplySubmit}
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
