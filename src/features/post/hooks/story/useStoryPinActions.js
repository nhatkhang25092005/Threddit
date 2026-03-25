import { useCallback, useRef } from "react";
import { useNotify } from "../../../../hooks/useNotify";
import { modal } from "../../../../constant/text/vi/modal";
import { story } from "../../../../constant/text/vi/story";
import { postService } from "../../services";
import { storyActions, storyByIdActions } from "../../store/actions";
import { resolvePinnedStatus } from "../../utils/resolvePinnedStatus";
import useAuth from '../../../../core/auth/useAuth'
export function useStoryPinActions(dispatch) {
  const notify = useNotify()
  const pendingRef = useRef(new Set())
  const {profileUsername} = useAuth()
  const handlePinAction = useCallback(async (id, shouldPin, username = profileUsername) => {
    if (id == null) return null
    if(pendingRef.current.has(id)) return
    
    try{
      pendingRef.current.add(id)

      const response = await notify.withLoading(
        () => (shouldPin ? postService.pinContent(id) : postService.unPinContent(id)),
        (isLoading) =>
          notify.snackbarLoading(
            shouldPin ? story.loading.pin : story.loading.unpin,
            isLoading
          )
      )

      if (!response?.success) {
        notify.popup(modal.title.error, response?.message)
        return response
      }

      const nextPinned = resolvePinnedStatus(response, shouldPin)
      dispatch(storyByIdActions.setPinned(id, nextPinned))
      dispatch(storyActions.setPinnedStory(username, id, nextPinned))

      if (response?.message) notify.snackbar(response.message, 3000)

      return response
    }
    finally{
      pendingRef.current.delete(id)
    }
  }, [dispatch, notify, profileUsername])

  const pinStory = useCallback((id, username) => handlePinAction(id, true, username), [handlePinAction])
  const unpinStory = useCallback((id, username) => handlePinAction(id, false, username), [handlePinAction])

  return {
    pinStory,
    unpinStory,
  }
}
