import { useRef } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { services } from "../services"
import { deleteNotificationActions } from "../actions"
import { modal } from "../../../constant/text/vi/modal"

export function useDeleteNotification(dispatch){
  const notify = useNotify()
  const pendingRef = useRef(new Set())

  const deleteNotification = async (id) => {
    if (pendingRef.current.has(id)) return
    pendingRef.current.add(id)

    const r = await notify.withLoading(
      () => services.deleteNotification(id),
      (bool) => dispatch(deleteNotificationActions.deleteNotificationLoading(bool, id))
    )

    if (r.success) {
      dispatch(deleteNotificationActions.removeNotification(id))
      notify.snackbar(r.message, 2000)
    } else {
      notify.popup(modal.title.error, r.message)
    }

    pendingRef.current.delete(id)
  }

  return {
    deleteNotification
  }
}
