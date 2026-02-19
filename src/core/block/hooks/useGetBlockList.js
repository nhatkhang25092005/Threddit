import { useEffect, useCallback, useRef } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { loadingActions, blockListActions } from "../store/actions"
import { shouldRetry } from "../../../utils/shouldRetry"
import { modal } from '../../../constant/text/vi/modal'

export function useGetBlockList(dispatch, hasMore) {
  const notify = useNotify()
  const abortRef = useRef(null)
  const retryRef = useRef(0)
  const cursor = useRef(null)
  const REFETCH_LIMIT = 3

  const getBlockList = useCallback(async () => {

    if(!hasMore) return
    // Cancel previous request
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    const response = await notify.withLoading(
      () => apiService.getBlockList(cursor.current, abortRef.current.signal),
      (bool) => dispatch(loadingActions.setBlockListLoading(bool))
    )
  
    if (response?.code === 'ERR_CANCELED') return

    if (response.success) {
      if (response.data.blockedList?.length === 0) {
        dispatch(blockListActions.setHasMore(false))
      }

      dispatch(blockListActions.setBlockList(response.data.blockedList || []))
      retryRef.current = 0
      cursor.current = response.data.cursor
      return
    }

    if (shouldRetry(response) && retryRef.current < REFETCH_LIMIT) {
      retryRef.current += 1
      setTimeout(() => getBlockList(cursor.current), 300 * retryRef.current)
      return
    }

    notify.popup(modal.title.error, response.message)
  }, [hasMore, dispatch, notify])

  useEffect(()=>{
    cursor.current = null
    retryRef.current = 0
    abortRef.current = null
    dispatch(blockListActions.reset())
    dispatch(blockListActions.setHasMore(true))
    getBlockList()
    return () => abortRef.current?.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return { getBlockList }
}
