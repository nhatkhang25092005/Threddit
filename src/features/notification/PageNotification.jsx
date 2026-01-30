import {Box, Typography} from '@mui/material'
import {notification} from '../../constant/text/vi/notification.text'
import Surface from '../../components/common/Surface'
import NotificationList from './components/NotificationList'
import TabsController from '../../components/layout/TabsController'
import { useNotificationContext } from './hooks/useNotificationContext'
import ReadAllBtn from './components/ReadAllBtn'
import { style } from './style'
const sx = style.page
const text =notification.page
export default function PageNotification(){
  const {state, actions} = useNotificationContext()
  
  const allNotificationProps = {
    getAll:actions.notification.getAll,
    notifications:state.allNotifications,
    fetch:actions.notification.getNotification,
    loading:state.loading.all,
    setGetAll:actions.notification.setGetAll,
    hasMore:state.allHasMore
  }

  const unreadNotificationProps = {
    getAll:actions.unreadNotification.getAll,
    notifications:state.unreadNotifications,
    fetch:actions.unreadNotification.getUnreadNotification,
    loading:state.loading.unread,
    setGetAll:actions.unreadNotification.setGetAll,
    hasMore:state.unreadHasMore
  }
  
  return(
    <Box sx={sx.container}>
      <Typography variant='title'textAlign='center'>{text.title}</Typography>
      <Surface sx={sx.surface}>
        <TabsController sx={sx.tabs_controller}>
          <NotificationList label={text.tabs.all} isPage {...allNotificationProps}/>
          <NotificationList label={text.tabs.unread} isPage {...unreadNotificationProps}/>
        </TabsController>
        {state.unreadNotifications.length > 0 && <ReadAllBtn sx={{position:'absolute', top:'1.5rem', right:'1rem'}}/>}
      </Surface>
    </Box>
  )
}