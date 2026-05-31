import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCommentReplies } from "./useCommentReplies";

const mockGetChildComment = vi.fn();

vi.mock("../../../../hooks", () => ({
  usePostContext: () => ({
    actions: {
      getChildComment: (...args) => mockGetChildComment(...args),
    },
  }),
}));

vi.mock("../../../../../../hooks/useInfiniteScroll", () => ({
  default: () => ({ current: null }),
}));

const parentComment = {
  id: 1,
  level: 0,
  text: "parent",
  author: { username: "alice", displayName: "Alice" },
  children: [
    {
      id: 2,
      level: 1,
      parentId: 1,
      text: "inline reply",
      author: { username: "bob", displayName: "Bob" },
      children: [],
      stats: { replyNumber: 0, reactionNumber: 0 },
      viewer: { reaction: null },
      meta: { isEdited: false, isOwner: false },
      time: { createdAt: "2026-01-01T00:00:00.000Z", updatedAt: null },
      media: [],
      hasChildComment: false,
      replyTo: null,
    },
  ],
};

describe("useCommentReplies", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts with base replies from comment children", () => {
    const { result } = renderHook(() =>
      useCommentReplies({ comment: parentComment, currentUser: { username: "viewer" } })
    );

    expect(result.current.visibleReplies).toHaveLength(1);
    expect(result.current.showReplies).toBe(false);
  });

  it("loads replies successfully when viewing replies", async () => {
    mockGetChildComment.mockResolvedValueOnce({
      success: true,
      data: {
        items: [
          {
            id: 3,
            text: "fetched reply",
            author: { username: "carol" },
            parentCommentId: 1,
            createdAt: "2026-01-02T00:00:00.000Z",
          },
        ],
        hasMore: false,
      },
    });

    const { result } = renderHook(() =>
      useCommentReplies({ comment: parentComment, currentUser: { username: "viewer" } })
    );

    await act(async () => {
      await result.current.handleViewReplies();
    });

    expect(mockGetChildComment).toHaveBeenCalled();
    expect(result.current.showReplies).toBe(true);
    expect(result.current.showEmptyReplies).toBe(false);
  });

  it("shows empty replies state when API returns no items", async () => {
    mockGetChildComment.mockResolvedValueOnce({
      success: true,
      data: { items: [], hasMore: false },
    });

    const { result } = renderHook(() =>
      useCommentReplies({ comment: { ...parentComment, children: [] }, currentUser: { username: "viewer" } })
    );

    await act(async () => {
      await result.current.handleViewReplies();
    });

    expect(result.current.showEmptyReplies).toBe(true);
    expect(result.current.showReplies).toBe(false);
  });

  it("returns API error when loading replies fails", async () => {
    mockGetChildComment.mockResolvedValueOnce({
      success: false,
      message: "Parent comment not found",
    });

    const { result } = renderHook(() =>
      useCommentReplies({ comment: parentComment, currentUser: { username: "viewer" } })
    );

    let response;
    await act(async () => {
      response = await result.current.handleViewReplies();
    });

    expect(response.success).toBe(false);
  });

  it("syncs created reply through onReply handler", async () => {
    const onReply = vi.fn().mockResolvedValue({
      success: true,
      data: {
        id: 4,
        parentId: 1,
        text: "created reply",
        author: { username: "viewer" },
        children: [],
        level: 1,
      },
    });

    const { result } = renderHook(() =>
      useCommentReplies({
        comment: parentComment,
        currentUser: { username: "viewer" },
        onReply,
      })
    );

    await act(async () => {
      await result.current.handleReply({
        text: "created reply",
        media: [],
        parentComment,
      });
    });

    expect(onReply).toHaveBeenCalled();
  });
});
