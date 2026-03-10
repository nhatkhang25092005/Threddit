import { useCallback, useEffect, useRef, useState } from "react";
import { STORY_MEDIA_KIND, STORY_MODE, isTimedStoryMedia } from "../storyComposer";
import {
  clampStoryPlaybackProgress,
  pauseStoryMedia,
  playStoryMedia,
} from "../utils";

export function useStoryPreviewPlayback({
  mediaKind,
  mediaUrl,
  mode,
  playbackSeconds,
}) {
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const staticTimerRef = useRef(null);
  const staticStartedAtRef = useRef(0);
  const staticProgressRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressSeconds, setProgressSeconds] = useState(0);
  const isTimedPreview = isTimedStoryMedia(mediaKind);
  const showPlaybackControls = mode !== STORY_MODE.EMPTY && playbackSeconds > 0;

  const getActiveMediaElement = useCallback(() => {
    if (mediaKind === STORY_MEDIA_KIND.VIDEO) return videoRef.current;
    if (mediaKind === STORY_MEDIA_KIND.SOUND) return audioRef.current;
    return null;
  }, [mediaKind]);

  const updateProgress = useCallback(
    (nextValue) => {
      const clampedValue = clampStoryPlaybackProgress(nextValue, playbackSeconds);

      staticProgressRef.current = clampedValue;
      setProgressSeconds(clampedValue);

      return clampedValue;
    },
    [playbackSeconds]
  );

  const seekPreview = useCallback(
    (nextValue) => {
      const clampedValue = updateProgress(nextValue);
      const activeElement = getActiveMediaElement();

      if (activeElement) {
        activeElement.currentTime = clampedValue;
      }

      if (!isTimedPreview) {
        staticStartedAtRef.current = Date.now() - clampedValue * 1000;
      }

      return clampedValue;
    },
    [getActiveMediaElement, isTimedPreview, updateProgress]
  );

  useEffect(() => {
    seekPreview(0);
    setIsPaused(false);
  }, [mediaKind, mediaUrl, mode, playbackSeconds, seekPreview]);

  useEffect(() => {
    return () => {
      if (staticTimerRef.current) {
        window.clearInterval(staticTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (staticTimerRef.current) {
      window.clearInterval(staticTimerRef.current);
      staticTimerRef.current = null;
    }

    if (!showPlaybackControls || isTimedPreview || isPaused) {
      return undefined;
    }

    staticStartedAtRef.current = Date.now() - staticProgressRef.current * 1000;
    staticTimerRef.current = window.setInterval(() => {
      const elapsedSeconds = (Date.now() - staticStartedAtRef.current) / 1000;
      const nextProgress = elapsedSeconds >= playbackSeconds
        ? elapsedSeconds % playbackSeconds
        : elapsedSeconds;

      staticProgressRef.current = nextProgress;
      setProgressSeconds(nextProgress);
    }, 100);

    return () => {
      if (staticTimerRef.current) {
        window.clearInterval(staticTimerRef.current);
        staticTimerRef.current = null;
      }
    };
  }, [isPaused, isTimedPreview, mediaUrl, mode, playbackSeconds, showPlaybackControls]);

  useEffect(() => {
    const activeElement = getActiveMediaElement();

    if (!showPlaybackControls || !isTimedPreview || !activeElement) {
      return;
    }

    if (activeElement.currentTime >= playbackSeconds) {
      activeElement.currentTime = 0;
    }

    if (isPaused) {
      pauseStoryMedia(activeElement);
      return;
    }

    playStoryMedia(activeElement);
  }, [
    getActiveMediaElement,
    isPaused,
    isTimedPreview,
    mediaKind,
    mediaUrl,
    playbackSeconds,
    showPlaybackControls,
  ]);

  const handleTimedMediaProgress = useCallback(
    (event) => {
      const activeElement = event.currentTarget;

      if (!playbackSeconds) return;

      if (activeElement.currentTime >= playbackSeconds) {
        seekPreview(0);
        activeElement.currentTime = 0;

        if (!isPaused) {
          playStoryMedia(activeElement);
        }

        return;
      }

      updateProgress(activeElement.currentTime);
    },
    [isPaused, playbackSeconds, seekPreview, updateProgress]
  );

  const handleTogglePlayback = useCallback(() => {
    if (!showPlaybackControls) return;

    const nextPaused = !isPaused;

    if (!nextPaused && progressSeconds >= playbackSeconds) {
      seekPreview(0);
    }

    const activeElement = getActiveMediaElement();

    if (activeElement) {
      if (nextPaused) {
        pauseStoryMedia(activeElement);
      } else {
        playStoryMedia(activeElement);
      }
    }

    setIsPaused(nextPaused);
  }, [
    getActiveMediaElement,
    isPaused,
    playbackSeconds,
    progressSeconds,
    seekPreview,
    showPlaybackControls,
  ]);

  const handleProgressChange = useCallback(
    (_, nextValue) => {
      if (Array.isArray(nextValue) || !showPlaybackControls) return;

      const nextProgress = seekPreview(nextValue);
      const activeElement = getActiveMediaElement();

      if (activeElement && !isPaused) {
        activeElement.currentTime = nextProgress;
        playStoryMedia(activeElement);
      }
    },
    [getActiveMediaElement, isPaused, seekPreview, showPlaybackControls]
  );

  return {
    audioRef,
    handleProgressChange,
    handleTimedMediaProgress,
    handleTogglePlayback,
    isPaused,
    progressSeconds,
    showPlaybackControls,
    videoRef,
  };
}
