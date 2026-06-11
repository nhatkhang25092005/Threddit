import { describe, expect, it, vi } from "vitest";
import { postService } from "./post.service";
const mockDataResponse = {
  createdPost: {
    text: "tesst =)",
    type: "story",
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

const mockCreatePostResponse = {
  success: true,
  message: "Đăng tải nội dung thành công",
  data: mockDataResponse,
};

vi.mock("../../../api/content/post/post.api", () => ({
  postApi: {
    createPost: vi.fn(() =>
      Promise.resolve({
        statusCode: 201,
        message: "Đăng tải nội dung thành công",
        data: mockDataResponse,
      }),
    ),
  },
}));
const createPostSpy = vi.spyOn(postService, "createPost");

describe("postService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should create a post successfully", async () => {
    const payload = {
      text: "tesst =)",
      type: "post",
      mentionedUsers: [],
    };
    createPostSpy.mockResolvedValue(mockCreatePostResponse);

    const result = await postService.createPost(payload);
    expect(createPostSpy).toHaveBeenCalledWith(payload);
    expect(result).toEqual(mockCreatePostResponse);
  });
});
