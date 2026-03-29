import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Surface from "../../../../components/common/Surface";
import { searchText } from "../../../../constant/text/vi/post/search.text";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll";
import { usePostContext } from "../../hooks";
import { SearchUserResultsSection } from "./components";
import Post from "../post/Post/Post";
import LoadingGetPost from "../post/LoadingGetPost";
import NoPost from "../post/NoPost";
import SharePost from "../post/SharePost";
import { resolveIsSharePost } from "../../utils/resolveIsSharePost";
import { style } from "./style";

const searchPageSx = style.searchResultsPage

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const [isShowingAllUsers, setIsShowingAllUsers] = useState(false)
  const query = useMemo(
    () => (searchParams.get("q") ?? "").trim(),
    [searchParams]
  )
  const { actions, selector } = usePostContext()
  const posts = selector.post.getSearchList()
  const users = selector.post.getSearchUsers()
  const hasMore = selector.post.getSearchListHasMore()
  const userHasMore = selector.post.getSearchUsersHasMore()
  const currentKeyword = selector.post.getSearchKeyword()
  const isLoading = selector.loading.getSearchFetchingLoading()

  const isSyncedQuery = Boolean(query) && currentKeyword === query
  const visiblePosts = isSyncedQuery ? posts : []
  const visibleUsers = isSyncedQuery ? users : []
  const visibleHasMore = isSyncedQuery ? hasMore : undefined
  const visibleUserHasMore = isSyncedQuery ? userHasMore : undefined
  const hasAnyVisibleResult = visiblePosts.length > 0 || visibleUsers.length > 0
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
  const isLoadMore = isLoading && (showOnlyUsers ? visibleUsers.length > 0 : visiblePosts.length > 0)
  const enableInfiniteScroll = showOnlyUsers
    ? Boolean(visibleUserHasMore) && visibleUsers.length > 0
    : Boolean(visibleHasMore) && visiblePosts.length > 0

  useEffect(() => {
    setIsShowingAllUsers(false)
  }, [query])

  useEffect(() => {
    if (!query || isLoading || currentKeyword === query) return
    actions.searchContent(query)
  }, [actions, currentKeyword, isLoading, query])

  const targetRef = useInfiniteScroll({
    hasMore: enableInfiniteScroll,
    loading: isLoading,
    onLoadMore: () => showOnlyUsers
      ? actions.getSearchNextPage(query, { scope: "users" })
      : actions.getSearchNextPage(query, { scope: "content" }),
    rootMargin: "120px",
  })

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

  return (
    <Box sx={searchPageSx.page}>
      <Surface variant="default" sx={(theme) => searchPageSx.hero(theme)}>
        <Box sx={searchPageSx.heroTop}>
          <Box sx={(theme) => searchPageSx.heroIcon(theme)}>
            <SearchRoundedIcon />
          </Box>

          <Box sx={searchPageSx.heroText}>
            <Typography sx={(theme) => searchPageSx.heroEyebrow(theme)}>
              {searchText.page.eyebrow}
            </Typography>
            <Typography sx={searchPageSx.heroTitle}>
              {heroTitle}
            </Typography>
          </Box>
        </Box>

        <Typography sx={(theme) => searchPageSx.heroDescription(theme)}>
          {heroDescription}
        </Typography>
      </Surface>

      {isPendingQuery ? (
        <LoadingGetPost count={2} sx={{ list: { alignItems: "center" } }} />
      ) : showPrompt ? (
        <NoPost
          message={searchText.page.promptMessage}
          sx={{ wrapper: { mx: "auto" } }}
        />
      ) : showEmpty ? (
        <NoPost
          message={searchText.page.noResultMessage(query)}
          sx={{ wrapper: { mx: "auto" } }}
        />
      ) : (
        <>
          {visibleUsers.length > 0 ? (
            <SearchUserResultsSection
              users={visibleUsers}
              expanded={showOnlyUsers}
              hasMore={Boolean(visibleUserHasMore)}
              isLoadingMore={isLoadMore && showOnlyUsers}
              onExpand={() => setIsShowingAllUsers(true)}
              onCollapse={() => setIsShowingAllUsers(false)}
            />
          ) : null}

          {!showOnlyUsers ? (
            <Box sx={searchPageSx.list}>
              {showPostEmptyState ? (
                <NoPost
                  message={searchText.page.noPostMessage(query)}
                  sx={{ wrapper: { mx: "auto" } }}
                />
              ) : (
                visiblePosts.map((post) => (
                  resolveIsSharePost(post) ? (
                    <SharePost key={post.id} post={post} />
                  ) : (
                    <Post key={post.id} post={post} />
                  )
                ))
              )}
            </Box>
          ) : null}
        </>
      )}

      {enableInfiniteScroll ? (
        <Box
          ref={targetRef}
          sx={{ height: "1px", visibility: "hidden", width: "100%" }}
        />
      ) : null}

      {!showOnlyUsers && isLoadMore ? (
        <LoadingGetPost count={1} sx={{ list: { alignItems: "center" } }} />
      ) : null}
    </Box>
  )
}
