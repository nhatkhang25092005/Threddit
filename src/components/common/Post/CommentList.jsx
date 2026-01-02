import { Box, Fade, Typography } from "@mui/material";
import Comment from "../Comment";
import { TEXT } from "../../../constant";
import CircularProgress from "@mui/material/CircularProgress";
import { memo } from "react";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
const CommentList = memo(({
  comments = [],
  postId,
  pagination = {},
  onResult,
  onUpdate,
}) => {
  const {
    hasMore = false,
    loading = false,
    loadMore = null,
  } = pagination


  // Undefined
  const paginationRef = useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore:loadMore
  })

  if(comments.length === 0 ){
    return(
      <Box>
        <Box sx={{ flex: 1, my: '5rem' }}>
          <Typography textAlign="center" color="text.secondary">
            {TEXT.NO_COMMENTS}
          </Typography>
        </Box>
      </Box>
    )
  }
  return (
    <Box sx={{ pt: '2rem' }}>
      {/* Comment List */}
      {comments.map((comment, index) => (
        <Comment
          key={comment.id || index}
          comment={comment}
          postId={postId}
          onUpdate={onUpdate}
          onResult={onResult}
        />
      ))}

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div
          ref={paginationRef}
          style={{
            height: '1px',
            visibility: 'visible'
          }}
        />
      )}

      {/* Loading Indicator */}
      <Fade in={loading} unmountOnExit>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 2
        }}>
          <CircularProgress sx={{ color: "white" }} size={30} />
        </Box>
      </Fade>

      {/* End Message */}
      {!hasMore && comments.length > 0 && (
        <Box sx={{ py: 2 }}>
          <Typography
            textAlign="center"
            variant="subtitle2"
            color="white"
          >
            {TEXT.NO_MORE_COMMENTS || "Không còn bình luận nào"}
          </Typography>
        </Box>
      )}
    </Box>
  );
});

CommentList.displayname = "CommentList";
export default CommentList;
