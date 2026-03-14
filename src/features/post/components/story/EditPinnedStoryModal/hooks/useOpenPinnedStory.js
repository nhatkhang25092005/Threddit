import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../../../../../core/auth/useAuth'
import { usePostModal } from '../../../../provider/usePostModal'
import { buildStoryRoute } from '../../storyRoute'

export function useOpenPinnedStory() {
  const { closeModal } = usePostModal()
  const { profileUsername } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  return useCallback((story) => {
    if (!story?.id) return

    closeModal()
    navigate(
      buildStoryRoute('pinned', profileUsername || story?.author?.username, story.id),
      { state: { backgroundLocation: location } }
    )
  }, [closeModal, location, navigate, profileUsername])
}
