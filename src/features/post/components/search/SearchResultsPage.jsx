import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Surface from "../../../../components/common/Surface";
import { searchText } from "../../../../constant/text/vi/post/search.text";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll";
import { usePostContext } from "../../hooks";
import Post from "../post/Post/Post";
import LoadingGetPost from "../post/LoadingGetPost";
import NoPost from "../post/NoPost";
import SharePost from "../post/SharePost";
import { resolveIsSharePost } from "../../utils/resolveIsSharePost";
import { style } from "./style";

const searchPageSx = style.searchResultsPage

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = useMemo(
    () => (searchParams.get("q") ?? "").trim(),
    [searchParams]
  )
  const { actions, selector } = usePostContext()
  const posts = selector.post.getSearchList()
  const hasMore = selector.post.getSearchListHasMore()
  const currentKeyword = selector.post.getSearchKeyword()
  const isLoading = selector.loading.getSearchFetchingLoading()

  const isSyncedQuery = Boolean(query) && currentKeyword === query
  const visiblePosts = isSyncedQuery ? posts : []
  const visibleHasMore = isSyncedQuery ? hasMore : undefined
  const showPrompt = !query
  const isPendingQuery =
    Boolean(query) &&
    (!isSyncedQuery || (isLoading && visiblePosts.length === 0))
  const showEmpty =
    Boolean(query) &&
    isSyncedQuery &&
    visibleHasMore === false &&
    !isLoading &&
    visiblePosts.length === 0
  const isLoadMore = isLoading && visiblePosts.length > 0
  const enableInfiniteScroll = Boolean(visibleHasMore) && visiblePosts.length > 0

  useEffect(() => {
    if (!query || isLoading || currentKeyword === query) return
    actions.searchContent(query)
  }, [actions, currentKeyword, isLoading, query])

  const targetRef = useInfiniteScroll({
    hasMore: enableInfiniteScroll,
    loading: isLoading,
    onLoadMore: () => actions.getSearchNextPage(query),
    rootMargin: "120px",
  })

  const heroTitle = query
    ? searchText.page.titleWithQuery(query)
    : searchText.page.emptyTitle
  const heroDescription = showPrompt
    ? searchText.page.promptDescription
    : visiblePosts.length > 0
      ? searchText.page.resultsDescription(visiblePosts.length)
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

      <Box sx={searchPageSx.list}>
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
          visiblePosts.map((post) => (
            resolveIsSharePost(post) ? (
              <SharePost key={post.id} post={post} />
            ) : (
              <Post key={post.id} post={post} />
            )
          ))
        )}
      </Box>

      {enableInfiniteScroll ? (
        <Box
          ref={targetRef}
          sx={{ height: "1px", visibility: "hidden", width: "100%" }}
        />
      ) : null}

      {isLoadMore ? (
        <LoadingGetPost count={1} sx={{ list: { alignItems: "center" } }} />
      ) : null}
    </Box>
  )
}
