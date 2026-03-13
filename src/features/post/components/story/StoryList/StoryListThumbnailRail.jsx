import { Box } from '@mui/material'
import StoryCard from '../StoryCard'
import { style } from '../style'

const sx = style.storyList

export default function StoryListThumbnailRail({
  activeIndex,
  goToIndex,
  storyList,
}) {
  if (storyList.length <= 1) return null

  return (
    <Box sx={sx.thumbRail}>
      {storyList.map((item, index) => (
        <StoryCard
          key={item.id}
          active={index === activeIndex}
          onClick={() => goToIndex(index)}
          story={item}
          variant="preview"
        />
      ))}
    </Box>
  )
}
