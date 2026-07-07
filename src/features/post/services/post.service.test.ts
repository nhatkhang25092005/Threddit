import { describe, expect, it, vi, beforeEach } from "vitest";
import { postService } from "./post.service";
import { postApi } from "@/api/content/post/post.api";
import { createMockApiResponse } from "@/test/createMockApiResponse";
import { storageService } from "./storage.service";
import {
  buildEditedContentPatch,
  buildEditedContentPayload,
} from "../utils/resolveEditedContent";

vi.mock("../../../api/content/post/post.api", () => ({
  postApi: {
    createPost: vi.fn(),
    editContent: vi.fn(),
    deleteContent: vi.fn(),
  },
}));

vi.mock("./storage.service", () => ({
  storageService: {
    uploadMediaAndGetSessionId: vi.fn(),
    uploadUpdatedMediaAndGetSessionId: vi.fn(),
  },
}));

vi.mock("../utils/resolveEditedContent", () => ({
  buildEditedContentPayload: vi.fn(),
  buildEditedContentPatch: vi.fn(),
}));

describe("postService.createPost", () => {
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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a post successfully with text content only", async () => {
    const mockText = "ddd";
    const successMessage = "Đăng tải nội dung thành công";
    const mockData = mockDataResponse(mockText);

    const input = {
      text: mockText,
      type: "post" as const,
    };

    const expectedApiPayload = {
      text: mockText,
      mentionedUsers: [],
      type: "post",
    };

    const expected = {
      success: true,
      message: successMessage,
      data: mockData,
    };

    vi.mocked(postApi.createPost).mockResolvedValue(
      createMockApiResponse(201, mockData, successMessage, 201),
    );

    const actual = await postService.createPost(input);

    expect(postApi.createPost).toHaveBeenCalledWith(expectedApiPayload);
    expect(actual).toEqual(expected);
  });

  it("Should create a post successfully with media content only", async () => {
    const successMessage = "Create new post successfully";
    const mockSessionId = "b9bb9e73-80f5-48ac-a7d8-6d82e07b674e";
    const mockMedia = [{ file: "image1.png" }, { file: "image2.png" }];
    const mockData = mockDataResponse("", mockMedia);

    const input = {
      text: "",
      media: mockMedia,
    };

    const expectedApiPayload = {
      text: "",
      mentionedUsers: [],
      type: "post",
      uploadSessionId: mockSessionId,
    };

    const expected = {
      success: true,
      message: successMessage,
      data: mockData,
    };

    vi.mocked(storageService.uploadMediaAndGetSessionId).mockResolvedValue(
      mockUploadResponse,
    );
    vi.mocked(postApi.createPost).mockResolvedValue(
      createMockApiResponse(201, mockData, successMessage, 201),
    );

    const actual = await postService.createPost(input);

    expect(postApi.createPost).toHaveBeenCalledWith(expectedApiPayload);
    expect(actual).toEqual(expected);
  });

  it("Should create a post successfully with media and text together", async () => {
    const successMessage = "Create new post successfully";
    const mockSessionId = "b9bb9e73-80f5-48ac-a7d8-6d82e07b674e";
    const mockMedia = [{ file: "image.png" }];
    const mockData = mockDataResponse("hello", mockMedia);

    const input = {
      text: "hello",
      media: mockMedia,
    };

    const expectedApiPayload = {
      text: "hello",
      mentionedUsers: [],
      type: "post",
      uploadSessionId: mockSessionId,
    };

    const expected = {
      success: true,
      message: successMessage,
      data: mockData,
    };

    vi.mocked(storageService.uploadMediaAndGetSessionId).mockResolvedValue({
      success: true,
      uploadSessionId: mockSessionId,
    });
    vi.mocked(postApi.createPost).mockResolvedValue(
      createMockApiResponse(201, mockData, successMessage, 201),
    );

    const actual = await postService.createPost(input);

    expect(postApi.createPost).toHaveBeenCalledWith(expectedApiPayload);
    expect(actual).toEqual(expected);
  });

  // it("Shouldn't have uploadSessionId if there are no media in the input", async () => {
  //   const input = {
  //     text: "abc",
  //     media: [],
  //   };
  //   const expected = {
  //     success: false,
  //     message: "Fail in create new post",
  //     errorSource: "CREATE_NEW_POST",
  //   };
  //   const actual = await postService.createPost(input);
  //   expect(postApi.createPost).toHaveBeenCalledWith({
  //     text: "abc",
  //     type: "post",
  //     mentionedUsers: [],
  //   });
  // });

  it("Should return valid response if an error occurs in the upload phase", async () => {
    // 1. Arrange
    const input = {
      text: "abc",
      media: [{ file: "image1.png" }, { file: "image2.png" }],
    };

    const expected = {
      success: false,
      errorSource: "POST_UPLOAD_MEDIA",
      message: "Media upload failed",
    };

    // 2. Mocking Services
    vi.mocked(storageService.uploadMediaAndGetSessionId).mockResolvedValue({
      success: false,
      message: "Media upload failed",
    });

    // 3. Act
    const actual = await postService.createPost(input);

    // 4. Assert
    expect(storageService.uploadMediaAndGetSessionId).toHaveBeenCalledWith(
      input.media,
    );
    expect(actual).toEqual(expected);
  });

  it("Should return valid response if an error occurs in create post phase", async () => {
    // 1. Arrange
    const mockSessionId = "b9bb9e73-80f5-48ac-a7d8-6d82e07b674e";

    const input = {
      text: "hello",
      media: [{ file: "image1.png" }, { file: "image2.png" }],
    };

    const expectedApiPayload = {
      text: "hello",
      mentionedUsers: [],
      type: "post",
      uploadSessionId: mockSessionId,
    };

    const expected = {
      success: false,
      message: "Network Error",
      errorSource: "CREATE_NEW_POST",
    };

    // 2. Mocking Services & APIs
    vi.mocked(storageService.uploadMediaAndGetSessionId).mockResolvedValue(
      mockUploadResponse,
    );
    vi.mocked(postApi.createPost).mockRejectedValue(new Error("Network Error"));

    // 3. Act
    const actual = await postService.createPost(input);

    // 4. Assert
    expect(postApi.createPost).toHaveBeenCalledWith(expectedApiPayload);
    expect(actual).toEqual(expected);
  });
});

describe("postService.updatePost", () => {
  const contentId = 123;
  const mockUploadUpdateResponse = {
    success: true,
    uploadSessionId: "edit-session-id-12345",
    presignedMediaUrls: ["https://s3.amazonaws.com/presigned-url"],
  };
  const mockApiEditSuccessResponse = {
    success: true,
    message: "Updated Successfully",
    data: {
      id: contentId,
      text: "text with media",
      mediaFiles: [{ url: "https://s3.amazonaws.com/image.png" }],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should edit a post successfully with text content only (no media upload needed)", async () => {
    // 1. Arrange
    const successMessage = "Updated Successfully";

    const input = {
      text: "edited text",
      media: [],
      mentionedUsers: [],
    };

    const expectedApiPayload = {
      text: "edited text",
      type: "post",
      mentionedUsers: [],
    };

    const expectedPatch = {
      type: "post",
      mentionedUsers: [],
      mediaFiles: [],
      text: "edited text",
      time: {
        updatedAt: "now",
      },
    };

    const expected = {
      success: true,
      message: successMessage,
      patch: expectedPatch,
    };

    // 2. Mocking Services & APIs
    vi.mocked(postApi.editContent).mockResolvedValue(
      createMockApiResponse(
        201,
        mockApiEditSuccessResponse,
        successMessage,
        201,
      ),
    );
    vi.mocked(buildEditedContentPayload).mockReturnValue({
      hasExplicitMediaField: false,
      hasMissingMediaKey: false,
      payload: expectedApiPayload,
    });
    vi.mocked(buildEditedContentPatch).mockReturnValue(expectedPatch);

    // 3. Act
    const actual = await postService.editPost(contentId, input);

    // 4. Assert
    expect(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).not.toHaveBeenCalled();
    expect(postApi.editContent).toHaveBeenCalledWith(
      contentId,
      expectedApiPayload,
    );
    expect(actual).toEqual(expected);
  });

  it("Should upload media and edit post successfully when new media files are provided", async () => {
    // 1. Arrange
    const successMessage = "Updated Successfully";
    const mockSessionId = "edit-session-id-12345";
    const mockMedia = [{ file: "new-image.png" }];

    const input = {
      text: "text with media",
      media: mockMedia,
    };

    const expectedApiPayload = {
      text: "text with media",
      type: "post",
      uploadSessionId: mockSessionId,
      mentionedUsers: [],
    };

    const expectedPatch = {
      type: "post",
      mentionedUsers: [],
      mediaFiles: mockMedia,
      text: "text with media",
      time: {
        updatedAt: "now",
      },
    };

    const expected = {
      success: true,
      message: successMessage,
      patch: expectedPatch,
    };

    // 2. Mocking Services & APIs
    vi.mocked(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).mockResolvedValue(mockUploadUpdateResponse);
    vi.mocked(buildEditedContentPayload).mockReturnValue({
      hasExplicitMediaField: true,
      hasMissingMediaKey: false,
      payload: expectedApiPayload,
    });
    vi.mocked(postApi.editContent).mockResolvedValue(
      createMockApiResponse(
        201,
        mockApiEditSuccessResponse,
        successMessage,
        201,
      ),
    );
    vi.mocked(buildEditedContentPatch).mockReturnValue(expectedPatch);

    // 3. Act
    const actual = await postService.editPost(contentId, input);

    // 4. Assert
    expect(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).toHaveBeenCalledWith(contentId, expect.any(Array));
    expect(postApi.editContent).toHaveBeenCalledWith(
      contentId,
      expectedApiPayload,
    );
    expect(actual).toEqual(expected);
  });

  it("Should edit both text and media content successfully at the same time", async () => {
    // 1. Mock tiến trình upload media mới thành công để lấy SessionId và Presigned URLs
    vi.mocked(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).mockResolvedValue({
      success: true,
      uploadSessionId: "dual-update-session-99999",
      presignedMediaUrls: [
        "https://s3.amazonaws.com/presigned-updated-img.png",
      ],
    });

    // 2. Mock buildEditedContentPayload nhận diện đầy đủ cả text và dữ liệu media mới
    vi.mocked(buildEditedContentPayload).mockReturnValue({
      hasExplicitMediaField: true,
      hasMissingMediaKey: false,
      payload: {
        text: "Fully updated post text",
        type: "post",
        uploadSessionId: "dual-update-session-99999",
        mentionedUsers: [],
      },
    });

    // 3. Mock API editContent trả về kết quả thành công sau khi nhận payload tổng hợp
    const mockDualApiResponse = {
      id: contentId,
      text: "Fully updated post text",
      mediaFiles: [{ url: "https://s3.amazonaws.com/final-prod-img.png" }],
    };

    vi.mocked(postApi.editContent).mockResolvedValue(
      createMockApiResponse(
        200,
        mockDualApiResponse,
        "Updated Successfully",
        200,
      ),
    );

    // 4. Mock buildEditedContentPatch sinh ra bản vá chứa cả chữ và ảnh mới cho Store
    vi.mocked(buildEditedContentPatch).mockReturnValue({
      type: "post",
      text: "Fully updated post text",
      mediaFiles: [{ url: "https://s3.amazonaws.com/final-prod-img.png" }],
      mentionedUsers: [],
      time: {
        updatedAt: "2026-06-14T15:18:00.000Z",
      },
    });

    // Dữ liệu đầu vào thay đổi toàn diện từ Client
    const input = {
      text: "Fully updated post text",
      media: [{ file: "new-photo.jpg" }],
      mentionedUsers: [],
    };

    // Thực thi hàm cần test
    const result = await postService.editPost(contentId, input);

    // --- TIẾN HÀNH KIỂM TRA (EXPECT) ---

    // Kiểm tra hàm upload được gọi với đúng ID bài viết và mảng media
    expect(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).toHaveBeenCalledWith(contentId, expect.any(Array));

    // Kiểm tra helper xử lý payload nhận diện đúng các tham số tổng hợp từ quá trình upload
    expect(buildEditedContentPayload).toHaveBeenCalledWith({
      type: "post",
      data: input,
      mediaList: expect.any(Array),
      presignedMediaUrls: [
        "https://s3.amazonaws.com/presigned-updated-img.png",
      ],
      uploadSessionId: "dual-update-session-99999",
    });

    // Kiểm tra API endpoint nhận đúng ID và payload tổng hợp cuối cùng
    expect(postApi.editContent).toHaveBeenCalledWith(contentId, {
      text: "Fully updated post text",
      type: "post",
      uploadSessionId: "dual-update-session-99999",
      mentionedUsers: [],
    });

    // Kiểm tra đầu ra của Service khớp trọn vẹn cấu trúc dữ liệu mới kèm bản vá (patch)
    expect(result).toEqual({
      success: true,
      message: "Updated Successfully",
      patch: {
        type: "post",
        text: "Fully updated post text",
        mediaFiles: [{ url: "https://s3.amazonaws.com/final-prod-img.png" }],
        mentionedUsers: [],
        time: {
          updatedAt: "2026-06-14T15:18:00.000Z",
        },
      },
    });
  });

  it("should return failure response if media upload fails during the editing phase", async () => {
    // 1. Arrange
    const input = {
      text: "broken upload text",
      media: [{ file: "failed-image.png" }],
    };

    const expected = {
      success: false,
      message: "Upload the update failed due to connection error",
      errorSource: "UPLOAD",
    };

    // 2. Mocking Services
    vi.mocked(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).mockResolvedValue({
      success: false,
      message: "Upload the update failed due to connection error",
    });

    // 3. Act
    const actual = await postService.editPost(contentId, input);

    // 4. Assert
    expect(postApi.editContent).not.toHaveBeenCalled();
    expect(actual).toEqual(expected);
  });

  it("should return failure response when API editContent fails", async () => {
    // 1. Arrange
    const errorMessage = "Can not update posts content";

    const input = {
      text: "api fails",
      media: [],
    };

    const expectedApiPayload = {
      text: "api fails",
      type: "post",
      mentionedUsers: [],
    };

    const expected = {
      success: false,
      message: errorMessage,
      errorSource: "UPDATE_CONTENT_CALL",
    };

    // 2. Mocking Services & APIs
    vi.mocked(buildEditedContentPayload).mockReturnValue({
      hasExplicitMediaField: false,
      hasMissingMediaKey: false,
      payload: expectedApiPayload,
    });
    vi.mocked(postApi.editContent).mockResolvedValue(
      createMockApiResponse(400, null, errorMessage, 400),
    );

    // 3. Act
    const actual = await postService.editPost(contentId, input);

    // 4. Assert
    expect(buildEditedContentPatch).not.toHaveBeenCalled();
    expect(actual).toEqual(expected);
  });

  it("should handle error or reject if uploadUpdatedMediaAndGetSessionId throws an exception", async () => {
    vi.mocked(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).mockResolvedValue({
      success: false,
      message: "S3 Bucket Timeout Error",
    });

    const input = {
      text: "upload exception text",
      media: [{ file: "failed-network-image.png" }],
    };

    const result = await postService.editPost(contentId, input);

    expect(result).toEqual({
      success: false,
      message: "S3 Bucket Timeout Error",
      errorSource: "UPLOAD",
    });
    expect(postApi.editContent).not.toHaveBeenCalled();
  });
});

describe("postService.deletePost", () => {
  const postId = 10;
  beforeEach(() => vi.clearAllMocks());
  it("Should delete the specific post successfully", async () => {
    // 1. Arrange
    const successMessage = "Delete successfully";

    const expected = {
      success: true,
      message: successMessage,
    };

    // 2. Mocking APIs
    vi.mocked(postApi.deleteContent).mockResolvedValue(
      createMockApiResponse(200, null, successMessage, 200),
    );

    // 3. Act
    const actual = await postService.deletePost(postId);

    // 4. Assert
    expect(postApi.deleteContent).toHaveBeenCalledWith(postId);
    expect(actual).toEqual(expected);
  });

  it("Should return fail if delete post unsuccessfully", async () => {
    // 1. Arrange
    const errorMessage = "Delete Failed";

    const expected = {
      success: false,
      message: errorMessage,
    };

    // 2. Mocking APIs
    vi.mocked(postApi.deleteContent).mockResolvedValue(
      createMockApiResponse(400, null, errorMessage, 400),
    );

    // 3. Act
    const actual = await postService.deletePost(postId);

    // 4. Assert
    expect(postApi.deleteContent).toHaveBeenCalledWith(postId);
    expect(actual).toEqual(expected);
  });
});
