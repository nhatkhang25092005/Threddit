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

export function useGetCommentList(dispatch) {
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const cursorRef = useRef({})
  const hasMoreRef = useRef({})

  const getCommentList = useCallback(async (postId, options = {}) => {
    const key = postId
    const refresh = options?.refresh === true
    const ignoreHasMore = options?.ignoreHasMore === true

    if (!key) return null

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
        () => commentService.getCommentList(key, cursorRef.current[key], signal),
        (isLoading) => dispatch(loadingAction.getCommentListLoading(isLoading))
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
    const topLevelCommentIds = comments
      .filter((comment) => comment?.id != null && !comment?.parentCommentId)
      .map((comment) => comment.id)

    cursorRef.current[key] = nextCursor
    hasMoreRef.current[key] = hasMore

    dispatch(commentActions.addComments(comments))
    if (refresh) {
      dispatch(commentActions.setPostCommentIndex(key, topLevelCommentIds))
    }
    else {
      dispatch(commentActions.addPostCommentIndex(key, topLevelCommentIds))
    }

    const subCommentsMap = comments.reduce((result, comment) => {
      const parentCommentId = comment?.parentCommentId
      if (!parentCommentId || comment?.id == null) return result

      if (!Array.isArray(result[parentCommentId])) {
        result[parentCommentId] = []
      }

      result[parentCommentId].push(comment.id)
      return result
    }, {})

    Object.entries(subCommentsMap).forEach(([parentCommentId, commentIds]) => {
      if (refresh) {
        dispatch(commentActions.setSubCommentIndex(parentCommentId, commentIds))
        return
      }

      dispatch(commentActions.addSubCommentIndex(parentCommentId, commentIds))
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

  const refreshCommentList = useCallback(
    (postId) => getCommentList(postId, { refresh: true, ignoreHasMore: true }),
    [getCommentList]
  )

  return {
    getCommentList,
    refreshCommentList,
  }
}
