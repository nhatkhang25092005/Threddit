import { Box } from '@mui/material'
import { style } from '../style'
import StoryListBackground from './StoryListBackground'
import StoryListViewer from './StoryListViewer'
import { useStoryListPage } from './useStoryListPage'

const sx = style.storyList

export default function StoryList() {
  const {
    activeIndex,
    activeStory,
    handleClose,
    handleNext,
    handlePrev,
    isFetching,
    storyList,
  } = useStoryListPage()
  const showEmptyCloseButton = !isFetching && storyList.length === 0

  return (
    <Box sx={sx.root}>
      <StoryListBackground
        onClose={handleClose}
        showCloseButton={showEmptyCloseButton}
      />

      <Box sx={sx.shell}>
        <StoryListViewer
          activeIndex={activeIndex}
          activeStory={activeStory}
          handleClose={handleClose}
          handleNext={handleNext}
          handlePrev={handlePrev}
          isFetching={isFetching}
          storyList={storyList}
        />
      </Box>
    </Box>
  )
}
