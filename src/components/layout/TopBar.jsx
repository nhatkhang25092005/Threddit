import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomButton from "./button";
import useProfile from "../../features/user/hooks/useProfile"; // 👈 import hook

export default function TopBar({ title = "Trang chủ", onLogin }) {
  const { userInfo, getUserInfo } = useProfile();

  // 🔹 Khi load TopBar lần đầu, lấy thông tin user
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
        padding: "10px 20px",
        position: "fixed",
        top: 0,
        left: "5%",
        right: 0,
      }}
    >
      {/* --- Tiêu đề ở giữa --- */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "50%",
          translate: "0 -50%",
          pointerEvents: "none",
        }}
      >
        {title}
      </Typography>

      {/* --- Phần bên phải: Đăng nhập / User --- */}
      {userInfo?.username ? (
        // Nếu đã đăng nhập, hiển thị tên user
        <Typography sx={{ ml: "auto", fontWeight: 600, color: "#fff" }}>
          {userInfo.username}
        </Typography>
      ) : (
        // Nếu chưa đăng nhập, hiển thị nút đăng nhập
        <CustomButton
          label="Đăng nhập"
          onClick={onLogin}
          sx={{
            textTransform: "none",
            backgroundColor: "white",
            color: "black",
            fontWeight: 600,
            ml: "auto",
          }}
        />
      )}
    </Box>
  );
}
