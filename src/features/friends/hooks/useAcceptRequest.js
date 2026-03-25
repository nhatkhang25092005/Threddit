import { useCallback } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import { loadingActions, requestListActions, friendListActions } from "../store/actions"
import { useOrchestrate } from "../../../core/orchestrate/useOrchestrate"
import useAuth from '../../../core/auth/useAuth'

export function useAcceptRequest(dispatch) {
  const notify = useNotify()
  const { sync } = useOrchestrate()
  const {isOwner} = useAuth()

  const acceptRequest = useCallback(async (requester, friendshipId) => {
    const response = await notify.withLoading(
      () => apiService.acceptRequest(friendshipId),
      (bool) => dispatch(loadingActions.acceptRequest(bool, friendshipId))
    )

    if (response.success) {
      dispatch(requestListActions.removeRequest(friendshipId))
      dispatch(requestListActions.decreaseRequestCount())
      dispatch(friendListActions.addFriend(requester))
      isOwner && dispatch(friendListActions.addMyFriend(requester))
      sync.profile.acceptRequestSuccess()
      notify.snackbar(response.message, 3000)
      return
    }

    notify.popup(modal.title.error, response.message)
  }, [notify, dispatch, sync, isOwner])

  return {
    acceptRequest
  }
}
