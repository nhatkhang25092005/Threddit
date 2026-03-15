import { useCallback, useEffect, useRef, useState } from "react";
import { STORY_MEDIA_KIND, STORY_MODE, isTimedStoryMedia } from "../storyComposer";
import {
  clampStoryPlaybackProgress,
  pauseStoryMedia,
  playStoryMedia,
} from "../utils";

export function useStoryPreviewPlayback({
  forcedPaused = false,
  loop = true,
  mediaKind,
  mediaUrl,
  mode,
  onComplete,
  playbackSeconds,
}) {
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const staticTimerRef = useRef(null);
  const staticStartedAtRef = useRef(0);
  const staticProgressRef = useRef(0);
  const completedRef = useRef(false);
  const completeHandlerRef = useRef(onComplete);
  const [isPaused, setIsPaused] = useState(false);
  const [progressSeconds, setProgressSeconds] = useState(0);
  const isTimedPreview = isTimedStoryMedia(mediaKind);
  const showPlaybackControls = mode !== STORY_MODE.EMPTY && playbackSeconds > 0;
  const effectivePaused = isPaused || forcedPaused;

  useEffect(() => {
    completeHandlerRef.current = onComplete;
  }, [onComplete]);

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

      if (clampedValue < playbackSeconds) {
        completedRef.current = false;
      }

      if (activeElement) {
        activeElement.currentTime = clampedValue;
      }

      if (!isTimedPreview) {
        staticStartedAtRef.current = Date.now() - clampedValue * 1000;
      }

      return clampedValue;
    },
    [getActiveMediaElement, isTimedPreview, playbackSeconds, updateProgress]
  );

  const finishPlayback = useCallback(() => {
    if (completedRef.current) return;

    completedRef.current = true;
    setIsPaused(true);
    completeHandlerRef.current?.();
  }, []);

  useEffect(() => {
    completedRef.current = false;
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

    if (!showPlaybackControls || isTimedPreview || effectivePaused) {
      return undefined;
    }

    staticStartedAtRef.current = Date.now() - staticProgressRef.current * 1000;
    staticTimerRef.current = window.setInterval(() => {
      const elapsedSeconds = (Date.now() - staticStartedAtRef.current) / 1000;

      if (!loop && elapsedSeconds >= playbackSeconds) {
        updateProgress(playbackSeconds);
        window.clearInterval(staticTimerRef.current);
        staticTimerRef.current = null;
        finishPlayback();
        return;
      }

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
  }, [effectivePaused, finishPlayback, isTimedPreview, loop, mediaUrl, mode, playbackSeconds, showPlaybackControls, updateProgress]);

  useEffect(() => {
    const activeElement = getActiveMediaElement();

    if (!showPlaybackControls || !isTimedPreview || !activeElement) {
      return;
    }

    if (activeElement.currentTime >= playbackSeconds) {
      activeElement.currentTime = 0;
    }

    if (effectivePaused) {
      pauseStoryMedia(activeElement);
      return;
    }

    playStoryMedia(activeElement);
  }, [
    getActiveMediaElement,
    effectivePaused,
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
        if (!loop) {
          updateProgress(playbackSeconds);
          pauseStoryMedia(activeElement);
          finishPlayback();
          return;
        }

        seekPreview(0);
        activeElement.currentTime = 0;

        if (!effectivePaused) {
          playStoryMedia(activeElement);
        }

        return;
      }

      updateProgress(activeElement.currentTime);
    },
    [effectivePaused, finishPlayback, loop, playbackSeconds, seekPreview, updateProgress]
  );

  const handleTogglePlayback = useCallback(() => {
    if (!showPlaybackControls || forcedPaused) return;

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
    forcedPaused,
  ]);

  const handleProgressChange = useCallback(
    (_, nextValue) => {
      if (Array.isArray(nextValue) || !showPlaybackControls) return;

      const nextProgress = seekPreview(nextValue);
      const activeElement = getActiveMediaElement();

      if (activeElement && !effectivePaused) {
        activeElement.currentTime = nextProgress;
        playStoryMedia(activeElement);
      }
    },
    [effectivePaused, getActiveMediaElement, seekPreview, showPlaybackControls]
  );

  return {
    audioRef,
    handleProgressChange,
    handleTimedMediaProgress,
    handleTogglePlayback,
    isPaused: effectivePaused,
    progressSeconds,
    showPlaybackControls,
    videoRef,
  };
}
