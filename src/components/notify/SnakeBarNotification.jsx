import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { Typography } from '@mui/material'

const SEVERITY_MAP = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
}

export default function SnakeBarNotification({
  duration,
  message,
  open,
  onClose,
  type = 'success',
}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    onClose && onClose()
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={SEVERITY_MAP[type] || 'success'}
        variant="filled"
        sx={{
          width: '100%',
          '& .MuiAlert-icon': { color: 'white' },
          '& .MuiAlert-action': { color: 'white' },
        }}
      >
        <Typography color="white" whiteSpace="pre-line">
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  )
}
