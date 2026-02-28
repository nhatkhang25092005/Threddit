import { useMemo, useReducer } from "react"
import PostModalProvider from "./PostModalProvider"
import { PostContext } from "./postContext"
import { reducer, initState } from "../store/reducer"
import { modal } from "./modals"
import { useGetPostList, useCreatePost, useReaction, useSavePost } from "../hooks"
import { createTimelineSelector } from "../store/selectors/timeline.selector"
import { createReactionSelector } from "../store/selectors/reaction.selector"
import { createPostSelector } from "../store/selectors/post.selector"
export default function PostProvider({ children }) {
  /* ---------------- state (reducer / initState) ---------------- */
  const [state, dispatch] = useReducer(reducer, initState)

  /* ---------------- side-effect hooks (fetch, subscribe, ...) ---------------- */
  const getPostList = useGetPostList(dispatch, state.hasMore)
  const createPost = useCreatePost(dispatch)
  const reaction = useReaction(dispatch)
  const { savePost, unsavePost } = useSavePost(dispatch)
  /* ---------------- cross-module sync API (optional) ---------------- */
  const selector = useMemo(()=>({
    timeline: createTimelineSelector(state),
    reaction: createReactionSelector(state),
    post: createPostSelector(state)
    // list selector
    // item selector
  }),[state])

  /* ---------------- exposed actions (wrapped for consumer) ---------------- */
  const actions = useMemo(
    () => ({
      getPostList:  (username)=> getPostList(username),
      createPost,
      reaction,
      savePost,
      unsavePost,
    }),
    [getPostList, createPost, reaction, savePost, unsavePost]
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
