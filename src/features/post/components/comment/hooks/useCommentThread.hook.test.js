import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useCommentThread } from "./useCommentThread";

const mockUser = { username: "viewer" };

const {
  mockGetCommentList,
  mockCreateComment,
  mockUpdateComment,
  mockDeleteComment,
  mockReactionComment,
  mockPostContext,
} = vi.hoisted(() => {
  const getCommentList = vi.fn();
  const createComment = vi.fn();
  const updateComment = vi.fn();
  const deleteComment = vi.fn();
  const reactionComment = vi.fn();

  return {
    mockGetCommentList: getCommentList,
    mockCreateComment: createComment,
    mockUpdateComment: updateComment,
    mockDeleteComment: deleteComment,
    mockReactionComment: reactionComment,
    mockPostContext: {
      state: {
        commentById: {},
        commentList: {},
        subCommentList: {},
      },
      actions: {
        getCommentList,
        createComment,
        updateComment,
        deleteComment,
        reactionComment,
      },
    },
  };
});

vi.mock("../../../../../core/auth/useAuth", () => ({
  default: () => ({ user: mockUser }),
}));

vi.mock("../../../hooks", () => ({
  usePostContext: () => mockPostContext,
}));

const sampleComment = {
  id: 1,
  text: "First comment",
  author: { username: "alice", displayName: "Alice" },
  createdAt: "2026-01-01T00:00:00.000Z",
};

const emptyListResponse = {
  success: true,
  data: { commentList: [], cursor: null, hasMore: false },
};

describe("useCommentThread", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCommentList.mockResolvedValue(emptyListResponse);
  });

  it("loads comments successfully", async () => {
    mockGetCommentList.mockResolvedValue({
      success: true,
      data: {
        commentList: [sampleComment],
        cursor: null,
        hasMore: false,
      },
    });

    const { result } = renderHook(() => useCommentThread(10));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.comments).toHaveLength(1);
    expect(result.current.isEmpty).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("shows empty state when comment list is empty", async () => {
    const { result } = renderHook(() => useCommentThread(10));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.comments).toEqual([]);
    expect(result.current.isEmpty).toBe(true);
  });

  it("handles load error from API", async () => {
    mockGetCommentList.mockResolvedValue({
      success: false,
      message: "Load failed",
    });

    const { result } = renderHook(() => useCommentThread(10));

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.errorMessage).toBe("Load failed");
    expect(result.current.comments).toEqual([]);
  });

  it("creates comment with valid text", async () => {
    mockCreateComment.mockResolvedValueOnce({
      success: true,
      data: {
        createdComment: {
          id: 2,
          text: "New comment",
          author: { username: "viewer" },
          createdAt: "2026-01-02T00:00:00.000Z",
        },
      },
    });

    const { result } = renderHook(() => useCommentThread(10));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    let createResult;
    await act(async () => {
      createResult = await result.current.createComment({ text: "New comment", media: [] });
    });

    expect(mockCreateComment).toHaveBeenCalled();
    expect(createResult.success).toBe(true);
    expect(result.current.comments).toHaveLength(1);
  });

  it("returns API error when create comment fails", async () => {
    mockCreateComment.mockResolvedValueOnce({
      success: false,
      message: "Content cannot be empty",
    });

    const { result } = renderHook(() => useCommentThread(10));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    let createResult;
    await act(async () => {
      createResult = await result.current.createComment({ text: "", media: [] });
    });

    expect(createResult.success).toBe(false);
    expect(result.current.comments).toHaveLength(0);
  });

  it("reacts to comment and rolls back on API failure", async () => {
    mockGetCommentList.mockResolvedValue({
      success: true,
      data: { commentList: [sampleComment], cursor: null, hasMore: false },
    });

    mockReactionComment.mockResolvedValueOnce({ success: false });

    const { result } = renderHook(() => useCommentThread(10));

    await waitFor(() => {
      expect(result.current.comments).toHaveLength(1);
    });

    await act(async () => {
      await result.current.reactComment(1, "LIKE");
    });

    expect(result.current.comments[0].viewer.reaction).toBeNull();
  });

  it("deletes comment successfully", async () => {
    mockGetCommentList.mockResolvedValue({
      success: true,
      data: { commentList: [sampleComment], cursor: null, hasMore: false },
    });

    mockDeleteComment.mockResolvedValueOnce({
      success: true,
      data: { removedCount: 1 },
    });

    const { result } = renderHook(() => useCommentThread(10));

    await waitFor(() => {
      expect(result.current.comments).toHaveLength(1);
    });

    await act(async () => {
      await result.current.deleteComment({ id: 1 });
    });

    expect(result.current.comments).toHaveLength(0);
  });
});
