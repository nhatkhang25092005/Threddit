import {Box} from '@mui/material'
export default function TagItem({ username }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.5,
        py: 0.5,
        borderRadius: "999rem",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,0,0,0.1)",
        fontSize: "12px",
        fontWeight: 500,
        whiteSpace: "nowrap",
        lineHeight: 1,
        cursor: "default",
      }}
    >
      @{username}
    </Box>
  );
}