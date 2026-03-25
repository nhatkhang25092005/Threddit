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
  useEditPost,
  useCreateStory,
  useDeleteStory,
  useEditStory,
  useGetCurrentStory,
  useGetFriendStory,
  useReaction,
  useReactionComment,
  useSavePost,
  useShareActionsPost,
  useGetPinnedStory,
  usePostPinActions,
  useStoryPinActions,
  useGetCommentList,
  useGetChildComment,
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
  useGetFeed,
  useGetReel,
  useSearch
} from "../hooks"

import {
  createReactionSelector,
  createPostSelector,
  createStorySelector,
  createLoadingSelector
} from "../store/selectors"
export default function PostProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState)

  const { getPostList, refreshUserPostList } = useGetPostList(dispatch, state.userPostHasMore)
  const getSavedPostList = useGetSavedPost(dispatch, state.mySavedHasMore)
  const getCurrentStory = useGetCurrentStory(dispatch)
  const getFriendStory = useGetFriendStory(dispatch)
  const getPinnedStory = useGetPinnedStory(dispatch)
  const { getCommentList, prefetchCommentThread, refreshCommentList } = useGetCommentList(dispatch)
  const { getChildComment, refreshChildComment } = useGetChildComment(dispatch)
  const createComment = useCreateComment(dispatch)
  const updateComment = useUpdateComment(dispatch)
  const deleteComment = useDeleteComment(dispatch)
  const createPost = useCreatePost(dispatch)
  const createStory = useCreateStory(dispatch)
  const deletePost = useDeletePost(dispatch)
  const deleteStory = useDeleteStory(dispatch)
  const editPost = useEditPost(dispatch)
  const editStory = useEditStory(dispatch)
  const reaction = useReaction(dispatch)
  const reactionComment = useReactionComment(dispatch)
  const { savePost, unsavePost } = useSavePost(dispatch)
  const { sharePost, unsharePost, toggleSharePost } = useShareActionsPost(dispatch, state.postById)
  const { pinPost, unpinPost } = usePostPinActions(dispatch)
  const {pinStory, unpinStory} = useStoryPinActions(dispatch)
  const getFeed = useGetFeed(dispatch, state.feedHasMore, state.contentList.home?.feeds ?? [])
  const getReel = useGetReel(dispatch, state.reelHasMore, state.contentList.reel ?? [])
  const { searchContent, getNextPage } = useSearch(
    dispatch,
    state.searchHasMore,
    state.contentList.searchList ?? []
  )

  console.log(state)
  
  const selector = useMemo(()=>({
    reaction: createReactionSelector(state),
    post: createPostSelector(state),
    story: createStorySelector(state),
    loading: createLoadingSelector(state)
  }),[state])


  const actions = useMemo(
    () => ({
      getPostList:  (username)=> getPostList(username),
      refreshUserPostList: (username) => refreshUserPostList(username),
      getSavedPostList: () => getSavedPostList(),
      getCurrentStory: (username) => getCurrentStory(username),
      getFriendStory: (options) => getFriendStory(options),
      getPinnedStory: (username, options) => getPinnedStory(username, options),
      getCommentList: (postId, options) => getCommentList(postId, options),
      prefetchCommentThread: (postId) => prefetchCommentThread(postId),
      getChildComment: (parentCommentId, options) => getChildComment(parentCommentId, options),
      refreshCommentList: (postId) => refreshCommentList(postId),
      refreshChildComment: (parentCommentId) => refreshChildComment(parentCommentId),
      createComment: (postId, data) => createComment(postId, data),
      updateComment: (commentId, data) => updateComment(commentId, data),
      deleteComment: (postId, commentId, options) => deleteComment(postId, commentId, options),
      createPost,
      createStory,
      deletePost,
      deleteStory,
      editPost,
      editStory,
      reaction,
      reactionComment,
      savePost,
      unsavePost,
      sharePost,
      unsharePost,
      toggleSharePost,
      pinPost,
      unpinPost,
      unpinStory,
      pinStory,
      getFeed,
      getReel,
      searchContent,
      getSearchNextPage: getNextPage
    }),
    [getFeed, getReel, getNextPage, pinStory, searchContent, unpinStory, getPostList, refreshUserPostList, getSavedPostList, getCurrentStory, getFriendStory, getPinnedStory, getCommentList, prefetchCommentThread, getChildComment, refreshCommentList, refreshChildComment, createComment, updateComment, deleteComment, createPost, createStory, deletePost, deleteStory, editPost, editStory, reaction, reactionComment, savePost, unsavePost, sharePost, unsharePost, toggleSharePost, pinPost, unpinPost]
  )

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
