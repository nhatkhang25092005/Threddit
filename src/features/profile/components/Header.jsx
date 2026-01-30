import {style} from '../style'
import {Box} from '@mui/material'
import ProfileAvatar from "./ProfileAvatar"
import BaseInfo from "./BaseInfo"
import CreateFeedBtn from "./CreateFeedBtn"
import BackgroundImage from './BackgroundImage'
import {memo} from 'react'
import EditInfoButton from './EditInfoButton'
const sx=style.header
const Header = memo(function Header(){
  return(
    <Box sx={sx.container}>
      <BackgroundImage/>
      <Box sx={sx.info_container.container}>
        <ProfileAvatar />
        <BaseInfo/>
        <CreateFeedBtn/>
        <EditInfoButton/>
      </Box>
    </Box>
  )
})

export default Header