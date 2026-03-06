import { useCallback, useRef } from "react";
import { useNotify } from "../../../../hooks/useNotify";
import { modal } from "../../../../constant/text/vi/modal";
import { postService } from "../../services/post.service";
import { postByIdActions } from "../../store/actions";

export function useSavePost(dispatch){
  const notify = useNotify()
  const pendingById = useRef(new Set())

  const savePost = useCallback(async (id) => {
    if (id == null) return null
    if (pendingById.current.has(id)) return null
    pendingById.current.add(id)

    dispatch(postByIdActions.setSaved(id, true))

    try {
      const res = await notify.withLoading(
        () => postService.savePost(id),
        (bool) => notify.snackbarLoading('Đang lưu bài viết...', bool)
      )
      if (!res?.success) {
        notify.popup(modal.title.error, res?.message)
        dispatch(postByIdActions.setSaved(id, false))
        return res
      }

      const saveNumber = res?.data?.saveNumber
      if (Number.isFinite(saveNumber)) {
        dispatch(postByIdActions.setSaved(id, true, saveNumber))
      }
      notify.snackbar(res.message, 3000)
      return res
    } finally {
      pendingById.current.delete(id)
    }
  }, [dispatch, notify])

  const unsavePost = useCallback(async (id) => {
    if (id == null) return null
    if (pendingById.current.has(id)) return null
    pendingById.current.add(id)

    dispatch(postByIdActions.setSaved(id, false))

    try {
      const res = await notify.withLoading(
        () => postService.unsavePost(id),
        (bool) => notify.snackbarLoading('Đang bỏ lưu bài viết...', bool)
      )
      if (!res?.success) {
        notify.popup(modal.title.error, res?.message)
        dispatch(postByIdActions.setSaved(id, true))
        return res
      }

      const saveNumber = res?.data?.saveNumber
      if (Number.isFinite(saveNumber)) {
        dispatch(postByIdActions.setSaved(id, false, saveNumber))
      }
      notify.snackbar(res.message, 3000)
      return res
    } finally {
      pendingById.current.delete(id)
    }
  }, [dispatch, notify])

  return{
    unsavePost,
    savePost
  }
}
