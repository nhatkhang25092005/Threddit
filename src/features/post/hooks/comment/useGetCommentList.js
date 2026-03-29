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

const hasCommentInPage = (comments = [], targetCommentId = null) => {
  if (targetCommentId == null) return false

  const normalizedTargetId = String(targetCommentId)
  return (Array.isArray(comments) ? comments : []).some(
    (comment) => String(comment?.id) === normalizedTargetId
  )
}

const collectReplySearchParentIds = (comments = []) => (
  (Array.isArray(comments) ? comments : [])
    .filter((comment) => comment?.id != null && !comment?.parentCommentId && comment?.hasChildComment)
    .map((comment) => comment.id)
)

export function useGetCommentList(dispatch) {
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const runBackgroundRequest = useSafeRequest()
  const cursorRef = useRef({})
  const hasMoreRef = useRef({})
  const backgroundCursorRef = useRef({})
  const backgroundHasMoreRef = useRef({})

  const getCommentList = useCallback(async (postId, options = {}) => {
    const key = postId
    const refresh = options?.refresh === true
    const ignoreHasMore = options?.ignoreHasMore === true
    const silent = options?.silent === true
    const activeCursorRef = silent ? backgroundCursorRef : cursorRef
    const activeHasMoreRef = silent ? backgroundHasMoreRef : hasMoreRef
    const executeRequest = silent ? runBackgroundRequest : runRequest

    if (!key) return null

    if (refresh) {
      activeCursorRef.current[key] = undefined
      activeHasMoreRef.current[key] = true
    }

    if (!ignoreHasMore && activeHasMoreRef.current[key] === false) {
      return buildEmptyCommentPage(activeCursorRef.current[key] ?? null)
    }

    const response = await executeRequest((signal) => (
      silent
        ? commentService.getCommentList(key, activeCursorRef.current[key], signal)
        : notify.withLoading(
          () => commentService.getCommentList(key, activeCursorRef.current[key], signal),
          (isLoading) => dispatch(loadingAction.getCommentListLoading(isLoading))
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
    const topLevelCommentIds = comments
      .filter((comment) => comment?.id != null && !comment?.parentCommentId)
      .map((comment) => comment.id)

    activeCursorRef.current[key] = nextCursor
    activeHasMoreRef.current[key] = hasMore

    dispatch(commentActions.addComments(comments))
    if (refresh) {
      dispatch(commentActions.setPostCommentIndex(key, topLevelCommentIds))
    }
    else {
      dispatch(commentActions.addPostCommentIndex(key, topLevelCommentIds))
    }

    const subCommentsMap = buildSubCommentsMap(comments)

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
  }, [dispatch, notify, runBackgroundRequest, runRequest])

  const refreshCommentList = useCallback(
    (postId) => getCommentList(postId, { refresh: true, ignoreHasMore: true }),
    [getCommentList]
  )

  const prefetchCommentThread = useCallback(async (postId, options = {}) => {
    if (!postId) return null

    const targetCommentId = options?.targetCommentId ?? null
    const replySearchParentIds = new Set()
    const syncPrefetchedPaginationToForeground = () => {
      cursorRef.current[postId] = backgroundCursorRef.current[postId]
      hasMoreRef.current[postId] = backgroundHasMoreRef.current[postId]
    }
    const collectParentIds = (comments = []) => {
      collectReplySearchParentIds(comments).forEach((commentId) => {
        replySearchParentIds.add(commentId)
      })
    }

    let response = await getCommentList(postId, {
      refresh: true,
      ignoreHasMore: true,
      silent: true,
    })

    if (!response?.success) return response

    collectParentIds(response?.data?.commentList)

    if (hasCommentInPage(response?.data?.commentList, targetCommentId)) {
      syncPrefetchedPaginationToForeground()
      return {
        ...response,
        data: {
          ...(response.data || {}),
          replySearchParentIds: Array.from(replySearchParentIds),
          targetCommentFound: true,
        },
      }
    }

    while (response?.data?.hasMore) {
      response = await getCommentList(postId, { silent: true })

      if (!response?.success) {
        return response
      }

      collectParentIds(response?.data?.commentList)

      if (hasCommentInPage(response?.data?.commentList, targetCommentId)) {
        syncPrefetchedPaginationToForeground()
        return {
          ...response,
          data: {
            ...(response.data || {}),
            replySearchParentIds: Array.from(replySearchParentIds),
            targetCommentFound: true,
          },
        }
      }
    }

    syncPrefetchedPaginationToForeground()
    return {
      ...response,
      data: {
        ...(response?.data || {}),
        replySearchParentIds: Array.from(replySearchParentIds),
        targetCommentFound: false,
      },
    }
  }, [getCommentList])

  return {
    getCommentList,
    prefetchCommentThread,
    refreshCommentList,
  }
}
