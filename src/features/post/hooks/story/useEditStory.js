import { useCallback, useRef } from "react"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { storageService, storyService } from "../../services"
import { loadingAction, storyByIdActions } from "../../store/actions"
import {
  buildEditedContentPatch,
  buildEditedContentPayload,
  getNewEditableMediaList,
  normalizeEditableMediaList,
} from "../../utils/resolveEditedContent"

export function useEditStory(dispatch){
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const pendingRef = useRef(false)

  const editStory = useCallback(async (data = {}, onCloseModal) => {
    const contentId = data?.contentId
    if (contentId == null) return null
    if (pendingRef.current) return null

    const mediaList = normalizeEditableMediaList(data?.media)
    if (mediaList.length > 1) {
      notify.popup(modal.title.error, "Story supports at most 1 media file")
      return null
    }

    pendingRef.current = true
    dispatch(loadingAction.setEditStoryLoading(true))

    try {
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
        type: "story",
        data,
        mediaList,
        presignedMediaUrls,
        uploadSessionId,
      })

      if (hasMissingMediaKey) {
        notify.popup(modal.title.error, "Could not resolve mediaKey for updated media")
        return null
      }

      const response = await runRequest(() => storyService.editStory(contentId, payload))
      if (!response) return null

      if (!response.success) {
        notify.popup(modal.title.error, response.message)
        return response
      }

      const patch = buildEditedContentPatch({
        type: "story",
        responseData: response.data,
        data,
        mediaList,
      })

      dispatch(storyByIdActions.updateStory(contentId, patch))
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
      dispatch(loadingAction.setEditStoryLoading(false))
      pendingRef.current = false
    }
  }, [dispatch, notify, runRequest])

  return editStory
}
