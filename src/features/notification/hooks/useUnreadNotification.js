import { useState, useEffect, useCallback, useRef } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { services } from "../services"
import { convertTime } from "../../../utils/formatDate"
import { modal } from "../../../constant/text/vi/modal"
import { unreadNotificationActions } from "../actions"

export function useUnreadNotification(dispatch, hasMore) {
  const [getAll, setGetAll] = useState(false)
  const notify = useNotify()
  const cursor = useRef(null)
  const abortRef = useRef(null)

  const getUnreadNotification = useCallback(async () => {
    if (!hasMore) return

  abortRef.current?.abort()
    abortRef.current = new AbortController()

    const response = await notify.withLoading(
      () => services.getUnreadNotification(cursor.current, abortRef.current.signal),
      (bool) => dispatch(unreadNotificationActions.getUnreadNotificationLoading(bool))
    )

    // umount will absorb the fetching
    if(response.code === "ERR_CANCELED") return

    if (response.success) {
      const list = response.data.unreadNotifications

      // no more data
      if (list.length === 0) {
        dispatch(unreadNotificationActions.setHasMoreUnreadNotification(false))
        return
      }

      // convert time
      const converted = list.map(item => ({ ...item, createdAt: convertTime(item.createdAt) }))

      // pagination
      dispatch(unreadNotificationActions.appendUnreadNotification(converted))

      // update cursor
      cursor.current = response.data.cursor
    }
    else { notify.popup(modal.title.error, response.message) }
  }, [notify, hasMore, dispatch])

  useEffect(() => {
    getUnreadNotification()
    return () => { abortRef.current?.abort() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    getUnreadNotification,
    hasMore,
    getAll,
    setGetAll,
  }
}
