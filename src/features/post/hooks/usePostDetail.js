import { useEffect, useState, useCallback, useRef, useContext } from "react";
import {handleGetFollowersListRequest} from "../../../services/request/followRequest"
import { Result } from "../../../class";

import { DISPLAY, TITLE } from "../../../constant";
import { useParams } from "react-router-dom";
import { useRealtimeComments } from "../../../provider/CommentProvider";
import { PostSyncContext } from "../../../provider/PostProvider";

import usePostData  from "./usePostData";
import useComment from "./useComment";

export default function usePostDetail() {
  const { postId } = useParams();
  const {post, loading:postLoading, error:postError } = usePostData(postId)
  const {
    commentsState:{
      comments, 
      getMoreCommentLoading, 
      getCommentError, 
      hasMoreComment, 
      postCmtError, 
      postCmtLoading
    },
    fetchComment,
    updateComment,
    editComment,
    deleteComment,
    postComment
  } = useComment(postId)

  const [result, setResult] = useState(null);
  const {realTimeComments} = useRealtimeComments()

  const [commentInput, setCommentInput] = useState("")
  const {updateCommentCount} = useContext(PostSyncContext)
  // Fetch followings elements
  const followersCursor = useRef(null)
  const [isFollowerHasMore, setIsFollowerHasMore] = useState(true)
  const [followers, setFollowers] = useState([])
  const [followersLoading, setFollowersLoading] = useState(false)

  // Fetch followings
  const fetchFollowers = useCallback(async ()=>{
    if(!isFollowerHasMore) return
    setFollowersLoading(true)
    try{
      const response = await handleGetFollowersListRequest('me', followersCursor.current)  
      if(response.status === 204) setIsFollowerHasMore(false)
      else if(response.isOk()){
        setFollowers(response.data.followerList)
        followersCursor.current = response.data.cursor
      }
      else setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null))
    }
    catch(error){
      console.error("Error occurs in fetchFollowings at usePostDetail:", error)
      const eMessage = error?.message || String(error)
      setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, eMessage, null))
    }
    finally{setFollowersLoading(false)}
  },[isFollowerHasMore])

  async function onPostComment(){
    const isOk = await postComment(commentInput)
    isOk ? setCommentInput('') : setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, postCmtError, null))
  }
  function onUpdateComment(data){
      console.log("on Update COmment is called?")
      switch(data.type){
        case 'edit' : 
          editComment(data.commentId, data.content)
          break
        case 'delete' : 
          deleteComment(data.commentId)
          break
      }
    }
  // Reset state
 useEffect(() => {
  if(!postId) return
  async function initialize() {
    try {
        await fetchFollowers();
    } catch (err) {
      const errorMessage = err?.message || String(err);
      setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, errorMessage, null));
    }
  }

  if(post) initialize()
}, [postId, post]);
  
  // auto handle error from hook
  useEffect(()=>{ if(postError) setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, postError, null  ))},[postError])
  useEffect(()=>{ if(getCommentError) setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, getCommentError, null))},[getCommentError])
  useEffect(()=>{ if(postCmtError) setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, postCmtError, null))},[postCmtError])
  
    // get realtime
  useEffect(()=>{ 
    if(!realTimeComments) return
    updateComment(realTimeComments)
    updateCommentCount(postId, comments.length + 1)
  },[realTimeComments])
    
  return {
    commentInput, 
    comments,   
    loading:postLoading,
    isFollowerHasMore,
    post, 
    result, 
    hasMoreComment, 
    getMoreCommentLoading,
    followers,
    followersLoading,
    postCmtLoading,
    fetchComment, 
    setCommentInput, 
    onUpdateComment,
    onPostComment, 
    setResult,
    fetchFollowers,
  }
}
