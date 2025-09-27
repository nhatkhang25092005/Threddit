import { Box } from "@mui/material";
const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  pt: "10rem",
};

export default function Column({ children }) {
  return (
    <Box autoComplete="off" sx={style}>
      {children}
    </Box>
  );
}
