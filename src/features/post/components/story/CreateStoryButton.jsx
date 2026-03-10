import {Button, Box} from '@mui/material'
import { Plus } from 'lucide-react';
import {style} from '../../../profile/style'
import useAuth from '../../../../core/auth/useAuth';
import { profile } from '../../../../constant/text/vi/profile.text'
import {usePostModal} from '../../provider/usePostModal'
const sx = style.header.info_container.create_feed_button
export default function CreateStoryButton(){
  const {openModal} = usePostModal()
  const { isOwner } = useAuth()
  return(
    <Box sx={{display:isOwner ? 'flex' : 'none'}}>
      <Button onClick={()=>openModal('create_story_modal')} sx={sx} variant='primary'>
        <Plus/>
        {profile.button.create_feed}
      </Button>
    </Box>
  )
}7
