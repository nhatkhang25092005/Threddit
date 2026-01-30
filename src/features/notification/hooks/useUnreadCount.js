import { useEffect, useRef, useCallback } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { services } from "../services"
import { modal } from "../../../constant/text/vi/modal"
import { unreadCountActions } from "../actions"
import { shouldRetry } from "../../../utils/shouldRetry"

export function useUnreadCount(dispatch){
  const notify = useNotify()
  const abortRef = useRef(null)
  const retryRef = useRef(0)
  const REFETCH_LIMIT = 3

  const getUnreadCount = useCallback(async () => {
    console.log('hello')
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    const response = await notify.withLoading(
      () => services.getUnreadCount(abortRef.current.signal),
      (bool) => dispatch(unreadCountActions.getUnreadCountLoading(bool))
    )

    if (response?.code === 'ERR_CANCELED') return

    if (response.success) {
      console.log(response)
      dispatch(unreadCountActions.setUnreadCount(response.data))
      retryRef.current = 0
      return
    }

    // backoff retry
    if (shouldRetry(response) && retryRef.current < REFETCH_LIMIT){
      retryRef.current += 1
      setTimeout(() => getUnreadCount(), 300 * retryRef.current)
      return
    }

    retryRef.current = 0
    notify.popup(modal.title.error, response.message)

  }, [dispatch, notify])

  useEffect(() => {
    getUnreadCount()
    return () => abortRef.current?.abort()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
