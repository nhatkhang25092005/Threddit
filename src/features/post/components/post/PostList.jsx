import { Box, Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useAuth from "../../../../core/auth/useAuth";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll";
import { usePostContext } from "../../hooks/usePostContext";
import LoadingGetPost from "./LoadingGetPost";
import NoPost from "./NoPost";
import Post from "./Post/Post";
import SharePost from "./SharePost";
import {resolveIsSharePost} from '../../utils/resolveIsSharePost'
const VARIANT_CONFIG = {
  userPost: {
    selectPost: (selector, username) => selector.post.getUserPostList(username),
    fetch: (actions, username) => actions.getPostList(username),
    hasMore: (selector, username) => selector.post.getUserPostListHasMore(username),
    loading: (selector) => selector.loading.getUserPostFetchingLoading(),
    emptyMessage: "Người dùng này chưa có bài viết nào",
  },
  savedPost: {
    selectPost: (selector) => selector.post.getSavedPostList(),
    fetch: (actions) => actions.getSavedPostList(),
    hasMore: (selector) => selector.post.getSavedPostListHasMore(),
    loading: (selector) => selector.loading.getSavedPostFetchingLoading(),
    emptyMessage: "Bạn chưa lưu bài viết nào",
  },
};

export default function PostList({ variant = "userPost" }) {
  const { profileUsername } = useAuth();
  const { actions, selector } = usePostContext();
  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.userPost;
  const [hasUserScrolled, setHasUserScrolled] = useState(false);

  const posts = useMemo(() => {
    if (variant === "userPost" && !profileUsername) return [];
    return config.selectPost(selector, profileUsername) ?? [];
  }, [config, profileUsername, selector, variant]);

  const hasMore = config.hasMore(selector, profileUsername);
  const isLoading = config.loading(selector);
  const isEmpty = posts.length === 0;
  const isInitLoading = isLoading && isEmpty;
  const isLoadMore = isLoading && !isEmpty;
  const showNoPost = hasMore === false && !isLoading && isEmpty;
  const shouldInitFetch = hasMore === undefined;
  const enableInfiniteScroll = hasUserScrolled && Boolean(hasMore);
  const showLoadMoreButton = Boolean(hasMore) && !isLoading && !hasUserScrolled && !isEmpty;

  const targetRef = useInfiniteScroll({
    hasMore: enableInfiniteScroll,
    loading: isLoading,
    onLoadMore: () => config.fetch(actions, profileUsername),
    rootMargin: "0px",
  });

  useEffect(() => {
    const markScrolled = () => {
      setHasUserScrolled(true);
    };

    window.addEventListener("scroll", markScrolled, true);
    window.addEventListener("wheel", markScrolled, { passive: true });
    window.addEventListener("touchmove", markScrolled, { passive: true });

    return () => {
      window.removeEventListener("scroll", markScrolled, true);
      window.removeEventListener("wheel", markScrolled);
      window.removeEventListener("touchmove", markScrolled);
    };
  }, []);

  useEffect(() => {
    if (variant === "userPost" && !profileUsername) return;
    if (isLoading || !shouldInitFetch) return;

    config.fetch(actions, profileUsername);
  }, [actions, config, isLoading, profileUsername, shouldInitFetch, variant]);

  return (
    <Box>
      {posts.map((post) =>
        resolveIsSharePost(post) && variant ==='userPost' ? (
          <SharePost key={post.id} post={post} />
        ) : (
          <Post key={post.id} post={post} />
        )
      )}

      {showNoPost && <NoPost message={config.emptyMessage} />}

      {showLoadMoreButton && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            onClick={() => config.fetch(actions, profileUsername)}
            variant="secondary"
          >
            Tải thêm
          </Button>
        </Box>
      )}

      <div ref={targetRef} />
      {isInitLoading && <LoadingGetPost count={2} />}
      {isLoadMore && <LoadingGetPost count={1} />}
    </Box>
  );
}
