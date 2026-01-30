import { services } from '../services'
import { useEffect, useCallback } from 'react'
import { useNotify } from '../../../hooks/useNotify'
import {getProfileLoading, setProfile} from '../actions'
import { modal } from '../../../constant/text/vi/modal'
export function useGetProfile(dispatch, username){
  const notify = useNotify()
  
  const getProfile = useCallback(async () => {
    const res = await notify.withLoading(
      () => services.getProfileInfo(username),
      (bool) => dispatch(getProfileLoading(bool))
    )
    if(res.success){
      dispatch(setProfile(res.data))
    }
    else notify.popup(modal.title.error, res.message)
  },[dispatch, notify, username])

  useEffect(()=>{
    getProfile()
  },[getProfile])
}