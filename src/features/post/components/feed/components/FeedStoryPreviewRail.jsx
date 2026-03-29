import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Surface from "../../../../../components/common/Surface";
import useAuth from "../../../../../core/auth/useAuth";
import { usePostModal } from "../../../provider/usePostModal";
import { usePostContext } from "../../../hooks";
import { STORY_MEDIA_KIND } from "../../story/CreateStoryModal/storyComposer";
import { buildStoryRoute } from "../../story/storyRoute";
import {
  formatStoryCardTime,
  resolveStoryCardGradient,
  resolveStoryCardText,
  resolveStoryPrimaryMedia,
} from "../../story/StoryCard/utils/storyCard.utils";
import { style } from "../style";

const sx = style.feed;

const FEED_STORY_TEXT = {
  title: "Bảng tin",
  subtitle: "Xem nhanh story của bạn và bạn bè ngay từ đầu bảng tin.",
  createTitle: "Tạo tin",
  createCaption: "Chia sẻ khoảnh khắc",
};

const sortStoriesByNewest = (stories = []) => (
  [...stories].sort((left, right) => (
    new Date(right?.time?.createdAt || 0) - new Date(left?.time?.createdAt || 0)
  ))
);

const buildStoryEntry = ({
  stories = [],
  username = null,
} = {}) => {
  if (!username) return null;

  const sortedStories = sortStoriesByNewest(stories);
  const latestStory = sortedStories[0] || null;

  if (!latestStory) return null;

  return {
    username,
    displayName: latestStory.author?.displayName || latestStory.author?.username || username,
    avatarUrl: latestStory.author?.avatarUrl || undefined,
    latestStoryId: latestStory.id,
    latestStoryTime: latestStory.time?.createdAt || null,
    previewStory: latestStory,
    storyCount: sortedStories.length,
  };
};

function FeedStoryCreateCard({ avatarUrl, onClick }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={(theme) => sx.storyCreateCard(theme)}
    >
      <Box sx={sx.storyCreateCover(avatarUrl)} />

      <Box sx={(theme) => sx.storyCreateFooter(theme)}>
        <Box sx={(theme) => sx.storyCreatePlus(theme)}>
          <AddRoundedIcon />
        </Box>

        <Typography sx={sx.storyCreateTitle}>
          {FEED_STORY_TEXT.createTitle}
        </Typography>
        <Typography sx={(theme) => sx.storyCreateCaption(theme)}>
          {FEED_STORY_TEXT.createCaption}
        </Typography>
      </Box>
    </Box>
  );
}

function FeedStoryCard({ entry, onClick }) {
  const media = resolveStoryPrimaryMedia(entry?.previewStory);
  const previewText = resolveStoryCardText(entry?.previewStory);
  const background = resolveStoryCardGradient(entry?.previewStory);
  const previewTime = formatStoryCardTime(entry?.latestStoryTime);

  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={sx.storyPreviewCard}
    >
      <Box sx={sx.storyPreviewBackdrop(background)} />

      {media.kind === STORY_MEDIA_KIND.IMAGE && media.src ? (
        <Box
          component="img"
          src={media.src}
          alt={entry.displayName}
          sx={sx.storyPreviewMedia}
        />
      ) : null}

      {media.kind === STORY_MEDIA_KIND.VIDEO && media.src ? (
        <Box
          component="video"
          src={media.src}
          muted
          playsInline
          preload="metadata"
          sx={sx.storyPreviewMedia}
        />
      ) : null}

      {media.kind === STORY_MEDIA_KIND.SOUND ? (
        <Box sx={sx.storyPreviewFallbackIcon}>
          <GraphicEqRoundedIcon />
        </Box>
      ) : null}

      {media.kind === STORY_MEDIA_KIND.VIDEO ? (
        <Box sx={sx.storyPreviewFallbackIcon}>
          <PlayArrowRoundedIcon />
        </Box>
      ) : null}

      {media.kind === STORY_MEDIA_KIND.NONE && !previewText ? (
        <Box sx={sx.storyPreviewFallbackIcon}>
          <AutoStoriesRoundedIcon />
        </Box>
      ) : null}

      <Box sx={sx.storyPreviewOverlay} />

      <Box sx={sx.storyPreviewTop}>
        <Avatar
          src={entry.avatarUrl}
          alt={entry.displayName}
          sx={sx.storyPreviewAvatar}
        />

        <Box sx={sx.storyPreviewCount}>
          {entry.storyCount}
        </Box>
      </Box>

      <Box sx={sx.storyPreviewBottom}>
        <Typography sx={sx.storyPreviewName}>
          {entry.displayName}
        </Typography>
        <Typography sx={sx.storyPreviewTime}>
          {previewTime}
        </Typography>

        {previewText ? (
          <Typography sx={sx.storyPreviewText}>
            {previewText}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}

export default function FeedStoryPreviewRail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = usePostModal();
  const { user } = useAuth();
  const {
    actions: { getCurrentStory, getFriendStory },
    selector: {
      story: {
        getCurrentStoryListOf,
        getFriendStoryIdsMap,
        getFriendStoryListOf,
      },
    },
  } = usePostContext();
  const hasRequestedCurrentStoryRef = useRef(false);
  const hasRequestedFriendStoriesRef = useRef(false);
  const myStories = getCurrentStoryListOf(user?.username);
  const myStoryEntry = useMemo(() => (
    buildStoryEntry({
      username: user?.username,
      stories: myStories,
    })
  ), [myStories, user?.username]);

  const friendStoryMap = getFriendStoryIdsMap();
  const storyNavigationState = useMemo(() => ({
    ...(location.state && typeof location.state === "object" ? location.state : {}),
    backgroundLocation: location,
  }), [location]);
  const friendEntries = useMemo(() => {
    return Object.keys(friendStoryMap)
      .map((username) => buildStoryEntry({
        username,
        stories: getFriendStoryListOf(username),
      }))
      .filter(Boolean)
      .sort((left, right) => (
        new Date(right.latestStoryTime || 0) - new Date(left.latestStoryTime || 0)
      ));
  }, [friendStoryMap, getFriendStoryListOf]);

  useEffect(() => {
    if (!user?.username) return;
    if (hasRequestedCurrentStoryRef.current) return;
    if (myStoryEntry) return;

    hasRequestedCurrentStoryRef.current = true;
    getCurrentStory(user.username);
  }, [getCurrentStory, myStoryEntry, user?.username]);

  useEffect(() => {
    if (hasRequestedFriendStoriesRef.current) return;
    if (friendEntries.length > 0) return;

    hasRequestedFriendStoriesRef.current = true;
    getFriendStory();

    return () => {
      return undefined;
    };
  }, [friendEntries.length, getFriendStory]);

  if (!user) return null;

  return (
    <Box sx={sx.storyRailWrap}>
      <Surface variant="default" sx={(theme) => sx.storyRailSurface(theme)}>
        <Box sx={sx.storyRailHeader}>
          <Box sx={sx.storyRailHeaderText}>
            <Typography sx={sx.storyRailTitle}>
              {FEED_STORY_TEXT.title}
            </Typography>
          </Box>
        </Box>

        <Box sx={sx.storyRailList}>
          <FeedStoryCreateCard
            avatarUrl={user?.avatarUrl || undefined}
            onClick={() => openModal("create_story_modal")}
          />

          {myStoryEntry ? (
            <FeedStoryCard
              key={myStoryEntry.username}
              entry={myStoryEntry}
              onClick={() => navigate(
                buildStoryRoute("current", myStoryEntry.username, myStoryEntry.latestStoryId),
                {
                  state: storyNavigationState,
                }
              )}
            />
          ) : null}

          {friendEntries.map((entry) => (
            <FeedStoryCard
              key={entry.username}
              entry={entry}
              onClick={() => navigate(
                buildStoryRoute("current", entry.username, entry.latestStoryId),
                {
                  state: storyNavigationState,
                }
              )}
            />
          ))}
        </Box>
      </Surface>
    </Box>
  );
}
