import { describe, expect, it, vi, beforeEach } from "vitest";
import { postService } from "./post.service";
import { postApi } from "@/api/content/post/post.api";
import { createMockApiResponse } from "@/test/createMockApiResponse";
import { storageService } from "./storage.service";

const mockDataResponse = (
  text: string = "test",
  mediaFiles: { file: string }[] = [],
) => ({
  createdPost: {
    text,
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
    mediaFiles,
  },
});

const mockUploadResponse = {
  success: true,
  uploadSessionId: "b9bb9e73-80f5-48ac-a7d8-6d82e07b674e",
};

vi.mock("../../../api/content/post/post.api", () => ({
  postApi: {
    createPost: vi.fn(),
  },
}));

vi.mock("./storage.service", () => ({
  storageService: {
    uploadMediaAndGetSessionId: vi.fn(),
  },
}));

describe("postService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a post successfully and inject type 'post' with text content only", async () => {
    vi.mocked(postApi.createPost).mockResolvedValue(
      createMockApiResponse(
        201,
        mockDataResponse("abc"),
        "Đăng tải nội dung thành công",
        201,
      ),
    );
    const payload = {
      text: "abc",
      mentionedUsers: [],
      type: "post",
    };
    const result = await postService.createPost(payload);
    expect(postApi.createPost).toHaveBeenCalledWith(payload);
    expect(result).toEqual({
      success: true,
      message: "Đăng tải nội dung thành công",
      data: mockDataResponse("abc"),
      _payload: payload,
    });
  });

  it("Should create a post successfully and inject type 'post' with media content only", async () => {
    //Mock the reponse of upload (because in this case, this service will be called)
    vi.mocked(storageService.uploadMediaAndGetSessionId).mockResolvedValue(
      mockUploadResponse,
    );

    const dataResponse = mockDataResponse("tesst =)", [
      { file: "image1.png" },
      { file: "image2.png" },
    ]);

    // Mock the api response of create post
    vi.mocked(postApi.createPost).mockResolvedValue(
      createMockApiResponse(
        201,
        dataResponse,
        "Create new post successfully",
        201,
      ),
    );

    // payload for service calling
    const payload = {
      text: "abc",
      mentionedUsers: [],
      type: "post",
      media: [{ file: "image1.png" }, { file: "image2.png" }],
    };

    // Call service
    const result = await postService.createPost(payload);
    expect(postApi.createPost).toHaveBeenCalledWith({
      text: "abc",
      mentionedUsers: [],
      type: "post",
      uploadSessionId: "b9bb9e73-80f5-48ac-a7d8-6d82e07b674e",
    });

    expect(result).toEqual({
      success: true,
      message: "Create new post successfully",
      data: dataResponse,
      _payload: {
        text: "abc",
        mentionedUsers: [],
        type: "post",
        uploadSessionId: "b9bb9e73-80f5-48ac-a7d8-6d82e07b674e",
      },
    });
  });

  it("Should create a post successfully and inject the type 'post' with media and text together", async () => {
    // mock storageService response
    vi.mocked(storageService.uploadMediaAndGetSessionId).mockResolvedValue({
      success: true,
      uploadSessionId: "b9bb9e73-80f5-48ac-a7d8-6d82e07b674e",
    });

    // mock create post api response
    vi.mocked(postApi.createPost).mockResolvedValue(
      createMockApiResponse(
        201,
        mockDataResponse("hello", [{ file: "image.png" }]),
        "Create new post successfully",
        201,
      ),
    );

    // input of service
    const input = {
      text: "hello",
      media: [{ file: "image.png" }],
    };

    const result = await postService.createPost(input);

    expect(postApi.createPost).toHaveBeenCalledWith({
      text: "hello",
      type: "post",
      mentionedUsers: [],
      uploadSessionId: "b9bb9e73-80f5-48ac-a7d8-6d82e07b674e",
    });

    expect(result).toEqual({
      success: true,
      message: "Create new post successfully",
      _payload: {
        text: "hello",
        type: "post",
        mentionedUsers: [],
        uploadSessionId: "b9bb9e73-80f5-48ac-a7d8-6d82e07b674e",
      },
      data: mockDataResponse("hello", [{ file: "image.png" }]),
    });
  });

  it("Shouldn't have uploadSessionId if there are no media in the input", async () => {
    const input = {
      text: "abc",
      media: [],
    };
    await postService.createPost(input);
    expect(postApi.createPost).toHaveBeenCalledWith({
      text: "abc",
      type: "post",
      mentionedUsers: [],
    });
  });

  it("Should return valid response if an error occurs in the phase", async () => {
    vi.mocked(storageService.uploadMediaAndGetSessionId).mockResolvedValue({
      success: false,
      message: "Media upload failed",
    });

    const input = {
      text: "abc",
      media: [{ file: "image1.png" }, { file: "image2.png" }],
    };

    const result = await postService.createPost(input);

    expect(result).toEqual({
      success: false,
      message: "Media upload failed",
      errorSource: "POST_UPLOAD_MEDIA",
    });
  });

  it("Should return valid response if an error occurs in create post phase", async () => {
    vi.mocked(storageService.uploadMediaAndGetSessionId).mockResolvedValue(
      mockUploadResponse,
    );
    vi.mocked(postApi.createPost).mockRejectedValue(new Error("Network Error"));
    const input = {
      text: "hello",
      media: [{ file: "image1.png" }, { file: "image2.png" }],
    };

    const result = await postService.createPost(input);

    expect(postApi.createPost).toHaveBeenCalledWith({
      text: "hello",
      mentionedUsers: [],
      type: "post",
      uploadSessionId: "b9bb9e73-80f5-48ac-a7d8-6d82e07b674e",
    });

    expect(result).toEqual({
      success: false,
      message: "Network Error",
      errorSource: "CREATE_NEW_POST",
    });
  });
});
