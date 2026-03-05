import { usePostContext } from "../../hooks/usePostContext";
import useAuth from "../../../../core/auth/useAuth";
import { Box } from "@mui/material";
import { useEffect, useMemo } from "react";
import Post from "./Post/Post"
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll'
import LoadingGetPost from "./LoadingGetPost";

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

  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.userPost;
  const targetRef = useInfiniteScroll({
    hasMore:config.hasMore(selector, profileUsername),
    loading:config.loading(selector),
    onLoadMore:()=>config.fetch(actions,profileUsername)
  })


  const timelines = useMemo(() => {
    if (!profileUsername) return [];

    return config.selectPost(selector, profileUsername) ?? [];
  }, [profileUsername, selector, config]);

  const posts = useMemo(() => timelines, [timelines]);
  const isLoading = config.loading(selector)

  useEffect(() => {
    if (!profileUsername) return;
    config.fetch(actions, profileUsername);
  }, [profileUsername, actions, config]);


  return (
    <Box>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <div ref={targetRef}/>
      {isLoading ? <LoadingGetPost count={posts.length > 0 ? 1 : 2} /> : null}
    </Box>
  );
}
