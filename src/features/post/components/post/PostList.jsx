import { usePostContext } from "../../hooks/usePostContext";
import useAuth from "../../../../core/auth/useAuth";
import { Box } from "@mui/material";
import { useEffect, useMemo } from "react";
import Post from "./Post/Post"

const VARIANT_CONFIG = {
  userPost: {
    selectPost: (selector, username) => selector.post.getUserPostList(username),
    fetch: (actions, username) => actions.getPostList(username),
  },
  // saved: {
  //   selectTimeline: (selector, username) => selector.timeline.getSavedPostList(username),
  //   fetch: (actions, username) => actions.getSavedPostList(username),
  // },
}
export default function PostList({ variant = "userPost" }) {
  const { profileUsername } = useAuth();

  const { actions, selector } = usePostContext();

  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.userPost;

  const timelines = useMemo(() => {
    if (!profileUsername) return [];
    return config.selectPost(selector, profileUsername) ?? [];
  }, [profileUsername, selector, config]);

  const posts = useMemo(() => timelines.filter(Boolean), [timelines]);

  useEffect(() => {
    if (!profileUsername) return;
    config.fetch(actions, profileUsername);
  }, [profileUsername, actions, config]);

  return (
    <Box>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Box>
  );
}
