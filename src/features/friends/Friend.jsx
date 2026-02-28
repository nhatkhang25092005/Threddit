import TabsController from "../../components/layout/TabsController";
import Surface from "../../components/common/Surface";
import FriendList from './components/FriendsList'
import RequestList from "./components/RequestList";
import MutualList from "./components/MutualList";
import useAuth from "../../core/auth/useAuth";
import { friend } from '../../constant/text/vi/friend.text'
import SentList from "./components/SentList";
export default function Friend(){
  const { isOwner } = useAuth()

  const shouldDisplay = [
    <FriendList label={friend.text_on_profile.label.friends_list} name='friends_list'/>,
    !isOwner && <MutualList label={friend.text_on_profile.label.mutual_friends_list} name='mutual_list'/>,
    isOwner && <RequestList label={friend.text_on_profile.label.request_list} name='requests_received'/>,
    isOwner && <SentList label={friend.text_on_profile.label.sent_request_list} name='sent'/>
  ].filter(Boolean)

  return(
    <Surface sx={style.surface}>
      <TabsController
        sx={style.tabs_controller}
        urlParams='friend_tab'
        defaultTab='friends_list'
      >
        {shouldDisplay}
      </TabsController>
    </Surface>
  )
}

const style = {
  surface:{
    width:'100%'
  },
  tabs_controller:{bgcolor:'transparent', border:'none', boxShadow:'none', pt:0}
}
