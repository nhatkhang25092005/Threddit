import { useEffect, useCallback, useRef } from "react"
import { useProfileContext } from "../../profile/hooks"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import { loadingActions, mutualListActions } from "../store/actions"
import { shouldRetry } from "../../../utils/shouldRetry"

export function useGetMutualList(dispatch) {
  const notify = useNotify()
  const { state: { username }, isOwner } = useProfileContext()

  const cursor = useRef(null)
  const abortRef = useRef(null)
  const retryRef = useRef(0)
  const REFETCH_LIMIT = 3

  const getMutualList = useCallback(async () => {
    // ===== Skip if viewing own profile =====
    if (isOwner) return

    // ===== abort previous request =====
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    const response = await notify.withLoading(
      () => apiService.getMutualList(
        username,
        cursor.current,
        abortRef.current.signal
      ),
      (bool) => dispatch(loadingActions.getMutualList(bool))
    )

    if (response?.code === 'ERR_CANCELED') return

    if (response.success) {
      if (response.data.mutualFriendList.length === 0) {
        dispatch(mutualListActions.setHasMore(false))
      }

      dispatch(mutualListActions.addMutualFriends(response.data.mutualFriendList))
      cursor.current = response.data.cursor
      retryRef.current = 0
      return
    }

    // ===== backoff retry =====
    if (shouldRetry(response) && retryRef.current < REFETCH_LIMIT) {
      retryRef.current += 1
      setTimeout(() => getMutualList(), 300 * retryRef.current)
      return
    }

    // ===== backoff fail =====
    retryRef.current = 0
    notify.popup(modal.title.error, response.message)

  }, [notify, dispatch, username, isOwner])

  useEffect(() => {
    // ===== Skip if viewing own profile =====
    if (isOwner) {
      dispatch(mutualListActions.reset())
      return
    }

    cursor.current = null
    retryRef.current = 0
    dispatch(mutualListActions.reset())
    dispatch(mutualListActions.setHasMore(true))
    getMutualList()

    // ===== abort when unmount =====
    return () => abortRef.current?.abort()
  }, [getMutualList, dispatch, username, isOwner])

  return {
    getMutualList
  }
}

