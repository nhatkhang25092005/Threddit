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
  const actorUsername = user?.username ?? null

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
      if (onProfile && actorUsername) {
        dispatch(friendListActions.removeFriend(actorUsername))
      }
      sync.profile.deleteFriendSuccess({ onProfile })
      notify.snackbar(response.message, 3000)
      return
    }

    notify.popup(modal.title.error, response.message)
  }, [actorUsername, dispatch, getLoadingHandler, notify, sync, isOwner])

  return {
    deleteFriend
  }
}
