import { Box, Typography, CircularProgress } from "@mui/material"
export default function LoadingUI({message}) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '10rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={24} color="white" />
      <Typography color="text.secondary">
        {message}
      </Typography>
    </Box>
  )
}