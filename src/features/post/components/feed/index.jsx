import { Box } from "@mui/material";
import { post } from "../../../../constant/text/vi/post/post";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll";
import { usePostContext } from "../../hooks";
import LoadingGetPost from "../post/LoadingGetPost";
import NoPost from "../post/NoPost";
import Post from "../post/Post/Post";
import useFetchData from "./hooks/useFetchData";
import useSaveScroll from "./hooks/useSaveScroll";

const feedContentSx = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

export default function Feed() {
  const {
    actions: { getFeed },
    selector: {
      loading: { getFeedFetchingLoading },
      post: { getFeedList, getFeedListHasMore },
    },
  } = usePostContext();

  const posts = getFeedList();
  const hasMore = getFeedListHasMore();
  const isLoading = getFeedFetchingLoading();
  const { hasRequested, isInitializing } = useFetchData({
    getFeed,
    hasMore,
    loading: isLoading,
    postCount: posts.length,
  });
  const showEmpty =
    hasRequested && hasMore === false && !isLoading && posts.length === 0;
  const isLoadMore = isLoading && posts.length > 0;
  const canRestoreScroll = !isLoading && hasRequested;
  const enableInfiniteScroll = Boolean(hasMore) && posts.length > 0;

  const targetRef = useInfiniteScroll({
    hasMore: enableInfiniteScroll,
    loading: isLoading,
    onLoadMore: getFeed,
    rootMargin: "0px",
  });

  useSaveScroll(canRestoreScroll);

  return (
    <Box sx={feedContentSx}>
      {((isLoading || isInitializing) && posts.length === 0) ? (
        <LoadingGetPost count={2} sx={{ list: { alignItems: "center" } }} />
      ) : showEmpty ? (
        <NoPost
          message={post.list.feedEmpty}
          sx={{ wrapper: { mx: "auto" } }}
        />
      ) : (
        posts.map((post) => <Post key={post.id} post={post} />)
      )}

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
  );
}
