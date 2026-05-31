import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import CommentEmptyState from "./CommentEmptyState";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";

describe("CommentEmptyState", () => {
  it("renders default empty state", () => {
    render(<CommentEmptyState />);

    expect(screen.getByText(commentText.emptyTitle)).toBeInTheDocument();
    expect(screen.getByText(commentText.emptyDescription)).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <CommentEmptyState
        title="Chưa có bình luận"
        description="Hãy là người đầu tiên bình luận"
      />
    );

    expect(screen.getByText("Chưa có bình luận")).toBeInTheDocument();
    expect(screen.getByText("Hãy là người đầu tiên bình luận")).toBeInTheDocument();
  });
});
