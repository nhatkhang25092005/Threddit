import { Box } from '@mui/material'
import StoryCard from '../StoryCard'
import { style } from '../style'
import StoryListEmptyState from './StoryListEmptyState'

const sx = style.storyList

export default function StoryListViewer({
  activeIndex,
  activeStory,
  handleClose,
  handleNext,
  handlePrev,
  isFetching,
  storyList,
}) {
  return (
    <Box sx={{ ...sx.viewerWrap, height: '100%' }}>
      {activeStory ? (
        <StoryCard
          key={activeStory.id}
          canGoNext={activeIndex < storyList.length - 1}
          canGoPrev={activeIndex > 0}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
          story={activeStory}
          storyCount={storyList.length}
          storyIndex={activeIndex}
          variant="viewer"
        />
      ) : (
        <StoryListEmptyState isFetching={isFetching} />
      )}
    </Box>
  )
}
