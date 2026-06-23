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
    vi.mocked(postApi.editContent).mockResolvedValue(
      createMockApiResponse(
        201,
        mockApiEditSuccessResponse,
        "Updated Successfully",
        201,
      ),
    );

    vi.mocked(buildEditedContentPayload).mockReturnValue({
      hasExplicitMediaField: false,
      hasMissingMediaKey: false,
      payload: { text: "edited text", type: "post", mentionedUsers: [] },
    });

    vi.mocked(buildEditedContentPatch).mockReturnValue({
      type: "post",
      mentionedUsers: [],
      mediaFiles: [],
      text: "edited text",
      time: {
        updatedAt: "now",
      },
    });

    const input = {
      text: "edited text",
      media: [],
      mentionedUsers: [],
    };

    const result = await postService.editPost(contentId, input);
    // OK
    expect(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).not.toHaveBeenCalled();

    // OK
    expect(postApi.editContent).toHaveBeenCalledWith(contentId, {
      text: "edited text",
      type: "post",
      mentionedUsers: [],
    });

    expect(result).toEqual({
      success: true,
      message: "Updated Successfully",
      patch: {
        text: "edited text",
        type: "post",
        time: {
          updatedAt: "now",
        },
        mediaFiles: [],
        mentionedUsers: [],
      },
    });
  });

  it("Should upload media and edit post successfully when new media files are provided", async () => {
    vi.mocked(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).mockResolvedValue(mockUploadUpdateResponse);

    vi.mocked(buildEditedContentPayload).mockReturnValue({
      hasExplicitMediaField: true,
      hasMissingMediaKey: false,
      payload: {
        text: "text with media",
        type: "post",
        uploadSessionId: "edit-session-id-12345",
        mentionedUsers: [],
      },
    });
    vi.mocked(postApi.editContent).mockResolvedValue(
      createMockApiResponse(
        201,
        mockApiEditSuccessResponse,
        "Updated Successfully",
        201,
      ),
    );

    vi.mocked(buildEditedContentPatch).mockReturnValue({
      type: "post",
      mentionedUsers: [],
      mediaFiles: [{ file: "new-image.png" }],
      text: "text with media",
      time: {
        updatedAt: "now",
      },
    });
    const input = {
      text: "text with media",
      media: [{ file: "new-image.png" }],
    };

    const result = await postService.editPost(contentId, input);
    expect(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).toHaveBeenCalledWith(contentId, expect.any(Array));

    expect(postApi.editContent).toHaveBeenCalledWith(contentId, {
      text: "text with media",
      type: "post",
      mentionedUsers: [],
      uploadSessionId: "edit-session-id-12345",
    });

    expect(result).toEqual({
      success: true,
      message: "Updated Successfully",
      patch: {
        type: "post",
        mentionedUsers: [],
        mediaFiles: [{ file: "new-image.png" }],
        text: "text with media",
        time: {
          updatedAt: "now",
        },
      },
    });
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
    // Giả lập upload media bị lỗi
    vi.mocked(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).mockResolvedValue({
      success: false,
      message: "Upload the update failed due to connection error",
    });

    const input = {
      text: "broken upload text",
      media: [{ file: "failed-image.png" }],
    };

    const result = await postService.editPost(contentId, input);

    // Luồng xử lý phải dừng lại ngay lập tức, không gọi tới API editContent
    expect(postApi.editContent).not.toHaveBeenCalled();

    // Kiểm tra cấu trúc lỗi trả ra chuẩn xác
    expect(result).toEqual({
      success: false,
      message: "Upload the update failed due to connection error",
      errorSource: "UPLOAD",
    });
  });

  it("should return failure response when API editContent fails", async () => {
    vi.mocked(buildEditedContentPayload).mockReturnValue({
      hasExplicitMediaField: false,
      hasMissingMediaKey: false,
      payload: { text: "api fails", type: "post", mentionedUsers: [] },
    });

    vi.mocked(postApi.editContent).mockResolvedValue(
      createMockApiResponse(400, null, "Can not update posts content", 400),
    );

    const input = {
      text: "api fails",
      media: [],
    };

    const result = await postService.editPost(contentId, input);

    expect(buildEditedContentPatch).not.toHaveBeenCalled();

    expect(result).toEqual({
      success: false,
      message: "Can not update posts content",
      errorSource: "UPDATE_CONTENT_CALL",
    });
  });

  it("should return failure response if uploadUpdatedMediaAndGetSessionId returns success false", async () => {
    vi.mocked(
      storageService.uploadUpdatedMediaAndGetSessionId,
    ).mockResolvedValue({
      success: false,
      message: "Upload the update failed due to connection error",
    });

    const input = {
      text: "broken upload text",
      media: [{ file: "failed-image.png" }],
    };

    const result = await postService.editPost(contentId, input);

    // Luồng xử lý phải dừng lại ngay lập tức, không được gọi tới API chỉnh sửa endpoint
    expect(postApi.editContent).not.toHaveBeenCalled();

    // Kiểm tra cấu trúc lỗi trả ra khớp chuẩn xác với mã nguồn handle trong post.service.js
    expect(result).toEqual({
      success: false,
      message: "Upload the update failed due to connection error",
      errorSource: "UPLOAD",
    });
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
    vi.mocked(postApi.deleteContent).mockResolvedValue(
      createMockApiResponse(200, null, "Delete successfully", 200),
    );

    const result = await postService.deletePost(postId);
    expect(postApi.deleteContent).toHaveBeenCalledWith(postId);
    expect(result).toEqual({
      success: true,
      message: "Delete successfully",
    });
  });

  it("Should return fail if delete post unsuccessfully", async () => {
    vi.mocked(postApi.deleteContent).mockResolvedValue(
      createMockApiResponse(400, null, "Delete Failed", 400),
    );

    const result = await postService.deletePost(postId);
    expect(postApi.deleteContent).toHaveBeenCalledWith(postId);
    expect(result).toEqual({
      success: false,
      message: "Delete Failed",
    });
  });
});
