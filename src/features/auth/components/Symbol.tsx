import { Box } from "@mui/material";
import Logo from "../../../components/common/Logo";

const style = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as const

export default function Symbol() {
  return (
    <Box sx={style}>
      <Logo
        sx={{
          fontSize: {
            xs: "4.5rem",
            md: "6.75rem",
          },
        }}
      />
    </Box>
  )
}
