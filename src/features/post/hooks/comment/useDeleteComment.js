import { useCallback, useRef } from "react"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { commentService } from "../../services"
import { commentActions, loadingAction, postByIdActions } from "../../store/actions"

const resolveRemovedCount = (response, fallbackCount = 1) => {
  const fallback = Math.max(1, Number(fallbackCount) || 1)
  const data = response?.data || {}

  if (Number.isFinite(data?.removedCount)) {
    return Math.max(1, Number(data.removedCount))
  }

  if (Number.isFinite(data?.deletedCount)) {
    return Math.max(1, Number(data.deletedCount))
  }

  if (Array.isArray(data?.removedCommentIds) && data.removedCommentIds.length > 0) {
    return data.removedCommentIds.length
  }

  if (Array.isArray(data?.deletedCommentIds) && data.deletedCommentIds.length > 0) {
    return data.deletedCommentIds.length
  }

  return fallback
}

export function useDeleteComment(dispatch) {
  const notify = useNotify()
  const pendingRef = useRef(new Set())

  const deleteComment = useCallback(async (postId, commentId, options = {}) => {
    if (commentId == null) return null
    if (pendingRef.current.has(commentId)) return null

    let removed = false
    pendingRef.current.add(commentId)
    dispatch(loadingAction.setContentDeleteLoading(commentId, true))

    try {
      const response = await notify.withLoading(
        () => commentService.deleteComment(commentId),
        (isLoading) => notify.snackbarLoading("Dang xoa binh luan...", isLoading)
      )

      if (!response?.success) {
        notify.popup(modal.title.error, response?.message)
        return response
      }

      const removedCount = resolveRemovedCount(response, options?.removedCount)
      dispatch(commentActions.removeComment(commentId))

      if (postId != null && removedCount > 0) {
        dispatch(postByIdActions.increaseCommentNumber(postId, -removedCount))
      }

      removed = true

      if (response?.message) {
        notify.snackbar(response.message, 3000)
      }

      return {
        ...response,
        data: {
          ...(response?.data || {}),
          removedCount,
        },
      }
    }
    finally {
      if (!removed) {
        dispatch(loadingAction.setContentDeleteLoading(commentId, false))
      }
      pendingRef.current.delete(commentId)
    }
  }, [dispatch, notify])

  return deleteComment
}
