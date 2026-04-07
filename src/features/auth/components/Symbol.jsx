import { Box } from "@mui/material"
import Logo from "../../../components/common/Logo"

const style = {
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}

export default function Symbol() {
  return (
    <Box sx={style}>
      <Logo
        sx={{
          fontSize: {
            xs: "4.5rem",
            sm: "5.5rem",
            md: "6.75rem",
          },
        }}
      />
    </Box>
  )
}
