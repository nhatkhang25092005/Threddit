import { useEffect, useState, useCallback, useRef } from "react";
import { handleGetComments, handlePostComment } from "../../../services/request/commentRequest";
import { handleGetDetailPost } from "../../../services/request/postRequest";
import convertTime from "../../../utils/convertTime";
import { Result } from "../../../class";
import { DISPLAY, TITLE } from "../../../constant";
import { useParams } from "react-router-dom";
import { extractUsernames } from "../../../utils/extractUsernames";
import { useRealtimeComments } from "../../../provider/CommentProvider";

export default function usePostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false)
  const [result, setResult] = useState(null);
  const {realTimeComments} = useRealtimeComments()
  const [comments, setComments] = useState([])
  const [commentContent, setCommentContent] = useState("")
  const [hasMore, setHasMore] = useState(true)
  const [getMoreCommentLoading, setGetMoreCommentLoading] = useState(false)
  const cursor = useRef(null)

  const getComment = async () => {
    if(!hasMore &&  getMoreCommentLoading) return
    setGetMoreCommentLoading(true)
    try {
      console.log(cursor.current)

      const response = await handleGetComments(postId, cursor.current);
      console.log(response)
      if(response.status === 204) {
        setHasMore(false)
      }
      else if(response.isOk()) {
          const convertedTimeList = response.data.comments.map(comment => ({
          ...comment,
          createdAt: convertTime(comment.createdAt),
          updatedAt: convertTime(comment.updatedAt),
        }))
        setComments(prev=>[...prev, ...convertedTimeList])
        cursor.current = response.data.cursor
      } 
      else {setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null));}
    } 
    catch (err) {
      console.log(err)
      const errorMessage = err?.message || String(err);
      setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, errorMessage, null));
    }
    finally{setGetMoreCommentLoading(false)}
  }

  const getDetailPost = useCallback(async () => {
    try {
      const response = await handleGetDetailPost(postId);
      if (response.isOk()) {
        setPost({
          ...response.data,
          createdAt: convertTime(response.data.createdAt),
          updatedAt: convertTime(response.data.updatedAt),
        });
      } else {
        setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null));
      }
    } catch (error) {
      const errorMessage = error?.message || String(error);
      setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, errorMessage, null));
    }
  }, [postId]);

  // Post a comment request
  const postComment = useCallback( async (commentContent)=>{
    setCommentLoading(true)
    try{
      const response = await handlePostComment(postId, commentContent, extractUsernames(commentContent))
      if(!response.isOk()){ 
        setResult(new Result(response.displayType, TITLE.ERROR, response.data.message, null))
      }
      else setCommentContent('')
    }
    catch(error){
      const errorMessage = error?.message || String(error)
      setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, errorMessage, null))
    }
    finally{setCommentLoading(false)}
  },[postId])

  function onUpdateComment(data){
    switch(data.type){
      case 'edit' : 
        setComments(comments.map(item => item.id === data.commentId ? {...item, content : data.content} : item))
        break
      case 'delete' : 
        setComments(comments.filter(item => item.id !== data.commentId))
        break
    }
  }

  // Base Info
  useEffect(() => {
    if (!postId) return;
    setLoading(true);
    setPost(null);
    setComments([]);
    Promise.all([getDetailPost(), getComment()])
      .catch(err => {
        const errorMessage = err?.message || String(err);
        setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, errorMessage, null));
      })
      .finally(() => setLoading(false));
  }, [postId]);

  useEffect(()=>{ 
    if(!realTimeComments) return
    setComments(prev=>[realTimeComments, ...prev]) },[realTimeComments])
    
    
  return {
    commentContent, 
    comments, 
    loading,
    commentLoading, 
    post, 
    result, 
    hasMore, 
    getMoreCommentLoading,
    getComment, 
    setCommentContent, 
    onUpdateComment, 
    postComment, 
    setResult 
  }
}
