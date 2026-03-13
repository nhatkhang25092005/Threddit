import { useCallback, useRef } from "react"
import { useNotify } from "../../../../hooks/useNotify"
import { modal } from "../../../../constant/text/vi/modal"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { storyService } from "../../services"
import { storyByIdModel } from "../../store/models/storyById.model"
import { storyActions, storyByIdActions } from "../../store/actions"
import { getStoryList } from "../../utils/getStoryList"
import { pinActions } from "../../store/actions"

function setStoryData(dispatch, username, pinnedStories){
  const stories = (Array.isArray(pinnedStories) ? pinnedStories : []).map(storyByIdModel)
  const storyIndexList = getStoryList(stories)

  dispatch(storyByIdActions.addStories(stories))
  dispatch(pinActions.setPinnedList(username, storyIndexList, 'story'))
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
      return r
    }

    setStoryData(dispatch, username, pinnedStories)
    return r
  }, [dispatch, notify, runRequest])

  return getPinnedStory
}
