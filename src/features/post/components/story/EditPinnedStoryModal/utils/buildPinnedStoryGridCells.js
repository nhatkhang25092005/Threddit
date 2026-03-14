import {
  PINNED_STORY_GRID_COLUMNS,
  PINNED_STORY_GRID_ROWS,
  PINNED_STORY_VISIBLE_CAPACITY,
} from './constants'

export function buildPinnedStoryGridCells(stories = []) {
  if (!Array.isArray(stories) || stories.length === 0) return []

  const gridCells = []

  for (let pageStart = 0; pageStart < stories.length; pageStart += PINNED_STORY_VISIBLE_CAPACITY) {
    const pageStories = stories.slice(pageStart, pageStart + PINNED_STORY_VISIBLE_CAPACITY)
    const columnCount = Math.min(PINNED_STORY_GRID_COLUMNS, pageStories.length)

    for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
      for (let rowIndex = 0; rowIndex < PINNED_STORY_GRID_ROWS; rowIndex += 1) {
        const storyIndex = pageStart + (rowIndex * PINNED_STORY_GRID_COLUMNS) + columnIndex
        const story = stories[storyIndex] ?? null

        gridCells.push({
          key: story?.id != null
            ? `story-${story.id}`
            : `placeholder-${pageStart}-${columnIndex}-${rowIndex}`,
          story,
        })
      }
    }
  }

  return gridCells
}
