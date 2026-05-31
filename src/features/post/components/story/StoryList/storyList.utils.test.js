import { describe, expect, it } from "vitest";
import { getStoryPageMeta, getStorySource } from "./storyList.utils";

describe("storyList.utils", () => {
  describe("getStorySource", () => {
    it("returns pinned when source is pinned", () => {
      expect(getStorySource("pinned")).toBe("pinned");
    });

    it("returns current for any other source", () => {
      expect(getStorySource("current")).toBe("current");
      expect(getStorySource(undefined)).toBe("current");
    });
  });

  describe("getStoryPageMeta", () => {
    it("returns pinned page meta", () => {
      const meta = getStoryPageMeta("pinned");
      expect(meta.title).toBe("Story pinned");
      expect(meta.eyebrow).toBe("Pinned story");
    });

    it("returns current page meta", () => {
      const meta = getStoryPageMeta("current");
      expect(meta.title).toBe("Story list");
      expect(meta.eyebrow).toBe("Current story");
    });
  });
});
