import {Box} from "@mui/material"
import { useFriendshipContext } from "@/features/friends/hooks/useFriendshipContext"
import ChatListItem from "./ChatListItem"
import {type ChatRoom} from './ChatListItem'
const sx = {
  container:{
    width:'30%',
    height:"100%",
    borderBottomRightRadius:'1rem',
    borderTopRightRadius:'1rem',
    bgcolor:'rgba(59, 130, 246, 0.16)',
    border:'#243041 solid 1px'
  }
}
type Friend = {
  username:string,
  displayName:string,
  avatarUrl?:string,
}
export default function ChatRoomList() {
  const {state:{myFriendList}} = useFriendshipContext()
  const friendList = myFriendList as Friend[]
  return(
    <Box sx={sx.container}>
      {friendList.map(friend => {
        const room : ChatRoom = {
          name:friend.displayName,
          avatarUrl:friend.avatarUrl
        }
        return <ChatListItem key={friend.username} room={room} />
      })}
    </Box>
  )
}