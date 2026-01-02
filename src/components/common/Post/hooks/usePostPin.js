import { useCallback, useState } from "react";
import usePin from "../../../../hooks/usePin";
import { Result } from "../../../../class";
import { TITLE, DISPLAY } from "../../../../constant";

export function usePostPin(postId, status, onResult, onPostUpdateRendering){
  const {pinPost, unPinPost, pinLoading} = usePin()
  const [isPinned, setIsPinned] = useState(status)
  const handlePin = useCallback(async () => {
    try {
      const result = isPinned ? await unPinPost(postId) : await pinPost(postId)
        if (result.isSuccess) {
        const newPinStatus = !isPinned;
        setIsPinned(newPinStatus);
        if (onPostUpdateRendering) {
          onPostUpdateRendering({
            type: 'pin',
            postId,
            newPinStatus,
            message: 'Updated successfully',
          });
        }
        return { success: true };
      }
      return { success: false };
    }
    catch(e){
      console.error("Pin/Unpin error: ", e)
      if(onResult){onResult(new Result(DISPLAY.POPUP, TITLE.ERROR, e, null))}
      return { success: false }
    }
  },[postId, isPinned, onResult, pinPost, unPinPost, setIsPinned, onPostUpdateRendering])
  
  return {
    isPinned,
    pinLoading,
    handlePin,
  }
}