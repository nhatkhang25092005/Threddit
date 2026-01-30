import { useNotificationContext } from "../hooks/useNotificationContext"
import {notification} from '../../../constant/text/vi/notification.text'
import { style } from "../style"
import {Button, Box, CircularProgress, Typography} from '@mui/material'
const s = style.read_all_btn
export default function ReadAllBtn({sx}){
  const {state, actions} = useNotificationContext()
    return(
      <Button
        onClick={actions.readAllNotifications}
        variant='modal'
        sx={{...s.btn, ...sx}}
        disabled = {state.loading.read_all}
        >
        {state.loading.read_all
          ? <Box sx={s.loading_container}>
              <CircularProgress size={12} color='white'/>
              <Typography fontSize={12} color='#ababab'>{notification.popover.read_all.loading}</Typography>
            </Box>
          : <Typography fontSize={12}>{notification.popover.read_all.txt}</Typography>
        }
      </Button>
    )
  }