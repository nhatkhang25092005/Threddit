import { useEffect, useCallback, useRef } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import { loadingActions, requestListActions } from "../store/actions"
import { shouldRetry } from "../../../utils/shouldRetry"
export function useGetRequestList(dispatch, isOwner){
  const notify = useNotify()
  const cursor = useRef(null)
  const abortRef = useRef(null)
  const retryRef = useRef(0)
  const REFETCH_LIMIT = 3

  const getRequestList = useCallback(async () => {
    if(!isOwner) return
    // ===== abort previous request =====
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    const response = await notify.withLoading(
      () => apiService.getRequestList(
        cursor.current,
        abortRef.current.signal
      ),
      (bool) => dispatch(loadingActions.getRequestList(bool))
    )


    if(response?.code === 'ERR_CANCELED') return

    if(response.success){
      if(response.data.receivedFriendRequestList.length === 0){
        dispatch(requestListActions.setHasMore(false))
      }

      dispatch(requestListActions.addRequests(response.data.receivedFriendRequestList))
      cursor.current = response.data.cursor
      retryRef.current = 0
      return
    }

    // ===== backoff retry =====
    if(shouldRetry(response) && retryRef.current < REFETCH_LIMIT){
      retryRef.current += 1
      setTimeout(() => getRequestList(), 300 * retryRef.current)
      return
    }

    // ===== backoff fail =====
    retryRef.current = 0
    notify.popup(modal.title.error, response.message)

  }, [notify, dispatch, isOwner])

  useEffect(()=>{
    cursor.current = null
    retryRef.current = 0
    dispatch(requestListActions.resetRequestList())
    dispatch(requestListActions.setHasMore(true))
    getRequestList()

    // ===== abort when unmount =====
    return () => abortRef.current?.abort()
  },[dispatch, isOwner, getRequestList])


  return{
    getRequestList
  }
}
