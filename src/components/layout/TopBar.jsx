import React from "react";
import { Box, Typography } from "@mui/material";
import CustomButton from "./button";

export default function TopBar({ title = "Trang chủ", onLogin }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0f0f0f",
        color: "white",
        padding: "10px 20px",
        // borderBottom: "1px solid #222",
        position: "fixed",
        top: 0,
        left: "5%", 
        right: 0,
        // zIndex: 10,
      }}
    >
  <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "50%",
          transformOrigin: "center",
          translate: "-50%  -50%", // hỗ trợ CSS shorthand nếu môi trường chấp nhận
          pointerEvents: "none", // tránh chặn click vào nút
        }}
      >
        {title}
      </Typography>
      <CustomButton 
      sx={{
          textTransform: "none",
          alignItems: "center",    // fix typo
          backgroundColor: "white",
          color: "black",
          fontWeight: 600,
          ml: "auto",
      }}
              label="Đăng nhập" onClick={onLogin} />
    </Box>
  );
}
