import { useMemo, useReducer } from "react"
import PostModalProvider from "./PostModalProvider"
import { PostContext } from "./postContext"
import { reducer, initState } from "../store/reducer"
import { modal } from "./modals"
import {
  useGetPostList,
  useGetSavedPost,
  useCreatePost,
  useDeletePost,
  useCreateStory,
  useDeleteStory,
  useGetCurrentStory,
  useGetFriendStory,
  useReaction,
  useSavePost,
  useGetPinnedStory,
  usePostPinActions,
  useStoryPinActions
} from "../hooks"

import {
  createReactionSelector,
  createPostSelector,
  createStorySelector,
  createLoadingSelector
} from "../store/selectors"
export default function PostProvider({ children }) {
  /* ---------------- state (reducer / initState) ---------------- */
  const [state, dispatch] = useReducer(reducer, initState)

  /* ---------------- side-effect hooks (fetch, subscribe, ...) ---------------- */
  const getPostList = useGetPostList(dispatch, state.userPostHasMore)
  const getSavedPostList = useGetSavedPost(dispatch, state.mySavedHasMore)
  const getCurrentStory = useGetCurrentStory(dispatch)
  const getFriendStory = useGetFriendStory(dispatch)
  const getPinnedStory = useGetPinnedStory(dispatch)
  const createPost = useCreatePost(dispatch)
  const createStory = useCreateStory(dispatch)
  const deletePost = useDeletePost(dispatch)
  const deleteStory = useDeleteStory(dispatch)
  const reaction = useReaction(dispatch)
  const { savePost, unsavePost } = useSavePost(dispatch)
  const { pinPost, unpinPost } = usePostPinActions(dispatch)
  const {pinStory, unpinStory} = useStoryPinActions(dispatch)

  /* ---------------- cross-module sync API (optional) ---------------- */
  const selector = useMemo(()=>({
    // timeline: createTimelineSelector(state),
    reaction: createReactionSelector(state),
    post: createPostSelector(state),
    story: createStorySelector(state),
    loading: createLoadingSelector(state)
    // list selector
    // item selector
  }),[state])

  /* ---------------- exposed actions (wrapped for consumer) ---------------- */
  const actions = useMemo(
    () => ({
      getPostList:  (username)=> getPostList(username),
      getSavedPostList: () => getSavedPostList(),
      getCurrentStory: (username) => getCurrentStory(username),
      getFriendStory: (options) => getFriendStory(options),
      getPinnedStory: (username, options) => getPinnedStory(username, options),
      createPost,
      createStory,
      deletePost,
      deleteStory,
      reaction,
      savePost,
      unsavePost,
      pinPost,
      unpinPost,
      unpinStory,
      pinStory,
    }),
    [pinStory, unpinStory, getPostList, getSavedPostList, getCurrentStory, getFriendStory, getPinnedStory, createPost, createStory, deletePost, deleteStory, reaction, savePost, unsavePost, pinPost, unpinPost]
  )

  /* ---------------- provider value ---------------- */
  const value = useMemo(
    () => ({
      state,
      actions,
      selector
    }),
    [actions, state, selector]
  )

  return (
    <PostContext.Provider value={value}>
      <PostModalProvider modals={modal} >
        {children}
      </PostModalProvider>
    </PostContext.Provider>
  )
}
