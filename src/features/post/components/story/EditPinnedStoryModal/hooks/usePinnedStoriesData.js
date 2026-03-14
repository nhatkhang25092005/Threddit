import { useCallback, useEffect, useRef, useState } from 'react'
import useAuth from '../../../../../../core/auth/useAuth'
import { usePostContext } from '../../../../hooks'

export function usePinnedStoriesData() {
  const { profileUsername } = useAuth()
  const { actions, selector } = usePostContext()
  const pinnedStories = selector.story.getPinnedStoryListOf(profileUsername)
  const { getPinnedStory, unpinStory } = actions
  const hasRequestedRef = useRef(false)
  const [isLoading, setIsLoading] = useState(pinnedStories.length === 0)
  const [removingStoryIds, setRemovingStoryIds] = useState({})

  useEffect(() => {
    hasRequestedRef.current = false
    setRemovingStoryIds({})
  }, [profileUsername])

  useEffect(() => {
    let isMounted = true

    if (!profileUsername) {
      setIsLoading(false)
      return undefined
    }

    if (pinnedStories.length > 0 || hasRequestedRef.current) {
      setIsLoading(false)
      return undefined
    }

    hasRequestedRef.current = true
    setIsLoading(true)

    ;(async () => {
      try {
        await getPinnedStory(profileUsername)
      }
      finally {
        if (isMounted) setIsLoading(false)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [getPinnedStory, pinnedStories.length, profileUsername])

  const unpinPinnedStory = useCallback(async (story) => {
    if (!story?.id) return

    setRemovingStoryIds((current) => ({
      ...current,
      [story.id]: true,
    }))

    try {
      await unpinStory(story.id, profileUsername || story?.author?.username)
    }
    finally {
      setRemovingStoryIds((current) => {
        const nextState = { ...current }
        delete nextState[story.id]
        return nextState
      })
    }
  }, [profileUsername, unpinStory])

  return {
    isLoading,
    pinnedStories,
    removingStoryIds,
    unpinPinnedStory,
  }
}
