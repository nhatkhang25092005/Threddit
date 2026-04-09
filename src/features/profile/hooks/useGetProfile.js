import { services } from '../services'
import { useEffect, useCallback } from 'react'
import { useNotify } from '../../../hooks/useNotify'
import {getProfileLoading, setProfile} from '../actions'
import { modal } from '../../../constant/text/vi/modal'
import {useBackToPreviousUrl} from '../../../hooks/useBackToPreviousUrl'
export function useGetProfile(dispatch, username){
  const notify = useNotify()
  const backToPrevious = useBackToPreviousUrl()

  
  const getProfile = useCallback(async () => {
    const res = await notify.withLoading(
      () => services.getProfileInfo(username),
      (bool) => dispatch(getProfileLoading(bool))
    )
    console.log(res)
    if(res.success){
      dispatch(setProfile(res.data))
      return
    }

    else notify.popup(modal.title.error, res.message,'Back', () => backToPrevious())
  },[dispatch, notify, username, backToPrevious])

  useEffect(()=>{
    getProfile()
  },[getProfile])
}