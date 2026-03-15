import { useCallback, useRef } from "react"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { postService, storageService } from "../../services"
import { loadingAction, postByIdActions } from "../../store/actions"
import {
  buildEditedContentPatch,
  buildEditedContentPayload,
  getNewEditableMediaList,
  normalizeEditableMediaList,
} from "../../utils/resolveEditedContent"

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
      const mediaList = normalizeEditableMediaList(data?.media)
      const newMediaList = getNewEditableMediaList(mediaList)
      let uploadSessionId = null
      let presignedMediaUrls = []

      if (newMediaList.length > 0) {
        const uploadResult = await storageService.uploadUpdatedMediaAndGetSessionId(contentId, newMediaList)
        if (!uploadResult?.success) {
          notify.popup(modal.title.error, uploadResult?.message || "Could not upload media")
          return uploadResult
        }

        uploadSessionId = uploadResult.uploadSessionId
        presignedMediaUrls = uploadResult.presignedMediaUrls || []
      }

      const { hasMissingMediaKey, payload } = buildEditedContentPayload({
        type: "post",
        data,
        mediaList,
        presignedMediaUrls,
        uploadSessionId,
      })

      if (hasMissingMediaKey) {
        notify.popup(modal.title.error, "Could not resolve mediaKey for updated media")
        return null
      }

      const response = await runRequest(() => postService.editPost(contentId, payload))
      if (!response) return null

      if (!response.success) {
        notify.popup(modal.title.error, response.message)
        return response
      }

      const patch = buildEditedContentPatch({
        type: "post",
        responseData: response.data,
        data,
        mediaList,
      })

      dispatch(postByIdActions.updatePost(contentId, patch))
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
