import { Result } from "../class";
import { DISPLAY, TITLE } from "../constant";
import { handlePinMyPost, handleUnPinMyPost } from "../services/request/postRequest";
import { useState } from "react";
export default function usePin(){
    const [pinLoading, setLoading] = useState(false);
    const [resultOfPin, setResult] = useState({isSuccess : null, say: null});
    async function pinPost(postId){
        setLoading(true);
        if(!postId){
            console.error("postId is required to pin post");
            return setResult({
                isSuccess:false,
                say:new Result(DISPLAY.POPUP, TITLE.ERROR, "postId is required to pin post", null)
            })
        }
        try{
            const response = await handlePinMyPost(postId);
            console.log(response)
            if(response.isOk()) 
                return setResult({
                    isSuccess:true,
                    say:null
                })
            else
                return setResult({
                    isSuccess:false,
                    say:new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null)
                })
        }
        catch(err){
            console.error("Error in pinPost:", err);
            return setResult({
                isSuccess:false,
                say:new Result(DISPLAY.POPUP, TITLE.ERROR, err, null)
            })
        }
        finally{
            setLoading(false);
        }
    }

    async function unpinPost(postId){
        setLoading(true);
        if(!postId){
            console.error("postId is required to unpin post");  
            return setResult({
                isSuccess:false,
                say:new Result(DISPLAY.POPUP, TITLE.ERROR, "postId is required to unpin post", null)
            })
        }
        try{
            const response = await handleUnPinMyPost(postId);
            console.log(response)
            if(response.isOk()) 
                return setResult({
                    isSuccess:true,
                    say:null
                })
            else
                return setResult({
                    isSuccess:false,
                    say:new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null)
                })
        }
        catch(err){
            console.error("Error in unpinPost:", err);
            return setResult({
                isSuccess:false,
                say:new Result(DISPLAY.POPUP, TITLE.ERROR, err, null)
            })
        }
        finally{
            setLoading(false);
        }
    }
    return {pinPost, unpinPost, resultOfPin, pinLoading};
}