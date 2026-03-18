import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { commentText } from "../../../../../../constant/text/vi/post/comment.text";
import { style } from "../style";

const sx = style.block;

export default function CommentBlockMenu({ onDelete, onEdit }) {
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
          onClick={() => {
            onEdit?.();
            handleClose();
          }}
        >
          {commentText.actionEdit}
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete?.();
            handleClose();
          }}
        >
          {commentText.actionDelete}
        </MenuItem>
      </Menu>
    </>
  );
}
