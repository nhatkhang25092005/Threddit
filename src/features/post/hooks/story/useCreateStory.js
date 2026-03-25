import { useCallback, useRef } from "react"
import { errorText } from "../../../../constant/text/vi/error.text"
import useAuth from "../../../../core/auth/useAuth"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { modal } from "../../../../constant/text/vi/modal"
import { storageService, storyService } from "../../services"
import { loadingAction, storyActions, storyByIdActions } from "../../store/actions"
import { storyByIdModel } from "../../store/models/storyById.model"
import {resolveCreatedPostRaw} from '../../utils/resolveCreatedPostRaw'

const buildCreatePayload = (data = {}, uploadSessionId = null) => ({
  mentionedUsers: Array.isArray(data?.mentionedUsers) ? data.mentionedUsers : [],
  type: "story",
  text: data?.text ?? "",
  ...(uploadSessionId ? { uploadSessionId } : {}),
})

const normalizeMediaList = (media = []) => (
  (Array.isArray(media) ? media : [])
    .filter((item) => item?.file)
)

export function useCreateStory(dispatch) {
  const { user } = useAuth()
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const pendingRef = useRef(false)

  const createStory = useCallback(async (data = {}, onCloseModal) => {
    if (pendingRef.current) return null
    pendingRef.current = true
    dispatch(loadingAction.setCreateStoryLoading(true))
    try{
      const username = data?.username || user?.username || null
      const mediaList = normalizeMediaList(data?.media)

      let uploadSessionId = null

      if (mediaList.length > 0) {
        const uploadResult = await storageService.uploadMediaAndGetSessionId(mediaList)

        if (!uploadResult?.success){
          notify.popup(modal.title.error, uploadResult?.message || errorText.upload.media)
        }
        uploadSessionId = uploadResult.uploadSessionId
      }

      const payload = buildCreatePayload(data, uploadSessionId)
      const response = await runRequest(()=>storyService.createStory(payload))
      if (!response) return null

      if (!response.success) {
        notify.popup(modal.title.error, response.message)
        return
      }

      const createdRaw = resolveCreatedPostRaw(response.data, payload, user)
      if (createdRaw) {
        const createdStory = storyByIdModel(createdRaw)
        dispatch(storyByIdActions.addStory(createdStory))
        dispatch(storyActions.addCurrentStoryIndex(username, [response.data.createdPost.id]))
        if (createdStory?.id != null) {
          dispatch(storyActions.prependStoryIndex(username, createdStory.id))
        }
      }

      onCloseModal?.()

      if (response.message) {
        notify.snackbar(response.message, 3000)
      }
    }
    catch(e){
      dispatch(loadingAction.setCreateStoryLoading(false))
      console.error(e)
    }
    finally{
      dispatch(loadingAction.setCreateStoryLoading(false))
      pendingRef.current = false
    }
    
  }, [dispatch, notify, runRequest, user])

  return createStory
}
