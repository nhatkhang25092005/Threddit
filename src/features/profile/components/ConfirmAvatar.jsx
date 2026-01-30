import Surface from "../../../components/common/Surface";
import {Typography, Avatar, Button, CircularProgress, Box} from '@mui/material'
import { profile } from "../../../constant/text/vi/profile.text";
import {useProfileContext} from '../hooks/useProfileContext'
import { FileImage} from 'lucide-react'
import CloseIcon from '@mui/icons-material/Close';

import ImageInput from "../../../components/common/input/ImageInput";
import { useState } from "react";
const text = profile.avatar
export default function ConfirmAvatar({src,confirm, onClose}){
  const {state, actions} = useProfileContext()
  const [temp, setTemp] = useState(src)
  const loading = state.loading.update_avatar

  const handleClick = async () => {
    await confirm?.()
    onClose()
  }

  const handleUpload = async (e) => {
    const data = await actions.avatar.presignAvatar(e)
    setTemp(data)
  }
  
  return(
    <Surface variant="modal" sx={{
      maxHeight:'40rem',
      mx:'auto',
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap:'1rem',
      flexDirection:'column',
      mt:'3rem',
      width:'49rem',
      position:'relative'
    }}>
      <CloseIcon
        sx={{position:'absolute',top: '1rem', right: '1rem',cursor: 'pointer','&:hover':{transform:'scale(1.1)'}}}
        size={24}
        onClick={onClose}
      />
      <Typography variant="title">{text.preview_avatar}</Typography>
      <Avatar src={temp} sx={{width:'20rem', height:'20rem'}}/>

      {/* Options */}
      <Box
        sx={{
          display:'flex',
          width:'80%',
          flexDirection:'row',
          justifyContent:'space-around',
          gap:10
        }}
      >
        <Button
          sx={{width:"15rem"}}
          variant="primary"
          onClick={handleClick}
          disabled={loading}
        >
          {loading
          ? <Box sx={{display:'flex', gap:1}}>
              <CircularProgress size={24} color="black"/>
              <Typography sx={{textTransform:'none'}}>{text.loading}</Typography>
            </Box>
          :
            <Typography sx={{textTransform:"none"}}>{text.confirm}</Typography>
          }
        </Button>
        <ImageInput sx={{width:'15rem'}} onClick={(e=>handleUpload(e))} component={'button'}>
          <Button variant="secondary" sx = {{display:'flex', gap:2, flex:1, width:'100%'}}>
            <FileImage/>
            <Typography>
              {profile.avatar.another_image}
            </Typography>
          </Button>
        </ImageInput>
      </Box>
    </Surface>
  )
}