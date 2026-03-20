import { Box, ButtonBase, CircularProgress, Typography } from "@mui/material";
import { commentText } from "../../../../../../constant/text/vi/post/comment.text";
import { CommentReactionButton } from "../../components";
import { style } from "../style";

const sx = style.block;

export default function CommentBlockActions({
  comment,
  isViewRepliesLoading = false,
  onViewReplies,
  onReply,
  onReact,
  viewRepliesLabel,
}) {
  const canReply = typeof onReply === "function";
  const canViewReplies =
    typeof onViewReplies === "function" &&
    (
      isViewRepliesLoading ||
      Boolean(comment?.hasChildComment) ||
      Number(comment?.stats?.replyNumber ?? 0) > 0 ||
      (Array.isArray(comment?.children) && comment.children.length > 0)
    );

  return (
    <Box sx={sx.actions}>
      <CommentReactionButton
        onReact={onReact}
        reaction={comment.viewer?.reaction}
      />

      {canReply ? (
        <ButtonBase onClick={onReply} sx={sx.actionButton}>
          <Typography component="span" sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
            {commentText.actionReply}
          </Typography>
        </ButtonBase>
      ) : null}

      {canViewReplies ? (
        <ButtonBase
          disabled={isViewRepliesLoading}
          onClick={onViewReplies}
          sx={sx.actionButton}
        >
          <Typography component="span" sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
            {isViewRepliesLoading ? <CircularProgress color="inherit" size={14} /> : viewRepliesLabel}
          </Typography>
        </ButtonBase>
      ) : null}

    </Box>
  );
}
