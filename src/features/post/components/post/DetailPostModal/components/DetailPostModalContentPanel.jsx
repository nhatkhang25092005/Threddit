import { Box } from "@mui/material";
import { CommentList } from "../../../comment";
import DetailPostModalPostContent from "./DetailPostModalPostContent";
import { style } from "../style";

const sx = style.modal;

export default function DetailPostModalContentPanel({
  commentId,
  commentSectionRef,
  detail,
  isSubComment = false,
  onCommentClick,
}) {
  return (
    <Box sx={sx.contentPanel}>
      <Box sx={sx.contentScroll}>
        <DetailPostModalPostContent
          detail={detail}
          onCommentClick={onCommentClick}
        />

        <Box ref={commentSectionRef}>
          <CommentList
            initialCount={detail?.stats?.commentNumber ?? 0}
            postId={detail?.id}
            targetCommentId={commentId}
            targetIsSubComment={isSubComment}
            variant="modal"
          />
        </Box>
      </Box>
    </Box>
  );
}
