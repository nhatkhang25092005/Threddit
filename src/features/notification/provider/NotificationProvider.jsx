import {NotificationContext} from './context'
import { useNotification } from '../hooks/useNotification'
import { useMemo, useReducer } from 'react'
import { reducer, initState } from '../reducer'
import { useReadNotification } from '../hooks/useReadNotification'
import { useUnreadNotification } from '../hooks/useUnreadNotification'
import { useDeleteNotification } from '../hooks/useDeleteNotification'
import { useListener } from '../hooks/useListener'
import { useUnreadCount } from '../hooks/useUnreadCount'


export default function NotificationProvider({children}){
  const [state, dispatch] = useReducer(reducer, initState)

  const notificationProps = useNotification(dispatch, state.allHasMore)
  const unreadNotificationProps = useUnreadNotification(dispatch, state.unreadHasMore)
  const {readNotification, readAllNotifications} = useReadNotification(dispatch)
  const {deleteNotification} = useDeleteNotification(dispatch)
  useListener(dispatch)
  useUnreadCount(dispatch)

  const value = useMemo(()=>({
    state,
    actions:{
      notification: {...notificationProps},
      unreadNotification: {...unreadNotificationProps},
      readNotification,
      readAllNotifications,
      deleteNotification
    }
    
  }),[state, notificationProps, unreadNotificationProps, readAllNotifications, readNotification, deleteNotification])

  return(
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}