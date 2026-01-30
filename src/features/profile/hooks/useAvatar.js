import { useCallback, useRef } from "react"
import { upload } from "../../../utils/upload"
import { services } from "../services"
import { useNotify } from "../../../hooks/useNotify"
import { profile } from "../../../constant/text/vi/profile.text"
import { presignAvatarLoading, confirmAvatarLoading, updateAvatar} from "../actions"
import { modal } from "../../../constant/text/vi/modal"
export function useAvatar(dispatch){
  const notify = useNotify()
  const s3 = useRef({
    singedUrl:null,
    key:null,
    body:null,
    type:null
  })

  const confirmAvatar = useCallback(async () => {
    const res = await notify.withLoading(
      () => services.confirmAvatar(s3.current),
      (bool) => dispatch(confirmAvatarLoading(bool))
    )

    if(!res.success) notify.popup(modal.title.error, res.message)
    else{
      dispatch(updateAvatar(res.data.avatarUrl))
      notify.snackbar(profile.avatar.update_success, 3000)
    }
  },[dispatch, notify])

  const presignAvatar = useCallback(async (e) => {
    const data = upload.image(e)
    console.log(data)
    const res = await notify.withLoading(
      () => services.presignAvatar(data),
      (bool) => dispatch(presignAvatarLoading(bool))
    )
    if(!res.success) notify.popup(modal.title.error, res.message)
    else{
      s3.current.key = res.data.key
      s3.current.singedUrl = res.data.singedUrl
      s3.current.file = data.file
      s3.current.type = data.contentType

      return data.url
    }
  },[notify, dispatch])
  
  return{
    presignAvatar,
    confirmAvatar
  }
}