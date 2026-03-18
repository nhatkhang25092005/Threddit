import { useCallback, useRef } from "react"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { commentService } from "../../services"
import { commentActions, loadingAction } from "../../store/actions"
import { commentModel } from "../../store/models/comment.model"

function resolveCommentItems(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.commentList)) return data.commentList
  if (Array.isArray(data?.comments)) return data.comments
  if (Array.isArray(data?.items)) return data.items
  if (Array.isArray(data?.results)) return data.results
  return []
}

function resolveHasMore(data, cursor, items) {
  if (typeof data?.hasMore === "boolean") return data.hasMore
  if (typeof data?.nextPage === "boolean") return data.nextPage
  if (typeof data?.pagination?.hasMore === "boolean") return data.pagination.hasMore
  return Boolean(cursor && items.length > 0)
}

function buildSubCommentsMap(comments = [], parentCommentId) {
  const key = String(parentCommentId)
  const mappedComments = (Array.isArray(comments) ? comments : []).reduce((result, comment) => {
    const currentParentCommentId = comment?.parentCommentId
    if (currentParentCommentId == null || comment?.id == null) return result

    const parentKey = String(currentParentCommentId)
    if (!Array.isArray(result[parentKey])) {
      result[parentKey] = []
    }

    result[parentKey].push(comment.id)
    return result
  }, {})

  if (!Object.prototype.hasOwnProperty.call(mappedComments, key)) {
    mappedComments[key] = []
  }

  return mappedComments
}

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
      return {
        success: true,
        data: {
          commentList: [],
          cursor: cursorRef.current[key] ?? null,
          hasMore: false,
        },
      }
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
    const nextCursor = data?.cursor ?? data?.nextCursor ?? data?.pagination?.cursor ?? null
    const hasMore = resolveHasMore(data, nextCursor, comments)
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
