import { describe, expect, it } from "vitest";
import {
  normalizeCommentItem,
  normalizeCommentReaction,
  normalizeFlatCommentTree,
} from "./commentNormalization.utils";

describe("commentNormalization.utils", () => {
  describe("normalizeCommentReaction", () => {
    it("returns null for empty reaction", () => {
      expect(normalizeCommentReaction(null)).toBeNull();
      expect(normalizeCommentReaction(undefined)).toBeNull();
    });

    it("normalizes valid reaction to uppercase", () => {
      expect(normalizeCommentReaction("like")).toBe("LIKE");
    });

    it("returns null for unknown reaction", () => {
      expect(normalizeCommentReaction("unknown")).toBeNull();
    });
  });

  describe("normalizeCommentItem", () => {
    it("returns null when comment has no id", () => {
      expect(normalizeCommentItem({ text: "hello" })).toBeNull();
    });

    it("normalizes a flat comment with author and text", () => {
      const result = normalizeCommentItem({
        id: 1,
        text: "Hello",
        author: { username: "alice", displayName: "Alice" },
      });

      expect(result?.id).toBe(1);
      expect(result?.text).toBe("Hello");
      expect(result?.author.username).toBe("alice");
      expect(result?.children).toEqual([]);
    });

    it("normalizes nested children comments", () => {
      const result = normalizeCommentItem({
        id: 1,
        text: "Parent",
        author: { username: "alice" },
        children: [
          {
            id: 2,
            text: "Reply",
            author: { username: "bob" },
            parentCommentId: 1,
          },
        ],
      });

      expect(result?.children).toHaveLength(1);
      expect(result?.children[0].text).toBe("Reply");
      expect(result?.hasChildComment).toBe(true);
    });
  });

  describe("normalizeFlatCommentTree", () => {
    it("returns empty array for invalid input", () => {
      expect(normalizeFlatCommentTree(null)).toEqual([]);
    });

    it("normalizes a list of flat comments", () => {
      const result = normalizeFlatCommentTree([
        { id: 1, text: "A", author: { username: "a" } },
        { id: 2, text: "B", author: { username: "b" } },
      ]);

      expect(result).toHaveLength(2);
      expect(result[0].text).toBe("A");
    });
  });
});
