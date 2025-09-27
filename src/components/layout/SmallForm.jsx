import { Box } from "@mui/material";
export default function SmallForm({ children }) {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        width: "30vw",
        pt: "1rem",
      }}
    >
      {children}
    </Box>
  );
}
