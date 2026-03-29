import { Box, Typography } from "@mui/material";
import { commentText } from "../../../../../../constant/text/vi/post/comment.text";
import {
  CommentComposer,
  CommentMediaList,
} from "../../components";
import { style } from "../style";
import CommentBlockHeader from "./CommentBlockHeader";

const sx = style.block;

export default function CommentBlockBubble({
  comment,
  currentUser,
  isDeleting = false,
  isEditing = false,
  isTargetComment = false,
  onCancelEdit,
  onDelete,
  onEdit,
  onSubmitEdit,
}) {
  return (
    <Box
      sx={[
        sx.bubble,
        isTargetComment && {
          borderColor: (theme) => (
            theme.palette.mode === "dark"
              ? "rgba(96, 165, 250, 0.85)"
              : "rgba(37, 99, 235, 0.7)"
          ),
          backgroundColor: (theme) => (
            theme.palette.mode === "dark"
              ? "rgba(28, 41, 61, 0.95)"
              : "rgba(235, 244, 255, 0.95)"
          ),
          boxShadow: (theme) => (
            theme.palette.mode === "dark"
              ? "0 0 0 0.18rem rgba(59, 130, 246, 0.18)"
              : "0 0 0 0.16rem rgba(59, 130, 246, 0.14)"
          ),
        }
      ]}
    >
      <CommentBlockHeader
        author={comment.author}
        canManage={comment.meta?.isOwner}
        createdLabel={comment.meta?.createdLabel}
        deleteLoading={isDeleting}
        onDelete={onDelete}
        onEdit={onEdit}
      />

      {isEditing ? (
        <CommentComposer
          autoFocus
          avatarUrl={currentUser?.avatarUrl || ""}
          compact
          initialMedia={comment.media}
          initialText={comment.text}
          onCancel={onCancelEdit}
          onSubmit={onSubmitEdit}
          placeholder={commentText.editPlaceholder}
          submitLabel={commentText.saveEdit}
        />
      ) : (
        <Box sx={sx.bubbleContent}>
          {comment.replyTo?.username ? (
            <Typography sx={sx.replyTo}>
              {commentText.replyToPrefix} @{comment.replyTo.username}
            </Typography>
          ) : null}

          {comment.text ? <Typography sx={sx.text}>{comment.text}</Typography> : null}

          <CommentMediaList items={comment.media} />
        </Box>
      )}
    </Box>
  );
}
