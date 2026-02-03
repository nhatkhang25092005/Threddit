import FollowerList from "./components/FollowerList";
import FollowingList from "./components/FollowingList";
import TabsController from "../../components/layout/TabsController";
import Surface from "../../components/common/Surface";
import { follow } from "../../constant/text/vi/follow.text";

export default function Follow(){
  return(
    <Surface sx={style.surface}>
      <TabsController sx={style.tabs_controller}>
        <FollowerList label={follow.label.follower}/>
        <FollowingList label={follow.label.following}/>
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