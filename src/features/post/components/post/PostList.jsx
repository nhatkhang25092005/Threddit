import { usePostContext } from "../../hooks/usePostContext";
import useAuth from "../../../../core/auth/useAuth";
import { Box } from "@mui/material";
import { useEffect, useMemo } from "react";
import Post from "./Post/Post"
import SharePost from "./SharePost"
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll'
import LoadingGetPost from "./LoadingGetPost";
import NoPost from "./NoPost";
const VARIANT_CONFIG = {
  userPost: {
    selectPost: (selector, username) => selector.post.getUserPostList(username),
    fetch: (actions, username) => actions.getPostList(username),
    hasMore: (selector, username) => selector.post.getUserPostListHasMore(username),
    loading: (selector) => selector.loading.getUserPostFetchingLoading()
  },
  // saved: {
  //   selectTimeline: (selector, username) => selector.timeline.getSavedPostList(username),
  //   fetch: (actions, username) => actions.getSavedPostList(username),
  // },
}
export default function PostList({ variant = "userPost" }) {
  const { profileUsername } = useAuth();
  const { actions, selector} = usePostContext()
  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.userPost
  const timelines = useMemo(() => {
    if (!profileUsername) return [];

    return config.selectPost(selector, profileUsername) ?? [];
  }, [profileUsername, selector, config]);

  const posts = useMemo(() => timelines, [timelines]);
  const isLoading = config.loading(selector)
  const isEmpty = posts.length === 0
  const isInitLoading = isLoading && isEmpty
  const isLoadMore = isLoading && !isEmpty
  const showNoPost = !isLoading && isEmpty


  const targetRef = useInfiniteScroll({
    hasMore:config.hasMore(selector, profileUsername),
    loading:isLoading,
    onLoadMore:()=>config.fetch(actions,profileUsername)
  })

  useEffect(() => {
    if (!profileUsername) return;
    config.fetch(actions, profileUsername);
  }, [profileUsername, actions, config]);

  return (
    <Box>
      {posts.map((post) => (
          post?.viewer?.isShared
            ? <SharePost key={post.id} post={post} />
            : <Post key={post.id} post={post} />
      ))}
      { showNoPost && <NoPost message={'Người dùng này chưa có bài viết nào'}/>}
      
      <div ref={targetRef}/>
      {isInitLoading && <LoadingGetPost count={2} />}
      {isLoadMore && <LoadingGetPost count={1} />}
    </Box>
  );
}
