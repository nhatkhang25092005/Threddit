import { useNotify } from '../../../../hooks/useNotify'
import { useRef, useCallback } from 'react'
import { storyService } from '../../services'
import { modal } from '../../../../constant/text/vi/modal'
import { storyActions, storyByIdActions } from '../../store/actions'
import { useSafeRequest } from '../../../../hooks/useSafeRequest'
import { storyByIdModel } from '../../store/models/storyById.model'
import { getStoryList } from '../../utils/getStoryList'
import useAuth from '../../../../core/auth/useAuth'

function getCurrentStories(data) {
  if (Array.isArray(data?.currentStories)) return data.currentStories
  if (Array.isArray(data?.storyItems)) return data.storyItems
  if (Array.isArray(data?.stories)) return data.stories
  return []
}

function setData(dispatch, data, storyKey) {
  const stories = getCurrentStories(data).map(storyByIdModel)
  const storyIndexList = getStoryList(stories)
  dispatch(storyByIdActions.addStories(stories))
  dispatch(storyActions.addStoryIndex(storyKey, storyIndexList))
  dispatch(storyActions.addCurrentStoryIndex(storyKey, storyIndexList))
}

export function useGetCurrentStory(dispatch) {
  const notify = useNotify()
  const cursor = useRef({})
  const hasMoreRef = useRef({})
  const runRequest = useSafeRequest()
  const {profileUsername} = useAuth()

  const getCurrentStory = useCallback(async (username = profileUsername) => {
    const key = username

    if (hasMoreRef.current?.[key] === false) return

    const r = await runRequest(
      (signal) => storyService.getCurrentStory(username, signal, cursor.current[key])
    )

    if (!r) return

    if (r.success) {
      const currentStories = getCurrentStories(r.data)

      if (currentStories.length === 0) {
        hasMoreRef.current[key] = false
        return r
      }
      cursor.current[key] = r.data?.cursor

      setData(dispatch, { ...r.data, currentStories }, key)
      return r
    }

    notify.popup(modal.title.error, r.message)
    return r
  }, [dispatch, notify, runRequest, profileUsername])

  return getCurrentStory
}
