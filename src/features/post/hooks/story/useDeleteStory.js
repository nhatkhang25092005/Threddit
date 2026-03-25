import { useCallback, useRef } from "react"
import { modal } from "../../../../constant/text/vi/modal"
import { story } from "../../../../constant/text/vi/story"
import { useNotify } from "../../../../hooks/useNotify"
import { storyService } from "../../services"
import { loadingAction, storyByIdActions } from "../../store/actions"

export function useDeleteStory(dispatch){
  const notify = useNotify()
  const pendingRef = useRef(new Set())

  const deleteStory = useCallback(async (id) => {
    if (id == null) return null
    if (pendingRef.current.has(id)) return null

    let removed = false
    pendingRef.current.add(id)
    dispatch(loadingAction.setContentDeleteLoading(id, true))

    try {
      const response = await notify.withLoading(
        () => storyService.deleteStory(id),
        (isLoading) => notify.snackbarLoading(story.loading.delete, isLoading)
      )

      if (!response?.success) {
        notify.popup(modal.title.error, response?.message)
        return response
      }

      dispatch(storyByIdActions.removeStory(id))
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

  return deleteStory
}
