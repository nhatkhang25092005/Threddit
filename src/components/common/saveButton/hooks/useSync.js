import { useContext, useEffect, useRef } from "react";
import { PostSyncContext } from "../../../../provider/PostProvider";

export default function useSync(postId, dispatch){
  const {getPostState} = useContext(PostSyncContext)
  const lastSaveUpdateTimeRef = useRef(0);
  useEffect(()=>{
    const postState = getPostState(postId)
    if (postState?.save) {
      if (postState.save.updatedAt > lastSaveUpdateTimeRef.current) {
        dispatch({
          type:'SYNC',
          payload:{
            saveState:postState.save.isSaved,
            count:postState.save.saveNumber
          }
        })
        lastSaveUpdateTimeRef.current = postState.save.updatedAt;
      }
    }
  },[getPostState, postId, dispatch])
}