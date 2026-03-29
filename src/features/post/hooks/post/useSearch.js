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

const cursorModel = (profile = null, content = null) => ({profile,content})
const hasMoreModel = (profile = undefined, content = undefined) => ({profile,content})

const hasCursor = (cursor) => (
  cursor !== null &&
  cursor !== undefined &&
  cursor !== ""
)

const resolveSearchItems = (data) => (
  Array.isArray(data?.content) ? data.content : []
)

const resolveSearchUsers = (data) => (
  Array.isArray(data?.users) ? data.users : []
)

const resolveSearchCursor = (data) => (
  cursorModel(
    data?.cursor?.profile ?? null,
    data?.cursor?.content ?? null
  )
)

const resolveSearchHasMore = (data) => (
  hasMoreModel(
    data?.hasMore?.profile,
    data?.hasMore?.content
  )
)

const resolveIncomingSearchIds = (searchItems = []) => (
  (Array.isArray(searchItems) ? searchItems : [])
    .map((item) => postByIdModel(item)?.id)
    .filter((id) => id != null)
)

const resolveSearchUserKey = (user) => (
  user?.username ?? user?.id ?? null
)

const resolveIncomingSearchUserKeys = (searchUsers = []) => (
  (Array.isArray(searchUsers) ? searchUsers : [])
    .map((user) => resolveSearchUserKey(user))
    .filter((userKey) => userKey != null)
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

const filterUniqueSearchUsers = (searchUsers = [], currentSearchUserKeys = []) => {
  const currentUserSet = new Set(currentSearchUserKeys)
  const nextUserSet = new Set()

  return (Array.isArray(searchUsers) ? searchUsers : []).filter((user) => {
    const userKey = resolveSearchUserKey(user)

    if (userKey == null || currentUserSet.has(userKey) || nextUserSet.has(userKey)) {
      return false
    }

    nextUserSet.add(userKey)
    return true
  })
}

const resolveScope = (scope) => (
  scope === "users" || scope === "all" ? scope : "content"
)

const includeContentScope = (scope) => (
  scope === "all" || scope === "content"
)

const includeUserScope = (scope) => (
  scope === "all" || scope === "users"
)

export function useSearch(dispatch, {
  contentHasMore,
  contentIds = [],
  userHasMore,
  users = [],
} = {}) {
  const notify = useNotify()
  const runRequest = useSafeRequest()
  const cursorRef = useRef(cursorModel())
  const activeKeywordRef = useRef("")
  const hasMoreRef = useRef(hasMoreModel(userHasMore, contentHasMore))
  const currentSearchIdsRef = useRef(contentIds)
  const currentSearchUserKeysRef = useRef(resolveIncomingSearchUserKeys(users))
  const activeRequestCountRef = useRef(0)
  const searchSessionRef = useRef(0)

  useEffect(() => {
    hasMoreRef.current = {
      ...hasMoreRef.current,
      content: contentHasMore,
    }
  }, [contentHasMore])

  useEffect(() => {
    hasMoreRef.current = {
      ...hasMoreRef.current,
      profile: userHasMore,
    }
  }, [userHasMore])

  useEffect(() => {
    currentSearchIdsRef.current = contentIds
  }, [contentIds])

  useEffect(() => {
    currentSearchUserKeysRef.current = resolveIncomingSearchUserKeys(users)
  }, [users])

  const resetSearchCollection = useCallback((nextHasMore = hasMoreModel()) => {
    cursorRef.current = cursorModel(null, null)
    activeKeywordRef.current = ""
    hasMoreRef.current = hasMoreModel(
      nextHasMore?.profile,
      nextHasMore?.content
    )
    currentSearchIdsRef.current = []
    currentSearchUserKeysRef.current = []

    dispatch(searchActions.setSearchKeyword(""))
    dispatch(hasMoreActions.setSearchHasMore(nextHasMore?.content))
    dispatch(hasMoreActions.setSearchUsersHasMore(nextHasMore?.profile))
    combineActions.getSearchSuccess(dispatch, { content: [], users: [] }, "set")
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
          content: [],
          users: [],
          cursor: cursorModel(null, null),
          hasMore: hasMoreModel(),
        },
      }
    }

    cursorRef.current = cursorModel(null, null)
    activeKeywordRef.current = normalizedKey
    hasMoreRef.current = hasMoreModel(true, true)
    currentSearchIdsRef.current = []
    currentSearchUserKeysRef.current = []

    dispatch(searchActions.setSearchKeyword(normalizedKey))
    dispatch(hasMoreActions.setSearchHasMore(true))
    dispatch(hasMoreActions.setSearchUsersHasMore(true))
    combineActions.getSearchSuccess(dispatch, { content: [], users: [] }, "set")

    activeRequestCountRef.current += 1

    try {
      const response = await runRequest(
        (signal) =>
          notify.withLoading(
            () => postService.search(normalizedKey, signal, cursorRef.current),
            (isLoading) => dispatch(loadingAction.getSearchListLoading(isLoading))
          )
      )

      if (!response) return null
      if (searchSession !== searchSessionRef.current) return null

      if (!response.success) {
        hasMoreRef.current = hasMoreModel(false, false)
        dispatch(hasMoreActions.setSearchHasMore(false))
        dispatch(hasMoreActions.setSearchUsersHasMore(false))
        notify.popup(modal.title.error, response.message)
        return response
      }

      const data = response.data || {}
      const searchItems = resolveSearchItems(data)
      const searchUsers = resolveSearchUsers(data)
      const nextSearchItems = filterUniqueSearchItems(searchItems)
      const nextSearchUsers = filterUniqueSearchUsers(searchUsers)
      const incomingSearchIds = resolveIncomingSearchIds(nextSearchItems)
      const incomingSearchUserKeys = resolveIncomingSearchUserKeys(nextSearchUsers)
      const nextCursor = resolveSearchCursor(data)
      const nextHasMore = resolveSearchHasMore(data)
      const isDuplicatePostBatch = searchItems.length > 0 && incomingSearchIds.length === 0
      const isDuplicateUserBatch = searchUsers.length > 0 && incomingSearchUserKeys.length === 0
      const nextContentHasMore = isDuplicatePostBatch
        ? false
        : nextHasMore.content
      const nextUserHasMore = isDuplicateUserBatch
        ? false
        : nextHasMore.profile

      cursorRef.current = cursorModel(
        nextUserHasMore ? nextCursor.profile : null,
        nextContentHasMore ? nextCursor.content : null
      )
      hasMoreRef.current = hasMoreModel(nextUserHasMore, nextContentHasMore)
      currentSearchIdsRef.current = incomingSearchIds
      currentSearchUserKeysRef.current = incomingSearchUserKeys

      dispatch(hasMoreActions.setSearchHasMore(nextContentHasMore))
      dispatch(hasMoreActions.setSearchUsersHasMore(nextUserHasMore))
      combineActions.getSearchSuccess(
        dispatch,
        { content: nextSearchItems, users: nextSearchUsers },
        "set"
      )

      return {
        ...response,
        data: {
          ...data,
          content: nextSearchItems,
          users: nextSearchUsers,
          cursor: cursorRef.current,
          hasMore: hasMoreRef.current,
        },
      }
    } finally {
      activeRequestCountRef.current = Math.max(0, activeRequestCountRef.current - 1)
    }
  }, [dispatch, notify, resetSearchCollection, runRequest])

  const getNextPage = useCallback(async (key, options = {}) => {
    const normalizedKey = key === undefined
      ? activeKeywordRef.current
      : normalizeKeyword(key)
    const scope = resolveScope(options?.scope)
    const searchSession = searchSessionRef.current

    if (!normalizedKey) return null
    if (normalizedKey !== activeKeywordRef.current) return null
    if (
      includeContentScope(scope) &&
      (!hasCursor(cursorRef.current.content) || hasMoreRef.current.content === false)
    ) {
      return null
    }
    if (
      includeUserScope(scope) &&
      (!hasCursor(cursorRef.current.profile) || hasMoreRef.current.profile === false)
    ) {
      return null
    }
    if (activeRequestCountRef.current > 0) return null

    activeRequestCountRef.current += 1

    try {
      const response = await runRequest(
        (signal) =>
          notify.withLoading(
            () => postService.search(normalizedKey, signal, cursorRef.current, scope),
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
      const searchUsers = resolveSearchUsers(data)
      const nextCursor = resolveSearchCursor(data)
      const nextHasMore = resolveSearchHasMore(data)
      let nextProfileCursor = cursorRef.current.profile
      let nextContentCursor = cursorRef.current.content
      let nextProfileHasMore = hasMoreRef.current.profile
      let nextContentHasMore = hasMoreRef.current.content
      let nextSearchItems = []
      let nextSearchUsers = []

      if (includeContentScope(scope)) {
        nextSearchItems = filterUniqueSearchItems(
          searchItems,
          currentSearchIdsRef.current
        )
        const incomingSearchIds = resolveIncomingSearchIds(nextSearchItems)
        const isDuplicatePostBatch = searchItems.length > 0 && incomingSearchIds.length === 0

        nextContentHasMore = isDuplicatePostBatch
          ? false
          : nextHasMore.content
        nextContentCursor = nextContentHasMore ? nextCursor.content : null
        currentSearchIdsRef.current = [
          ...new Set([...currentSearchIdsRef.current, ...incomingSearchIds])
        ]

        dispatch(hasMoreActions.setSearchHasMore(nextContentHasMore))
      }

      if (includeUserScope(scope)) {
        nextSearchUsers = filterUniqueSearchUsers(
          searchUsers,
          currentSearchUserKeysRef.current
        )
        const incomingSearchUserKeys = resolveIncomingSearchUserKeys(nextSearchUsers)
        const isDuplicateUserBatch = searchUsers.length > 0 && incomingSearchUserKeys.length === 0

        nextProfileHasMore = isDuplicateUserBatch
          ? false
          : nextHasMore.profile
        nextProfileCursor = nextProfileHasMore ? nextCursor.profile : null
        currentSearchUserKeysRef.current = [
          ...new Set([...currentSearchUserKeysRef.current, ...incomingSearchUserKeys])
        ]

        dispatch(hasMoreActions.setSearchUsersHasMore(nextProfileHasMore))
      }

      cursorRef.current = cursorModel(nextProfileCursor, nextContentCursor)
      hasMoreRef.current = hasMoreModel(nextProfileHasMore, nextContentHasMore)

      if (nextSearchItems.length > 0 || nextSearchUsers.length > 0) {
        combineActions.getSearchSuccess(
          dispatch,
          { content: nextSearchItems, users: nextSearchUsers },
          "append"
        )
      }

      return {
        ...response,
        data: {
          ...data,
          content: nextSearchItems,
          users: nextSearchUsers,
          cursor: cursorRef.current,
          hasMore: hasMoreRef.current,
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
