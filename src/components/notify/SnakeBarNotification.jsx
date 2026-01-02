import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnakeBarNotification({duration, message, open, onClose}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose && onClose();
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
