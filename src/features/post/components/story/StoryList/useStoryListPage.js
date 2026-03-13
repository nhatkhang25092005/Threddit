import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { usePostContext } from '../../../hooks'
import useAuth from '../../../../../core/auth/useAuth'
import { buildProfileRoute, buildStoryRoute } from '../storyRoute'
import { getStoryPageMeta, getStorySource } from './storyList.utils'

export function useStoryListPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { source, username: routeUsername, storyId } = useParams()
  const { user } = useAuth()
  const { actions, selector } = usePostContext()
  const { getCurrentStory, getPinnedStory } = actions
  const storySource = getStorySource(source)
  const username = routeUsername || user?.username || null
  const [isFetching, setIsFetching] = useState(true)

  const storyList = storySource === 'pinned'
    ? selector.story.getPinnedStoryListOf(username)
    : selector.story.getCurrentStoryListOf(username)

  const activeIndexFromRoute = storyList.findIndex((item) => String(item?.id) === String(storyId))
  const activeIndex = activeIndexFromRoute >= 0 ? activeIndexFromRoute : 0
  const activeStory = storyList[activeIndex] || null
  const pageMeta = useMemo(() => getStoryPageMeta(storySource), [storySource])
  const backgroundLocation = location.state?.backgroundLocation?.pathname
    ? location.state.backgroundLocation
    : null

  useEffect(() => {
    let mounted = true

    async function fetchStories() {
      if (!username) {
        if (mounted) setIsFetching(false)
        return
      }

      setIsFetching(true)

      if (storySource === 'pinned') {
        await getPinnedStory(username, { refresh: true })
      }
      else {
        await getCurrentStory(username)
      }

      if (mounted) {
        setIsFetching(false)
      }
    }

    fetchStories()

    return () => {
      mounted = false
    }
  }, [getCurrentStory, getPinnedStory, storySource, username])

  useEffect(() => {
    if (!username || storyList.length === 0) return

    if (!storyId || activeIndexFromRoute === -1) {
      navigate(buildStoryRoute(storySource, username, storyList[0]?.id), {
        replace: true,
        state: location.state,
      })
    }
  }, [activeIndexFromRoute, location.state, navigate, storyId, storyList, storySource, username])

  useEffect(() => {
    function handleKeyDown(event) {
      if (!activeStory) return

      if (event.key === 'Escape') {
        if (backgroundLocation) {
          navigate(-1)
          return
        }

        navigate(buildProfileRoute(username))
      }

      if (event.key === 'ArrowLeft' && activeIndex > 0) {
        navigate(buildStoryRoute(storySource, username, storyList[activeIndex - 1]?.id), {
          replace: true,
          state: location.state,
        })
      }

      if (event.key === 'ArrowRight') {
        const nextStory = storyList[activeIndex + 1]

        if (nextStory) {
          navigate(buildStoryRoute(storySource, username, nextStory.id), {
            replace: true,
            state: location.state,
          })
        }
        else {
          if (backgroundLocation) {
            navigate(-1)
            return
          }

          navigate(buildProfileRoute(username))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, activeStory, backgroundLocation, location.state, navigate, storyList, storySource, username])

  const handleClose = useCallback(() => {
    if (backgroundLocation) {
      navigate(-1)
      return
    }

    navigate(buildProfileRoute(username))
  }, [backgroundLocation, navigate, username])

  const goToIndex = useCallback((nextIndex) => {
    const nextStory = storyList[nextIndex]

    if (!nextStory || !username) return

    navigate(buildStoryRoute(storySource, username, nextStory.id), {
      replace: true,
      state: location.state,
    })
  }, [location.state, navigate, storyList, storySource, username])

  const handlePrev = useCallback(() => {
    if (activeIndex <= 0) return
    goToIndex(activeIndex - 1)
  }, [activeIndex, goToIndex])

  const handleNext = useCallback(() => {
    if (activeIndex < storyList.length - 1) {
      goToIndex(activeIndex + 1)
      return
    }

    handleClose()
  }, [activeIndex, goToIndex, handleClose, storyList.length])

  return {
    activeIndex,
    activeStory,
    handleClose,
    handleNext,
    handlePrev,
    isFetching,
    pageMeta,
    storyList,
    username,
    goToIndex,
  }
}
