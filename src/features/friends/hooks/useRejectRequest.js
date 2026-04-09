import { useCallback } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import { loadingActions, requestListActions } from "../store/actions"

export function useRejectRequest(dispatch) {
  const notify = useNotify()

  const rejectRequest = useCallback(async (username) => {
    if (!username) return

    const response = await notify.withLoading(
      () => apiService.rejectRequest(username),
      (bool) => dispatch(loadingActions.rejectRequest(bool, username))
    )

    if (response.success) {
      notify.snackbar(response.message, 3000)
      dispatch(requestListActions.removeRequest(username))
      dispatch(requestListActions.decreaseRequestCount())
      return
    }

    notify.popup(modal.title.error, response.message)
  }, [notify, dispatch])

  return {
    rejectRequest
  }
}
