import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Surface from "../../../../../components/common/Surface";
import { feedText } from "../../../../../constant/text/vi/post/feed.text";
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
const STORY_SCROLL_EPSILON = 4;

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
      data-feed-story-card="true"
      sx={(theme) => sx.storyCreateCard(theme)}
    >
      <Box sx={sx.storyCreateCover(avatarUrl)} />

      <Box sx={(theme) => sx.storyCreateFooter(theme)}>
        <Box sx={(theme) => sx.storyCreatePlus(theme)}>
          <AddRoundedIcon />
        </Box>

        <Typography sx={sx.storyCreateTitle}>
          {feedText.storyRail.createTitle}
        </Typography>
        <Typography sx={(theme) => sx.storyCreateCaption(theme)}>
          {feedText.storyRail.createCaption}
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
      data-feed-story-card="true"
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
  const railRef = useRef(null);
  const [storyRailNavState, setStoryRailNavState] = useState({
    canScrollPrev: false,
    canScrollNext: false,
  });
  const myStories = getCurrentStoryListOf(user?.username);
  const myStoryEntry = useMemo(() => (
    buildStoryEntry({
      username: user?.username,
      stories: myStories,
    })
  ), [myStories, user?.username]);

  const friendStoryMap = getFriendStoryIdsMap();
  const hasFriendStories = Object.keys(friendStoryMap).length > 0;
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
  const totalStoryCards = 1 + (myStoryEntry ? 1 : 0) + friendEntries.length;

  const syncStoryRailNavState = useCallback(() => {
    const railNode = railRef.current;

    if (!railNode) {
      setStoryRailNavState({
        canScrollPrev: false,
        canScrollNext: false,
      });
      return;
    }

    const maxScrollLeft = Math.max(railNode.scrollWidth - railNode.clientWidth, 0);
    const nextState = {
      canScrollPrev: railNode.scrollLeft > STORY_SCROLL_EPSILON,
      canScrollNext: railNode.scrollLeft < maxScrollLeft - STORY_SCROLL_EPSILON,
    };

    setStoryRailNavState((prevState) => (
      prevState.canScrollPrev === nextState.canScrollPrev
      && prevState.canScrollNext === nextState.canScrollNext
        ? prevState
        : nextState
    ));
  }, []);

  const resolveStoryScrollStep = useCallback(() => {
    const railNode = railRef.current;
    if (!railNode) return 0;

    const firstStoryCard = railNode.querySelector('[data-feed-story-card="true"]');
    const computedStyle = window.getComputedStyle(railNode);
    const gap = Number.parseFloat(computedStyle.columnGap || computedStyle.gap || "0");

    if (firstStoryCard instanceof HTMLElement) {
      return firstStoryCard.getBoundingClientRect().width + gap;
    }

    return railNode.clientWidth * 0.72;
  }, []);

  const scrollStoryRail = useCallback((direction) => {
    const railNode = railRef.current;
    if (!railNode) return;

    const step = resolveStoryScrollStep();
    if (!step) return;

    railNode.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  }, [resolveStoryScrollStep]);

  useEffect(() => {
    hasRequestedCurrentStoryRef.current = false;
    hasRequestedFriendStoriesRef.current = false;
  }, [user?.username]);

  useEffect(() => {
    if (!user?.username) return;
    if (hasRequestedCurrentStoryRef.current) return;
    if (myStoryEntry) return;

    hasRequestedCurrentStoryRef.current = true;
    getCurrentStory(user.username).then((response) => {
      if (!response?.success) {
        hasRequestedCurrentStoryRef.current = false;
      }
    });
  }, [getCurrentStory, myStoryEntry, user?.username]);

  useEffect(() => {
    if (!user?.username) return;
    if (hasRequestedFriendStoriesRef.current) return;
    if (hasFriendStories) return;

    hasRequestedFriendStoriesRef.current = true;
    getFriendStory().then((response) => {
      if (!response?.success) {
        hasRequestedFriendStoriesRef.current = false;
      }
    });

    return () => {
      return undefined;
    };
  }, [getFriendStory, hasFriendStories, user?.username]);

  useEffect(() => {
    const railNode = railRef.current;
    if (!railNode) return undefined;

    const handleScroll = () => {
      syncStoryRailNavState();
    };
    const handleResize = () => {
      syncStoryRailNavState();
    };
    const rafId = window.requestAnimationFrame(syncStoryRailNavState);

    railNode.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    let resizeObserver = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        syncStoryRailNavState();
      });
      resizeObserver.observe(railNode);
      Array.from(railNode.children).forEach((child) => {
        if (child instanceof HTMLElement) {
          resizeObserver.observe(child);
        }
      });
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      railNode.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, [syncStoryRailNavState, totalStoryCards]);

  if (!user) return null;

  return (
    <Box sx={sx.storyRailWrap}>
      <Surface variant="default" sx={(theme) => sx.storyRailSurface(theme)}>
        <Box sx={sx.storyRailHeader}>
          <Box sx={sx.storyRailHeaderText}>
            <Typography sx={sx.storyRailTitle}>
              {feedText.storyRail.title}
            </Typography>
          </Box>

          {storyRailNavState.canScrollPrev || storyRailNavState.canScrollNext ? (
            <Box sx={sx.storyRailActions}>
              <IconButton
                aria-label={feedText.storyRail.previousAriaLabel}
                onClick={() => scrollStoryRail("prev")}
                disabled={!storyRailNavState.canScrollPrev}
                sx={(theme) => sx.storyRailNavButton(theme)}
              >
                <ChevronLeftRoundedIcon />
              </IconButton>

              <IconButton
                aria-label={feedText.storyRail.nextAriaLabel}
                onClick={() => scrollStoryRail("next")}
                disabled={!storyRailNavState.canScrollNext}
                sx={(theme) => sx.storyRailNavButton(theme)}
              >
                <ChevronRightRoundedIcon />
              </IconButton>
            </Box>
          ) : null}
        </Box>

        <Box ref={railRef} sx={sx.storyRailList}>
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
