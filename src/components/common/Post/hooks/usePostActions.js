import { useCallback, useState } from "react";
import { SYSTEM_ERROR, DISPLAY, TITLE } from "../../../../constant";
import { handleEditMyPost, handleDeleteMyPost } from "../../../../services/request/postRequest";
import { extractUsernames } from "../../../../utils/extractUsernames";
import { Result } from "../../../../class";

export function usePostActions(postId, onResult, onPostUpdated){
  const [loading, setLoading] = useState(false)
  
  const handleEdit = useCallback(async (content)=>{
    if(!postId){
      console.error(SYSTEM_ERROR.POST_ID_MISSING_WHEN_EDITINT_POST)
      return
    }
    setLoading(true)
    try{
      const response = await handleEditMyPost(postId, content, extractUsernames(content))
      if(response.isOk()){
        if (onPostUpdated) {
          onPostUpdated({
            type: 'edit',
            postId,
            data: { content },
            message: response.message,
          });
        }
        if (onResult) {onResult(new Result(DISPLAY.SNACKBAR, null, response.message, null))}
        return { success: true, content };
      }
      else{
        if(onResult){onResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message))}
        return {success:false}
      }
    }
    catch(e){
      console.error('Edit error:', e)
      if(onResult) onResult(e)
      return {success: false}
    }
    finally{setLoading(false)}
  },[postId, onResult, onPostUpdated])

  const handleDelete = useCallback(async () => {
    if (!postId) {
      console.error('postId is required to delete post');
      return { success: false };
    }

    setLoading(true);
    try {
      const response = await handleDeleteMyPost(postId);

      if (response.isOk()) {
        if (onPostUpdated) {
          onPostUpdated({
            type: 'delete',
            postId,
          });
        }
        if (onResult) {
          onResult(new Result(DISPLAY.SNACKBAR, null, response.message, null));
        }
        return { success: true };
      } else {
        if (onResult) {
          onResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null));
        }
        return { success: false };
      }
    } catch (err) {
      console.error('Delete error:', err);
      if (onResult) onResult(err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [postId, onResult, onPostUpdated]);

  return {
    loading,
    handleEdit,
    handleDelete,
  };
}