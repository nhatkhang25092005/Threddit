import {Box, Typography, Skeleton} from "@mui/material"
import { useProfileContext } from "../hooks"
import { style } from "../style"
import { profile } from "../../../constant/text/vi/profile.text"
import Displayname from './Displayname'
const sx = style.header.info_container
export default function BaseInfo(){
  const {state} = useProfileContext()
  const loading = state.loading.get_profile

  function Loading(){
    return(
      <Box width={'100%'}>
        <Skeleton height={'30px'} width={'40%'} animation="wave"/>
        <Skeleton width={'30%'} animation="wave"/>
        <Skeleton width={'25%'} animation="wave"/>
      </Box>
    )
  }

  function Info(){
    return(
      <Box>
        <Displayname/>
        <Typography fontSize={13}>{state.friendNumber}{profile.hard_text.friend}</Typography>
        <Typography fontSize={13}>{state.followerNumber}{profile.hard_text.follower} - {state.followingNumber}{profile.hard_text.following} </Typography>
      </Box>
    )
  }

  return(
    <Box sx={sx.base_info.container}>
      {loading ? <Loading/> : <Info/>}
    </Box>
  )
}