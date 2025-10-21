import React from "react";
import { Box, Typography } from "@mui/material";

export default function ActionButton({
  icon,
  count,
  onClick,
  sx = {},
  rounded = false, // nếu true thì bo tròn 100% (cho nút gửi)
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        backgroundColor: "#2b2b2b",
        color: "#fff",
        borderRadius: rounded ? "50%" : "30px",
        px: rounded ? "10px" : "14px",
        py: "6px",
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": {
          backgroundColor: "#3a3a3a",
          transform: "scale(1.03)",
        },
        ...sx,
      }}
    >
      {icon}
      {count && (
        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
          {count}
        </Typography>
      )}
    </Box>
  );
}
