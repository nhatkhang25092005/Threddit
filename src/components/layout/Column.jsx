import { Box } from "@mui/material";
export default function Column({ debug = false,customStyle, children }) {
  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pt: "10rem",
    ...customStyle,
    ...(debug && { border: "1px solid red" }),
  };
  return (
    <Box autoComplete="off" sx={style}>
      {children}
    </Box>
  );
}
