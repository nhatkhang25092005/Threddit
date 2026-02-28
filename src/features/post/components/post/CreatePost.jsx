import Surface from '../../../../components/common/Surface'
import {TextField, Avatar, Box} from '@mui/material'
import useAuth from '../../../../core/auth/useAuth'
import { style } from './style'
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageIcon from '@mui/icons-material/Image';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import {usePostModal} from '../../provider/usePostModal'
const sx = style.createPostComponent
export default function CreatePost(){
  const {user} = useAuth()
  const {openModal} = usePostModal()
  return(
    <Surface sx={sx.surface}>
      <Avatar src={user.avatarUrl} sx={sx.avatar}/>
      <Box sx={sx.container_1}>
        <TextField
          sx={sx.textField}
          onClick={()=>openModal('create_post_modal')}
          placeholder='Ban dang nghi gi '
          slotProps={{htmlInput:{readOnly:true}}}
        />
        <Box sx={sx.container_2}>
          <VolumeDownIcon sx={sx.icon}/>
          <VideocamIcon sx={sx.icon}/>
          <ImageIcon sx={sx.icon}/>
        </Box>
      </Box>
    </Surface>
  )
}