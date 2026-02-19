import { useCallback } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import { orchestrate } from "../../../utils/orchestrate"
import { useProfileContext } from "../../profile/hooks/useProfileContext"
import { loadingActions, friendListActions } from "../store/actions"
import useAuth from "../../../core/auth/useAuth"

export function useDeleteFriend(dispatch) {
  const notify = useNotify()
  const { actions:{friendSync:{decreaseFriendNumber, setFriendStatus}}} = useProfileContext()
  const {user} = useAuth()

  const getLoadingHandler = useCallback((onProfile, username) =>
  onProfile
    ? (bool) => dispatch(loadingActions.unfriendGlobal(bool))
    : (bool) => dispatch(loadingActions.deleteFriend(bool, username)), [dispatch])

  const getOnSuccessHandlers = useCallback((onProfile, username) => [
    () => dispatch(friendListActions.removeFriend(username)),
    () => decreaseFriendNumber(),
    ...(onProfile
      ? [
          () => setFriendStatus(null),
          () => dispatch(friendListActions.removeFriend(user.username)),
        ]
      : []
    ),
  ], [dispatch, decreaseFriendNumber, setFriendStatus, user.username])



  const deleteFriend = useCallback(async (username, onProfile = false) => {
    const response = await orchestrate({
      service: async () => await notify.withLoading(
        () => apiService.deleteFriend(username),
        getLoadingHandler(onProfile, username)
      ),
      onSuccess:getOnSuccessHandlers(onProfile, username)
    })

    if (response.success) {
      notify.snackbar(response.message, 3000)
      return
    }

    notify.popup(modal.title.error, response.message)
  }, [getOnSuccessHandlers,getLoadingHandler, notify])

  return {
    deleteFriend
  }
}
