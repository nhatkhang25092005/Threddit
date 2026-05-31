import { beforeEach, describe, expect, it, vi } from "vitest";
import { storyService } from "./story.service";
import { storyApi } from "@/api/content/story/story.api";
import { postApi } from "@/api/content/post/post.api";

// Mock APIs
vi.mock("@/api/content/story/story.api");
vi.mock("@/api/content/post/post.api");

const mockedGetPinnedStory = vi.mocked(storyApi.getPinnedStory);
const mockedGetCurrentStory = vi.mocked(storyApi.getCurrentStory);
const mockedGetFriendStoryList = vi.mocked(storyApi.getFriendStoryList);
const mockedCreatePost = vi.mocked(postApi.createPost);
const mockedEditContent = vi.mocked(postApi.editContent);
const mockedDeleteContent = vi.mocked(postApi.deleteContent);

describe("storyService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ============================================
  // ✅ TEST: Tạo tin (createStory)
  // ============================================
  describe("createStory", () => {
    it("should return success when creating story with valid content", async () => {
      const payload = { text: "My story", type: "story" };
      mockedCreatePost.mockResolvedValueOnce({
        data: { id: 1, text: "My story", type: "story" }
      });

      const result = await storyService.createStory(payload);

      expect(result.success).toBe(true);
      expect(result.data.id).toBe(1);
    });

    it("should return success when creating story with one valid media", async () => {
      const payload = {
        text: "Story with image",
        media: [{ id: "img1", url: "image.jpg" }],
        type: "story"
      };
      mockedCreatePost.mockResolvedValueOnce({
        data: { id: 2, text: "Story with image", media: payload.media }
      });

      const result = await storyService.createStory(payload);

      expect(result.success).toBe(true);
      expect(result.data.media).toBeDefined();
    });

    it("should return error when exceeding max media limit", async () => {
      const payload = {
        text: "Story",
        media: Array(11).fill({ id: "img", url: "image.jpg" }),
        type: "story"
      };
      mockedCreatePost.mockRejectedValueOnce({
        response: { status: 400, data: { message: "Max media exceeded" } }
      });

      const result = await storyService.createStory(payload);

      expect(result.success).toBe(false);
    });

    it("should return error when upload/API fails", async () => {
      const payload = { text: "Story", type: "story" };
      mockedCreatePost.mockRejectedValueOnce({
        response: { status: 500, data: { message: "Upload failed" } }
      });

      const result = await storyService.createStory(payload);

      expect(result.success).toBe(false);
    });
  });

  // ============================================
  // ✅ TEST: Chỉnh sửa tin (editStory)
  // ============================================
  describe("editStory", () => {
    it("should return success when updating story content", async () => {
      const payload = { text: "Updated story" };
      mockedEditContent.mockResolvedValueOnce({
        data: { id: 1, text: "Updated story" }
      });

      const result = await storyService.editStory(1, payload);

      expect(result.success).toBe(true);
      expect(result.data.text).toBe("Updated story");
    });

    it("should return success when updating story media", async () => {
      const payload = { media: [{ id: "img2", url: "new_image.jpg" }] };
      mockedEditContent.mockResolvedValueOnce({
        data: { id: 1, media: payload.media }
      });

      const result = await storyService.editStory(1, payload);

      expect(result.success).toBe(true);
    });

    it("should return error when story does not exist", async () => {
      mockedEditContent.mockRejectedValueOnce({
        response: { status: 404, data: { message: "Story not found" } }
      });

      const result = await storyService.editStory(999, { text: "new" });

      expect(result.success).toBe(false);
    });

    it("should return error when user has no permission to edit", async () => {
      mockedEditContent.mockRejectedValueOnce({
        response: { status: 403, data: { message: "No permission" } }
      });

      const result = await storyService.editStory(1, { text: "new" });

      expect(result.success).toBe(false);
    });
  });

  // ============================================
  // ✅ TEST: Xóa tin (deleteStory)
  // ============================================
  describe("deleteStory", () => {
    it("should return success when user is owner", async () => {
      mockedDeleteContent.mockResolvedValueOnce({
        data: { message: "Deleted" }
      });

      const result = await storyService.deleteStory(1);

      expect(result.success).toBe(true);
    });

    it("should return error when API reject", async () => {
      mockedDeleteContent.mockRejectedValueOnce({
        response: { status: 500, data: { message: "Delete failed" } }
      });

      const result = await storyService.deleteStory(1);

      expect(result.success).toBe(false);
    });
  });

  // ============================================
  // ✅ TEST: Tin nổi bật (Pin/Unpin)
  // ============================================
  describe("Pinned Story", () => {
    it("should add story to pinned list successfully", async () => {
      // Chức năng này thường gọi editStory hoặc API khác
      // Tùy theo implementation của storyService
      mockedEditContent.mockResolvedValueOnce({
        data: { id: 1, isPinned: true }
      });

      const result = await storyService.editStory(1, { isPinned: true });

      expect(result.success).toBe(true);
      expect(result.data.isPinned).toBe(true);
    });

    it("should remove story from pinned list successfully", async () => {
      mockedEditContent.mockResolvedValueOnce({
        data: { id: 1, isPinned: false }
      });

      const result = await storyService.editStory(1, { isPinned: false });

      expect(result.success).toBe(true);
      expect(result.data.isPinned).toBe(false);
    });

    it("should return error when pinning non-existent story", async () => {
      mockedEditContent.mockRejectedValueOnce({
        response: { status: 404, data: { message: "Story not found" } }
      });

      const result = await storyService.editStory(999, { isPinned: true });

      expect(result.success).toBe(false);
    });

    it("should return error when API reject pin operation", async () => {
      mockedEditContent.mockRejectedValueOnce({
        response: { status: 500, data: { message: "Pin failed" } }
      });

      const result = await storyService.editStory(1, { isPinned: true });

      expect(result.success).toBe(false);
    });
  });

  // ============================================
  // ✅ TEST: Xem danh sách tin (getPinnedStory)
  // ============================================
  describe("getPinnedStory", () => {
    it("should return list of pinned stories when data exists", async () => {
      mockedGetPinnedStory.mockResolvedValueOnce({
        data: [
          { id: 1, text: "Pinned story 1", isPinned: true },
          { id: 2, text: "Pinned story 2", isPinned: true }
        ]
      });

      const result = await storyService.getPinnedStory("john");

      expect(result.success).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it("should show empty state when no pinned stories", async () => {
      mockedGetPinnedStory.mockResolvedValueOnce({
        data: []
      });

      const result = await storyService.getPinnedStory("john");

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    it("should return error when loading fails", async () => {
      mockedGetPinnedStory.mockRejectedValueOnce({
        response: { status: 500, data: { message: "Load failed" } }
      });

      const result = await storyService.getPinnedStory("john");

      expect(result.success).toBe(false);
    });
  });

  // ============================================
  // ✅ TEST: Xem danh sách tin của bạn bè (getFriendStoryList)
  // ============================================
  describe("getFriendStoryList", () => {
    it("should return friend stories when available", async () => {
      mockedGetFriendStoryList.mockResolvedValueOnce({
        data: [
          { id: 1, author: "friend1", text: "Friend story" }
        ]
      });

      const result = await storyService.getFriendStoryList();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it("should return empty when no friend stories", async () => {
      mockedGetFriendStoryList.mockResolvedValueOnce({
        data: []
      });

      const result = await storyService.getFriendStoryList();

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    it("should return error when API reject", async () => {
      mockedGetFriendStoryList.mockRejectedValueOnce({
        response: { status: 500, data: { message: "Load failed" } }
      });

      const result = await storyService.getFriendStoryList();

      expect(result.success).toBe(false);
    });
  });

  // ============================================
  // ✅ TEST: Xem tin hiện tại (getCurrentStory)
  // ============================================
  describe("getCurrentStory", () => {
    it("should return current stories", async () => {
      mockedGetCurrentStory.mockResolvedValueOnce({
        data: [{ id: 1, text: "Current story" }]
      });

      const result = await storyService.getCurrentStory("john");

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it("should handle API error", async () => {
      mockedGetCurrentStory.mockRejectedValueOnce({
        response: { status: 500 }
      });

      const result = await storyService.getCurrentStory("john");

      expect(result.success).toBe(false);
    });
  });
});
