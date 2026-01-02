import { useCallback, useEffect, useRef, useState } from "react";
import { handleGetFollowNumberOfUser } from "../../../services/request/followRequest";
import { handleGetUserCreatedPost, handleGetUserSavedPost } from "../../../services/request/postRequest";
import { handleGetUserInfoRequest } from "../../../services/request/userRequest";
import { Result } from "../../../class";
import { DISPLAY, TITLE } from "../../../constant";
import convertTime from "../../../utils/convertTime";
import { sortPinned } from "../../../utils/sortPinned";
import { useNotify } from "../../../hooks/useNotify.js";

export default function useUserPage() {
  // Get basic information of user
  const [username, setUsername] = useState("");
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);

  // Get posts
  const [createdPosts, setCreatedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  // Elements of rendering
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ref
  const loadingRef = useRef(null);
  const createdCursor = useRef(null);
  const savedCursor = useRef(null);

  // Scrolling controlled elements
  const [createdPostHasMore, setCreatedPostHasMore] = useState(true);
  const [savedPostHasMore, setSavedPostHasMore] = useState(true);

  // Switch between tags
  const [tag, setTag] = useState(0);

  const notify = useNotify()

  // Handle post updates from Post component
  function handlePostUpdate(update) {
    const { type, postId, data, message, status } = update;

    switch (type) {
      case 'edit':
        // Update content in both lists
        setCreatedPosts((prev) =>
          prev.map((item) =>
            item.id === postId ? { ...item, content: data.content } : item
          )
        );
        setSavedPosts((prev) =>
          prev.map((item) =>
            item.id === postId ? { ...item, content: data.content } : item
          )
        );
        break;

      case 'delete':
        // Remove from both lists
        setCreatedPosts((prev) => prev.filter((item) => item.id !== postId));
        setSavedPosts((prev) => prev.filter((item) => item.id !== postId));
        notify.snackbar(message || "Đã xóa bài viết", 4000)
        break;

      case 'pin':
        setCreatedPosts((prev) =>
          sortPinned(
            prev.map((item) =>
              item.id === postId ? { ...item, isPinned: !item.isPinned } : item
            )
          )
        );
        setSavedPosts((prev) =>
          sortPinned(
            prev.map((item) =>
              item.id === postId ? { ...item, isPinned: !item.isPinned } : item
            )
          )
        );
        break
      case 'save':
        console.log("Saved is call in useUserPage")
        setCreatedPosts(prev=>prev.map(post=>
          post.id === postId
          ? {...post, isSave: status}
          : post
        ))
        break
      default:
        console.warn('Unknown update type:', type);
    }
  }

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
    notify.loading(true);// UI
    setLoading(true)// Logic
    try {
      const response = await handleGetUserCreatedPost(createdCursor.current);
      if (response.data === null) {
        setCreatedPostHasMore(false);
      } else if (response.isOk()) {
        const newList = response.data.posts.map((item) => ({
          ...item,
          createdAt: convertTime(item.createdAt),
          updatedAt: convertTime(item.updatedAt),
        }));
        setCreatedPosts((prev) => sortPinned([...prev, ...newList]));
        createdCursor.current = response.data.cursor;
      } else {
        setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null));
      }
    }
    catch (err) { notify.popup(TITLE.ERROR, err.message) }
    finally {
      setLoading(false)
      notify.loading(false);
      loadingRef.current = false;
    }
  }, [createdPostHasMore, notify]);

  //get saved posts
  const getSavedPost = useCallback(async () => {
    if (loadingRef.current || !savedPostHasMore) return;
    loadingRef.current = true;
    notify.loading(true); // UI
    setLoading(true) // Scroll logic
    try {
      const response = await handleGetUserSavedPost(savedCursor.current);
      if (response.data === null) {
        setSavedPostHasMore(false);
      } else if (response.isOk()) {
        const newList = response.data.posts.map((item) => ({
          ...item,
          createdAt: convertTime(item.createdAt),
          updatedAt: convertTime(item.updatedAt),
        }));
        setSavedPosts((prev) => sortPinned([...prev, ...newList]));
        savedCursor.current = response.data.cursor;
      } else {
        setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null));
      }
    }
    catch (err) { notify.popup(TITLE.ERROR, err)} 
    finally {
      setLoading(false)
      notify.loading(false);
      loadingRef.current = false;
    }
  }, [savedPostHasMore,notify]);

  function adjustSavePostAfterUnsave(postId) {
    setSavedPosts((prev) => prev.filter((item) => item.id !== postId));
  }

  // Adjust pin status after pin/unpin
  function adjustPinStatus(postId) {
    setCreatedPosts((prev) =>
      sortPinned(
        prev.map((item) =>
          item.id === postId ? { ...item, isPinned: !item.isPinned } : item
        )
      )
    );
    setSavedPosts((prev) =>
      sortPinned(
        prev.map((item) =>
          item.id === postId ? { ...item, isPinned: !item.isPinned } : item
        )
      )
    );
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
  useEffect(() => {
    getUserInfo();
    getFollow();
  }, []);

  return {
    setResult,
    handlePostUpdate,
    adjustSavePostAfterUnsave,
    getCreatedPost,
    getSavedPost,
    setTag,
    adjustPinStatus,
    setCreatedPosts,
    setSavedPosts,
    createdPostHasMore,
    savedPostHasMore,
    loading,
    username,
    follower,
    following,
    createdPosts,
    savedPosts,
    result,
  };
}