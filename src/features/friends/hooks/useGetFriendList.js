import { useEffect, useCallback, useRef } from "react"
import useAuth from "../../../core/auth/useAuth"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import {loadingActions,friendListActions } from "../store/actions"
import { shouldRetry } from "../../../utils/shouldRetry"

export function useGetFriendList(dispatch){
  const notify = useNotify()
  const { profileUsername: username, isOwner } = useAuth()

  const cursor = useRef(null)
  const abortRef = useRef(null)
  const retryRef = useRef(0)
  const REFETCH_LIMIT = 3

  const getFriendList = useCallback(async () => {
    if (!username) return
    // ===== abort previous request =====
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    const response = await notify.withLoading(
      () => apiService.getFriendList(
        username,
        cursor.current,
        abortRef.current.signal
      ),
      (bool) => dispatch(loadingActions.getFriendList(bool))
    )

    if(response?.code === 'ERR_CANCELED') return

    if(response.success){
      if(response.data.friendList.length === 0){
        dispatch(friendListActions.setHasMore(false))
      }

      dispatch(friendListActions.addFriends(response.data.friendList))
      cursor.current = response.data.cursor
      retryRef.current = 0
      return
    }

    // ===== backoff retry =====
    if(shouldRetry(response) && retryRef.current < REFETCH_LIMIT){
      retryRef.current += 1
      setTimeout(() => getFriendList(), 300 * retryRef.current)
      return
    }

    // ===== backoff fail =====
    retryRef.current = 0
    notify.popup(modal.title.error, response.message)

  }, [notify, dispatch, username])


  useEffect(()=>{
    cursor.current = null
    retryRef.current = 0
    dispatch(friendListActions.reset())
    dispatch(friendListActions.setHasMore(true))
    getFriendList()

    // ===== abort when unmount =====
    return () => abortRef.current?.abort()
  },[getFriendList, dispatch, username])

  return{
    getFriendList
  }
}
