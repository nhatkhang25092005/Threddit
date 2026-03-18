import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useAuth from "../../../../../core/auth/useAuth";
import { usePostContext } from "../../../hooks";
import {
  addCommentToTree,
  buildLocalComment,
  countTotalComments,
  deleteCommentInTree,
  editCommentInTree,
  findCommentByIdInTree,
  mergeCommentPage,
  normalizeCommentItem,
  normalizeFlatCommentTree,
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
    const nextComments = editCommentInTree(commentsRef.current, commentId, changes);
    commentsRef.current = nextComments;
    setComments(nextComments);
    return {
      success: true,
    };
  }, []);

  const deleteComment = useCallback(async (commentId) => {
    const result = deleteCommentInTree(commentsRef.current, commentId);
    commentsRef.current = result.comments;
    setComments(result.comments);

    if (result.removedCount > 0) {
      setCountDelta((current) => current - result.removedCount);
    }

    return {
      success: true,
      removedCount: result.removedCount,
    };
  }, []);

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
