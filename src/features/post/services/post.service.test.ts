import { describe, expect, it, vi } from "vitest";
import { postService } from "./post.service";
import { postApi } from "@/api/content/post/post.api";
import { createMockApiResponse } from "@/test/createMockApiResponse";
const mockDataResponse = {
  createdPost: {
    text: "tesst =)",
    type: "post",
    mentionedUsers: [],
    author: {
      username: "zeskkk",
      displayName: "zesk",
      avatarUrl: "https://threddit-s3.s3.us-east-1.amazonaws.com/avatar/1",
    },
    id: 2,
    isPinned: false,
    createdAt: "2026-06-09T03:18:04.552Z",
    updatedAt: "2026-06-09T03:18:04.552Z",
    mediaFiles: [],
  },
};

const mockApiResponse = createMockApiResponse(
  201,
  mockDataResponse,
  "Đăng tải nội dung thành công",
  201,
);

vi.mock("../../../api/content/post/post.api", () => ({
  postApi: {
    createPost: vi.fn(),
  },
}));

describe("postService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should create a post successfully and inject type 'post'", async () => {
    vi.mocked(postApi.createPost).mockResolvedValue(mockApiResponse);
    const payload = {
      text: "abc",
      mentionedUsers: [],
    };
    const result = await postService.createPost(payload);
    expect(postApi.createPost).toHaveBeenCalledWith({
      text: "abc",
      mentionedUsers: [],
      type: "post",
    });
    expect(result).toEqual({
      success: true,
      message: "Đăng tải nội dung thành công",
      data: mockDataResponse,
    });
  });
});
