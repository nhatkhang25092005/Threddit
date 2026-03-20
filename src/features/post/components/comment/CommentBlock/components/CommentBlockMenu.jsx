import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { commentText } from "../../../../../../constant/text/vi/post/comment.text";
import { style } from "../style";

const sx = style.block;

export default function CommentBlockMenu({
  deleteLoading = false,
  onDelete,
  onEdit,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? "comment-block-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        disabled={deleteLoading}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={sx.menuButton}
      >
        <MoreHorizRoundedIcon sx={{ fontSize: "1.05rem" }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id="comment-block-menu"
        onClose={handleClose}
        open={open}
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 400,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        variant="default"
        slotProps={{
          paper: {
            sx: {
              mt: "0.35rem",
              minWidth: "9rem",
            },
          },
        }}
      >
        <MenuItem
          disabled={deleteLoading}
          onClick={() => {
            onEdit?.();
            handleClose();
          }}
        >
          {commentText.actionEdit}
        </MenuItem>

        {typeof onDelete === "function" ? (
          <MenuItem
            disabled={deleteLoading}
            onClick={async () => {
              await onDelete?.();
              handleClose();
            }}
          >
            {deleteLoading ? <CircularProgress color="inherit" size={14} sx={{ mr: 1 }} /> : null}
            {deleteLoading ? commentText.actionDeleting : commentText.actionDelete}
          </MenuItem>
        ) : null}
      </Menu>
    </>
  );
}
