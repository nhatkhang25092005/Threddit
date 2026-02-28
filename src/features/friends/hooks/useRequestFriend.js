import {useNotify} from '../../../hooks/useNotify'
import { useCallback } from 'react'
import { apiService } from '../services/api.service'
import { createFriend } from '../store/model/friend.model'
import { aFriendActions, loadingActions } from '../store/actions'
import { modal } from '../../../constant/text/vi/modal'
import { useOrchestrate } from '../../../core/orchestrate/useOrchestrate'

export function useRequestFriend(dispatch){
  const notify = useNotify()
  const { sync } = useOrchestrate()
  const requestFriend = useCallback(async (username) => {
    const r = await notify.withLoading(
      () => apiService.requestFriend(username),
      (bool) => dispatch(loadingActions.requestFriend(bool))
    )

    if(r.success){
      sync.profile.requestFriendSuccess()
      dispatch(aFriendActions.request(createFriend(username)))
      notify.snackbar(`${r.message}.\nVề trang cá nhân để hủy`,3000)
      return
    }
    else notify.popup(modal.title.error, r.message)
  },[notify, sync, dispatch])

  return {
    requestFriend
  }
}
