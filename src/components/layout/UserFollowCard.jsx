import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

export default function UserFollowCard({ name = "Name_User" }) {
  // 🟢 Trạng thái theo dõi
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollowClick = () => {
    setIsFollowed(!isFollowed); // đổi trạng thái khi nhấn nút
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
        borderTop: "1px solid #333",
        px: 3,
        py: 1.5,
        width: "100%",
        color: "white",
        transition: "0.2s",
        "&:last-child": {
          borderBottom: "1px solid #333",
          borderRadius: "0 0 12px 12px",
        },
        "&:hover": { backgroundColor: "#222" },
      }}
    >
      {/* Tên người dùng */}
      <Typography sx={{ fontWeight: "bold", fontSize: 15 }}>{name}</Typography>

      {/* Nút Theo dõi / Đã theo dõi */}
      <Button
        variant="contained"
        onClick={handleFollowClick}
        sx={{
          backgroundColor: isFollowed ? "#444" : "#fff",
          color: isFollowed ? "#fff" : "#000",
          fontWeight: "bold",
          borderRadius: "8px",
          textTransform: "none",
          minWidth: "110px",
          "&:hover": {
            backgroundColor: isFollowed ? "#555" : "#e5e5e5",
          },
          transition: "all 0.25s ease",
        }}
      >
        {isFollowed ? "Đã theo dõi" : "Theo dõi"}
      </Button>
    </Box>
  );
}
