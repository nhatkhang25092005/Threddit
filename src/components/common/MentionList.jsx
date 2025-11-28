import { Box } from "@mui/material";

export default function MentionList({ items, onSelect }) {
  if (!items || items.length === 0) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        background: "#1a1a1a",
        border: "1px solid #333",
        borderRadius: "6px",
        zIndex: 1200,
        maxHeight: "200px",
        overflowY: "auto",
      }}
    >
      {items.map((u) => (
        <Box
          key={u.id}
          onClick={() => onSelect(u.username)}
          sx={{
            px: 2,
            py: 1,
            cursor: "pointer",
            color: "#fff",
            "&:hover": { backgroundColor: "#333" }
          }}
        >
          {u.username}
        </Box>
      ))}
    </Box>
  );
}