import { useMemo } from 'react'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'
import { buildPinnedStoryGridCells } from '../utils/buildPinnedStoryGridCells'
import {
  PINNED_STORY_CARD_GAP_PX,
  PINNED_STORY_CARD_WIDTH_PX,
  PINNED_STORY_VISIBLE_CAPACITY,
} from '../utils/constants'

export function usePinnedStoryCarousel(stories = []) {
  const gridCells = useMemo(() => buildPinnedStoryGridCells(stories), [stories])
  const { scrollRef, canScrollLeft, canScrollRight, scrollStories } = useHorizontalScroll(
    PINNED_STORY_CARD_WIDTH_PX,
    PINNED_STORY_CARD_GAP_PX * 2
  )

  return {
    gridCells,
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollStories,
    showNavigation: stories.length > PINNED_STORY_VISIBLE_CAPACITY,
  }
}
