import {useProfileContext} from '../../profile/hooks/useProfileContext'
import {useNotify} from '../../../hooks/useNotify'
import { useCallback } from 'react'
import { apiService } from '../services/api.service'
import {orchestrate} from '../../../utils/orchestrate'
import { createFriend } from '../store/model/friend.model'
import { aFriendActions, loadingActions } from '../store/actions'
import { modal } from '../../../constant/text/vi/modal'

export function useRequestFriend(dispatch){
  const notify = useNotify()
  const {actions:{friendSync:{setFriendStatus}}} = useProfileContext()
  const requestFriend = useCallback(async (username) => {
    const r = await orchestrate({
      service: async () => notify.withLoading(
        () => apiService.requestFriend(username),
        (bool) => dispatch(loadingActions.requestFriend(bool))
      ),
      onSuccess: [
        () => setFriendStatus('pending_sent'),
        () => dispatch(aFriendActions.request(createFriend(username))),
      ]
    })

    if(r.success){
      notify.snackbar(`${r.message}.\nVề trang cá nhân để hủy`,3000)
      return
    }
    else notify.popup(modal.title.error, r.message)
  },[notify, setFriendStatus, dispatch])

  return {
    requestFriend
  }
}