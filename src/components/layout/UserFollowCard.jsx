import { Box, Typography, Button } from "@mui/material";

export default function UserFollowCard({
  name,
  buttonText,
  onFollow,
}) {
  const isFollowing = buttonText === "Đã theo dõi";

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
        color={isFollowing ? "inherit" : "primary"}
        onClick={onFollow}
        sx={{
          backgroundColor: isFollowing ? "#444" : "#fff",
          color: isFollowing? "#fff" : "#000",
          fontWeight: "bold",
          borderRadius: "8px",
          textTransform: "none",
          minWidth: "110px",
          "&:hover": {
            backgroundColor: isFollowing ? "#555" : "#e5e5e5",
          },
          transition: "all 0.25s ease",
        }}
      >
        {isFollowing ? "Đã theo dõi" : "Theo dõi"}
      </Button>
    </Box>
  );
}
