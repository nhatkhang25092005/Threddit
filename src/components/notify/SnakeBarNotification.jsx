import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material';
export default function SnakeBarNotification({duration, message, open, onClose}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose && onClose();
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose} color='white'>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{
            width: '100%',
            '& .MuiAlert-icon': {
              color: 'white'
            },
            '& .MuiAlert-action': {
              color: 'white'
            }
          }}
        >
          <Typography color={'white'}>{message}</Typography>
        </Alert>
      </Snackbar>
    </div>
  );
}
