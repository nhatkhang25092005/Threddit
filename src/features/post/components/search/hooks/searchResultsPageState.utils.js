import { searchText } from "../../../../../constant/text/vi/post/search.text";

export function resolveSearchPageQuery(searchParams) {
  return (searchParams.get("q") ?? "").trim()
}

export function getSearchResultsSnapshot(selector) {
  return {
    currentKeyword: selector.post.getSearchKeyword(),
    hasMore: selector.post.getSearchListHasMore(),
    posts: selector.post.getSearchList(),
    userHasMore: selector.post.getSearchUsersHasMore(),
    users: selector.post.getSearchUsers(),
  }
}

export function shouldFetchSearchResults({
  currentKeyword,
  isLoading,
  query,
}) {
  return Boolean(query) && !isLoading && currentKeyword !== query
}

function resolveVisibleSearchResults({
  currentKeyword,
  hasMore,
  posts,
  query,
  userHasMore,
  users,
}) {
  const isSyncedQuery = Boolean(query) && currentKeyword === query
  const visiblePosts = isSyncedQuery ? posts : []
  const visibleUsers = isSyncedQuery ? users : []

  return {
    hasAnyVisibleResult: visiblePosts.length > 0 || visibleUsers.length > 0,
    isSyncedQuery,
    visibleHasMore: isSyncedQuery ? hasMore : undefined,
    visiblePosts,
    visibleUserHasMore: isSyncedQuery ? userHasMore : undefined,
    visibleUsers,
  }
}

function resolveHeroCopy({
  hasAnyVisibleResult,
  isPendingQuery,
  query,
  showOnlyUsers,
  showPrompt,
  visiblePosts,
  visibleUsers,
}) {
  const heroTitle = query
    ? searchText.page.titleWithQuery(query)
    : searchText.page.emptyTitle
  const heroDescription = showPrompt
    ? searchText.page.promptDescription
    : hasAnyVisibleResult
      ? showOnlyUsers
        ? searchText.page.userResultsDescription(visibleUsers.length)
        : searchText.page.resultsDescription(visibleUsers.length, visiblePosts.length)
      : isPendingQuery
        ? searchText.page.pendingDescription
        : searchText.page.emptyDescription

  return {
    heroDescription,
    heroTitle,
  }
}

export function resolveSearchResultsView({
  currentKeyword,
  hasMore,
  isLoading,
  isShowingAllUsers,
  posts,
  query,
  userHasMore,
  users,
}) {
  const {
    hasAnyVisibleResult,
    isSyncedQuery,
    visibleHasMore,
    visiblePosts,
    visibleUserHasMore,
    visibleUsers,
  } = resolveVisibleSearchResults({
    currentKeyword,
    hasMore,
    posts,
    query,
    userHasMore,
    users,
  })
  const showPrompt = !query
  const isPendingQuery =
    Boolean(query) &&
    (!isSyncedQuery || (isLoading && !hasAnyVisibleResult))
  const showEmpty =
    Boolean(query) &&
    isSyncedQuery &&
    visibleHasMore === false &&
    visibleUserHasMore === false &&
    !isLoading &&
    !hasAnyVisibleResult
  const showOnlyUsers = isShowingAllUsers && visibleUsers.length > 0
  const showPostEmptyState =
    !showOnlyUsers &&
    !isPendingQuery &&
    !showPrompt &&
    !showEmpty &&
    visiblePosts.length === 0
  const isLoadMore = isLoading && (
    showOnlyUsers
      ? visibleUsers.length > 0
      : visiblePosts.length > 0
  )
  const enableInfiniteScroll = showOnlyUsers
    ? Boolean(visibleUserHasMore) && visibleUsers.length > 0
    : Boolean(visibleHasMore) && visiblePosts.length > 0

  const {
    heroDescription,
    heroTitle,
  } = resolveHeroCopy({
    hasAnyVisibleResult,
    isPendingQuery,
    query,
    showOnlyUsers,
    showPrompt,
    visiblePosts,
    visibleUsers,
  })

  return {
    enableInfiniteScroll,
    heroDescription,
    heroTitle,
    isLoadMore,
    isPendingQuery,
    showEmpty,
    showOnlyUsers,
    showPostEmptyState,
    showPrompt,
    visiblePosts,
    visibleUserHasMore,
    visibleUsers,
  }
}
