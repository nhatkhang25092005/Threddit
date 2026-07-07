import { useCallback, useRef } from "react"
import useAuth from "../../../../core/auth/useAuth"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { modal } from "../../../../constant/text/vi/modal"
import { postService,} from "../../services"
import { loadingAction, postByIdActions, userPostActions } from "../../store/actions"
import { postByIdModel } from "../../store/models/postById.model"
import {resolveCreatedPostRaw} from '../../utils/resolveCreatedPostRaw'

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
      // create new post (include handle media uploading)
      const response = await runRequest(()=>postService.createPost(data))
      if (!response) return null

      if (!response.success) {
        notify.popup(modal.title.error, response.message)
        return null
      }

      const createdRaw = resolveCreatedPostRaw(response.data, data, user)
      if (createdRaw) {
        const createdPost = postByIdModel(createdRaw)
        dispatch(postByIdActions.addPost(createdPost))
        if (username && createdPost?.id != null) {
          dispatch(userPostActions.prependTimelineIndex(username, createdPost.id))
        }
      }

      notify.snackbar(response.message, 3000)

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
