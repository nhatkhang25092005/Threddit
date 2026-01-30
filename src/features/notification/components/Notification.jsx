import {Box, Avatar, Typography, useTheme, CircularProgress} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import { style } from '../style'
import {notification} from '../../../constant/text/vi/notification.text'
import HorizonMenu from '../../../components/common/button/HorizonMenu'
import { useNotificationContext } from '../hooks/useNotificationContext';
const sx = style.notification

export default function Notification({data}){
  const {actions, state} = useNotificationContext()
  const theme = useTheme()
  const isRead = data.isRead
  const isReading = state.loading.reading.id === data.id && state.loading.reading.active === true
  const isDeleting = state.loading.delete.id === data.id && state.loading.delete.active === true
  const tasks = [
    ...(!isRead
      ? [{
          label: isReading
            ? (<CircularProgress sx={{mx:'auto'}} size={24} color='white'/>)
            : notification.notification.mark_as_read,
          func: async () => await actions.readNotification(data.id)
        }]
      : []),
    ...[{
      label:isDeleting
        ? (<CircularProgress sx={{mx:'auto'}} size={24} color='white'/>)
        : notification.notification.delete,
      func:async () => await actions.deleteNotification(data.id)
    }]
  ]

  return(
    <Box sx={sx.container(theme.palette.mode)}>
      <Avatar sx={sx.avatar} src={data.target.actorAvatarUrl}/>
      <Box sx={sx.content.container}>
        <Box><Typography sx={sx.content.message(isRead, theme.palette.mode)}>{data.message}</Typography></Box>
        <Typography variant='normal' sx={sx.content.time(isRead)}> {data.createdAt}</Typography>
      </Box>
      <HorizonMenu
        tasks={tasks}
        sx={sx.content.menu}
        className={'horizon-menu'}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      />
      {!isRead && <CircleIcon fontSize='2rem' sx={sx.circle_icon}/>}
    </Box>
  )
}