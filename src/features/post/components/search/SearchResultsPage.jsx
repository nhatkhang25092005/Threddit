import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Typography } from "@mui/material";
import Surface from "../../../../components/common/Surface";
import { searchText } from "../../../../constant/text/vi/post/search.text";
import { SearchUserResultsSection } from "./components";
import { useSearchResultsPageState } from "./hooks";
import Post from "../post/Post/Post";
import LoadingGetPost from "../post/LoadingGetPost";
import NoPost from "../post/NoPost";
import SharePost from "../post/SharePost";
import { resolveIsSharePost } from "../../utils/resolveIsSharePost";
import { style } from "./style";

const searchPageSx = style.searchResultsPage

export default function SearchResultsPage() {
  const {
    enableInfiniteScroll,
    heroDescription,
    heroTitle,
    isLoadMore,
    isPendingQuery,
    query,
    showAllUsers,
    showEmpty,
    showOnlyUsers,
    showPostEmptyState,
    showPosts,
    showPrompt,
    targetRef,
    visiblePosts,
    visibleUserHasMore,
    visibleUsers,
  } = useSearchResultsPageState()

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
              onExpand={showAllUsers}
              onCollapse={showPosts}
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
