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
  const canInteractWithReplies = comment?.level === 0;

  return (
    <Box sx={sx.actions}>
      <CommentReactionButton
        onReact={onReact}
        reaction={comment.viewer?.reaction}
        reactionCount={comment.stats?.reactionNumber ?? 0}
      />

      {canInteractWithReplies ? (
        <ButtonBase onClick={onReply} sx={sx.actionButton}>
          <Typography component="span" sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
            {commentText.actionReply}
          </Typography>
        </ButtonBase>
      ) : null}

      {canInteractWithReplies ? (
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

      {comment.meta?.isEdited ? (
        <Typography component="span" sx={sx.editedLabel}>
          {commentText.editedLabel}
        </Typography>
      ) : null}
    </Box>
  );
}
