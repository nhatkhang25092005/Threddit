import { useEffect, useState, useContext } from "react";
import { Result } from "../../../class";

import { DISPLAY, TITLE } from "../../../constant";
import { useParams } from "react-router-dom";
import { useRealtimeComments } from "../../../provider/CommentProvider";
import { PostSyncContext } from "../../../provider/PostProvider";

import usePostData  from "./usePostData";
import useComment from "./useComment";
import useFollower from "../../../hooks/useFollower";

export default function usePostDetail() {
  const { postId } = useParams();
  // Post Data
  const {post, loading:postLoading, error:postError } = usePostData(postId)
  // Comment
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
  // Mention list
  const {state, fetchFollowers} = useFollower()

  const [result, setResult] = useState(null);
  const {realTimeComments} = useRealtimeComments()

  const [commentInput, setCommentInput] = useState("")
  const {updateCommentCount} = useContext(PostSyncContext)

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
        updateCommentCount(postId, Number(post.commentNumber) - 1)
        break
    }
  }
  
  // auto handle error from hook
  useEffect(()=>{ if(postError) setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, postError, null))},[postError])
  useEffect(()=>{ if(getCommentError) setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, getCommentError, null))},[getCommentError])
  useEffect(()=>{ if(postCmtError) setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, postCmtError, null))},[postCmtError])
  
    // get realtime
  useEffect(()=>{ 
    if(!realTimeComments) return
    updateComment(realTimeComments)
    console.log(comments.length)
    updateCommentCount(postId, Number(post.commentNumber) + 1)
  },[realTimeComments])
    
  return {
    commentInput, 
    comments,   
    loading:postLoading,
    isFollowerHasMore : state.anyMore,
    post, 
    result, 
    hasMoreComment, 
    getMoreCommentLoading,
    followers : state.list,
    followersLoading : state.loading,
    postCmtLoading,
    fetchComment, 
    setCommentInput, 
    onUpdateComment,
    onPostComment, 
    setResult,
    fetchFollowers,
  }
}
