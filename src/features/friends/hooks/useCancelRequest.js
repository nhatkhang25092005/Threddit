import { useCallback } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import { loadingActions, sentListActions } from "../store/actions"
import { useOrchestrate } from "../../../core/orchestrate/useOrchestrate"

export function useCancelRequest(dispatch) {
  const notify = useNotify()
  const { sync } = useOrchestrate()

  const cancelRequest = useCallback(async (username, onProfile = false) => {
    const response = await notify.withLoading(
      () => apiService.cancelRequest(username),
      (bool) => dispatch(loadingActions.cancelRequest(bool, username))
    )

    if (response.success) {
      dispatch(sentListActions.removeSentRequest(username))
      dispatch(sentListActions.decreaseSentCount())
      sync.profile.cancelRequestSuccess({ onProfile })
      notify.snackbar(response.message, 3000)
      return
    }

    notify.popup(modal.title.error, response.message)
  }, [notify, dispatch, sync])

  return {
    cancelRequest
  }
}
