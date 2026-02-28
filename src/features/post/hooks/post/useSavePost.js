import { useCallback, useRef } from "react";
import { useNotify } from "../../../../hooks/useNotify";
import { modal } from "../../../../constant/text/vi/modal";
import { postService } from "../../services/post.service";
import { loadingAction, postByIdActions } from "../../store/actions";

export function useSavePost(dispatch){
  const notify = useNotify()
  const pendingById = useRef(new Set())

  const savePost = useCallback(async (contentId) => {
    if (contentId == null) return null
    if (pendingById.current.has(contentId)) return null
    pendingById.current.add(contentId)

    dispatch(loadingAction.setPostSaveLoading(contentId, true))
    dispatch(postByIdActions.setSaved(contentId, true))

    try {
      const res = await postService.savePost(contentId)
      if (!res?.success) {
        notify.popup(modal.title.error, res?.message)
        dispatch(postByIdActions.setSaved(contentId, false))
        return res
      }

      const saveNumber = res?.data?.saveNumber
      if (Number.isFinite(saveNumber)) {
        dispatch(postByIdActions.setSaved(contentId, true, saveNumber))
      }
      notify.snackbar(res.message, 3000)
      return res
    } finally {
      dispatch(loadingAction.setPostSaveLoading(contentId, false))
      pendingById.current.delete(contentId)
    }
  }, [dispatch, notify])

  const unsavePost = useCallback(async (contentId) => {
    if (contentId == null) return null
    if (pendingById.current.has(contentId)) return null
    pendingById.current.add(contentId)

    dispatch(loadingAction.setPostSaveLoading(contentId, true))
    dispatch(postByIdActions.setSaved(contentId, false))

    try {
      const res = await postService.unsavePost(contentId)
      if (!res?.success) {
        notify.popup(modal.title.error, res?.message)
        dispatch(postByIdActions.setSaved(contentId, true))
        return res
      }

      const saveNumber = res?.data?.saveNumber
      if (Number.isFinite(saveNumber)) {
        dispatch(postByIdActions.setSaved(contentId, false, saveNumber))
      }
      notify.snackbar(res.message, 3000)
      return res
    } finally {
      dispatch(loadingAction.setPostSaveLoading(contentId, false))
      pendingById.current.delete(contentId)
    }
  }, [dispatch, notify])

  return{
    unsavePost,
    savePost
  }
}
