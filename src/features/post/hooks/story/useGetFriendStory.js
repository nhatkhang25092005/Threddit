import { useCallback, useRef } from "react"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { storyService } from "../../services"
import { storyActions, storyByIdActions } from "../../store/actions"
import { storyByIdModel } from "../../store/models/storyById.model"

function getFriendStories(data) {
  if (Array.isArray(data?.stories)) return data.stories
  if (Array.isArray(data?.friendStories)) return data.friendStories
  return []
}

function buildFriendStoryMap(stories = []) {
  return stories.reduce((accumulator, story) => {
    const username = story?.author?.username

    if (!username || story?.id == null) return accumulator

    if (!Array.isArray(accumulator[username])) {
      accumulator[username] = []
    }

    accumulator[username].push(story.id)
    return accumulator
  }, {})
}

function setFriendStoryData(dispatch, rawStories = []) {
  const stories = (Array.isArray(rawStories) ? rawStories : []).map(storyByIdModel)
  const friendStoryMap = buildFriendStoryMap(stories)

  dispatch(storyByIdActions.addStories(stories))
  dispatch(storyActions.addFriendStoryIndex(friendStoryMap))

  return friendStoryMap
}

export function useGetFriendStory(dispatch){
  const notify = useNotify()
  const cursorRef = useRef(undefined)
  const hasMoreRef = useRef(true)
  const runRequest = useSafeRequest()

  const getFriendStory = useCallback(async (options = {}) => {
    const refresh = options?.refresh === true

    if (refresh) {
      cursorRef.current = undefined
      hasMoreRef.current = true
      dispatch(storyActions.clearFriendStoryList())
    }

    if (hasMoreRef.current === false) return null

    const response = await runRequest(
      (signal) => storyService.getFriendStoryList(cursorRef.current, signal)
    )

    if (!response) return null

    if (!response.success) {
      notify.popup(modal.title.error, response.message)
      return response
    }

    const friendStories = getFriendStories(response.data)
    cursorRef.current = response.data?.cursor

    if (friendStories.length === 0) {
      hasMoreRef.current = false
      return response
    }

    setFriendStoryData(dispatch, friendStories)
    return response
  }, [dispatch, notify, runRequest])

  return getFriendStory
}
