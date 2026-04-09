import {style} from '../style'
import {Box, Button} from '@mui/material'
import ProfileAvatar from "./ProfileAvatar"
import BaseInfo from "./BaseInfo"
import CreateStoryButton from "../../post/components/story/CreateStoryButton"
import BackgroundImage from './BackgroundImage'
import {memo} from 'react'
import FollowBtn from './FollowBtn'
import FriendButton from './FriendButton'
import BlockUserButton from './BlockUserButton'
import useAuth from '../../../core/auth/useAuth'
const sx=style.header
const Header = memo(function Header(){
  const { isOwner } = useAuth()
  return(
    <Box sx={sx.container}>
      <BackgroundImage/>
      <Box sx={sx.info_container.container}>
        <ProfileAvatar />
        <BaseInfo/>
        <Box sx={sx.info_container.button_container} >
          <Box sx={sx.info_container.contract_buttons}>
            <CreateStoryButton/>
            <FriendButton/>
            <FollowBtn/>
          </Box>
          {!isOwner && <BlockUserButton color='white'/>}
        </Box>
      </Box>
    </Box>
  )
})

export default Header
