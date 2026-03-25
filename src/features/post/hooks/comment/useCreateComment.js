import { useCallback, useRef } from "react"
import { errorText } from "../../../../constant/text/vi/error.text"
import useAuth from "../../../../core/auth/useAuth"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { commentService, storageService } from "../../services"
import { commentActions, loadingAction, postByIdActions } from "../../store/actions"
import { commentModel } from "../../store/models/comment.model"

const normalizeMediaList = (media = []) => (
  (Array.isArray(media) ? media : [])
    .filter((item) => item?.file)
    .slice(0, 1)
)

const buildCreatePayload = (data = {}, uploadSessionId = null) => {
  const payload = {}
  const text = String(data?.text ?? "").trim()
  const mentionedUsers = Array.isArray(data?.mentionedUsers)
    ? data.mentionedUsers.filter(Boolean)
    : []

  if (text) payload.text = text
  if (mentionedUsers.length > 0) payload.mentionedUsers = mentionedUsers
  if (uploadSessionId) payload.uploadSessionId = uploadSessionId
  if (data?.parentCommentId != null) payload.parentCommentId = data.parentCommentId

  return payload
}

const resolveCreatedCommentRaw = (responseData = {}, payload = {}, user = null) => {
  const now = new Date().toISOString()
  const fallbackId = `local-created-comment-${Date.now()}`
  const candidate =
    responseData?.createdComment ||
    responseData?.comment ||
    responseData?.item ||
    responseData

  const base = (candidate && typeof candidate === "object" && !Array.isArray(candidate))
    ? candidate
    : {}

  return {
    id: base?.id ?? base?.commentId ?? base?.contentId ?? fallbackId,
    text: base?.text ?? payload?.text ?? "",
    createdAt: base?.createdAt || now,
    updatedAt: base?.updatedAt || base?.createdAt || now,
    commenter: base?.commenter || {
      username: user?.username || null,
      displayName: user?.displayName || null,
      avatarUrl: user?.avatarUrl || null,
    },
    isCommenter: base?.isCommenter ?? true,
    parentCommentId: base?.parentCommentId ?? payload?.parentCommentId ?? null,
    hasChildComment: Boolean(base?.hasChildComment),
    reaction: base?.reaction || null,
    mediaFiles: Array.isArray(base?.mediaFiles) ? base.mediaFiles : [],
    mentionedUsers: Array.isArray(base?.mentionedUsers)
      ? base.mentionedUsers
      : (Array.isArray(payload?.mentionedUsers) ? payload.mentionedUsers : []),
  }
}

export function useCreateComment(dispatch) {
  const { user } = useAuth()
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const pendingRef = useRef(false)

  const createComment = useCallback(async (postId, data = {}) => {
    if (postId == null) return null
    if (pendingRef.current) return null

    pendingRef.current = true
    dispatch(loadingAction.setCommentLoading(postId, true))

    try {
      const mediaList = normalizeMediaList(data?.media)
      const externalUploadSessionId = data?.uploadSessionId || null
      let uploadSessionId = externalUploadSessionId

      if (!uploadSessionId && mediaList.length > 0) {
        const uploadResult = await storageService.uploadMediaAndGetSessionId(mediaList)

        if (!uploadResult?.success) {
          notify.popup(modal.title.error, uploadResult?.message || errorText.upload.file)
          return uploadResult
        }

        uploadSessionId = uploadResult.uploadSessionId
      }

      const payload = buildCreatePayload(data, uploadSessionId)
      if (Object.keys(payload).length === 0) {
        notify.popup(modal.title.error, errorText.validation.invalidComment)
        return null
      }

      const response = await runRequest(() => commentService.createComment(postId, payload))
      if (!response) return null

      if (!response.success) {
        notify.popup(modal.title.error, response.message)
        return response
      }

      const createdComment = commentModel(resolveCreatedCommentRaw(response.data, payload, user))
      if (createdComment?.id != null) {
        dispatch(commentActions.addComment(createdComment))
        if (createdComment.parentCommentId != null) {
          dispatch(commentActions.addSubCommentIndex(createdComment.parentCommentId, [createdComment.id]))
          dispatch(commentActions.updateComment(createdComment.parentCommentId, { hasChildComment: true }))
        }
        else {
          dispatch(commentActions.addPostCommentIndex(postId, [createdComment.id]))
        }
      }
      dispatch(postByIdActions.increaseCommentNumber(postId, 1))

      if (response.message) {
        notify.snackbar(response.message, 3000)
      }

      return {
        ...response,
        data: {
          ...(response.data || {}),
          createdComment,
        },
      }
    }
    catch (error) {
      console.error(error)
      return null
    }
    finally {
      dispatch(loadingAction.setCommentLoading(postId, false))
      pendingRef.current = false
    }
  }, [dispatch, notify, runRequest, user])

  return createComment
}
