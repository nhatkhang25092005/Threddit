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

const resolveRecordValue = (record = {}, key) => (
  record?.[key] ?? record?.[String(key)] ?? null
);

const buildCachedCommentNode = ({
  commentById = {},
  commentId,
  level = 0,
  parentAuthor = null,
  subCommentList = {},
  viewerUsername = null,
  visitedIds,
}) => {
  const resolvedId = String(commentId);

  if (visitedIds.has(resolvedId)) return null;
  visitedIds.add(resolvedId);

  const rawComment = resolveRecordValue(commentById, commentId);
  if (!rawComment) return null;

  const normalizedComment = normalizeCommentItem(rawComment, {
    level,
    parentAuthor,
    parentId: rawComment?.parentCommentId ?? null,
    viewerUsername,
  });

  if (!normalizedComment) return null;

  const childCommentIds = resolveRecordValue(subCommentList, commentId) || [];
  const children = (Array.isArray(childCommentIds) ? childCommentIds : [])
    .map((childCommentId) =>
      buildCachedCommentNode({
        commentById,
        commentId: childCommentId,
        level: level + 1,
        parentAuthor: normalizedComment.author,
        subCommentList,
        viewerUsername,
        visitedIds,
      })
    )
    .filter(Boolean);

  return {
    ...normalizedComment,
    children,
    hasChildComment: normalizedComment.hasChildComment || children.length > 0,
    stats: {
      ...normalizedComment.stats,
      replyNumber: Math.max(normalizedComment?.stats?.replyNumber ?? 0, children.length),
    },
  };
};

const buildCachedCommentThread = (postId, state, viewerUsername = null) => {
  if (!postId) return [];

  const topLevelCommentIds = resolveRecordValue(state?.commentList, postId);
  if (!Array.isArray(topLevelCommentIds)) return [];

  const visitedIds = new Set();

  return topLevelCommentIds
    .map((commentId) =>
      buildCachedCommentNode({
        commentById: state?.commentById,
        commentId,
        subCommentList: state?.subCommentList,
        viewerUsername,
        visitedIds,
      })
    )
    .filter(Boolean);
};

export function useCommentThread(postId, initialCount = 0, options = {}) {
  const { user } = useAuth();
  const { actions, state } = usePostContext();
  const commentByIdState = state?.commentById;
  const commentListState = state?.commentList;
  const subCommentListState = state?.subCommentList;
  const getCommentList = actions?.getCommentList;
  const createCommentAction = actions?.createComment;
  const updateCommentAction = actions?.updateComment;
  const deleteCommentAction = actions?.deleteComment;
  const reactionCommentAction = actions?.reactionComment;
  const usePrefetchedThread = options?.usePrefetchedThread === true;
  const prefetchedCursor = options?.prefetchedCursor ?? null;
  const prefetchedHasMore = options?.prefetchedHasMore === true;
  const prefetchedReady = options?.prefetchedReady === true;
  const commentsRef = useRef([]);
  const initialCountRef = useRef(Number(initialCount) || 0);
  const hydratedPostIdRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("idle");
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countBaseline, setCountBaseline] = useState(() => Number(initialCount) || 0);
  const [countDelta, setCountDelta] = useState(0);
  const cachedComments = useMemo(() => (
    usePrefetchedThread
      ? buildCachedCommentThread(postId, {
        commentById: commentByIdState,
        commentList: commentListState,
        subCommentList: subCommentListState,
      }, user?.username || null)
      : []
  ), [commentByIdState, commentListState, postId, subCommentListState, usePrefetchedThread, user?.username]);

  const fetchComments = useCallback(
    async (nextCursor = null, append = false) => {
      if (!postId) {
        hydratedPostIdRef.current = null;
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

      hydratedPostIdRef.current = postId;
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
    if (usePrefetchedThread && postId) {
      if (!prefetchedReady) {
        hydratedPostIdRef.current = null;
        return;
      }

      if (hydratedPostIdRef.current === postId) {
        return;
      }

      commentsRef.current = cachedComments;
      setComments(cachedComments);
      setCursor(prefetchedCursor);
      setHasMore(prefetchedHasMore);
      setStatus("ready");
      hydratedPostIdRef.current = postId;
      return;
    }

    hydratedPostIdRef.current = null;
  }, [cachedComments, postId, prefetchedCursor, prefetchedHasMore, prefetchedReady, usePrefetchedThread]);

  useEffect(() => {
    if (usePrefetchedThread && postId) {
      return;
    }

    fetchComments();
  }, [fetchComments, postId, usePrefetchedThread]);

  const createComment = useCallback(
    async ({ text = "", media = [], mentionedUsers: mentionedUsersInput, parentComment = null }) => {
      const parentId = parentComment ? resolveReplyParentId(parentComment) : null;
      const level = parentComment ? (Number(parentComment?.level) || 0) + 1 : 0;
      const mentionedUsers = Array.isArray(mentionedUsersInput)
        ? mentionedUsersInput
        : extractUsernames(String(text ?? ""));
      const response = await createCommentAction(postId, {
        text,
        media,
        ...(mentionedUsers.length > 0 ? { mentionedUsers } : {}),
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
