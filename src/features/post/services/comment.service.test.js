import { beforeEach, describe, expect, it, vi } from "vitest";
import { commentService } from "./comment.service";
import { commentApi } from "@/api/content/comments/comment.api";

// Mock API
vi.mock("@/api/content/comments/comment.api");

const mockedGetCommentOf = vi.mocked(commentApi.getCommentOf);
const mockedCreateComment = vi.mocked(commentApi.createComment);
const mockedGetChildComment = vi.mocked(commentApi.getChildComment);
const mockedUpdateComment = vi.mocked(commentApi.updateComment);
const mockedDeleteComment = vi.mocked(commentApi.deleteComment);

describe("commentService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ============================================
  // ✅ TEST: Tạo bình luận (createComment)
  // ============================================
  describe("createComment", () => {
    it("should return success when creating comment with valid content", async () => {
      const postId = 1;
      const payload = { text: "Great post!" };
      mockedCreateComment.mockResolvedValueOnce({
        data: { id: 1, text: "Great post!", postId }
      });

      const result = await commentService.createComment(postId, payload);

      expect(result.success).toBe(true);
      expect(result.data.id).toBe(1);
    });

    it("should return success when creating comment with valid media", async () => {
      const postId = 1;
      const payload = {
        text: "Comment with image",
        media: [{ id: "img1", url: "comment.jpg" }]
      };
      mockedCreateComment.mockResolvedValueOnce({
        data: { id: 2, text: "Comment with image", media: payload.media }
      });

      const result = await commentService.createComment(postId, payload);

      expect(result.success).toBe(true);
      expect(result.data.media).toBeDefined();
    });

    it("should return error when content is empty and no media", async () => {
      const postId = 1;
      const payload = { text: "", media: [] };
      mockedCreateComment.mockRejectedValueOnce({
        response: { status: 400, data: { message: "Content cannot be empty" } }
      });

      const result = await commentService.createComment(postId, payload);

      expect(result.success).toBe(false);
    });

    it("should return error when API reject", async () => {
      const postId = 1;
      const payload = { text: "Comment" };
      mockedCreateComment.mockRejectedValueOnce({
        response: { status: 500, data: { message: "Server error" } }
      });

      const result = await commentService.createComment(postId, payload);

      expect(result.success).toBe(false);
    });
  });

  // ============================================
  // ✅ TEST: Trả lời bình luận (getChildComment + createComment with parent)
  // ============================================
  describe("Reply to Comment", () => {
    it("should return success when replying to a comment", async () => {
      const postId = 1;
      const parentCommentId = 1;
      const payload = { text: "Great reply!", parentCommentId };
      mockedCreateComment.mockResolvedValueOnce({
        data: { id: 10, text: "Great reply!", parentCommentId }
      });

      const result = await commentService.createComment(postId, payload);

      expect(result.success).toBe(true);
    });

    it("should support nested replies at multiple levels", async () => {
      // Get level 1 replies
      mockedGetChildComment.mockResolvedValueOnce({
        data: [{ id: 10, parentCommentId: 1, text: "Level 1 reply" }]
      });

      const result1 = await commentService.getChildComment(1);
      expect(result1.success).toBe(true);

      // Get level 2 replies
      mockedGetChildComment.mockResolvedValueOnce({
        data: [{ id: 20, parentCommentId: 10, text: "Level 2 reply" }]
      });

      const result2 = await commentService.getChildComment(10);
      expect(result2.success).toBe(true);
    });

    it("should return error when parent comment does not exist", async () => {
      const postId = 1;
      const payload = { text: "Reply", parentCommentId: 999 };
      mockedCreateComment.mockRejectedValueOnce({
        response: { status: 404, data: { message: "Parent comment not found" } }
      });

      const result = await commentService.createComment(postId, payload);

      expect(result.success).toBe(false);
    });

    it("should return error when API reject reply", async () => {
      const postId = 1;
      const payload = { text: "Reply", parentCommentId: 1 };
      mockedCreateComment.mockRejectedValueOnce({
        response: { status: 500, data: { message: "Failed to create reply" } }
      });

      const result = await commentService.createComment(postId, payload);

      expect(result.success).toBe(false);
    });
  });

  // ============================================
  // ✅ TEST: Xem danh sách bình luận (getCommentList)
  // ============================================
  describe("getCommentList", () => {
    it("should return list of comments when available", async () => {
      const postId = 1;
      mockedGetCommentOf.mockResolvedValueOnce({
        data: [
          { id: 1, text: "First comment", author: { username: "user1" } },
          { id: 2, text: "Second comment", author: { username: "user2" } }
        ]
      });

      const result = await commentService.getCommentList(postId);

      expect(result.success).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it("should show empty state when no comments", async () => {
      const postId = 1;
      mockedGetCommentOf.mockResolvedValueOnce({
        data: []
      });

      const result = await commentService.getCommentList(postId);

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    it("should build comment tree correctly if utils handle it", async () => {
      const postId = 1;
      mockedGetCommentOf.mockResolvedValueOnce({
        data: [
          {
            id: 1,
            text: "Parent comment",
            children: [
              { id: 10, text: "Reply 1", parentCommentId: 1 },
              { id: 11, text: "Reply 2", parentCommentId: 1 }
            ]
          }
        ]
      });

      const result = await commentService.getCommentList(postId);

      expect(result.success).toBe(true);
      expect(result.data[0].children).toBeDefined();
    });

    it("should return error when loading comments fails", async () => {
      const postId = 1;
      mockedGetCommentOf.mockRejectedValueOnce({
        response: { status: 500, data: { message: "Load failed" } }
      });

      const result = await commentService.getCommentList(postId);

      expect(result.success).toBe(false);
    });
  });

  // ============================================
  // ✅ TEST: Cảm xúc bình luận (Reaction)
  // ============================================
  describe("Comment Reaction", () => {
    it("should successfully react to a comment", async () => {
      // Thường dùng updateComment để cập nhật reaction
      const payload = { reaction: "like" };
      mockedUpdateComment.mockResolvedValueOnce({
        data: { id: 1, reaction: "like", reactionCount: 1 }
      });

      const result = await commentService.updateComment(1, payload);

      expect(result.success).toBe(true);
      expect(result.data.reaction).toBe("like");
    });

    it("should change existing reaction correctly", async () => {
      const payload = { reaction: "love" };
      mockedUpdateComment.mockResolvedValueOnce({
        data: { id: 1, reaction: "love", reactionCount: 1 }
      });

      const result = await commentService.updateComment(1, payload);

      expect(result.success).toBe(true);
      expect(result.data.reaction).toBe("love");
    });

    it("should handle API error on reaction", async () => {
      const payload = { reaction: "like" };
      mockedUpdateComment.mockRejectedValueOnce({
        response: { status: 500, data: { message: "Reaction failed" } }
      });

      const result = await commentService.updateComment(1, payload);

      expect(result.success).toBe(false);
    });
  });

  // ============================================
  // ✅ TEST: Chỉnh sửa bình luận (updateComment)
  // ============================================
  describe("updateComment", () => {
    it("should return success when updating comment content", async () => {
      const commentId = 1;
      const payload = { text: "Updated comment" };
      mockedUpdateComment.mockResolvedValueOnce({
        data: { id: commentId, text: "Updated comment", isEdited: true }
      });

      const result = await commentService.updateComment(commentId, payload);

      expect(result.success).toBe(true);
      expect(result.data.text).toBe("Updated comment");
    });

    it("should return success when updating comment media", async () => {
      const commentId = 1;
      const payload = { media: [{ id: "img1", url: "new_image.jpg" }] };
      mockedUpdateComment.mockResolvedValueOnce({
        data: { id: commentId, media: payload.media }
      });

      const result = await commentService.updateComment(commentId, payload);

      expect(result.success).toBe(true);
    });

    it("should return error when user has no permission to edit", async () => {
      const commentId = 1;
      const payload = { text: "new" };
      mockedUpdateComment.mockRejectedValueOnce({
        response: { status: 403, data: { message: "No permission" } }
      });

      const result = await commentService.updateComment(commentId, payload);

      expect(result.success).toBe(false);
    });

    it("should return error when API reject", async () => {
      const commentId = 1;
      const payload = { text: "new" };
      mockedUpdateComment.mockRejectedValueOnce({
        response: { status: 500, data: { message: "Update failed" } }
      });

      const result = await commentService.updateComment(commentId, payload);

      expect(result.success).toBe(false);
    });
  });

  // ============================================
  // ✅ TEST: Xóa bình luận (deleteComment)
  // ============================================
  describe("deleteComment", () => {
    it("should return success when deleting comment", async () => {
      const commentId = 1;
      mockedDeleteComment.mockResolvedValueOnce({
        data: { message: "Comment deleted" }
      });

      const result = await commentService.deleteComment(commentId);

      expect(result.success).toBe(true);
    });

    it("should return error when user has no permission to delete", async () => {
      const commentId = 1;
      mockedDeleteComment.mockRejectedValueOnce({
        response: { status: 403, data: { message: "No permission" } }
      });

      const result = await commentService.deleteComment(commentId);

      expect(result.success).toBe(false);
    });

    it("should return error when API reject", async () => {
      const commentId = 1;
      mockedDeleteComment.mockRejectedValueOnce({
        response: { status: 500, data: { message: "Delete failed" } }
      });

      const result = await commentService.deleteComment(commentId);

      expect(result.success).toBe(false);
    });
  });

  // ============================================
  // ✅ TEST: Lấy bình luận con (getChildComment)
  // ============================================
  describe("getChildComment", () => {
    it("should return child comments", async () => {
      const parentCommentId = 1;
      mockedGetChildComment.mockResolvedValueOnce({
        data: [
          { id: 10, text: "Reply 1", parentCommentId },
          { id: 11, text: "Reply 2", parentCommentId }
        ]
      });

      const result = await commentService.getChildComment(parentCommentId);

      expect(result.success).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it("should handle API error", async () => {
      const parentCommentId = 1;
      mockedGetChildComment.mockRejectedValueOnce({
        response: { status: 500, data: { message: "Load failed" } }
      });

      const result = await commentService.getChildComment(parentCommentId);

      expect(result.success).toBe(false);
    });
  });
});
