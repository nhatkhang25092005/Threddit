import { useCallback, useMemo } from 'react'
import Surface from '../../../../components/common/Surface'
import {TextField, Avatar, Box, IconButton} from '@mui/material'
import useAuth from '../../../../core/auth/useAuth'
import { style } from './style'
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageIcon from '@mui/icons-material/Image';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import {usePostModal} from '../../provider/usePostModal'
import { upload } from '../../../../utils/upload'
import ImageInput from '../../../../components/common/input/ImageInput'
import VideoInput from '../../../../components/common/input/VideoInput'
import SoundInput from '../../../../components/common/input/SoundInput'
const sx = style.createPostComponent

const uploadByType = {
  image: upload.image,
  video: upload.video,
  sound: upload.sound,
}

export default function CreatePost({ redirectAfterCreate = null }){
  const {user} = useAuth()
  const {openModal} = usePostModal()
  const modalProps = useMemo(() => (
    redirectAfterCreate
      ? { redirectAfterCreate }
      : {}
  ), [redirectAfterCreate])

  const handleOpenCreatePostModal = useCallback(() => {
    openModal('create_post_modal', modalProps)
  }, [modalProps, openModal])

  const handleUpload = useCallback((type, event) => {
    const uploadHandler = uploadByType[type]
    const media = uploadHandler?.(event, true)

    if (!media?.length) return

    openModal('create_post_modal', {
      ...modalProps,
      initialImages: type === 'image' ? media : [],
      initialVideos: type === 'video' ? media : [],
      initialSounds: type === 'sound' ? media : [],
    })
  }, [modalProps, openModal])

  if(!user) return null

  return(
    <Surface sx={sx.surface}>
      <Avatar src={user.avatarUrl} sx={sx.avatar}/>
      <Box sx={sx.container_1}>
        <TextField
          sx={sx.textField}
          onClick={handleOpenCreatePostModal}
          placeholder='Ban dang nghi gi '
          slotProps={{htmlInput:{readOnly:true}}}
        />
        <Box sx={sx.container_2}>
          <SoundInput multiple onClick={(event) => handleUpload('sound', event)}>
            <IconButton sx={sx.actionIconButton} aria-label='Them am thanh'>
              <VolumeDownIcon />
            </IconButton>
          </SoundInput>
          <VideoInput multiple onClick={(event) => handleUpload('video', event)}>
            <IconButton sx={sx.actionIconButton} aria-label='Them video'>
              <VideocamIcon />
            </IconButton>
          </VideoInput>
          <ImageInput multiple onClick={(event) => handleUpload('image', event)}>
            <IconButton sx={sx.actionIconButton} aria-label='Them anh'>
              <ImageIcon sx={{width:'2rem', height:'1.2rem'}}/>
            </IconButton>
          </ImageInput>
        </Box>
      </Box>
    </Surface>
  )
}
