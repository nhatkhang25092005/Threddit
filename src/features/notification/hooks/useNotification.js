import { useState, useEffect, useCallback, useRef} from "react"
import {useNotify} from '../../../hooks/useNotify'
import { services } from "../services"
import { convertTime } from "../../../utils/formatDate"
import {modal} from '../../../constant/text/vi/modal'
import { notificationActions } from "../actions"
import { shouldRetry } from "../../../utils/shouldRetry"

export function useNotification(dispatch, hasMore){
  const notify = useNotify()
  const [getAll, setGetAll] = useState(false)
  const cursor = useRef(null)
  const abortRef = useRef(null)
  const retryRef = useRef(0)
  const REFETCH_LIMIT = 3

  const getNotification = useCallback (async () => {
    if(!hasMore) return

    abortRef.current?.abort() // remove previous signal
    abortRef.current = new AbortController() // recreate new signal

    const response = await notify.withLoading(
      () => services.getNotification(cursor.current, abortRef.current.signal),
      (bool) => dispatch(notificationActions.getAllNotificationLoading(bool))
    )
    
    if(response.code === 'ERR_CANCELED') return

    if(response.success){
      // Check array length
      if(response.data.notifications.length == 0) {
        dispatch(notificationActions.setHasMoreNotification(false))
        return
      }

      // Convert format
      const convertedTimeArray = response.data.notifications.map(item=>({
        ...item,
        createdAt:convertTime(item.createdAt)
      }))

      dispatch(notificationActions.appendAllNotification(convertedTimeArray))

      // updates cursor for next fetching turn
      cursor.current = response.data.cursor
      return
    }

    // backoff
    if(shouldRetry(response) && retryRef.current <= REFETCH_LIMIT){
      retryRef.current += 1
      setTimeout(()=>getNotification(),300*retryRef.current)
      return
    }

    // backoff fail
    retryRef.current = 0
    notify.popup(modal.title.error, response.message)
  },[notify, hasMore, dispatch])

  
  useEffect(()=>{
    getNotification()
    return () => abortRef.current?.abort() // aborting the request if the component is unmounted
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return{
    getAll,
    setGetAll,
    getNotification,
  }
}