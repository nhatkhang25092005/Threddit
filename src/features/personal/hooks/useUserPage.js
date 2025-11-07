import { useCallback, useEffect, useRef, useState } from "react";
import { handleGetFollowNumberOfUser } from "../../../services/request/followRequest";

import { 
  handleGetUserCreatedPost, 
  handleGetUserSavedPost,
} from "../../../services/request/postRequest";

import { handleGetUserInfoRequest } from "../../../services/request/userRequest";
import { Result } from "../../../class";
import { DISPLAY, TITLE } from "../../../constant";
import convertTime from "../../../utils/convertTime";

export default function useUserPage() {
  // Get basic information of user
  const [username, setUsername] = useState("");
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);

  // Get posts
  const [createdPosts, setCreatedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([])

  // Elements of rendering
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

 
  // Ref
  const loadingRef = useRef(null);
  const createdCursor = useRef(null)
  const savedCursor = useRef(null)

  // Scrolling controlled elements
  const [createdPostHasMore, setCreatedPostHasMore] = useState(true);
  const [savedPostHasMore, setSavedPostHasMore] = useState(true)


  // Switch between tags
  const [tag, setTag] = useState(0)

  // first execute after rendering for basic information

  // get username
  async function getUserInfo() {
    const response = await handleGetUserInfoRequest();
    setUsername(response.data.data.username);
  }

  //get user follows
  async function getFollow() {
    const response = await handleGetFollowNumberOfUser();
    setFollower(response.data.followerNumber);
    setFollowing(response.data.followingNumber);
  }

  // Get created posts
  const getCreatedPost = useCallback(async () => {
    if (loadingRef.current || !createdPostHasMore) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      //call
      const response = await handleGetUserCreatedPost(createdCursor.current);
      // check has more posts
      if (response.data === null){setCreatedPostHasMore(false)}
      else if (response.isOk()) {
        //convert time for each post
        const newList = response.data.posts.map((item) => ({
          ...item,
          createdAt: convertTime(item.createdAt),
          updatedAt: convertTime(item.updatedAt),
        }));
        // append new posts list
        setCreatedPosts((prev) => [...prev, ...newList]);
        createdCursor.current = response.data.cursor 
      } 
      else {setError(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null))}
    } catch (err) {
      setError(new Result(DISPLAY.POPUP, TITLE.ERROR, err, null));
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [createdPostHasMore]);

  //get saved posts
  const getSavedPost = useCallback(async () => {
    if(loadingRef.current || !savedPostHasMore) return
    loadingRef.current = true
    setLoading(true)
    try{
      const response = await handleGetUserSavedPost(savedCursor.current)
      if(response.data === null ){setSavedPostHasMore(false)}
      else if(response.isOk()){
        const newList = response.data.posts.map((item) => ({
          ...item,
          createdAt: convertTime(item.createdAt),
          updatedAt: convertTime(item.updatedAt),
        }))
        setSavedPosts(prev => [...prev, ...newList])
        savedCursor.current = response.data.cursor
      }     
      else{
        setError(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null))
      }
    }
    catch (err){setError(new Result(DISPLAY.POPUP, TITLE.ERROR, err, null))}
    finally{
      setLoading(false)
      loadingRef.current = false
    }

  },[savedPostHasMore])

  function adjustSavePostAfterUnsave(postId){
    setSavedPosts((prev)=> prev.filter((item)=> item.id !== postId))
  }

  // Execute with re-render
  useEffect(() => {
   if (tag === 0) {
    setCreatedPosts([]);
    createdCursor.current = null;
    setCreatedPostHasMore(true);
    getCreatedPost();
  } else if (tag === 1) {
    setSavedPosts([]);
    savedCursor.current = null;
    setSavedPostHasMore(true);
    getSavedPost();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);


  // Execute once 
  useEffect(()=>{
    getUserInfo();
    getFollow();
  },[])


  return {
    adjustSavePostAfterUnsave,
    getCreatedPost,
    getSavedPost,
    setTag,
    createdPostHasMore,
    savedPostHasMore,
    loading,
    username,
    follower,
    following,
    createdPosts,
    savedPosts,
    error,
  }
}
