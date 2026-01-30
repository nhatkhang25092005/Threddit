import Surface from '../../../components/common/Surface'
import {Typography, CardMedia, Box, Button} from '@mui/material'
import { profile } from '../../../constant/text/vi/profile.text'
import { useCallback, useState } from 'react'
import { useProfileContext } from '../hooks'
import { style } from '../style'
import Close from '../../../components/common/button/Close'
import ImageInput from '../../../components/common/input/ImageInput'

const sx = style.modal.confirm_background
export default function ConfirmBackground ({src, confirm, onClose}) {
  const {state, actions} = useProfileContext()
  const [temp, setTemp] = useState(src)
  
  const loading = state.loading.update_background_image
  
  const handleUpdate = useCallback(async () => {
    await confirm()
    onClose()
  },[confirm, onClose])

  const handleUpload = useCallback(async (e) => {
    const data =await actions.background.presignBackgroundImage(e)
    setTemp(data)
  },[actions.background])

  return(
    <Surface variant='modal' sx={sx.surface}>
      <Close onClick={onClose} sx={sx.close_icon}/>
      <Typography variant='title'>{profile.background.preview_background}</Typography>
      <Box sx={sx.card_media_container}>
        <CardMedia component="img" src={temp} alt="Ảnh xem trước" sx={sx.card_media}/>
      </Box>
      <Box sx={sx.button_container}>
        <Button onClick={handleUpdate} variant='primary' sx={sx.update_button}>
          {loading ? profile.background.bg_updating :profile.background.confirm}
        </Button>
        <ImageInput onClick={e=>handleUpload(e)}>
          <Button variant='secondary' sx={{width:'10rem'}}>
            {profile.background.another_image}
          </Button>
        </ImageInput>
      </Box>
    </Surface>
  )
}