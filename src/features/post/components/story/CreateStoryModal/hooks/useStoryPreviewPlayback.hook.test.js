import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useStoryPreviewPlayback } from "./useStoryPreviewPlayback";
import { STORY_MEDIA_KIND, STORY_MODE } from "../storyComposer";

describe("useStoryPreviewPlayback", () => {
  it("initializes paused state and progress", () => {
    const { result } = renderHook(() =>
      useStoryPreviewPlayback({
        mediaKind: STORY_MEDIA_KIND.IMAGE,
        mediaUrl: "",
        mode: STORY_MODE.IMAGE,
        playbackSeconds: 5,
      })
    );

    expect(result.current.isPaused).toBe(false);
    expect(result.current.progressSeconds).toBe(0);
    expect(result.current.showPlaybackControls).toBe(true);
  });

  it("respects forcedPaused flag", () => {
    const { result } = renderHook(() =>
      useStoryPreviewPlayback({
        forcedPaused: true,
        mediaKind: STORY_MEDIA_KIND.VIDEO,
        mediaUrl: "video.mp4",
        mode: STORY_MODE.VIDEO,
        playbackSeconds: 10,
      })
    );

    expect(result.current.effectivePaused).toBe(true);
  });

  it("toggles pause state", () => {
    const { result } = renderHook(() =>
      useStoryPreviewPlayback({
        mediaKind: STORY_MEDIA_KIND.IMAGE,
        mediaUrl: "",
        mode: STORY_MODE.IMAGE,
        playbackSeconds: 5,
      })
    );

    act(() => {
      result.current.togglePause();
    });

    expect(result.current.isPaused).toBe(true);

    act(() => {
      result.current.togglePause();
    });

    expect(result.current.isPaused).toBe(false);
  });

  it("seeks within playback duration", () => {
    const { result } = renderHook(() =>
      useStoryPreviewPlayback({
        mediaKind: STORY_MEDIA_KIND.IMAGE,
        mediaUrl: "",
        mode: STORY_MODE.IMAGE,
        playbackSeconds: 5,
      })
    );

    act(() => {
      result.current.seekPreview(3);
    });

    expect(result.current.progressSeconds).toBe(3);

    act(() => {
      result.current.seekPreview(99);
    });

    expect(result.current.progressSeconds).toBe(5);
  });

  it("hides playback controls for empty mode", () => {
    const { result } = renderHook(() =>
      useStoryPreviewPlayback({
        mediaKind: STORY_MEDIA_KIND.NONE,
        mediaUrl: "",
        mode: STORY_MODE.EMPTY,
        playbackSeconds: 0,
      })
    );

    expect(result.current.showPlaybackControls).toBe(false);
  });
});
