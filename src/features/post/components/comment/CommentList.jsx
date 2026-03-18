import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { commentText } from "../../../../constant/text/vi/post/comment.text";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll";
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
  variant = "modal",
}) {
  const thread = useCommentThread(postId, initialCount);
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
    if (typeof onCountChange === "function") {
      onCountChange(thread.totalCount);
    }
  }, [onCountChange, thread.totalCount]);

  useEffect(() => {
    setHasUserScrolled(false);
  }, [postId]);

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

      {thread.isLoading ? <CommentListSkeleton /> : null}

      {!thread.isLoading && thread.isError && thread.comments.length === 0 ? (
        <CommentEmptyState
          description={thread.errorMessage || commentText.errorDescription}
          title={commentText.errorTitle}
        />
      ) : null}

      {!thread.isLoading && thread.isEmpty ? <CommentEmptyState /> : null}

      {!thread.isLoading && thread.comments.length > 0 ? (
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
            />
          ))}
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
