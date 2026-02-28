import CreatePost from "../../post/components/post/CreatePost"
import {Box} from '@mui/material'
import useAuth from '../../../core/auth/useAuth'
import UserPostContainer from "../../post/components/post/UserPostContainer"
export default function PostContainer(){
  const {isOwner} = useAuth()
  return(
    <Box sx={{width:'100%'}}>
      {isOwner && <CreatePost/>}
      <UserPostContainer/>
    </Box>
  )
}
