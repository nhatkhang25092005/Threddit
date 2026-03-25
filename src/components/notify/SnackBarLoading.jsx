import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { keyframes } from '@mui/system'
import { notification } from '../../constant/text/vi/notification.text'

const progressSweep = keyframes`
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(310%);
  }
`

function SlideTransition(props) {
  return <Slide {...props} direction="right" />
}

export default function SnackBarLoading({
  message,
  isLoading,
  open,
  onClose,
}) {
  const visible = typeof open === 'boolean' ? open : Boolean(isLoading)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    onClose?.(event, reason)
  }

  return (
    <Snackbar
      open={visible}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      slots={{ transition: SlideTransition }}
    >
      <Paper
        elevation={0}
        role="status"
        aria-live="polite"
        sx={(theme) => ({
          position: 'relative',
          overflow: 'hidden',
          width: { xs: 'calc(100vw - 32px)', sm: 360 },
          borderRadius: '0.9rem',
          border: '1px solid',
          borderColor:
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.12)'
              : 'rgba(17,17,17,0.1)',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(20,20,20,0.96)'
              : 'rgba(255,255,255,0.98)',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 12px 28px rgba(0,0,0,0.32)'
              : '0 12px 28px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
        })}
      >
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.5,
            color: theme.palette.mode === 'dark' ? '#F5F5F5' : '#111111',
          })}
        >
          <Box
            sx={(theme) => ({
              width: 42,
              height: 42,
              borderRadius: '999px',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.06)'
                  : '#F3F4F6',
              border: '1px solid',
              borderColor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.12)'
                  : 'rgba(17,17,17,0.08)',
            })}
          >
            <CircularProgress
              size={22}
              thickness={5}
              sx={(theme) => ({
                color: theme.palette.mode === 'dark' ? '#F5F5F5' : '#111111',
              })}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={(theme) => ({
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.62)'
                    : 'rgba(17,17,17,0.56)',
              })}
            >
              {notification.loading.title}
            </Typography>

            <Typography
              sx={(theme) => ({
                mt: 0.35,
                fontSize: { xs: '0.92rem', sm: '0.96rem' },
                fontWeight: 600,
                lineHeight: 1.4,
                color: theme.palette.mode === 'dark' ? '#F5F5F5' : '#111111',
                whiteSpace: 'pre-line',
              })}
            >
              {message || notification.loading.defaultMessage}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={(theme) => ({
            position: 'relative',
            height: 3,
            backgroundColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(17,17,17,0.06)',
            overflow: 'hidden',
          })}
        >
          <Box
            sx={(theme) => ({
              width: '28%',
              height: '100%',
              background:
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.84), rgba(255,255,255,0))'
                  : 'linear-gradient(90deg, rgba(17,17,17,0), rgba(17,17,17,0.72), rgba(17,17,17,0))',
              animation: `${progressSweep} 1.8s linear infinite`,
            })}
          />
        </Box>
      </Paper>
    </Snackbar>
  )
}
