import { useCallback, useEffect, useRef } from "react"
import { modal } from "../../../../constant/text/vi/modal"
import { useNotify } from "../../../../hooks/useNotify"
import { useSafeRequest } from "../../../../hooks/useSafeRequest"
import { postService } from "../../services"
import { combineActions, hasMoreActions, loadingAction, searchActions } from "../../store/actions"
import { postByIdModel } from "../../store/models/postById.model"

const normalizeKeyword = (key) => (
  typeof key === "string" ? key.trim() : ""
)

const hasCursor = (cursor) => (
  cursor !== null &&
  cursor !== undefined &&
  cursor !== ""
)

const resolveSearchItems = (data) => {
  if (Array.isArray(data?.searchItems)) return data.searchItems
  if (Array.isArray(data?.contents)) return data.contents
  if (Array.isArray(data?.items)) return data.items
  if (Array.isArray(data?.results)) return data.results
  if (Array.isArray(data?.feedItems)) return data.feedItems
  if (Array.isArray(data)) return data
  return []
}

const resolveSearchCursor = (data) => (
  data?.cursor ??
  data?.nextCursor ??
  data?.pagination?.cursor ??
  data?.pagination?.nextCursor ??
  null
)

const resolveSearchHasMore = (data, rawSearchItems = [], cursor = null) => {
  if (rawSearchItems.length === 0) return false

  if (typeof data?.hasMore === "boolean") return data.hasMore
  if (typeof data?.pagination?.hasMore === "boolean") {
    return data.pagination.hasMore
  }

  return hasCursor(cursor)
}

const resolveIncomingSearchIds = (searchItems = []) => (
  (Array.isArray(searchItems) ? searchItems : [])
    .map((item) => postByIdModel(item)?.id)
    .filter((id) => id != null)
)

const filterUniqueSearchItems = (searchItems = [], currentSearchIds = []) => {
  const currentIdSet = new Set(currentSearchIds)
  const nextIdSet = new Set()

  return (Array.isArray(searchItems) ? searchItems : []).filter((item) => {
    const searchId = postByIdModel(item)?.id

    if (searchId == null || currentIdSet.has(searchId) || nextIdSet.has(searchId)) {
      return false
    }

    nextIdSet.add(searchId)
    return true
  })
}

export function useSearch(dispatch, hasMore, currentSearchIds = []) {
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const cursorRef = useRef(null)
  const activeKeywordRef = useRef("")
  const hasMoreRef = useRef(hasMore)
  const currentSearchIdsRef = useRef(currentSearchIds)
  const activeRequestCountRef = useRef(0)
  const searchSessionRef = useRef(0)

  useEffect(() => {
    hasMoreRef.current = hasMore
  }, [hasMore])

  useEffect(() => {
    currentSearchIdsRef.current = currentSearchIds
  }, [currentSearchIds])

  const resetSearchCollection = useCallback((nextHasMore = undefined) => {
    cursorRef.current = null
    activeKeywordRef.current = ""
    hasMoreRef.current = nextHasMore
    currentSearchIdsRef.current = []

    dispatch(searchActions.setSearchKeyword(""))
    dispatch(hasMoreActions.setSearchHasMore(nextHasMore))
    combineActions.getSearchSuccess(dispatch, [], "set")
  }, [dispatch])

  const searchContent = useCallback(async (key) => {
    const normalizedKey = normalizeKeyword(key)
    const searchSession = searchSessionRef.current + 1

    searchSessionRef.current = searchSession

    if (!normalizedKey) {
      resetSearchCollection()
      return {
        success: true,
        data: {
          searchItems: [],
          cursor: null,
          hasMore: undefined,
        },
      }
    }

    cursorRef.current = null
    activeKeywordRef.current = normalizedKey
    hasMoreRef.current = true
    currentSearchIdsRef.current = []

    dispatch(searchActions.setSearchKeyword(normalizedKey))
    dispatch(hasMoreActions.setSearchHasMore(true))
    combineActions.getSearchSuccess(dispatch, [], "set")

    activeRequestCountRef.current += 1

    try {
      const response = await runRequest(
        (signal) =>
          notify.withLoading(
            () => postService.searchContent(normalizedKey, signal, cursorRef.current),
            (isLoading) => dispatch(loadingAction.getSearchListLoading(isLoading))
          )
      )

      if (!response) return null
      if (searchSession !== searchSessionRef.current) return null

      if (!response.success) {
        hasMoreRef.current = false
        dispatch(hasMoreActions.setSearchHasMore(false))
        notify.popup(modal.title.error, response.message)
        return response
      }

      const data = response.data || {}
      const searchItems = resolveSearchItems(data)
      const nextSearchItems = filterUniqueSearchItems(searchItems)
      const incomingSearchIds = resolveIncomingSearchIds(nextSearchItems)
      const nextCursor = resolveSearchCursor(data)
      const isDuplicateBatch = searchItems.length > 0 && incomingSearchIds.length === 0
      const nextHasMore = isDuplicateBatch
        ? false
        : resolveSearchHasMore(data, searchItems, nextCursor)

      cursorRef.current = nextHasMore ? nextCursor : null
      hasMoreRef.current = nextHasMore
      currentSearchIdsRef.current = incomingSearchIds

      dispatch(hasMoreActions.setSearchHasMore(nextHasMore))
      combineActions.getSearchSuccess(dispatch, nextSearchItems, "set")

      return {
        ...response,
        data: {
          ...data,
          searchItems: nextSearchItems,
          cursor: cursorRef.current,
          hasMore: nextHasMore,
        },
      }
    } finally {
      activeRequestCountRef.current = Math.max(0, activeRequestCountRef.current - 1)
    }
  }, [dispatch, notify, resetSearchCollection, runRequest])

  const getNextPage = useCallback(async (key) => {
    const normalizedKey = key === undefined
      ? activeKeywordRef.current
      : normalizeKeyword(key)
    const searchSession = searchSessionRef.current

    if (!normalizedKey) return null
    if (normalizedKey !== activeKeywordRef.current) return null
    if (!hasCursor(cursorRef.current) || hasMoreRef.current === false) return null
    if (activeRequestCountRef.current > 0) return null

    activeRequestCountRef.current += 1

    try {
      const response = await runRequest(
        (signal) =>
          notify.withLoading(
            () => postService.searchContent(normalizedKey, signal, cursorRef.current),
            (isLoading) => dispatch(loadingAction.getSearchListLoading(isLoading))
          )
      )

      if (!response) return null
      if (searchSession !== searchSessionRef.current) return null

      if (!response.success) {
        notify.popup(modal.title.error, response.message)
        return response
      }

      const data = response.data || {}
      const searchItems = resolveSearchItems(data)
      const nextSearchItems = filterUniqueSearchItems(
        searchItems,
        currentSearchIdsRef.current
      )
      const incomingSearchIds = resolveIncomingSearchIds(nextSearchItems)
      const nextCursor = resolveSearchCursor(data)
      const isDuplicateBatch = searchItems.length > 0 && incomingSearchIds.length === 0
      const nextHasMore = isDuplicateBatch
        ? false
        : resolveSearchHasMore(data, searchItems, nextCursor)

      cursorRef.current = nextHasMore ? nextCursor : null
      hasMoreRef.current = nextHasMore
      currentSearchIdsRef.current = [
        ...new Set([...currentSearchIdsRef.current, ...incomingSearchIds])
      ]

      dispatch(hasMoreActions.setSearchHasMore(nextHasMore))

      if (nextSearchItems.length > 0) {
        combineActions.getSearchSuccess(dispatch, nextSearchItems, "append")
      }

      return {
        ...response,
        data: {
          ...data,
          searchItems: nextSearchItems,
          cursor: cursorRef.current,
          hasMore: nextHasMore,
        },
      }
    } finally {
      activeRequestCountRef.current = Math.max(0, activeRequestCountRef.current - 1)
    }
  }, [dispatch, notify, runRequest])

  return {
    searchContent,
    getNextPage,
  }
}
