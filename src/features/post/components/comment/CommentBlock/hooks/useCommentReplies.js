import { useCallback, useEffect, useMemo, useState } from "react";
import useInfiniteScroll from "../../../../../../hooks/useInfiniteScroll";
import { usePostContext } from "../../../../hooks";
import {
  countCommentBranch,
  findCommentByIdInTree,
  mergeCommentPage,
  removeCommentFromTree,
  updateCommentReactionInTree,
} from "../../utils/comment.utils";
import {
  insertCreatedReplyIntoReplies,
  normalizeFetchedReplies,
  resolveFetchedReplyItems,
  shouldSyncCreatedReply,
} from "../utils/replyTree.utils";

const DEFAULT_VISIBLE_REPLY_COUNT = 2;
const LOAD_MORE_ROOT_MARGIN = "120px";

export function useCommentReplies({
  comment,
  currentUser,
  onDelete,
  onReact,
  onReply,
}) {
  const { actions } = usePostContext();
  const getChildComment = actions?.getChildComment;
  const [loadedReplies, setLoadedReplies] = useState(null);
  const [hasViewedReplies, setHasViewedReplies] = useState(false);
  const [isViewRepliesLoading, setIsViewRepliesLoading] = useState(false);
  const [isLoadingMoreReplies, setIsLoadingMoreReplies] = useState(false);
  const [hasMoreReplies, setHasMoreReplies] = useState(false);
  const [showRepliesEmptyState, setShowRepliesEmptyState] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);

  const baseReplies = useMemo(
    () => (Array.isArray(comment?.children) ? comment.children : []),
    [comment?.children]
  );

  const replyItems = useMemo(() => {
    if (!Array.isArray(loadedReplies)) {
      return baseReplies;
    }

    return mergeCommentPage(baseReplies, loadedReplies);
  }, [baseReplies, loadedReplies]);

  const visibleReplies = useMemo(() => {
    if (showAllReplies) {
      return replyItems;
    }

    return replyItems.slice(0, DEFAULT_VISIBLE_REPLY_COUNT);
  }, [replyItems, showAllReplies]);

  useEffect(() => {
    if (!hasViewedReplies) {
      return;
    }

    setShowRepliesEmptyState(replyItems.length === 0);
  }, [hasViewedReplies, replyItems.length]);

  const syncCreatedReply = useCallback(
    (createdComment, targetParentId) => {
      if (!shouldSyncCreatedReply(loadedReplies, comment, targetParentId)) {
        return;
      }

      setLoadedReplies((current) =>
        insertCreatedReplyIntoReplies(
          Array.isArray(current) ? current : baseReplies,
          comment,
          createdComment
        )
      );
      setHasViewedReplies(true);
      setShowAllReplies(true);
      setShowRepliesEmptyState(false);
    },
    [baseReplies, comment, loadedReplies]
  );

  const handleReply = useCallback(
    async ({ media, parentComment = null, text }) => {
      if (typeof onReply !== "function") {
        return { success: false };
      }

      const result = await onReply({
        media,
        parentComment,
        text,
      });

      if (result?.success === false) {
        return result;
      }

      const createdComment = result?.data;
      const targetParentId = createdComment?.parentId ?? parentComment?.id ?? null;

      if (createdComment && targetParentId != null) {
        syncCreatedReply(createdComment, targetParentId);
      }

      return result;
    },
    [onReply, syncCreatedReply]
  );

  const handleViewReplies = useCallback(async () => {
    setHasViewedReplies(true);

    if (isViewRepliesLoading) {
      return null;
    }

    if (Array.isArray(loadedReplies)) {
      setShowRepliesEmptyState(loadedReplies.length === 0);
      if (loadedReplies.length > 0) {
        setShowAllReplies(true);
      }
      return null;
    }

    if (typeof getChildComment !== "function") {
      return null;
    }

    setIsViewRepliesLoading(true);
    setShowRepliesEmptyState(false);

    try {
      const response = await getChildComment(comment.id, {
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
        comment,
        currentUser?.username || null
      );

      setLoadedReplies(normalizedReplies);
      setShowRepliesEmptyState(normalizedReplies.length === 0);
      setShowAllReplies(true);
      return response;
    } finally {
      setIsViewRepliesLoading(false);
    }
  }, [comment, currentUser?.username, getChildComment, isViewRepliesLoading, loadedReplies]);

  const handleLoadMoreReplies = useCallback(async () => {
    if (
      !hasViewedReplies ||
      !showAllReplies ||
      isViewRepliesLoading ||
      isLoadingMoreReplies ||
      !hasMoreReplies ||
      typeof getChildComment !== "function"
    ) {
      return null;
    }

    setIsLoadingMoreReplies(true);

    try {
      const response = await getChildComment(comment.id);

      if (!response?.success) {
        return response;
      }

      const fetchedReplyItems = resolveFetchedReplyItems(response.data);
      const normalizedReplies = normalizeFetchedReplies(
        fetchedReplyItems,
        comment,
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
  }, [
    comment,
    currentUser?.username,
    getChildComment,
    hasMoreReplies,
    hasViewedReplies,
    isLoadingMoreReplies,
    isViewRepliesLoading,
    showAllReplies,
  ]);

  const handleReact = useCallback(
    async (targetCommentId, nextReaction, previousReactionOverride) => {
      const targetReply = Array.isArray(loadedReplies)
        ? findCommentByIdInTree(loadedReplies, targetCommentId)
        : null;

      const previousReaction =
        previousReactionOverride !== undefined
          ? previousReactionOverride
          : targetReply?.viewer?.reaction ?? null;

      if (!targetReply) {
        return onReact?.(targetCommentId, nextReaction, previousReaction);
      }

      const nextReplies = updateCommentReactionInTree(
        loadedReplies,
        targetCommentId,
        nextReaction
      );
      setLoadedReplies(nextReplies);

      let response = null;

      try {
        response = await onReact?.(targetCommentId, nextReaction, previousReaction);
      } catch (error) {
        console.error(error);
      }

      if (response?.success === false) {
        setLoadedReplies((current) =>
          updateCommentReactionInTree(
            Array.isArray(current) ? current : [],
            targetCommentId,
            previousReaction
          )
        );
      }

      return response;
    },
    [loadedReplies, onReact]
  );

  const handleDelete = useCallback(async (targetComment, options = {}) => {
    const commentId = targetComment?.id ?? null;
    if (commentId == null) {
      return { success: false };
    }

    const loadedRepliesResult = Array.isArray(loadedReplies)
      ? removeCommentFromTree(loadedReplies, commentId)
      : { comments: loadedReplies, removedCount: 0 };

    const removedCountHint = Math.max(
      1,
      Number(options?.removedCountHint) || loadedRepliesResult.removedCount || countCommentBranch(targetComment) || 1
    );

    if (typeof onDelete !== "function") {
      if (loadedRepliesResult.removedCount > 0) {
        setLoadedReplies(loadedRepliesResult.comments);
      }

      return {
        success: true,
        data: {
          removedCount: removedCountHint,
        },
      };
    }

    const response = await onDelete(targetComment, {
      removedCountHint,
    });

    if (response?.success === false) {
      return response;
    }

    if (loadedRepliesResult.removedCount > 0) {
      setLoadedReplies(loadedRepliesResult.comments);
    }

    return response;
  }, [loadedReplies, onDelete]);

  const repliesLoadMoreRef = useInfiniteScroll({
    hasMore:
      hasViewedReplies &&
      showAllReplies &&
      hasMoreReplies &&
      replyItems.length > 0,
    loading: isViewRepliesLoading || isLoadingMoreReplies,
    onLoadMore: handleLoadMoreReplies,
    rootMargin: LOAD_MORE_ROOT_MARGIN,
  });

  const showEmptyReplies =
    hasViewedReplies &&
    showRepliesEmptyState &&
    !isViewRepliesLoading &&
    replyItems.length === 0;

  const showCollapseReplies =
    hasViewedReplies &&
    replyItems.length > DEFAULT_VISIBLE_REPLY_COUNT &&
    showAllReplies;

  const showReplies = hasViewedReplies && visibleReplies.length > 0;

  const hideReplies = useCallback(() => {
    setShowAllReplies(false);
  }, []);

  return {
    handleReact,
    handleDelete,
    handleReply,
    handleViewReplies,
    hasMoreReplies,
    hideReplies,
    isLoadingMoreReplies,
    isViewRepliesLoading,
    repliesLoadMoreRef,
    showCollapseReplies,
    showEmptyReplies,
    showReplies,
    visibleReplies,
  };
}
