import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useInfiniteScroll from "../../../../../hooks/useInfiniteScroll";
import { usePostContext } from "../../../hooks";
import {
  getSearchResultsSnapshot,
  resolveSearchPageQuery,
  resolveSearchResultsView,
  shouldFetchSearchResults,
} from "./searchResultsPageState.utils";

export default function useSearchResultsPageState() {
  const [searchParams] = useSearchParams()
  const [isShowingAllUsers, setIsShowingAllUsers] = useState(false)
  const query = useMemo(() => resolveSearchPageQuery(searchParams), [searchParams])
  const { actions, selector } = usePostContext()
  const {
    currentKeyword,
    hasMore,
    posts,
    userHasMore,
    users,
  } = getSearchResultsSnapshot(selector)
  const isLoading = selector.loading.getSearchFetchingLoading()

  const view = useMemo(() => resolveSearchResultsView({
    currentKeyword,
    hasMore,
    isLoading,
    isShowingAllUsers,
    posts,
    query,
    userHasMore,
    users,
  }), [
    currentKeyword,
    hasMore,
    isLoading,
    isShowingAllUsers,
    posts,
    query,
    userHasMore,
    users,
  ])

  useEffect(() => {
    setIsShowingAllUsers(false)
  }, [query])

  const showAllUsers = useCallback(() => {
    setIsShowingAllUsers(true)
  }, [])

  const showPosts = useCallback(() => {
    setIsShowingAllUsers(false)
  }, [])

  const handleLoadMore = useCallback(() => (
    view.showOnlyUsers
      ? actions.getSearchNextPage(query, { scope: "users" })
      : actions.getSearchNextPage(query, { scope: "content" })
  ), [actions, query, view.showOnlyUsers])

  useEffect(() => {
    if (!shouldFetchSearchResults({ currentKeyword, isLoading, query })) return

    actions.searchContent(query)
  }, [actions, currentKeyword, isLoading, query])

  const targetRef = useInfiniteScroll({
    hasMore: view.enableInfiniteScroll,
    loading: isLoading,
    onLoadMore: handleLoadMore,
    rootMargin: "120px",
  })

  return {
    ...view,
    isLoading,
    query,
    showAllUsers,
    showPosts,
    targetRef,
  }
}
