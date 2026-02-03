import { Box, Typography } from "@mui/material"
export default function EmptyListUI({message}) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '10rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography color="text.secondary">
        {message}
      </Typography>
    </Box>
  )
}