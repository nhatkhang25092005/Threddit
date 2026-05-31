import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import EditPinnedStoryEmptyState from "./EditPinnedStoryEmptyState";
import { EDIT_PINNED_STORY_MODAL_TEXT } from "../utils/constants";

describe("EditPinnedStoryEmptyState", () => {
  it("renders empty pinned story state", () => {
    render(<EditPinnedStoryEmptyState isLoading={false} />);

    expect(screen.getByText(EDIT_PINNED_STORY_MODAL_TEXT.emptyTitle)).toBeInTheDocument();
    expect(screen.getByText(EDIT_PINNED_STORY_MODAL_TEXT.emptyText)).toBeInTheDocument();
  });

  it("renders loading pinned story state", () => {
    render(<EditPinnedStoryEmptyState isLoading />);

    expect(screen.getByText(EDIT_PINNED_STORY_MODAL_TEXT.loadingTitle)).toBeInTheDocument();
    expect(screen.getByText(EDIT_PINNED_STORY_MODAL_TEXT.loadingText)).toBeInTheDocument();
  });
});
