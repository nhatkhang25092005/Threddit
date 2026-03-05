import { useCallback, useRef } from "react"
import { useNotify } from "../../../../hooks/useNotify"
import { modal } from "../../../../constant/text/vi/modal"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { storyService } from "../../services"
import { postByIdModel } from "../../store/models/postById.model"
import { postByIdActions, storyActions } from "../../store/actions"
import { getPostList } from "../../utils/getPostList"

function setStoryData(dispatch, username, pinnedStories, shouldReplace = false){
  const stories = Array.isArray(pinnedStories) ? pinnedStories : []
  const posts = stories.map(postByIdModel)
  const storyIndexList = getPostList(posts)

  dispatch(postByIdActions.addPosts(posts))
  if (shouldReplace) {
    dispatch(storyActions.setStoryList(username, storyIndexList))
    return
  }
  dispatch(storyActions.addStoryIndex(username, storyIndexList))
}

export function useGetPinnedStory(dispatch) {
  const notify = useNotify()
  const cursorRef = useRef({})
  const hasMoreRef = useRef({})
  const runRequest = useSafeRequest()

  const getPinnedStory = useCallback(async (username = null, options = {}) => {
    const key = username || "pinned_story"
    const refresh = options?.refresh === true
    const isFirstPage = cursorRef.current[key] == null
    const shouldReplace = refresh || isFirstPage

    if (refresh) {
      cursorRef.current[key] = undefined
      hasMoreRef.current[key] = true
      dispatch(storyActions.clearStoryList(username))
    }

    if (hasMoreRef.current[key] === false) return

    const r = await runRequest(
      (signal) => storyService.getPinnedStory(username, signal, cursorRef.current[key])
    )
    if (!r) return

    if (!r.success) {
      notify.popup(modal.title.error, r.message)
      return r
    }

    const data = r.data || {}
    const pinnedStories = Array.isArray(data.pinnedStories) ? data.pinnedStories : []
    cursorRef.current[key] = data.cursor

    if (pinnedStories.length === 0) {
      hasMoreRef.current[key] = false
      if (shouldReplace) dispatch(storyActions.setStoryList(username, []))
      return r
    }

    setStoryData(dispatch, username, pinnedStories, shouldReplace)
    return r
  }, [dispatch, notify, runRequest])

  return getPinnedStory
}
