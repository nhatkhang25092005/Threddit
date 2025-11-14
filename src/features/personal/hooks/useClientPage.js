import { useCallback, useEffect, useRef, useState } from "react";
import {  useParams } from "react-router-dom";
import {
  handleGetFollowNumberOfClient,
  handleFollowRequest,
  handleGetFollowState,
  handleUnFollow,
} from "../../../services/request/followRequest";

import { handleGetClientPost } from "../../../services/request/postRequest";
import { Result } from "../../../class";
import { DISPLAY, TITLE } from "../../../constant";
import convertTime from "../../../utils/convertTime";

export default function useClientPage() {
  const {clientName} = useParams()
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);
  const [follow, setFollow] = useState(false);
  const [error, setError] = useState(null);

  const [btnLoading, setBtnLoading] = useState(false)
  const [loading, setLoading] = useState(false);

  const cursor = useRef(null)

  const loadingRef = useRef(false);

  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState([]);
  const firstLoad  = useRef(null)


  // first execute after rendering for basic information

  //get user follows
  const getFollow = useCallback( async () => {
    const response = await handleGetFollowNumberOfClient(clientName);
    setFollower(response.data.followerNumber);
    setFollowing(response.data.followingNumber);
  },[clientName])

  // handle post follow
  async function postFollow() {
    setBtnLoading(true);
    const response = await handleFollowRequest(clientName);
    if (response.isOk()) {
      setFollow(true);
    }
    else if (response.status === 429) {
      setError(new Result(DISPLAY.DISABLE));
    } else {
      setError(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message));
    }
    setBtnLoading(false);
    return;
  }

  // Unfollow this client
  async function postUnFollow() {
    setBtnLoading(true);
    const response = await handleUnFollow(clientName);
    if (response.isOk()) {
      setFollow(false);
    }
    else if (response.status === 429) {
      setError(new Result(DISPLAY.DISABLE));
    } else {
      setError(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message));
    }
    setBtnLoading(false);
    return;
  }

  // get the follow state of this client
  const getFollowState = useCallback(async () => {
    const response = await handleGetFollowState(clientName);
    if (response.isOk()) {
      setFollow(response.data.isFollow);
    }
  }, [clientName]);

  const getCreatedPost = useCallback(async () => {
    // check and setup/ re-set state
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);
    // call and handle api response
    try {
      const response = await handleGetClientPost(clientName, cursor.current);

      // check has more post
      if (response.data === null) {
        setLoading(false);
        setHasMore(false);
      }

      // if has more
      else if (response.isOk()) {
        const newList = response.data.posts.map((item) => ({
          ...item,
          createdAt: convertTime(item.createdAt),
          updatedAt: convertTime(item.updatedAt),
        }));
        setPosts((prev) => [...prev, ...newList]);
        cursor.current = response.data.cursor
      }

      // if unexpected error occurs
      else {
        setError(
          new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null)
        );
      }
    } catch (e) {
      setError(new Result(DISPLAY.POPUP, TITLE.ERROR, e, null));
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [clientName, hasMore]);

  useEffect(() => {
    getFollow();
    getFollowState();
    if(!firstLoad.current){
      firstLoad.current = true
      getCreatedPost()
    }

  }, [getCreatedPost, getFollow, getFollowState]);

  return {
    loading,
    clientName,
    follower,
    following,
    posts,
    error,
    follow,
    hasMore,
    postUnFollow,
    postFollow,
    getCreatedPost,
  };
}
