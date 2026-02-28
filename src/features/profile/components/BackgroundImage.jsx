import BackgroundImg from "../../../components/image/BackgroundImg"
import {Fade, Skeleton} from '@mui/material'
import { useProfileContext } from "../hooks"
import useAuth from "../../../core/auth/useAuth"
import {memo} from 'react'
import {style} from '../style'
import { useProfileModal } from "../provider/useProfileModal"
const sx = style.header
const BackgroundImage = memo(function BackgroundImage() {
  const { state, actions } = useProfileContext()
  const { isOwner } = useAuth()
  const backgroundActions = actions.background
  const {openModal} = useProfileModal()
  
  const handleUpload = async (e) => {
    const data = await backgroundActions.presignBackgroundImage(e)
    openModal('confirm_background',{src:data, confirm:backgroundActions.confirmBackgroundImage})
  }
  return(
    <>
    {state.loading.get_profile
        ? <Skeleton sx={sx.skeleton.bg} animation="wave" variant="rectangular" />
        : <Fade sx={sx.fade.bg} in={!state.loading.get_profile}>
            <BackgroundImg
              loading = {state.loading.update_background_image}
              alt= 'background'
              owner = {isOwner}
              src= {state.backgroundImageUrl}
              handleUpload = {(e) => handleUpload(e)}
            />
          </Fade>
      }
    </>
  )
})

export default BackgroundImage
