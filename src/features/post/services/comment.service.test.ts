import { describe, expect, it, vi, beforeEach } from "vitest";
import { createMockApiResponse } from "@/test/createMockApiResponse";
import { commentApi } from "@/api/content/comments/comment.api";
import { commentService } from "./comment.service";
import { storageService } from "./storage.service";
vi.mock("@/api/content/comments/comment.api", () => ({
  commentApi: {
    createComment: vi.fn(),
  },
}));

vi.mock("./storage.service", () => ({
  storageService: {
    uploadUpdatedMediaAndGetSessionId: vi.fn(),
  },
}));

describe("commentService.createComment", () => {
  const postId = 1;
  const createdCommentDataResponse = (text = "", mediaFiles = []) => ({
    commenter: {
      avatarUrl: "https://threddit-s3.s3.us-east-1.amazonaws.com/avatar/1",
      displayName: "zesk",
      username: "zeskkk",
    },
    createdAt: "2026-06-15T03:14:09.188Z",
    hasChildComment: false,
    id: 5,
    isCommenter: true,
    mediaFiles,
    mentionedUsers: [],
    parentCommentId: null,
    reaction: null,
    text,
    updatedAt: "2026-06-15T03:14:09.188Z",
  });
  const mockedUploadResponse = {
    success: true,
    uploadSessionId: "123-456-789-abcd",
    presignedMediaUrls: "https://aws.com",
  };

  beforeEach(() => vi.clearAllMocks());
  it("Should create text only comment successfully", async () => {
    vi.mocked(commentApi.createComment).mockResolvedValue(
      createMockApiResponse(
        201,
        createdCommentDataResponse("kkk"),
        "create comment successfully",
        201,
      ),
    );

    // Service input for test
    const inputData = {
      text: "kkk",
      media: [],
      parentCommentId: null,
    };

    // mock payload in call api phase
    const payload = {
      text: "kkk",
    };

    const result = await commentService.createComment(postId, inputData);
    expect(commentApi.createComment).toHaveBeenCalledWith(postId, payload);
    expect(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).not.toHaveBeenCalled();
    expect(result).toEqual({
      success: true,
      message: "create comment successfully",
      data: createdCommentDataResponse("kkk", []),
    });
  });

  it("Should create media only comment successfully", async () => {
    vi.mocked(commentApi.createComment).mockResolvedValue(
      createMockApiResponse(
        201,
        createdCommentDataResponse(undefined, [{ file: "image.png" }]),
        "Create comment successfully",
        201,
      ),
    );

    vi.mocked(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).mockResolvedValue(mockedUploadResponse);

    const testInputData = {
      text: "",
      mentionedUsers: [],
      parentCommentId: null,
      media: [{ file: "image.png" }],
    };

    const apiPayload = {
      uploadSessionId: mockedUploadResponse.uploadSessionId,
    };

    const result = await commentService.createComment(postId, testInputData);
    expect(commentApi.createComment).toHaveBeenCalledWith(postId, apiPayload);
    expect(result).toEqual({
      success: true,
      message: "Create comment successfully",
      data: createdCommentDataResponse(undefined, [{ file: "image.png" }]),
    });
  });

  it("Should create comment with both text and media successfully", async () => {
    vi.mocked(commentApi.createComment).mockResolvedValue(
      createMockApiResponse(
        201,
        createdCommentDataResponse("Hello Threddit", [{ file: "image.png" }]),
        "Create comment successfully",
        201,
      ),
    );

    vi.mocked(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).mockResolvedValue(mockedUploadResponse);

    const testInputData = {
      text: "Hello Threddit",
      mentionedUsers: [],
      parentCommentId: null,
      media: [{ file: "image.png" }],
    };

    const apiPayload = {
      text: "Hello Threddit",
      uploadSessionId: mockedUploadResponse.uploadSessionId,
    };
    const result = await commentService.createComment(postId, testInputData);

    expect(commentApi.createComment).toHaveBeenCalledWith(postId, apiPayload);
    expect(storageService.uploadUpdatedMediaAndGetSessionId).toHaveBeenCalled();
    expect(result).toEqual({
      success: true,
      message: "Create comment successfully",
      data: createdCommentDataResponse("Hello Threddit", [
        { file: "image.png" },
      ]),
    });
  });

  it("Should return failure shape if upload media error occurs in upload phase", async () => {
    vi.mocked(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).mockResolvedValue({
      success: false,
      message: "Upload media error occurs",
    });

    const textInputData = {
      text: "hello",
      mentionedUsers: [],
      parentCommentId: null,
      media: [{ file: "image.png" }],
    };

    const result = await commentService.createComment(postId, textInputData);
    expect(commentApi.createComment).not.toHaveBeenCalled();
    expect(result).toEqual({
      success: false,
      errorSource: "UPLOAD_STAGE",
      message: "Upload media error occurs",
    });
  });

  it("Should return failure shape if call comment api occurs error", async () => {
    vi.mocked(commentApi.createComment).mockResolvedValue(
      createMockApiResponse(400, undefined, "Error occurs", 400),
    );

    vi.mocked(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).mockResolvedValue(mockedUploadResponse);

    const testInputData = {
      text: "Hello",
      media: [{ file: "image.png" }],
      mentionedUsers: [],
      parentCommentId: null,
    };

    const result = await commentService.createComment(postId, testInputData);

    expect(commentApi.createComment).toHaveBeenCalledWith(postId, {
      text: "Hello",
      uploadSessionId: mockedUploadResponse.uploadSessionId,
    });

    expect(result).toEqual({
      success: false,
      message: "Error occurs",
    });
  });
});
