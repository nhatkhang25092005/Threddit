import React from "react";
import { Box, Typography } from "@mui/material";
import PostFooter from "./PostFooter";
import PostMenu from "./MenuOption";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";

export default function PostCard({ author, time, content }) {
   // 🔸 Đây là mảng các tùy chọn bạn muốn hiển thị trong menu:
  const menuOptions = [
    {
      label: "Xóa bài viết",
      icon: <DeleteIcon fontSize="small" />,
      onClick: () => alert("Đã chọn: Xóa bài viết"),
    },
    {
      label: "Sửa bài viết",
      icon: <EditIcon fontSize="small" />,
      onClick: () => alert("Đã chọn: Sửa bài viết"),
    },
    {
      label: "Ghim bài viết",
      icon: <PushPinIcon fontSize="small" />,
      onClick: () => alert("Đã chọn: Ghim bài viết"),
    },
  ];

  
  return (
    <Box
      sx={{
        backgroundColor: "#1a1a1a",
        color: "white",
        borderRadius: "0 0 12px 12px",
        p: 2,
        border: "1px solid #A6A6A6",
        boxShadow: "0 0 10px rgba(0,0,0,0.4)",
        width: "80%",
        mx: "auto",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {author}
        </Typography>
        <Typography component="span" sx={{ color: "#aaa", fontSize: 14 }}>
          {time}
        </Typography>
           <Box sx={{ ml: "auto" }}>
    <PostMenu options={menuOptions} iconColor="#fff" />
  </Box>
      </Box>

      {/* Content */}
      <Typography sx={{ mt: 1, mb: 2, color: "#ddd" }}>{content}</Typography>

      {/* Footer */}
      <PostFooter />
    </Box>
  );
}
