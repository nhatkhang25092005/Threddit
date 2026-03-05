import Surface from '../../../../components/common/Surface'
import { Typography, Box, IconButton } from '@mui/material'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import StoryCard from './StoryCard'
import EditPinnedStory from './EditPinnedStory'
import { useHorizontalScroll } from './hooks/useHorizontalScroll'
import { style } from './style'
import { usePostContext } from '../../hooks'
import useAuth from '../../../../core/auth/useAuth'

const sx = style.pinnedStoryContainer

export default function PinnedStoryContainer() {
  const {profileUsername} = useAuth()
  const { actions, selector } = usePostContext()
  const { getPinnedStory } = actions
  const pinnedStoryList = selector.story.getPinnedStoryListOf(profileUsername)
  getPinnedStory(profileUsername)


  const { scrollRef, canScrollLeft, canScrollRight, scrollStories } = useHorizontalScroll(99.2, 10.4)
  return (
    <Surface sx={sx.surface} >
      <Typography variant="title" sx={sx.title}>Tin nổi bật</Typography>

      <Box sx={sx.wrapper}>
        <IconButton
          aria-label="Previous stories"
          onClick={() => scrollStories('left')}
          disabled={!canScrollLeft}
          sx={sx.iconButton('left')}
        >
          <ChevronLeftRoundedIcon />
        </IconButton>

        <IconButton
          aria-label="Next stories"
          onClick={() => scrollStories('right')}
          disabled={!canScrollRight}
          sx={sx.iconButton('right')}
        >
          <ChevronRightRoundedIcon />
        </IconButton>

        <Box ref={scrollRef} sx={sx.list}>
          {pinnedStoryList.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
            />
          ))}
        </Box>
        <EditPinnedStory/>
      </Box>
    </Surface>
  )
}
