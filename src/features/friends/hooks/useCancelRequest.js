import { useCallback } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import { orchestrate } from "../../../utils/orchestrate"
import { loadingActions, sentListActions } from "../store/actions"

export function useCancelRequest(dispatch) {
  const notify = useNotify()

  const cancelRequest = useCallback(async (friendshipId) => {
    const response = await orchestrate({
      service: async () => await notify.withLoading(
        () => apiService.cancelRequest(friendshipId),
        (bool) => dispatch(loadingActions.cancelRequest(bool, friendshipId))
      ),
      onSuccess:[
        () => dispatch(sentListActions.removeSentRequest(friendshipId)),
        () => dispatch(sentListActions.decreaseSentCount()),
      ],
    })

    if (response.success) {
      notify.snackbar(response.message, 3000)
      return
    }

    notify.popup(modal.title.error, response.message)
  }, [notify, dispatch])

  return {
    cancelRequest
  }
}
