import {style} from '../style'
import {Box} from '@mui/material'
import ProfileAvatar from "./ProfileAvatar"
import BaseInfo from "./BaseInfo"
import CreateFeedBtn from "./CreateFeedBtn"
import BackgroundImage from './BackgroundImage'
import {memo} from 'react'
import EditInfoButton from './EditInfoButton'
import FollowBtn from './FollowBtn'
import { useProfileContext } from '../hooks'
import FriendButton from './FriendButton'
const sx=style.header
const Header = memo(function Header(){
  const {isOwn} = useProfileContext()
  return(
    <Box sx={sx.container}>
      <BackgroundImage/>
      <Box sx={sx.info_container.container}>
        <ProfileAvatar />
        <BaseInfo/>
        <CreateFeedBtn/>
        <FriendButton/>
        <FollowBtn/>
        {isOwn && <EditInfoButton/>}
      </Box>
    </Box>
  )
})

export default Header