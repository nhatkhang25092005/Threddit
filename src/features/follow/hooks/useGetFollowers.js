import { useEffect, useCallback, useRef } from "react"
import { useNotify } from '../../../hooks/useNotify'
import { services } from "../services"
import { modal } from '../../../constant/text/vi/modal'
import { follower } from "../actions"
import { shouldRetry } from "../../../utils/shouldRetry"

export function useGetFollowers(dispatch){
  const notify = useNotify()
  const cursor = useRef(null)
  const abortRef = useRef(null)
  const retryRef = useRef(0)
  const REFETCH_LIMIT = 3

  const getFollowers = useCallback(async () => {

    // ===== abort previous request =====
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    const response = await notify.withLoading(
      () => services.getFollowers(cursor.current, abortRef.current.signal),
      (bool) => dispatch(follower.setLoadingGet(bool))
    )

    if(response.code === 'ERR_CANCELED') return

    if(response.success){
      if(response.data.followerList.length == 0){
        dispatch(follower.setHasMoreFollower(false))
      }
      dispatch(follower.setList(response.data))
      retryRef.current = 0
      cursor.current = response.data.cursor
      return
    }

    // ===== backoff retry =====
    if(shouldRetry(response) && retryRef.current <= REFETCH_LIMIT){
      retryRef.current += 1
      setTimeout(() => getFollowers(), 300 * retryRef.current)
      return
    }

    // ===== backoff fail =====
    retryRef.current = 0
    notify.popup(modal.title.error, response.message)

  }, [notify, dispatch])


  useEffect(()=>{
    getFollowers()
    // ===== abort when unmount =====
    return () => abortRef.current?.abort()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return{
    getFollowers
  }
}
