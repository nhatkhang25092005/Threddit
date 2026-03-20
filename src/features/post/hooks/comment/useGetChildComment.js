import { useCallback, useRef } from "react"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { commentService } from "../../services"
import { commentActions, loadingAction } from "../../store/actions"
import { commentModel } from "../../store/models/comment.model"
import {
  buildEmptyCommentPage,
  buildSubCommentsMap,
  resolveCommentCursor,
  resolveCommentHasMore,
  resolveCommentItems,
} from "../../utils/commentCollection.utils"

export function useGetChildComment(dispatch) {
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const cursorRef = useRef({})
  const hasMoreRef = useRef({})

  const getChildComment = useCallback(async (parentCommentId, options = {}) => {
    const key = parentCommentId
    const refresh = options?.refresh === true
    const ignoreHasMore = options?.ignoreHasMore === true

    if (key == null) return null

    if (refresh) {
      cursorRef.current[key] = undefined
      hasMoreRef.current[key] = true
    }

    if (!ignoreHasMore && hasMoreRef.current[key] === false) {
      return buildEmptyCommentPage(cursorRef.current[key] ?? null)
    }

    const response = await runRequest((signal) =>
      notify.withLoading(
        () => commentService.getChildComment(key, cursorRef.current[key], signal),
        (isLoading) => dispatch(loadingAction.setCommentLoading(key, isLoading))
      )
    )

    if (!response) return null

    if (!response.success) {
      notify.popup(modal.title.error, response.message)
      return response
    }

    const data = response.data || {}
    const comments = resolveCommentItems(data).map(commentModel)
    const nextCursor = resolveCommentCursor(data)
    const hasMore = resolveCommentHasMore(data, nextCursor, comments)
    const subCommentsMap = buildSubCommentsMap(comments, key)

    cursorRef.current[key] = nextCursor
    hasMoreRef.current[key] = hasMore

    dispatch(commentActions.addComments(comments))

    Object.entries(subCommentsMap).forEach(([currentParentCommentId, commentIds]) => {
      if (refresh) {
        dispatch(commentActions.setSubCommentIndex(currentParentCommentId, commentIds))
        return
      }

      dispatch(commentActions.addSubCommentIndex(currentParentCommentId, commentIds))
    })

    return {
      ...response,
      data: {
        ...data,
        commentList: comments,
        cursor: nextCursor,
        hasMore,
      },
    }
  }, [dispatch, notify, runRequest])

  const refreshChildComment = useCallback(
    (parentCommentId) => getChildComment(parentCommentId, { refresh: true, ignoreHasMore: true }),
    [getChildComment]
  )

  return {
    getChildComment,
    refreshChildComment,
  }
}
