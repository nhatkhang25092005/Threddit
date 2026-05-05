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
import { resolveId } from "../../utils/resolveTypes"

export function useGetChildComment(dispatch) {
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const runBackgroundRequest = useSafeRequest()
  const cursorRef = useRef({})
  const hasMoreRef = useRef({})
  const backgroundCursorRef = useRef({})
  const backgroundHasMoreRef = useRef({})

  const hasCommentInPage = useCallback((comments = [], targetCommentId = null) => {
    if (targetCommentId == null) return false

    const normalizedTargetId = resolveId(targetCommentId)
    if (normalizedTargetId == null) return false

    return (Array.isArray(comments) ? comments : []).some(
      (comment) => resolveId(comment?.id) === normalizedTargetId
    )
  }, [])

  const getChildComment = useCallback(async (parentCommentId, options = {}) => {
    const key = resolveId(parentCommentId)
    const refresh = options?.refresh === true
    const ignoreHasMore = options?.ignoreHasMore === true
    const silent = options?.silent === true
    const activeCursorRef = silent ? backgroundCursorRef : cursorRef
    const activeHasMoreRef = silent ? backgroundHasMoreRef : hasMoreRef
    const executeRequest = silent ? runBackgroundRequest : runRequest

    if (key == null) return null

    if (refresh) {
      activeCursorRef.current[key] = undefined
      activeHasMoreRef.current[key] = true
    }

    if (!ignoreHasMore && activeHasMoreRef.current[key] === false) {
      return buildEmptyCommentPage(activeCursorRef.current[key] ?? null)
    }

    const response = await executeRequest((signal) => (
      silent
        ? commentService.getChildComment(key, activeCursorRef.current[key], signal)
        : notify.withLoading(
          () => commentService.getChildComment(key, activeCursorRef.current[key], signal),
          (isLoading) => dispatch(loadingAction.setCommentLoading(key, isLoading))
        )
    ))

    if (!response) return null

    if (!response.success) {
      if (!silent) {
        notify.popup(modal.title.error, response.message)
      }
      return response
    }

    const data = response.data || {}
    const comments = resolveCommentItems(data).map(commentModel)
    const nextCursor = resolveCommentCursor(data)
    const hasMore = resolveCommentHasMore(data, nextCursor, comments)
    const subCommentsMap = buildSubCommentsMap(comments, key)

    activeCursorRef.current[key] = nextCursor
    activeHasMoreRef.current[key] = hasMore

    dispatch(commentActions.addComments(comments))

    Object.entries(subCommentsMap).forEach(([currentParentCommentId, commentIds]) => {
      const resolvedParentCommentId = resolveId(currentParentCommentId)
      if (resolvedParentCommentId == null) return

      if (refresh) {
        dispatch(commentActions.setSubCommentIndex(resolvedParentCommentId, commentIds))
        return
      }

      dispatch(commentActions.addSubCommentIndex(resolvedParentCommentId, commentIds))
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
  }, [dispatch, notify, runBackgroundRequest, runRequest])

  const refreshChildComment = useCallback(
    (parentCommentId) => getChildComment(parentCommentId, { refresh: true, ignoreHasMore: true }),
    [getChildComment]
  )

  const prefetchChildComment = useCallback(async (parentCommentId, options = {}) => {
    const parentId = resolveId(parentCommentId)
    if (parentId == null) return null

    const targetCommentId = options?.targetCommentId ?? null
    const deepSearch = options?.deepSearch === true
    const visitedParentIds = options?.visitedParentIds instanceof Set
      ? options.visitedParentIds
      : new Set()
    const normalizedParentId = parentId

    if (visitedParentIds.has(normalizedParentId)) {
      return {
        success: true,
        data: {
          targetCommentFound: false,
        },
      }
    }

    visitedParentIds.add(normalizedParentId)

    const syncPrefetchedPaginationToForeground = () => {
      cursorRef.current[parentId] = backgroundCursorRef.current[parentId]
      hasMoreRef.current[parentId] = backgroundHasMoreRef.current[parentId]
    }

    const nestedParentIds = new Set()
    const collectNestedParentIds = (comments = []) => {
      ;(Array.isArray(comments) ? comments : []).forEach((comment) => {
        if (comment?.id == null) {
          return
        }

        if (resolveId(comment.id) !== normalizedParentId && comment?.hasChildComment) {
          nestedParentIds.add(comment.id)
        }
      })
    }

    let response = await getChildComment(parentId, {
      refresh: true,
      ignoreHasMore: true,
      silent: true,
    })

    if (!response?.success) {
      syncPrefetchedPaginationToForeground()
      return response
    }

    collectNestedParentIds(response?.data?.commentList)

    if (hasCommentInPage(response?.data?.commentList, targetCommentId)) {
      syncPrefetchedPaginationToForeground()
      return {
        ...response,
        data: {
          ...(response.data || {}),
          targetCommentFound: true,
        },
      }
    }

    while (response?.data?.hasMore) {
      response = await getChildComment(parentId, { silent: true })

      if (!response?.success) {
        syncPrefetchedPaginationToForeground()
        return response
      }

      collectNestedParentIds(response?.data?.commentList)

      if (hasCommentInPage(response?.data?.commentList, targetCommentId)) {
        syncPrefetchedPaginationToForeground()
        return {
          ...response,
          data: {
            ...(response.data || {}),
            targetCommentFound: true,
          },
        }
      }
    }

    syncPrefetchedPaginationToForeground()

    if (deepSearch) {
      for (const nestedParentId of nestedParentIds) {
        const nestedResponse = await prefetchChildComment(nestedParentId, {
          deepSearch: true,
          targetCommentId,
          visitedParentIds,
        })

        if (!nestedResponse?.success) {
          return nestedResponse
        }

        if (nestedResponse?.data?.targetCommentFound) {
          return nestedResponse
        }
      }
    }

    return {
      ...response,
      data: {
        ...(response?.data || {}),
        targetCommentFound: false,
      },
    }
  }, [getChildComment, hasCommentInPage])

  return {
    getChildComment,
    prefetchChildComment,
    refreshChildComment,
  }
}
