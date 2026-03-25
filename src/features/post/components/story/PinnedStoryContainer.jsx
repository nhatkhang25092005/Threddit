import Surface from '../../../../components/common/Surface'
import { Typography, Box, IconButton } from '@mui/material'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import StoryCard from './StoryCard'
import EditPinnedStoryButton from './EditPinnedStoryButton'
import { useHorizontalScroll } from './hooks/useHorizontalScroll'
import { style } from './style'
import { usePostContext } from '../../hooks'
import { story } from '../../../../constant/text/vi/story'
import useAuth from '../../../../core/auth/useAuth'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { buildStoryRoute } from './storyRoute'

const sx = style.pinnedStoryContainer

export default function PinnedStoryContainer() {
  const {profileUsername, isOwner} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { actions, selector } = usePostContext()
  const { getPinnedStory } = actions
  const pinnedStoryList = selector.story.getPinnedStoryListOf(profileUsername)

  useEffect(() => {
    getPinnedStory(profileUsername)
  }, [getPinnedStory, profileUsername])


  const { scrollRef, canScrollLeft, canScrollRight, scrollStories } = useHorizontalScroll(99.2, 10.4)
  return (
    <Surface sx={sx.surface} >
      <Typography variant="title" sx={sx.title}>{story.pinnedSection.title}</Typography>

      <Box sx={sx.wrapper}>
        <IconButton
          aria-label={story.pinnedSection.previousAriaLabel}
          onClick={() => scrollStories('left')}
          disabled={!canScrollLeft}
          sx={sx.iconButton('left')}
        >
          <ChevronLeftRoundedIcon />
        </IconButton>

        <IconButton
          aria-label={story.pinnedSection.nextAriaLabel}
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
              onClick={() => navigate(
                buildStoryRoute('pinned', profileUsername || story?.author?.username, story.id),
                { state: { backgroundLocation: location } }
              )}
              story={story}
              variant="preview"
            />
          ))}
        </Box>
        {isOwner && <EditPinnedStoryButton/>}
      </Box>
    </Surface>
  )
}
