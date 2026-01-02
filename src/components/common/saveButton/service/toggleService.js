import { handleSavePost, handleUnSavePost } from "../../../../services/request/postRequest";
export const toggleService = async (postId, saveState) => {
  try{
    const response = saveState
    ? await handleUnSavePost(postId)
    : await handleSavePost(postId)
    if(response.isOk()) return {success:true}
    else return {success:false, message:response.message}
  }
  catch(e){return{success:false, message:e.message}}
}