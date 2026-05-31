import { describe, expect, it } from "vitest";
import { buildProfileRoute, buildStoryRoute } from "./storyRoute";

describe("storyRoute", () => {
  describe("buildStoryRoute", () => {
    it("builds current story route without username", () => {
      expect(buildStoryRoute()).toBe("/app/stories/current");
    });

    it("builds pinned story route with username and story id", () => {
      expect(buildStoryRoute("pinned", "john doe", 42))
        .toBe("/app/stories/pinned/john%20doe/42");
    });

    it("treats non-pinned source as current", () => {
      expect(buildStoryRoute("other", "alice")).toBe("/app/stories/current/alice");
    });
  });

  describe("buildProfileRoute", () => {
    it("builds profile route with encoded username", () => {
      expect(buildProfileRoute("john doe")).toBe("/app/profile/john%20doe");
    });

    it("builds default profile route when username is missing", () => {
      expect(buildProfileRoute()).toBe("/app/profile");
    });
  });
});
