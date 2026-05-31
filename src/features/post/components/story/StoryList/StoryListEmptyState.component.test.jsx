import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import StoryListEmptyState from "./StoryListEmptyState";
import { story } from "../../../../../constant/text/vi/story";

describe("StoryListEmptyState", () => {
  it("renders empty state text when not fetching", () => {
    render(<StoryListEmptyState isFetching={false} />);

    expect(screen.getByText(story.storyList.emptyTitle)).toBeInTheDocument();
    expect(screen.getByText(story.storyList.emptyText)).toBeInTheDocument();
  });

  it("renders loading text when fetching", () => {
    render(<StoryListEmptyState isFetching />);

    expect(screen.getByText(story.storyList.loadingTitle)).toBeInTheDocument();
    expect(screen.getByText(story.storyList.loadingText)).toBeInTheDocument();
  });
});
