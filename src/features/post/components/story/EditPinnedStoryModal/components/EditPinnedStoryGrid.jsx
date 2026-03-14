import { Box, IconButton, Typography } from '@mui/material'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import EditPinnedStoryGridItem from './EditPinnedStoryGridItem'
import { usePinnedStoryCarousel } from '../hooks'
import { style } from '../style'
import { EDIT_PINNED_STORY_MODAL_TEXT } from '../utils/constants'

const sx = style.editPinnedStoryModal.grid

export default function EditPinnedStoryGrid({
  stories,
  removingStoryIds,
  onUnpin,
}) {
  const {
    canScrollLeft,
    canScrollRight,
    gridCells,
    scrollRef,
    scrollStories,
    showNavigation,
  } = usePinnedStoryCarousel(stories)

  return (
    <Box>
      <Box sx={sx.overview}>
        <Typography sx={sx.eyebrow}>{EDIT_PINNED_STORY_MODAL_TEXT.gridEyebrow}</Typography>
        <Typography sx={sx.caption}>{EDIT_PINNED_STORY_MODAL_TEXT.gridCaption}</Typography>
      </Box>

      <Box sx={sx.frame}>
        {showNavigation ? (
          <IconButton
            aria-label={EDIT_PINNED_STORY_MODAL_TEXT.previousAriaLabel}
            disabled={!canScrollLeft}
            onClick={() => scrollStories('left')}
            sx={sx.navButton('left')}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>
        ) : null}

        {showNavigation ? (
          <IconButton
            aria-label={EDIT_PINNED_STORY_MODAL_TEXT.nextAriaLabel}
            disabled={!canScrollRight}
            onClick={() => scrollStories('right')}
            sx={sx.navButton('right')}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        ) : null}

        <Box ref={scrollRef} sx={sx.track}>
          {gridCells.map((cell) => (
            <EditPinnedStoryGridItem
              key={cell.key}
              isRemoving={Boolean(cell.story && removingStoryIds[cell.story.id])}
              onUnpin={onUnpin}
              story={cell.story}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
