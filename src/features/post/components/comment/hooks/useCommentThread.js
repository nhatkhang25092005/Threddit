import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useAuth from "../../../../../core/auth/useAuth";
import { extractUsernames } from "../../../../../utils/extractUsernames";
import { usePostContext } from "../../../hooks";
import {
  addCommentToTree,
  buildLocalComment,
  countCommentBranch,
  countTotalComments,
  editCommentInTree,
  findCommentByIdInTree,
  mergeCommentPage,
  normalizeCommentItem,
  normalizeFlatCommentTree,
  removeCommentFromTree,
  resolveReplyParentId,
  updateCommentReactionInTree,
} from "../utils/comment.utils";

const normalizeStoreComments = (items = [], viewerUsername = null) =>
  normalizeFlatCommentTree(items, { viewerUsername });

export function useCommentThread(postId, initialCount = 0) {
  const { user } = useAuth();
  const { actions } = usePostContext();
  const getCommentList = actions?.getCommentList;
  const createCommentAction = actions?.createComment;
  const updateCommentAction = actions?.updateComment;
  const deleteCommentAction = actions?.deleteComment;
  const reactionCommentAction = actions?.reactionComment;
  const commentsRef = useRef([]);
  const initialCountRef = useRef(Number(initialCount) || 0);
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("idle");
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countBaseline, setCountBaseline] = useState(() => Number(initialCount) || 0);
  const [countDelta, setCountDelta] = useState(0);

  const fetchComments = useCallback(
    async (nextCursor = null, append = false) => {
      if (!postId) {
        setComments([]);
        setCursor(null);
        setHasMore(false);
        setStatus("ready");
        return;
      }

      setStatus(append ? "loading-more" : "loading");
      setErrorMessage("");

      const response = await getCommentList(postId, {
        refresh: !append && !nextCursor,
        ignoreHasMore: Boolean(append),
      });

      if (!response) {
        return;
      }

      if (!response.success) {
        setStatus("error");
        setErrorMessage(response.message || "");
        if (!append) {
          setComments([]);
          setCursor(null);
          setHasMore(false);
          setCountBaseline(initialCountRef.current);
          setCountDelta(0);
        }
        return;
      }

      const normalizedItems = normalizeStoreComments(
        response.data?.commentList || [],
        user?.username || null
      );

      const nextComments = append
        ? mergeCommentPage(commentsRef.current, normalizedItems)
        : normalizedItems;

      setComments(nextComments);
      setCountBaseline(Math.max(initialCountRef.current, countTotalComments(nextComments)));
      setCursor(response.data?.cursor ?? null);
      setHasMore(Boolean(response.data?.hasMore));
      setStatus("ready");
    },
    [getCommentList, postId, user?.username]
  );

  useEffect(() => {
    const nextInitialCount = Number(initialCount) || 0;
    initialCountRef.current = nextInitialCount;
    setCountBaseline(nextInitialCount);
    setCountDelta(0);
  }, [initialCount, postId]);

  useEffect(() => {
    commentsRef.current = comments;
  }, [comments]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const createComment = useCallback(
    async ({ text = "", media = [], parentComment = null }) => {
      const parentId = parentComment ? resolveReplyParentId(parentComment) : null;
      const level = parentComment ? (Number(parentComment?.level) || 0) + 1 : 0;
      const response = await createCommentAction(postId, {
        text,
        media,
        parentCommentId: parentId,
      });

      if (!response?.success) {
        return response;
      }

      const createdRaw = response?.data?.createdComment || null;
      const normalizedComment = normalizeCommentItem(createdRaw, {
        level,
        parentAuthor: parentComment?.author || null,
        parentId,
        viewerUsername: user?.username || null,
      });

      const nextComment = normalizedComment
        ? {
            ...normalizedComment,
            children: Array.isArray(normalizedComment.children) ? normalizedComment.children : [],
            level,
            parentId,
            replyTo:
              parentId && !normalizedComment.replyTo
                ? (parentComment?.author || null)
                : normalizedComment.replyTo,
          }
        : buildLocalComment({
          level,
          media,
          parentId,
          replyTo: parentComment?.author || null,
          text,
          viewer: user,
        });

      const nextComments = addCommentToTree(commentsRef.current, nextComment, parentId);
      commentsRef.current = nextComments;
      setComments(nextComments);
      setCountDelta((current) => current + 1);

      return {
        success: true,
        data: nextComment,
      };
    },
    [createCommentAction, postId, user]
  );

  const editComment = useCallback(async (commentId, changes = {}) => {
    const currentComment = findCommentByIdInTree(commentsRef.current, commentId);
    if (!currentComment) {
      return { success: false };
    }

    if (typeof updateCommentAction !== "function") {
      const nextComments = editCommentInTree(commentsRef.current, commentId, changes);
      commentsRef.current = nextComments;
      setComments(nextComments);
      return {
        success: true,
      };
    }

    const hasTextField = Object.prototype.hasOwnProperty.call(changes || {}, "text");
    const mentionedUsers = Array.isArray(changes?.mentionedUsers)
      ? changes.mentionedUsers
      : (hasTextField ? extractUsernames(String(changes?.text ?? "")) : undefined);

    const response = await updateCommentAction(commentId, {
      ...changes,
      ...(Array.isArray(mentionedUsers) ? { mentionedUsers } : {}),
      currentMedia: currentComment.media,
    });

    if (!response?.success) {
      return response || { success: false };
    }

    const updatedComment = normalizeCommentItem(
      {
        id: commentId,
        parentCommentId: currentComment.parentId,
        ...(response?.data?.updatedComment || {}),
      },
      {
        level: currentComment.level,
        parentAuthor: currentComment.replyTo,
        parentId: currentComment.parentId,
        viewerUsername: user?.username || null,
      }
    );

    const nextComments = editCommentInTree(commentsRef.current, commentId, {
      text: updatedComment?.text ?? changes?.text,
      media: Array.isArray(updatedComment?.media) ? updatedComment.media : changes?.media,
    });
    commentsRef.current = nextComments;
    setComments(nextComments);

    return {
      ...response,
      data: {
        ...(response?.data || {}),
        ...(updatedComment ? { updatedComment } : {}),
      },
    };
  }, [updateCommentAction, user?.username]);

  const reactComment = useCallback(async (commentId, nextReaction, previousReactionOverride) => {
    const targetComment = findCommentByIdInTree(commentsRef.current, commentId);
    const previousReaction =
      previousReactionOverride !== undefined
        ? previousReactionOverride
        : targetComment?.viewer?.reaction ?? null;

    if (targetComment) {
      const nextComments = updateCommentReactionInTree(commentsRef.current, commentId, nextReaction);
      commentsRef.current = nextComments;
      setComments(nextComments);
    }

    if (typeof reactionCommentAction !== "function") {
      return {
        success: true,
      };
    }

    let response = null;

    try {
      response = await reactionCommentAction(commentId, previousReaction, nextReaction);

      if (response?.success) {
        return response;
      }
    } catch (error) {
      console.error(error);
    }

    if (targetComment) {
      const rollbackComments = updateCommentReactionInTree(
        commentsRef.current,
        commentId,
        previousReaction
      );
      commentsRef.current = rollbackComments;
      setComments(rollbackComments);
    }

    return response || { success: false };
  }, [reactionCommentAction]);

  const deleteComment = useCallback(async (comment, options = {}) => {
    const commentId = comment?.id ?? comment;
    if (commentId == null) {
      return { success: false };
    }

    const removalResult = removeCommentFromTree(commentsRef.current, commentId);
    const removedCountHint = Math.max(
      1,
      Number(options?.removedCountHint) || removalResult.removedCount || countCommentBranch(comment) || 1
    );

    if (typeof deleteCommentAction !== "function") {
      if (removalResult.removedCount > 0) {
        commentsRef.current = removalResult.comments;
        setComments(removalResult.comments);
      }
      setCountDelta((current) => current - removedCountHint);
      return {
        success: true,
        data: {
          removedCount: removedCountHint,
        },
      };
    }

    const response = await deleteCommentAction(postId, commentId, {
      removedCount: removedCountHint,
    });

    if (!response?.success) {
      return response || { success: false };
    }

    if (removalResult.removedCount > 0) {
      commentsRef.current = removalResult.comments;
      setComments(removalResult.comments);
    }

    setCountDelta((current) => current - (response?.data?.removedCount ?? removedCountHint));

    return response;
  }, [deleteCommentAction, postId]);

  const loadMore = useCallback(async () => {
    if (!hasMore || !cursor || status === "loading-more") {
      return;
    }

    await fetchComments(cursor, true);
  }, [cursor, fetchComments, hasMore, status]);

  const visibleCount = useMemo(() => countTotalComments(comments), [comments]);
  const totalCount = useMemo(
    () => Math.max(0, visibleCount, countBaseline + countDelta),
    [countBaseline, countDelta, visibleCount]
  );

  return {
    comments,
    createComment,
    deleteComment,
    editComment,
    errorMessage,
    hasMore,
    isEmpty: status === "ready" && comments.length === 0,
    isError: status === "error",
    isLoading: status === "loading",
    isLoadingMore: status === "loading-more",
    loadMore,
    reactComment,
    totalCount,
    viewer: user,
  };
}
