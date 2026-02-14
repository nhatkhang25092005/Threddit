import { useCallback } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import { orchestrate } from "../../../utils/orchestrate"
import { createFriend } from "../store/model/friend.model"
import { useProfileContext } from "../../profile/hooks/useProfileContext"
import { loadingActions, requestListActions, friendListActions } from "../store/actions"

export function useAcceptRequest(dispatch) {
  const notify = useNotify()
  const {actions:{friendSync:{increaseFriendNumber:increaseFriendNumberOfProfile}}} = useProfileContext()

  const acceptRequest = useCallback(async (requester, friendshipId) => {

    const response = await orchestrate({
      service: async () => await notify.withLoading(
        () => apiService.acceptRequest(friendshipId),
        (bool) => dispatch(loadingActions.acceptRequest(bool, friendshipId))
      ),
      onSuccess:[
        () => dispatch(requestListActions.removeRequest(friendshipId)),
        () => dispatch(requestListActions.decreaseRequestCount()),
        () => dispatch(friendListActions.addFriend(createFriend(requester))),
        () => increaseFriendNumberOfProfile()
      ]
    })
  
    if (response.success) {
      notify.snackbar(response.message, 3000)
      return
    }

    notify.popup(modal.title.error, response.message)
    
  }, [notify, dispatch, increaseFriendNumberOfProfile])

  return {
    acceptRequest
  }
}
