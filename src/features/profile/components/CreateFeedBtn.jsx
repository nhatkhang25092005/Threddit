import {Button, Box} from '@mui/material'
import { Plus } from 'lucide-react';
import {style} from '../style'
import { useProfileContext } from '../hooks';
import { profile } from '../../../constant/text/vi/profile.text'
const sx = style.header.info_container.create_feed_button
export default function CreateFeedBtn(){
  const {isOwner} = useProfileContext()
  return(
    <Box sx={{display:isOwner ? 'flex' : 'none'}}>
      <Button sx={sx} variant='primary'>
        <Plus/>
        {profile.button.create_feed}
      </Button>
    </Box>
  )
}7