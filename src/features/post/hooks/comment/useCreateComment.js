import { useCallback, useRef } from "react"
import { errorText } from "../../../../constant/text/vi/error.text"
import useAuth from "../../../../core/auth/useAuth"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { commentService } from "../../services"
import { commentActions, loadingAction, postByIdActions } from "../../store/actions"
import { commentModel } from "../../store/models/comment.model"

const resolveCreatedCommentRaw = (responseData = {}, user = null) => {
  const now = new Date().toISOString()
  const fallbackId = Date.now()
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
    text: base?.text,
    createdAt: base?.createdAt || now,
    updatedAt: base?.updatedAt || base?.createdAt || now,
    commenter: base?.commenter || {
      username: user?.username || null,
      displayName: user?.displayName || null,
      avatarUrl: user?.avatarUrl || null,
    },
    isCommenter: base?.isCommenter ?? true,
    parentCommentId: base?.parentCommentId ?? null,
    hasChildComment: Boolean(base?.hasChildComment),
    reaction: base?.reaction || null,
    mediaFiles: Array.isArray(base?.mediaFiles) ? base.mediaFiles : [],
    mentionedUsers: Array.isArray(base?.mentionedUsers)
      ? base.mentionedUsers
      : []
  }
}

export function useCreateComment(dispatch) {
  const { user } = useAuth()
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const pendingRef = useRef(false)

  const createComment = useCallback(async (postId, data = {}) => {
    console.log(data)
    if (postId == null) return null
    if (pendingRef.current) return null

    pendingRef.current = true
    dispatch(loadingAction.setCommentLoading(postId, true))

    try {
      const response = await runRequest(() => commentService.createComment(postId, data));
      console.log(response)
      if (!response) return null;

      if (!response.success) {
        if (response.errorSource === "UPLOAD_STAGE") {
          notify.popup(modal.title.error, response.message || errorText.upload.file);
        } else if (response.errorSource === "VALIDATION_STAGE") {
          notify.popup(modal.title.error, errorText.validation.invalidComment);
        } else {
          notify.popup(modal.title.error, response.message);
        }
        return response;
      }

      const createdComment = commentModel(resolveCreatedCommentRaw(response.data, user))
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
