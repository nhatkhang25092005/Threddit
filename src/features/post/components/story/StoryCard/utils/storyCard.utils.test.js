import { describe, expect, it } from "vitest";
import { STORY_MEDIA_KIND } from "../../CreateStoryModal/storyComposer";
import {
  detectStoryCardMediaKind,
  formatStoryCardTime,
  resolveStoryCardGradient,
  resolveStoryCardText,
  resolveStoryPrimaryMedia,
} from "./storyCard.utils";

describe("storyCard.utils", () => {
  describe("detectStoryCardMediaKind", () => {
    it("detects media kind from content type", () => {
      expect(detectStoryCardMediaKind("image/jpeg")).toBe(STORY_MEDIA_KIND.IMAGE);
      expect(detectStoryCardMediaKind("video/mp4")).toBe(STORY_MEDIA_KIND.VIDEO);
      expect(detectStoryCardMediaKind("audio/wav")).toBe(STORY_MEDIA_KIND.SOUND);
    });

    it("detects media kind from file extension in src", () => {
      expect(detectStoryCardMediaKind("", "photo.png")).toBe(STORY_MEDIA_KIND.IMAGE);
      expect(detectStoryCardMediaKind("", "clip.mp4")).toBe(STORY_MEDIA_KIND.VIDEO);
      expect(detectStoryCardMediaKind("", "track.mp3")).toBe(STORY_MEDIA_KIND.SOUND);
    });

    it("returns NONE when type and src are unknown", () => {
      expect(detectStoryCardMediaKind("", "")).toBe(STORY_MEDIA_KIND.NONE);
    });
  });

  describe("resolveStoryPrimaryMedia", () => {
    it("resolves first media file from mediaFiles array", () => {
      const result = resolveStoryPrimaryMedia({
        mediaFiles: [{ url: "a.jpg", contentType: "image/png" }],
      });

      expect(result.kind).toBe(STORY_MEDIA_KIND.IMAGE);
      expect(result.src).toBe("a.jpg");
    });

    it("returns empty media when story has no media", () => {
      const result = resolveStoryPrimaryMedia({});
      expect(result.kind).toBe(STORY_MEDIA_KIND.NONE);
      expect(result.src).toBe("");
    });
  });

  describe("resolveStoryCardText", () => {
    it("returns trimmed text from story", () => {
      expect(resolveStoryCardText({ text: "  hello  " })).toBe("hello");
    });

    it("falls back to name field", () => {
      expect(resolveStoryCardText({ name: "story name" })).toBe("story name");
    });

    it("returns empty string for missing text", () => {
      expect(resolveStoryCardText({})).toBe("");
    });
  });

  describe("formatStoryCardTime", () => {
    it("returns just-now label for invalid date", () => {
      expect(formatStoryCardTime(null)).toBeTruthy();
      expect(formatStoryCardTime("invalid")).toBeTruthy();
    });

    it("formats valid date", () => {
      const formatted = formatStoryCardTime("2026-01-15T10:30:00.000Z");
      expect(formatted).toMatch(/\d/);
    });
  });

  describe("resolveStoryCardGradient", () => {
    it("returns story gradient when provided", () => {
      expect(resolveStoryCardGradient({ gradient: "linear-gradient(red, blue)" }))
        .toBe("linear-gradient(red, blue)");
    });

    it("returns default gradient when missing", () => {
      expect(resolveStoryCardGradient({})).toContain("linear-gradient");
    });
  });
});
