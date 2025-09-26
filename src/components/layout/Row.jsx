import { Box } from "@mui/material";

export default function Row({config ,children }) {
  const style = {
    display:"flex",
    flexDirection:"row",
    gap:1,
    alignItems:"center",
    ...config
}
  return <Box sx={style}>{children}</Box>;
}
