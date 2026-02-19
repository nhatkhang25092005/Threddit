import { Box } from "@mui/material"

export default function ContainerForList({
  sx = {},
  children,
}) {
  return (
    <Box sx={{
      position: 'relative',
      ...sx
    }}>
      {children}
    </Box>
  )
}
