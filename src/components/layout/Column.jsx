import { Box } from "@mui/material";
export default function Column({ customStyle, children }) {
  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pt: "10rem",
    ...customStyle
  };
  return (
    <Box autoComplete="off" sx={style}>
      {children}
    </Box>
  );
}
