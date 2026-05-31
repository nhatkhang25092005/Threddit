import { describe, expect, it } from "vitest";
import { buildPinnedStoryGridCells } from "./buildPinnedStoryGridCells";

describe("buildPinnedStoryGridCells", () => {
  it("returns empty array for empty input", () => {
    expect(buildPinnedStoryGridCells([])).toEqual([]);
    expect(buildPinnedStoryGridCells(null)).toEqual([]);
  });

  it("builds grid cells for a single story", () => {
    const cells = buildPinnedStoryGridCells([{ id: 1 }]);

    expect(cells.length).toBeGreaterThan(0);
    expect(cells[0].story).toEqual({ id: 1 });
    expect(cells[0].key).toBe("story-1");
  });

  it("builds cells for multiple stories within one page", () => {
    const stories = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const cells = buildPinnedStoryGridCells(stories);
    const storyIds = cells.filter((cell) => cell.story).map((cell) => cell.story.id);

    expect(storyIds).toContain(1);
    expect(storyIds).toContain(2);
    expect(storyIds).toContain(3);
  });

  it("paginates stories beyond visible capacity", () => {
    const stories = Array.from({ length: 8 }, (_, index) => ({ id: index + 1 }));
    const cells = buildPinnedStoryGridCells(stories);
    const filledCells = cells.filter((cell) => cell.story);

    expect(filledCells.length).toBe(8);
  });
});
