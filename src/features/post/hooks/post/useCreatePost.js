import { useCallback, useRef } from "react"
import { errorText } from "../../../../constant/text/vi/error.text"
import useAuth from "../../../../core/auth/useAuth"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { modal } from "../../../../constant/text/vi/modal"
import { postService, storageService } from "../../services"
import { loadingAction, postByIdActions, userPostActions } from "../../store/actions"
import { postByIdModel } from "../../store/models/postById.model"
import {resolveCreatedPostRaw} from '../../utils/resolveCreatedPostRaw'

const buildCreatePayload = (data = {}, uploadSessionId = null) => ({
  mentionedUsers: Array.isArray(data?.mentionedUsers) ? data.mentionedUsers : [],
  type: "post",
  text: data?.text ?? "",
  ...(uploadSessionId ? { uploadSessionId } : {}),
})

const normalizeMediaList = (media = []) => (
  (Array.isArray(media) ? media : [])
    .filter((item) => item?.file)
)

export function useCreatePost(dispatch) {
  const { user } = useAuth()
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const pendingRef = useRef(false)

  const createPost = useCallback(async (data = {}, onCloseModal) => {
    if (pendingRef.current) return null
    pendingRef.current = true
    dispatch(loadingAction.setCreatePostLoading(true))
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
      const response = await runRequest(()=>postService.createPost(payload))
      if (!response) return null

      if (!response.success) {
        notify.popup(modal.title.error, response.message)
      }

      const createdRaw = resolveCreatedPostRaw(response.data, payload, user)
      if (createdRaw) {
        const createdPost = postByIdModel(createdRaw)
        dispatch(postByIdActions.addPost(createdPost))
        if (username && createdPost?.id != null) {
          dispatch(userPostActions.prependTimelineIndex(username, createdPost.id))
        }
      }

      onCloseModal?.()
    }
    catch(e){
      dispatch(loadingAction.setCreatePostLoading(false))
      console.error(e)
    }
    finally{
      dispatch(loadingAction.setCreatePostLoading(false))
      pendingRef.current = false
    }
    
  }, [dispatch, notify, runRequest, user])

  return createPost
}
