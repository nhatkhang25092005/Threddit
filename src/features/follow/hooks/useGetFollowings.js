import { useEffect, useCallback, useRef } from "react"
import { useNotify } from '../../../hooks/useNotify'
import { services } from "../services"
import { modal } from '../../../constant/text/vi/modal'
import { following, loading, hasMore, resetFollow } from "../actions"
import { shouldRetry } from "../../../utils/shouldRetry"

export function useGetFollowings(dispatch, username){
  const notify = useNotify()
  const cursor = useRef(null)
  const abortRef = useRef(null)
  const retryRef = useRef(0)
  const REFETCH_LIMIT = 3

  const getFollowings = useCallback(async () => {

    // ===== abort previous request =====
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    const response = await notify.withLoading(
      () => services.getFollowings(username, cursor.current, abortRef.current.signal),
      (bool) => dispatch(loading.getFollowing(bool))
    )

    if(response.code === 'ERR_CANCELED') return

    if(response.success){
      if(response.data.followingList.length === 0){
        dispatch(hasMore.following(false))
      }

      dispatch(following.setList(response.data.followingList))
      retryRef.current = 0
      cursor.current = response.data.cursor
      return
    }

    // ===== backoff retry =====
    if(shouldRetry(response) && retryRef.current < REFETCH_LIMIT){
      retryRef.current += 1
      setTimeout(() => getFollowings(), 300 * retryRef.current)
      return
    }

    // ===== backoff fail =====
    retryRef.current = 0
    notify.popup(modal.title.error, response.message)

  }, [notify, dispatch, username])


  useEffect(()=>{
    cursor.current = null,
    retryRef.current = 0
    dispatch(resetFollow.followingList())
    getFollowings()
    // ===== abort when unmount =====
    return () => abortRef.current?.abort()
  },[getFollowings, username, dispatch])

  return{
    getFollowings
  }
}
