import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function ReplyCard({
  username = "Name_rep",
  topic = "Add a topic",
  mention = "@abc",
  content = "bla bla.....",
}) {
  return (
    <Box
      sx={{
        backgroundColor: "#0f0f0f",
        color: "white",
        px: 2,
        py: 1.5,
        borderBottom: "1px solid #333",
        width: "100%",
      }}
    >
      {/* Tên người dùng */}
      <Typography sx={{ fontWeight: "bold" }}>{username}</Typography>

      {/* Chủ đề */}
      <Typography
        variant="body2"
        sx={{ color: "#9e9e9e", fontStyle: "italic", mt: 0.3 }}
      >
        &gt; {topic}
      </Typography>

      {/* Nội dung có mention */}
      <Typography
        variant="body2"
        sx={{ mt: 0.3, color: "#ddd", wordWrap: "break-word" }}
      >
        <Link
          component="span"
          sx={{
            color: "#3ea6ff",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {mention}
        </Link>{" "}
        {content}
      </Typography>
    </Box>
  );
}
