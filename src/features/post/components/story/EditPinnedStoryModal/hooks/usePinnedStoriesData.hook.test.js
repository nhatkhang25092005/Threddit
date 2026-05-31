import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { usePinnedStoriesData } from "./usePinnedStoriesData";

const mockGetPinnedStory = vi.fn();
const mockUnpinStory = vi.fn();
let pinnedStories = [];

vi.mock("../../../../../../core/auth/useAuth", () => ({
  default: () => ({ profileUsername: "alice" }),
}));

vi.mock("../../../../hooks", () => ({
  usePostContext: () => ({
    actions: {
      getPinnedStory: (...args) => mockGetPinnedStory(...args),
      unpinStory: (...args) => mockUnpinStory(...args),
    },
    selector: {
      story: {
        getPinnedStoryListOf: () => pinnedStories,
      },
    },
  }),
}));

describe("usePinnedStoriesData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    pinnedStories = [];
    mockGetPinnedStory.mockResolvedValue(undefined);
    mockUnpinStory.mockResolvedValue(undefined);
  });

  it("loads pinned stories when list is empty", async () => {
    const { result } = renderHook(() => usePinnedStoriesData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockGetPinnedStory).toHaveBeenCalledWith("alice");
    expect(result.current.pinnedStories).toEqual([]);
  });

  it("skips fetch when pinned stories already exist", async () => {
    pinnedStories = [{ id: 1, text: "Pinned" }];

    const { result } = renderHook(() => usePinnedStoriesData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockGetPinnedStory).not.toHaveBeenCalled();
    expect(result.current.pinnedStories).toHaveLength(1);
  });

  it("unpins story successfully", async () => {
    pinnedStories = [{ id: 1, text: "Pinned", author: { username: "alice" } }];

    const { result } = renderHook(() => usePinnedStoriesData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.unpinPinnedStory({ id: 1, author: { username: "alice" } });
    });

    expect(mockUnpinStory).toHaveBeenCalledWith(1, "alice");
    expect(result.current.removingStoryIds[1]).toBeUndefined();
  });

  it("does not unpin when story id is missing", async () => {
    const { result } = renderHook(() => usePinnedStoriesData());

    await act(async () => {
      await result.current.unpinPinnedStory({});
    });

    expect(mockUnpinStory).not.toHaveBeenCalled();
  });
});
