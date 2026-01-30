import { useRef } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { services } from "../services"
import { readNotificationActions, unreadCountActions } from "../actions"
import { modal } from "../../../constant/text/vi/modal"
export function useReadNotification(dispatch){
  const notify = useNotify()
  const pendingRef = useRef(new Set())

  const readNotification = async (id) => {
    
    if(pendingRef.current.has(id)) return
    pendingRef.current.add(id)

    const r = await notify.withLoading(
      () => services.readNotification(id),
      (bool)=>dispatch(readNotificationActions.readNotificationLoading(bool, id))
    )
    if(r.success){
      dispatch(readNotificationActions.setNewReadState(id))
      dispatch(unreadCountActions.decrementUnreadCount())
      notify.snackbar(r.message,2000)
      return
    }

    else notify.popup(modal.title.error, r.message)
    
    pendingRef.current.delete(id)
  }
  
  const readAllNotifications = async () => {
    if(pendingRef.current.has("READ_ALL")) return
    pendingRef.current.add("READ_ALL")

    const r = await notify.withLoading(
      () => services.readAllNotification(),
      (bool) => dispatch(readNotificationActions.readAllNotificationLoading(bool))
    )

    if (r.success) {
      dispatch(readNotificationActions.setAllAsRead())
      dispatch(unreadCountActions.setUnreadCount(0))
      notify.snackbar(r.message, 2000)
    }
    else notify.popup(modal.title.error, r.message)

    pendingRef.current.delete("READ_ALL")
  }


  return{
    readNotification,
    readAllNotifications
  }
}