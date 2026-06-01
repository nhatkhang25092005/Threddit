import { describe, expect, it, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import FriendStoryList from "./FriendStoryList";
import { story } from "../../../../../constant/text/vi/story";

const mockNavigate = vi.fn();
const mockGetFriendStory = vi.fn();

let friendStoryMap = {};
let friendStoryLists = {};
let myStories = [];

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: null }),
  useParams: () => ({ username: "alice" }),
}));

vi.mock("../../../../../core/auth/useAuth", () => ({
  default: () => ({ username: "alice", displayName: "Alice" }),
}));

vi.mock("../../../hooks", () => ({
  usePostContext: () => ({
    actions: {
      getFriendStory: (...args) => mockGetFriendStory(...args),
    },
    selector: {
      story: {
        getCurrentStoryListOf: () => myStories,
        getFriendStoryIdsMap: () => friendStoryMap,
        getFriendStoryListOf: (username) => friendStoryLists[username] || [],
      },
    },
  }),
}));

describe("FriendStoryList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    friendStoryMap = {};
    friendStoryLists = {};
    myStories = [];
    mockGetFriendStory.mockResolvedValue(undefined);
  });

  it("returns null when there are no stories and fetch is skipped", () => {
    friendStoryMap = { bob: true };
    friendStoryLists = { bob: [] };

    const { container } = render(<FriendStoryList />);

    expect(container.firstChild).toBeNull();
    expect(mockGetFriendStory).not.toHaveBeenCalled();
  });

  it("returns null after fetch completes with empty friend stories", async () => {
    const { container } = render(<FriendStoryList />);

    await waitFor(() => {
      expect(mockGetFriendStory).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });

  it("renders friend stories when data exists", () => {
    friendStoryMap = { bob: true };
    friendStoryLists = {
      bob: [{
        id: 10,
        author: { username: "bob", displayName: "Bob" },
        time: { createdAt: "2026-01-02T00:00:00.000Z" },
      }],
    };

    render(<FriendStoryList />);

    expect(screen.getByText(story.storyList.friendStories)).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("@bob")).toBeInTheDocument();
  });

  it("renders loading state while fetching friend stories", async () => {
    mockGetFriendStory.mockImplementation(() => new Promise(() => {}));

    render(<FriendStoryList />);

    await waitFor(() => {
      expect(screen.getByText(story.storyList.fetchingList)).toBeInTheDocument();
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("does not fetch friend stories when map already has data", () => {
    friendStoryMap = { bob: true };
    friendStoryLists = {
      bob: [{
        id: 10,
        author: { username: "bob", displayName: "Bob" },
        time: { createdAt: "2026-01-02T00:00:00.000Z" },
      }],
    };

    render(<FriendStoryList />);

    expect(mockGetFriendStory).not.toHaveBeenCalled();
  });
});
