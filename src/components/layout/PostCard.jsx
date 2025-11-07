import { Box, Typography } from "@mui/material";
import PostFooter from "../../components/layout/PostFooter";
import PostMenu from "../../components/layout/MenuOption";


export default function PostCard({ author, time, content, menuOptions = [], isMainPost = false  }) {
  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        color: "white",
        borderRadius: "0 0 12px 12px",
        p: 2,
        borderTop: "1px solid #333",
        boxShadow: "0 0 10px rgba(0,0,0,0.4)",
        width: "100%",
        mx: "auto",
        "&:last-child": {
          borderBottom: "1px solid #333",
          borderRadius: "0 0 12px 12px",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
      <PostFooter />
    </Box>
  );
}
