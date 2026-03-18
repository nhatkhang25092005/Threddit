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
  isEditing = false,
  onCancelEdit,
  onDelete,
  onEdit,
  onSubmitEdit,
}) {
  return (
    <Box sx={sx.bubble}>
      <CommentBlockHeader
        author={comment.author}
        canManage={comment.meta?.isOwner}
        createdLabel={comment.meta?.createdLabel}
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
        <>
          {comment.replyTo?.username ? (
            <Typography sx={sx.replyTo}>
              {commentText.replyToPrefix} @{comment.replyTo.username}
            </Typography>
          ) : null}

          {comment.text ? <Typography sx={sx.text}>{comment.text}</Typography> : null}

          <CommentMediaList items={comment.media} />
        </>
      )}
    </Box>
  );
}
