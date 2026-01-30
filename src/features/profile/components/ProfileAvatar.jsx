import {Avatar, Badge, useTheme} from '@mui/material'
import {style} from '../style'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useProfileContext } from '../hooks';
import ImageInput from '../../../components/common/input/ImageInput';

export default function ProfileAvatar({hasStory = false}){
  const mode = useTheme().palette.mode
  const {state, actions, isOwner} = useProfileContext()
  const handleChangeAvatar = async (e) => {
    const temp = await actions.avatar.presignAvatar(e)
    actions.modalManager.openModal('confirm_avatar',{src:temp,confirm:actions.avatar.confirmAvatar})
  }
  
  // Change Avatar Button
  function ChangeAvatarButton(){
    return(
      <Avatar
        sx={{
          display: isOwner ? undefined : 'none',
          bgcolor: 'white',
          width: 40,
          height: 40,
          border: '2px solid black',
          cursor:'pointer',
          transition:'transform ease-in-out 0.1s',
          '&:hover':{transform: 'scale(1.1)'}
        }}
      >
        <ImageInput onClick={handleChangeAvatar}>
          <CameraAltIcon sx={{color:'black'}} />
        </ImageInput>
      </Avatar>
    )
  }

  return(
    <Badge
      overlap="circular"
      badgeContent={<ChangeAvatarButton/>}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Avatar sx={style.header.info_container.bg_avatar(mode)}>
        <Avatar sx={style.header.info_container.avatar(hasStory, mode)} src={state.avatarUrl}/>
      </Avatar>
    </Badge>
  )
}