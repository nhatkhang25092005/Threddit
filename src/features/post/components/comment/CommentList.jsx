import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { commentText } from "../../../../constant/text/vi/post/comment.text";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll";
import { usePostContext } from "../../hooks";
import CommentBlock from "./CommentBlock";
import {
  CommentComposer,
  CommentEmptyState,
  CommentListHeader,
  CommentListLoadMore,
  CommentListSkeleton,
} from "./components";
import { useCommentThread } from "./hooks/useCommentThread";
import { style } from "./style";

const sx = style.list;

export default function CommentList({
  initialCount = 0,
  onCountChange,
  postId,
  targetCommentId = null,
  targetIsSubComment = false,
  usePrefetchedThread = false,
  variant = "modal",
}) {
  const {
    actions: {
      prefetchCommentThread,
      prefetchChildComment,
    },
  } = usePostContext();
  const threadRootRef = useRef(null);
  const replyPrefetchKeyRef = useRef(null);
  const shouldPrefetchTarget = Boolean(postId && targetCommentId);
  const [prefetchStatus, setPrefetchStatus] = useState("idle");
  const [replySearchParentIds, setReplySearchParentIds] = useState([]);
  const [prefetchedPageState, setPrefetchedPageState] = useState({
    cursor: null,
    hasMore: false,
  });
  const effectiveUsePrefetchedThread =
    usePrefetchedThread ||
    (shouldPrefetchTarget && prefetchStatus !== "error");
  const thread = useCommentThread(postId, initialCount, {
    prefetchedCursor: prefetchedPageState.cursor,
    prefetchedHasMore: prefetchedPageState.hasMore,
    prefetchedReady: usePrefetchedThread || prefetchStatus === "ready",
    usePrefetchedThread: effectiveUsePrefetchedThread,
  });
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  const enableInfiniteScroll =
    hasUserScrolled && thread.hasMore && thread.comments.length > 0;
  const showLoadMoreButton =
    thread.hasMore && !hasUserScrolled && thread.comments.length > 0;
  const infiniteScrollRef = useInfiniteScroll({
    hasMore: enableInfiniteScroll,
    loading: thread.isLoading || thread.isLoadingMore,
    onLoadMore: thread.loadMore,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (!shouldPrefetchTarget || typeof prefetchCommentThread !== "function") {
      replyPrefetchKeyRef.current = null;
      setReplySearchParentIds([]);
      setPrefetchStatus("idle");
      setPrefetchedPageState({
        cursor: null,
        hasMore: false,
      });
      return;
    }

    let mounted = true;

    async function prepareTargetComment() {
      setPrefetchStatus("loading-root");

      const response = await prefetchCommentThread(postId, { targetCommentId });
      if (!mounted) {
        return;
      }

      setPrefetchedPageState({
        cursor: response?.data?.cursor ?? null,
        hasMore: Boolean(response?.data?.hasMore),
      });
      setReplySearchParentIds(
        Array.isArray(response?.data?.replySearchParentIds)
          ? response.data.replySearchParentIds
          : []
      );

      if (response?.success === false) {
        setPrefetchStatus("error");
        return;
      }

      if (targetIsSubComment && response?.data?.targetCommentFound !== true) {
        setPrefetchStatus("loading-replies");
        return;
      }

      setPrefetchStatus("ready");
    }

    prepareTargetComment();

    return () => {
      mounted = false;
    };
  }, [postId, prefetchCommentThread, shouldPrefetchTarget, targetCommentId, targetIsSubComment]);

  useEffect(() => {
    if (
      prefetchStatus !== "loading-replies" ||
      !targetIsSubComment ||
      !shouldPrefetchTarget ||
      typeof prefetchChildComment !== "function"
    ) {
      if (prefetchStatus !== "loading-replies") {
        replyPrefetchKeyRef.current = null;
      }
      return;
    }

    const replyPrefetchKey = `${postId}:${targetCommentId ?? ""}`;
    if (replyPrefetchKeyRef.current === replyPrefetchKey) {
      return;
    }

    if (replySearchParentIds.length === 0) {
      replyPrefetchKeyRef.current = null;
      setPrefetchStatus("ready");
      return;
    }

    replyPrefetchKeyRef.current = replyPrefetchKey;
    let mounted = true;

    async function prepareTargetReply() {
      for (const parentCommentId of replySearchParentIds) {
        const response = await prefetchChildComment(parentCommentId, {
          deepSearch: true,
          targetCommentId,
        });

        if (!mounted) {
          return;
        }

        if (response?.success === false) {
          break;
        }

        if (response?.data?.targetCommentFound) {
          break;
        }
      }

      if (mounted) {
        setPrefetchStatus("ready");
      }
    }

    prepareTargetReply();

    return () => {
      mounted = false;
    };
  }, [
    postId,
    prefetchChildComment,
    prefetchStatus,
    replySearchParentIds,
    shouldPrefetchTarget,
    targetCommentId,
    targetIsSubComment,
  ]);

  useEffect(() => {
    if (typeof onCountChange === "function") {
      onCountChange(thread.totalCount);
    }
  }, [onCountChange, thread.totalCount]);

  useEffect(() => {
    setHasUserScrolled(false);
  }, [postId]);

  useEffect(() => {
    if (
      !targetCommentId ||
      prefetchStatus === "loading-root" ||
      prefetchStatus === "loading-replies" ||
      thread.comments.length === 0
    ) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const targetNode = threadRootRef.current?.querySelector(
        `[data-comment-id="${String(targetCommentId)}"]`
      );

      targetNode?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [prefetchStatus, targetCommentId, thread.comments]);

  useEffect(() => {
    const markScrolled = () => {
      setHasUserScrolled(true);
    };

    window.addEventListener("scroll", markScrolled, true);
    window.addEventListener("wheel", markScrolled, { passive: true });
    window.addEventListener("touchmove", markScrolled, { passive: true });

    return () => {
      window.removeEventListener("scroll", markScrolled, true);
      window.removeEventListener("wheel", markScrolled);
      window.removeEventListener("touchmove", markScrolled);
    };
  }, []);

  return (
    <Box sx={sx.root(variant)}>
      <CommentListHeader totalCount={thread.totalCount} />

      <Box sx={sx.composerWrap}>
        <CommentComposer
          avatarUrl={thread.viewer?.avatarUrl || ""}
          onSubmit={thread.createComment}
          placeholder={commentText.composerPlaceholder}
          submitLabel={commentText.submit}
        />
      </Box>

      {(thread.isLoading || prefetchStatus === "loading-root" || prefetchStatus === "loading-replies")
        ? <CommentListSkeleton />
        : null}

      {prefetchStatus !== "loading-root" && prefetchStatus !== "loading-replies" && !thread.isLoading && thread.isError && thread.comments.length === 0 ? (
        <CommentEmptyState
          description={thread.errorMessage || commentText.errorDescription}
          title={commentText.errorTitle}
        />
      ) : null}

      {prefetchStatus !== "loading-root" && prefetchStatus !== "loading-replies" && !thread.isLoading && thread.isEmpty ? <CommentEmptyState /> : null}

      {prefetchStatus !== "loading-root" && prefetchStatus !== "loading-replies" && !thread.isLoading && thread.comments.length > 0 ? (
        <Box data-comment-thread-scroll="true" ref={threadRootRef} sx={sx.threadScroll}>
          <Box sx={sx.threadList}>
            {thread.comments.map((comment) => (
              <CommentBlock
                key={comment.id}
                comment={comment}
                currentUser={thread.viewer}
                onDelete={thread.deleteComment}
                onEdit={thread.editComment}
                onReact={thread.reactComment}
                onReply={thread.createComment}
                targetCommentId={targetCommentId}
              />
            ))}
          </Box>
        </Box>
      ) : null}

      {thread.hasMore ? (
        <>
          {showLoadMoreButton || thread.isLoadingMore ? (
            <Box sx={sx.loadMoreWrap}>
              <CommentListLoadMore
                loading={thread.isLoadingMore}
                onClick={thread.loadMore}
              />
            </Box>
          ) : null}

          {enableInfiniteScroll ? (
            <Box
              ref={infiniteScrollRef}
              sx={{ height: "1px", visibility: "hidden", width: "100%" }}
            />
          ) : null}
        </>
      ) : null}
    </Box>
  );
}
