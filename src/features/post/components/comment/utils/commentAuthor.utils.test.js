import { describe, expect, it } from "vitest";
import { resolveCommentAuthor, resolveReplyAuthor } from "./commentAuthor.utils";

describe("commentAuthor.utils", () => {
  describe("resolveCommentAuthor", () => {
    it("returns empty author when input is null", () => {
      expect(resolveCommentAuthor(null)).toEqual({
        username: null,
        displayName: null,
        avatarUrl: "",
        isViewer: false,
      });
    });

    it("resolves username and displayName from author object", () => {
      const result = resolveCommentAuthor({
        username: "alice",
        displayName: "Alice",
        avatarUrl: "avatar.jpg",
      });

      expect(result.username).toBe("alice");
      expect(result.displayName).toBe("Alice");
      expect(result.avatarUrl).toBe("avatar.jpg");
    });

    it("marks viewer when username matches", () => {
      const result = resolveCommentAuthor({ username: "alice" }, "alice");
      expect(result.isViewer).toBe(true);
    });
  });

  describe("resolveReplyAuthor", () => {
    it("returns replyTo author when available", () => {
      const replyTo = { username: "bob", displayName: "Bob" };
      expect(resolveReplyAuthor(replyTo)?.username).toBe("bob");
    });

    it("falls back to fallback author", () => {
      const fallback = { username: "carol", displayName: "Carol" };
      expect(resolveReplyAuthor(null, fallback)?.username).toBe("carol");
    });

    it("returns null when no author can be resolved", () => {
      expect(resolveReplyAuthor(null, null)).toBeNull();
    });
  });
});
