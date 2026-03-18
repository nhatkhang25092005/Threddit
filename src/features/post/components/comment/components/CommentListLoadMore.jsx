import { Button, CircularProgress } from "@mui/material";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import { style } from "../style";

const sx = style.list;

export default function CommentListLoadMore({ loading = false, onClick }) {
  return (
    <Button
      disabled={loading}
      onClick={onClick}
      sx={sx.loadMoreButton}
      variant="outlined"
    >
      {loading ? <CircularProgress color="inherit" size={18} /> : commentText.loadMoreComments}
    </Button>
  );
}
