import { Box, Typography } from '@mui/material'
import { story } from '../../../../../constant/text/vi/story'
import { style } from '../style'

const sx = style.storyList

export default function StoryListEmptyState({ isFetching }) {
  return (
    <Box sx={sx.emptyState}>
      <Typography sx={sx.emptyTitle}>
        {isFetching ? story.storyList.loadingTitle : story.storyList.emptyTitle}
      </Typography>
      <Typography sx={sx.emptyText}>
        {isFetching
          ? story.storyList.loadingText
          : story.storyList.emptyText}
      </Typography>
    </Box>
  )
}
