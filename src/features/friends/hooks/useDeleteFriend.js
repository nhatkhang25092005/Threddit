import { useCallback } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import { loadingActions, friendListActions } from "../store/actions"
import useAuth from "../../../core/auth/useAuth"
import { useOrchestrate } from "../../../core/orchestrate/useOrchestrate"

export function useDeleteFriend(dispatch) {
  const notify = useNotify()
  const {user, isOwner} = useAuth()
  const { sync } = useOrchestrate()

  const getLoadingHandler = useCallback((onProfile, username) =>
  onProfile
    ? (bool) => dispatch(loadingActions.unfriendGlobal(bool))
    : (bool) => dispatch(loadingActions.deleteFriend(bool, username)), [dispatch])

  const deleteFriend = useCallback(async (username, onProfile = false) => {
    const response = await notify.withLoading(
      () => apiService.deleteFriend(username),
      getLoadingHandler(onProfile, username)
    )

    if (response.success) {
      dispatch(friendListActions.removeFriend(username))
      isOwner && dispatch(friendListActions.deleteMyFriend(username))
      if (onProfile) {
        dispatch(friendListActions.removeFriend(user.username))
      }
      sync.profile.deleteFriendSuccess({ onProfile })
      notify.snackbar(response.message, 3000)
      return
    }

    notify.popup(modal.title.error, response.message)
  }, [dispatch, getLoadingHandler, notify, sync, user.username, isOwner])

  return {
    deleteFriend
  }
}
