import React from "react";
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function PostMenu({ options = [], iconColor = "#fff" }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => {
    handleClose();
    if (option.onClick) option.onClick();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          color: iconColor,
          "&:hover": { backgroundColor: "#2b2b2b" },
          borderRadius: "8px",
          // p: "4px",
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "#1e1e1e",
            borderRadius: "12px",
            color: "#fff",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
            overflow: "hidden",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => handleOptionClick(option)}
            sx={{
              "&:hover": { backgroundColor: "#2b2b2b" },
              display: "flex",
              justifyContent: "space-between",
              borderBottom:
                index !== options.length - 1
                  ? "1px solid #333"
                  : "none",
            }}
          >
            <ListItemText>{option.label}</ListItemText>
            {option.icon && (
              <ListItemIcon
                sx={{
                  color: "#fff",
                  minWidth: "32px",
                  p:"7px"
                }}
              >
                {option.icon}
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
