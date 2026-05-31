import { describe, expect, it } from "vitest";
import {
  STORY_DURATION_RULES,
  STORY_MEDIA_KIND,
  STORY_MODE,
  detectStoryMediaKind,
  formatStoryDuration,
  getPlaybackSeconds,
  getStoryModeLabel,
  hasStoryText,
  isStoryDescriptionBelowMedia,
  isStorySubmissionReady,
  isTimedStoryMedia,
  isVisualStoryMedia,
  resolveStoryMode,
  shouldRenderStoryTextOnCanvas,
} from "./storyComposer";

describe("storyComposer", () => {
  describe("hasStoryText", () => {
    it("returns true for non-empty trimmed text", () => {
      expect(hasStoryText("hello")).toBe(true);
    });

    it("returns false for empty or whitespace-only text", () => {
      expect(hasStoryText("")).toBe(false);
      expect(hasStoryText("   ")).toBe(false);
    });
  });

  describe("detectStoryMediaKind", () => {
    it("detects image, video and sound content types", () => {
      expect(detectStoryMediaKind("image/png")).toBe(STORY_MEDIA_KIND.IMAGE);
      expect(detectStoryMediaKind("video/mp4")).toBe(STORY_MEDIA_KIND.VIDEO);
      expect(detectStoryMediaKind("audio/mpeg")).toBe(STORY_MEDIA_KIND.SOUND);
    });

    it("returns NONE for unknown content type", () => {
      expect(detectStoryMediaKind("application/pdf")).toBe(STORY_MEDIA_KIND.NONE);
    });
  });

  describe("isStorySubmissionReady", () => {
    it("returns true when content or media is valid", () => {
      expect(isStorySubmissionReady({ text: "My story" })).toBe(true);
      expect(isStorySubmissionReady({ text: "", media: { url: "a.jpg" } })).toBe(true);
    });

    it("returns false when text is empty and no media", () => {
      expect(isStorySubmissionReady({ text: "", media: null })).toBe(false);
      expect(isStorySubmissionReady({ text: "  ", media: null })).toBe(false);
    });
  });

  describe("resolveStoryMode", () => {
    it("resolves text-only and empty modes", () => {
      expect(resolveStoryMode({ text: "hello" })).toBe(STORY_MODE.TEXT);
      expect(resolveStoryMode({ text: "" })).toBe(STORY_MODE.EMPTY);
    });

    it("resolves image and image+text modes", () => {
      expect(resolveStoryMode({
        mediaKind: STORY_MEDIA_KIND.IMAGE,
      })).toBe(STORY_MODE.IMAGE);

      expect(resolveStoryMode({
        text: "caption",
        mediaKind: STORY_MEDIA_KIND.IMAGE,
      })).toBe(STORY_MODE.IMAGE_TEXT);
    });

    it("resolves video and sound modes", () => {
      expect(resolveStoryMode({
        mediaKind: STORY_MEDIA_KIND.VIDEO,
      })).toBe(STORY_MODE.VIDEO);

      expect(resolveStoryMode({
        text: "voice note",
        mediaKind: STORY_MEDIA_KIND.SOUND,
      })).toBe(STORY_MODE.SOUND_TEXT);
    });
  });

  describe("getPlaybackSeconds", () => {
    it("returns static seconds for non-timed media", () => {
      expect(getPlaybackSeconds({
        mediaKind: STORY_MEDIA_KIND.IMAGE,
      })).toBe(STORY_DURATION_RULES.staticSeconds);
    });

    it("returns source duration for timed media", () => {
      expect(getPlaybackSeconds({
        mediaKind: STORY_MEDIA_KIND.VIDEO,
        sourceDuration: 12.5,
      })).toBe(12.5);
    });

    it("returns 0 for invalid timed media duration", () => {
      expect(getPlaybackSeconds({
        mediaKind: STORY_MEDIA_KIND.SOUND,
        sourceDuration: -1,
      })).toBe(0);
    });
  });

  describe("formatStoryDuration", () => {
    it("returns placeholder for invalid values", () => {
      expect(formatStoryDuration(0)).toBe("--");
      expect(formatStoryDuration(-5)).toBe("--");
    });

    it("formats seconds under 60", () => {
      expect(formatStoryDuration(5)).toBe("5s");
    });

    it("formats minutes and seconds at 60+ seconds", () => {
      expect(formatStoryDuration(65)).toBe("1:05");
    });
  });

  describe("media kind helpers", () => {
    it("identifies timed and visual media kinds", () => {
      expect(isTimedStoryMedia(STORY_MEDIA_KIND.VIDEO)).toBe(true);
      expect(isTimedStoryMedia(STORY_MEDIA_KIND.IMAGE)).toBe(false);
      expect(isVisualStoryMedia(STORY_MEDIA_KIND.IMAGE)).toBe(true);
      expect(isVisualStoryMedia(STORY_MEDIA_KIND.SOUND)).toBe(false);
    });
  });

  describe("layout helpers", () => {
    it("determines description and canvas text placement", () => {
      expect(isStoryDescriptionBelowMedia(STORY_MODE.IMAGE_TEXT)).toBe(true);
      expect(isStoryDescriptionBelowMedia(STORY_MODE.TEXT)).toBe(false);
      expect(shouldRenderStoryTextOnCanvas(STORY_MODE.TEXT)).toBe(true);
      expect(shouldRenderStoryTextOnCanvas(STORY_MODE.IMAGE)).toBe(false);
    });

    it("returns a label for each mode", () => {
      expect(getStoryModeLabel(STORY_MODE.EMPTY)).toBeTruthy();
      expect(getStoryModeLabel(STORY_MODE.VIDEO_TEXT)).toBeTruthy();
    });
  });
});
