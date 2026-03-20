import { useCallback, useRef } from "react"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { commentService, storageService } from "../../services"
import { commentActions, loadingAction } from "../../store/actions"
import { commentModel } from "../../store/models/comment.model"

const normalizeMediaList = (media = []) => {
  const mediaList = (Array.isArray(media) ? media : []).filter(Boolean)
  const newMediaList = mediaList.filter((item) => item?.file)

  if (newMediaList.length > 0) {
    return newMediaList.slice(0, 1)
  }

  return mediaList.slice(0, 1)
}

const getNewMediaList = (mediaList = []) => (
  (Array.isArray(mediaList) ? mediaList : []).filter((item) => item?.file)
)

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object || {}, key)

const normalizeMentionedUsers = (mentionedUsers = []) => (
  [...new Set(
    (Array.isArray(mentionedUsers) ? mentionedUsers : [])
      .map((item) => String(item || "").trim())
      .filter(Boolean)
  )]
)

const buildUpdatePayload = (data = {}, uploadSessionId = null) => {
  const payload = {}
  const mentionedUsers = normalizeMentionedUsers(data?.mentionedUsers)

  if (hasOwn(data, "text")) {
    payload.text = String(data?.text ?? "").trim()
  }

  if (mentionedUsers.length > 0) {
    payload.mentionedUsers = mentionedUsers
  }

  if (uploadSessionId) {
    payload.uploadSessionId = uploadSessionId
  }

  if (typeof data?.removeMedia === "boolean" && !uploadSessionId) {
    payload.removeMedia = data.removeMedia
  }

  return payload
}

const buildUpdatedCommentPatch = (updatedComment = {}) => {
  const normalizedComment = commentModel(updatedComment)
  const patch = {
    text: normalizedComment.text,
    createdAt: normalizedComment.createdAt,
    updatedAt: normalizedComment.updatedAt,
    commenter: normalizedComment.commenter,
    isCommenter: normalizedComment.isCommenter,
    parentCommentId: normalizedComment.parentCommentId,
    hasChildComment: normalizedComment.hasChildComment,
    reaction: normalizedComment.reaction,
    mediaFiles: normalizedComment.mediaFiles,
    mentionedUsers: normalizedComment.mentionedUsers,
  }

  if (updatedComment?.reactionNumber != null || updatedComment?.stats?.reactionNumber != null) {
    patch.reactionNumber = normalizedComment.reactionNumber
  }

  return patch
}

export function useUpdateComment(dispatch) {
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const pendingRef = useRef(false)

  const updateComment = useCallback(async (commentId, data = {}) => {
    if (commentId == null) return null
    if (pendingRef.current) return null
    pendingRef.current = true
    dispatch(loadingAction.setCommentLoading(commentId, true))

    try {
      const mediaList = normalizeMediaList(data?.media)
      const newMediaList = getNewMediaList(mediaList)
      const hasExplicitMediaField = Array.isArray(data?.media)
      const hasCurrentMedia = Array.isArray(data?.currentMedia) && data.currentMedia.length > 0
      const removeMedia = typeof data?.removeMedia === "boolean"
        ? data.removeMedia
        : (
          hasCurrentMedia && (
            newMediaList.length > 0
            || (hasExplicitMediaField && mediaList.length === 0)
          )
        )

      let uploadSessionId = data?.uploadSessionId || null

      if (!uploadSessionId && newMediaList.length > 0) {
        const uploadResult = await storageService.uploadMediaAndGetSessionId(newMediaList)
        if (!uploadResult?.success) {
          notify.popup(modal.title.error, uploadResult?.message || "Could not upload media")
          return uploadResult
        }

        uploadSessionId = uploadResult.uploadSessionId
      }

      const payload = buildUpdatePayload({
        ...data,
        media: mediaList,
        ...(removeMedia !== undefined ? { removeMedia } : {}),
      }, uploadSessionId)

      if (Object.keys(payload).length === 0) {
        notify.popup(modal.title.error, "Could not resolve comment update payload")
        return null
      }

      const response = await runRequest(() => commentService.updateComment(commentId, payload))
      if (!response) return null

      if (!response.success) {
        notify.popup(modal.title.error, response.message)
        return response
      }

      const updatedComment = response?.data?.updatedComment
      if (updatedComment) {
        dispatch(commentActions.updateComment(commentId, buildUpdatedCommentPatch(updatedComment)))
      }

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
      dispatch(loadingAction.setCommentLoading(commentId, false))
      pendingRef.current = false
    }
  }, [dispatch, notify, runRequest])

  return updateComment
}
