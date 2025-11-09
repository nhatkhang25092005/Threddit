import { useCallback, useEffect, useRef, useState } from "react";
import { handleGetFollowNumberOfUser } from "../services/request/followRequest";

import { 
  handleGetUserCreatedPost, 
  handleGetUserSavedPost,
  handleDeleteMyPost,
  handleEditMyPost
} from "../services/request/postRequest";

import { handleGetUserInfoRequest } from "../services/request/userRequest";
import { Result } from "../class";
import { DISPLAY, TITLE } from "../constant";
import convertTime from "../utils/convertTime";

import {sortPinned} from "../utils/sortPinned";
import {extractUsernames} from "../utils/extractUsernames";

export default function usePost({post, onUpdate}) {
  // Get basic information of user
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

    // Delete
    async function deletePost(postId){
        if(!postId) {
          console.error("postId is required to delete post");
          return
        }
        setLoading(true)
        try{
          const response = await handleDeleteMyPost(postId)
          if(response.isOk()){
            // setCreatedPosts((prev)=> prev.filter((item)=> item.id !== postId))
            // setSavedPosts((prev)=> prev.filter((item)=> item.id !== postId))
            setResult(new Result(DISPLAY.SNACKBAR, TITLE.SUCCESS, response.message, null))
            console.log("Response of the usePost deletePost method",response)
          }
          else{ setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null)) }
        }
        catch(err){
          console.error("Error in deletePost:", err);
          setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, err, null))
        }
        finally{
          setLoading(false)
        }
      }
    
    // pin
    // edit

    return {
        deletePost,
        setResult,
        loading, 
        result
    }
}
