import { Box, ButtonBase, CircularProgress, Typography } from "@mui/material";
import { Fragment } from "react";
import { commentText } from "../../../../../../constant/text/vi/post/comment.text";
import { style } from "../style";

const sx = style.block;
const EMPTY_REPLIES_MESSAGE = "Hiện chưa có phản hồi.";

export default function CommentBlockReplies({
  hasMoreReplies = false,
  isLoadingMoreReplies = false,
  onCollapseReplies,
  replies = [],
  repliesLoadMoreRef,
  renderReply,
  showCollapseReplies = false,
  showEmptyReplies = false,
}) {
  return (
    <>
      {showEmptyReplies ? (
        <Box sx={sx.repliesNotice}>
          <Typography sx={sx.repliesNoticeText}>
            {EMPTY_REPLIES_MESSAGE}
          </Typography>
        </Box>
      ) : null}

      {replies.length > 0 ? (
        <Box sx={sx.repliesWrap}>
          {replies.map((reply) => (
            <Fragment key={reply.id}>
              {renderReply(reply)}
            </Fragment>
          ))}

          {hasMoreReplies ? (
            <Box ref={repliesLoadMoreRef} sx={sx.repliesSentinel} />
          ) : null}

          {isLoadingMoreReplies ? (
            <Box sx={sx.repliesLoading}>
              <CircularProgress color="inherit" size={16} />
            </Box>
          ) : null}
        </Box>
      ) : null}

      {showCollapseReplies ? (
        <ButtonBase onClick={onCollapseReplies} sx={sx.repliesToggle}>
          <Typography
            component="span"
            sx={{ fontSize: "inherit", fontWeight: "inherit" }}
          >
            {commentText.collapseReplies}
          </Typography>
        </ButtonBase>
      ) : null}
    </>
  );
}
