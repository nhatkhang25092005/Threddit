import { useNotify } from "../../../hooks/useNotify"
import { confirmBackgroundImageLoading,updateBackground, presignBackgroundImageLoading } from "../actions"
import { services } from "../services"
import { useCallback, useRef } from "react"
import { profile } from "../../../constant/text/vi/profile.text"
import {modal} from '../../../constant/text/vi/modal'
import { upload } from "../../../utils/upload"
export function useBackground(dispatch) {

  const notify = useNotify()

  const s3 = useRef({
    singedUrl:null,
    key:null,
    body:null,
    type:null
  })

  // Handle Confirm
  const confirmBackgroundImage = useCallback(async () => {
    const res = await notify.withLoading(
      () => services.confirmBackgroundImage(s3.current),
      (bool) => dispatch(confirmBackgroundImageLoading(bool))
    )
    if(res.success){
      dispatch(updateBackground(res.data.backgroundImageUrl))
      notify.snackbar(profile.background.update_success, 3000)
    }
    else notify.popup(modal.title.error, res.message)
  },[notify, dispatch])

  // Handle Presign
  const presignBackgroundImage = useCallback(async (e) => {
    const data = upload.image(e)
    const res = await notify.withLoading(
      () => services.presignBackgroundImage(data),
      (bool) => dispatch(presignBackgroundImageLoading(bool))
    )
    if(!res.success) notify.popup(modal.title.error,res.message)
    else{
      s3.current.key = res.data.key
      s3.current.singedUrl = res.data.singedUrl
      s3.current.file = data.file
      s3.current.type = data.contentType
      return data.url
    }
  
  },[notify, dispatch])

  return{
    confirmBackgroundImage,
    presignBackgroundImage
  }

}