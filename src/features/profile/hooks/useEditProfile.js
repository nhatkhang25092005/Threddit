import { useCallback } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { services } from "../services"
import { editBioLoading, editBioSuccess, editDisplaynameLoading, editDisplaynameSuccess } from "../actions"
import {profile} from '../../../constant/text/vi/profile.text'
import { modal } from "../../../constant/text/vi/modal"
export function useEditProfile(dispatch){
  const notify = useNotify()

  // Edit bio
  const editBio = useCallback(async (form) => {
    console.log(form)
    const response = await notify.withLoading(
      () => services.editProfile(form),
      (bool) => dispatch(editBioLoading(bool))
    )
    if(response.success){
      dispatch(editBioSuccess(form))
      notify.snackbar(profile.notify.update_bio_success, 3000)
    }
    else{
      notify.popup(modal.title.error, response.message)
    }
    
  },[notify, dispatch])
  
  // Edit displayname
  const editDisplayname = useCallback(async (form, preName) => {
    if(form.displayName === preName) return
    const res = await notify.withLoading(
      () => services.editProfile(form),
      (bool) => dispatch(editDisplaynameLoading(bool))
    )
    if(res.success){
      dispatch(editDisplaynameSuccess(form.displayName))
      notify.snackbar(profile.notify.update_displayname_success, 3000)
    }
    else notify.popup(modal.title.error, res.message)
  },[notify, dispatch])

  return{
    editBio,
    editDisplayname
  }
}