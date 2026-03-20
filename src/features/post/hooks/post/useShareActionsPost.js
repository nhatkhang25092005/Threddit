import { useCallback, useRef } from "react"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { postService } from "../../services"
import { loadingAction, postByIdActions, userPostActions } from "../../store/actions"
import { resolveIsSharePost } from "../../utils/resolveIsSharePost"
import useAuth from '../../../../core/auth/useAuth'
const resolvePayloadShareMessage = (payload = {}) => (
  payload?.message ?? null
)

export function useShareActionsPost(dispatch, postById = {}) {
  const notify = useNotify()
  const pendingRef = useRef(new Set())
  const postByIdRef = useRef(postById)
  postByIdRef.current = postById
  const {profileUsername} = useAuth()

  const toggleSharePost = useCallback(async (id, isShare = false, payload = {}) => {
    if (id == null) return null
    if (pendingRef.current.has(id)) return null

    const shouldUnshare = Boolean(isShare)
    const nextIsShare = !shouldUnshare

    pendingRef.current.add(id)
    dispatch(loadingAction.setPostShareLoading(id, true))
    dispatch(postByIdActions.setShared(id, nextIsShare))

    try {
      const response = await notify.withLoading(
        () => (
          shouldUnshare
            ? postService.unsharePost(id)
            : postService.sharePost(id, payload)
        ),
        (loading) => notify.snackbarLoading(
          shouldUnshare
            ? "Đang hủy chia sẻ bài viết..."
            : "Đang chia sẻ bài viết...",
          loading
        )
      )

      if (!response?.success) {
        notify.popup(modal.title.error, response?.message)
        dispatch(postByIdActions.setShared(id, shouldUnshare))
        return response
      }

      const currentPost = postByIdRef.current?.[id]
      const shouldRemoveSharedPost =
        shouldUnshare &&
        resolveIsSharePost(currentPost)

      if (shouldRemoveSharedPost) {
        dispatch(userPostActions.removeUserPostIndex(profileUsername, id))
        if (response?.message) {
          notify.snackbar(response.message, 3000)
        }

        return response
      }

      dispatch(
        postByIdActions.setShared(
          id,
          nextIsShare,
          shouldUnshare ? null : resolvePayloadShareMessage(payload)
        )
      )

      dispatch(userPostActions.prependTimelineIndex(profileUsername, id))

      if (response?.message) {
        notify.snackbar(response.message, 3000)
      }

      return response
    } finally {
      dispatch(loadingAction.setPostShareLoading(id, false))
      pendingRef.current.delete(id)
    }
  }, [dispatch, notify, profileUsername])

  const sharePost = useCallback(
    (id, payload = {}) => toggleSharePost(id, false, payload),
    [toggleSharePost]
  )

  const unsharePost = useCallback(
    (id) => toggleSharePost(id, true),
    [toggleSharePost]
  )

  return {
    sharePost,
    unsharePost,
    toggleSharePost
  }
}
