import { describe, expect, it, vi } from "vitest";
import {
  clampStoryPlaybackProgress,
  clampStoryTextValue,
  getMediaActionStatusLabel,
  pauseStoryMedia,
  playStoryMedia,
  revokePreviewUrl,
} from "./utils";

describe("createStoryModal utils", () => {
  describe("clampStoryTextValue", () => {
    it("returns full text when within max length", () => {
      expect(clampStoryTextValue("hello", 10)).toBe("hello");
    });

    it("truncates text exceeding max length", () => {
      expect(clampStoryTextValue("hello world", 5)).toBe("hello");
    });

    it("returns normalized value when max length is invalid", () => {
      expect(clampStoryTextValue("hello", -1)).toBe("hello");
    });
  });

  describe("clampStoryPlaybackProgress", () => {
    it("returns 0 when playback seconds is invalid", () => {
      expect(clampStoryPlaybackProgress(5, 0)).toBe(0);
    });

    it("clamps value to playback duration", () => {
      expect(clampStoryPlaybackProgress(10, 5)).toBe(5);
      expect(clampStoryPlaybackProgress(3, 5)).toBe(3);
    });
  });

  describe("revokePreviewUrl", () => {
    it("revokes object-url media preview", () => {
      const revokeSpy = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});

      revokePreviewUrl({ origin: "object-url", url: "blob:test" });

      expect(revokeSpy).toHaveBeenCalledWith("blob:test");
      revokeSpy.mockRestore();
    });

    it("does not revoke remote media", () => {
      const revokeSpy = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});

      revokePreviewUrl({ origin: "remote", url: "https://example.com/a.jpg" });

      expect(revokeSpy).not.toHaveBeenCalled();
      revokeSpy.mockRestore();
    });
  });

  describe("pauseStoryMedia / playStoryMedia", () => {
    it("calls pause on media element", () => {
      const pause = vi.fn();
      pauseStoryMedia({ pause });
      expect(pause).toHaveBeenCalled();
    });

    it("calls play on media element and ignores play rejection", async () => {
      const play = vi.fn().mockRejectedValue(new Error("blocked"));
      playStoryMedia({ play });
      expect(play).toHaveBeenCalled();
    });

    it("does nothing when element is null", () => {
      expect(() => playStoryMedia(null)).not.toThrow();
      expect(() => pauseStoryMedia(null)).not.toThrow();
    });
  });

  describe("getMediaActionStatusLabel", () => {
    it("returns remove label when isRemove is true", () => {
      expect(getMediaActionStatusLabel({ isRemove: true, isDisabled: false })).toBeTruthy();
    });

    it("returns disabled label when isDisabled is true", () => {
      expect(getMediaActionStatusLabel({ isRemove: false, isDisabled: true })).toBeTruthy();
    });

    it("returns add label by default", () => {
      expect(getMediaActionStatusLabel({ isRemove: false, isDisabled: false })).toBeTruthy();
    });
  });
});
