import { useCallback, useRef } from "react";
import { useNotify } from "../../../../hooks/useNotify";
import { modal } from "../../../../constant/text/vi/modal";
import { postService } from "../../services";
import { postByIdActions } from "../../store/actions";
import { resolvePinnedStatus } from "../../utils/resolvePinnedStatus";

export function usePostPinActions(dispatch) {
  const notify = useNotify()
  const pendingRef = useRef(new Set())

  const handlePinAction = useCallback(async (id, shouldPin) => {
    if (id == null) return null
    if(pendingRef.current.has(id)) return
    
    try{
      pendingRef.current.add(id)

      const response = await notify.withLoading(
        () => (shouldPin ? postService.pinPost(id) : postService.unPinPost(id)),
        (isLoading) =>
          notify.snackbarLoading(
            shouldPin ? 'Đang ghim bài viết...' : 'Đang gỡ ghim bài viết...',
            isLoading
          )
      )

      if (!response?.success) {
        notify.popup(modal.title.error, response?.message)
        return response
      }

      const nextPinned = resolvePinnedStatus(response, shouldPin)
      dispatch(postByIdActions.setPinned(id, nextPinned))

      if (response?.message) notify.snackbar(response.message, 3000)

      return response
    }
    finally{
      pendingRef.current.delete(id)
    }
  }, [dispatch, notify])

  const pinPost = useCallback((id) => handlePinAction(id, true), [handlePinAction])
  const unpinPost = useCallback((id) => handlePinAction(id, false), [handlePinAction])

  return {
    pinPost,
    unpinPost,
  }
}
