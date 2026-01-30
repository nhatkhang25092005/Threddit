import { Box, Typography, Badge} from '@mui/material'
import { style } from './style'
import NotificationList from './components/NotificationList';
import {notification} from '../../constant/text/vi/notification.text'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PopoverButton from '../../components/common/button/PopoverButton';
import TabsController from '../../components/layout/TabsController';
import { useNotificationContext } from './hooks/useNotificationContext';
import ReadAllBtn from './components/ReadAllBtn';
const sx=style.popover
const text = notification.popover
export default function PopoverNotification({closeReason, disable= false, onClose}){
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
    <Badge
      color='error'
      badgeContent={state.unreadCount}
      invisible={false}
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <PopoverButton
        closeReason={closeReason}
        onClose={onClose}
        disable={disable}
        Icon={NotificationsIcon}
        surfaceVariant='modal'
        surfaceSx={{p:2}}
      >
        <Box sx={sx.container}>
          <Box sx={sx.header}>
            <Typography variant='title'>{text.title}</Typography>
            {state.unreadNotifications.length > 0  && <ReadAllBtn/>}
          </Box>
          <TabsController sx={sx.tabs_controller}>
            <NotificationList label={text.tabs.all} {...allNotificationProps}/>
            <NotificationList label={text.tabs.unread} {...unreadNotificationProps}/>
          </TabsController>
        </Box>
      </PopoverButton>
    </Badge>
  )
}