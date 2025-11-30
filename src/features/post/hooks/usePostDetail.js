import { useEffect, useState, useCallback, useRef, useContext } from "react";
import { handleGetComments, handlePostComment } from "../../../services/request/commentRequest";
import {handleGetFollowersListRequest} from "../../../services/request/followRequest"
import { handleGetDetailPost } from "../../../services/request/postRequest";
import convertTime from "../../../utils/convertTime";
import { Result } from "../../../class";
import { DISPLAY, TITLE } from "../../../constant";
import { useParams } from "react-router-dom";
import { extractUsernames } from "../../../utils/extractUsernames";
import { useRealtimeComments } from "../../../provider/CommentProvider";
import { PostSyncContext } from "../../../provider/PostProvider";
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
  const {updateCommentCount} = useContext(PostSyncContext)
  const [isCommentPosting, setIsCommentPosting] = useState(false)


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

  const getComment = async () => {
    if(!hasMore &&  getMoreCommentLoading) return
    setGetMoreCommentLoading(true)
    try {
      const response = await handleGetComments(postId, cursor.current);
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
    setLoading(true)
    try {
      const response = await handleGetDetailPost(postId);
      if (response.isOk()) {
        setPost({
          ...response.data,
          createdAt: convertTime(response.data.createdAt),
          updatedAt: convertTime(response.data.updatedAt),
        });
        return true
      } else {
        setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null));
        return false
      }
    } catch (error) {
      const errorMessage = error?.message || String(error);
      setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, errorMessage, null));
    }
    finally{setLoading(false)}
  }, [postId]);

  // Post a comment request
  const postComment = useCallback( async (commentContent)=>{
    setCommentLoading(true)
    setIsCommentPosting(true)
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
    finally{
      setCommentLoading(false)
      setIsCommentPosting(false)
    }
  },[postId])
  function onUpdateComment(data){
      console.log("on Update COmment is called?")
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
    setPost(null);
    setComments([]);
    cursor.current = null
    setHasMore(true)
    async function run(){
      try{
        const isExisted = await getDetailPost()
        if (isExisted){ 
          await getComment()
          await fetchFollowers()
        }
      }
      catch(err){
        const errorMessage = err?.message || String(err);
        setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, errorMessage, null));
      }
    }
   run()  
  }, [postId])

  useEffect(()=>{ 
    if(!realTimeComments) return
    console.log("GET REALTIME COMMENT!", comments) //duplicate before here
    setComments(prev=>[realTimeComments, ...prev])
    updateCommentCount(postId, comments.length + 1)
  },[realTimeComments])
    
  return {
    commentContent, 
    comments,   
    loading,
    commentLoading, 
    isFollowerHasMore,
    post, 
    result, 
    hasMore, 
    getMoreCommentLoading,
    followers,
    followersLoading,
    isCommentPosting,
    getComment, 
    setCommentContent, 
    onUpdateComment,
    postComment, 
    setResult,
    fetchFollowers,
  }
}
