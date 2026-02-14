import { useEffect, useCallback, useRef } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import { loadingActions, sentListActions } from "../store/actions"
import { shouldRetry } from "../../../utils/shouldRetry"

export function useGetSentList(dispatch, isOwner){
  const notify = useNotify()

  const cursor = useRef(null)
  const abortRef = useRef(null)
  const retryRef = useRef(0)
  const REFETCH_LIMIT = 3

  const getSentList = useCallback(async () => {
    // ===== abort previous request =====
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    const response = await notify.withLoading(
      () => apiService.getSentRequestList(
        cursor.current,
        abortRef.current.signal
      ),
      (bool) => dispatch(loadingActions.getSentList(bool))
    )


    if(response?.code === 'ERR_CANCELED') return

    if(response.success){
      if(response.data.sentFriendRequestList.length === 0){
        dispatch(sentListActions.setHasMore(false))
      }

      dispatch(sentListActions.addSentRequests(response.data.sentFriendRequestList))
      cursor.current = response.data.cursor
      retryRef.current = 0
      return
    }

    // ===== backoff retry =====
    if(shouldRetry(response) && retryRef.current < REFETCH_LIMIT){
      retryRef.current += 1
      setTimeout(() => getSentList(), 300 * retryRef.current)
      return
    }

    // ===== backoff fail =====
    retryRef.current = 0
    notify.popup(modal.title.error, response.message)

  }, [notify, dispatch])

  useEffect(()=>{
    if(!isOwner) return
    cursor.current = null
    retryRef.current = 0
    dispatch(sentListActions.resetSentList())
    dispatch(sentListActions.setHasMore(true))
    getSentList()

    // ===== abort when unmount =====
    return () => abortRef.current?.abort()
  },[getSentList, dispatch, isOwner])


  return{
    getSentList
  }
}
