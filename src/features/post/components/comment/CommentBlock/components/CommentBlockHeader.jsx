import { Box, Typography } from "@mui/material";
import { commentText } from "../../../../../../constant/text/vi/post/comment.text";
import { style } from "../style";
import CommentBlockMenu from "./CommentBlockMenu";

const sx = style.block;

export default function CommentBlockHeader({
  author,
  canManage,
  createdLabel,
  deleteLoading,
  onDelete,
  onEdit,
}) {
  return (
    <Box sx={sx.bubbleHeader}>
      <Box sx={sx.bubbleMeta}>
        <Typography sx={sx.authorName}>
          {author?.displayName || author?.username || "User"}
        </Typography>

        {author?.isViewer ? <Box sx={sx.ownerBadge}>{commentText.ownerBadge}</Box> : null}

        <Typography sx={sx.time}>{createdLabel}</Typography>
      </Box>

      {canManage ? (
        <CommentBlockMenu
          deleteLoading={deleteLoading}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ) : null}
    </Box>
  );
}
