import { useCallback, useRef } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { loadingActions, blockListActions } from "../store/actions"
import { shouldRetry } from "../../../utils/shouldRetry"
import { modal } from "../../../constant/text/vi/modal"
import { createBlockedUser } from "../store/model/block.model"

export function useBlockUser(dispatch) {
  const notify = useNotify()
  const retryRef = useRef(0)
  const REFETCH_LIMIT = 3

  const blockUser = useCallback(async (user) => {
    const response = await notify.withLoading(
      () => apiService.blockUser(user.username),
      (bool) => dispatch(loadingActions.setBlockActionLoading(bool))
    )

    if (response.success){
      dispatch(blockListActions.addBlockUser(createBlockedUser(user)))
      notify.snackbar(response.message, 3000)
      retryRef.current = 0
      return response
    }

    // Backoff retry
    if (shouldRetry(response) && retryRef.current < REFETCH_LIMIT) {
      retryRef.current += 1
      setTimeout(() => blockUser(user), 300 * retryRef.current)
      return
    }

    notify.popup(modal.title.error, response.message)
    return response
  }, [dispatch, notify])

  return { blockUser }
}
