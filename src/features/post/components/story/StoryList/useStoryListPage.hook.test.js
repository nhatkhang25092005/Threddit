import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useStoryListPage } from "./useStoryListPage";

const mockNavigate = vi.fn();
const mockGetCurrentStory = vi.fn();
const mockGetPinnedStory = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: null }),
  useParams: () => ({ source: "current", username: "alice", storyId: "1" }),
}));

vi.mock("../../../../../core/auth/useAuth", () => ({
  default: () => ({ user: { username: "alice" } }),
}));

vi.mock("../../../hooks", () => ({
  usePostContext: () => ({
    actions: {
      getCurrentStory: (...args) => mockGetCurrentStory(...args),
      getPinnedStory: (...args) => mockGetPinnedStory(...args),
    },
    selector: {
      story: {
        getCurrentStoryListOf: () => [
          { id: 1, text: "Story 1" },
          { id: 2, text: "Story 2" },
        ],
        getPinnedStoryListOf: () => [],
      },
    },
  }),
}));

describe("useStoryListPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentStory.mockResolvedValue(undefined);
    mockGetPinnedStory.mockResolvedValue(undefined);
  });

  it("loads current stories and exposes active story", async () => {
    const { result } = renderHook(() => useStoryListPage());

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    expect(mockGetCurrentStory).toHaveBeenCalledWith("alice");
    expect(result.current.storyList).toHaveLength(2);
    expect(result.current.activeStory?.id).toBe(1);
    expect(result.current.pageMeta.title).toBe("Story list");
  });

  it("exposes navigation handlers", async () => {
    const { result } = renderHook(() => useStoryListPage());

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    result.current.handleNext();
    expect(mockNavigate).toHaveBeenCalled();

    result.current.handleClose();
    expect(mockNavigate).toHaveBeenCalled();
  });
});
