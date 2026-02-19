import { useCallback, useRef } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { blockListActions, loadingActions } from "../store/actions"
import { shouldRetry } from "../../../utils/shouldRetry"
import { modal } from "../../../constant/text/vi/modal"

export function useUnblockUser(dispatch) {
  const notify = useNotify()
  const retryRef = useRef(0)
  const REFETCH_LIMIT = 3

  const unblockUser = useCallback(async (username) => {
    const response = await notify.withLoading(
      () => apiService.unblockUser(username),
      (bool) => dispatch(loadingActions.cancelBlockLoading(username, bool))
    )

    if (response.success) {
      dispatch(blockListActions.removeBlockedUser(username))
      notify.snackbar(response.message, 3000)
      retryRef.current = 0
      return
    }

    // Backoff retry
    if (shouldRetry(response) && retryRef.current < REFETCH_LIMIT) {
      retryRef.current += 1
      setTimeout(() => unblockUser(username), 300 * retryRef.current)
      return
    }

    notify.popup(modal.title.error, response.message)
    return response
  }, [dispatch, notify])

  return { unblockUser }
}
