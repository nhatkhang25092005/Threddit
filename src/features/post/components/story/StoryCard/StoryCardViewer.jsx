import { Box } from '@mui/material'
import { getStoryModeLabel } from '../CreateStoryModal/storyComposer'
import { storyCardViewerSx as sx } from './storyCardViewer.styles'
import { useStoryCardViewer } from './hooks/useStoryCardViewer'
import StoryCardViewerHeader from './StoryCardViewerHeader'
import StoryCardViewerProgress from './StoryCardViewerProgress'
import StoryCardViewerStage from './StoryCardViewerStage'

export default function StoryCardViewer({
  canGoNext = false,
  canGoPrev = false,
  onClose,
  onNext,
  onPrev,
  story,
  storyCount = 1,
  storyIndex = 0,
}) {
  const viewer = useStoryCardViewer({ onNext, story })

  return (
    <Box sx={sx.shell}>
      <StoryCardViewerProgress
        progressPercent={viewer.progressPercent}
        storyCount={storyCount}
        storyIndex={storyIndex}
      />

      <StoryCardViewerHeader
        durationLabel={viewer.durationLabel}
        modeLabel={getStoryModeLabel(viewer.mode)}
        onClose={onClose}
        story={story}
        storyCount={storyCount}
      />

      <StoryCardViewerStage
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        onNext={onNext}
        onPrev={onPrev}
        viewer={{ ...viewer, story }}
      />
    </Box>
  )
}
