import { Box } from "@mui/material";
import { style } from "../style";

export default function ReelViewport({ children }) {
  return (
    <Box sx={style.page}>
      <Box sx={style.shell}>
        <Box sx={style.viewport}>{children}</Box>
      </Box>
    </Box>
  )
}
