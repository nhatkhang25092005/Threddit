import { useCallback, useRef } from "react"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { postService } from "../../services"
import { loadingAction, postByIdActions } from "../../store/actions"

export function useDeletePost(dispatch){
  const notify = useNotify()
  const pendingRef = useRef(new Set())

  const deletePost = useCallback(async (id) => {
    if (id == null) return null
    if (pendingRef.current.has(id)) return null

    let removed = false
    pendingRef.current.add(id)
    dispatch(loadingAction.setContentDeleteLoading(id, true))

    try {
      const response = await notify.withLoading(
        () => postService.deletePost(id),
        (isLoading) => notify.snackbarLoading('Đang xóa bài viết...', isLoading)
      )

      if (!response?.success) {
        notify.popup(modal.title.error, response?.message)
        return response
      }

      dispatch(postByIdActions.removePost(id))
      removed = true

      if (response?.message) {
        notify.snackbar(response.message, 3000)
      }

      return response
    }
    finally {
      if (!removed) {
        dispatch(loadingAction.setContentDeleteLoading(id, false))
      }
      pendingRef.current.delete(id)
    }
  }, [dispatch, notify])

  return deletePost
}
