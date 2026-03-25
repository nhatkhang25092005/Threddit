import { useCallback, useEffect, useRef } from "react"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { postService } from "../../services"
import { combineActions, hasMoreActions, loadingAction } from "../../store/actions"
import { postByIdModel } from "../../store/models/postById.model"
import { getPostList } from "../../utils/getPostList"

const resolveFeedItems = (data) => {
  if (Array.isArray(data?.feedItems)) return data.feedItems
  if (Array.isArray(data?.items)) return data.items
  if (Array.isArray(data?.results)) return data.results
  if (Array.isArray(data)) return data
  return []
}

const resolveFeedHasMore = (data, feedItems = []) => {
  if (feedItems.length === 0) return false

  if (typeof data?.hasMore === "boolean") return data.hasMore
  if (typeof data?.pagination?.hasMore === "boolean") {
    return data.pagination.hasMore
  }

  return feedItems.length > 0
}

const resolveIncomingFeedIds = (feedItems = []) => (
  getPostList((Array.isArray(feedItems) ? feedItems : []).map((item) => postByIdModel(item)))
)

const filterUniqueFeedItems = (feedItems = [], currentFeedIds = []) => {
  const currentIdSet = new Set(currentFeedIds)
  const nextIdSet = new Set()

  return (Array.isArray(feedItems) ? feedItems : []).filter((item) => {
    const feedId = postByIdModel(item)?.id

    if (feedId == null || currentIdSet.has(feedId) || nextIdSet.has(feedId)) {
      return false
    }

    nextIdSet.add(feedId)
    return true
  })
}

export function useGetFeed(dispatch, hasMore, currentFeedIds = []) {
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const hasMoreRef = useRef(hasMore)
  const currentFeedIdsRef = useRef(currentFeedIds)
  const pendingRef = useRef(false)

  useEffect(() => {
    hasMoreRef.current = hasMore
  }, [hasMore])

  useEffect(() => {
    currentFeedIdsRef.current = currentFeedIds
  }, [currentFeedIds])

  const getFeed = useCallback(async () => {
    if (hasMoreRef.current === false || pendingRef.current) return null

    if (hasMoreRef.current === undefined) {
      hasMoreRef.current = true
      dispatch(hasMoreActions.setFeedHasMore(true))
    }

    pendingRef.current = true

    try {
      const response = await runRequest(
        (signal) =>
          notify.withLoading(
            () => postService.getFeed(signal),
            (isLoading) => dispatch(loadingAction.getFeedListLoading(isLoading))
          )
      )
      if (!response) return null

      if (!response.success) {
        notify.popup(modal.title.error, response.message)
        return response
      }

      const data = response.data || {}
      const feedItems = resolveFeedItems(data)
      const nextFeedItems = filterUniqueFeedItems(
        feedItems,
        currentFeedIdsRef.current
      )
      const incomingFeedIds = resolveIncomingFeedIds(nextFeedItems)
      const isDuplicateBatch =
        feedItems.length > 0 &&
        incomingFeedIds.length === 0
      const nextHasMore = isDuplicateBatch
        ? false
        : resolveFeedHasMore(data, nextFeedItems)

      hasMoreRef.current = nextHasMore
      dispatch(hasMoreActions.setFeedHasMore(nextHasMore))

      if (incomingFeedIds.length > 0) {
        combineActions.getFeedSuccess(dispatch, nextFeedItems)
      }

      return {
        ...response,
        data: {
          ...data,
          feedItems: nextFeedItems,
          hasMore: nextHasMore,
        },
      }
    }
    finally {
      pendingRef.current = false
    }
  }, [dispatch, notify, runRequest])

  return getFeed
}
