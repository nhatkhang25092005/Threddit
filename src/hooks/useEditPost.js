import { useState } from "react";
import handleEditMyPost()

export default function useEditPost(){
    const [editLoading, setEditLoading] = useState(false)
    async function saveEdit(postId){
        if (!postId) {
            console.error("postId is required to save edit");
            return;
        }
        try {
            setEditLoading(true);
            const response = await handleEditMyPost(postId, editContent, extractUsernames(editContent));
            console.log(response)
            if (response.isOk()) {
            setCurrentItem(prev => ({ ...prev, content: editContent }));
            
            if (onPostUpdatedRendering) {
                onPostUpdatedRendering({
                type: 'edit',
                postId,
                data: { content: editContent },
                message: response.message 
                });
            }
            cancelEditing()
            if(onResult) onResult(new Result(DISPLAY.SNACKBAR, null, response.message, null))
            } else if (onResult) onResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message));
            
        } catch (err) {
            if (onResult) onResult(err);
        } finally {
            setEditLoading(false);
        }
    }
    return{
        saveEdit
    }
}