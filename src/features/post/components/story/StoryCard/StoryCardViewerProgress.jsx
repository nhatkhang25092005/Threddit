import { Box } from '@mui/material'
import { storyCardViewerSx as sx } from './storyCardViewer.styles'

export default function StoryCardViewerProgress({
  progressPercent,
  storyCount = 1,
  storyIndex = 0,
}) {
  return (
    <Box
      sx={{
        ...sx.progressRail,
        '--story-count': String(Math.max(storyCount, 1)),
      }}
    >
      {Array.from({ length: Math.max(storyCount, 1) }, (_, index) => {
        const progress = index < storyIndex
          ? 100
          : (index === storyIndex ? progressPercent : 0)

        return (
          <Box key={index} sx={sx.progressTrack}>
            <Box sx={sx.progressFill(progress)} />
          </Box>
        )
      })}
    </Box>
  )
}
