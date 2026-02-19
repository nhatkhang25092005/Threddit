import {style} from '../style'
import {Box, Button} from '@mui/material'
import ProfileAvatar from "./ProfileAvatar"
import BaseInfo from "./BaseInfo"
import CreateFeedBtn from "./CreateFeedBtn"
import BackgroundImage from './BackgroundImage'
import {memo} from 'react'
import EditInfoButton from './EditInfoButton'
import FollowBtn from './FollowBtn'
import { useProfileContext } from '../hooks'
import FriendButton from './FriendButton'
import BlockUserButton from './BlockUserButton'
const sx=style.header
const Header = memo(function Header(){
  const {isOwner} = useProfileContext()
  return(
    <Box sx={sx.container}>
      <BackgroundImage/>
      <Box sx={sx.info_container.container}>
        <ProfileAvatar />
        <BaseInfo/>
        <Box sx={sx.info_container.button_container} >
          <Box sx={sx.info_container.contract_buttons}>
            <CreateFeedBtn/>
            <FriendButton/>
            <FollowBtn/>
            {isOwner && <EditInfoButton/>}
          </Box>
          {!isOwner && <BlockUserButton color='white'/>}
        </Box>
      </Box>
    </Box>
  )
})

export default Header