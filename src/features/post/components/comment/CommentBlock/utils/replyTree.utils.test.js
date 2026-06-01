import { describe, expect, it, vi } from "vitest";
import {
  insertCreatedReplyIntoReplies,
  shouldSyncCreatedReply,
} from "./replyTree.utils";

vi.mock("../../../../utils/commentCollection.utils", () => ({
  resolveCommentItems: (data) => data?.items || data?.commentList || data || [],
}));

const makeComment = (overrides = {}) => ({
  id: 1,
  level: 0,
  parentId: null,
  text: "parent",
  author: { username: "user1", displayName: "User 1" },
  children: [],
  ...overrides,
});

describe("replyTree.utils", () => {
  describe("shouldSyncCreatedReply", () => {
    it("returns false when target parent id is null", () => {
      expect(shouldSyncCreatedReply([], makeComment(), null)).toBe(false);
    });

    it("returns true when replying directly to current comment", () => {
      const comment = makeComment({ id: 5 });
      expect(shouldSyncCreatedReply([], comment, 5)).toBe(true);
    });

    it("returns true when parent exists in loaded replies tree", () => {
      const loadedReplies = [makeComment({ id: 10, children: [makeComment({ id: 11 })] })];
      expect(shouldSyncCreatedReply(loadedReplies, makeComment({ id: 1 }), 11)).toBe(true);
    });

    it("returns false when parent does not exist", () => {
      expect(shouldSyncCreatedReply([], makeComment({ id: 1 }), 999)).toBe(false);
    });
  });

  describe("insertCreatedReplyIntoReplies", () => {
    it("prepends reply when parent is current comment", () => {
      const parent = makeComment({ id: 1 });
      const created = makeComment({ id: 2, parentId: 1, text: "reply" });

      const result = insertCreatedReplyIntoReplies([], parent, created);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(2);
    });

    it("returns unchanged replies when created comment is missing", () => {
      const parent = makeComment({ id: 1 });
      expect(insertCreatedReplyIntoReplies([makeComment({ id: 10 })], parent, null))
        .toEqual([makeComment({ id: 10 })]);
    });

    it("does not duplicate existing reply id", () => {
      const parent = makeComment({ id: 1 });
      const existing = makeComment({ id: 2, parentId: 1 });
      const created = makeComment({ id: 2, parentId: 1, text: "duplicate" });

      const result = insertCreatedReplyIntoReplies([existing], parent, created);
      expect(result).toEqual([existing]);
    });

    it("returns unchanged replies when nested parent is not found", () => {
      const parent = makeComment({ id: 1 });
      const created = makeComment({ id: 3, parentId: 99, text: "orphan reply" });
      const current = [makeComment({ id: 2 })];

      expect(insertCreatedReplyIntoReplies(current, parent, created)).toEqual(current);
    });
  });
});
