import { describe, expect, it } from "vitest";
import {
  normalizeComposerMediaList,
  normalizeRemoteCommentMediaList,
  partitionCommentMedia,
} from "./commentMedia.utils";

describe("commentMedia.utils", () => {
  describe("normalizeComposerMediaList", () => {
    it("returns empty array for non-array input", () => {
      expect(normalizeComposerMediaList(null)).toEqual([]);
    });

    it("normalizes composer media with resolved type and url", () => {
      const result = normalizeComposerMediaList([
        { url: "https://example.com/a.png", contentType: "image/png", name: "a.png" },
      ]);

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe("image");
      expect(result[0].url).toBe("https://example.com/a.png");
      expect(result[0].origin).toBe("object-url");
    });

    it("detects audio and video types", () => {
      const audio = normalizeComposerMediaList([{ contentType: "audio/mpeg" }]);
      const video = normalizeComposerMediaList([{ contentType: "video/mp4" }]);

      expect(audio[0].type).toBe("audio");
      expect(video[0].type).toBe("video");
    });
  });

  describe("normalizeRemoteCommentMediaList", () => {
    it("normalizes remote media with remote origin", () => {
      const result = normalizeRemoteCommentMediaList([
        { url: "https://cdn.example.com/b.jpg", mimeType: "image/jpeg" },
      ]);

      expect(result[0].origin).toBe("remote");
      expect(result[0].type).toBe("image");
      expect(result[0].file).toBeNull();
    });
  });

  describe("partitionCommentMedia", () => {
    it("partitions visual and audio media", () => {
      const media = [
        { id: 1, type: "image", url: "a.png" },
        { id: 2, type: "audio", url: "a.mp3" },
        { id: 3, type: "video", url: "a.mp4" },
      ];

      const result = partitionCommentMedia(media);

      expect(result.audio).toHaveLength(1);
      expect(result.visual).toHaveLength(2);
    });

    it("returns empty partitions for invalid input", () => {
      expect(partitionCommentMedia(null)).toEqual({ visual: [], audio: [] });
    });
  });
});
