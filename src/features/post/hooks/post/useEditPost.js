import { useCallback, useRef } from "react"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { postService } from "../../services"
import { loadingAction, postByIdActions } from "../../store/actions"

export function useEditPost(dispatch){
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const pendingRef = useRef(false)

  const editPost = useCallback(async (data = {}, onCloseModal) => {
    const contentId = data?.contentId
    if (contentId == null) return null
    if (pendingRef.current) return null

    pendingRef.current = true
    dispatch(loadingAction.setEditPostLoading(true))

    try {
      const response = await runRequest(() => postService.editPost(contentId, data))

      if (!response.success) {
        notify.popup(modal.title.error, response.message)
        if(response.errorSource === "BUILD_PAYLOAD") return null
        else return response
      }

      dispatch(postByIdActions.updatePost(contentId, response.patch))
      onCloseModal?.()

      if (response.message) {
        notify.snackbar(response.message, 3000)
      }

      return response
    }
    catch (error) {
      console.error(error)
      return null
    }
    finally {
      dispatch(loadingAction.setEditPostLoading(false))
      pendingRef.current = false
    }
  }, [dispatch, notify, runRequest])

  return editPost
}
