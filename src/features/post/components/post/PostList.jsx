import { usePostContext } from "../../hooks/usePostContext";
import useAuth from "../../../../core/auth/useAuth";
import { Box } from "@mui/material";
import { useEffect, useMemo } from "react";
import Post from "./Post/Post"

function useJoinedPosts({ timelines, postById }) {
  return useMemo(() => {
    return timelines
      .map((t) => {
        const content = postById?.[t.contentId];
        if (!content) return null;

        return {
          ...t,
          ...content,
          contentCreatedAt: content.createdAt,
          contentUpdatedAt: content.updatedAt,
          commentNumber: content.stats?.commentNumber ?? 0,
          saveNumber: content.stats?.saveNumber ?? 0,
          shareNumber: content.stats?.shareNumber ?? 0,
          reactionNumber: content.stats?.reactionNumber ?? 0,
          isSaved: content.viewer?.isSaved ?? false,
          reaction: content.viewer?.reaction ?? null,
        };
      })
      .filter(Boolean);
  }, [timelines, postById]);
}

const VARIANT_CONFIG = {
  userPost: {
    selectTimeline: (selector, username) => selector.timeline.getUserTimelineList(username),
    fetch: (actions, username) => actions.getPostList(username),
  },
  // saved: {
  //   selectTimeline: (selector, username) => selector.timeline.getSavedTimelineList(username),
  //   fetch: (actions, username) => actions.getSavedPostList(username),
  // },
}
export default function PostList({ variant = "userPost" }) {
  const { profileUsername } = useAuth();

  const { state, actions, selector } = usePostContext();

  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.posts;

  const timelines = useMemo(() => {
    if (!profileUsername) return [];
    return config.selectTimeline(selector, profileUsername) ?? [];
  }, [profileUsername, selector, config]);

  const posts = useJoinedPosts({ timelines, postById: state.postById });

  useEffect(() => {
    if (!profileUsername) return;
    config.fetch(actions, profileUsername);
  }, [profileUsername, actions, config]);

  return (
    <Box>
      {posts.map((post) => (
        <Post key={post.timelineItemId || post.contentId} post={post} />
      ))}
    </Box>
  );
}