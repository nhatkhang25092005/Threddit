import { useCallback, useRef } from "react";
import { useNotify } from "../../../../hooks/useNotify";
import { modal } from "../../../../constant/text/vi/modal";
import { post } from "../../../../constant/text/vi/post/post";
import { postService } from "../../services";
import { postByIdActions } from "../../store/actions";
import { resolvePinnedStatus } from "../../utils/resolvePinnedStatus";
import useAuth from '../../../../core/auth/useAuth'
export function usePostPinActions(dispatch) {
  const notify = useNotify()
  const pendingRef = useRef(new Set())
  const {profileUsername} = useAuth()
  const handlePinAction = useCallback(async (id, shouldPin) => {
    if (id == null) return null
    if(pendingRef.current.has(id)) return
    
    try{
      pendingRef.current.add(id)

      const response = await notify.withLoading(
        () => (shouldPin ? postService.pinContent(id) : postService.unPinContent(id)),
        (isLoading) =>
          notify.snackbarLoading(
            shouldPin ? post.loading.pin : post.loading.unpin,
            isLoading
          )
      )

      if (!response?.success) {
        notify.popup(modal.title.error, response?.message)
        return response
      }

      const nextPinned = resolvePinnedStatus(response, shouldPin)
      dispatch(postByIdActions.setPinned(id, nextPinned, profileUsername))

      if (response?.message) notify.snackbar(response.message, 3000)

      return response
    }
    finally{
      pendingRef.current.delete(id)
    }
  }, [dispatch, notify, profileUsername])

  const pinPost = useCallback((id) => handlePinAction(id, true), [handlePinAction])
  const unpinPost = useCallback((id) => handlePinAction(id, false), [handlePinAction])

  return {
    pinPost,
    unpinPost,
  }
}
